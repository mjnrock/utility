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
    constructor(rootId = "root") {
        super({
            _root: rootId,
            _components: {}, // key = component name, value = React.createClass()
            // containers: {}, //! Figure out a way to allow for this Cell to use ReactDOM.render() on mutiple containers
        },
        Organelle.Make(
            [ "render", payload => {
                for(let key in this.GetState()._components) {
                    let comp = this.GetState()._components[key],
                        cont = document.getElementById(this.GetState()._root);

                    if(comp.container !== null && comp.container !== void 0 && comp.container instanceof HTMLElement) {
                        cont = comp.container;
                    }
                    
                    const RenderElement = comp.element();
                    if(RenderElement.prototype.render) {
                        ReactDOM.render(
                            <RenderElement _scope={ this } _state={ this.GetState() } />,
                            cont
                        );
                    } else {
                        ReactDOM.render(
                            React.createElement(comp.element(this, this.GetState())),
                            cont
                        );
                    }
                }
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
    }

    //! This is likely not complete, as it has not been tested on React > refs and DOM event handling (e.g. onclick, onsubmit, etc.)
    //! c.f. const invoke = ... above
    /**
     * @param {string} name The name of the (React class) component
     * @param {function|JSX} fn
     * If @fn is a function, it will be passed (this, this.GetState()) from the RenderCell
     * If @fn is just JSX, it will render the static content
     */
    AddComponent(name, fn, state = {}, container = null) {
        if(container instanceof HTMLElement) {
            // NOOP
        } else if(typeof container === "string" || container instanceof String) {
            container = document.getElementById(container);
        }

        this.SetState({
            ...this.GetState(),
            _components: {
                ...this.GetState()._components,
                [name]: RenderCell.Conform(
                    name,
                    (t, s) => {
                        if(typeof fn === "function") {
                            if(fn.prototype.render) {
                                return fn;
                            }

                            return () => fn(t, s)
                        }
        
                        return () => fn;
                    },
                    state,
                    container
                )
            }
        });

        return this;
    }

    GetComponent(name) {
        return this.GetState()._components[name];
    }
    GetComponentElement(name) {
        let comp = this.GetComponent(name);

        if(comp) {
            return comp.element(this, this.GetState());
        }
    }
    GetComponentState(name) {
        let comp = this.GetComponent(name);

        if(comp) {
            return comp.state;
        }
    }
    GetComponentContainer(name) {
        let comp = this.GetComponent(name);

        if(comp) {
            return comp.container;
        }
    }

    static Conform(name, element, state = {}, container = null) {
        return {
            name,
            element,
            state,
            container
        };
    }
}

export default RenderCell;