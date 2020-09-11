import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const LikelihoodHelpIcon = () => {
    return (
        <span
            className="label-popover"
            data-toggle="popover"
            data-trigger="hover"
            data-placement="top"
            data-html="true"
            title="Likelihood scoring"
            data-content="<span class='very-low'> 1 - Very low:</span> The event is unlikely to occur but may by exception occur.
            <br />
            <span class='low'> 2 - Low:</span> The event can be expected to occur during the lifecycle.
            <br />
            <span class='medium'> 3 - Medium:</span> The event is likely to occur several times.
            <br />
            <span class='high'> 4 - High:</span> The event will occur several times and is likely to occur often.
            <br />
            <span class='very-high'> 5 - Very high:</span> The event is likely to occur on a daily basis."
        >
            <FontAwesomeIcon icon={faQuestionCircle} />
        </span>
    );
}

export default LikelihoodHelpIcon;