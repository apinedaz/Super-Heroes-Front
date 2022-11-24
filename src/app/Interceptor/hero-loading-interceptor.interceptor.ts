import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable()
export class HeroLoadingInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    Swal.fire({
      text: 'Cargando...',
      didOpen: () => {
        Swal.showLoading(Swal.getConfirmButton())
      }
    });


    return next.handle(request).pipe(map((Event: HttpEvent<any>) => {
      if(Event.type == 0){
        Swal.close();
      }
      return Event;
    })); 
  }
}
