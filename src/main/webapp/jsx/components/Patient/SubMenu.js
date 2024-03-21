import React, { useEffect } from "react";
import axios from "axios";
import { Menu } from "semantic-ui-react";
import { url as baseUrl, token } from "../../../api";

function SubMenu(props) {
  useEffect(() => {
    Observation();
  });
  //Get list of RegimenLine
  const Observation = () => {
    axios
      .get(`${baseUrl}observation/person/${props.patientObj.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {})
      .catch((error) => {});
  };

  const onClickHome = (row) => {
    props.setActiveContent({ ...props.activeContent, route: "recent-history" });
  };
  
  const loadKpPrev = (row) => {
    props.setActiveContent({
      ...props.activeContent,
      route: "kp-prev",
      actionType: "create",
    });
  };

  return (
    <div>
      <Menu size="large" color={"black"} inverted>
        <Menu.Item onClick={() => onClickHome()}> Home</Menu.Item>
        <Menu.Item onClick={() => loadKpPrev()}> Kp-Prev</Menu.Item>
      </Menu>
    </div>
  );
}

export default SubMenu;
