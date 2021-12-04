import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListCateComponent } from './product-list-cate.component';

const routes: Routes = [{ path: '', component: ProductListCateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductListCateRoutingModule { }
