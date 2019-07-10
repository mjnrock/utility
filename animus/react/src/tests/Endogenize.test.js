import Animus from "../lib/animus/package";

//? Basic Test
let cell = new Animus.Cellular.Cell(),
    org = new Animus.Cellular.Organelle((payload) => {
        console.log(payload.args);
    }),
    zeta = new Animus.Cellular.ZetaEnzyme("test", 1, "b", 57);

cell.Endogenize(org).Metabolize(zeta);



//? Multi Test
//* 
let cell = new Animus.Cellular.Cell(),
    org1 = new Animus.Cellular.Organelle(Animus.Cellular.Organelle.EnumProcessType.FEED,
        (payload) => {
            return payload;
        },
        (payload) => {
            if(payload.flag === "test") {
                console.log("TEST", payload.args);
            }
        }
    ),
    org2 = new Animus.Cellular.Organelle(
        (payload) => {
            if(payload.flag === "cat") {
                console.log("CAT", payload.args);
            }
        }
    ),
    z1 = new Animus.Cellular.ZetaEnzyme("test", 1, "b", 57),
    z2 = new Animus.Cellular.ZetaEnzyme("cat", 999, 888);

cell.Endogenize(org1, org2).Metabolize(z1, z2);

console.log(cell);