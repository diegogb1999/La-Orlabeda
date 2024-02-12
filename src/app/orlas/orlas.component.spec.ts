import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrlasComponent } from './orlas.component';

describe('OrlasComponent', () => {
  let component: OrlasComponent;
  let fixture: ComponentFixture<OrlasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrlasComponent]
    });
    fixture = TestBed.createComponent(OrlasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
