import { injectable } from 'inversify';
import { PaginationHelper } from '../helpers/pagination.helper';
import { CompanyEntity } from '../../domain/entities/company.entity';
import CompanyListingRequest from '../../domain/dtos/company/requests/company-listing.request';
import { DatabaseConfig } from '../configs/database.config';
import { Collection, DeleteResult, InsertOneResult, UpdateResult } from 'mongodb';

@injectable()
export class CompanyRepository {
  private readonly collection: Collection<CompanyEntity>;

  constructor() {
    this.collection = DatabaseConfig.getCollection<CompanyEntity>('company');
  }

  public async insert(company: CompanyEntity): Promise<InsertOneResult<CompanyEntity>> {
    return await this.collection.insertOne(company);
  }

  public async update(company: CompanyEntity): Promise<UpdateResult<CompanyEntity>> {
    return await this.collection.updateOne({ id: company.id }, { $set: company });
  }

  public async findById(id: string): Promise<CompanyEntity> {
    return await this.collection.findOne({ id });
  }

  public async toList(paginationRequest: CompanyListingRequest): Promise<[CompanyEntity[], number]> {
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

  public async delete(id: string): Promise<DeleteResult> {
    return await this.collection.deleteOne({ id });
  }
}
