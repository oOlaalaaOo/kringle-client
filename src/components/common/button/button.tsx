import { FC, ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface IProps {
  label: string;
  loading?: boolean;
  loadingText?: string;
  theme: "default" | "primary" | "secondary";
  disabled?: boolean;
}

const THEME_TYPE = {
  primary: "bg-indigo-600 focus:outline-none",
  secondary:
    "bg-white border-indigo-600 text-indigo-600 focus:outline-none",
  default:
    "bg-white border-gray-300 text-gray-700 focus:outline-none ",
};

const Button: FC<
  DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > &
    IProps
> = ({
  label = "button text",
  loading = false,
  loadingText = "Loading...",
  theme = "default",
  disabled = false,
  ...rest
}) => {
  return (
    <>
      <button
        className={`group relative flex justify-center py-2 px-4 mx-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white leading-4 ${
          THEME_TYPE[theme]
        } ${disabled === true ? "bg-opacity-50 border-opacity-30 text-opacity-50 cursor-not-allowed" : ""}`}
        disabled={disabled}
        {...rest}
      >
        {loading ? (
          <>
            <i className="fas fa-circle-notch fa-spin"></i> {loadingText}
          </>
        ) : (
          label
        )}
      </button>
    </>
  );
};

export default Button;
