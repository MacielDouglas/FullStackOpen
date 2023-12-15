import { useValueNotification } from '../NotesContext';

const Notification = () => {
  const notificationStyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  const notification = useValueNotification();

  if (!notification) return null;

  return <div style={notificationStyle}>{notification}</div>;
};

export default Notification;
