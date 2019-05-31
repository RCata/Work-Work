import { Injectable } from '@angular/core';
import { UserService } from 'shared/user-service/user.service';
import { registerLocaleData } from '@angular/common';
import { AbstractService } from 'shared/abstracts/abstract-service.service';
import { ApiErrorResponse } from 'shared/models/error-response.model';
import { ApplicationActions } from 'store/actions/application.actions';
import { Links } from 'app/environments/links';

@Injectable()
export class LoginService extends AbstractService {
    constructor(
        private userService: UserService,
        private appAction: ApplicationActions
    ) {
        super();
    }

    doLogin(): any {
        const link: string = this.getLink(
            Links.REL_LOGIN,
            this.state().links.root
        );

        return this.httpClient
            .get(link, {
                withCredentials: true,
                responseType: 'text',
            })
            .subscribe(
                (jwt: string) => {
                    this.appAction.loginSuccess();
                    this.userService.token = jwt;
                    // could add language support here
                    const language = 'en_US';
                    this.userService.buildUserByToken(jwt, 'language');

                    // set locale ID on behalf of user language
                    const localeID: string = language.substring(0, 2);
                    registerLocaleData(localeID);
                    return true;
                },
                (err: ApiErrorResponse) => {
                    this.appAction.loginFailed(err);
                    return false;
                }
            );
    }
}
