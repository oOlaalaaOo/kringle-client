import { FC } from "react";

const NotFoundPage: FC<any> = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center border">
      <h1 className="text-6xl mb-5 text-center">Page Not Found</h1>
      <h3 className="text-2xl font-light text-center">Sorry but the page your looking is not available</h3>
    </div>
  );
};

export default NotFoundPage;
