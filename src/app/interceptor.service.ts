import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
    providedIn :'root',
})
export class InterceptorService implements HttpInterceptor
{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        if(token!=null)
        {
            req = req.clone({
                headers:req.headers.set('Authorization' ,`bearer ${token}`)
            })
        }
        return next.handle(req)
        .pipe(
            catchError((error : HttpErrorResponse)=>{
                let errorMsg='';

                if(error.error instanceof ErrorEvent)
                {
                    errorMsg = 'Error :${error.error.message}'
                }

                else
                {
                    errorMsg = 'Error Code :${error.status}, Message :${error.message}';
                }

                console.log(errorMsg);

                return throwError(errorMsg);
            })
        )
    }

}

