import { BadRequestException } from '@nestjs/common';

export const INVALID_ID_ERROR_MESSAGE: string =
	'Article IDs must be whole numbers greater than 0.';

export const parseIds: (commaSeparatedIds: string) => number[] = (
	commaSeparatedIds: string,
) => {
	const idStrings: string[] = commaSeparatedIds.trim().split(',');
	const ids: number[] = [];
	idStrings.forEach(s => {
		const id = parseInt(s);
		if (isNaN(id) || id < 1) {
			throw new BadRequestException(INVALID_ID_ERROR_MESSAGE);
		}

		ids.push(id);
	});

	return ids;
};
