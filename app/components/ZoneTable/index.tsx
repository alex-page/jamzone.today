import md5 from "md5";
import type { ZoneRow } from "~/types";
import { getTzHour } from "~/utils";

const colors = [
  "bg-rose-500",
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
];

const hours = Array.from(Array(24), (_, i) => `${i < 10 ? `0${i}` : i}:00`);
const timeChunks = hours.flatMap((h) => [
  h,
  h.replace(":00", ":15"),
  h.replace(":00", ":30"),
  h.replace(":00", ":30"),
]);

interface Props {
  zones: ZoneRow[];
  time: Date;
}

export default function ZoneTable({ zones, time }: Props) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className="font-mono font-light text-xs">
      <div className="grid gap-2">
        <div className="flex gap-px text-gray-500">
          <div className="w-36 sm:w-40 -ml-2 sm:-ml-8 pl-2 sm:pl-8"></div>
          <p className="sticky left:36 sm:left-40 w-56">
            {timeZone.split("/")[1]} [{getTzHour(time, timeZone)}]
          </p>
        </div>
        <div className="flex">
          <div className="sticky flex left-0 h-full w-36 sm:w-40 -ml-2 sm:-ml-8 pl-2 sm:pl-8 bg-gray-900"></div>
          {hours.map((hour) => (
            <div className="w-12 mr-1" key={hour}>
              {hour}
            </div>
          ))}
        </div>
        {zones.map((zone, zid) => (
          <div className="flex gap-px" key={zone.id}>
            <div className="w-36 sm:w-40 flex gap-2 sticky z-10 left-0 -ml-2 sm:-ml-8 pl-2 sm:pl-8 py-2 bg-gray-900">
              <img
                alt=""
                title={zone.id}
                className="w-8 h-8 rounded-full"
                src={`https://gravatar.com/avatar/${md5(zone.id)}`}
              />
              <div>
                <p>{zone.tz.split("/")[1]}</p>
                <p>{getTzHour(time, zone.tz)}</p>
              </div>
            </div>
            {timeChunks.map((tChunk) => (
              <div
                key={`${zid}-${tChunk}`}
                className={`${
                  zone.times.includes(tChunk) ? colors[zid] : "bg-white/10"
                } w-3`}
              />
            ))}
          </div>
        ))}
      </div>
      <pre>{JSON.stringify(zones, null, 2)}</pre>
    </div>
  );
}
