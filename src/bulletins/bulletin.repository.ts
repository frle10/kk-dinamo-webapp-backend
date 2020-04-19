import { NotFoundException } from '@nestjs/common';
import { Repository, EntityRepository, Not } from 'typeorm';
import { GetBulletinsFilterDto } from './dto/get-bulletins-filter.dto';
import { Bulletin } from './bulletin.entity';
import { BulletinDto } from './dto/bulletin.dto';

@EntityRepository(Bulletin)
export class BulletinRepository extends Repository<Bulletin> {

	async getBulletins(bulletinFilterDto: GetBulletinsFilterDto): Promise<Bulletin[]> {
		const { title, content } = bulletinFilterDto;
		const query = this.createQueryBuilder('bulletin');

		if (title) {
			query.andWhere('bulletin.title = :title', { title });
		}

		if (content) {
			query.andWhere('bulletin.content = :content', { content });
		}

		const bulletins = await query.getMany();
		return bulletins;
	}

	async addBulletin(bulletinDto: BulletinDto): Promise<Bulletin> {
		const bulletin = new Bulletin();
		this.setBulletinProperties(bulletin, bulletinDto);

		await bulletin.save();
		return bulletin;
	}

	async updateBulletin(bulletin: Bulletin, updateBulletinDto: BulletinDto): Promise<Bulletin> {
		if (!bulletin) {
			throw new NotFoundException('Specified bulletin does not exist.');
		}
		this.setBulletinProperties(bulletin, updateBulletinDto);

		await bulletin.save();
		return bulletin;
	}

	private setBulletinProperties(bulletin: Bulletin, bulletinDto: BulletinDto) {
		const {
			title,
			content,
			type,
			images,
		} = bulletinDto;

		bulletin.title = title;
		bulletin.content = content;
		bulletin.type = type;
		bulletin.images = images;

		if (!bulletin.dateCreated) {
			bulletin.dateCreated = new Date((new Date()).toISOString());
		}

		bulletin.dateLastModified = new Date((new Date()).toISOString());

	}

}
