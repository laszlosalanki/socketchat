export interface UserService {
  create(username: string, password: string): Promise<void>;
  getUser(username: string, plainPassword: string): Promise<any>;
}
