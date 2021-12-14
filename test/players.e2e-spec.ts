import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlayersController } from '../src/players/players.controller';
import { PlayersService } from '../src/players/players.service';
import { PlayerRepository } from '../src/players/player.repository';
import { ImageRepository } from '../src/images/image.repository';
import { AppModule } from '../src/app.module';
import { testPlayer } from './test-data/objects';

describe('Players', () => {
  let app: INestApplication;

  let accessToken: string = '';
  let id: number = 1;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forFeature([PlayerRepository, ImageRepository]),
      ],
      controllers: [PlayersController],
      providers: [PlayersService],
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

  it('/POST players', async () => {
    const responseData = await request(app.getHttpServer())
      .post('/players')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send(testPlayer);

    expect(responseData.status).toBe(201);
    expect(responseData.body).toEqual({
      id: responseData.body.id,
      ...testPlayer,
    });

    id = responseData.body.id;
  });

  it('/GET players', () => {
    return request(app.getHttpServer())
      .get('/players')
      .set({ Authorization: `Bearer ${accessToken}` })
      .expect(200)
      .expect((res) => {
        expect(res.body).not.toHaveLength(0);
      });
  });

  it('/GET players/:id', () => {
    return request(app.getHttpServer())
      .get(`/players/${id}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .expect(200)
      .expect({ id, ...testPlayer });
  });

  it('/PATCH players/:id', () => {
    return request(app.getHttpServer())
      .patch(`/players/${id}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        firstName: 'Pero',
      })
      .expect(200)
      .expect({ id, ...testPlayer, firstName: 'Pero' });
  });

  it('/DELETE players/:id', () => {
    return request(app.getHttpServer())
      .delete(`/players/${id}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .expect(204)
      .expect({});
  });

  afterAll(async () => {
    await app.close();
  });
});
