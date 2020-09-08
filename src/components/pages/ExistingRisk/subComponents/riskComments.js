import React from "react";
import "../../../Comments/comment.css";

export default function RiskComment() {
  return (
    <div className="comments-div">
      <div className="comments-section">
        <h6 className="comments-title">Comments</h6>
        <ul className="comments-list">
          <li className="list-item">
          
            <div className="comment-text">
              <h5 className="name-author">
                joe Dodgson
                <span className="data-post">3 hours ago</span>
              </h5>
              <p className="comment-content">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>
          </li>
          <li className="list-item">
            
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
          </li>
          <li className="list-item">
            <div className="comment-text">
              <h5 className="name-author ">
                Ian
                <span className="data-post "> 4 hours ago</span>
              </h5>
              <p className="comment-content ">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
