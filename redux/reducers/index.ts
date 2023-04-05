import { AnyAction } from '@reduxjs/toolkit';
import { User } from '../../api/typings';
import { ActionType } from '../actions/typings';

export type RootState = {
    user: User | undefined;
    token: string | undefined;
    loggedIn: boolean;
};

const initialState = {
    user: undefined,
    token: undefined,
    loggedIn: false,
};

const rootReducer = (state: RootState = initialState, action: AnyAction) => {
    switch (action.type) {
        case ActionType.SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case ActionType.SET_TOKEN:
            return {
                ...state,
                token: action.payload,
            };
        case ActionType.SET_LOGGED_IN:
            return {
                ...state,
                loggedIn: action.payload,
            };
        default:
            return state;
    }
};

export { rootReducer };
