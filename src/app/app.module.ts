import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputChildComponent } from './components/input-child/input-child.component';
import { TestParentComponent } from './pages/test-parent/test-parent.component';
import { SampleComponent } from './sample/sample.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CountdownTimerComponent } from './components/countdown-timer/countdown-timer.component';
import { UnlessDirective } from './directive/unless.directive';
import { HttpClientService } from './service/http-client.service';
import { HttpClientComponent } from './components/http-client/http-client.component';
import { PurchasingListComponent } from './pages/purchasing-list/purchasing-list.component';


@NgModule({
  declarations: [
    AppComponent,
    InputChildComponent,
    TestParentComponent,
    SampleComponent,
    CountdownTimerComponent,
    UnlessDirective,
    HttpClientComponent,
    PurchasingListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
