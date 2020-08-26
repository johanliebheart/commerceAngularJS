import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/Product';
import { HttpClientService } from '../../service/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Array<Product>;
  productsRecieved: Array<Product>;
  selectedProduct: Product;
  action: string;

  constructor(private httpClientService: HttpClientService,
    private activedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {/*
    this.httpClientService.getProducts().subscribe(
      response => this.handleSuccessfulResponse(response)
    );

    this.activedRoute.queryParams.subscribe(
      (params) => {
        this.action = params['action'];
      }
    );
    */
    this.refreshData();
  }

  refreshData() {

    this.httpClientService.getProducts().subscribe(
      response => this.handleSuccessfulResponse(response)
    );

    this.activedRoute.queryParams.subscribe(
      (params) => {
        //obtener el parametro de url llamada action, esto se puede agregar por add o view
        this.action = params['action'];
        //obtener el parametro id, este será el id del producto que seleccionamos para ver los detalles
        const id = params['id'];
        //si existe, convierte este en Integer y entonces recive el producto desde el arreglo de productos
        if (id) {
          this.selectedProduct = this.products.find(product => {
            return product.idProduct === +id;
          });
        }
      }
    );
  }

  //ahora vamos a hablar de la respuesta de productos regresada de la base de datos
  //y vamos a agregar lo recibido


  handleSuccessfulResponse(response) {
    this.products = new Array<Product>();

    // obtener productos regresados por la API llamando a
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

  addProduct() {
    this.selectedProduct = new Product();
    this.router.navigate(['admin', 'products'], { queryParams: {action: 'add'}});
  }

  viewProduct(id: number) {
    this.router.navigate(['admin', 'products'], { queryParams: { id, action: 'view' } });
  }

}
