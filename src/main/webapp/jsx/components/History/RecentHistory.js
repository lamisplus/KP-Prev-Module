import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import VaccinationHistory from "./../Vaccination/VaccinationHistory";
import KpPrevHistory from "./../KpPrev/KpPrevHistory";
import { url as baseUrl, token } from "../../../api";

const RecentHistory = (props) => {
  const [recentActivities, setRecentActivities] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(true);

  useEffect(() => {
    if (props.patientObj && props.patientObj !== null) {
      RecentActivities();
    }
  }, [props.patientObj]);

  // const RecentActivities = () => {
  //   axios
  //   .put('/api/v1/kpprev', data, {
  //     headers: { Authorization: `Bearer ${token}` },
  //   })
  //     .then((response) => {
  //       setLoadingRecent(false);
  //       setRecentActivities(response.data);
  //     })
  //     .catch((error) => {
  //       setLoadingRecent(false);
  //       //console.log(error);
  //     });
  // };
  //Get list of LaboratoryHistory
  const RecentActivities = () => {
    axios
      .get(
        `${baseUrl}api/v1/kpprev/retrieve ${props.patientObj.id}/activities?full=false`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setLoadingRecent(false);
        setRecentActivities(response.data);
      })
      .catch((error) => {
        setLoadingRecent(false);
        //console.log(error);
      });
  };
  const LoadViewPage = (row, action) => {
    if (row.path === "") {
      props.setActiveContent({
        ...props.activeContent,
        route: "kp-prevention",
        id: row.id,
        actionType: action,
      });
    }
  };

  return (
    <Fragment>
      <div className="row">
        <KpPrevHistory patientObj={props.patientObj} />
      </div>
    </Fragment>
  );
};

export default RecentHistory;
