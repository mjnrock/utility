import { AException } from "./AException.js";

class NoName extends AException {
	constructor(passedValue) {
		super(`The 'name' attribute is required on this function.`, passedValue);
	}
}

export { NoName };