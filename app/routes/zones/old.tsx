import md5 from "md5";
import { useState, useEffect } from "react";
import App from "~/components/App";



const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const getTime = (timezone: string, locale: string) => {
  const formatter = new Intl.DateTimeFormat(locale, {
    timeZone: timezone,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    weekday: "long",
    hour12: false,
    timeZoneName: "shortOffset",
  });

  const [day, time, zone] = formatter.format().split(" ");

  return [day.replace(",", ""), time, zone];
};

interface Person {
  id: string;
  days?: number[];
  workingHours: number[][];
  timezone: string;
  gmtZone: string;
  bgColor: string;
}

const hours = Array.from(Array(24).keys());
const halfHours = hours.flatMap((h) => [h, h + 0.5]);

const getLocalHour = (hour: number, timezoneOffset: number) => {
  return (hour - timezoneOffset) % 24 < 0
    ? ((hour - timezoneOffset) % 24) + 24
    : (hour - timezoneOffset) % 24;
};

const isWorkingHour = (
  workingHours: number[][],
  currentTime: number,
  timezoneOffset: number
) => {
  let isWorking = false;

  workingHours.forEach(([min, max]) => {
    const minLocal = getLocalHour(min, timezoneOffset);
    const maxLocal = getLocalHour(max, timezoneOffset);

    if (minLocal > maxLocal) {
      if (currentTime < maxLocal || currentTime >= minLocal) {
        isWorking = true;
      }
    } else if (currentTime >= minLocal && currentTime < maxLocal) {
      isWorking = true;
    }
  });

  return isWorking;
};

const isWorkingDay = (day: string, workingDays: number[]) => {
  const dayIndex = days.indexOf(day);
  return workingDays[dayIndex] === 1;
};

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

const getTimeDecimal = (time) => {
  return time.getHours() + (time.getMinutes() >= 30 ? 0.5 : 0);
};

interface RowProps {
  person: Person;
  timezone: number;
  locale: string;
  time: Date;
}

function Row({ person, timezone, locale, time }: RowProps) {
  const [day, personTime] = getTime(person.timezone, locale);
  const isWorkingToday = isWorkingDay(day, person.days);
  const timezoneOffset = Number(person.gmtZone.split("GMT")[1]) + timezone;
  const timeDecimal = getTimeDecimal(time);

  return (
    <tr className={isWorkingToday ? undefined : "opacity-20"}>
      <td className="border border-zinc-800">
        <div className="flex gap-2 items-center m-1">
          <img
            className="flex-none rounded-full w-8 h-8"
            title={person.id}
            src={`https://gravatar.com/avatar/${md5(person.id)}`}
            alt={`A gravatar of ${person.id}`}
          />
          <div className="text-xs">
            <p>{day}</p>
            <p>{personTime}</p>
            <p>{person.gmtZone}</p>
          </div>
        </div>
      </td>
      {halfHours.map((halfHour, i) =>
        isWorkingToday ? (
          <td
            className={`border border-zinc-800 ${
              isWorkingHour(person.workingHours, halfHour, timezoneOffset)
                ? person.bgColor
                : null
            } ${halfHour === timeDecimal ? undefined : "opacity-50"}`}
            key={i}
          >
            <div></div>
          </td>
        ) : (
          <td className="border border-zinc-800"></td>
        )
      )}
    </tr>
  );
}

export default function Zones() {
  const time = useTime();
  const localeTimezone = time.getTimezoneOffset() / 60;
  const gmtZone = getTime(timeZone, locale)[2];

  return (
    <App>
      <table className="w-full font-mono">
        <thead className="font-light">
          <tr>
            <th className="text-xs font-light text-left p-1">
              {time.toTimeString().split(" ")[0]} {gmtZone}
              <br />[{timeZone}]
            </th>
            {hours.map((hour, i) => (
              <th
                colSpan={2}
                className="font-light text-xs border border-zinc-800"
                key={i}
              >
                <p className="my-2">{hour <= 9 ? `0${hour}` : hour}:00</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((person, i) => (
            <Row
              person={person}
              timezone={localeTimezone}
              locale={locale}
              time={time}
              key={i}
            />
          ))}
        </tbody>
      </table>
    </App>
  );
}
