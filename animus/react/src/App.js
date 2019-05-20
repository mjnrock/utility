import React, { Component } from "react";

// import "./tests/Cell-1.test";
// import "./tests/Organelle-1.test";
// import "./tests/Hive-1.test";

// eslint-disable-next-line
import Animus from "./lib/animus/package";

let org = new Animus.Cellular.Organelle(
    payload => console.log(0),
    [ payload => console.log(1) ],
    [ "test", payload => console.log(2) ],
    [ () => false, payload => console.log(3) ],
    [ () => true, payload => console.log(4) ],
    [   // Evaluator (if a function) will receive (Organelle, Enzyme) as its 2 parameters
        (org, enz) => {
            console.log(org, enz);

            return true;
        },
        payload => {
            console.log(payload);

            console.log(5);
        }
    ],
);
let z1 = new Animus.Cellular.ZetaEnzyme("cats");
let z2 = new Animus.Cellular.ZetaEnzyme("test");

let cell = new Animus.Cellular.Cell();
cell.Endogenize(org);

// cell.Metabolize(z1);
// cell.Metabolize(z2);

let rend = new Animus.Cellular.DOM.RenderCell();

let mu = new Animus.Cellular.ZetaEnzyme("render");

// console.log(org);
console.log(rend);


rend.AddElement("test", (t, s) => (
    <div>
        { s.cats }
    </div>
));
rend.Metabolize(mu);

rend.MergeState({
    cats: "State Overwrite Test"
});
mu.Recycle();
rend.Metabolize(mu);

class App extends Component {
    render() {
        return (
            <div>Animus! ^_^</div>
        );
    }
}

export default App;