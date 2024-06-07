
import 'reflect-metadata';
import request from 'supertest';
import { Application } from 'express';
import * as dotenv from 'dotenv';
import { Bootstraper } from '../..';
import { AuthHelper } from '../../infrastructure/helpers/auth.helper';

dotenv.config();

describe('TestOusadoController', () => {
  let app: Application;
  let token: string;
  let id: string;

  beforeAll(async () => {
    app = await Bootstraper.start();
    token = AuthHelper.generateToken({
      username: 'test',
      email: 'test',
      role: 'admin'
    });
  });

  describe('create', () => {
    it('should create a new TestOusado', async () => {
      const body = {
        name: 'TestOusado name'
      };

      const response = await request(app)
        .post(`/api/test-ousado`)
        .set('Authorization', `Bearer ${token}`)
        .send(body);

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        id: expect.any(String)
      });

      id = response.body.id;
    });
  });

  describe('update', () => {
    it('should update a TestOusado', async () => {
      const body = {
        name: 'TestOusado name'
      };

      const response = await request(app)
        .put(`/api/test-ousado/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(body);

      expect(response.status).toBe(200);
    });
  });

  describe('disable', () => {
    it('should disable a TestOusado', async () => {
      const response = await request(app)
        .post(`/api/test-ousado/${id}/deactivation`)
        .set('Authorization', `Bearer ${token}`)
        .send();

      expect(response.status).toBe(200);
    });
  });

  describe('findById', () => {
    it('should return a TestOusado', async () => {
      const response = await request(app)
        .get(`/api/test-ousado/${id}/finding-one`)
        .set('Authorization', `Bearer ${token}`)
        .send();

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        name: expect.any(String),
        creationDate: expect.any(String),
        updateDate: expect.any(String),
        deactivationDate: expect.any(String)
      });
    });
  });

  describe('toList', () => {
    it('should return a list', async () => {
      const response = await request(app)
        .get(`/api/test-ousado/listing?page=0&pageSize=100`)
        .set('Authorization', `Bearer ${token}`)
        .send();

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        rows: expect.any(Array),
        count: expect.any(Number)
      });
    });
  });

  describe('delete', () => {
    it('should delete a TestOusado', async () => {
      const response = await request(app)
        .delete(`/api/test-ousado/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send();

      expect(response.status).toBe(200);
    });
  });
});
