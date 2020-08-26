import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(
    private httpClient:HttpClient
  ) { }

  getUsers() {
    console.log("test call");
    return this.httpClient.get<User>('http://localhost:8080/users/get');

  }

  addUser(newUser: User) {
    return this.httpClient.post<User>('http://localhost:8080/users/add', newUser);
  }

  deleteUser(id) {
    return this.httpClient.delete<User>('http://localhost:8080/users/' + id);
  }

  getProducts() {
    return this.httpClient.get<Product[]>('http://localhost:8080/products/get');
  }

  addProduct(newProduct: Product) {
    return this.httpClient.post<Product>('http://localhost:8080/products/add', newProduct);
  }

  deleteProduct(id) {
    return this.httpClient.delete<Product>('http://localhost:8080/products/' + id);
  }

  updateProduct(updateProduct: Product) {
    return this.httpClient.put<Product>('http://localhost:8080/products/update', updateProduct);
  }

}
