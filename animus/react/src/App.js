import React, { Component } from "react";

import Enzymes from "./lib/animus/enzyme/package";
import Organelle from "./lib/animus/Organelle";
import Cell from "./lib/animus/Cell";

let c = new Cell();

c.Subscribe({
    next: (payload) => console.log(payload)
});

let beta = new Enzymes.BetaEnzyme("print", (cell, payload) => {
    console.log(`ARGS`, cell, payload);
    console.log("-------------");
    
    return payload;
}, 8, 16, 32),
    gamma = new Enzymes.GammaEnzyme("print", 999),
    omega = new Enzymes.OmegaEnzyme("print");

c.Metabolize(beta);
c.Metabolize(omega);
c.Metabolize(gamma);

class App extends Component {
    render() {
        return (
            <div>;</div>
        );
    }
}

export default App;
