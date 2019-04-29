import Animus from "./../lib/animus/package";

// Subscription Test
let o = new Animus.Cellular.Organelle(Animus.Cellular.Organelle.EnumProcessType.FEED,
    (payload) => {
        if(Array.isArray(payload)) {
            return payload.reduce((a, c, i) => a + c);
        }
    },
    (payload) => {
        return payload * 5;
    }
);
let org = new Animus.Cellular.Organelle(
    (payload) => {
        console.log(payload);
    }
);

o._id = "o";
org._id = "org";

o.Subscribe(org);
o.Metabolize([ 5, 5, 3 ]);