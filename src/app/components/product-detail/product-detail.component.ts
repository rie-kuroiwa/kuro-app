import { Component, OnInit, Input } from '@angular/core';
import { PurchasedProductListModel } from '../../components/purchased-product-list/purchased-product-list.component';

/**
 * 商品詳細interface
 */
export interface ProductModel {
  // 商品ID
  productId: string;
  // 商品名
  productName: string;
  // 商品金額
  productTotal: number;
  // 仕入れ商品
  purchasedProducts: PurchasedProductListModel[];
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  @Input() productDetail!: ProductModel;
  constructor() {}

  ngOnInit(): void {}
}
