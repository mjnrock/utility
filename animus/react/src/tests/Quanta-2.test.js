import Animus from "../lib/animus/package";

//  Tag "Add" and "Remove"
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

//*  EXPECT: tag, <true>, <true>, <true>, <false>
console.log(t);
console.log(t.Has(t0.GetKey()));
console.log(t.Has(t0.GetKey(), Animus.Quanta.Quantum.EnumAttributeType.KEY));
console.log(t.Has(t0.GetId(), Animus.Quanta.Quantum.EnumAttributeType.ID));
console.log(t.Has("fish"));



//  Tag "Find"
let t = new Animus.Quanta.QCollection("root"),
    t0 = new Animus.Quanta.QString("r.0", "cats");
t.Add(t0);
t.Add(new Animus.Quanta.QString("r.1", "dogs"));
t.Add(new Animus.Quanta.QNumeric("r.2", 56));

let f = t.Find("r.2", Animus.Quanta.Quantum.EnumAttributeType.KEY);
let g = t.Find("dogs", Animus.Quanta.Quantum.EnumAttributeType.VALUE);
let h = t.Find("dogs", 999);

//*  EXPECT: tag, tag, <error>
console.log(f);
console.log(g);
console.log(h);




//  "Content Type" and Transformer
let t = new Animus.Quanta.QCollection("root"),
    t0 = new Animus.Quanta.QString("r.0", "cats");
t.Add(t0);
t.Add(new Animus.Quanta.QString("r.1", "dogs"));
t.Add(new Animus.Quanta.QNumeric("r.2", 56));

let c = new Animus.Quanta.QCollection("child");
t.Add(c);
c.MakeTyped(Animus.Quanta.Quantum.EnumType.NUMERIC);
c.Add(new Animus.Quanta.QNumeric("label a", "9"));
c.Add(new Animus.Quanta.QNumeric("label b", 5.2));
c.Add(new Animus.Quanta.QNumeric("36.1235"));
c.Add(new Animus.Quanta.QString("fish"));

let td = Animus.Quanta.Transformer.ToDelimited(t);
console.log(td);