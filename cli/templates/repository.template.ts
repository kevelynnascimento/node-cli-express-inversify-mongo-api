const getRepositoryTemplate = (name: string, camelCaseName: string, pascalCaseName: string): string => {
  return `
import { injectable } from 'inversify';
import { PaginationHelper } from '../helpers/pagination.helper';
import { ${pascalCaseName}Entity } from '../../domain/entities/${name}.entity';
import ${pascalCaseName}ListingRequest from '../../domain/dtos/${name}/requests/${name}-listing.request';
import { DatabaseConfig } from '../configs/database.config';
import { Collection, DeleteResult, InsertOneResult, UpdateResult } from 'mongodb';

@injectable()
export class ${pascalCaseName}Repository {
  private readonly collection: Collection<${pascalCaseName}Entity>;

  constructor() {
    this.collection = DatabaseConfig.getCollection<${pascalCaseName}Entity>('${camelCaseName}');
  }

  public async insert(${camelCaseName}: ${pascalCaseName}Entity): Promise<InsertOneResult<${pascalCaseName}Entity>> {
    return await this.collection.insertOne(${camelCaseName});
  }

  public async update(${camelCaseName}: ${pascalCaseName}Entity): Promise<UpdateResult<${pascalCaseName}Entity>> {
    return await this.collection.updateOne({ id: ${camelCaseName}.id }, { $set: ${camelCaseName} });
  }

  public async findById(id: string): Promise<${pascalCaseName}Entity> {
    return await this.collection.findOne({ id });
  }

  public async toList(paginationRequest: ${pascalCaseName}ListingRequest): Promise<[${pascalCaseName}Entity[], number]> {
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
`;
}

export { getRepositoryTemplate };