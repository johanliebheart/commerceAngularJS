import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopproductComponent } from './shopproduct.component';

describe('ShopproductComponent', () => {
  let component: ShopproductComponent;
  let fixture: ComponentFixture<ShopproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
