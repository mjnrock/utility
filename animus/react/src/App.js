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

let arr = [ 1, 2, 3, 4, 5 ];
let rend = new Animus.Cellular.DOM.RenderCell("root2");
rend.AddElement("Kiszka", (t, s) => {
    return (
        <div>
            {
                arr.map((a, i) => <p key={ i }>{ a }</p>)
            }
        </div>
    );
});

console.log(rend);

let mu = new Animus.Cellular.ZetaEnzyme("render");
rend.Metabolize(mu);

setTimeout(() => {
    arr = [ 9, 10, 11 ];

    mu.Recycle();
    rend.Metabolize(mu);
}, 1500);

// console.log(org);
// console.log(rend);


class App extends Component {
    render() {
        return (
            <div>Animus! ^_^</div>
        );
    }
}

export default App;