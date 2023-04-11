import { create } from 'apisauce';
import { ApiCallError, ChatResponse, User } from './typings';
import { store } from '../redux';
import { tokenSelector } from '../redux/selectors/token';
import { setUserMiddleware } from './middlewares/setUser';
import { setLoggedIn } from '../redux/actions';
import { setTokenMiddlware } from './middlewares/setToken';
import {
    setLoggedOutMiddleware,
    setUnauthorizedMiddleware,
} from './middlewares/setUnauthorized';

enum Endpoint {
    User = '/User/',
    Chats = '/Chats/',
    Login = '/Login/',
    LoginWithEmail = '/LoginWithEmail/',
    Logout = '/Logout/',
    Messages = '/Messages/',
    GetUser = '/GetUser/',
}

const apiClient = create({
    baseURL: 'https://test-api.meet2coffee.com',
});

const baseHeaders: Record<string, string> = {
    'Skip-Cookie-Authorization': 'yes',
};

type RequestOptions = {
    endpoint: string;
    body?: any;
    successMiddlewares?: any[];
    errorMiddewares?: any[];
    withAuth: boolean;
};

const post = async ({
    endpoint,
    body = {},
    successMiddlewares = [],
    errorMiddewares = [],
    withAuth,
}: RequestOptions): Promise<any> => {
    const token = tokenSelector(store.getState());
    try {
        const response = await apiClient.post(endpoint, body, {
            headers: {
                ...baseHeaders,
                Authorization: withAuth ? token : undefined,
            },
        });

        const { data } = response;

        if (!response.ok) {
            throw new ApiCallError({
                message: (data as any).message || 'Somethinig went wrong.',
                code: response.status,
            });
        }

        successMiddlewares.forEach((middleware) => {
            middleware(data);
        });

        return data;
    } catch (e) {
        errorMiddewares.forEach((middleware) => {
            middleware(e);
        });
        throw e;
    }
};

export class Api {
    static async user(): Promise<User> {
        return post({
            endpoint: Endpoint.User,
            successMiddlewares: [setUserMiddleware],
            errorMiddewares: [setUnauthorizedMiddleware],
            withAuth: true,
        });
    }

    static async logout(): Promise<void> {
        await post({
            endpoint: Endpoint.Logout,
            successMiddlewares: [setLoggedOutMiddleware],
            withAuth: true,
        });
    }

    static async chats({
        imgSize = 'SMALL',
        skip = 0,
        limit = 100,
    }): Promise<ChatResponse> {
        return post({
            endpoint: Endpoint.Chats,
            body: {
                imgSize,
                skip,
                limit,
            },
            errorMiddewares: [setUnauthorizedMiddleware],
            withAuth: true,
        });
    }

    static async messages({
        chatId,
        limit = 100,
        skip = 0,
    }: {
        chatId: string;
        limit?: number;
        skip?: number;
    }): Promise<any> {
        return post({
            endpoint: Endpoint.Messages,
            body: {
                chatId,
                limit,
                skip,
            },
            errorMiddewares: [setUnauthorizedMiddleware],
            withAuth: true,
        });
    }

    static loginWithLinkedin = ({
        code,
    }: {
        code: string;
    }): Promise<{ user: User; token: string }> => {
        return post({
            endpoint: Endpoint.Login,
            body: {
                code,
            },
            successMiddlewares: [
                () => {
                    store.dispatch(setLoggedIn(true));
                },
                setUserMiddleware,
                setTokenMiddlware,
            ],
            withAuth: false,
        });
    };

    static loginWithEmail = ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }): Promise<{ user: User; token: string }> => {
        return post({
            endpoint: Endpoint.LoginWithEmail,
            body: {
                email,
                password,
            },
            successMiddlewares: [
                () => {
                    store.dispatch(setLoggedIn(true));
                },
                setUserMiddleware,
                setTokenMiddlware,
            ],
            withAuth: false,
        });
    };

    static getUser = ({
        id,
        imageSize = 'MEDIUM',
        m2c = false,
    }: {
        id: string;
        imageSize?: string;
        m2c?: boolean;
    }) => {
        return post({
            endpoint: Endpoint.GetUser,
            body: {
                userId: id,
                imageSize,
                m2c,
            },
            errorMiddewares: [setUnauthorizedMiddleware],
            withAuth: true,
        });
    };
}
