import React, { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";

// API get route
import userService from "../../../../Services/UserService";

function MemberList(props) {
  const [teamMember, setTeamMember] = useState([]);
  const getTeamMember = async () => {
    try {
      const dataReturn = await userService.getAllUser();
      const arrayData = dataReturn.data.UserData;
  
      arrayData.map(user => {
        const test =
          {
            userName: `${user.firstName} ${user.lastName}`,
            userId: user._id
          }
        setTeamMember(oldList => [...oldList, test]);
      });
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getTeamMember();
  }, []);

  return (
    <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        Select
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {teamMember.map(function (member, index) {
          return (
            <div className="row" key={index} style={{ marginLeft: 5 }}>
              <Form.Check
                type="checkbox"
                name={member.userName}
                id={member.userId}
                onChange={props.onchange}
              />
              <p>{member.userName}</p>
            </div>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default MemberList;
