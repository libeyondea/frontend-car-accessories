import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '~env/environment';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(private cookieService: CookieService, private router: Router) {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
				if (error.url === `${environment.API_URL}/auth/me`) {
					console.error('An error auth:', error.error);
					this.cookieService.delete('access_token');
				} else if (error.status === 0) {
					console.error('An error occurred:', error.error);
				} else if (error.status === 401) {
					this.cookieService.delete('access_token');
					this.router.navigate(['/signin']);
				} else {
					console.error(
						`Backend returned code ${error.status}, body was: `,
						error.error
					);
				}
				return throwError(() => error);
			})
		);
	}
}
