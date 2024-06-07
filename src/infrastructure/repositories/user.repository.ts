import { injectable } from 'inversify';
import { UserEntity } from '../../domain/entities/user.entity';
import { DatabaseConfig } from '../configs/database.config';
import { PaginationHelper, PaginationRequest } from '../helpers/pagination.helper';
import { Collection, DeleteResult, InsertOneResult, UpdateResult } from 'mongodb';
import UserFindingPagedRequest from '../../domain/dtos/user/requests/user-finding-paged.request';

@injectable()
export class UserRepository {
  private readonly collection: Collection<UserEntity>;

  constructor() {
    this.collection = DatabaseConfig.getCollection<UserEntity>('user');
  }

  public async insert(company: UserEntity): Promise<InsertOneResult<UserEntity>> {
    return await this.collection.insertOne(company);
  }

  public async update(company: UserEntity): Promise<UpdateResult<UserEntity>> {
    return await this.collection.updateOne({ id: company.id }, { $set: company });
  }

  public async findById(id: string): Promise<UserEntity> {
    return await this.collection.findOne({ id });
  }

  public async delete(id: string): Promise<DeleteResult> {
    return await this.collection.deleteOne({ id });
  }

  public async findAll(): Promise<UserEntity[]> {
    const items = await this.collection
      .find({})
      .toArray();

    return items;
  }

  public async toList(paginationRequest: UserFindingPagedRequest): Promise<[UserEntity[], number]> {
    const { skip, pageSize, sortColumn, sortDirection } = PaginationHelper.get(paginationRequest);

    const items = this.collection
      .find({})
      .sort(sortColumn, sortDirection)
      .skip(skip)
      .limit(pageSize)
      .toArray();

    const total = this.collection.countDocuments();

    const [rows, count] = await Promise.all([items, total]);

    return [rows, count];
  }

  public async findByUsername(username: string): Promise<UserEntity> {
    return await this.collection.findOne({ username });
  }
}
