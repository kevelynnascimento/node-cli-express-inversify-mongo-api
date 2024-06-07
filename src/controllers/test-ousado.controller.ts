
import { inject } from 'inversify';
import {
  BaseHttpController,
  IHttpActionResult,
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  queryParam,
  requestBody,
  requestParam,
} from 'inversify-express-utils';
import { AdminAuthMiddleware } from '../infrastructure/middlewares/admin-auth.middleware';
import { TestOusadoService } from '../domain/services/test-ousado.service';
import TestOusadoCreationRequest from '../domain/dtos/test-ousado/requests/test-ousado-creation.request';
import TestOusadoUpdateRequest from '../domain/dtos/test-ousado/requests/test-ousado-update.request';
import TestOusadoListingRequest from '../domain/dtos/test-ousado/requests/test-ousado-listing.request';

@controller('/test-ousado')
export class TestOusadoController extends BaseHttpController {
  constructor(
    @inject(TestOusadoService)
    private readonly testOusadoService: TestOusadoService,
  ) {
    super();
  }

  @httpPost('/', AdminAuthMiddleware)
  public async create(
    @requestBody() request: TestOusadoCreationRequest,
  ): Promise<IHttpActionResult> {
    const response = await this.testOusadoService.create(request);
    return this.json(response, 200);
  }

  @httpPut('/:id', AdminAuthMiddleware)
  public async update(
    @requestParam('id') id: string,
    @requestBody() request: TestOusadoUpdateRequest,
  ): Promise<IHttpActionResult> {
    const response = await this.testOusadoService.update(id, request);
    return this.json(response, 200);
  }

  @httpPost('/:id/deactivation', AdminAuthMiddleware)
  public async disable(@requestParam('id') id: string): Promise<IHttpActionResult> {
    const response = await this.testOusadoService.disable(id);
    return this.json(response, 200);
  }

  @httpGet('/:id/finding-one', AdminAuthMiddleware)
  public async findById(
    @requestParam('id') id: string,
  ): Promise<IHttpActionResult> {
    const response = await this.testOusadoService.findById(id);
    return this.json(response, 200);
  }

  @httpGet('/listing', AdminAuthMiddleware)
  public async toList(@queryParam() request: TestOusadoListingRequest): Promise<IHttpActionResult> {
    const response = await this.testOusadoService.toList(request);
    return this.json(response, 200);
  }

  @httpDelete('/:id', AdminAuthMiddleware)
  public async delete(@requestParam('id') id: string): Promise<IHttpActionResult> {
    const response = await this.testOusadoService.delete(id);
    return this.json(response, 200);
  }
}
