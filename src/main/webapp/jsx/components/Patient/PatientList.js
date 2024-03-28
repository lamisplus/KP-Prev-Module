import React, { useState } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { forwardRef } from "react";
import "semantic-ui-css/semantic.min.css";
import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import "@reach/menu-button/styles.css";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import { useQuery } from "react-query";
import {
  getCombinedHtsPrepCodeKey,
 
} from "../../utils/queryKeys";
import axios from "axios";

import { token, url as baseUrl } from "./../../../api";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { MdDashboard } from "react-icons/md";
import { calculateAge, getHospitalNumber } from "../../utils";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchCombinedHtsAndPrepCode } from "../../services/fetchCombinedHtsAndPrevCode";
import { toast } from "react-toastify";

//Date Picker package
Moment.locale("en");
momentLocalizer();

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const PatientList = (props) => {
  const [currentPatient, setCurrentPatient] = useState(null);

  const [showPPI, setShowPPI] = useState(true);
  const handleCheckBox = (e) => {
    if (e.target.checked) {
      setShowPPI(false);
    } else {
      setShowPPI(true);
    }
  };

  

  

 

 

  

  const history = useHistory();

  const { isLoading: isLoadingCombinedCode } = useQuery(
    [getCombinedHtsPrepCodeKey, currentPatient?.id],
    () => fetchCombinedHtsAndPrepCode(currentPatient?.id),
    {
      enabled: currentPatient?.id ? true : false,
      staleTime: 100,
      cacheTime: 100,
      onSuccess: (data) => {
        if (currentPatient && !data?.hts?.clientCode && !data?.prep?.uniqueId) {
          Swal.fire({
            title: "Client ineligible !",
            text: `Client ${getHospitalNumber(
              currentPatient
            )} is not registered both on HTS and Prep`,
            icon: "error",
            showCancelButton: true,
            confirmButtonColor: "#014d88",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, continue to KP_PrEV",
            focusCancel: true,
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/patient-history", { patientObj: currentPatient });
            } else {
              setCurrentPatient(null);
            }
          });
        } else {
          history.push("/patient-history", { patientObj: currentPatient });
        }
      },

      onError: (error) => {
        if (error.response && error.response.data) {
          let errorMessage =
            error.response.data.apierror &&
            error.response.data.apierror.message !== ""
              ? error.response.data.apierror.message
              : "Something went wrong, please try again";
          toast.error(errorMessage);
        } else {
          toast.error("Something went wrong. Please try again...");
        }
      },
    }
  );

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        title="Find Patient"
        columns={[
          // { title: " ID", field: "Id" },
          {
            title: "Patient Name",
            field: "name",
            hidden: showPPI,
          },
          {
            title: "Hospital Number",
            field: "hospital_number",
            filtering: false,
          },
          // { title: "Batch number", field: "clientCode", filtering: false },
          { title: "Sex", field: "gender", filtering: false },
          { title: "Age", field: "age", filtering: false },

          //{ title: "ART Status", field: "v_status", filtering: false },
          //{ title: "Vaccination Status", field: "count", filtering: false },
          { title: "Actions", field: "actions", filtering: false },
        ]}
        components={{
          Toolbar: (props) => (
            <div>
              <div className="form-check custom-checkbox  float-left mt-4 ml-3 ">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="showPP!"
                  id="showPP"
                  value="showPP"
                  checked={showPPI === true ? false : true}
                  onChange={handleCheckBox}
                  style={{
                    border: "1px solid #014D88",
                    borderRadius: "0.25rem",
                  }}
                />
                <label className="form-check-label" htmlFor="basic_checkbox_1">
                  <b style={{ color: "#014d88", fontWeight: "bold" }}>
                    SHOW PII
                  </b>
                </label>
              </div>
              <MTableToolbar {...props} />
            </div>
          ),
        }}
        data={(query) =>
          new Promise((resolve, reject) =>
            axios
              .get(
                `${baseUrl}patient?pageSize=${query.pageSize}&pageNo=${query.page}&searchParam=${query.search}`,
                { headers: { Authorization: `Bearer ${token}` } }
              )
              .then((response) => response)
              .then((result) => {
                resolve({
                  data:
                    result.data.records &&
                    result.data.records !== null &&
                    result.data.records.map((row) => ({
                      name: row?.firstName + " " + row?.surname || row?.otherName || "",
                      hospital_number: getHospitalNumber(row),

                      gender: row?.gender !== null ? row.gender.display : "",
                      age: calculateAge(row?.dateOfBirth),
                      actions: (
                        <div>
                        <ButtonGroup
                          variant="contained"
                          aria-label="split button"
                          style={{
                            backgroundColor: "rgb(153, 46, 98)",
                            height: "30px",
                            width: "215px",
                          }}
                          size="large"
                          onClick={() => {
                            setCurrentPatient(row);
                          }}
                          disabled={isLoadingCombinedCode}
                        >
                          <Button
                            color="primary"
                            size="small"
                            aria-label="select merge strategy"
                            aria-haspopup="menu"
                            style={{ backgroundColor: "rgb(153, 46, 98)" }}
                            disabled={isLoadingCombinedCode}
                          >
                            <MdDashboard />
                          </Button>
                          <Button
                            style={{ backgroundColor: "rgb(153, 46, 98)" }}
                            disabled={isLoadingCombinedCode}
                          >
                            <span
                              style={{
                                fontSize: "10px",
                                color: "#fff",
                                fontWeight: "bolder",
                              }}
                            >
                              {isLoadingCombinedCode && currentPatient?.id === row?.id
                                ? "Please Wait"
                                : "Patient Dashboard"}
                            </span>
                          </Button>
                        </ButtonGroup>
                      </div>
                      ),
                    })),
                  page: query.page,
                  totalCount: result.data.totalRecords,
                });
              })
          )
        }
        options={{
          headerStyle: {
            backgroundColor: "#014d88",
            color: "#fff",
          },
          searchFieldStyle: {
            width: "200%",
            margingLeft: "250px",
          },
          filtering: false,
          exportButton: false,
          searchFieldAlignment: "left",
          pageSizeOptions: [10, 20, 100],
          pageSize: 10,
          debounceInterval: 400,
        }}
      />
    </div>
  );
};

export default PatientList;
