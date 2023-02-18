import Label from "./Label";

interface Props {
  label: string;
  name: string;
  value?: string;
}

export default function EmailInput({ label, name, value }: Props) {
  return (
    <div className="flex flex-col flex-1">
      <Label htmlFor={name}>{label}</Label>
      <input
        className="w-full leading-none px-4 py-2 text-sm bg-gray-400/10 text-gray-300 border border-gray-400/20 hover:border-gray-400/40 transition-colors rounded outline-none focus:border-blue-500 placeholder:text-gray-700"
        type="email"
        id={name}
        name={name}
        defaultValue={value}
        required
        placeholder="beep@boop.dev"
      />
    </div>
  );
}
