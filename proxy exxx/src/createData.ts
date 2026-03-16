import { RealArray2D } from "./RealArray2D";

const arr = new RealArray2D(2, 2);

arr.set(0, 0, 1);
arr.set(0, 1, 2);
arr.set(1, 0, 3);
arr.set(1, 1, 4);

arr.save("array.json");

console.log("Saved array.json");
