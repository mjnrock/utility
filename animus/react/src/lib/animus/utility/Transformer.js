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

    //TODO Change from PTO to AQT structure
    //? Comments within are only to compile in "npm start"; they should be uncommented before refactoring
    /**
	 * This will convert a TagCompound into an 1-D Array ("flattened") of every Descendant
	 * @param PTO..TagCompound | @tag 
	 * @param ? Array | @array | Used for recursion
	 * 
	 * @returns [Tag, ...N]
	 */
	static FlattenTagStructure(tag, array) {
		if (array === null || array === void 0) {
			array = [];
		}

		// if (tag instanceof Tag.TagCompound || tag instanceof Tag.TagList) {
		// 	array.push(tag);
		// 	let tags = tag.Value;
		// 	for (let i in tags) {
		// 		Transformer.FlattenTagStructure(tags[i], array);
		// 	}
		// } else if (tag instanceof Tag.ATag) {
		// 	array.push(tag);
		// }

		return array;
	}

    //TODO Change from PTO to AQT structure
    //? Comments within are only to compile in "npm start"; they should be uncommented before refactoring
	/**
	 * This will create a flattened, RDMS-like Hierarchy array where each constituent Tag is wrapped with an "ID" and a "ParentID"
	 * @param PTO..TagCompound | @tag 
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

		// if (tag instanceof Tag.TagCompound || tag instanceof Tag.TagList) {
		// 	for (let i in tag.Value) {
		// 		array = Transformer.ToHierarchy(tag.Value[i], array, ID);
		// 	}
		// }

		return array;
    }
    
    //TODO Change from PTO to AQT structure
    //? Comments within are only to compile in "npm start"; they should be uncommented before refactoring
	/**
	 * This will reconstitute a TagCompound from a TagCompound previously Tx:Hierarchy
	 * @param this.ToHierarchy Output | @array
	 * 
	 * @returns TagCompound
	 */
	static FromHierarchy(array) {
		if (array === null || array === void 0) {
			array = [];
		}

		// if (
		// 	array.length > 0 &&
		// 	(array[0] && array[0].Tag instanceof Tag.ATag)
		// ) {
		// 	let arr = {},
		// 		minID = array[0].ID;
		// 	for (let i in array) {
		// 		let ID = array[i].ID,
		// 			parentID = array[i].ParentID,
		// 			tag = array[i].Tag;

		// 		minID = ID < minID ? ID : minID;
		// 		arr[ID] = tag;
		// 		if (arr[parentID] instanceof Tag.TagCompound) {
		// 			arr[parentID].AddTag(arr[ID]);
		// 		} else if (arr[parentID] instanceof Tag.TagList) {
		// 			arr[parentID].AddValue(arr[ID]);
		// 		}
		// 	}

		// 	return arr[minID];
		// }

		return array;
	}

    //TODO Change from PTO to AQT structure
    //? Comments within are only to compile in "npm start"; they should be uncommented before refactoring
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
			Path: `${ parent !== null && parent !== void 0 ? `${ parent.Path }.` : "" }${ tag.GetKey() }`,
			Ordinality: tag.GetOrdinality(),
			Tag: tag
		});

		// if (tag instanceof Tag.TagCompound || tag instanceof Tag.TagList) {
		// 	let lastEntry = array[array.length - 1];
		// 	for (let i in tag.Value) {
		// 		array = Transformer.ToSchema(tag.Value[i], array, ID, lastEntry);
		// 	}
		// }

		return array;
	}
}

export default Transformer;