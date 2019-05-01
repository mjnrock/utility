import React, { Component } from "react";

// import "./tests/Cell-1.test";
// import "./tests/Organelle-1.test";
// import "./tests/Hive-1.test";

// eslint-disable-next-line
import Animus from "./lib/animus/package";

let q = new Animus.Quanta.Quantum("typeA", {
    data1: 1,
    data2: 2
}, {
    key: "fat"
});

console.log(q.GetData());
q.FetchData("http://localhost:3087/validate").then((data) => console.log(data.GetData()));

class App extends Component {
    render() {
        return (
            <div>;</div>
        );
    }
}

export default App;