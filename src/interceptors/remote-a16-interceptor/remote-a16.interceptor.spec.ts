import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RemoteA16Interceptor } from './remote-a16.interceptor';

describe('RemoteA16Interceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  const apiHost = 'http://localhost:4202';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: RemoteA16Interceptor,
          multi: true
        }
      ]
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    spyOn(console, 'log');
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should prepend the API host to relative URLs', () => {
    http.get('/users').subscribe();
    const req = httpMock.expectOne(apiHost + '/users');
    expect(req.request.url).toBe(apiHost + '/users');
    expect(console.log).toHaveBeenCalledWith('Intercepted by RemoteA16Interceptor');
    req.flush({});
  });

  it('should not modify absolute URLs', () => {
    http.get('https://external.com/data').subscribe();
    const req = httpMock.expectOne('https://external.com/data');
    expect(req.request.url).toBe('https://external.com/data');
    expect(console.log).toHaveBeenCalledWith('Intercepted by RemoteA16Interceptor');
    req.flush({});
  });
});
