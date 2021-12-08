import { createReducer, on } from '@ngrx/store';

import * as authActions from './auth.actions';

export const authKey = 'auth';

export interface AuthState {
	current:
		| {
				tokens: {
					access_token: {
						token: string;
					};
				};
				user: any;
		  }
		| null
		| undefined;
}

export const initialState: AuthState = {
	current: null,
};

export const authReducer = createReducer(
	initialState,
	on(authActions.currentAuthSucceed, (state, action) => {
		return {
			...state,
			current: action.payload.current,
		};
	})
);
