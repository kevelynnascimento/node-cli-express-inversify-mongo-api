import { injectable } from 'inversify';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { PaginationHelper } from '../helpers/pagination.helper';
import { CompanyEntity } from '../../domain/entities/company.entity';
import CompanyListingRequest from '../../domain/dtos/company/requests/company-listing.request';
import { CompanyModel } from '../schemas/company.schema';

@injectable()
export class CompanyRepository {
  public async insert(company: CompanyEntity): Promise<CompanyEntity> {
    return await CompanyModel.create(company);
  }

  public async update(id: string, company: Partial<CompanyEntity>): Promise<boolean> {
    return !!await CompanyModel.updateOne({ id }, company, { new: true })
  }

  public async findById(id: string): Promise<CompanyEntity> {
    return await CompanyModel.findOne({ id });
  }

  public async toList(paginationRequest: CompanyListingRequest): Promise<CompanyEntity[]> {
    const pagination = PaginationHelper.get(paginationRequest);

    const result = await CompanyModel.find()
      .skip(pagination.skip)
      .limit(pagination.take);

    return result;
  }

  public async delete(id: string): Promise<boolean> {
    return !!await CompanyModel.deleteOne({ _id: id });
  }
}
