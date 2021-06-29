import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-parent',
  templateUrl: './test-parent.component.html',
  styleUrls: ['./test-parent.component.scss'],
})
export class TestParentComponent implements OnInit {
  major = 1;
  minor = 23;
  condition = false;

  constructor() {}

  ngOnInit(): void {}

  newMinor() {
    this.minor++;
  }

  newMajor() {
    this.major++;
    this.minor = 0;
  }
}
