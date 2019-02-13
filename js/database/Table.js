import Grid from "./Grid.js";

class Table {
	constructor(headers = []) {
		this.Headers = headers;
		this.Elements = new Grid(headers.length);
	}

	AddColumn(name) {
		this.Headers.push(name);
		this.Elements.AddColumn();

		return this;
	}
	RemoveColumn(name) {
		this.Headers = this.Headers.filter(v => v !== name);
		this.Elements.RemoveColumn();

		return this;
	}

	Insert(payload = {}) {
		let height = this.Elements.Height + 1;

		for(let key in payload) {
			let value = payload[key];

			this.Elements.Set(this.Headers.indexOf(key), height, value);
		}

		return this;
	}
	Update(payload = {}, where = null) {
		this.Elements.ForEach(( x, y, key, value, entry, i, eles, t) => {
			if(where(x, y, key, value, entry, i, eles, t) === true) {
				for(let key in payload) {
					let value = payload[key];
		
					this.Elements.Set(key, y, value);
				}
			}
		});

		return this;
	}
	Change(payload = {}, row) {
		this.Elements.ForEach(( x, y, key, value, entry, i, eles, t) => {
			if(y === +row) {
				for(let key in payload) {
					let value = payload[key];
		
					this.Elements.Set(key, y, value);
				}
			}
		});

		return this;
	}
	
	//@returns [ KEY, VALUE, [ KEY, VALUE ], i, this.Elements, this, ...varargs ]
	/**
	 * @param {array} cols 
	 * @param {fn} where 
	 */
	Find(cols, where = null) {
		let indexes = [];
		cols.forEach((v, i) => {
			indexes.push(this.Headers.indexOf(cols[i]));
		});

		return this.Elements.Map(( x, y, key, value, entry, i, eles, t) => {
			if(indexes.includes(x)) {
				if(where !== null) {
					if(where(x, y, key, value, entry, i, eles, t) === true) {
						return [ x, y, value ];
					}

					return null;
				}

				return value;
			}
			
			return null;
		}).filter(v => v !== null);
	}

	//@returns [ KEY, VALUE, [ KEY, VALUE ], i, this.Elements, this, ...varargs ]
	/**
	 * @param {array} cols 
	 */
	Select(cols) {
		let indexes = [];
		cols.forEach((v, i) => {
			indexes.push(this.Headers.indexOf(cols[i]));
		});

		return this.Elements.Map(( x, y, key, value, entry, i, eles, t) => {
			if(indexes.includes(x)) {
				return value;
			}
			
			return null;
		}).filter(v => v !== null);
	}
	/**
	 * @param {int} row
	 * @param {array} cols 
	 */
	Fetch(cols, row) {
		let indexes = [];
		cols.forEach((v, i) => {
			indexes.push(this.Headers.indexOf(cols[i]));
		});

		return this.Elements.Map(( x, y, key, value, entry, i, eles, t) => {
			if(indexes.includes(x) && y === +row) {
				return value;
			}
			
			return null;
		}).filter(v => v !== null);
	}
}

export default Table;