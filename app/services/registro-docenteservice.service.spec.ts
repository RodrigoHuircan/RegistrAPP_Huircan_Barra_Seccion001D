import { TestBed } from '@angular/core/testing';

import { RegistroDocenteserviceService } from './registro-docenteservice.service';

describe('RegistroDocenteserviceService', () => {
  let service: RegistroDocenteserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroDocenteserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
