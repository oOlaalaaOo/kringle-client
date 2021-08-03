import { FC } from "react";

interface IProps {
  error: string;
}

const InputError: FC<IProps> = ({ error }) => {
  return <small className="text-red-500">{error}</small>;
};

export default InputError;
