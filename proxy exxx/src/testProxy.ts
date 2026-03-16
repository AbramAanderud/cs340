import { Array2DProxy } from "./Array2DProxy";

const proxy = new Array2DProxy("array.json");

console.log("first access should lazy load");
console.log(proxy.get(0, 0));

console.log("second access should not load again");
console.log(proxy.get(1, 1));

console.log("set a new value");
proxy.set(0, 1, 99);
console.log(proxy.get(0, 1));

console.log("change another value");
proxy.set(1, 0, 42);
console.log(proxy.get(1, 0));

console.log("make sure old values still exist");
console.log(proxy.get(0, 0));
console.log(proxy.get(1, 1));
