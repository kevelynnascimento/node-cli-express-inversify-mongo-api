
import 'reflect-metadata';
import { mock, instance, when, verify, anything } from 'ts-mockito';
import { TestOusadoService } from '../test-ousado.service';
import { TestOusadoRepository } from '../../../infrastructure/repositories/test-ousado.repository';
import { TestOusadoEntity } from '../../entities/test-ousado.entity';
import { SortDirection } from 'mongodb';

describe('TestOusadoService', () => {
  let testOusadoService: TestOusadoService;
  let testOusadoRepositoryMock: TestOusadoRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    testOusadoRepositoryMock = mock(TestOusadoRepository);
    testOusadoService = new TestOusadoService(instance(testOusadoRepositoryMock));
  });

  describe('create', () => {
    it('should create a new testOusado', async () => {
      const request = {
        name: 'TestOusado name'
      };

      const insertResultMock = {
        acknowledged: true,
        insertedId: null,
      };

      when(testOusadoRepositoryMock.insert(anything())).thenResolve(insertResultMock);

      const output = await testOusadoService.create(request);

      expect(output).toEqual({
        id: expect.any(String)
      });

      verify(testOusadoRepositoryMock.insert(anything())).called();
    });
  });

  describe('update', () => {
    it('should update a testOusado', async () => {
      const testOusadoMock = {
        id: '5',
        name: 'TestOusado name',
        creationDate: new Date(),
        updateDate: new Date(),
        deactivationDate: null
      };

      const updateResultMock = {
        acknowledged: true,
        matchedCount: null,
        modifiedCount: null,
        upsertedCount: null,
        upsertedId: null
      };

      const testOusadoUpdateRequest = {
        name: 'Updated'
      };

      when(testOusadoRepositoryMock.findById(anything())).thenResolve(testOusadoMock);

      when(testOusadoRepositoryMock.update(anything())).thenResolve(updateResultMock);

      await testOusadoService.update(testOusadoMock.id, testOusadoUpdateRequest);

      verify(testOusadoRepositoryMock.findById(anything())).called();

      verify(testOusadoRepositoryMock.update(anything())).called();
    });

    it('should return not found error', async () => {
      const id = '5';

      const testOusadoUpdateRequest = {
        name: 'Updated'
      };

      when(testOusadoRepositoryMock.findById(anything())).thenResolve(null);

      await expect(testOusadoService.update(id, testOusadoUpdateRequest)).rejects.toThrow();

      verify(testOusadoRepositoryMock.findById(anything())).called();
      verify(testOusadoRepositoryMock.update(anything())).never();
    });
  });

  describe('disable', () => {
    it('should disable a testOusado', async () => {
      const testOusadoMock = {
        id: '5',
        name: 'TestOusado name',
        creationDate: new Date(),
        updateDate: new Date(),
        deactivationDate: null
      };

      const updateResultMock = {
        acknowledged: true,
        matchedCount: null,
        modifiedCount: null,
        upsertedCount: null,
        upsertedId: null
      };

      when(testOusadoRepositoryMock.findById(anything())).thenResolve(testOusadoMock);

      when(testOusadoRepositoryMock.update(anything())).thenResolve(updateResultMock);

      await testOusadoService.disable(testOusadoMock.id);

      verify(testOusadoRepositoryMock.findById(anything())).called();

      verify(testOusadoRepositoryMock.update(anything())).called();
    });

    it('should return not found error', async () => {
      const id = '5';

      when(testOusadoRepositoryMock.findById(anything())).thenResolve(null);

      await expect(testOusadoService.disable(id)).rejects.toThrow();

      verify(testOusadoRepositoryMock.findById(anything())).called();
      verify(testOusadoRepositoryMock.update(anything())).never();
    });
  });

  describe('findById', () => {
    it('should find a testOusado', async () => {
      const testOusadoMock = {
        id: '5',
        name: 'TestOusado name',
        creationDate: new Date(),
        updateDate: new Date(),
        deactivationDate: null
      };

      when(testOusadoRepositoryMock.findById(anything())).thenResolve(testOusadoMock);

      const output = await testOusadoService.findById(testOusadoMock.id);

      expect(output).toEqual({
        name: testOusadoMock.name,
        creationDate: testOusadoMock.creationDate,
        updateDate: testOusadoMock.updateDate,
        deactivationDate: testOusadoMock.deactivationDate
      });

      verify(testOusadoRepositoryMock.findById(anything())).called();
    });

    it('should return not found error', async () => {
      const id = '5';

      when(testOusadoRepositoryMock.findById(anything())).thenResolve(null);

      await expect(testOusadoService.findById(id)).rejects.toThrow();

      verify(testOusadoRepositoryMock.findById(anything())).called();
    });
  });

  describe('toList', () => {
    it('should find a testOusado', async () => {
      const itemsMock: [TestOusadoEntity[], number] = [
        [
          {
            id: '5',
            name: 'TestOusado name',
            creationDate: new Date(),
            updateDate: new Date(),
            deactivationDate: null
          }
        ],
        1
      ];

      const testOusadoListingRequest = {
        page: 0,
        pageSize: 100,
        sortColumn: 'name',
        sortDirection: 'asc' as SortDirection
      };

      when(testOusadoRepositoryMock.toList(anything())).thenResolve(itemsMock);

      const output = await testOusadoService.toList(testOusadoListingRequest);

      expect(output).toEqual({
        rows: expect.any(Array),
        count: expect.any(Number)
      });

      verify(testOusadoRepositoryMock.toList(anything())).called();
    });
  });

  describe('delete', () => {
    it('should delete a testOusado', async () => {
      const id = '5';

      when(testOusadoRepositoryMock.delete(anything())).thenResolve();

      await testOusadoService.delete(id);

      verify(testOusadoRepositoryMock.delete(anything())).called();
    });
  });
});
