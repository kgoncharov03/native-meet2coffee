import { createAction } from '@reduxjs/toolkit';
import { User } from '../../api/typings';
import { ActionType } from './typings';

export const setUser = createAction<User | undefined>(ActionType.SET_USER);
export const setToken = createAction<string | undefined>(ActionType.SET_TOKEN);
export const setLoggedIn = createAction<boolean>(ActionType.SET_LOGGED_IN);
