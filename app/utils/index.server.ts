import type { Zone } from "../types";

const mockDayHours = {
  d0: "on",
  d1: "on",
  d2: "on",
  d3: "on",
  d4: "on",
  d5: "on",
  d6: "on",
  h0: "09:00",
  h1: "12:00",
  h2: "13:00",
  h3: "17:00",
};

export const mockParams = zoneArrayToParams([
  {
    id: "a",
    e: "marten.bjork@shopify.com",
    c: "Malmö, SWE",
    ...mockDayHours,
  },
  {
    id: "b",
    e: "liz.khoo@shopify.com",
    c: "Berlin, DEU",
    ...mockDayHours,
  },
  {
    id: "c",
    e: "raquel.breternitz@shopify.com",
    c: "Lisbon, PRT",
    ...mockDayHours,
  },
  {
    id: "d",
    e: "thomas.jonkajtys@shopify.com",
    c: "Montréal, CAN",
    ...mockDayHours,
  },
  {
    id: "e",
    e: "sam.rose@shopify.com",
    c: "Charlotte, USA",
    ...mockDayHours,
  },
  {
    id: "f",
    e: "johan.stromqvist@shopify.com",
    c: "Vancouver, CAN",
    ...mockDayHours,
  },
  {
    id: "g",
    e: "aaron.casanova@shopify.com",
    c: "Los Angeles, USA",
    ...mockDayHours,
  },
  {
    id: "h",
    e: "alex.page@shopify.com",
    c: "Canberra, AUS",
    ...mockDayHours,
  },
  {
    id: "i",
    e: "dominik.wilkowski@shopify.com",
    c: "Brisbane, AUS",
    ...mockDayHours,
  },
]);

export function zoneArrayToParams(zones: Zone[]) {
  const paramObject: any = {};
  zones.forEach((zone, i) => {
    for (const [key, value] of Object.entries(zone)) {
      paramObject[`${i}-${key}`] = value;
    }
  });

  return new URLSearchParams(paramObject);
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
