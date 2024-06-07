
import { inject, injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import TestOusadoCreationResponse from '../dtos/test-ousado/responses/test-ousado-creation.response';
import { TestOusadoRepository } from '../../infrastructure/repositories/test-ousado.repository';
import TestOusadoCreationRequest from '../dtos/test-ousado/requests/test-ousado-creation.request';
import { HttpBadRequestError } from '../../infrastructure/middlewares/http-error.middleware';
import TestOusadoUpdateRequest from '../dtos/test-ousado/requests/test-ousado-update.request';
import TestOusadoFindingByIdResponse from '../dtos/test-ousado/responses/test-ousado-finding-by-id.response';
import { PaginationResponse } from '../../infrastructure/helpers/pagination.helper';
import TestOusadoListingRequest from '../dtos/test-ousado/requests/test-ousado-listing.request';
import TestOusadoListingResponse from '../dtos/test-ousado/responses/test-ousado-listing.response';

@injectable()
export class TestOusadoService {
  constructor(
    @inject(TestOusadoRepository) private readonly testOusadoRepository: TestOusadoRepository,
  ) { }

  public async create(request: TestOusadoCreationRequest): Promise<TestOusadoCreationResponse> {
    const testOusado = {
      ...request,
      id: uuidv4(),
      creationDate: new Date(),
      updateDate: new Date(),
      deactivationDate: null,
    };

    await this.testOusadoRepository.insert(testOusado);

    const { id } = testOusado;

    const response = {
      id,
    };

    return response;
  }

  public async update(id: string, request: TestOusadoUpdateRequest): Promise<void> {
    const testOusado = await this.testOusadoRepository.findById(id);

    if (!testOusado)
      throw new HttpBadRequestError('TestOusado was not found.');

    testOusado.name = request.name;

    await this.testOusadoRepository.update(testOusado);
  }

  public async disable(id: string): Promise<void> {
    const testOusado = await this.testOusadoRepository.findById(id);

    if (!testOusado)
      throw new HttpBadRequestError('TestOusado was not found.');

    testOusado.deactivationDate = new Date();

    await this.testOusadoRepository.update(testOusado);
  }

  public async findById(id: string): Promise<TestOusadoFindingByIdResponse> {
    const testOusado = await this.testOusadoRepository.findById(id);

    if (!testOusado)
      throw new HttpBadRequestError('TestOusado was not found.');

    const { name, creationDate, updateDate, deactivationDate } = testOusado;

    const response = {
      name,
      creationDate,
      updateDate,
      deactivationDate
    };

    return response;
  }

  public async toList(request: TestOusadoListingRequest): Promise<PaginationResponse<TestOusadoListingResponse>> {
    const [items, count] = await this.testOusadoRepository.toList(request);

    const rows = items.map(({
      id,
      name,
      creationDate,
      updateDate,
      deactivationDate
    }) => ({
      id,
      name,
      creationDate,
      updateDate,
      deactivationDate
    }));

    return {
      rows,
      count
    };
  }

  public async delete(id: string): Promise<void> {
    await this.testOusadoRepository.delete(id);
  }
}

