import React from 'react';

const  getStyle = (props) => {
    let baseClass = "alert ";
    // the message we get from the server, if it's an error 
    if(props.message.msgError)
    baseClass = baseClass + "alert-danger";
//    if there is no error message
    else
        baseClass = baseClass + "alert-primary";
    return baseClass + "text-center";
    
}
// creating the Message component
const Message = props => {
    return(
        // to call bootstrap property creating a getStyle() method
        <div className={getStyle(props)} role="alert">
            {props.message.msgBody}
        </div>
    )
}

export default Message;