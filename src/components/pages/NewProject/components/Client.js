import React from "react";

function Client(props) {
    return (
        <div className="col">
            <label>Client</label>
            <input
              required
              name="client"
              type="text"
              className="form-control"
              placeholder="Client"
              ref={props.register}
            />
        </div>
    )
};

export default Client;