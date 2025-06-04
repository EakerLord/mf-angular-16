import { TestBed } from '@angular/core/testing';
import { ErrorService } from './error.service';

describe('ErrorService', () => {
  let service: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial error as empty string', (done) => {
    service.error$.subscribe(error => {
      expect(error).toBe('');
      done();
    });
  });

  it('should set error message on showError', (done) => {
    service.showError('Test error');
    service.error$.subscribe(error => {
      expect(error).toBe('Test error');
      done();
    });
  });

  it('should clear error message on clearError', (done) => {
    service.showError('Another error');
    service.clearError();
    service.error$.subscribe(error => {
      expect(error).toBe('');
      done();
    });
  });
});
