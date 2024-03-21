import React from "react";
import CreateKpPrev from "./CreateKpPrev";
import UpdateKpPrev from "./UpdateKpPrev";

const KpPrevHome = (props) => {
  const actionType = props?.activeContent?.actionType || "create";

  const componentMap = {
    create: <CreateKpPrev {...props} />,
    update: <UpdateKpPrev {...props} disableInputs={false} />,
    view: <UpdateKpPrev {...props} disableInputs={true} />
  };

  const mapComponentToActionType = (actionType) => {
    if (!actionType) {
      return componentMap["create"];
    }
    return componentMap[actionType];
  };

  return <>{mapComponentToActionType(actionType)}</>;
};

export default KpPrevHome;
