import { Link } from 'shared/hateoas/link.model';
import { ResourceList } from 'shared/hateoas/resource-list.model';
import { User } from 'shared/models/user.model';

export interface AppStateModel {
    links: {
        root: Array<Link>;
        planner: Array<Link>;
    };
    userList: ResourceList<User>;
}
