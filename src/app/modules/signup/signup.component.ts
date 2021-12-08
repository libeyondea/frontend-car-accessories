import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { catchError, finalize, throwError } from 'rxjs';
import { SignupUser } from '~app/shared/models/auth';
import { AuthService } from '~app/shared/services/auth.service';
import { AppState } from '~app/shared/store';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
	signupUser: SignupUser = new SignupUser();
	isLoading: boolean = false;
	errMsg: any = {};
	listGender: Array<string> = ['male', 'female', 'other'];

	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit(): void {}

	onSubmit(): void {
		const payload = {
			first_name: this.signupUser.first_name,
			last_name: this.signupUser.last_name,
			user_name: this.signupUser.user_name,
			email: this.signupUser.email,
			password: this.signupUser.password,
			phone_number: this.signupUser.phone_number,
			address: this.signupUser.address,
			gender: this.signupUser.gender,
		};
		console.log(payload);
		if (
			!payload.first_name ||
			!payload.last_name ||
			!payload.user_name ||
			!payload.email ||
			!payload.password ||
			!payload.phone_number ||
			!payload.address ||
			!payload.gender
		) {
			return;
		}
		this.isLoading = true;
		this.authService
			.signup(payload)
			.pipe(finalize(() => (this.isLoading = false)))
			.subscribe({
				next: (v) => console.log(v),
				error: (e) => {
					console.error(e.error);
					this.errMsg = e.error.errors;
				},
				complete: () => {
					this.router.navigateByUrl('/signin');
				},
			});
	}
}
