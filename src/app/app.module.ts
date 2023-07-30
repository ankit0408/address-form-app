import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule here
import { AppComponent } from './app.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { MainPageComponent } from './main-page/main-page.component';
import { Client1FormComponent } from './client1-form/client1-form.component';
import { Client2FormComponent } from './client2-form/client2-form.component';
import { Client3FormComponent } from './client3-form/client3-form.component';
import { Client4FormComponent } from './client4-form/client4-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Client5FormComponent } from './client5-form/client5-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AddressFormComponent,
    MainPageComponent,
    Client1FormComponent,
    Client2FormComponent,
    Client3FormComponent,
    Client4FormComponent,
    Client5FormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
