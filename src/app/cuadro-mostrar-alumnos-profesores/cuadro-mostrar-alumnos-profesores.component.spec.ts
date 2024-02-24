import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadroMostrarAlumnosProfesoresComponent } from './cuadro-mostrar-alumnos-profesores.component';

describe('CuadroMostrarAlumnosProfesoresComponent', () => {
  let component: CuadroMostrarAlumnosProfesoresComponent;
  let fixture: ComponentFixture<CuadroMostrarAlumnosProfesoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuadroMostrarAlumnosProfesoresComponent]
    });
    fixture = TestBed.createComponent(CuadroMostrarAlumnosProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
