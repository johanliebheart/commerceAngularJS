import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Product } from '../../../model/Product';
import { Router } from '@angular/router';
import { HttpClientService } from '../../../service/http-client.service';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {
  @Input()
  product: Product;

  @Output()
  productDeletedEvent = new EventEmitter()

  constructor(private httpClientService: HttpClientService, private router: Router) { }

  ngOnInit() {
  }

  deleteProduct() {
    this.httpClientService.deleteProduct(this.product.idProduct).subscribe(
      (product) => {
        this.productDeletedEvent.emit();
        this.router.navigate(['admin', 'products']);
      }
    );
  }

  editProduct() {
    this.router.navigate(['admin', 'products'], { queryParams: { action: 'edit', id: this.product.idProduct } })
  }
}
