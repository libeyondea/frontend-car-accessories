import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
	declarations: [CheckoutComponent],
	imports: [
		CommonModule,
		FormsModule,
		CheckoutRoutingModule,
		SweetAlert2Module,
	],
})
export class CheckoutModule {}
