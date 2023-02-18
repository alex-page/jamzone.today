import Label from "./Label";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Sunday",
  "Saturday",
];

interface Props {
  label: string;
  name: string;
  values: ("on" | "")[];
}

export default function DayBoxes({ label, name, values }: Props) {
  return (
    <div>
      <Label as="p">{label}</Label>
      <div className="flex gap-1 items-center h-9">
        {days.map((day, i) => (
          <label
            key={day}
            className="hover:cursor-pointer"
            title={day}
            htmlFor={`${name}-${i}`}
          >
            <input
              type="checkbox"
              className="peer sr-only"
              defaultChecked={values && values[i] === "on"}
              id={`${name}-${i}`}
              name={`${name}-${i}`}
            />

            <div className="select-none w-6 h-9 grid place-items-center text-xs font-medium rounded peer-checked:bg-blue-500 peer-focus-visible:border-blue-500 peer-checked:peer-focus-visible:border-white peer-checked:text-gray-100 text-gray-300 border border-gray-400/20 hover:border-gray-400/40 transition-colors bg-gray-800">
              <span aria-hidden="true">{day.charAt(0)}</span>
              <span className="sr-only">{day}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
