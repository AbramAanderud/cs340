import { Observer
 } from "./Observer";   
import { Flight } from "./entity/Flight";

function cleanCallsign(callsign: string): string {
    return (callsign ?? "").trim().toUpperCase() || "(NO CALLSIGN)";
}


export class StatusObserver implements Observer {
    update(flight: Flight): void {
        console.log(" __Flight Status Update__");
        console.log(`icao24: ${flight.icao24}`);
        console.log(`callsign: ${cleanCallsign(flight.callsign)}`);
        console.log(`origin_country: ${flight.origin_country}`);
        console.log(`longitude: ${flight.longitude}`);
        console.log(`latitude: ${flight.latitude}`);
        console.log(`velocity: ${flight.velocity}`);
        console.log(`altitude (geo_altitude): ${flight.geo_altitude}`);
        console.log("________________");
    }
}