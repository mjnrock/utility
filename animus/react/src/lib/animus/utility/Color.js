class Color {
    constructor(r = 255, g = 255, b = 255, a = 1.0) {
        if(arguments.length === 1) {
            this._type = Color.EnumType.HEX;
            this.SetHex(r);
        } else if(arguments.length === 3) {
            this._type = Color.EnumType.RGB;
            this.Set(r, g, b, a);
        } else if(arguments.length === 4) {
            this._type = Color.EnumType.RGBA;
            this.Set(r, g, b, a);
        } else {
            this._type = Color.EnumType.RGB;
            this.Set(255, 255, 255, 1.0);
        }
    }

    SetTypeHex() {
        this._type = Color.EnumType.HEX;

        return this;
    }
    SetTypeRGB() {
        this._type = Color.EnumType.RGB;

        return this;
    }
    SetTypeRGBA() {
        this._type = Color.EnumType.RGBA;

        return this;
    }
    Get() {
        switch(this._type) {
            case Color.EnumType.HEX:
                return this.ToHex();
            case Color.EnumType.RGB:
                return this.ToRGB();
            case Color.EnumType.RGBA:
                return this.ToRGBA();
            default:
                return this.RGB();
        }
    }

    R() {
        return this._value.r;
    }
    G() {
        return this._value.g;
    }
    B() {
        return this._value.b;
    }
    A() {
        return this._value.a;
    }

    ToHex() {
        return Color.RGBtoHex(this.R(), this.G(), this.B());
    }
    ToRGB() {
        return `rgb(${ this.R() }, ${ this.G() }, ${ this.B() })`;
    }
    ToRGBA() {
        return `rgba(${ this.R() }, ${ this.G() }, ${ this.B() }, ${ this.A() })`;
    }

    Set(r = 255, g = 255, b = 255, a = 1.0) {        
        this._value = {
            r: r,
            g: g,
            b: b,
            a: a
        };

        return this;
    }
    SetHex(hex) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        if(result) {
            this.SetRGBA(
                parseInt(result[1], 16),
                parseInt(result[2], 16),
                parseInt(result[3], 16),
                1.0
            );

            return this;
        }

        return false;
    }

    static RGBtoHex(r, g, b) {
        if(arguments.length === 1 && (arguments[0] instanceof String || typeof arguments[0] === "string")) {            
            let rgb = r.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

            return (rgb && rgb.length === 4) ? "#" +
                ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
                ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
                ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
        }

        let compToHex = (c) => {
            let hex = c.toString(16);

            return hex.length === 1 ? `0${ hex }` : hex;
        };

        return `#${ compToHex(r) }${ compToHex(g) }${ compToHex(b) }`;
    }

    static Create(r = 255, g = 255, b = 255, a = 1.0) {
        return new Color(r, g, b, a);
    }

    static Random(allowTransparency = false) {
        return new Color(
            Math.floor(Math.random() * 256),
            Math.floor(Math.random() * 256),
            Math.floor(Math.random() * 256),
            allowTransparency ? Math.random() : 1.0
        );
    }
}

Color.EnumType = Object.freeze({
    HEX: "hex",
    RGB: "rgb",
    RGBA: "rgba"
});

export default Color;