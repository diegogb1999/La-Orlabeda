import { TestBed } from '@angular/core/testing';

import { GalletaService } from './galleta.service';

describe('GalletaService', () => {
  let service: GalletaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalletaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
