import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-input-child',
  templateUrl: './input-child.component.html',
  styleUrls: ['./input-child.component.scss']
})
export class InputChildComponent implements OnInit, OnChanges {
  @Input() major = 0;
  @Input() minor = 0;
  changeLog:string[]=[];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes:SimpleChanges) {
const log:string[] =[];
console.log(changes);
for (const propName in changes) {
  const changedProp = changes[propName];
  const to = JSON.stringify(changedProp.currentValue);
  if (changedProp.isFirstChange()) {
    log.push(`Initial value of ${propName} se to ${to}`);
  }else {
    const from = JSON.stringify(changedProp.previousValue);
    log.push(`${propName} changed from ${from} to ${to}`);
  }
}
this.changeLog.push(log.join(', '));
  }

}
