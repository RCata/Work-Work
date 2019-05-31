import { AppStateModel } from '../state.model';
import { initialLinkState, linksReducer } from './link.reducer';
import { ApplicationActions } from '../actions/application.actions';
import { composeReducers } from '@angular-redux/form';
import { combineReducers, Reducer } from 'redux';
import { FluxStandardAction } from 'flux-standard-action';
import { initialUserListState, userReducer } from 'store/reducers/user.reducer';

export const initialState: AppStateModel = {
    links: initialLinkState,
    userList: initialUserListState,
};

const appReducer: Reducer<AppStateModel> = composeReducers(
    combineReducers({
        links: linksReducer,
        userList: userReducer,
    })
);

/**
 * Root reducer is the main reducer of whole application.
 * It resets store to initial state on user logout.
 * See https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store/35641992#35641992 for more information.
 * @param state
 * @param action
 */
export const rootReducer: Reducer<AppStateModel> = (
    state: AppStateModel,
    action: FluxStandardAction<any, any>
): AppStateModel => {
    if (action.type === ApplicationActions.RESET_STORE) {
        state = undefined;
    }

    return appReducer(state, action);
};
