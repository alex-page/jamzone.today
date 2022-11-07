import type { Zone } from "./types";

export function zoneArrayToParams(zones: Zone[]) {
  const paramObject = {};
  zones.flatMap((zone, i) => {
    Object.entries(zone).map(([key, value]) => {
      paramObject[`${i}-${key}`] = value;
    });
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

// for (const [key, value] of params.entries()) {
//   const [keyName, idString, childIdString] = key
//     .split("[")
//     .map((a) => a.replace("]", ""));

//   if (id === undefined) throw new Error("Invalid params");

//   zones[id] = zones[id] || {};
//   if (childId !== undefined) {
//     if (keyName === "d") {
//       zones[id][keyName] = zones[id][keyName] || new Array(7).fill(0);
//       zones[id][keyName][childId] = value === "on" ? 1 : 0;
//     }
//     if (keyName === "h") {
//       zones[id][keyName] = zones[id][keyName] || [];
//       zones[id][keyName][childId] = zones[id][keyName][childId] || [];
//       zones[id][keyName][childId].push(value);
//     }
//   } else {
//     zones[id][keyName] = value;
//   }
// }
