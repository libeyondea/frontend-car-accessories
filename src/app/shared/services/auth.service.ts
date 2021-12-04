import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '~env/environment';
import { SigninUser } from '../models/auth';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private http: HttpClient) {}

	signin(signinUser: SigninUser): Observable<any> {
		const url = `${environment.API_URL}/auth/signin`;
		return this.http.post<SigninUser>(url, signinUser);
	}

	me(): Observable<any> {
		const url = `${environment.API_URL}/auth/me`;
		return this.http.get<any>(url);
	}
}
