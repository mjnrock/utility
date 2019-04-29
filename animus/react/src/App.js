import React, { Component } from "react";

import Animus from "./lib/animus/package";

let c = new Animus.Cellular.Cell();

// c.Subscribe({
//     next: (payload) => console.log(payload)
// });

let beta = new Animus.Cellular.BetaMetabolite("print", (cell, payload) => {
    console.log("-------------");
    console.log(cell);
    console.log(payload);
    console.log("-------------");

    return payload;
}, 8, 16, 32);
let gamma = new Animus.Cellular.GammaMetabolite("print", {
    cat: "Kiszka"
});
let omega = new Animus.Cellular.OmegaMetabolite("print");

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
