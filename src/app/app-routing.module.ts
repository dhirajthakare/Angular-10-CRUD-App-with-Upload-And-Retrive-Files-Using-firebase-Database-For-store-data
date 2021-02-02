import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InformationComponent } from './information/information.component';
import { MainComponent } from './main/main.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {
    path:'' , component:MainComponent
  },
  {
    path:'Registration' , component:RegistrationComponent
  },
  {
    path:'information' , component:InformationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
