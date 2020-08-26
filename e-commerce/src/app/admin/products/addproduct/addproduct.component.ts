import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Product } from '../../../model/Product';
import { HttpClientService } from '../../../service/http-client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  @Input()
  product: Product;

  @Output()
  productAddedEvent = new EventEmitter();

  private selectedFile;
  imgURL: any;

  constructor(private httpClientService: HttpClientService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient) { }

  ngOnInit() {
  }

  public onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result; 
    }
  }


  saveProduct() {
  //  if (this.product == null) {
      const uploadData = new FormData();
      uploadData.append('imageFile', this.selectedFile, this.selectedFile.name);
      this.selectedFile.imageName = this.selectedFile.name;

      this.httpClient.post('http://localhost:8080/products/upload', uploadData, { observe: 'response' })
        .subscribe((response) => {
          if (response.status === 200) {
            this.httpClientService.addProduct(this.product).subscribe(
              (product) => {
                this.productAddedEvent.emit();
                this.router.navigate(['admin', 'products']);
              }
            );
            console.log('Imagen subida con éxito');
          } else {
            console.log('Imagen no cargada');
          }
        }
        );
    


    /* else {
      this.httpClientService.updateProduct(this.product).subscribe(
        (product) => {
          this.productAddedEvent.emit();
          this.router.navigate(['admin', 'products']);
        }
      );
    }*/
}

}
