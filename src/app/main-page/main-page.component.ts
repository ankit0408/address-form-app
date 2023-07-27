// import { Component } from '@angular/core';
import { Router } from '@angular/router';

// @Component({
//   selector: 'app-main-page',
//   templateUrl: './main-page.component.html',
//   styleUrls: ['./main-page.component.css']
// })
// export class MainPageComponent {
//   // constructor(private router: Router) {}
//   title = 'main-form-app';

//   // openClientForm(clientNumber: number): void {
//   //   // Navigate to the respective client's form page
//   //   this.router.navigate(['/client-form', clientNumber]);
//   // }
// }


import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
// export class MainPageComponent {
//   title = 'main-form-app';
// }

export class MainPageComponent {
  constructor(private router: Router) {}

  goToClientForm(clientNumber: number): void {
    // Navigate to the corresponding client form page based on clientNumber
    this.router.navigate(['/client' + clientNumber]);
  }
}

