import React from "react";
import ReactDOM from "react-dom";

import Cell from "./../Cell";
import Organelle from "./../Organelle";

//! Not sure if this is going to work; originally it was scoped within the "render" sub-process
const invoke = (action, componentName, dispatcher, ...args) => {
    //TODO invoke "dispatch"
    return (
        <span>Dogs</span>
    )
};

//  https://reactjs.org/
class RenderCell extends Cell {
    constructor() {
        super({
            _elements: {}, // key = component name, value = React.createClass()
            // containers: {}, //! Figure out a way to allow for this Cell to use ReactDOM.render() on mutiple containers
            test: (
                <div>
                    <span>Cats</span>
                    { invoke() }
                </div>
            )
        },
        [
            Organelle.Make(
                [ "render", payload => {
                    console.log(payload);
                    ReactDOM.render(this.GetState().test, document.getElementById("root2"));

                    //TODO Write render logic that renders the JSX
                    //TODO (Initially) write the this.state update hook here for the JSX component
                    //? ReactDOM.render(element, container, ?callback) will perform smart updates on already created components: https://reactjs.org/docs/react-dom.html#render
                }],
                [ "dispatch", payload => {
                    // payload = {
                    //     action: The name of the function/action,
                    //     key: The name of the Component,
                    //     dispatcher: The name of the dispatcher,
                    //     args: The arguments for the dispatcher
                    // }

                    if(payload.action === "invoke") {
                        let state = this.GetState()[payload.key];
                        state["dispatchers"][payload.dispatcher](this, state, ...payload.args);
                    }
                }]
            )
        ]);
    }
}

export default RenderCell;