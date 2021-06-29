import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit {
  @Input() currentPage: string = 'purchasing';
  @Output() onClickOpenModal: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
