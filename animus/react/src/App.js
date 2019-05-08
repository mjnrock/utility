import React, { Component } from "react";

// import "./tests/Cell-1.test";
// import "./tests/Organelle-1.test";
// import "./tests/Hive-1.test";

// eslint-disable-next-line
import Animus from "./lib/animus/package";

let c = Animus.Utility.Color.Create(75, 0, 130),
    r = c.PrintLabel();

console.log(r);

let t = Animus.Utility.Color.Create(230, 230, 230);

console.log(t.PrintLabel());
console.log(t.PrintLabel(true, 0.05));

class App extends Component {
    render() {
        return (
            <div>Animus! ^_^</div>
        );
    }
}

export default App;