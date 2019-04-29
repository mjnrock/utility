import React, { Component } from "react";

import Metabolites from "./lib/animus/metabolite/package";
import Organelle from "./lib/animus/Organelle";
import Cell from "./lib/animus/Cell";

let c = new Cell();

// c.Subscribe({
//     next: (payload) => console.log(payload)
// });

let beta = new Metabolites.BetaMetabolite("print", (cell, payload) => {
    console.log("-------------");
    console.log(cell);
    console.log(payload);
    console.log("-------------");

    return payload;
}, 8, 16, 32);
let gamma = new Metabolites.GammaMetabolite("print", {
    cat: "Kiszka"
});
let omega = new Metabolites.OmegaMetabolite("print");

c.Metabolize(beta);
c.Metabolize(omega);
let a = c.Metabolize(gamma);
console.log(a)
// c.Metabolize(gamma);

class App extends Component {
    render() {
        return (
            <div>;</div>
        );
    }
}

export default App;
