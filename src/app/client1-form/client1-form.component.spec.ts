import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Client1FormComponent } from './client1-form.component';

describe('Client1FormComponent', () => {
  let component: Client1FormComponent;
  let fixture: ComponentFixture<Client1FormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Client1FormComponent]
    });
    fixture = TestBed.createComponent(Client1FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
