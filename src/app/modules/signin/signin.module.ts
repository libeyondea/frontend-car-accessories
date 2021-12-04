import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SigninRoutingModule } from './signin-routing.module';
import { SigninComponent } from './signin.component';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [SigninComponent],
	imports: [CommonModule, FormsModule, SigninRoutingModule],
})
export class SigninModule {}
