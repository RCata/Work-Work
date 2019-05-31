import { Injectable } from '@angular/core';
import { AbstractService } from 'shared/abstracts/abstract-service.service';
import { LinksActions } from 'store/actions/links.actions';
import { isEmpty } from 'lodash';
import { environment } from 'environments/environment';
import { Link } from 'shared/hateoas/link.model';
import { ApiErrorResponse } from 'shared/models/error-response.model';

@Injectable()
export class LinkService extends AbstractService {
    constructor(private linksAction: LinksActions) {
        super();
    }

    public getRootLinks(): any {
        if (isEmpty(this.state().links.root)) {
            const rootLink: string = environment.ENDPOINT_ROOT;
            return this.httpClient.get(rootLink).subscribe(
                (links: Array<Link>) => {
                    this.linksAction.loadRootLinks(
                        this.deserializeArray(links, Link)
                    );
                },
                (err: ApiErrorResponse) => {
                    this.linksAction.loadRootLinksFailed(err);
                }
            );
        }
    }
}
