import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";


const getStyle = (props) => {
  let baseClass = "bg-";
  // the message we get from the server, if it's an error
  if (props.message.msgErr)
    baseClass = baseClass + "danger";
  //    if there is no error message
  else baseClass = baseClass + "success";
  return baseClass;
};

const getTitle = (props) => {
  let message;
  if (props.message.msgErr) message = "Sorry!";
  //    if there is no error message
  else message = "Success!";
  return message;
};
// creating the Message component

const Message = (props) => {
  const [show, setShow] = useState(true);
  return (
    <Toast
      onClose={() => setShow(false)}
      show={show}
      delay={3000}
      autohide
      className={getStyle(props)}
    >
      <Toast.Header>
        <strong className="mr-auto">{getTitle(props)}</strong>
      </Toast.Header>
      <Toast.Body>{props.message.msgBody}</Toast.Body>
    </Toast>
  );
};

export default Message;
