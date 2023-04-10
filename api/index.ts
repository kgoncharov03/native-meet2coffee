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

        console.log('!!! response:', response);

        const { data } = response;

        if (!response.ok) {
            console.log('!!! response:', response.status);
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
        const data = await post({
            endpoint: Endpoint.User,
            successMiddlewares: [setUserMiddleware],
            errorMiddewares: [setUnauthorizedMiddleware],
            withAuth: true,
        });
        return data;
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
        const response = await post({
            endpoint: Endpoint.Chats,
            body: {
                imgSize,
                skip,
                limit,
            },
            errorMiddewares: [setUnauthorizedMiddleware],
            withAuth: true,
        });
        return response.data;
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
}
