import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Client4FormComponent } from './client4-form.component';

describe('Client4FormComponent', () => {
  let component: Client4FormComponent;
  let fixture: ComponentFixture<Client4FormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Client4FormComponent]
    });
    fixture = TestBed.createComponent(Client4FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
