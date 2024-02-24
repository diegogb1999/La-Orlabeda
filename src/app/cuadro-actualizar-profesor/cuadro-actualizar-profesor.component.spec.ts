import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadroActualizarProfesorComponent } from './cuadro-actualizar-profesor.component';

describe('CuadroActualizarProfesorComponent', () => {
  let component: CuadroActualizarProfesorComponent;
  let fixture: ComponentFixture<CuadroActualizarProfesorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuadroActualizarProfesorComponent]
    });
    fixture = TestBed.createComponent(CuadroActualizarProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
