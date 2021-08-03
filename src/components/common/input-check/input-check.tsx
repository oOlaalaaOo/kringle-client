import { FC, InputHTMLAttributes } from "react";

interface IProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  onChange(value: boolean): void;
  label: string;
  id: string;
  name: string;
}

const InputCheck: FC<IProps> = ({ label, id, name, onChange }) => {
  return (
    <>
      <div className="flex items-center">
        <input
          id={id}
          name={name}
          type="checkbox"
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label
          htmlFor="remember_me"
          className="ml-2 block text-sm text-gray-900"
        >
          {label}
        </label>
      </div>
    </>
  );
};

export default InputCheck;
