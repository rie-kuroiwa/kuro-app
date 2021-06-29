import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

/**
 * 商品リストinterface
 */
export interface ProductCollectionModel {
  // 商品ID
  productId: string;
  // 商品名
  productName: string;
  // 商品単価
  productPrice: number;
}

@Component({
  selector: 'app-product-collection',
  templateUrl: './product-collection.component.html',
  styleUrls: ['./product-collection.component.scss'],
})
export class ProductCollectionComponent implements OnInit {
  /**
   * 商品コレクションビューcomponent
   * @memberof ProductCollectionComponent
   */

  @Input() productList: ProductCollectionModel[] = [];
  @Output() clickTarget: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClick(e: string) {
    console.log(e);
    this.clickTarget.emit(e);
  }
}
