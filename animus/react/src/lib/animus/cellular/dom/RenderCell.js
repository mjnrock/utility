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
        },
        Organelle.Make(
            [ "render", payload => {
                ReactDOM.render(
                    //TODO "this.GetState().test" is obviously a test, this must actually iterate through all elements and render accordingly
                    React.createElement(this.GetState().test(this, this.GetState())),
                    document.getElementById("root2")
                    
                    //? Must decide on how the "container" will be passed here (as entry in state or dynamically through @payload from enzyme)
                    // React.createElement(this.GetState().test.element(this, this.GetState())),
                    // document.getElementById(payload.container) OR document.getElementById(this.GetState().test.container)
                );
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
        ));

        //  This adds "this.GetState().cats"
        this.MergeState({
            cats: "State Test"
        });
        //  This adds "this.GetState().test"  //! Without this, the "render" will currently fail as it looks for "this.GetState().test"
        this.AddElement("test", (t, s) => (
            <div>
                { s.cats }
            </div>
        ));
        this.AddElement("test", (
            <div>
                NO DYNAMIC CONTENT TEST
            </div>
        ));
        //  This won't show if the state isn't dynamically queried on render
        this.MergeState({
            cats: "State Overwrite Test"
        });
    }

    //! This is likely not complete, as it has not been tested on React > refs and DOM event handling (e.g. onclick, onsubmit, etc.)
    //! c.f. const invoke = ... above
    /**
     * @param {string} name The name of the (React class) component
     * @param {function|JSX} fn
     * If @fn is a function, it will be passed (this, this.GetState()) from the RenderCell
     * If @fn is just JSX, it will render the static content
     */
    AddElement(name, fn) {
        let state = {
            [name]: (t, s) => {
                if(typeof fn === "function") {
                    return () => fn(t, s)
                }

                return () => fn;
            }
        };

        this.MergeState(state);

        return this;
    }
}

export default RenderCell;