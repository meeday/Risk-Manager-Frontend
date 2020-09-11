import React from "react";
import "./style/Comments.css";
import { formatRelative } from "date-fns";

export default function Comments(props) {
  return (
    <>
      {props.risks ? 
        <div className="comments-div">
          {props.risks.map(risk => (
            risk.comments.map(comment => (
              <div className="list-item">
                <div className="comment-text">
                  <h5 className="name-author">
                    {comment.user.name}
                    <span className="data-post">{comment.dateRaised.slice(11,16)} on {comment.dateRaised.slice(0,10).split("-").reverse().join("-")}</span>
                  </h5>
                  <p className="comment-content">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))
          ))}
        </div>
      : null }
    </>
  );
}
