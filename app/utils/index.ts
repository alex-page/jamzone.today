import { lookupViaCity } from "city-timezones";

import type { Zone } from "../types";

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
    timeZoneName: "short",
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

function getTimes(providedTimes: string[], tz: string, localTz: string) {
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

export function localizeZones(zones: Zone[], localTz: string) {
  return zones.map((z) => {
    const days = [
      ...(z.d0 === "on" ? ["Mon"] : []),
      ...(z.d1 === "on" ? ["Tue"] : []),
      ...(z.d2 === "on" ? ["Wed"] : []),
      ...(z.d3 === "on" ? ["Thu"] : []),
      ...(z.d4 === "on" ? ["Fri"] : []),
      ...(z.d5 === "on" ? ["Sat"] : []),
      ...(z.d6 === "on" ? ["Sun"] : []),
    ];

    const [city, iso3] = z.c.split(", ");
    const cityData = lookupViaCity(city).filter((c) => c.iso3 === iso3)[0];
    const tz = cityData ? cityData.timezone : "";

    return {
      id: z.id,
      e: z.e,
      c: z.c,
      tz,
      days,
      times: getTimes([z.h0, z.h1, z.h2, z.h3], tz, localTz),
    };
  });
}
