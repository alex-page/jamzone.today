import md5 from "md5";
import { useEffect, useState } from "react";
import type { ZoneRow } from "~/types";
import { getTzDay, getTzHour, hours, timeChunks } from "~/utils";

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

function useTime(): Date | null {
  const [time, setTime] = useState<Date | null>(null);
  useEffect(() => {
    setTime(() => new Date());
    const id = setInterval(() => setTime(() => new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

interface Props {
  zones: ZoneRow[];
}

export default function ZoneTable({ zones }: Props) {
  const time = useTime();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (!time) return <></>;

  return (
    <div className="font-mono font-light text-xs">
      <div className="grid gap-1">
        <div className="flex">
          <div className="sticky flex left-0 h-full w-40 -ml-8 pl-8 bg-gray-900"></div>
          {hours.map((hour) => (
            <div className="w-[calc(100%/24)] mr-1 text-[10px]" key={hour}>
              {hour}
            </div>
          ))}
        </div>
        {zones.map((zone, zid) => (
          <div className="flex gap-px" key={zone.id}>
            <div className="w-40 py-2 flex gap-2 sticky z-10 left-0 -ml-8 pl-8 bg-gray-900">
              <img
                alt=""
                title={zone.id}
                className="w-6 h-6 rounded"
                src={`https://gravatar.com/avatar/${md5(zone.id)}`}
              />
              <div className="leading-3 text-[10px]">
                <p>{getTzHour(time, zone.tz)}</p>
                <p className="text-gray-500">{zone.tz.split("/")[1]}</p>
              </div>
            </div>
            {timeChunks.map((tChunk) => (
              <div
                key={`${zid}-${tChunk}`}
                className={`${
                  zone.times.includes(tChunk) &&
                  zone.days.includes(getTzDay(time, zone.tz))
                    ? colors[zid % colors.length]
                    : "bg-white/10"
                } w-[calc(100%/96)]`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
