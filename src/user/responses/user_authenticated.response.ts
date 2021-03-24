import { Role } from "../entity/role.entity";

export interface UserAuthenticated {
  user: string;
  token: string;
  roles: Array<string>
}