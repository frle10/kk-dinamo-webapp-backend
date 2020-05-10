import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v1 as uuidv1 } from 'uuid';
import { ForbiddenException } from '@nestjs/common';

export const IMAGE_UPLOAD_LIMIT: number = 10;

export const configureImageUpload: (dest: string) => MulterOptions = dest => {
	const multerOptions: MulterOptions = {};
	multerOptions.storage = diskStorage({
		destination: dest,
		filename: (_req, file, cb) => {
			const randomName = uuidv1();
			return cb(null, `${randomName}${extname(file.originalname)}`);
		},
	});

	multerOptions.fileFilter = (_req, file, cb) => {
		if (!file.mimetype.startsWith('image/')) {
			cb(new ForbiddenException('You can only upload images.'), false);
		} else {
			cb(null, true);
		}
	};

	return multerOptions;
};
