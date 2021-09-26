export interface AuthService {
  createAuthToken(username: string): Promise<string>;
  invalidateAuthToken(token: string): Promise<void>;
  verifyAuthToken(token: string): Promise<any>;
}
