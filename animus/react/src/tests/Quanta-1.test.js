import Animus from "../lib/animus/package";

//  Async "FetchData" API Test
let q = new Animus.Quanta.Quantum("typeA", {
    data1: 1,
    data2: 2
}, {
    key: "fat"
});

q.FetchData("http://localhost:3087/validate").then((data) => console.log(data));