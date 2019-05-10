import React, { Component } from "react";

// import "./tests/Cell-1.test";
// import "./tests/Organelle-1.test";
// import "./tests/Hive-1.test";

// eslint-disable-next-line
import Animus from "./lib/animus/package";

let beacon = new Animus.Hive.Beacon(),
    cell = new Animus.Cellular.Cell(),
    cell2 = new Animus.Cellular.Cell();

beacon.Attach("subscription-add", (...args) => console.log("I'm SUBSCRIBED!!", ...args));
beacon.Attach("metabolism-begin", (...args) => console.log("I'm METABOLIZING!!", ...args));
beacon.SubscribeTo(cell, cell2);
console.log(beacon);

let beta = new Animus.Cellular.BetaEnzyme("add", (cell, a, b) => {
    return a + b;
});
cell.Metabolize(beta);
beacon.Attach("invocation-action", (...args) => console.log("I'm INVOKED!!", ...args));
cell.Teach("add", cell2);
beacon.Detach("invocation-action");
cell2.ƒ.add(cell2, 15, 96);

let mu = new Animus.Cellular.MuEnzyme("custom-thang", {
    message: "Sup guy?"
});
beacon.Attach("custom-thang", (...args) => console.log("I'm CUSTOM!", ...args));
cell.Metabolize(mu);

class App extends Component {
    render() {
        return (
            <div>Animus! ^_^</div>
        );
    }
}

export default App;