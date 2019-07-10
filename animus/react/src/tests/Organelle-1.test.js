import Animus from "./../lib/animus/package";

// Activation Testing
let org = new Animus.Cellular.Organelle(
    [ payload => console.log(1) ],
    [ "test", payload => console.log(2) ],
    [ () => false, payload => console.log(3) ],
    [ () => true, payload => console.log(4) ],
);
let z1 = new Animus.Cellular.ZetaEnzyme("cats");
let z2 = new Animus.Cellular.ZetaEnzyme("test");

// org.Metabolize(z1);
org.Metabolize(z2);