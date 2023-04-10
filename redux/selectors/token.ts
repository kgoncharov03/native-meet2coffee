import { RootState } from '../reducers';

export const tokenSelector = (state: RootState) => {
    return state.token;
};
