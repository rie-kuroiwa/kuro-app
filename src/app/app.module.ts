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
import { PurchasingCollectionComponent } from './components/purchasing-collection/purchasing-collection.component';
import { PurchasingDetailComponent } from './components/purchasing-detail/purchasing-detail.component';
import { SpecificationCollectionComponent } from './components/specification-collection/specification-collection.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductCollectionComponent } from './components/product-collection/product-collection.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { PurchasedProductListComponent } from './components/purchased-product-list/purchased-product-list.component';
import { LineGraphComponent } from './components/charts/line-graph/line-graph.component';
import { ReportComponent } from './pages/report/report.component';
import { ColumnChartComponent } from './components/charts/column-chart/column-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    InputChildComponent,
    TestParentComponent,
    SampleComponent,
    CountdownTimerComponent,
    UnlessDirective,
    HttpClientComponent,
    PurchasingListComponent,
    PurchasingCollectionComponent,
    PurchasingDetailComponent,
    SpecificationCollectionComponent,
    MenuBarComponent,
    ProductListComponent,
    ProductCollectionComponent,
    ProductDetailComponent,
    PurchasedProductListComponent,
    LineGraphComponent,
    ReportComponent,
    ColumnChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [HttpClientService],
  bootstrap: [AppComponent],
})
export class AppModule {}
