import React, { createContext, useCallback, useEffect, useState } from "react";
import { NotificationProps } from "@/components/notification/notification";

const NotificationContext = createContext<{
  notification: NotificationProps | null;
  showNotification: (notification: NotificationProps) => void;
  hideNotification: () => void;
}>({
  notification: null,
  showNotification: () => {},
  hideNotification: () => {},
});

export function NotificationContextProvider(props: {
  children: React.ReactNode;
}) {
  const [activeNotification, setActiveNotification] =
    useState<NotificationProps | null>(null);

  useEffect(() => {
    if (
      activeNotification?.status === "success" ||
      activeNotification?.status === "error"
    ) {
      const timer = setTimeout(() => {
        hideNotificationHandler();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  function showNotificationHandler(notificationData: NotificationProps) {
    setActiveNotification(notificationData);
  }

  function hideNotificationHandler() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: useCallback(showNotificationHandler, []),
    hideNotification: useCallback(hideNotificationHandler, []),
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
