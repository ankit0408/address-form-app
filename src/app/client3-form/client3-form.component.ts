// address-form.component.ts

import { Component } from '@angular/core';
import { stateOptions } from '../constants/state-options';
import { ApiService } from '../api.service'; // Import the service

interface SuggestionObject {
  [key: string]: string;
}

@Component({
  selector: 'app-address-form',
  templateUrl: './client3-form.component.html',
  styleUrls: ['./client3-form.component.css']

})
export class Client3FormComponent {
  stateOptions: string[] = stateOptions;
  addressOptions: string[] = [];
  formData: any = {}; // Replace 'any' with the appropriate interface/type for your form data
  suggestions: SuggestionObject = {};
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
    console.log(this.suggestions);

    var formAddress = { ...this.formData };
    delete formAddress.entities;
    delete formAddress.complete_address;


    if (this.selectedAddressId) {
      this.apiService.updateEntitiesData(formAddress, this.selectedAddressId).subscribe(
        (response: any) => {
          console.log('API Response after saving data:', response);
          console.log(JSON.stringify(response['entities']))
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
    // Call the API with the entered phone number
    const phoneNumber = this.formData.phone;
    if (phoneNumber) {
      this.apiService.getData(phoneNumber).subscribe(
        (response: any) => {
          // Assuming the API returns an array of suggestions for the dropdown
          this.suggestions = response;
          this.showModal = Object.keys(this.suggestions).length > 0;
          this.showSuggestions = Object.keys(this.suggestions).length > 0;
        },
        (error: any) => {
          console.error('Error fetching data from the API:', error);
          // Handle errors here if necessary
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
    this.selectedAddress = value;

    // Prepare the API URL with the complete_address as a query parameter
    const entities = ['name','address']
    // Call the API using HttpClient's get method
    this.apiService.getClientEntity(this.selectedAddressId, entities).subscribe(
      (response: any) => {
        // Handle the response from the API with the selected suggestion data
        console.log('API Response with selected suggestion:', response);
        this.loading = false;
        if (response) {
          // Assuming the response is a dictionary with properties like 'name', 'pincode', etc.
          console.log(response);
          console.log(response['entities'])
          this.formData.name = response['name'];
          this.formData.phone = this.formData.phone;
          this.formData.address = response['address'];
          this.showEntities = true;
          this.showAddress = true;
          this.formData.entities = JSON.stringify(response['db_entities']);
          this.formData.complete_address = this.selectedAddress;
        }
      },
      (error: any) => {
        console.error('Error fetching data from the API:', error);
        this.loading = false;
        // Handle errors here if necessary
      }
    );
  }
 
  onCancelSuggestions(): void {
    this.showModal = false;
  }
  
  onCancel(): void {
    // Logic to clear the form fields and reset the form
    this.formData = {};
  }
}
