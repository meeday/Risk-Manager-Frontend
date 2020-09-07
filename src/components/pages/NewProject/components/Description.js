import React from "react";

function Description(props) {
    return (
        <div className="col">
            <label>Description</label>
            <textarea
                required
                name="description"
                type="text"
                className="form-control form-description"
                placeholder="Description"
                ref={props.register}
            />
        </div>
    )
};

export default Description;