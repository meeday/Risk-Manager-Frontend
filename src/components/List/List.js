import React from "react";

export const List = ({ children }) => <ul className="list">{children}</ul>;

export function LinkItem(props) {
  return (
    <li className="listItem" key={props.key}>{props.children}</li>
  );
}
