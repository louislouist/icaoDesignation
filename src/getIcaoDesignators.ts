import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
import { ICAODesignation } from './icao';

export async function getICAODesignators(): Promise<ICAODesignation[]> {
	const url = 'https://en.wikipedia.org/wiki/List_of_aircraft_type_designators';
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url, { waitUntil: 'domcontentloaded' });

	const designators: ICAODesignation[] = await page.evaluate(() => {
		const results: ICAODesignation[] = [];

		const table = document.querySelector('table.wikitable');
		if (!table) return results;

		const rows = table.querySelectorAll('tbody tr');

		rows.forEach((row) => {
			const cells = row.querySelectorAll('td');
			if (cells.length < 3) return;

			const icaoCode = cells[0].textContent?.trim() || '';
			const iataCodeRaw = cells[1].textContent?.trim() || '';
			const iataCode = iataCodeRaw === '—' || iataCodeRaw === '' ? null : iataCodeRaw;

			const modelAnchor = cells[2].querySelector('a');
			const model = modelAnchor?.textContent?.trim() || cells[2].textContent?.trim() || '';
			const modelLink = modelAnchor?.getAttribute('href') || '';
			const fullModelLink = modelLink.startsWith('/wiki/') ? `https://en.wikipedia.org${modelLink}` : modelLink;

			results.push({
				icaoCode,
				iataCode,
				model,
				modelLink: fullModelLink,
			});
		});

		return results;
	});

	await browser.close();
	return designators;
}

export async function saveToJSONFile(data: ICAODesignation[]) {
	const outputDir = path.join(__dirname, 'data');
	const outputPath = path.join(outputDir, 'wikiDesignatorData.json');

	// Ensure directory exists
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir);
	}

	fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8');
	console.log(`✅ Saved ${data.length} designators to ${outputPath}`);
}
