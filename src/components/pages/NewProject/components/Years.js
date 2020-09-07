import React from "react";

function Years(props) {
  return (
    <div className="form-group">
      <select className="form-control" name={props.name} ref={props.register}>
        <option>YYYY</option>
        {props.years.map(function (year, id) {
          return (
            <option value={year} key={id}>
              {year}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Years;
