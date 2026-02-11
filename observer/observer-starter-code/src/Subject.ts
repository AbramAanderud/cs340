import { Observer } from "./Observer";
import { Flight } from "./entity/Flight";

export class Subject {
    private observers: Observer[] = [];

    public attach(observer: Observer): void {
        this.observers.push(observer);
    }

    public detatch(observer: Observer): void {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }

    }

    public notify(flight: Flight): void {
        for (const observer of this.observers) {
            observer.update(flight);
        }
    }
}