// address-form.component.ts

import { Component } from '@angular/core';
import { stateOptions } from '../constants/state-options';
import { ApiService } from '../api.service'; // Import the service

interface SuggestionObject {
  [key: string]: string;
}

@Component({
  selector: 'app-address-form',
  templateUrl: './client2-form.component.html',
  styleUrls: ['./client2-form.component.css']

})
export class Client2FormComponent {
  stateOptions: string[] = stateOptions;
  addressOptions: string[] = [];
  suggestions: SuggestionObject = {};
  formData: any = {}; // Replace 'any' with the appropriate interface/type for your form data
  showSuggestions: boolean = false;
  showPopup: boolean = false;
  popupData: string = '';
  showModal: boolean = false;
  selectedAddressId: string = '';
  loading: boolean = false;
  showEntities: boolean = false;
  showAddress: boolean = false;  
  selectedAddress: string = '';



  constructor(private apiService: ApiService) { }

  onSave(): void {
    this.loading = true;
    console.log(this.formData)
    console.log(this.selectedAddressId);


    if (this.selectedAddressId) {
      this.apiService.updateEntitiesData(this.formData, this.selectedAddressId).subscribe(
        (response: any) => {
          console.log('API Response after saving data:', response);
          this.loading = false;
          this.showEntities = true;
          this.showAddress = true;
          this.formData.entities = JSON.stringify(response['entities']);
          this.formData.complete_address = response.complete_address;
        },
        (error: any) => {
          console.error('Error sending data to the API:', error);
          this.loading = false;
        }
      );
    } else {
      this.apiService.saveData(this.formData).subscribe(
        (response: any) => {
          console.log('API Response after saving data:', response);
          this.loading = false;
          this.showEntities = true;
          this.showAddress = true;
          this.formData.entities = JSON.stringify(response['entities']);
          this.formData.complete_address = response.complete_address;
        },
        (error: any) => {
          console.error('Error sending data to the API:', error);
          this.loading = false;
        }
      );
    }
  }

  onPhoneNumberChange() {
    const phoneNumber = this.formData.phone;
    if (phoneNumber) {
      this.apiService.getData(phoneNumber).subscribe(
        (response: any) => {
          this.suggestions = response;
          this.showModal = Object.keys(this.suggestions).length > 0;
          this.showSuggestions = Object.keys(this.suggestions).length > 0;
        },
        (error: any) => {
          console.error('Error fetching data from the API:', error);
        }
      );
    } else {
      this.showSuggestions = false;
    }
  }

  onSuggestionSelected(key: string, value: string) {
    this.loading = true;
    this.showModal = false;
    console.log(value);
    console.log(key);
    this.selectedAddressId = key;
    this.selectedAddress = value;

    const entities = [
      'name',
      'country',
      'pincode',
      'flat/House no./Building/Company/Apartment',
      'area/street',
      'city/district/town',
      'state',
      'landmark'
    ];

    console.log('kjhsdgf');
    this.apiService.getClientEntity(this.selectedAddressId, entities).subscribe(
      (response: any) => {
        console.log('API Response with selected suggestion:', response);
        this.loading = false;
        if (response) {
          console.log(response);
          this.formData.name = response['name'];
          this.formData.pincode = response['pincode'];
          this.formData.flat = response['flat/House no./Building/Company/Apartment'];
          this.formData.area = response['area/street'];
          this.formData.city = response['city/district/town'];
          this.formData.state = response['state'].toLowerCase();
          this.formData.landmark = response['landmark'];
          this.formData.country = response['country'];
          this.showEntities = true;
          this.showAddress = true;
          this.formData.entities = JSON.stringify(response['db_entities']);
          this.formData.complete_address = this.selectedAddress;
        }
      },
      (error: any) => {
        console.error('Error fetching data from the API:', error);
        this.loading = false;
      }
    );
  }

  onCancelSuggestions(): void {
    this.showModal = false;
  }

  onCancel(): void {
    this.formData = {};
  }

}
