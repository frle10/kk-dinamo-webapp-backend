import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImageRepository } from '../src/images/image.repository';
import { AppModule } from '../src/app.module';
import { ImagesController } from '../src/images/images.controller';
import { ImagesService } from '../src/images/images.service';

describe('Images', () => {
  let app: INestApplication;

  let accessToken: string = '';
  let id: number = 1;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TypeOrmModule.forFeature([ImageRepository])],
      controllers: [ImagesController],
      providers: [ImagesService],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/POST signin', async () => {
    const responseData = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ username: 'frle10', password: 'Aa123456' });

    expect(responseData.status).toBe(200);
    expect(responseData.body).toHaveProperty('accessToken');

    accessToken = responseData.body.accessToken;
  });

  it('/POST images', async () => {
    const responseData = await request(app.getHttpServer())
      .post('/images')
      .set({ Authorization: `Bearer ${accessToken}` })
      .attach('image', 'test/test-assets/images/players/kobe-bryant.jpg');

    expect(responseData.status).toBe(201);
    expect(responseData.body).toHaveProperty('id');
    expect(responseData.body).toHaveProperty('filename');
    expect(responseData.body).toHaveProperty('filepath');
    expect(responseData.body).toHaveProperty('altText', '');

    id = responseData.body.id;
  });

  it('/GET images', () => {
    return request(app.getHttpServer())
      .get('/images')
      .set({ Authorization: `Bearer ${accessToken}` })
      .expect(200)
      .expect((res) => {
        expect(res.body).not.toHaveLength(0);
      });
  });

  it('/GET images/:id', () => {
    return request(app.getHttpServer())
      .get(`/images/${id}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .expect(200);
  });

  it('/PATCH images/:id', () => {
    return request(app.getHttpServer())
      .patch(`/images/${id}`)
      .send({
        altText: 'Alternative Text',
      })
      .set({ Authorization: `Bearer ${accessToken}` })
      .expect(200)
      .expect((res) => {
        expect(res.body.altText).toEqual('Alternative Text');
      });
  });

  it('/DELETE images/:id', () => {
    return request(app.getHttpServer())
      .delete(`/images/${id}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .expect(204)
      .expect({});
  });

  afterAll(async () => {
    await app.close();
  });
});