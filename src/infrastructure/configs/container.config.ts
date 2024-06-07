import { Container } from 'inversify';
import { UserRepository } from '../repositories/user.repository';
import { UserController } from '../../controllers/user.controller';
import { UserService } from '../../domain/services/user.service';
import { AdminAuthMiddleware } from '../middlewares/admin-auth.middleware';
import { ClientAuthMiddleware } from '../middlewares/client-auth.middleware';
import { CompanyController } from '../../controllers/company.controller';
import { CompanyRepository } from '../repositories/company.repository';
import { CompanyService } from '../../domain/services/company.service';
import { TestOusadoController } from '../../controllers/test-ousado.controller';
import { TestOusadoRepository } from '../repositories/test-ousado.repository';
import { TestOusadoService } from '../../domain/services/test-ousado.service';

export class ContainerConfig {
  public static container: Container;

  public static start(): Container {
    this.container = new Container();

    this.configureServices();
    this.configureRepositories();
    this.configureControllers();
    this.configureMiddlewares();

    return this.container;
  }

  private static configureControllers(): void {
    this.container.bind<UserController>(UserController).toSelf();
    this.container.bind<CompanyController>(CompanyController).toSelf();
    this.container.bind<TestOusadoController>(TestOusadoController).toSelf();
  }

  private static configureRepositories(): void {
    this.container.bind<UserRepository>(UserRepository).toSelf();
    this.container.bind<CompanyRepository>(CompanyRepository).toSelf();
    this.container.bind<TestOusadoRepository>(TestOusadoRepository).toSelf();
  }

  private static configureServices(): void {
    this.container.bind<UserService>(UserService).toSelf();
    this.container.bind<CompanyService>(CompanyService).toSelf();
    this.container.bind<TestOusadoService>(TestOusadoService).toSelf();
  }

  private static configureMiddlewares(): void {
    this.container.bind<AdminAuthMiddleware>(AdminAuthMiddleware).toSelf();
    this.container.bind<ClientAuthMiddleware>(ClientAuthMiddleware).toSelf();
  }
}
