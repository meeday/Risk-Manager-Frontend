// NPM import
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/NewProject.css";

// Component
import Years from "./components/Years";
import Months from "./components/Months";
import ProjectName from "./components/ProjectName";
import Client from "./components/Client";
import Description from "./components/Description";
import Location from "./components/Location";
import Dates from "./components/Dates";
import MemberList from "./components/MemberList";

// API route
import projectService from "../../../Services/ProjectService";

function NewProject(props) {
  // ---Initialization---

  // Declare hooks from useForm
  const { register, handleSubmit, errors } = useForm();
  const [members, setMembers] = useState([]);

  // Variables for year, month and date
  let years = [];
  let yearsMax = new Date().getFullYear();
  let yearsMin = yearsMax - 5;
  let i;
  for (i = yearsMin; i < yearsMax + 1; i++) {
    years.push(i);
  }

  let months = [];
  const monthsMin = 1;
  const monthsMax = 12;
  let j;
  for (j = monthsMin; j < monthsMax + 1; j++) {
    months.push(j);
  }

  let dates = [];
  const datesMin = 1;
  const datesMax = 31;
  let k;
  for (k = datesMin; k < datesMax + 1; k++) {
    dates.push(k);
  }

  // Get select of team members
  const teamMember = ["ian", "alex", "amy"];

  // ---Event Handler---

  // When Submit Button is Clicked
  const onSubmit = (user, e) => {
    const {
      startD,
      startMonth,
      startYear,
      endD,
      endMonth,
      endYear,
    } = user;
    const startDate = `${startD}-${startMonth}-${startYear}`;
    const endDate = `${endD}-${endMonth}-${endYear}`;
    const teamMembers = members;

    const dataSend = {
      user,
      startDate,
      endDate,
      teamMembers
    };
    console.log(dataSend);

    projectService.createProject(dataSend)
      .then((res) => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
      })
      .catch((err) => {
        return err;
      });
    //e.target.reset();
  };

  // Handler for Members
  const membersInclude = (m) => {
    setMembers(members.concat(m));
  };

  const membersRemove = (m) => {
    const index = members.findIndex((mSaved) => mSaved === m);
    members.splice(index, 1);
    setMembers(members);
  };

  const onchange = (e) => {
    if (e.target.type === "checkbox" && !e.target.checked) {
      membersRemove(e.target.name);
    } else {
      membersInclude(e.target.name);
    }
  };

  return (
    <div>
      <h1>New project</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Project Details</h3>
        <div className="form-group row">
          <ProjectName register={register} />
          <Client register={register} />
        </div>

        <div className="form-group row">
          <Description register={register} />
        </div>

        <div className="form-group row">
          <Location register={register} />
        </div>

        <div className="form-group row">
          <div className="form-group col">
            <label>Start date</label>
            <div className="row">
              <div className="col-sm-4">
                <Years
                  years={years}
                  name="startYear"
                  register={register({
                    validate: (value) => value !== "---Year---",
                  })}
                />
              </div>
              <div className="col-sm-4">
                <Months
                  months={months}
                  name="startMonth"
                  register={register({
                    validate: (value) => value !== "---Month---",
                  })}
                />
              </div>
              <div className="col-sm-4">
                <Dates
                  dates={dates}
                  name="startD"
                  register={register({
                    validate: (value) => value !== "---Date---",
                  })}
                />
              </div>
            </div>
          </div>

          <div className="form-group col">
            <label>End date</label>
            <div className="row">
              <div className="col-sm-4">
                <Years
                  years={years}
                  name="endYear"
                  register={register({
                    validate: (value) => value !== "---Year---",
                  })}
                />
              </div>
              <div className="col-sm-4">
                <Months
                  months={months}
                  name="endMonth"
                  register={register({
                    validate: (value) => value !== "---Month---",
                  })}
                />
              </div>
              <div className="col-sm-4">
                <Dates
                  dates={dates}
                  name="endD"
                  register={register({
                    validate: (value) => value !== "---Date---",
                  })}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="form-group row">
          <div className="form-group col">
            <label>Team Member</label>
            {/* Need to pass id in it later when get request form */}
            <MemberList teamMember={teamMember} onchange={onchange} />
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
      </form>

      <div>
        <p>Map placeholder</p>
      </div>
    </div>
  );
}

export default NewProject;
