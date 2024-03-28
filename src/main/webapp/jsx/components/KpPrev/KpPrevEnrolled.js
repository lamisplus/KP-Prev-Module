import React, { useState } from "react";
import MaterialTable from "material-table";
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
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { MdDashboard } from "react-icons/md";
import "@reach/menu-button/styles.css";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import { useQuery } from "react-query";
import { getKpPrevpatientsKey, getPatientByIdKey } from "../../utils/queryKeys";
import { useHistory } from "react-router-dom";
import { fetchPatientById } from "../../services/fetchPatientById";
import { toast } from "react-toastify";
import { queryClient } from "../../utils/queryClient";
import { fetchKpPrevPatients } from "../../services/fetchKpPrevPatients";

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

const KpPrevEnrolled = (props) => {
  const [currentRecord, setCurrentRecord] = useState(null);
  const [query, setQueryParams] = useState({
    page: 0,
    pageSize: 10,
    search: "",
  });
  const history = useHistory();

  const prefetchNextPage = async () => {
    const nextPage = query.page + 1;
    // Use the same query key as in the useQuery hook
    const queryKey = [getKpPrevpatientsKey, { ...query, page: nextPage }];
    await queryClient.prefetchQuery(queryKey, () =>
      fetchKpPrevPatients({ ...query, page: nextPage })
    );
  };

  const { data, isLoading, refetch } = useQuery(
    [getKpPrevpatientsKey, query],
    () => fetchKpPrevPatients(query),
    {
      onSuccess: () => {
        prefetchNextPage();
      },
    }
  );

  const { isLoading: isLoadingCurrentPatient } = useQuery(
    [getPatientByIdKey, currentRecord?.patientIdentifier],
    () => fetchPatientById(currentRecord?.patientIdentifier),
    {
      onSuccess: (data) => {
        history.push("/patient-history", { patientObj: data });
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
      enabled: currentRecord?.patientIdentifier ? true : false,
      staleTime: 100,
      cacheTime: 100,
    }
  );

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        title="Find Record"
        columns={[
          {
            title: "Date Service Offered",
            field: "dateServiceOffered",
          },
          {
            title: "Hospital Number",
            field: "hospital_number",
            filtering: false,
          },

          { title: "Prevention Code", field: "prevCode", filtering: false },

          {
            title: "HTS Services",
            field: "htsServices",
            filtering: false,
          },
          {
            title: "Prep Services",
            field: "prepServices",
            filtering: false,
          },
          {
            title: "Commodity Services",
            field: "commodityServices",
            filtering: false,
          },
          {
            title: "HIV Educational Services",
            field: "hivEducationalServices",
            filtering: false,
          },
          {
            title: "Biomedical Services",
            field: "biomedicalServices",
            filtering: false,
          },
          {
            title: "Structural Services",
            field: "structuralServices",
            filtering: false,
          },

          { title: "Actions", field: "actions", filtering: false },
        ]}
        isLoading={isLoading}
        data={
          data &&
          data?.records &&
          data?.records?.map?.((row) => ({
            dateServiceOffered: row.dateServiceOffered,
            hospital_number:
              row.htsCode !== null ? row?.htsCode : row?.prepCode,
            prevCode: row?.prevCode || "",
            htsServices: row?.htsServices.offered_hts !== "" ? "✅" : "❌",
            prepServices: row?.prepServices.offered_prep !== "" ? "✅" : "❌",
            commodityServices:
              row?.commodityServices.condoms_dispensed !== "" ? "✅" : "❌",
            hivEducationalServices:
              row?.hivEducationalServices.iecMaterial !== "" ? "✅" : "❌",
            biomedicalServices:
              row?.biomedicalServices.sti_screening !== "" ? "✅" : "❌",
            structuralServices:
              row?.structuralServices.legalAidServices !== "" ? "✅" : "❌",
            actions: (
              <div className="d-flex">
                <ButtonGroup
                  variant="contained"
                  aria-label="split button"
                  style={{
                    backgroundColor: "rgb(153, 46, 98)",
                    height: "30px",
                    width: "215px",
                  }}
                  size="large"
                  onClick={() => setCurrentRecord(row)}
                  disabled={isLoadingCurrentPatient}
                >
                  <Button
                    color="primary"
                    size="small"
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    style={{ backgroundColor: "rgb(153, 46, 98)" }}
                    disabled={isLoadingCurrentPatient}
                  >
                    <MdDashboard />
                  </Button>
                  <Button
                    style={{ backgroundColor: "rgb(153, 46, 98)" }}
                    disabled={isLoadingCurrentPatient}
                  >
                    <span
                      style={{
                        fontSize: "10px",
                        color: "#fff",
                        fontWeight: "bolder",
                      }}
                    >
                      {isLoadingCurrentPatient && currentRecord?.id === row?.id
                        ? "Please Wait"
                        : "Patient Dashboard"}
                    </span>
                  </Button>
                </ButtonGroup>
              </div>
            ),
          }))
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
          paging: true,
          exportButton: false,
          searchFieldAlignment: "left",
          pageSizeOptions: [10, 20, 100],
          pageSize: query?.pageSize || 10,
          debounceInterval: 400,
        }}
        page={data?.currentPage}
        totalCount={data?.totalRecords}
        onChangePage={(newPage) => {
          setQueryParams((prevFilters) => ({ ...prevFilters, page: newPage }));
          refetch(query);
        }}
        onChangeRowsPerPage={(newPageSize) => {
          setQueryParams((prevFilters) => ({
            ...prevFilters,
            pageSize: newPageSize,
          }));
          refetch(query);
        }}
      />
    </div>
  );
};

export default KpPrevEnrolled;
