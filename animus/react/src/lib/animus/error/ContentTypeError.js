import Quantum from "../quanta/Quantum";
import CustomError from "./CustomError";

class ContentTypeError extends CustomError {
    constructor(is, found) {
        super("ContentTypeError", `Should be <${ Quantum.ReverseEnum("type", is) } [${ is }]>, but received <${ Quantum.ReverseEnum("type", found) } [${ found }]>`);
    }
}

export default ContentTypeError;