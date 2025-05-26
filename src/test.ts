import { findDesignationByICAO } from './findDesignationByICAO';

const result = findDesignationByICAO('A320');

if (result) {
	console.log('Found:', result);
} else {
	console.log('ICAO code not found.');
}
