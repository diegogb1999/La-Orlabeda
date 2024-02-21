import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadroEliminarProfesorComponent } from './cuadro-eliminar-profesor.component';

describe('CuadroEliminarProfesorComponent', () => {
  let component: CuadroEliminarProfesorComponent;
  let fixture: ComponentFixture<CuadroEliminarProfesorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuadroEliminarProfesorComponent]
    });
    fixture = TestBed.createComponent(CuadroEliminarProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
