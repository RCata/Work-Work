import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'shared/models/user.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const user: User = this.sessionStorage.retrieve('user');
        if (user && user.token) {
            request = request.clone({
                setHeaders: {
                    JWT: user.token,
                },
            });
        }
        return next.handle(request);
    }

    constructor(private sessionStorage: SessionStorageService) {}
}
