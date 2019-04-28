import React, { Component } from "react";

import Organelle from "./lib/animus/Organelle";


let o = new Organelle(Organelle.EnumProcessType.FEED,
    (payload) => {
        if(Array.isArray(payload)) {
            return payload.reduce((a, c, i) => a + c);
        }
    },
    (payload) => {
        return payload * 5;
    }
);
let org = new Organelle(
    (payload) => {
        console.log(payload);
    }
);

o.UUID = "o";
org.UUID = "org";

o.Subscribe(org);
o.Metabolize([ 5, 5, 3 ]);

class App extends Component {
    render() {
        return (
            <div>;</div>
        );
    }
}

export default App;
