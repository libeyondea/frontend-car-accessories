import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { catchError, finalize, of } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
import { AppState } from './shared/store';
import { currentAuthRequested } from './shared/store/auth/auth.actions';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'frontend-car-accessories';
	accessToken: string | null | undefined;

	constructor(
		private store: Store<AppState>,
		private authService: AuthService,
		private cookieService: CookieService
	) {}

	ngOnInit() {
		this.accessToken = this.cookieService.get('access_token');
		if (this.accessToken) {
			this.authService
				.me()
				.pipe(catchError((error) => of(error)))
				.pipe(finalize(() => {}))
				.subscribe((user) => {
					this.store.dispatch(
						currentAuthRequested({
							user: user.data,
							tokens: {
								access_token: {
									token: this.accessToken,
								},
							},
						})
					);
				});
		}
	}
}
