// 1. What is the biggest design principle violation in the code below.
// Probably the SRP violation as the function does parsing and validation of the times all in one function.
// This makes it harder to test and maintain as changes to one responsibility may affect the other responsibilities.

// 2. Refactor the code to improve its design.

type Dictionary = { [index: string]: string };

export type Times = {
  interval: number;
  duration: number;
  departure: number;
};

enum TimeKey {
  Interval = "interval",
  Duration = "duration",
  Departure = "departure",
}

function requireValue(props: Dictionary, key: TimeKey): string {
  const value = props[key];
  if (!value) throw new Error(`missing ${key}`);
  return value;
}

function parsePositiveInt(raw: string, fieldName: string): number {
  const value = parseInt(raw, 10);
  if (Number.isNaN(value)) throw new Error(`${fieldName} must be a number`);
  if (value <= 0) throw new Error(`${fieldName} must be > 0`);
  return value;
}

function requireMultipleOf(
  value: number,
  interval: number,
  fieldName: string,
): void {
  if (value % interval !== 0) {
    throw new Error(`${fieldName} % interval != 0`);
  }
}

export function getTimes(props: Dictionary): Times {
  const interval = parsePositiveInt(
    requireValue(props, TimeKey.Interval),
    "interval",
  );

  const duration = parsePositiveInt(
    requireValue(props, TimeKey.Duration),
    "duration",
  );
  requireMultipleOf(duration, interval, "duration");

  const departure = parsePositiveInt(
    requireValue(props, TimeKey.Departure),
    "departure",
  );
  requireMultipleOf(departure, interval, "departure");

  return { interval, duration, departure };
}
