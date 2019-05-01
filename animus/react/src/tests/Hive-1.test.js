import Animus from "./../lib/animus/package";

let beacon = new Animus.Hive.Beacon(),
    cell = new Animus.Cellular.Cell(),
    cell2 = new Animus.Cellular.Cell();

beacon.SubscribeTo(cell, cell2);

let beta = new Animus.Cellular.BetaEnzyme("add", (cell, a, b) => {
    return a + b;
});
cell.Metabolize(beta);
cell.Teach("add", cell2);
cell2.ƒ.add(cell2, 15, 96);