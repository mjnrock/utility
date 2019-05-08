class Canvas {
    static IsHex(input) {
        return input.match(/^#(?:[0-9a-f]{3}){1,2}$/i);
    }
}

export default Canvas;