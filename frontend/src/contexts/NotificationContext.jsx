import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const useNotificationContext = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [autoHideDuration, setAutoHideDuration] = useState(2000);

  const showNotification = (message, severity="success", duration=2000) => {
    setMessage(message);
    setSeverity(severity);
    setAutoHideDuration(duration);
    setOpen(true);
  };

  const hideNotification = () => {
    setOpen(false);
  };

  const value = {
    open,
    message,
    severity,
    autoHideDuration,
    showNotification,
    hideNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
