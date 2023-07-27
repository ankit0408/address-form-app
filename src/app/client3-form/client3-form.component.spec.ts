import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Client3FormComponent } from './client3-form.component';

describe('Client3FormComponent', () => {
  let component: Client3FormComponent;
  let fixture: ComponentFixture<Client3FormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Client3FormComponent]
    });
    fixture = TestBed.createComponent(Client3FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
