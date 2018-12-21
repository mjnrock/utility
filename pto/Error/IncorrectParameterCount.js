import { AException } from "./AException.js";

class IncorrectParameterCount extends AException {
	constructor(required, passed, passedValue) {
		super(
			`An incorrect number of parameters were passed.  Requires: ${required}, Passed: ${passed}.`,
			passedValue
		);
	}
}

export { IncorrectParameterCount };