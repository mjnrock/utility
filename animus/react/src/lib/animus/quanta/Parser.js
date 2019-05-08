import Animus from "../package";

class Parser {
    static Query(tag, query) {
        //TODO  Compare to CSS selectors

        //* _    type
        //* .    tier separator
        //* []   meta block
            // [cat], [key=r.3], [id=/uuidregex/gi], [id=CA761232-ED42-11CE-BACD-00AA0057B223]
            // |, &, !     OR, AND, NOT
        //* $    meta.key
        //* #    child index
            // #0, #1-6, #*
            // -, *, <,,,>       range, all, separator
        //* @    meta.id
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