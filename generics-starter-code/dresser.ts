export type Socks = { style: string; color: string };
export type Shirt = { style: string; size: string };
export type Pants = { waist: number; length: number };

export class Drawer<T> {
  private items: T[] = [];

  public get isEmpty(): boolean {
    return this.items.length === 0;
  }

  public addItem(item: T): void {
    this.items.push(item);
  }

  public removeItem(): T | undefined {
    return this.items.pop();
  }

  public removeAll(): T[] {
    const removed = [...this.items];
    this.items = [];
    return removed;
  }
}

export class Dresser<TTop, TMiddle, TBottom> {
  public top: Drawer<TTop>;
  public middle: Drawer<TMiddle>;
  public bottom: Drawer<TBottom>;

  constructor() {
    this.top = new Drawer<TTop>();
    this.middle = new Drawer<TMiddle>();
    this.bottom = new Drawer<TBottom>();
  }
}

export function demoDresser(): void {
  const dresser = new Dresser<Socks, Shirt, Pants>();

  dresser.top.addItem({ style: "vneck", color: "black" });
  dresser.top.addItem({ style: "ankle", color: "white" });

  dresser.middle.addItem({ style: "t-shirt", size: "XL" });
  dresser.middle.addItem({ style: "button-up", size: "L" });

  dresser.bottom.addItem({ waist: 32, length: 32 });
  dresser.bottom.addItem({ waist: 30, length: 30 });

  console.log("Check top drawer", dresser.top.isEmpty);
  console.log("Remove top sock:", dresser.top.removeItem());
  console.log("Remove remaining socks:", dresser.top.removeAll());
  console.log("Is dresser top empty", dresser.top.isEmpty);

  console.log("Remove shirts:", dresser.middle.removeAll());
  console.log("Remove a pair of pants:", dresser.bottom.removeItem());
}
