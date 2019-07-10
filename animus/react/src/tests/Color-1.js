import Animus from "../lib/animus/package";

let c = Animus.Utility.Color.Create(75, 0, 130),
    r = c.PrintLabel();

console.log(r);

let t = Animus.Utility.Color.Create(230, 230, 230);

console.log(t.PrintLabel());
console.log(t.PrintLabel(true, 0.05));