export interface Repository<T> {
  find(filter: any): Promise<T>;
  exists(filter: any): Promise<boolean>;
  create(instance: T): Promise<any>;
  update(...args: [instance: T] | [userId: any, data: any]): Promise<any>;
  delete(instance: T): Promise<any>;
}
