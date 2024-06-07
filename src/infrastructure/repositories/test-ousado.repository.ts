
import { injectable } from 'inversify';
import { PaginationHelper } from '../helpers/pagination.helper';
import { TestOusadoEntity } from '../../domain/entities/test-ousado.entity';
import TestOusadoListingRequest from '../../domain/dtos/test-ousado/requests/test-ousado-listing.request';
import { DatabaseConfig } from '../configs/database.config';
import { Collection, DeleteResult, InsertOneResult, UpdateResult } from 'mongodb';

@injectable()
export class TestOusadoRepository {
  private readonly collection: Collection<TestOusadoEntity>;

  constructor() {
    this.collection = DatabaseConfig.getCollection<TestOusadoEntity>('testOusado');
  }

  public async insert(testOusado: TestOusadoEntity): Promise<InsertOneResult<TestOusadoEntity>> {
    return await this.collection.insertOne(testOusado);
  }

  public async update(testOusado: TestOusadoEntity): Promise<UpdateResult<TestOusadoEntity>> {
    return await this.collection.updateOne({ id: testOusado.id }, { $set: testOusado });
  }

  public async findById(id: string): Promise<TestOusadoEntity> {
    return await this.collection.findOne({ id });
  }

  public async toList(paginationRequest: TestOusadoListingRequest): Promise<[TestOusadoEntity[], number]> {
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
