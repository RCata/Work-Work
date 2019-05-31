import { Reducer } from 'redux';
import { ResourceList } from 'shared/hateoas/resource-list.model';
import { User } from 'shared/models/user.model';
import { UserActions, UserAction } from 'store/actions/user.actions.';
export const initialUserListState: ResourceList<User> = null;

export const userReducer: Reducer<any> = (
    state: ResourceList<User> = initialUserListState,
    action: UserAction
): ResourceList<User> => {
    switch (action.type) {
        case UserActions.GET_USERS_SUCCESS:
            return Object.assign(ResourceList, action.payload);
        default:
            return state;
    }
};
