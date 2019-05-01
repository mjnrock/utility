import Animus from "../lib/animus/package";

let q = new Animus.Quanta.Quantum("typeA", {
    data1: 1,
    data2: 2
}, {
    key: "fat"
});

q.FetchData("http://localhost:3087/validate").then((data) => console.log(data));