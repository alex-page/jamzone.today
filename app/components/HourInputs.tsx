import Label from "./Label";

interface Props {
  name: string;
  label: string;
  values: string[];
}

export default function HourInputs({ name, label, values }: Props) {
  return (
    <div>
      <Label as="p">{label}</Label>
      <div className="flex gap-1">
        {values.map((value, i) => (
          <input
            key={i}
            type="time"
            step="900"
            defaultValue={value}
            name={`${name}-${i}`}
            min="00:00"
            max="23:45"
            required
            className="[&:nth-child(even)]:mr-1 py-2 px-1 font-mono rounded text-xs h-9 bg-slate-400/10 text-slate-300 border border-gray-400/20 hover:border-gray-400/40 transition-colors outline-none focus:border-blue-500"
          />
        ))}
      </div>
    </div>
  );
}
