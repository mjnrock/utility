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

    ToggleHex() {
        this._type = Color.EnumType.HEX;

        return this;
    }
    ToggleRGB() {
        this._type = Color.EnumType.RGB;

        return this;
    }
    ToggleRGBA() {
        this._type = Color.EnumType.RGBA;

        return this;
    }
    ToggleHSL() {
        this._type = Color.EnumType.HSL;

        return this;
    }
    ToggleHSV() {
        this._type = Color.EnumType.HSV;

        return this;
    }

    Get() {
        switch(this._type) {
            case Color.EnumType.HEX:
                return this.PrintHex();
            case Color.EnumType.RGB:
                return this.PrintRGB();
            case Color.EnumType.RGBA:
                return this.PrintRGBA();
            case Color.EnumType.HSL:
                return this.PrintHSL();
            case Color.EnumType.HSV:
                return this.PrintHSV();
            default:
                return this.PrintRGB();
        }
    }

    R() {
        return +this._value.r;
    }
    G() {
        return +this._value.g;
    }
    B() {
        return +this._value.b;
    }
    A() {
        return +this._value.a;
    }
    RGB() {
        return [
            this.R(),
            this.G(),
            this.B()
        ];
    }
    RGBA() {
        return [
            this.R(),
            this.G(),
            this.B(),
            this.A()
        ];
    }
    Hex() {
        return [
            Color.RGBComponent2Hex(this.R()),
            Color.RGBComponent2Hex(this.G()),
            Color.RGBComponent2Hex(this.B())
        ];
    }

    PrintHex() {
        return Color.RGB2Hex(this.R(), this.G(), this.B());
    }
    PrintRGB() {
        return `rgb(${ this.R() }, ${ this.G() }, ${ this.B() })`;
    }
    PrintRGBA() {
        return `rgba(${ this.R() }, ${ this.G() }, ${ this.B() }, ${ this.A() })`;
    }
    PrintHSL() {
        let r = this.R(),
            g = this.G(),
            b = this.B();
      
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
      
        if(max === min) {
            h = s = 0; // achromatic
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
                default:
                    break;
            }
        
            h /= 6;
        }
      
        return `hsl(${ h }, ${ s }, ${ l })`;
    }
    PrintHSV() {
        let r = this.R(),
            g = this.G(),
            b = this.B();

        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, v = max;

        let d = max - min;
        s = max === 0 ? 0 : d / max;

        if (max === min) {
            h = 0; // achromatic
        } else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
                default:
                    break;
            }

            h /= 6;
        }

        return `hsv(${ h }, ${ s }, ${ v })`;
    }
    PrintLabel() {
        let colors = Object.entries(Color.Labels);

        try {
            for(let i in colors) {
                let c = colors[i],
                    r = +c[1][0], g = +c[1][1], b = +c[1][2];
                
                    if(this.R() === r && this.G() === g && this.B() === b) {
                        return c[0];
                    }
            }
        } catch(e) {
            console.warn("[Operation Aborted]: Not a named color");
        }
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

    static RGB2Hex(r, g, b) {
        if(arguments.length === 1 && (arguments[0] instanceof String || typeof arguments[0] === "string")) {            
            let rgb = r.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

            return (rgb && rgb.length === 4) ? "#" +
                ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
                ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
                ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
        }

        return `#${ Color.RGBComponent2Hex(r) }${ Color.RGBComponent2Hex(g) }${ Color.RGBComponent2Hex(b) }`.toUpperCase();
    }
    static RGBComponent2Hex(c) {
        let hex = c.toString(16);

        return hex.length === 1 ? `0${ hex }` : hex;
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

    static FromLabel(label) {
        label = label.replace(/[^a-zA-Z0-9]/gi, "").toLowerCase();

        let result = Color.Labels[label];
        if(result !== null && result !== void 0) {
            return new Color(
                result[0],
                result[1],
                result[2],
                1.0
            );
        }
        
        console.warn("[Operation Aborted]: Not a valid label");
    }
}

Color.EnumType = Object.freeze({
    HEX: "hex",
    RGB: "rgb",
    RGBA: "rgba",
    HSL: "hsl",
    HSV: "hsv"
});

Color.Labels = Object.freeze({
    "aliceblue": [240, 248, 255],
    "antiquewhite": [250, 235, 215],
    "aqua": [0, 255, 255],
    "aquamarine": [127, 255, 212],
    "azure": [240, 255, 255],
    "beige": [245, 245, 220],
    "bisque": [255, 228, 196],
    "black": [0, 0, 0],
    "blanchedalmond": [255, 235, 205],
    "blue": [0, 0, 255],
    "blueviolet": [138, 43, 226],
    "brown": [165, 42, 42],
    "burlywood": [222, 184, 135],
    "cadetblue": [95, 158, 160],
    "chartreuse": [127, 255, 0],
    "chocolate": [210, 105, 30],
    "coral": [255, 127, 80],
    "cornflowerblue": [100, 149, 237],
    "cornsilk": [255, 248, 220],
    "crimson": [220, 20, 60],
    "cyan": [0, 255, 255],
    "darkblue": [0, 0, 139],
    "darkcyan": [0, 139, 139],
    "darkgoldenrod": [184, 134, 11],
    "darkgray": [169, 169, 169],
    "darkgreen": [0, 100, 0],
    "darkgrey": [169, 169, 169],
    "darkkhaki": [189, 183, 107],
    "darkmagenta": [139, 0, 139],
    "darkolivegreen": [85, 107, 47],
    "darkorange": [255, 140, 0],
    "darkorchid": [153, 50, 204],
    "darkred": [139, 0, 0],
    "darksalmon": [233, 150, 122],
    "darkseagreen": [143, 188, 143],
    "darkslateblue": [72, 61, 139],
    "darkslategray": [47, 79, 79],
    "darkslategrey": [47, 79, 79],
    "darkturquoise": [0, 206, 209],
    "darkviolet": [148, 0, 211],
    "deeppink": [255, 20, 147],
    "deepskyblue": [0, 191, 255],
    "dimgray": [105, 105, 105],
    "dimgrey": [105, 105, 105],
    "dodgerblue": [30, 144, 255],
    "firebrick": [178, 34, 34],
    "floralwhite": [255, 250, 240],
    "forestgreen": [34, 139, 34],
    "fuchsia": [255, 0, 255],
    "gainsboro": [220, 220, 220],
    "ghostwhite": [248, 248, 255],
    "gold": [255, 215, 0],
    "goldenrod": [218, 165, 32],
    "gray": [128, 128, 128],
    "green": [0, 128, 0],
    "greenyellow": [173, 255, 47],
    "grey": [128, 128, 128],
    "honeydew": [240, 255, 240],
    "hotpink": [255, 105, 180],
    "indianred": [205, 92, 92],
    "indigo": [75, 0, 130],
    "ivory": [255, 255, 240],
    "khaki": [240, 230, 140],
    "lavender": [230, 230, 250],
    "lavenderblush": [255, 240, 245],
    "lawngreen": [124, 252, 0],
    "lemonchiffon": [255, 250, 205],
    "lightblue": [173, 216, 230],
    "lightcoral": [240, 128, 128],
    "lightcyan": [224, 255, 255],
    "lightgoldenrodyellow": [250, 250, 210],
    "lightgray": [211, 211, 211],
    "lightgreen": [144, 238, 144],
    "lightgrey": [211, 211, 211],
    "lightpink": [255, 182, 193],
    "lightsalmon": [255, 160, 122],
    "lightseagreen": [32, 178, 170],
    "lightskyblue": [135, 206, 250],
    "lightslategray": [119, 136, 153],
    "lightslategrey": [119, 136, 153],
    "lightsteelblue": [176, 196, 222],
    "lightyellow": [255, 255, 224],
    "lime": [0, 255, 0],
    "limegreen": [50, 205, 50],
    "linen": [250, 240, 230],
    "magenta": [255, 0, 255],
    "maroon": [128, 0, 0],
    "mediumaquamarine": [102, 205, 170],
    "mediumblue": [0, 0, 205],
    "mediumorchid": [186, 85, 211],
    "mediumpurple": [147, 112, 219],
    "mediumseagreen": [60, 179, 113],
    "mediumslateblue": [123, 104, 238],
    "mediumspringgreen": [0, 250, 154],
    "mediumturquoise": [72, 209, 204],
    "mediumvioletred": [199, 21, 133],
    "midnightblue": [25, 25, 112],
    "mintcream": [245, 255, 250],
    "mistyrose": [255, 228, 225],
    "moccasin": [255, 228, 181],
    "navajowhite": [255, 222, 173],
    "navy": [0, 0, 128],
    "oldlace": [253, 245, 230],
    "olive": [128, 128, 0],
    "olivedrab": [107, 142, 35],
    "orange": [255, 165, 0],
    "orangered": [255, 69, 0],
    "orchid": [218, 112, 214],
    "palegoldenrod": [238, 232, 170],
    "palegreen": [152, 251, 152],
    "paleturquoise": [175, 238, 238],
    "palevioletred": [219, 112, 147],
    "papayawhip": [255, 239, 213],
    "peachpuff": [255, 218, 185],
    "peru": [205, 133, 63],
    "pink": [255, 192, 203],
    "plum": [221, 160, 221],
    "powderblue": [176, 224, 230],
    "purple": [128, 0, 128],
    "rebeccapurple": [102, 51, 153],
    "red": [255, 0, 0],
    "rosybrown": [188, 143, 143],
    "royalblue": [65, 105, 225],
    "saddlebrown": [139, 69, 19],
    "salmon": [250, 128, 114],
    "sandybrown": [244, 164, 96],
    "seagreen": [46, 139, 87],
    "seashell": [255, 245, 238],
    "sienna": [160, 82, 45],
    "silver": [192, 192, 192],
    "skyblue": [135, 206, 235],
    "slateblue": [106, 90, 205],
    "slategray": [112, 128, 144],
    "slategrey": [112, 128, 144],
    "snow": [255, 250, 250],
    "springgreen": [0, 255, 127],
    "steelblue": [70, 130, 180],
    "tan": [210, 180, 140],
    "teal": [0, 128, 128],
    "thistle": [216, 191, 216],
    "tomato": [255, 99, 71],
    "turquoise": [64, 224, 208],
    "violet": [238, 130, 238],
    "wheat": [245, 222, 179],
    "white": [255, 255, 255],
    "whitesmoke": [245, 245, 245],
    "yellow": [255, 255, 0],
    "yellowgreen": [154, 205, 50]
});

export default Color;