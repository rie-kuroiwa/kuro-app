import { Component, OnInit, Input } from '@angular/core';

/**
 * 明細リストinterface
 */
export interface SpecificationCollectionModel {
  // 明細ID
  specificationId: string;
  // 商品名
  productName: string;
  // 単価
  unitPrice: number;
  // 合計数
  total: number;
  // 合計金額
  totalPrice: number;
  // 仕入れ日付
  purchasingDate: string;
}

@Component({
  selector: 'app-specification-collection',
  templateUrl: './specification-collection.component.html',
  styleUrls: ['./specification-collection.component.scss'],
})
export class SpecificationCollectionComponent implements OnInit {
  @Input() specificationList: SpecificationCollectionModel[] = [];

  constructor() {}

  ngOnInit(): void {}
}
