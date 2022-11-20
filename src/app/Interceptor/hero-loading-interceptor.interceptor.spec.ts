import { TestBed } from '@angular/core/testing';

import { HeroLoadingInterceptorInterceptor } from './hero-loading-interceptor.interceptor';

describe('HeroLoadingInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HeroLoadingInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HeroLoadingInterceptorInterceptor = TestBed.inject(HeroLoadingInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
