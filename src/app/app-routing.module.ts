import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestParentComponent } from './pages/test-parent/test-parent.component';
import { SampleComponent } from './sample/sample.component';
import { PurchasingListComponent } from './pages/purchasing-list/purchasing-list.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ReportComponent } from './pages/report/report.component';

const routes: Routes = [
  { path: '', redirectTo: '/purchasing-list', pathMatch: 'full' },
  {
    path: 'purchasing-list',
    component: PurchasingListComponent,
    data: { animation: 'PurchasingList' },
  },
  {
    path: 'product-list',
    component: ProductListComponent,
    data: { animation: 'ProductList' },
  },
  { path: 'report', component: ReportComponent },
  { path: 'test-parent', component: TestParentComponent },
  { path: 'sample', component: SampleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
