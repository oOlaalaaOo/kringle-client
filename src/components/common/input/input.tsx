import React from "react";

interface IProps {
  label?: string;
  id: string;
  name: string;
  iconRight?: any;
}

const Input = React.forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > &
    IProps
>(({ label, id, name, iconRight, ...rest }, ref) => {
  return (
    <>
      {label ? <label htmlFor={id}>{label}</label> : null}
      <div className="relative">
        <input
          id={id}
          name={name}
          ref={ref}
          className="appearance-none relative block w-full px-3 py-2 mt-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          {...rest}
        />
        {iconRight ? (
          <div className="absolute top-2 right-2">{iconRight}</div>
        ) : null}
      </div>
    </>
  );
});

export default Input;
