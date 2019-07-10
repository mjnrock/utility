import CustomError from "./CustomError";

class InvalidEnumeratorError extends CustomError {
    constructor() {
        super("InvalidEnumeratorError", `Enumerators should be numeric`);
    }
}

export default InvalidEnumeratorError;