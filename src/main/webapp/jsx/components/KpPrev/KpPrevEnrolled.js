import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import axios from "axios";

import { token as token, url as baseUrl } from "./../../../api";
import { forwardRef } from "react";
import "semantic-ui-css/semantic.min.css";
import { Link } from "react-router-dom";
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
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { MdDashboard } from "react-icons/md";
import "@reach/menu-button/styles.css";
import { Label } from "semantic-ui-react";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import moment from "moment";
import { calculate_age } from "../../../utils";

//Dtate Picker package
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

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  cardBottom: {
    marginBottom: 20,
  },
  Select: {
    height: 45,
    width: 350,
  },
  button: {
    margin: theme.spacing(1),
  },

  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  error: {
    color: "#f85032",
    fontSize: "11px",
  },
  success: {
    color: "#4BB543 ",
    fontSize: "11px",
  },
}));

const KpPrevEnrolled = (props) => {
  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        title="Find Patient "
        columns={[
          // { title: " ID", field: "Id" },
          {
            title: "Date Service Offered",
            field: "dateServiceOffered",
          },
          {
            title: "Hospital Number",
            field: "hospital_number",
            filtering: false,
          },
          // { title: "Batch number", field: "clientCode", filtering: false },
          { title: "Prevention Code", field: "prevCode", filtering: false },
          // { title: "Age", field: "age", filtering: false },

          //{ title: "ART Number", field: "v_status", filtering: false },
          // { title: "Kp Prev Status", field: "count", filtering: false },
          { title: "Actions", field: "actions", filtering: false },
        ]}
        //isLoading={loading}
        data={(query) =>
          new Promise((resolve, reject) =>
            axios
              .get(
                `${baseUrl}kpprev?pageSize=${query.pageSize}&pageNo=${query.page}&searchParam=${query.search}`,
                { headers: { Authorization: `Bearer ${token}` } }
              )
              .then((response) => response)
              .then((result) => {
                resolve({
                  data:
                    result.data.records &&
                    result.data.records !== null &&
                    result.data.records.map((row) => ({
                      dateServiceOffered: row.dateServiceOffered,
                      hospital_number:
                        row.htsCode !== null ? row.htsCode : row.prepCode,
                      prevCode: row.prevCode,
                      age: "",

                      actions: (
                        <div>
                          <Link
                            to={{
                              pathname: "/view-kp-prev",
                              state: { patientObj: row },
                            }}
                          >
                            <ButtonGroup
                              variant="contained"
                              aria-label="split button"
                              style={{
                                backgroundColor: "rgb(153, 46, 98)",
                                height: "30px",
                                width: "215px",
                              }}
                              size="large"
                            >
                              <Button
                                color="primary"
                                size="small"
                                aria-label="select merge strategy"
                                aria-haspopup="menu"
                                style={{ backgroundColor: "rgb(153, 46, 98)" }}
                              >
                                <MdDashboard />
                              </Button>
                              <Button
                                style={{ backgroundColor: "rgb(153, 46, 98)" }}
                              >
                                <span
                                  style={{
                                    fontSize: "12px",
                                    color: "#fff",
                                    fontWeight: "bolder",
                                  }}
                                >
                                  View KP Prev
                                </span>
                              </Button>
                            </ButtonGroup>
                          </Link>
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

export default KpPrevEnrolled;
