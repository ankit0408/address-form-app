import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {}
  title = 'address-form-app';

  goToClientForm(clientNumber: number): void {
    // Navigate to the corresponding client form page based on clientNumber
    this.router.navigate(['/client' + clientNumber]);
  }
}
