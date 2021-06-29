import { Component, OnInit, Input } from '@angular/core';
import { SpecificationCollectionModel } from '../../components/specification-collection/specification-collection.component';

/**
 * 仕入れ詳細interface
 */
export interface PurchasingModel {
  // 仕入れID
  purchasingId: string;
  // 仕入れ商品数
  purchasingTotal: number;
  // 仕入れ合計金額
  totalPrice: number;
  // 仕入れ日付
  purchasingDate: string;
  // 仕入れ明細
  specifidation: SpecificationCollectionModel[];
}

@Component({
  selector: 'app-purchasing-detail',
  templateUrl: './purchasing-detail.component.html',
  styleUrls: ['./purchasing-detail.component.scss'],
})
export class PurchasingDetailComponent implements OnInit {
  @Input() purchasingDetail!: PurchasingModel;

  constructor() {}

  ngOnInit(): void {}
}
