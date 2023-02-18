import type { Zone } from "./types";

export const hours = Array.from(
  Array(24),
  (_, i) => `${i < 10 ? `0${i}` : i}:00`
);

export const timeChunks = hours.flatMap((h) => [
  h,
  h.replace(":00", ":15"),
  h.replace(":00", ":30"),
  h.replace(":00", ":45"),
]);

export function zoneArrayToParams(zones: Zone[]) {
  const paramObject = {};
  zones.flatMap((zone, i) => {
    for (const [key, value] of Object.entries(zone)) {
      paramObject[`${i}-${key}`] = value;
    }
  });

  return new URLSearchParams(paramObject).toString();
}

export function paramsToZoneArray(params: URLSearchParams) {
  const zones: Zone[] = [];

  for (const [key, value] of params.entries()) {
    const [idString, keyName, childIdString] = key.split("-");

    const id = idString ? Number(idString) : undefined;
    const childId = childIdString ? Number(childIdString) : undefined;

    if (id === undefined) throw new Error("Invalid params");

    zones[id] = zones[id] || {};
    let zoneKey = childId === undefined ? keyName : `${keyName}${childId}`;
    zones[id][zoneKey] = value;
  }

  return zones;
}

export function getTzHour(time: Date, timeZone: string) {
  const formatter = new Intl.DateTimeFormat([], {
    timeZone,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  return formatter.format(time);
}

export function getTzDay(time: Date, timeZone: string) {
  const formatter = new Intl.DateTimeFormat([], {
    timeZone,
    weekday: "short",
  });

  return formatter.format(time);
}

function getTzOffset(timeZone: string) {
  const formatter = new Intl.DateTimeFormat([], {
    timeZoneName: "shortOffset",
    timeZone,
  });
  return Number(formatter.format(new Date()).split("GMT")[1]);
}

function getLocalTime(time: string, tz: string, localTz: string) {
  const [h, m] = time.split(":");
  const offset = getTzOffset(tz) - getTzOffset(localTz);

  const hour = (Number(h) - offset) % 24;

  return [`${hour <= 9 ? `0${hour}` : hour}:${m}`];
}

export function getTimes(providedTimes: string[], tz: string, localTz: string) {
  const times = providedTimes.flatMap((time) =>
    getLocalTime(time, tz, localTz)
  );

  const availableTimes = timeChunks.filter((tc) => {
    if (
      (times[0] <= tc && tc < times[1]) ||
      (times[2] <= tc && tc < times[3])
    ) {
      return true;
    }

    if (
      (times[1] < times[0] && (tc < times[1] || tc >= times[0])) ||
      (times[3] < times[2] && (tc < times[3] || tc >= times[2]))
    ) {
      return true;
    }

    return false;
  });

  return availableTimes;
}
