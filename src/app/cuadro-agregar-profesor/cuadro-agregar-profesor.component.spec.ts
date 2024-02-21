import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadroAgregarProfesorComponent } from './cuadro-agregar-profesor.component';

describe('CuadroAgregarProfesorComponent', () => {
  let component: CuadroAgregarProfesorComponent;
  let fixture: ComponentFixture<CuadroAgregarProfesorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuadroAgregarProfesorComponent]
    });
    fixture = TestBed.createComponent(CuadroAgregarProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
