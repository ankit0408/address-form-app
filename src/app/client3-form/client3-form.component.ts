// address-form.component.ts

import { Component } from '@angular/core';
import { stateOptions } from '../constants/state-options';
import { ApiService } from '../api.service'; // Import the service

@Component({
  selector: 'app-address-form',
  templateUrl: './client3-form.component.html',
  styleUrls: ['./client3-form.component.css']

})
export class Client3FormComponent {
  stateOptions: string[] = stateOptions;
  addressOptions: string[] = [];
  formData: any = {}; // Replace 'any' with the appropriate interface/type for your form data
  suggestions: string[] = [];
  showSuggestions: boolean = false;
  showPopup: boolean = false;
  popupData: string = '';
  showModal: boolean = false;



  constructor(private apiService: ApiService) { }

  onSave(): void {
    console.log('testing')
    const apiUrl = 'http://localhost:5000/api/store_address';

    // Send the form data to the API using HttpClient's post method
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
    // Logic to save the form data to the backend API
    // You can use this.formData to access the form data and send it to the backend
  }


  onPhoneNumberChange() {
    // Call the API with the entered phone number
    const phoneNumber = this.formData.phone;
    if (phoneNumber) {
      this.apiService.getData(phoneNumber).subscribe(
        (response: any) => {
          // Assuming the API returns an array of suggestions for the dropdown
          this.suggestions = response;
          this.showModal = this.suggestions.length > 0;
          this.showSuggestions = this.suggestions.length > 0;
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

  onSuggestionSelected(suggestion: string) {
    this.showModal = false;
    console.log(suggestion);
    // Create the complete address variable
    const completeAddress = suggestion;

    // Prepare the API URL with the complete_address as a query parameter
    const entities = 'address'
    // Call the API using HttpClient's get method
    this.apiService.getEntity(completeAddress, entities).subscribe(
      (response: any) => {
        // Handle the response from the API with the selected suggestion data
        console.log('API Response with selected suggestion:', response);
        if (response) {
          // Assuming the response is a dictionary with properties like 'name', 'pincode', etc.
          console.log(response[0]);
          this.formData.name = response['name'];
          this.formData.phone = this.formData.phone;
          this.formData.address = suggestion
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
