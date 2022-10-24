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
  isChecked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rowId: string;
  boxId: number;
}

export default function DayPicker({
  isChecked,
  onChange,
  rowId,
  boxId,
}: Props) {
  const day = days[boxId];

  return (
    <label className="hover:cursor-pointer" title={day} htmlFor={rowId}>
      <input
        type="checkbox"
        className="peer sr-only"
        defaultChecked={isChecked}
        onChange={onChange}
        id={rowId}
      />
      <div className="grid place-items-center w-8 h-8 text-xs font-bold rounded-full peer-checked:bg-blue-500 peer-checked:text-gray-100 input checkbox-focus">
        <span aria-hidden="true">{day.charAt(0)}</span>
        <span className="sr-only">{day}</span>
      </div>
    </label>
  );
}
