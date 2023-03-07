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
  if (!time) return <></>;

  const currentTime = time.toTimeString().split(" ")[0];
  const timePercentage =
    (((time.getHours() * 60 + time.getMinutes()) / (24 * 60)) * 100).toFixed(
      2
    ) + "%";

  return (
    <div className="font-mono font-light text-xs">
      <div className="grid gap-1">
        <div className="flex">
          <div className="w-40"></div>
          {hours.map((hour) => (
            <div className="w-[calc(100%/24)] mr-1 text-[10px]" key={hour}>
              {hour}
            </div>
          ))}
        </div>
        <div className="relative grid gap-2">
          <div className="absolute left-32 top-0 bottom-0 right-0">
            <div
              className="absolute top-0 bottom-0 bg-rose-500 w-px z-20 outline outline-2 outline-gray-900"
              style={{ left: timePercentage }}
            ></div>
            <div
              className="absolute bottom-full -translate-y-1 -translate-x-2/4 text-[10px] px-1 text-white bg-rose-500  z-20 outline outline-2 outline-gray-900"
              style={{ left: timePercentage }}
            >
              {currentTime}
            </div>
          </div>
          {zones.map((zone, zid) => (
            <div
              className={`flex gap-px${
                zone.days.includes(getTzDay(time, zone.tz)) ? "" : " opacity-20"
              }`}
              key={zid}
            >
              <div className="w-40 py-2 sticky z-10 left-0 bg-gray-900 flex gap-2">
                <div className="w-6 h-6 rounded overflow-hidden bg-white/20">
                  <img
                    alt=""
                    src={`https://gravatar.com/avatar/${md5(zone.e)}`}
                  />
                </div>
                <div className="leading-3 text-[10px] w-24">
                  <p>
                    {getTzDay(time, zone.tz)} {getTzHour(time, zone.tz)}
                  </p>
                  <p className="text-gray-500 truncate">{zone.c}</p>
                </div>
              </div>
              {timeChunks.map((tChunk, i) => (
                <div
                  key={`${zid}-${tChunk}`}
                  className={`${
                    zone.times.includes(tChunk) &&
                    zone.days.includes(getTzDay(time, zone.tz))
                      ? colors[zid % colors.length] + " "
                      : "bg-white/10 "
                  }${i === 0 ? "rounded-l-lg " : ""}${
                    i === timeChunks.length - 1 ? "rounded-r-lg " : ""
                  }w-[calc(100%/96)]`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
