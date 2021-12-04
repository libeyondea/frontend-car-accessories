import { Injectable, Injector } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(
		private injector: Injector,
		private authService: AuthService,
		private cookieService: CookieService
	) {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		this.authService = this.injector.get(AuthService);
		const token: string | null = this.cookieService.get('access_token');
		request = request.clone({
			setHeaders: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		});
		return next.handle(request);
	}
}
