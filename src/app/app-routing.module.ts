import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
	{
		path: 'signin',
		loadChildren: () =>
			import('./modules/signin/signin.module').then(
				(m) => m.SigninModule
			),
	},
	{
		path: '',
		loadChildren: () =>
			import('./modules/home/home.module').then((m) => m.HomeModule),
	},
	{
		path: 'cart',
		loadChildren: () =>
			import('./modules/cart/cart.module').then((m) => m.CartModule),
	},
	{
		path: 'checkout',
		loadChildren: () =>
			import('./modules/checkout/checkout.module').then(
				(m) => m.CheckoutModule
			),
		canActivate: [AuthGuard],
	},
	{
		path: 'signup',
		loadChildren: () =>
			import('./modules/signup/signup.module').then(
				(m) => m.SignupModule
			),
	},
	{
		path: 'product/:slug',
		loadChildren: () =>
			import('./modules/product/product.module').then(
				(m) => m.ProductModule
			),
	},
	{
		path: 'product-list-cate',
		loadChildren: () =>
			import('./modules/product-list-cate/product-list-cate.module').then(
				(m) => m.ProductListCateModule
			),
	},
	{
		path: 'account',
		loadChildren: () =>
			import('./modules/account/account.module').then(
				(m) => m.AccountModule
			),
	},
	{ path: '**', redirectTo: '/' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
