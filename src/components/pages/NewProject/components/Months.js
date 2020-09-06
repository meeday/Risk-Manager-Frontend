import React from "react";

function Months(props) {
  return (
    <div className="form-group">
      <select className="form-control" name={props.name} ref={props.register}>
        <option>---Month---</option>
        {props.months.map(function (month, id) {
          return (
            <option value={month} key={id}>
              {month}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Months;
