import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { includes, findIndex } from 'lodash';
import { Router } from '@angular/router';
import { LoadingService } from '../components/loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptor {
  private loaderUrls: any[] = [];

  constructor(private loaderService: LoadingService, private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request: any = req.clone();
    if (req.params.has('isHideLoader')) {
      request.urlWithParams = request.urlWithParams.replace('&isHideLoader=true', '').replace('?isHideLoader=true', '');
    } else {
      if (!includes(request.urlWithParams, 'assets/')) {
        this.loaderUrls.push(request.urlWithParams);
        this.showLoader();
      }
    }

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            const f = findIndex(this.loaderUrls, (item: any) => {
              return includes(item, event.url);
            });
            this.loaderUrls.splice(f, 1);
            if (this.loaderUrls.length === 0) {
              this.onEnd();
            }
          }
        },
        (err: any) => {
          this.onEnd();
        }
      ),
      finalize(() => {
        if (!event) {
          const f = findIndex(this.loaderUrls, (item: any) => {
            return includes(item, req.urlWithParams);
          });
          this.loaderUrls.splice(f, 1);
          if (this.loaderUrls.length === 0) {
            this.onEnd();
          }
        }
      })
    );
  }

  private onEnd(): void {
    this.loaderUrls=[];
    this.hideLoader();
  }

  private showLoader(): void {
    this.loaderService.show();
  }

  private hideLoader(): void {
    this.loaderService.hide();
  }
}
