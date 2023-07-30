// address-form.component.ts

import { Component } from '@angular/core';
import { stateOptions } from '../constants/state-options';
import { ApiService } from '../api.service'; 

interface SuggestionObject {
  [key: string]: string;
}

@Component({
  selector: 'app-address-form',
  templateUrl: './client4-form.component.html',
  styleUrls: ['./client4-form.component.css']

})
export class Client4FormComponent {
  stateOptions: string[] = stateOptions;
  addressOptions: string[] = [];
  formData: any = {};
  suggestions: SuggestionObject = {};
  showSuggestions: boolean = false;
  showPopup: boolean = false;
  popupData: string = '';
  showModal: boolean = false;
  selectedAddressId: string = '';
  loading: boolean = false;



  constructor(private apiService: ApiService) { }

  onSave(): void {
    this.loading = true;
    console.log(this.formData)
    console.log(this.selectedAddressId);
    console.log(this.suggestions);


    if (this.selectedAddressId) {
      this.apiService.updateEntitiesData(this.formData, this.selectedAddressId).subscribe(
        (response: any) => {
          console.log('API Response after saving data:', response);
          this.loading = false;
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
    this.showModal = false;
    this.loading = true;
    console.log(value);
    console.log(key);
    this.selectedAddressId = key;

    const entities = [
      'name',
      'pin',
      'state',
      'Address(House No., Building, Area, Street)',
      'locality',
      'City/District/Town'
    ];

    this.apiService.getClientEntity(this.selectedAddressId, entities).subscribe(
      (response: any) => {
        console.log('API Response with selected suggestion:', response);
        this.loading = false;
        if (response) {
          console.log(response);
          this.formData.name = response['name'];
          this.formData.pin = response['pin'];
          this.formData.locality = response['locality'];
          this.formData.address = response['Address(House No., Building, Area, Street)'];
          this.formData.city = response['City/District/Town'];
          this.formData.state = response['state'].toLowerCase();
          this.formData.phone = this.formData.phone;
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
