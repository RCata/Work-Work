import { FluxStandardAction } from 'flux-standard-action';
import { ResourceList } from 'shared/hateoas/resource-list.model';
import { AbstractNotificationService } from 'shared/abstracts/abstract-notification.service';
import { User } from 'shared/models/user.model';
import { ApiErrorResponse } from 'shared/models/error-response.model';
import { dispatch } from '@angular-redux/store';
export type UserAction = FluxStandardAction<any, any>;

export class UserActions extends AbstractNotificationService {
    static readonly GET_USERS_SUCCESS: string = 'GET_USERS_SUCCESS';
    static readonly GET_USERS_FAILED: string = 'GET_USERS_FAILED';
    static readonly GET_USERS_LOADER: string = 'GET_USERS_LOADER';

    @dispatch()
    setUsersInStoreSuccess(users: ResourceList<User>): UserAction {
        // this.success
        this.usersLoader(false);
        return {
            type: UserActions.GET_USERS_SUCCESS,
            payload: users,
            meta: null,
        };
    }

    @dispatch()
    setUsersInStoreFailed(err: ApiErrorResponse): UserAction {
        // this.error
        this.usersLoader(false);
        return {
            type: UserActions.GET_USERS_FAILED,
            payload: null,
            meta: null,
        };
    }

    @dispatch()
    usersLoader(loading: boolean): UserAction {
        return {
            type: UserActions.GET_USERS_LOADER,
            payload: loading,
            meta: null,
        };
    }
}
