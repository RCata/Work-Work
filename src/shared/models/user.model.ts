import { BaseResource } from '../hateoas/base-resource.model';

export class User extends BaseResource {
    firstName: string = null;
    lastName: string = null;
    phone: string = null;
    role: boolean = false;
    token: string = null;
    exp: number;
    language: string = null;
}
