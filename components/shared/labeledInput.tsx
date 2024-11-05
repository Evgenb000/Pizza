import { Asterisk } from "lucide-react";
import { Input } from "../ui/input";

type LabeledInputProps = {
  label: string;
  placeholder: string;
  type: string;
  required?: boolean;
};

export const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  placeholder,
  type,
  required = false,
}) => (
  <label className="flex flex-col relative">
    <span className="text-sm w-fit font-medium text-muted-foreground relative">
      {label}
      {required && (
        <Asterisk size={12} className="text-red-500 absolute top-0 -right-3" />
      )}
    </span>
    <Input type={type} placeholder={placeholder} className="mt-1" />
  </label>
);
