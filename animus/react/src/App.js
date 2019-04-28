import React, { Component } from "react";

import Organelle from "./lib/animus/Organelle";
import Cell from "./lib/animus/Cell";

let c = new Cell();

c.Learn("print", (...args) => {
    console.log(`ARGS: ${ args }`);
}, 3, 5, 6);

// console.log(c);

c.ƒprint(1, 2, 3, 4, 5);
c.ƒprint();

class App extends Component {
    render() {
        return (
            <div>;</div>
        );
    }
}

export default App;
