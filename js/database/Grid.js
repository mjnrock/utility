class Grid {
	constructor(width = 0, height = 0) {
		this.Width = width;
		this.Height = height;

		this.Elements = {};
	}

	CheckSize(x, y) {
		this.CheckWidth(x);
		this.CheckHeight(y);

		return this;
	}
	CheckWidth(value) {
		this.Width = this.Width > value ? this.Width : value;

		return this;
	}
	CheckHeight(value) {
		this.Height = this.Height > value ? this.Height : value;

		return this;
	}

	AddColumn(value = 1) {
		this.Width += value;

		return this;
	}
	RemoveColumn(value = 1) {
		this.Width -= value;

		if(this.Width < 0) {
			this.Width = 0;
		}

		return this;
	}

	AddRow(value = 1) {
		this.Height += value;

		return this;
	}
	RemoveRow(value = 1) {
		this.Height -= value;

		if(this.Height < 0) {
			this.Height = 0;
		}

		return this;
	}

	//? This will TRUNCATE DECIMALS and ONLY accept POSITIVE values
	UnitizeInput(x, y) {
		x = Math.abs(~~x); y = Math.abs(~~y);

		return [ x, y ];
	}
	MakeName(x, y) {
		[ x, y ] = this.UnitizeInput(x, y);

		return `${ x },${ y }`;
	}

	Get(x, y) {
		[ x, y ] = this.UnitizeInput(x, y);

		return this.Elements[this.MakeName(x, y)];
	}
	Set(x, y, value) {
		[ x, y ] = this.UnitizeInput(x, y);

		this.Elements[this.MakeName(x, y)] = value;
		this.CheckSize(x, y);

		return this;
	}
	Remove(x, y) {
		[ x, y ] = this.UnitizeInput(x, y);

		delete this.Elements[this.MakeName(x, y)];
		this.CheckSize(x, y);

		return this;
	}

	GetColumn(x = 0) {
		let arr = [];
		for(let h = 0; h <= this.Height; h++) {
			arr.push(this.Get(x, h));
		}

		return arr;
	}
	GetRow(y = 0) {
		let arr = [];
		for(let w = 0; w <= this.Width; w++) {
			arr.push(this.Get(w, y));
		}

		return arr;
	}

	//@returns [ KEY, VALUE, [ KEY, VALUE ], i, this.Elements, this, ...varargs ]
	ForEach(callback, ...varargs) {
		return Object.entries(this.Elements).forEach((entry, index, array) => {
			let [ x, y ] = entry[0].split(",");

			return callback(+x, +y, entry[0], entry[1], entry, index, array, this, ...varargs);
		});
	}
	//@returns [ KEY, VALUE, [ KEY, VALUE ], i, this.Elements, this, ...varargs ]
	Map(callback, ...varargs) {
		return Object.entries(this.Elements).map((entry, index, array) => {
			let [ x, y ] = entry[0].split(",");

			return callback(+x, +y, entry[0], entry[1], entry, index, array, this, ...varargs);
		});
	}
	//@returns [ KEY, VALUE, [ KEY, VALUE ], i, this.Elements, this, ...varargs ]
	Filter(callback, ...varargs) {
		return Object.entries(this.Elements).filter((entry, index, array) => {
			let [ x, y ] = entry[0].split(",");

			return callback(+x, +y, entry[0], entry[1], entry, index, array, this, ...varargs);
		});
	}
	//@returns [ KEY, VALUE, [ KEY, VALUE ], i, this.Elements, this, ...varargs ]
	Reduce(callback, ...varargs) {
		return Object.entries(this.Elements).reduce((entry, index, array) => {
			let [ x, y ] = entry[0].split(",");

			return callback(+x, +y, entry[0], entry[1], entry, index, array, this, ...varargs);
		});
	}

	GetNeighbors(x, y, r = 1) {
		let arr = [];
		for(let i = x - r; i <= x + r; i++) {
			for(let j = y - r; j <= y + r; j++) {
				arr.push(this.Get(i, j));
			}
		}

		return arr;
	}
}

export default Grid;