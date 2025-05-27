import * as fs from 'fs';
import * as path from 'path';
import { ICAODesignation, ICAODesignationSchema } from './icao';
import { z } from 'zod';

const dataFilePath = path.join(__dirname, 'data', 'wikiDesignatorData.json');

export function findDesignationByICAO(icaoCode: string): ICAODesignation | null {
	if (!fs.existsSync(dataFilePath)) {
		console.error('Data file not found:', dataFilePath);
		return null;
	}

	const fileContent = fs.readFileSync(dataFilePath, 'utf-8');

	try {
		const data = z.array(ICAODesignationSchema).parse(JSON.parse(fileContent));

		const match = data.find(d => d.icaoCode.toLowerCase() === icaoCode.toLowerCase());
		return match || null;
	} catch (e) {
		console.error('Invalid JSON structure or parsing error:', e);
		return null;
	}
}
