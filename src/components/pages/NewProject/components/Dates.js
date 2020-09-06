import React from "react";

function Dates(props) {
  return (
    <div className="form-group">
      <select className="form-control" name={props.name} ref={props.register}>
        <option>---Date---</option>
        {props.dates.map(function (date, id) {
          return (
            <option value={date} key={id}>
              {date}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Dates;
