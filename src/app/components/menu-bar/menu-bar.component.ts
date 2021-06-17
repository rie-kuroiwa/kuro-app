import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit {
  @Input() currentPage: string = 'purchasing';

  constructor() {}

  ngOnInit(): void {}
}
