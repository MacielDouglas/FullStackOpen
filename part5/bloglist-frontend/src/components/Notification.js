const Notification = ({ message, errorMessage }) => {
  if (errorMessage === null || message === null) {
    return null
  }
  return (
    <>
      {message ? (
        <div className="message">{message}</div>
      ) : (
        <div className="error">{errorMessage}</div>
      )}
    </>
  )
}

export default Notification
