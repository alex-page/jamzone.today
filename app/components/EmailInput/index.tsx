import Label from "../Label";

interface Props {
  label: string;
  value: string;
  rowId: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EmailInput({ label, onChange, rowId, value }: Props) {
  return (
    <>
      <Label htmlFor={rowId}>{label}</Label>
      <input
        onChange={onChange}
        className="rounded w-full px-4 py-2 text-sm input input-focus"
        type="email"
        defaultValue={value}
        id={rowId}
      />
    </>
  );
}
