import React from "react";

interface IProps {
  message: string;
}

const Alert: React.FC<IProps> = ({ message }) => {
  return (
    <div className="my-5 py-3 px-5 bg-red-100 rounded-md">
      <p>{message}</p>
    </div>
  );
};

export default Alert;
