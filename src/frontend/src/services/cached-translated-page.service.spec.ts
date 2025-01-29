import { TestBed } from '@angular/core/testing';

import { CachedTranslatedPageService } from './cached-translated-page.service';

describe('CachedTranslationService', () => {
  let service: CachedTranslatedPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CachedTranslatedPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
