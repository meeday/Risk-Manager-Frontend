import React, { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";

// API get route
import userService from "../../../../Services/UserService";

function MemberList(props) {
  // Set state
  const [teamMember, setTeamMember] = useState([]);

  // API call to get all users and set to state
  const getTeamMember = async () => {
    try {
      const dataReturn = await userService.getAllUser();
      const arrayData = dataReturn.data.UserData;

      const arrayUsers = arrayData.map(user => {
        return {
          userName: `${user.firstName} ${user.lastName}`,
          userId: user._id
        }
      });
      setTeamMember(arrayUsers);
    }
    catch (err) {
      console.log(`Error - MemberList.js - getTeamMember() - ${err}`);
    }
  }

  // Call the function which gets all users and sets to state
  useEffect(() => {
    getTeamMember();
  }, []);
  
  return (
    <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        Select
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {teamMember.map((member, index) => {
          return (
            <div className="row" key={index} style={{ marginLeft: 5 }}>
              <Form.Check
                type="checkbox"
                name={member.userName}
                id={member.userId}
                onChange={props.onchange}
              />
              {member.userName}
            </div>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default MemberList;
