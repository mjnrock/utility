import Quanta from "./package";

class Transformer {
	static GenerateUUID() {
		let d = new Date().getTime();
		let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
			/[xy]/g,
			function(c) {
				let r = ((d + Math.floor(Math.random() * 17)) % 16) | 0;
				d = Math.floor(d / 16);
				return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
			}
		);

		return uuid.toUpperCase();
    }

    /**
	 * This will convert a AQT..Quantum into an 1-D Array ("flattened") of every Descendant, maintaining _value references
     * To undo this, the root tag is stored first in @array[0]
	 * @param AQT..Quantum | @tag 
	 * @param ? Array | @array | Used for recursion
	 * 
	 * @returns [Tag, ...N]
	 */
	static FlattenTagStructure(tag, array = []) {
		if (tag instanceof Quanta.QCollection) {
			array.push(tag);
			let tags = tag.GetValue();
			for (let i in tags) {
				Transformer.FlattenTagStructure(tags[i], array);
			}
		} else if (tag instanceof Quanta.Quantum) {
			array.push(tag);
		}

		return array;
	}

	/**
	 * This will create a flattened, RDMS-like Hierarchy array where each constituent Tag is wrapped with an "HID" and a "ParentHID"
	 * @param AQT..Quantum | @tag
	 * @param ? Array | @array | Used for recursion
	 * @param ? INT | @parentHID | Used for recursion
	 * 
	 * @returns [{HID, ParentHID, Tag}, ...N]
	 */
	static ToHierarchy(tag, array = [], parentHID = null) {
		let HID = array.length + 1;
		array.push({
			HID: HID,
			ParentHID: parentHID,
			Tag: tag
		});

		if (tag instanceof Quanta.QCollection) {
			for(let i in tag.GetValue()) {
                let val = tag.GetValue()[i];
				array = Transformer.ToHierarchy(val, array, HID);
			}
		}

		return array;
    }
    
	/**
	 * This will reconstitute a AQT..Quantum from a AQT..Quantum previously Tx:Hierarchy
	 * @param Transformer.ToHierarchy Output | @array
	 * 
	 * @returns AQT..Quantum
	 */
	static FromHierarchy(array = []) {
		if (
			array.length > 0 &&
			(array[0] && array[0].Tag instanceof Quanta.Quantum)
		) {
			let arr = {},
				minHID = array[0].HID;
			for (let i in array) {
				let HID = array[i].HID,
					parentHID = array[i].ParentHID,
					tag = array[i].Tag;

				minHID = HID < minHID ? HID : minHID;
				arr[HID] = tag;
				if (arr[parentHID] instanceof Quanta.QCollection) {
					arr[parentHID].Add(arr[HID]);
				}
			}

			return arr[minHID];
		}

		return array;
	}

    //TODO Convert to AQT
	/**
	 * Column:	"Value"
	 * - If the Tag is a Quanta.Quantum, the entry will be a count of Children (not Descendants)
	 * Column:	"Options"
	 * - If the Tag is a Quanta.QArray, the entry will be the List's typing (i.e. the allowed Child type)
	 * @param AQT..Quantum | @tag
	 * @param ? [PRIMARY, SECONDARY] | @delimiters
	 * @param ? BOOL | @hasHeaders 
	 * @param ? BOOL | @makeTextReadible
	 * 
	 * @returns STRING | A @delimiters-delimited string
	 */
	static ToDelimited(rootTag, delimiters, hasHeaders, makeTextReadible) {
		if (hasHeaders === null || hasHeaders === void 0) {
			hasHeaders = true;
		}
		if (makeTextReadible === null || makeTextReadible === void 0) {
			makeTextReadible = true;
		}

		let s,
			d1 = delimiters && delimiters[0] ? delimiters[0] : ",",
			d2 = delimiters && delimiters[1] ? delimiters[1] : "|";

		if (rootTag instanceof Array) {
			s = rootTag;
		} else {
			s = Transformer.ToHierarchy(rootTag);
		}

		let csv = !!hasHeaders ? "HID,ParentHID,Type,ID,Key,Origin,Ordinality,Value,Options\n" : "";
		for (let i in s) {
			let row = [
				+s[i].HID,
				s[i].ParentHID === null ? null : +s[i].ParentHID,
				+s[i].Tag.GetType(),
				s[i].Tag.GetId(),
				s[i].Tag.GetKey(),
				s[i].Tag.GetOrigin(),
				+s[i].Tag.GetOrdinality()
			];
			if (s[i].Tag instanceof Quanta.QCollection) {
				row.push(+s[i].Tag.Size());
				row.push(null);
            }
            // else if (s[i].Tag instanceof Tag.TagList) {
			// 	row.push(+s[i].Tag.Size());
			// 	row.push(+s[i].Tag.GetContentType());
            // }
            else if (
				!!makeTextReadible &&
				s[i].Tag instanceof Quanta.QString
			) {
				row.push(
					s[i].Tag.GetValue()
						.toString()
						.replace(/,/g, "|")
				);
				row.push(null);
			} else {
				if(s[i].Tag.GetValue()) {
					row.push(
						s[i].Tag.GetValue()
							.toString()
							.replace(/,/g, "|")
					);
				} else {
					row.push(null);
				}
				row.push(null);
			}

			csv += JSON.stringify(row)
				.replace(/null/gi, "")
				.replace(/\[/gi, "")
				.replace(/\]/gi, "");

			if (+i !== s.length - 1) {
				// Don't put a NEWLINE on the last row
				csv += "\n";
			}
		}

		csv = csv.replace(/,/gi, d1).replace(/\|/gi, d2);

		return csv;
	}

	static ToSchema(tag, array = [], parentHID = null, parent) {
		let HID = array.length + 1;
		array.push({
			HID: HID,
			ParentHID: parentHID,
			Key: tag.GetKey(),
			KeyPath: `${ parent !== null && parent !== void 0 ? `${ parent.KeyPath }.` : "" }${ tag.GetKey() }`,
			IDPath: `${ parent !== null && parent !== void 0 ? `${ parent.IDPath }.` : "" }${ tag.GetId() }`,
			Ordinality: tag.GetOrdinality(),
			Tag: tag
		});

		if (tag instanceof Quanta.QCollection) {
			let lastEntry = array[ array.length - 1 ];
			for (let i in tag.GetValue()) {
                let val = tag.GetValue()[i];
				array = Transformer.ToSchema(val, array, HID, lastEntry);
			}
		}

		return array;
	}
}

export default Transformer;