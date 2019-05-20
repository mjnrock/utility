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

let rend = new Animus.Cellular.DOM.RenderCell();

rend.HTMLTestVariable = 1594984984;
rend.MergeState({
    cats: 15615
});
rend.MergeState({
    // cats: 15615, //! This doesn't work, must be set in separate declaration
    test: (
        <div>
            <div>RenderCell Output!</div>
            <div>{ rend.GetState().cats }</div>
            <div>{ rend.HTMLTestVariable }</div>
        </div>
    )
});

let mu = new Animus.Cellular.ZetaEnzyme("render");

// console.log(org);
// console.log(rend);
rend.Metabolize(mu);