import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit {
  @Input() currentPage: string = 'purchasing';

  constructor(
    private viewContainerRef: ViewContainerRef,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {}

  openModal(): void {
    // モーダルウィンドウに表示する内容
    let param = {
      title: '保存',
      contents: '<u>このデータを保存しますか？</u>',
      class: 'default-modal',
    };

    // openModal()を呼んで、Observableを受け取る。
    let observable = this.modalService.openModal(this.viewContainerRef, param);

    // モーダルウィンドウの結果に対する処理は、subscribe内に記載する。
    observable.subscribe({
      next: (v) => console.log(v),
      error: (err) => console.log(err),
      complete: () => console.log('done'),
    });
  }
}
