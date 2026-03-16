import { Array2D } from "./Array2D";
import { RealArray2D } from "./RealArray2D";

export class Array2DProxy implements Array2D {
  private realArray: RealArray2D | null = null;

  constructor(private fileName: string) {}

  set(row: number, col: number, value: number): void {
    if (this.realArray === null) {
      console.log("Loading array from file");
      this.realArray = new RealArray2D(undefined, undefined, this.fileName);
    }
    this.realArray.set(row, col, value);
  }

  get(row: number, col: number): number {
    if (this.realArray === null) {
      console.log("Loading array from file");
      this.realArray = new RealArray2D(undefined, undefined, this.fileName);
    }
    return this.realArray.get(row, col);
  }
}
