import React from "react";

export const List = ({ children }) => <ul className="list">{children}</ul>;

export function LinkItem({ children }) {
  return (
    <a href={children}>
      <li className="listItem">{children}</li>
    </a>
  );
}
