import Label from "./Label";

interface Props {
  label: string;
  name: string;
  value?: string;
}

const Icon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
      clipRule="evenodd"
    />
  </svg>
);

export default function EmailInput({ label, name, value }: Props) {
  return (
    <div className="flex flex-col flex-1">
      <p className="flex gap-1 text-gray-400" title="Used for gravatar image">
        <Label htmlFor={name}>{label}</Label>
        <Icon />
      </p>
      <input
        className="w-full leading-none px-4 py-2 text-sm bg-gray-400/10 text-gray-300 border border-gray-400/20 hover:border-gray-400/40 transition-colors rounded outline-none focus:border-blue-500 placeholder:text-gray-700"
        type="email"
        id={name}
        name={name}
        defaultValue={value}
        required
        placeholder="beep@boop.dev"
        data-1p-ignore
      />
    </div>
  );
}
