import { ATag } from "./ATag.js";
import Enum from "../Enum/package.js";
import Error from "../Error/package.js";

class TagLong extends ATag {
	constructor(key, value) {
		super(Enum.TagType.LONG, key, null);

		this.SetValues(value);
	}

	SetValues(value) {
		if (value instanceof Array) {
			return super.SetValues(Int32Array, value);
		}

		if (typeof value === "object" || this.Value === null || this.Value === void 0) {
			this.Value = new Int32Array();

			return this;
		}

		if (value !== null && value !== void 0) {
			return this.SetValue(0, value);
		}

		return this;
	}

	SetValue(index, value) {
		if (value !== null && value !== void 0) {
			if (value.toString().length > 16) {
				throw new Error.UnsafeIntegerRange(value);
			}

			value = value.toString().padStart(16, 0);
			let l = +value.substr(0, 8),
				r = +value.substr(8, 8);

			[l, r].forEach(function(v) {
				if (
					!Number.isSafeInteger(v) ||
					v < Enum.DataTypeRange.INT_MIN ||
					v > Enum.DataTypeRange.INT_MAX
				) {
					throw new Error.UnsafeIntegerRange(v);
				}
			});

			let arr = [...this.Value];
			arr[2 * index] = l;
			arr[2 * index + 1] = r;
			this.Value = Int32Array.of(...arr);
		} else {
			throw new Error.UndefinedValue(value);
		}

		return this;
	}
	AddValue(value) {
		if (value !== null && value !== void 0) {
			if (value.toString().length > 16) {
				throw new Error.UnsafeIntegerRange(value);
			}

			value = value.toString().padStart(16, 0);
			let l = +value.substr(0, 8),
				r = +value.substr(8, 8);

			[l, r].forEach(function(v) {
				if (
					!Number.isSafeInteger(v) ||
					v < Enum.DataTypeRange.INT_MIN ||
					v > Enum.DataTypeRange.INT_MAX
				) {
					throw new Error.UnsafeIntegerRange(v);
				}
			});

			let arr = [...this.Value];
			arr.push(l);
			arr.push(r);
			this.Value = Int32Array.of(...arr);
		} else {
			throw new Error.UndefinedValue(value);
		}

		return this;
	}
	GetValue(index) {
		if (this.Value !== null && this.Value !== void 0) {
			return +"".concat(
				this.Value[2 * index].toString(),
				this.Value[2 * index + 1].toString()
			);
		}

		return null;
	}
	RemoveValue(index) {
		if (this.Value !== null && this.Value !== void 0) {
			let arr = [...this.Value];
			arr.splice(2 * index, 2);
			this.Value = Int32Array.of(...arr);
		}

		return this;
	}

	AddBufferValue(value) {
		if (value !== null && value !== void 0) {
			value = +value;
			if (
				!Number.isSafeInteger(value) ||
				value < Enum.DataTypeRange.INT_MIN ||
				value > Enum.DataTypeRange.INT_MAX
			) {
				throw new Error.UnsafeIntegerRange(value);
			}

			let arr = [...this.Value];
			arr.push(value);
			this.Value = Int32Array.of(...arr);
		} else {
			throw new Error.UndefinedValue(value);
		}

		return this;
	}

	GetBytePerValue() {
		return super.GetBytePerValue(4) * this.Value.length;
	}
}

export { TagLong };