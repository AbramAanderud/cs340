import { FlightFeed } from "./FlightFeed";
import { StatusObserver } from "./StatusObserver";
import { DeltaObserver } from "./DeltaObserver";

main();

async function main() {
  const feed = new FlightFeed();

  feed.attach(new StatusObserver());
  feed.attach(new DeltaObserver());

  await feed.start();
}
