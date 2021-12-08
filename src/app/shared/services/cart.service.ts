import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '~env/environment';
import { AddToCart } from '../models/cart';

@Injectable({
	providedIn: 'root',
})
export class CartService {
	constructor(private http: HttpClient) {}

	listCarts(): Observable<any> {
		const url = `${environment.API_URL}/carts`;
		return this.http.get<any>(url);
	}

	addToCart(addToCart: AddToCart): Observable<any> {
		const url = `${environment.API_URL}/add-to-cart`;
		return this.http.post<AddToCart>(url, addToCart);
	}
}
