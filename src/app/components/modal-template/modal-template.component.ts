import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { modalAnimation } from '../../animations';

@Component({
  selector: 'app-modal-template',
  templateUrl: './modal-template.component.html',
  styleUrls: ['./modal-template.component.scss'],
  animations: [modalAnimation],
})
export class ModalTemplateComponent implements OnInit {
  @Input() data: any;
  isOpen: boolean;
  constructor(private renderer: Renderer2) {
    this.isOpen = true;

    // モーダル表示時に全体のスクロールを無効にする
    this.renderer.addClass(document.body, 'display-modal');
  }

  /**
   * モーダルウィンドウを非表示にする。
   * ウィンドウの破棄は次にモーダルウィンドウのを呼び出したときに、
   * モーダルサービスで行うため、ここでは非表示にするだけ。
   */

  closeModal() {
    this.isOpen = false;
    this.renderer.removeClass(document.body, 'display-modal');
  }

  ngOnInit(): void {}
}
