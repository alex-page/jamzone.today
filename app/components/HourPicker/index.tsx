interface HourPickerProps {
  value: string;
  min: string;
  max: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function HourPicker({
  value,
  min,
  max,
  onChange,
}: HourPickerProps) {
  return (
    <input
      type="time"
      step="1800"
      defaultValue={value}
      min={min}
      max={max}
      onChange={onChange}
      className="py-2 px-1 font-mono rounded text-xs h-9 input input-focus invalid:border-red-500"
    />
  );
}
