import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-modal-template',
  templateUrl: './modal-template.component.html',
  styleUrls: ['./modal-template.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          display: 'none',
          opacity: 0,
        })
      ),
      transition('open => closed', [animate('0.2s')]),
      transition('closed => open', [animate('0.2s')]),
      transition('* => void', [animate('0.2s')]),
      transition('void => *', [animate('0.2s')]),
    ]),
  ],
})
export class ModalTemplateComponent implements OnInit {
  @Input() data: any;
  isOpen: boolean;
  constructor() {
    this.isOpen = true;
  }

  /**
   * モーダルウィンドウを非表示にする。
   * ウィンドウの破棄は次にモーダルウィンドウのを呼び出したときに、
   * モーダルサービスで行うため、ここでは非表示にするだけ。
   */

  closeModal() {
    this.isOpen = false;
  }

  ngOnInit(): void {}
}
