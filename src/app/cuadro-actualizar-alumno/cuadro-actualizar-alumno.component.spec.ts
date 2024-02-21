import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadroActualizarAlumnoComponent } from './cuadro-actualizar-alumno.component';

describe('CuadroActualizarAlumnoComponent', () => {
  let component: CuadroActualizarAlumnoComponent;
  let fixture: ComponentFixture<CuadroActualizarAlumnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuadroActualizarAlumnoComponent]
    });
    fixture = TestBed.createComponent(CuadroActualizarAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
