import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { LandingPageComponent } from './core/component/landing-page/landing-page.component';
import { ResultPageComponent } from './core/component/result-page/result-page.component';

const routes: Routes = [{ path: '', component: LandingPageComponent },
{ path: 'results', component: ResultPageComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
