import { injectable } from 'inversify';
import { UserEntity } from '../../domain/entities/user.entity';
import { DatabaseConfig } from '../configs/database.config';
import { PaginationHelper, PaginationRequest } from '../helpers/pagination.helper';
import { UserModel } from '../schemas/user.schema';

@injectable()
export class UserRepository {
  public async insert(company: UserEntity): Promise<UserEntity> {
    return await UserModel.create(company);
  }

  public async findById(id: string): Promise<UserEntity> {
    return this.repository.findOneBy({ id });
  }

  async findAndCount(paginationRequest: PaginationRequest): Promise<[UserEntity[], number]> {
    const pagination = PaginationHelper.get(paginationRequest);

    const result = await this.repository.findAndCount({
      ...pagination,
      where: {}
    });

    return result;
  }

  public async findByUsername(username: string): Promise<UserEntity | null> {
    return this.repository.findOneBy({ username });
  }

  public async update(user: UserEntity): Promise<UpdateResult> {
    return this.repository.update({ id: user.id }, user);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
