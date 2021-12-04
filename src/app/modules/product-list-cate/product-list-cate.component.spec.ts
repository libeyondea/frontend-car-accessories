import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListCateComponent } from './product-list-cate.component';

describe('ProductListCateComponent', () => {
  let component: ProductListCateComponent;
  let fixture: ComponentFixture<ProductListCateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListCateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListCateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
