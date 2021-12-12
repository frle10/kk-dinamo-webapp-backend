import { Injectable, NotFoundException } from '@nestjs/common';
import { GetBulletinsFilterDto } from './dto/get-bulletins-filter.dto';
import { BulletinRepository } from './bulletin.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Bulletin } from './bulletin.entity';
import { BulletinDto } from './dto/bulletin.dto';

@Injectable()
export class BulletinsService {
  constructor(
    @InjectRepository(BulletinRepository)
    private bulletinRepository: BulletinRepository
  ) {}

  getBulletins(bulletinFilterDto: GetBulletinsFilterDto): Promise<Bulletin[]> {
    return this.bulletinRepository.getBulletins(bulletinFilterDto);
  }

  getBulletinById(id: number): Promise<Bulletin> {
    return this.bulletinRepository.findOne(id);
  }

  addBulletin(bulletinDto: BulletinDto): Promise<Bulletin> {
    return this.bulletinRepository.addBulletin(bulletinDto);
  }

  async deleteBulletin(id: number): Promise<void> {
    const result = await this.bulletinRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Bulletin with ID ${id} not found.`);
    }
  }

  async updateBulletin(
    id: number,
    updateBulletinDto: BulletinDto
  ): Promise<Bulletin> {
    const bulletin = await this.getBulletinById(id);

    if (!bulletin) {
      throw new NotFoundException('Specified bulletin does not exist.');
    }

    return this.bulletinRepository.updateBulletin(bulletin, updateBulletinDto);
  }
}
