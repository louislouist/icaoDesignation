## Installation

### From GitHub (Recommended for development)

# Install directly from GitHub
```bash 
npm install git+https //github.com/louislouist/icaoDesignation.git
```

# Or with a specific branch/tag
```bash 
npm install git+https://github.com/louislouist/icaoDesignation.git#main
```

# Then in your project
```bash
cd ./node_modules/icao-designation
npm run build
npm run fetch-data
npm run test
```

The test is to insure the data was sucessfully downloaded and converted to json.

# Use
```typescript
import { getEmitterCategoryInfo, findDesignationByICAO } from 'icao-designation';

const result = findDesignationByICAO('A320');
const emitterInfo = getEmitterCategoryInfo("A3");

if (result) {
	console.log('Found:', result);
  console.log('Emitter Info:', emitterInfo;
} else {
	console.log('ICAO code not found.');
}
```
