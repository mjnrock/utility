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

let fts = Animus.Utility.Transformer.FlattenTagStructure(t);
console.log(fts);
let th = Animus.Utility.Transformer.ToHierarchy(t);
console.log(th);
let fh = Animus.Utility.Transformer.FromHierarchy(th);
console.log(fh);

let ts = Animus.Utility.Transformer.ToSchema(t);
console.log(ts);