import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '~env/environment';

@Injectable({
	providedIn: 'root',
})
export class CategoryService {
	constructor(private httpClient: HttpClient) {}

	listCategories(page: number = 1, pageSize: number = 10): Observable<any> {
		return this.httpClient.get<any>(
			`${environment.API_URL}/categories?page=${page}&page_size=${pageSize}`
		);
	}

	listCategoriesWithProducts(
		page: number = 1,
		pageSize: number = 4
	): Observable<any> {
		return this.httpClient.get<any>(
			`${environment.API_URL}/categories/list-categories-with-products?page=${page}&page_size=${pageSize}`
		);
	}
}
