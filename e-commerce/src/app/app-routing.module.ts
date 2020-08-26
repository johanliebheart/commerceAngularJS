import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './admin/users/users.component';
import { ProductsComponent } from './admin/products/products.component';
import { ShopproductComponent } from './shopproduct/shopproduct.component';
import { CartComponent } from './shopproduct/cart/cart.component';

const routes: Routes = [
  { path: 'admin/users', component: UsersComponent },
  { path: 'admin/products', component: ProductsComponent },
  { path: 'shop', component: ShopproductComponent },
  {path:'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
