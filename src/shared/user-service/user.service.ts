import { JwtTokenService } from './jwt-token.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationActions } from 'store/actions/application.actions';
import { SessionStorageService } from 'ngx-webstorage';
import { User } from 'shared/models/user.model';
import * as moment from 'moment';
@Injectable({
    providedIn: 'root',
})
export class UserService {
    private _token: string;
    _user: User;

    constructor(
        private jwtTokenService: JwtTokenService,
        private appActions: ApplicationActions,
        private sessionStorage: SessionStorageService,
        private router: Router
    ) {}

    public getUser(): User {
        if (typeof this._user === 'undefined' || this._user === null) {
            const userFromSessionStorage: User = this.sessionStorage.retrieve(
                'user'
            );
            if (
                typeof userFromSessionStorage === 'undefined' ||
                userFromSessionStorage === null
            ) {
                this.router.navigate(['logout']);
            } else {
                this._user = userFromSessionStorage;
                return this._user;
            }
        } else {
            // check if user is still valid
            if (moment(this._user.exp * 1000).isBefore(moment(Date.now()))) {
                this.router.navigate(['logout']).then(() => {
                    setTimeout(() => {});
                });
                return undefined;
            }
            return this._user;
        }
    }

    public buildUserByToken(token: string, userLanguage: string): void {
        this._user = this.jwtTokenService.convertTokenToUser(token);
        if (typeof this._user !== 'undefined' && this._user !== null) {
            this._user.token = token;
            this._user.language = userLanguage;
        }
        this.addUserToSession(this._user);
    }

    private addUserToSession(user: User): void {
        this.sessionStorage.store('user', user);
    }

    set token(value: string) {
        this._token = value;
    }

    get token(): string {
        return this._token;
    }

    public logoutUser(): void {
        this.sessionStorage.clear();
        this._user = null;
        this.appActions.resetStore();
    }
}
