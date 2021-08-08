import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface IProps {
  show: boolean;
  title: string;
  onClose?: () => void;
}

const Notification: React.FC<IProps> = ({ show, title, onClose }) => {
  if (show === false) {
    return null;
  }

  return (
    <NotificationRootWrapper>
      <div className="fixed z-20 top-20 right-3">
        <div className="bg-white p-3 border rounded shadow">{title}</div>
      </div>
    </NotificationRootWrapper>
  );
};

const notificationRoot = document.querySelector(
  "#notification-root"
) as HTMLElement;

const NotificationRootWrapper: React.FC<{}> = ({ children }) => {
  const el = useRef(document.createElement("div"));

  useEffect(() => {
    // Use this in case CRA throws an error about react-hooks/exhaustive-deps
    const current = el.current;

    // We assume `notificationRoot` exists with '!'
    notificationRoot!.appendChild(current);
    return () => void notificationRoot!.removeChild(current);
  }, []);

  return ReactDOM.createPortal(children, el.current);
};

export default Notification;
