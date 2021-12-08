import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import * as cartActions from './cart.actions';

@Injectable()
export class CartEffects {
	constructor(private actions$: Actions) {}

	currentCart$ = createEffect(() =>
		this.actions$.pipe(
			ofType(cartActions.currentCartRequested),
			map((action) =>
				cartActions.currentCartSucceed(action.payload.current)
			)
		)
	);
}
