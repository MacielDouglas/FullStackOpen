import React from 'react';

const Notification = ({ message, error }) => {
  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const errnotificationStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (message === null && error === null) {
    return null;
  }
  return (
    <>
      {message ? (
        <div style={notificationStyle}>{message}</div>
      ) : (
        <div style={errnotificationStyle}>{error} </div>
      )}
    </>
  );
};

export default Notification;
