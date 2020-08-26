import { Component, OnInit } from '@angular/core';
import { Product } from '../model/Product';
import { Router } from '@angular/router';
import { HttpClientService } from '../service/http-client.service';

@Component({
  selector: 'app-shopproduct',
  templateUrl: './shopproduct.component.html',
  styleUrls: ['./shopproduct.component.css']
})
export class ShopproductComponent implements OnInit {

  products: Array<Product>;
  productsRecieved: Array<Product>;
  cartProducts: any;

  constructor(private router: Router, private httpClientService: HttpClientService) { }

  ngOnInit(): void {

    this.httpClientService.getProducts().subscribe(
      response => this.handleSuccessfulResponse(response),
    );

    //del localstorage busca el articulo del carrito
    let data = localStorage.getItem('cart');
    //si este no es nullo lo convertimos en un JSON sino se inicializa como vacio
    if (data !== null) {
      this.cartProducts = JSON.parse(data);
    } else {
      this.cartProducts = [];
    }

  }

  //ahora vamos a llamar a los productos de la base de datos y los agregaremos

  handleSuccessfulResponse(response) {
    this.products = new Array<Product>();
    //obtener los productos llamando a la API
    this.productsRecieved = response;

    for (const product of this.productsRecieved) {

      const productwithRetrievedImageField = new Product();
      productwithRetrievedImageField.idProduct = product.idProduct;
      productwithRetrievedImageField.name = product.name;
      //rellenar el campo de la imagen recuperada para que spueda mostrar la imagen del producto
      productwithRetrievedImageField.retrievedImage = 'data:image/jpeg;base64,' + product.picByte;
      productwithRetrievedImageField.stock = product.stock;
      productwithRetrievedImageField.price = product.price;
      productwithRetrievedImageField.picByte = product.picByte;

      this.products.push(productwithRetrievedImageField);
    }
  }

    addToCart(productId) {
    //busca el producto del arreglo de productos usando el id
    let product = this.products.find(product => {
      return product.idProduct === +productId;
    });

    let cartData = [];
    //busca los datos del carrito del localstore
    let data = localStorage.getItem('cart');
    //parsear a json
    if (data !== null) {
      cartData = JSON.parse(data);
    }
    //agregar el articulo seleccionado al cart data
    cartData.push(product);
    //actualizar el carrito
    this.updateCartData(cartData);
    //guardar el carrito actualizado en el localstore
    localStorage.setItem('cart', JSON.stringify(cartData));
    //hacer el campo isAdded del producto en el carrito como verdadero
    product.isAdded = true;

  }

  updateCartData(cartData) {
    this.cartProducts = cartData;
  }
  goToCart() {
    this.router.navigate(['/cart']);
  }

  emptyCart() {
    this.cartProducts = [];
    localStorage.clear();
  }
}
