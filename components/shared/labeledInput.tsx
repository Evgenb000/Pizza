import { Asterisk, CircleAlert, X } from "lucide-react";
import { Input } from "../ui/input";
import React from "react";
import { useFormContext } from "react-hook-form";

interface LabeledInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  type: string;
  isInvalid?: boolean;
  isEmpty?: boolean;
}

export const LabeledInput: React.FC<LabeledInputProps> = ({
  name,
  label,
  placeholder,
  type,
  required = false,
  isInvalid = false,
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  return (
    <label className="flex flex-col relative" {...register(name)}>
      <span className="text-sm w-fit font-medium text-muted-foreground relative">
        {label}
        {required && (
          <Asterisk
            size={12}
            className="text-red-500 absolute top-0 -right-3"
          />
        )}
      </span>

      <div>
        <Input
          type={type}
          placeholder={placeholder}
          className="mt-1 relative"
          {...register(name)}
        />
        {value && (
          <X
            size={32}
            className="absolute top-7 right-1 p-2 opacity-50 hover:opacity-100 hover:cursor-pointer"
            onClick={() => setValue(name, "")}
          />
        )}
      </div>

      {isInvalid && (
        <div className="text-red-500 flex gap-2 mt-1 items-center text-sm">
          <CircleAlert size={16} />
          Invalid input value
        </div>
      )}

      {errorText && (
        <div className="text-red-500 flex gap-2 mt-1 items-center text-sm">
          <CircleAlert size={16} />
          {errorText}
        </div>
      )}
    </label>
  );
};
