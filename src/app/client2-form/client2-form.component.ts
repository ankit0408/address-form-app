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



  constructor(private apiService: ApiService) { }

  onSave(): void {
    console.log(this.formData)
    console.log(this.selectedAddressId);
    console.log(this.suggestions);


    if (this.selectedAddressId) {
      this.apiService.updateEntitiesData(this.formData, this.selectedAddressId).subscribe(
        (response: any) => {
          // Handle the API response after saving the data
          console.log('API Response after saving data:', response);
        },
        (error: any) => {
          console.error('Error sending data to the API:', error);
          // Handle errors here if necessary
        }
      );
    } else {
      this.apiService.saveData(this.formData).subscribe(
        (response: any) => {
          // Handle the API response after saving the data
          console.log('API Response after saving data:', response); 
        },
        (error: any) => {
          console.error('Error sending data to the API:', error);
          // Handle errors here if necessary
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

  // onSuggestionSelected(suggestion: string) {
  //   console.log(suggestion)
  //   this.showSuggestions = false;
  //   this.popupData = suggestion;
  //   this.showPopup = true;
  //   // this.apiService.getData(suggestion).subscribe(
  //   //   (response: any) => {
  //   //     // Handle the response from the API with the selected phone number
  //   //     // You can do whatever processing you need with the response data here
  //   //     console.log('API Response with selected phone number:', response);
  //   //   },
  //   //   (error: any) => {
  //   //     console.error('Error fetching data from the API:', error);
  //   //     // Handle errors here if necessary
  //   //   }
  //   // );
  // }

  onPopupClick() {
    // Call the API with the clicked data
    const clickedData = this.popupData;
    // this.apiService.getData(clickedData).subscribe(
    //   (response: any) => {
    //     // Handle the response from the API with the clicked data
    //     // You can do whatever processing you need with the response data here
    //     console.log('API Response with clicked data:', response);
    //     // You can also close the pop-up here if needed
    //     this.showPopup = false;
    //   },
    //   (error: any) => {
    //     console.error('Error fetching data from the API:', error);
    //     // Handle errors here if necessary
    //     // You can also close the pop-up here if needed
    //     this.showPopup = false;
    //   }
    // );
  }

  onSuggestionSelected(key: string, value: string) {
    this.showModal = false;
    console.log(value);
    console.log(key);
    const address_id = key;

    // Prepare the API URL with the complete_address as a query parameter
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

    // Call the API using HttpClient's get method
    this.apiService.getClientEntity(address_id, entities).subscribe(
      (response: any) => {
        // Handle the response from the API with the selected suggestion data
        console.log('API Response with selected suggestion:', response);
        if (response) {
          // Assuming the response is a dictionary with properties like 'name', 'pincode', etc.
          console.log(response);
          this.formData.name = response['name'];
          this.formData.pincode = response['pincode'];
          this.formData.flat = response['flat/House no./Building/Company/Apartment'];
          this.formData.area = response['area/street'];
          this.formData.city = response['city/district/town'];
          this.formData.state = response['state'].toLowerCase();
          this.formData.landmark = response['landmark'];
          this.formData.country = response['country'];
        }
      },
      (error: any) => {
        console.error('Error fetching data from the API:', error);
        // Handle errors here if necessary
      }
    );
  }

  onCancel(): void {
    // Logic to clear the form fields and reset the form
    this.formData = {};
  }
}
