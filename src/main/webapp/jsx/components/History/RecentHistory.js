import React, {  Fragment } from "react";
import KpPrevHistory from "./../KpPrev/KpPrevHistory";
import { useQuery } from "react-query";
import { fetchKpPrevRecordByPatientId } from "../../services/fetchKpPrevRecordByPatientId";
import { getKpPrevRecordByPatientIdKey } from "../../utils/queryKeys";

const RecentHistory = (props) => {
  useQuery(
    [getKpPrevRecordByPatientIdKey, props?.patientObj?.uuid],
    () => fetchKpPrevRecordByPatientId(props?.patientObj?.uuid),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      enabled: props?.patientObj?.uuid ? true : false,
    }
  );
  

  return (
    <Fragment>
      <div className="row">
        <KpPrevHistory patientObj={props.patientObj} {...props}/>
      </div>
    </Fragment>
  );
};

export default RecentHistory;
