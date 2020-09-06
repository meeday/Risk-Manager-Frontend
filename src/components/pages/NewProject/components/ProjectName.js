import React from "react";

function ProjectName(props) {
    return (
        <div className="col">
            <label>Project Name</label>
            <input
            required
            name="title"
            type="text"
            className="form-control"
            placeholder="Project Name"
            ref={props.register}
            required
            />
        </div>
    )
};

export default ProjectName;