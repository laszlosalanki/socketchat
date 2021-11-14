export interface UserService {
  create(userData: any): Promise<void>;
  getUser(username: string, plainPassword: string): Promise<any>;
  findUser(filter: any): Promise<any>;
}
