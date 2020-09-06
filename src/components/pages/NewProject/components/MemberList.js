import React from "react";
import { Dropdown, Form } from "react-bootstrap";

// API get route
import get from "../../../../Services/getService"

function MemberList(props) {
  // Get Member from DB
  const teamMember = get.getMember();

  return (
    <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        ---Choose---
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {props.teamMember.map(function (member, index) {
          console.log(index);
          return (
            <div className="row" key={index} style={{ marginLeft: 5 }}>
              <Form.Check
                type="checkbox"
                name={member}
                id={index}
                onChange={props.onchange}
              />
              <p>{member}</p>
            </div>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default MemberList;
