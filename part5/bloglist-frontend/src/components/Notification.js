const Notification = ({ message, errormessage }) => {
  if (errormessage === null || message === null) {
    return null;
  }
  return (
    <>
      {message ? (
        <div className="message">{message}</div>
      ) : (
        <div className="error">{errormessage}</div>
      )}
    </>
  );
};

export default Notification;
