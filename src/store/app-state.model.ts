import { ResourceList } from "src/shared/hateoas/resource-list.model";
import { User } from "src/shared/models/user.model";

export class AppState {
  userList: ResourceList<User>;
}
