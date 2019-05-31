import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgRedux } from '@angular-redux/store';
import { Injectable, Injector } from '@angular/core';
import { AppStateModel } from 'store/state.model';
import { ObjectMapperService } from 'shared/model-serializer/object-mapper.service';
import { ResourceList } from 'shared/hateoas/resource-list.model';
import { Link } from 'shared/hateoas/link.model';
import { LinkFinder } from 'shared/hateoas/link-finder';
import { AppInjector } from 'shared/abstracts/app-injector.service';

/**
 * needed for generic object deserialization in order to bypass compile time restricton
 */
type NoParamConstructor<T> = new () => T;

@Injectable()
export abstract class AbstractService {
    protected httpClient: HttpClient;
    protected store: NgRedux<AppStateModel>;
    protected objectMapper: ObjectMapperService;

    constructor() {
        const injector: Injector = AppInjector.getInjector();
        this.httpClient = injector.get(HttpClient);
        this.store = injector.get(NgRedux);
        this.objectMapper = injector.get(ObjectMapperService);
    }

    protected state(): AppStateModel {
        return this.store.getState();
    }

    protected deserialize<T>(
        data: ResourceList<T>,
        ctor: NoParamConstructor<T>
    ): ResourceList<T> {
        const res: ResourceList<T> = new ResourceList<T>();
        data.elements.forEach((element: T) => {
            res.elements.push(this.objectMapper.deserialize(ctor, element));
        });
        data.links.forEach((element: Link) => {
            res.links.push(this.objectMapper.deserialize(Link, element));
        });
        return res;
    }

    protected deserializeArray<T>(
        data: Array<T>,
        ctor: NoParamConstructor<T>
    ): Array<T> {
        const res: Array<T> = new Array<T>();
        data.forEach((element: T) => {
            res.push(this.objectMapper.deserialize(ctor, element));
        });
        return res;
    }

    protected getLink(rel: string, linkList: Array<Link>): string {
        return LinkFinder.findLink(linkList, rel);
    }
}
