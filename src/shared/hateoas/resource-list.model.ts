import { Link } from './link.model';

export class ResourceList<T> {
    elements: Array<T>;
    links: Array<Link>;
}
