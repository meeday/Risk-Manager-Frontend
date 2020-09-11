import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const RiskScoreHelpIcon = () => {
  return (
    <span
      className="label-popover"
      data-toggle="popover"
      data-trigger="hover"
      data-placement="top"
      data-html="true"
      title="Risk score"
      data-content="Overall risk score is calculated as the sum of the likelihood and severity scores.
                    <br />
                    <span class='very-low'> 2-4 = Negligible risk:</span> Ensure control measures are maintained and reviewed as necessary to control residual risk as far as is reasonably practicable.
                    <br />
                    <span class='medium'> 5-6 = Tolerable risk:</span> Control measures to reduce risk rating to a level which is as low as reasonably practicable (ALARP). Add details of residual risk to drawings/docs.
                    <br />
                    <span class='very-high'> 7-10 = Intolerable risk:</span> Activity not permitted. Hazard to be avoided or reduced."
    >
      <FontAwesomeIcon icon={faQuestionCircle} />
    </span>
  );
};

export default RiskScoreHelpIcon;
