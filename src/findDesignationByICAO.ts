import * as fs from 'fs';
import * as path from 'path';
import { ICAODesignation } from './icao';

const dataFilePath = path.join(__dirname, 'data', 'wikiDesignatorData.json');

export function findDesignationByICAO(icaoCode: string): ICAODesignation | null {
	if (!fs.existsSync(dataFilePath)) {
		console.error('Data file not found:', dataFilePath);
		return null;
	}

	const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
	const data: ICAODesignation[] = JSON.parse(fileContent);

	const match = data.find(d => d.icaoCode.toLowerCase() === icaoCode.toLowerCase());

	return match || null;
}
