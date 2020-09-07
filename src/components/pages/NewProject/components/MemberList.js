import React from "react";
import { Dropdown, Form } from "react-bootstrap";

// API get route
import userService from "../../../../Services/UserService";

function MemberList(props) {
  const teamMember = userService.getAllUser;

  return (
    <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        ---Choose---
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {teamMember.map(function (member, index) {
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
