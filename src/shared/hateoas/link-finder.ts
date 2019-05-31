import { Link } from './link.model';
import { isEqual } from 'lodash';

export module LinkFinder {
    export function findLink(linkList: Array<Link>, rel: string): string {
        let href: string = null;
        if (linkList) {
            linkList.forEach((link: Link) => {
                if (isEqual(rel, link.rel)) {
                    href = link.href;
                }
            });
        } else {
            throw new Error('No available links');
        }
        return href;
    }
}
