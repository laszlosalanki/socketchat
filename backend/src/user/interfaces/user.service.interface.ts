export interface UserService {
  create(userData: any): Promise<void>;
  getUser(username: string, plainPassword: string): Promise<any>;
  update(user: any): Promise<void>;
  findUser(filter: any): Promise<any>;
}
