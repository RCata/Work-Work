import {
    NgReduxModule,
    NgRedux,
    DevToolsExtension,
} from '@angular-redux/store';
import { NgModule } from '@angular/core';
import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { provideReduxForms } from '@angular-redux/form';
import { LinksActions } from 'store/actions/links.actions';
import { ApplicationActions } from 'store/actions/application.actions';
import { AppStateModel } from 'store/state.model';
import { rootReducer, initialState } from 'store/reducers/root.reducer';
import { UserActions } from 'store/actions/user.actions.';
@NgModule({
    imports: [NgReduxModule, NgReduxRouterModule.forRoot()],
    providers: [
        // actions
        LinksActions,
        ApplicationActions,
        UserActions,
    ],
})
export class StoreModule {
    constructor(
        public store: NgRedux<AppStateModel>,
        ngReduxRouter: NgReduxRouter
    ) {
        store.configureStore(rootReducer, initialState);

        if (ngReduxRouter) {
            ngReduxRouter.initialize();
        }

        provideReduxForms(store);
    }
}
