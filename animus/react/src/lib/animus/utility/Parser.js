import Animus from "./../package";

class Parser {
    static Query(tag, query) {
        //TODO
    }

    static Find(tag, value, searchType = Animus.Quanta.Quantum.EnumAttributeType.KEY) {
        for(let i in tag.GetValue()) {
            try {
                let aqt = tag.GetValue()[i],
                    key = Animus.Quanta.Quantum.ReverseEnum("AttributeType", searchType).toLowerCase();
                    key = key.charAt(0).toUpperCase() + key.slice(1);   // Evaluates to "Key, "Id", "Data", "Meta", etc.

                if(aqt[ `Get${ key }` ]() === value) {
                    return aqt;
                }
            } catch(e) {
                console.warn(`[Operation Aborted]: Invalid @searchType(${ searchType })`);
            }
        }
        
        return false;
    }

    static Has(tag, value, searchType = Animus.Quanta.Quantum.EnumAttributeType.KEY) {
        return Parser.Find(tag, value, searchType) instanceof Animus.Quanta.Quantum ? true : false;
    }
}

export default Parser;