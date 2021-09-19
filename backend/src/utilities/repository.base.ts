import * as Mongoose from 'mongoose';
import { FilterQuery } from 'mongoose';
import { Repository } from './interfaces/repository.interface';

export abstract class RepositoryBase<T> implements Repository<T> {
  protected readonly model: Mongoose.Model<T>;
  protected readonly connection: Mongoose.Connection;

  protected constructor(
    connection: Mongoose.Connection,
    model: Mongoose.Model<T>,
  ) {
    this.connection = connection;
    this.model = model;
  }

  public async create(instance: T): Promise<void> {
    await this.model.create(instance);
  }

  public async update(
    ...args: [instance: T] | [userId: any, options: any]
  ): Promise<any> {
    if (args.length === 1) {
      const instance = args[0];
      return (instance as unknown as Mongoose.Document).save();
    } else {
      const [userId, options] = args;
      return this.model.updateOne(
        {
          _id: userId,
        },
        options,
      );
    }
  }

  public async exists(filter: FilterQuery<any>): Promise<boolean> {
    return this.model.exists(filter);
  }

  public async find(filter: FilterQuery<any>): Promise<T> {
    return this.model.findOne(filter);
  }

  public async delete(instance: T): Promise<any> {
    return this.model.deleteOne(instance);
  }
}
