import React, { Component } from "react";

// import "./tests/Cell-1.test";
// import "./tests/Organelle-1.test";
// import "./tests/Hive-1.test";

// eslint-disable-next-line
import Animus from "./lib/animus/package";

let oracle = new Animus.Hive.Oracle(),
    cell = new Animus.Cellular.Cell(),
    cell2 = new Animus.Cellular.Cell();

oracle._beacon.Attach("subscription-add", (...args) => console.log("I'm SUBSCRIBED!!", ...args));
oracle._beacon.Attach("metabolism-begin", (...args) => console.log("I'm METABOLIZING!!", ...args));
oracle._beacon.SubscribeTo(cell, cell2);
console.log(oracle._beacon);

let beta = new Animus.Cellular.BetaEnzyme("add", (cell, a, b) => {
    return a + b;
});
cell.Metabolize(beta);
oracle._beacon.Attach("invocation-action", (...args) => console.log("I'm INVOKED!!", ...args));
cell.Teach("add", cell2);
oracle._beacon.Detach("invocation-action");
cell2.ƒ.add(cell2, 15, 96);

let mu = new Animus.Cellular.MuEnzyme("custom-thang", {
    message: "Sup guy?"
});
oracle.ß("custom-thang", (...args) => console.log("I'm CUSTOM!", ...args));
cell.Metabolize(mu);

console.log(oracle.ß);

class App extends Component {
    render() {
        return (
            <div>Animus! ^_^</div>
        );
    }
}

export default App;