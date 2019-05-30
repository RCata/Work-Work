import { BaseResource } from './base-resource.model';
import { Link } from './link.model';

export class ResourceList<T extends BaseResource>{
    elements: Array<T>;
    links: Array<Link>;
}