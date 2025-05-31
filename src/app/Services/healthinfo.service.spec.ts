import { TestBed } from '@angular/core/testing';

import { HealthinfoService } from './healthinfo.service';

describe('HealthinfoService', () => {
  let service: HealthinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
