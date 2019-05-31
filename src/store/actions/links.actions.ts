import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { Link } from 'shared/hateoas/link.model';
import { ApiErrorResponse } from 'shared/models/error-response.model';
import { AbstractNotificationService } from 'shared/abstracts/abstract-notification.service';
export type LinkAction = FluxStandardAction<any, any>;

export class LinksActions extends AbstractNotificationService {
    static readonly LOAD_ROOT_LINKS: string = 'LOAD_ROOT_LINKS';
    static readonly LOAD_ROOT_LINKS_FAILED: string = 'LOAD_ROOT_LINKS_FAILED';

    @dispatch()
    loadRootLinks(links: Link[]): LinkAction {
        return {
            type: LinksActions.LOAD_ROOT_LINKS,
            payload: links,
            meta: null,
        };
    }

    @dispatch()
    loadRootLinksFailed(err: ApiErrorResponse): LinkAction {
        // this.error
        return {
            type: LinksActions.LOAD_ROOT_LINKS_FAILED,
            payload: null,
        };
    }
}
