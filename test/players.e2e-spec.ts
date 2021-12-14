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

  it('/POST players', async () => {
    const responseData = await request(app.getHttpServer())
      .post('/players')
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
      .expect(200)
      .expect([{ id, ...testPlayer }]);
  });

  it('/GET players/:id', () => {
    return request(app.getHttpServer())
      .get(`/players/${id}`)
      .expect(200)
      .expect({ id, ...testPlayer });
  });

  it('/PATCH players/:id', () => {
    return request(app.getHttpServer())
      .patch(`/players/${id}`)
      .send({
        firstName: 'Pero',
      })
      .expect(200)
      .expect({ id, ...testPlayer, firstName: 'Pero' });
  });

  it('/DELETE players/:id', () => {
    return request(app.getHttpServer())
      .delete(`/players/${id}`)
      .expect(204)
      .expect({});
  });

  afterAll(async () => {
    await app.close();
  });
});
