import React, { Component } from "react";

import Cellular from "./lib/animus/cellular/package";

let c = new Cellular.Cell();

// c.Subscribe({
//     next: (payload) => console.log(payload)
// });

let beta = new Cellular.BetaMetabolite("print", (cell, payload) => {
    console.log("-------------");
    console.log(cell);
    console.log(payload);
    console.log("-------------");

    return payload;
}, 8, 16, 32);
let gamma = new Cellular.GammaMetabolite("print", {
    cat: "Kiszka"
});
let omega = new Cellular.OmegaMetabolite("print");

c.Metabolize(beta);
c.Metabolize(omega);
let a = c.Metabolize(gamma);
console.log(a)
c.Metabolize(gamma);

class App extends Component {
    render() {
        return (
            <div>;</div>
        );
    }
}

export default App;
