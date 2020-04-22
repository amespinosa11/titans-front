import { TestBed } from '@angular/core/testing';

import { EstrategiaService } from './estrategia.service';

describe('EstrategiaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstrategiaService = TestBed.get(EstrategiaService);
    expect(service).toBeTruthy();
  });
});
