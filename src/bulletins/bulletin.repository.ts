import { NotFoundException } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { GetBulletinsFilterDto } from './dto/get-bulletins-filter.dto';
import { Bulletin } from './bulletin.entity';
import { BulletinDto } from './dto/bulletin.dto';

@EntityRepository(Bulletin)
export class BulletinRepository extends Repository<Bulletin> {
	async getBulletins(
		bulletinFilterDto: GetBulletinsFilterDto,
	): Promise<Bulletin[]> {
		const { search } = bulletinFilterDto;
		const query = this.createQueryBuilder('bulletin');

		if (search) {
			query.andWhere(
				'(bulletin.title LIKE :search OR bulletin.content LIKE :search)',
				{ search: `%${search}%` },
			);
		}

		const bulletins = await query.getMany();
		return bulletins;
	}

	async addBulletin(bulletinDto: BulletinDto): Promise<Bulletin> {
		const bulletin = new Bulletin();
		this.setBulletinProperties(bulletin, bulletinDto);
		bulletin.createdOn = new Date(new Date().toISOString());

		await bulletin.save();
		return bulletin;
	}

	async updateBulletin(
		bulletin: Bulletin,
		updateBulletinDto: BulletinDto,
	): Promise<Bulletin> {
		if (!bulletin) {
			throw new NotFoundException('Specified bulletin does not exist.');
		}

		this.setBulletinProperties(bulletin, updateBulletinDto);

		await bulletin.save();
		return bulletin;
	}

	private setBulletinProperties(bulletin: Bulletin, bulletinDto: BulletinDto) {
		const { title, content, type } = bulletinDto;

		bulletin.title = title;
		bulletin.content = content;
		bulletin.type = type;
		bulletin.lastModifiedOn = new Date(new Date().toISOString());
	}
}
