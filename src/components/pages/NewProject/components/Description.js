import React from "react";

function Description(props) {
    return (
        <div className="col">
            <label>Description</label>
            <input
                required
                name="description"
                type="text"
                className="form-control"
                placeholder="Description"
                ref={props.register}
                required
            />
        </div>
    )
};

export default Description;