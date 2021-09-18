export interface UserAuthenticated {
  user: string;
  token: string;
  roles: Array<string>;
}