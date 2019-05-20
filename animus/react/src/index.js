import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

ReactDOM.render(
    <App />,
    document.getElementById("root")
);
ReactDOM.render(
    <div>
        <span>Hello</span>
    </div>,
    document.getElementById("root2")
);
ReactDOM.render(
    <div>
        <span>What?!</span>
    </div>,
    document.getElementById("root2")
);
