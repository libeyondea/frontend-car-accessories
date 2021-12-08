import { createAction } from '@ngrx/store';

export enum CurrentCartActionTypes {
	CURRENT_CART_REQUESTED = '[Auth] Current Cart Requested',
	CURRENT_CART_SUCCEED = '[Auth] Current Cart Succeed',
}

export const currentCartRequested = createAction(
	CurrentCartActionTypes.CURRENT_CART_REQUESTED,
	(current) => ({
		payload: {
			current,
		},
	})
);

export const currentCartSucceed = createAction(
	CurrentCartActionTypes.CURRENT_CART_SUCCEED,
	(current) => ({
		payload: {
			current,
		},
	})
);
