import { useSearchParams } from "@remix-run/react";

const maxParam = 4;
const { locale, timeZone } = Intl.DateTimeFormat().resolvedOptions();
const colors = [
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-green-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-sky-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-purple-500",
  "bg-fuchsia-500",
  "bg-pink-500",
  "bg-rose-500",
];

export const getZones = (params: string[]) => {
  const zones = [];
  for (let i = 0; i < params.length; i = i + maxParam) {
    const id = params[i];
    const tz = params[i + 1];
    const days = params[i + 2].split("-").map((i) => Number(i));
    const hours = params[i + 3].split("_").map((i) => i.split("-"));
    zones[i / maxParam] = { id, tz, days, hours };
  }

  return zones;
};

const formatZones = (zones: any[]) => {
  return zones.map((zone, i) => {
    const { id, tz, hours, days } = zone;
    const bg = colors[i % colors.length];

    // TODO: Convert hours based on timeZone and tz

    return {
      id,
      days,
      hours,
      tz,
      bg,
    };
  });
};

export default function Zones() {
  const [searchParams] = useSearchParams();
  const params = searchParams.getAll("z")[0].split(",");
  const zones = formatZones(getZones(params));

  return (
    <>
      <p>{timeZone}</p>
      <p>{locale}</p>
      <p>{JSON.stringify(zones)}</p>
    </>
  );
}
