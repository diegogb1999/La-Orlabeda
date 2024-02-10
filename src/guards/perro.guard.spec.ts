import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { perroGuard } from './perro.guard';

describe('perroGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => perroGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
