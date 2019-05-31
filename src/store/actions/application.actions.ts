import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { ApiErrorResponse } from 'shared/models/error-response.model';
import { AbstractNotificationService } from 'shared/abstracts/abstract-notification.service';

// Flux-standard-action gives us stronger typing of our actions.
export type ApplicationDataAction = FluxStandardAction<any, any>;

@Injectable()
export class ApplicationActions extends AbstractNotificationService {
    static readonly RESET_STORE: string = 'RESET_STORE';
    static readonly LOGIN_SUCCESS: string = 'LOGIN_SUCCESS';
    static readonly LOGIN_FAILED: string = 'LOGIN_FAILED';

    @dispatch()
    resetStore = (): ApplicationDataAction => ({
        type: ApplicationActions.RESET_STORE,
        payload: null,
        meta: null,
    })

    @dispatch()
    loginSuccess(): ApplicationDataAction {
        // this.success
        return {
            type: ApplicationActions.LOGIN_SUCCESS,
            payload: null,
            meta: null,
        };
    }

    @dispatch()
    loginFailed(err: ApiErrorResponse): ApplicationDataAction {
        // this.failed
        return {
            type: ApplicationActions.LOGIN_FAILED,
            payload: null,
            meta: null,
        };
    }
}
