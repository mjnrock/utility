import Quanta from "./../quanta/package";

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
	 * @param AQT..Quantum | @tag 
	 * @param ? Array | @array | Used for recursion
	 * 
	 * @returns [Tag, ...N]
	 */
	static FlattenTagStructure(tag, array) {
		if (array === null || array === void 0) {
			array = [];
		}

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
	 * This will create a flattened, RDMS-like Hierarchy array where each constituent Tag is wrapped with an "ID" and a "ParentID"
	 * @param AQT..Quantum | @tag
	 * @param ? Array | @array | Used for recursion
	 * @param ? INT | @parentID | Used for recursion
	 * 
	 * @returns [{ID, ParentID, Tag}, ...N]
	 */
	static ToHierarchy(tag, array, parentID) {
		if (array === null || array === void 0) {
			array = [];
		}
		if (parentID === void 0) {
			parentID = null;
		}

		let ID = array.length + 1;
		array.push({
			ID: ID,
			ParentID: parentID,
			Tag: tag
		});

		if (tag instanceof Quanta.QCollection) {
			for(let i in tag.GetValue()) {
                let val = tag.GetValue()[i];
				array = Transformer.ToHierarchy(val, array, ID);
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
	static FromHierarchy(array) {
		if (array === null || array === void 0) {
			array = [];
		}

		if (
			array.length > 0 &&
			(array[0] && array[0].Tag instanceof Quanta.Quantum)
		) {
			let arr = {},
				minID = array[0].ID;
			for (let i in array) {
				let ID = array[i].ID,
					parentID = array[i].ParentID,
					tag = array[i].Tag;

				minID = ID < minID ? ID : minID;
				arr[ID] = tag;
				if (arr[parentID] instanceof Quanta.QCollection) {
					arr[parentID].Add(arr[ID]);
				}
			}

			return arr[minID];
		}

		return array;
	}

	static ToSchema(tag, array, parentID, parent) {
		if (array === null || array === void 0) {
			array = [];
		}
		if (parentID === void 0) {
			parentID = null;
		}

		let ID = array.length + 1;
		array.push({
			ID: ID,
			ParentID: parentID,
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
				array = Transformer.ToSchema(val, array, ID, lastEntry);
			}
		}

		return array;
	}
}

export default Transformer;