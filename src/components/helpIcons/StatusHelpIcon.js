import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const StatusHelpIcon = () => {
    return (
        <span
        className="label-popover"
        data-toggle="popover"
        data-trigger="hover"
        data-placement="top"
        data-html="true"
        title="Status"
        data-content="<strong>Open:</strong> The risk is present in the design.
          <br />
          <strong>Closed:</strong> The risk has been mitigated, so it is no longer present in the design.
          <br />
          <strong>Transferred:</strong> Ownership of the risk has been transferred to another party."
        >
            <FontAwesomeIcon icon={faQuestionCircle} />
        </span>
    );
}

export default StatusHelpIcon;