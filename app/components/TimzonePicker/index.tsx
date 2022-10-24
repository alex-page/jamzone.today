import Label from "../Label";

interface Props {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rowId: string;
}

export default function TimzonePicker({ label, onChange, rowId }: Props) {
  return (
    <>
      <Label htmlFor={rowId}>{label}</Label>
      <input
        onChange={onChange}
        className="rounded w-full px-4 py-2 text-sm input input-focus"
        type="text"
        id={rowId}
      />
    </>
  );
}
