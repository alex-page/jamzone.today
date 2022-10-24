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

const TimeCell = ({
  color,
  sections,
  roundClass = "",
}: {
  color: string;
  sections: string[][];
  roundClass?: string;
}) => {
  return (
    <div
      key={color}
      className={`grid grid-flow-col grid-cols-48 shadow-border shadow-gray-700 h-16 ${roundClass}`}
    >
      {sections.map(([minSection, maxSection], i) => (
        <div
          key={i}
          className={`${color} shadow-inner rounded ${minSection} ${maxSection}`}
        ></div>
      ))}
    </div>
  );
};

export default function ZoneTable() {
  const time = useTime();
  const { locale, timeZone } = Intl.DateTimeFormat().resolvedOptions();

  return (
    <div className="grid font-mono font-light text-xs">
      <div>
        <p className="ml-2">
          {time.toTimeString().split(" ")[0]} [{timeZone}]
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
        </div>
        <div className="grid">
          <TimeCell
            color={colors[0]}
            sections={[
              ["col-start-2", "col-end-10"],
              ["col-start-12", "col-end-23"],
            ]}
          />
          <TimeCell
            color={colors[1]}
            sections={[
              ["col-start-4", "col-end-13"],
              ["col-start-15", "col-end-29"],
            ]}
          />
          <TimeCell
            color={colors[2]}
            sections={[
              ["col-start-4", "col-end-13"],
              ["col-start-17", "col-end-27"],
            ]}
          />
          <TimeCell
            color={colors[3]}
            sections={[
              ["col-start-4", "col-end-13"],
              ["col-start-17", "col-end-27"],
            ]}
          />
          <TimeCell
            color={colors[4]}
            sections={[
              ["col-start-15", "col-end-23"],
              ["col-start-25", "col-end-35"],
            ]}
          />
          <TimeCell
            color={colors[5]}
            sections={[
              ["col-start-20", "col-end-30"],
              ["col-start-32", "col-end-40"],
            ]}
          />
          <TimeCell
            color={colors[6]}
            sections={[
              ["col-start-20", "col-end-30"],
              ["col-start-32", "col-end-40"],
            ]}
          />
          <TimeCell
            color={colors[7]}
            sections={[
              ["col-start-29", "col-end-39"],
              ["col-start-41", "col-end-49"],
            ]}
          />
          <TimeCell
            color={colors[8]}
            roundClass="rounded-bl-lg rounded-br-lg"
            sections={[
              ["col-start-43", "col-end-49"],
              ["col-start-1", "col-end-3"],
              ["col-start-5", "col-end-16"],
            ]}
          />
        </div>
      </div>
    </div>
  );
}
