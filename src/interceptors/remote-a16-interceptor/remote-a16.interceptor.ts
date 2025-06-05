import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RemoteA16Interceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiHost = 'http://localhost:4202';
    let newReq = req;
    if (!req.url.startsWith('http')) {
      newReq = req.clone({ url: apiHost + req.url });
    }
    console.log('Intercepted by RemoteA16Interceptor');
    return next.handle(newReq);
  }
}
