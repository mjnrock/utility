class CustomError extends Error {
    constructor(name, message) {
        super(message);

        this.name = name;
    }

    Log() {
        console.log(this.message);
    }
    Warn() {
        console.warn(this.message);
    }
    Throw() {
        throw new CustomError(this.name, this.message);
    }
    Route() {
        //TODO Route to Beacon / Oracle
    }
}

export default CustomError;