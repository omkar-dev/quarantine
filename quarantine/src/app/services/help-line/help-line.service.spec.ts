import { TestBed } from '@angular/core/testing';

import { HelpLineService } from './help-line.service';

describe('HelpLineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HelpLineService = TestBed.get(HelpLineService);
    expect(service).toBeTruthy();
  });
});
