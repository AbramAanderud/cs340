import * as fs from "fs";
import { Array2D } from "./Array2D";

export class RealArray2D implements Array2D {
  private data: number[][] = [];

  constructor(rows?: number, cols?: number, fileName?: string) {
    if (fileName) {
      this.load(fileName);
    } else if (rows !== undefined && cols !== undefined) {
      for (let i = 0; i < rows; i++) {
        this.data[i] = [];
        for (let j = 0; j < cols; j++) {
          this.data[i][j] = 0;
        }
      }
    }
  }

  set(row: number, col: number, value: number): void {
    this.data[row][col] = value;
  }

  get(row: number, col: number): number {
    return this.data[row][col];
  }

  save(fileName: string): void {
    fs.writeFileSync(fileName, JSON.stringify(this.data));
  }

  load(fileName: string): void {
    const text = fs.readFileSync(fileName, "utf-8");
    this.data = JSON.parse(text);
  }
}
