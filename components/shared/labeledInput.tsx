import { Input } from "../ui/input";

type LabeledInputProps = {
  label: string;
  placeholder: string;
  type: string;
};

export const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  placeholder,
  type,
}) => (
  <label className="flex flex-col">
    <span className="text-sm font-medium text-muted-foreground">{label}</span>
    <Input type={type} placeholder={placeholder} className="mt-1" />
  </label>
);