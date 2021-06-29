import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { PurchasingCollectionModel } from '../../components/purchasing-collection/purchasing-collection.component';
import { PurchasingModel } from '../../components/purchasing-detail/purchasing-detail.component';
import { HttpClientService } from '../../service/http-client.service';
import { forkJoin } from 'rxjs';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-purchasing-list',
  templateUrl: './purchasing-list.component.html',
  styleUrls: ['./purchasing-list.component.scss'],
})
export class PurchasingListComponent implements OnInit {
  purchasingList: PurchasingCollectionModel[] = [];
  public purchasingDetail: PurchasingModel[] = [];
  constructor(
    private httpClientService: HttpClientService,
    private viewContainerRef: ViewContainerRef,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    forkJoin([
      this.httpClientService.getPurchasingList(),
      this.httpClientService.getPurchasingDetail(),
    ]).subscribe((res) => {
      console.log([res[0]]);
      this.purchasingList = res[0].messages;
      this.purchasingDetail = res[1].messages;
    });
  }

  openModal(): void {
    // モーダルウィンドウに表示する内容
    let param = {
      title: '保存',
      contents: '<p>仕入れデータを保存しますか？</p>',
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
