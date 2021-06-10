import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestParentComponent } from './pages/test-parent/test-parent.component';
import {SampleComponent} from './sample/sample.component';

const routes: Routes = [
  {path:'',redirectTo:'/test-parent', pathMatch:'full'},
  {path:'test-parent',component:TestParentComponent},
  {path:'sample',component:SampleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
