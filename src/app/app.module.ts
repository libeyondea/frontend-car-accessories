import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { appEffects, appReducers } from './shared/store';
import { AuthService } from './shared/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { AuthGuard } from './shared/guards/auth.guard';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { HeaderComponent } from './shared/layouts/header/header.component';
import { FooterComponent } from './shared/layouts/footer/footer.component';
import { ProductService } from './shared/services/product.service';
import { CategoryService } from './shared/services/category.service';
import { CartService } from './shared/services/cart.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
	declarations: [AppComponent, HeaderComponent, FooterComponent],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		AppRoutingModule,
		StoreModule.forRoot(appReducers),
		EffectsModule.forRoot(appEffects),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
		SweetAlert2Module.forRoot(),
	],
	providers: [
		AuthService,
		CookieService,
		ProductService,
		CategoryService,
		CartService,
		AuthGuard,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
