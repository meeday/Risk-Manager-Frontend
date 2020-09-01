import React from "react";
import "./comment.css";

export default function Comment() {
  return (
    <div className="comments-div">
      <div className="section-comments__comments">
        <h6 className="comments__title">Comments</h6>
        <ul className="comments__list-comment">
          <li className="list-comment__comment">
          
            <div className="comment__comment-text">
              <h5 className="comment-text__name-author text-center">
                joe Dodgson
                <span className="name-author__data-post text-center">3 hours ago</span>
              </h5>
              <p className="comment-text__content text-center">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>
          </li>
          <li className="list-comment__comment">
            
            <div className="comment__comment-text">
              <h5 className="comment-text__name-author text-center">
                Niro
                <span className="name-author__data-post text-center"> 2 hours ago</span>
              </h5>
              <p className="comment-text__content text-center">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates explicabo enim amet.
              </p>
            </div>
          </li>
          <li className="list-comment__comment">
            <div className="comment__comment-text">
              <h5 className="comment-text__name-author text-center">
                Ian
                <span className="name-author__data-post text-center"> 4 hours ago</span>
              </h5>
              <p className="comment-text__content text-center">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
