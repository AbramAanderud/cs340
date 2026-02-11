import { Observer } from "./Observer";
import { Flight } from "./entity/Flight";

function fmtDelta(value: number): string {
    return value >= 0 ? `+${value}` : `${value}`;
}

export class DeltaObserver implements Observer {
    private lastFlightData: Map<string, Flight> = new Map();

    update(curr: Flight): void {
        if (!this.lastFlightData.has(curr.icao24)) {
            this.lastFlightData.set(curr.icao24, curr);
            console.log(`Initial data for flight ${curr.callsign} recorded.`);
            return;
        }

        const dLong = fmtDelta(curr.longitude - this.lastFlightData.get(curr.icao24)!.longitude);
        const dLat = fmtDelta(curr.latitude - this.lastFlightData.get(curr.icao24)!.latitude);
        const dAlt = fmtDelta(curr.baro_altitude - this.lastFlightData.get(curr.icao24)!.baro_altitude);
        const dVel = fmtDelta(curr.velocity - this.lastFlightData.get(curr.icao24)!.velocity);

        console.log(`Delta for flight ${curr.callsign}:`);
        console.log(`  Longitude change: ${dLong}`);
        console.log(`  Latitude change: ${dLat}`);
        console.log(`  Altitude change: ${dAlt}`);
        console.log(`  Velocity change: ${dVel}`);

        this.lastFlightData.set(curr.icao24, curr);
    }
}