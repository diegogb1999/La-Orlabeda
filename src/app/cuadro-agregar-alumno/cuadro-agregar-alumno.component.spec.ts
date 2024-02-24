import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadroAgregarAlumnoComponent } from './cuadro-agregar-alumno.component';

describe('CuadroAgregarAlumnoComponent', () => {
  let component: CuadroAgregarAlumnoComponent;
  let fixture: ComponentFixture<CuadroAgregarAlumnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuadroAgregarAlumnoComponent]
    });
    fixture = TestBed.createComponent(CuadroAgregarAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
