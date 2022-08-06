import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {
    constructor() {

    }

    intercept(httpRequest: HttpRequest<any>,next: HttpHandler) : Observable<HttpEvent<any>>{
        return next.handle(httpRequest).pipe(
            catchError((error: HttpResponse<any>) => {
                console.log(error);
                return throwError(error);
            }
        ));
    }
}