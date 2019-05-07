import Animus from "../lib/animus/package";

let t = new Animus.Quanta.QCollection("root"),
    t0 = new Animus.Quanta.QString("r.0", "cats");
t.Add(t0);
t.Add(new Animus.Quanta.QString("r.1", "dogs"));
t.Add(new Animus.Quanta.QNumeric("r.2", 56));

let c = new Animus.Quanta.QCollection("child");
t.Add(c);
c.Add(new Animus.Quanta.QString("label a", "skrwlz"));
c.Add(new Animus.Quanta.QNumeric("label b", 5.2));
c.Add(new Animus.Quanta.QNumeric("36.1235"));

t.Remove(c);

console.log(t);
console.log(t.Has(t0.GetKey()));
console.log(t.Has(t0.GetKey(), Animus.Quanta.Quantum.EnumAttributeType.KEY));
console.log(t.Has(t0.GetID(), Animus.Quanta.Quantum.EnumAttributeType.ID));
console.log(t.Has("fish"));