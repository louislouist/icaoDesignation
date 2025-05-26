import { getICAODesignators, saveToJSONFile } from "./getIcaoDesignators";

getICAODesignators()
	.then(saveToJSONFile)
	.catch(console.error);

