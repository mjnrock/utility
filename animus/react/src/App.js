import React, { Component } from "react";

// import "./tests/Cell-1.test";
// import "./tests/Organelle-1.test";
// import "./tests/Hive-1.test";

// eslint-disable-next-line
import Animus from "./lib/animus/package";

let t = new Animus.Quanta.QCollection("root"),
    t0 = new Animus.Quanta.QString("r.0", "cats");
t.Add(t0);
t.Add(new Animus.Quanta.QString("r.1", "dogs"));
t.Add(new Animus.Quanta.QNumeric("r.2", 56));

let f = t.Find("r.2", Animus.Quanta.Quantum.EnumAttributeType.KEY);
let g = t.Find("dogs", Animus.Quanta.Quantum.EnumAttributeType.VALUE);
let h = t.Find("dogs", 999);

console.log(f);
console.log(g);
console.log(h);

class App extends Component {
    render() {
        return (
            <div>Animus! ^_^</div>
        );
    }
}

export default App;