import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '~env/environment';

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	constructor(private httpClient: HttpClient) {}

	listProducts(
		page: number = 1,
		pageSize: number = 9,
		sortBy?: string,
		sortDirection?: string,
		q?: string,
		category?: string,
		brands?: Array<string>
	): Observable<any> {
		return this.httpClient.get<any>(
			`${
				environment.API_URL
			}/products?page=${page}&page_size=${pageSize}${
				sortBy ? `&sort_by=${sortBy}` : ''
			}
			${sortDirection ? `&sort_direction=${sortDirection}` : ''}
			${q ? `&q=${q}` : ''}
			${category ? `&category=${category}` : ''}
			${brands ? `&brands=${JSON.stringify(brands)}` : ''}`
		);
	}

	singleProduct(slug: string | null): Observable<any> {
		return this.httpClient.get<any>(
			`${environment.API_URL}/products/${slug}`
		);
	}
}
