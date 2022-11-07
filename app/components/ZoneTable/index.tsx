import md5 from "md5";
import { useState, useEffect } from "react";

const hours = Array.from(Array(24).keys());

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

function useTime() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const TitleCell = ({
  roundClass = "",
  children,
}: {
  roundClass?: string | undefined | false;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`grid place-items-center p-2 shadow-border shadow-gray-700 ${roundClass}`}
    >
      {children}
    </div>
  );
};

const ZoneTableRow = ({ zone }) => {
  return (
    <div className="h-16">
      {zone.hours.map(([minClass, maxClass]: string[], i: number) => (
        <div
          key={i}
          className={`${zone.bg} rounded col-span-6 col-start-1 row-start-1`}
        ></div>
      ))}
    </div>
  );
};

export default function ZoneTable({ zones, localTimezone, locale }) {
  const time = useTime();

  return (
    <div className="grid font-mono font-light text-xs pt-6 px-6">
      <div>
        <p className="ml-2">
          {time.toTimeString().split(" ")[0]} [{localTimezone}]
        </p>
        <div className="grid grid-flow-col gap-px mt-2">
          {hours.map((hour, i) => (
            <TitleCell
              key={i}
              roundClass={
                (i === 0 && "rounded-tl-lg") || (i === 23 && "rounded-tr-lg")
              }
            >
              {hour <= 9 ? `0${hour}` : hour}:00
            </TitleCell>
          ))}

          {zones.map((zone, i) => (
            <>
              <div className="w-44 p-1 text-xs flex gap-2 items-center bg-orange-500/20">
                <img
                  className="flex-none rounded-full w-8 h-8"
                  title={zone.id}
                  src={`https://gravatar.com/avatar/${md5(zone.id)}`}
                  alt={`A gravatar of ${zone.id}`}
                />
                <div className="text-xs">
                  <p className="w-32 text-ellipsis overflow-hidden">
                    {zone.id}
                  </p>
                  <p>{zone.time}</p>
                </div>
              </div>
              <ZoneTableRow key={i} zone={zone} locale={locale} />
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
