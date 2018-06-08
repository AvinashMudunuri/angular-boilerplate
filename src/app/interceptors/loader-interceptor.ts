import { Injectable } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';
import { LoaderService } from '../shared/loader/loader.service';



@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.loaderService.show();
    return next.handle(req)
      .pipe(
        finalize(() => {
          this.loaderService.hide();
        })
      );
  }
}
