import Animus from "../lib/animus/package";

let org = new Animus.Cellular.Organelle(
    payload => console.log(0),
    [ payload => console.log(1) ],
    [ "test", payload => console.log(2) ],
    [ () => false, payload => console.log(3) ],
    [ () => true, payload => console.log(4) ],
    [   // Evaluator (if a function) will receive (Organelle, Enzyme) as its 2 parameters
        (org, enz) => {
            console.log(org, enz);

            return true;
        },
        payload => {
            console.log(payload);

            console.log(5);
        }
    ],
);
let z1 = new Animus.Cellular.ZetaEnzyme("cats");
let z2 = new Animus.Cellular.ZetaEnzyme("test");

let cell = new Animus.Cellular.Cell();
cell.Endogenize(org);

// cell.Metabolize(z1);
// cell.Metabolize(z2);

let arr = [ 1, 2, 3, 4, 5 ];
let rend = new Animus.Cellular.DOM.RenderCell("root");


rend.AddComponent("Kiszka", (t, s) => {
    let Miszka = t.GetComponentElement("Miszka"),
        handler = (e) => console.log(e);

    return (
        <div>
            Kiszka
            <Miszka _scope={ t } _state={ s } _handler={ handler }>
                <Miszka _scope={ t } _state={ s } _handler={ handler } />
                <Miszka _scope={ t } _state={ s } _handler={ handler } />
                <Miszka _scope={ t } _state={ s } _handler={ handler } />
            </Miszka>
        </div>
    )
}, {}, "root2");

rend.AddComponent("Miszka", class Miszka extends React.Component {
    render() {
        return (
            <div onClick={ this.props._handler }>
                <ul>
                    {
                        this.props._state._root.split("").map((e, i) => <li key={ i }>{ e }</li>)
                    }
                </ul>
                {
                    this.props.children
                }
            </div>
        );
    }
});

let mu = new Animus.Cellular.ZetaEnzyme("render");
rend.Metabolize(mu);

// setTimeout(() => {
//     arr = [ 9, 10, 11 ];

//     mu.Recycle();
//     rend.Metabolize(mu);
// }, 1500);

// console.log(org);
// console.log(rend);