import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const SeverityHelpIcon = () => {
    return (
        <span
            className="label-popover"
            data-toggle="popover"
            data-trigger="hover"
            data-placement="top"
            data-html="true"
            title="Severity scoring"
            data-content="<span class='very-low'> 1 - Very low:</span> Non-reportable injury.
            <br />
            <span class='low'> 2 - Low:</span> Minor injury.
            <br />
            <span class='medium'> 3 - Medium:</span> Major injury or multiple minor injuries.
            <br />
            <span class='high'> 4 - High:</span> Single fatality or multiple major injuries.
            <br />
            <span class='very-high'> 5 - Very high:</span> Multiple fatalities."
        >
            <FontAwesomeIcon icon={faQuestionCircle} />
        </span>
    );
}

export default SeverityHelpIcon;