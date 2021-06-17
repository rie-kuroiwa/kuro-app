import { Component, OnInit } from '@angular/core';
import { ProductCollectionModel } from '../../components/product-collection/product-collection.component';
import { ProductModel } from '../../components/product-detail/product-detail.component';
import { HttpClientService } from '../../service/http-client.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  productList: ProductCollectionModel[] = [];
  public productDetail: ProductModel[] = [];
  constructor(private httpClientService: HttpClientService) {}

  ngOnInit(): void {
    forkJoin([
      this.httpClientService.getProductList(),
      this.httpClientService.getProductDetail(),
    ]).subscribe((response) => {
      this.productList = response[0].messages;
      this.productDetail = response[1].messages;
    });
  }
}
