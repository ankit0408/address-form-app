import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Client5FormComponent } from './client5-form.component';

describe('Client5FormComponent', () => {
  let component: Client5FormComponent;
  let fixture: ComponentFixture<Client5FormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Client5FormComponent]
    });
    fixture = TestBed.createComponent(Client5FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
