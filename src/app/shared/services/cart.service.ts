import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '~env/environment';
import { AddToCart, Checkout, DelCartItem } from '../models/cart';

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

	deleteCartItem(delCartItem: DelCartItem): Observable<any> {
		const url = `${environment.API_URL}/delete-cart-item?product_id=${delCartItem.product_id}`;
		return this.http.delete<DelCartItem>(url);
	}

	checkout(checkout: Checkout): Observable<any> {
		const url = `${environment.API_URL}/checkout`;
		return this.http.post<Checkout>(url, checkout);
	}
}
