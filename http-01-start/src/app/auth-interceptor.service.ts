import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Intercepter is go on');
        const modifiedRequest = req.clone({
            headers: req.headers.append('auth', 'xyz')
        })
        return next.handle(modifiedRequest).pipe(tap(event => {
            if (event.type === HttpEventType.Response) {
                console.log(event.body);
            }
        }));
    }
}