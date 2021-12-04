import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
	constructor(private actions$: Actions) {}

	currentAuth$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.currentAuthRequested),
			map((action) =>
				AuthActions.currentAuthSucceed(action.payload.current)
			)
		)
	);
}
