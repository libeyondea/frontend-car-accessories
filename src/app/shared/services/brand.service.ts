import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '~env/environment';

@Injectable({
	providedIn: 'root',
})
export class BrandService {
	constructor(private httpClient: HttpClient) {}

	listBrands(page: number = 1, pageSize: number = 10): Observable<any> {
		return this.httpClient.get<any>(
			`${environment.API_URL}/brands?page=${page}&page_size=${pageSize}`
		);
	}
}
