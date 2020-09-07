import React from "react";
import "./comment.css";

export default function Comment() {
  return (
    <div className="comments-div">
      <div className="comments-section">
        <h6 className="comments-title">Comments</h6>
        <div className="list-item">
          <div className="comment-text">
            <h5 className="name-author">
              joe Dodgson
              <span className="data-post">3 hours ago</span>
            </h5>
            <p className="comment-content">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>
        </div>
        <div className="list-item">
          
          <div className="comment-text">
            <h5 className="name-author">
              Niro
              <span className="data-post "> 2 hours ago</span>
            </h5>
            <p className="comment-content ">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptates explicabo enim amet.
            </p>
          </div>
        </div>
        <div className="list-item">
          <div className="comment-text">
            <h5 className="name-author ">
              Ian
              <span className="data-post "> 4 hours ago</span>
            </h5>
            <p className="comment-content ">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
