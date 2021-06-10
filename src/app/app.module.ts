import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputChildComponent } from './components/input-child/input-child.component';
import { TestParentComponent } from './pages/test-parent/test-parent.component';
import { SampleComponent } from './sample/sample.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CountdownTimerComponent } from './components/countdown-timer/countdown-timer.component';
import { UnlessDirective } from './directive/unless.directive';


@NgModule({
  declarations: [
    AppComponent,
    InputChildComponent,
    TestParentComponent,
    SampleComponent,
    CountdownTimerComponent,
    UnlessDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
