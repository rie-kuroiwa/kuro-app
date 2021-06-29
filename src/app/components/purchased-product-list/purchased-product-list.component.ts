import { Component, OnInit, Input } from '@angular/core';

/**
 * 仕入れ商品リストinterface
 */
export interface PurchasedProductListModel {
  // 仕入れID
  purchasingId: string;
  // 商品名
  productName: string;
  // 単価
  unitPrice: number;
  // 仕入れ個数
  purchasingQuantity: number;
  // 合計金額
  totalPrice: number;
  // 仕入れ日付
  purchasingDate: string;
}

@Component({
  selector: 'app-purchased-product-list',
  templateUrl: './purchased-product-list.component.html',
  styleUrls: ['./purchased-product-list.component.scss'],
})
export class PurchasedProductListComponent implements OnInit {
  @Input() purchasedProductList: PurchasedProductListModel[] = [];
  constructor() {}

  ngOnInit(): void {}
}
