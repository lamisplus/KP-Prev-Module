import React, {  Fragment } from "react";
import KpPrevHistory from "./../KpPrev/KpPrevHistory";
import { useQuery } from "react-query";
import { fetchKpPrevRecordByPatientId } from "../../services/fetchKpPrevRecordByPatientId";
import { getKpPrevRecordByPatientIdKey } from "../../utils/queryKeys";

const RecentHistory = (props) => {

  console.log(props)
  useQuery(
    [getKpPrevRecordByPatientIdKey, props?.patientObj?.uuid || props?.patientObj?.personUuid],
    () => fetchKpPrevRecordByPatientId(props?.patientObj?.uuid || props?.patientObj?.personUuid),
    {
      enabled: props?.patientObj?.uuid || props?.patientObj?.personUuid ? true : false,
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
