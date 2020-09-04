import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";

// creating the Message component

const ErrorMessage = (props) => {
  const [show, setShow] = useState(true);
  return (
    <Toast
      onClose={() => setShow(false)}
      show={show}
      delay={3000}
      autohide
      className="bg-danger"
    >
      <Toast.Header>
        <strong className="mr-auto">Sorry!</strong>
      </Toast.Header>
      <Toast.Body>{props.message.msgBody}</Toast.Body>
    </Toast>
  );
};

export default ErrorMessage;