import React from "react";

function Location(props) {
    return (
        <div className="col">
            <label>Location</label>
          <input
            required
            name="location"
            type="text"
            className="form-control"
            placeholder="Location (select on map)"
            ref={props.register}
          />
        </div>
    )
};

export default Location;