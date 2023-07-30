import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { Client1FormComponent } from './client1-form/client1-form.component';
import { Client2FormComponent } from './client2-form/client2-form.component';
import { Client3FormComponent } from './client3-form/client3-form.component';
import { Client4FormComponent } from './client4-form/client4-form.component';
import { Client5FormComponent } from './client5-form/client5-form.component';

// import { ClientFormComponent } from './client-form/client-form.component'; // Replace this with the actual client form component path

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' }, // Default route to main page
  { path: 'main', component: MainPageComponent },
  { path: 'client1', component: Client1FormComponent },
  { path: 'client2', component: Client2FormComponent },
  { path: 'client3', component: Client3FormComponent },
  { path: 'client4', component: Client4FormComponent },
  { path: 'client5', component: Client5FormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
