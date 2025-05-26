## Installation

### From GitHub (Recommended for development)

```bash
# Install directly from GitHub
npm install git+https://github.com/louislouist/icaoDesignation.git

# Or with a specific branch/tag
npm install git+https://github.com/louislouist/icaoDesignation.git#main

# Then in your project
```bash
cd ./node_modules/icao-designation
npm run build
npm run fetch-data
npm run test
```
The test is to insure the data was sucessfully downloaded and converted to json.
