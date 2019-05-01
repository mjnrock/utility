import Animus from "../lib/animus/package";

let cell = new Animus.Cellular.Cell(),
    org = new Animus.Cellular.Organelle((payload) => {
        console.log(payload.args);
    }),
    zeta = new Animus.Cellular.ZetaEnzyme("test", 1, "b", 57);

cell.Endogenize(org).Metabolize(zeta);