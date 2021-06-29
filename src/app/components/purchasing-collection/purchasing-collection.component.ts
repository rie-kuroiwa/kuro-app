import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

/**
 * 仕入れリストinterface
 */
export interface PurchasingCollectionModel {
  // 仕入れID
  purchasingId: string;
  // 仕入れ日付
  purchasingDate: string;
  // 仕入れ合計金額
  purchasingTotalPrice: number;
}

@Component({
  selector: 'app-purchasing-collection',
  templateUrl: './purchasing-collection.component.html',
  styleUrls: ['./purchasing-collection.component.scss'],
})
export class PurchasingCollectionComponent implements OnInit {
  /**
   * 仕入れコレクションビューcomponent
   * @memberof PurchasingCollectionComponent
   */
  @Input() purchasingList: PurchasingCollectionModel[] = [];
  @Output() clickTarget: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClick(e: string) {
    console.log(e);
    this.clickTarget.emit(e);
  }
}
