import Animus from "../lib/animus/package";

let c = Animus.Utility.Color.Create(75, 0, 130),
    r = c.ToLabel();

console.log(r);

console.log(Animus.Utility.Color.FromLabel("white"));
console.log(Animus.Utility.Color.FromLabel("Dark Salmon"));
console.log(Animus.Utility.Color.FromLabel("Fat Cat"));