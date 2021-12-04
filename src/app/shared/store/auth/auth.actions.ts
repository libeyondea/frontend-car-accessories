import { createAction } from '@ngrx/store';

export enum CurrentAuthActionTypes {
	CURRENT_AUTH_REQUESTED = '[Auth] Current Auth Requested',
	CURRENT_AUTH_SUCCEED = '[Auth] Current Auth Succeed',
}

export const currentAuthRequested = createAction(
	CurrentAuthActionTypes.CURRENT_AUTH_REQUESTED,
	(current) => ({
		payload: {
			current,
		},
	})
);

export const currentAuthSucceed = createAction(
	CurrentAuthActionTypes.CURRENT_AUTH_SUCCEED,
	(current) => ({
		payload: {
			current,
		},
	})
);
