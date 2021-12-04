import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListCateRoutingModule } from './product-list-cate-routing.module';
import { ProductListCateComponent } from './product-list-cate.component';


@NgModule({
  declarations: [
    ProductListCateComponent
  ],
  imports: [
    CommonModule,
    ProductListCateRoutingModule
  ]
})
export class ProductListCateModule { }
