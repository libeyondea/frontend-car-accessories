import { authReducer, AuthState } from './auth/auth.reducers';
import { AuthEffects } from './auth/auth.effects';

export interface AppState {
	authState: AuthState;
}

export const appReducers = {
	authState: authReducer,
};

export const appEffects = [AuthEffects];
