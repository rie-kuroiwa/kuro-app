import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ProductCollectionModel } from '../../components/product-collection/product-collection.component';
import { ProductModel } from '../../components/product-detail/product-detail.component';
import { HttpClientService } from '../../service/http-client.service';
import { forkJoin } from 'rxjs';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  productList: ProductCollectionModel[] = [];
  public productDetail: ProductModel[] = [];
  constructor(
    private httpClientService: HttpClientService,
    private viewContainerRef: ViewContainerRef,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    forkJoin([
      this.httpClientService.getProductList(),
      this.httpClientService.getProductDetail(),
    ]).subscribe((response) => {
      this.productList = response[0].messages;
      this.productDetail = response[1].messages;
    });
  }

  openModal(): void {
    // モーダルウィンドウに表示する内容
    let param = {
      title: '保存',
      contents: '<p>商品データを保存しますか？</p>',
      class: 'default-modal',
    };

    // openModal()を呼んで、Observableを受け取る。
    let observable = this.modalService.openModal(this.viewContainerRef, param);

    // モーダルウィンドウの結果に対する処理は、subscribe内に記載する。
    observable.subscribe({
      next: (v) => console.log('nex', v),
      error: (err) => console.log(err),
      complete: () => console.log('done'),
    });
  }

  onSaveData() {
    this.openModal();
  }
}
