import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadroEliminarAlumnoComponent } from './cuadro-eliminar-alumno.component';

describe('CuadroEliminarAlumnoComponent', () => {
  let component: CuadroEliminarAlumnoComponent;
  let fixture: ComponentFixture<CuadroEliminarAlumnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuadroEliminarAlumnoComponent]
    });
    fixture = TestBed.createComponent(CuadroEliminarAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
