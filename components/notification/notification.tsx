import { useContext } from "react";

import classes from "./notification.module.css";
import NotificationContext from "@/store/notification-context";

export enum STATUS {
  SUCCESS = "success",
  ERROR = "error",
  PENDING = "pending",
}

export type NotificationProps = {
  title: string;
  message: string;
  status: STATUS;
};

function Notification(props: {
  title: string;
  message: string;
  status: STATUS;
}) {
  const notificationContext = useContext(NotificationContext);

  const handleHideNotification = () => {
    if (notificationContext.notification?.status !== STATUS.PENDING) {
      notificationContext.hideNotification();
    }
  };

  const { title, message, status } = props;

  let statusClasses = "";

  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  if (status === "pending") {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={handleHideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
