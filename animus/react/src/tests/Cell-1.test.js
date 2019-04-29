import Animus from "./../lib/animus/package";

let c = new Animus.Cellular.Cell();

// c.Subscribe({
//     next: (payload) => console.log(payload)
// });

let beta1 = new Animus.Cellular.BetaMetabolite("print", (cell, payload) => {
    console.log("-------------");
    console.log(cell);
    console.log(payload);
    console.log("-------------");

    return payload;
}, 8, 16, 32);
let beta2 = new Animus.Cellular.BetaMetabolite("add", (cell, a, b) => {
    return a + b;
});
let gamma1 = new Animus.Cellular.GammaMetabolite("print", {
    cat: "Kiszka"
});
let gamma2 = new Animus.Cellular.GammaMetabolite("add", 5, 7);

c.Metabolize(beta1, beta2);
let a = c.Metabolize(gamma1, gamma2);
console.log(a)

console.log(c.ƒ.add(c, 5, 6));