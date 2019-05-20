import React from "react";
import ReactDOM from "react-dom";
import Cellular from "./../package";

//  https://reactjs.org/
class RenderCell extends Cellular.Cell {
    constructor(html) {
        super({
            templates: {}
        },
        Organelle.Package(
            [ "render", payload => {
                let invoke = (event, payload) => {
                    //TODO invoke "dispatch"
                };

                //TODO Write render logic
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
            }],




            //? A ZetaEnzyme("render") will invoke this function to re-render DOM content for a DOM-Element
            [ "render", () => {
                //! Reread about Fragments: https://reactjs.org/docs/react-api.html#reactfragment, https://reactjs.org/blog/2017/11/28/react-v16.2.0-fragment-support.html#keyed-fragments
                //TODO Rework this example to fit this Cell
                // ReactDOM.render(
                //     <HelloMessage name="Taylor" />,
                //     document.getElementById('hello-example')
                // );

                // //* will JS translate into this:

                //! createElement documentation: https://reactjs.org/docs/react-api.html#createelement
                // // @HelloMessage was declared as the Class so it existed by here in example
                // ReactDOM.render(React.createElement(HelloMessage, { name: "Taylor" }), document.getElementById('hello-example'))
            }]
        ));

        //TODO Behaviors should be turned into AQT tags and this._actions should be an AQT root tag.
        //? TODO-change allows for Behaviors to be translated into AQT transformations
        this.Learn("class-add", (name, reactClassObj) => {
            this.GetState().templates[name] = React.createClass(reactClassObj);
        });
        this.Learn("class-remove", (name) => {
            delete this.GetState().templates[name];
        });
        //TODO Pass the render invocation to the actual React renderer
        //TODO 
    }
}

export default RenderCell;