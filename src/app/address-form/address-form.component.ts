import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from './address.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent {
  forms: FormGroup[] = [];
  currentForm: number = 0;
i: any;

  constructor(private formBuilder: FormBuilder, private addressService: AddressService) {
    for (let i = 0; i < 4; i++) {
      this.forms.push(this.formBuilder.group({
        address_line1: ['', Validators.required],
        address_line2: [''],
        city: ['', Validators.required],
        zip_code: ['', Validators.required],
        phone_number: ['', Validators.required]
      }));
    }
  }

  showForm(formNumber: number): void {
    this.currentForm = formNumber;
  }

  onPhoneNumberChange(form: FormGroup): void {
    const phoneNumber = form.get('phone_number')?.value;
    this.addressService.validatePhoneNumber(phoneNumber).subscribe(response => {
      // Handle the API response here if needed
      console.log(response);
    });
  }
}