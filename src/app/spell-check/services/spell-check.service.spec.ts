/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SpellCheckService } from './spell-check.service';

describe('Service: SpellCheck', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpellCheckService]
    });
  });

  it('should ...', inject([SpellCheckService], (service: SpellCheckService) => {
    expect(service).toBeTruthy();
  }));
});
