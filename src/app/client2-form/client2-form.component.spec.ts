import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Client2FormComponent } from './client2-form.component';

describe('Client2FormComponent', () => {
  let component: Client2FormComponent;
  let fixture: ComponentFixture<Client2FormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Client2FormComponent]
    });
    fixture = TestBed.createComponent(Client2FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
