import { Component, OnInit,OnDestroy } from '@angular/core';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss']
})
export class CountdownTimerComponent implements OnInit, OnDestroy {

  intervalId=0;
  message = '';
  seconds = 11;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
this.clearTimer();
  }

  start() {
    this.countDown();
  }

  stop() {
    this.clearTimer();
    this.message =`${this.seconds}秒前でストップ`
  }

  private clearTimer() {
    clearInterval(this.intervalId);

  }

  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(()=>{
      this.seconds -= 1;
      if(this.seconds === 0) {
       this.message = '時間ですよ～～！'
      }else {
        if(this.seconds<0) {
          // reset
          this.seconds = 10;
        }
        this.message = `T-${this.seconds} 秒前`
      }
    },1000)
  }

}
