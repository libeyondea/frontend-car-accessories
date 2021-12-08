import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Category } from '~app/shared/models/category';
import { AuthService } from '~app/shared/services/auth.service';
import { CategoryService } from '~app/shared/services/category.service';
import { AppState } from '~app/shared/store';
import { currentAuthRequested } from '~app/shared/store/auth/auth.actions';
import { selectCurrentAuth } from '~app/shared/store/auth/auth.selectors';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	currentAuth: Observable<any>;
	current: any = null;
	categories: Category[] = [];

	constructor(
		private store: Store<AppState>,
		private authService: AuthService,
		private router: Router,
		private cookieService: CookieService,
		private categoryService: CategoryService
	) {
		this.currentAuth = this.store.select(selectCurrentAuth);
	}

	ngOnInit(): void {
		this.currentAuth.subscribe((auth) => {
			console.log(auth);
			this.current = auth;
		});
		this.categoryService.listCategories().subscribe((categories: any) => {
			if (categories.success) {
				this.categories = categories.data;
			}
		});
	}

	signout() {
		this.authService.signout().subscribe((user) => {
			this.store.dispatch(currentAuthRequested(null));
			this.cookieService.delete('access_token');
			this.router.navigateByUrl('/signin');
		});
	}
}
