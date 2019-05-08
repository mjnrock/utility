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

let c = new Animus.Quanta.QCollection("child");
t.Add(c);
c.MakeTyped(Animus.Quanta.Quantum.EnumType.NUMERIC);
c.Add(new Animus.Quanta.QNumeric("label a", "9"));
c.Add(new Animus.Quanta.QNumeric("label b", 5.2));
c.Add(new Animus.Quanta.QNumeric("36.1235"));
c.Add(new Animus.Quanta.QString("fish"));

let td = Animus.Quanta.Transformer.ToDelimited(t);
console.log(td);

class App extends Component {
    render() {
        return (
            <div>Animus! ^_^</div>
        );
    }
}

export default App;