class RegEx {
    static Number(input) {
        return input.match(/-?(?=[1-9]|0(?!\d))\d+(\.\d+)?([eE][+-]?\d+)?/i);
    }
    static Boolean(input) {
        return input.match(/true|false|null/i);
    }

    static UUID(input, version = null) {
        if(version === 1) {
            return input.match(/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[1][0-9a-f]{3}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/i);
        } else if(version === 2) {
            return input.match(/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[2][0-9a-f]{3}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/i);
        } else if(version === 3) {
            return input.match(/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[3][0-9a-f]{3}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/i);
        } else if(version === 4) {
            return input.match(/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[4][0-9a-f]{3}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/i);
        } else if(version === 5) {
            return input.match(/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[5][0-9a-f]{3}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/i);
        }

        return input.match(/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/i);
    }

    static Hexidecimal(input) {
        return input.match(/0[xX][0-9a-fA-F]+/i);
    }
}

export default RegEx;