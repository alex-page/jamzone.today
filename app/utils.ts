import type { Zone } from "./types";

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

export function getTzOffset(timeZone: string) {
  const formatter = new Intl.DateTimeFormat([], {
    timeZoneName: "shortOffset",
    timeZone,
  });
  return Number(formatter.format(new Date()).split("GMT")[1]);
}

export function getLocalTime(time: string, tz: string, localTz: string) {
  const [h, m] = time.split(":");
  const offset = getTzOffset(tz) - getTzOffset(localTz);

  const hour = (Number(h) - offset) % 24;

  return `${hour <= 9 ? `0${hour}` : hour}:${m}`;
}
