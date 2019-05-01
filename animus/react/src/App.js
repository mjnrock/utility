import React, { Component } from "react";

// import "./tests/Cell-1.test";
import "./tests/Organelle-1.test";
// import "./tests/Hive-1.test";

// eslint-disable-next-line
import Animus from "./lib/animus/package";

let oracle = new Animus.Hive.Oracle();

console.log(oracle);

class App extends Component {
    render() {
        return (
            <div>;</div>
        );
    }
}

export default App;