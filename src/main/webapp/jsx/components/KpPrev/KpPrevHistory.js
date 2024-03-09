import React, { Fragment, useEffect, useState } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import { url as baseUrl } from "./../../../api";
import { token as token } from "./../../../api";
import { forwardRef } from "react";
import "semantic-ui-css/semantic.min.css";
import { Icon } from "semantic-ui-react";
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
import { Card, CardBody } from "reactstrap";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import { makeStyles } from "@material-ui/core/styles";
//import { useHistory } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { Dropdown, Menu, Icon as IconMenu } from "semantic-ui-react";
import "@reach/menu-button/styles.css";
import { Modal } from "react-bootstrap";
import Vaccination from "./../Vaccination/AddViccination";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import PerfectScrollbar from "react-perfect-scrollbar";

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

const KpPrevHistory = (props) => {
  const [vacinationList, setVaccinationtList] = useState([]);
  const patientObj = props && props.patientObj ? props.patientObj : [];
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);
  const [record, setRecord] = useState(null);
  const [saving, setSaving] = useState(false);

  const LoadModal = (row) => {
    toggle();
    setRecord(row);
  };

  useEffect(() => {
    patients();
  }, []);
  ///GET LIST OF Patients Vaccinations
  async function patients() {
    axios
      .get(`${baseUrl}kpprev/${patientObj.uuid}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setVaccinationtList(response.data);
      })
      .catch((error) => {});
  }
  const loadVaccinationModal = (row) => {
    setModal(!modal);
  };
  const LoadEditModal = (row) => {
    setRecord(row);
    toggle();
  };
  const LoadDeleteModal = (row) => {
    toggleDeleteModal();
    setRecord(row);
  };

  const dummyData = [
    {
      dateOfServicesProvided: "2023-10-15", // Dummy date for the first column
      action: "Sample Action", // Dummy data for the second column
    },
    {
      dateOfServicesProvided: "2023-11-20", // Another dummy date
      action: "Another Action", // Another dummy action
    },
    // Add more objects for additional rows as needed
  ];
  const handleAction = (rowData) => {
    // Define your action handling logic here
    console.log("Action clicked for:", rowData);
  };

  const LoadVie43wPage = (row, action) => {
    // Placeholder function
    console.log("View page loaded for:", row);
  };

  //console.log(record)
  const LoadDeletePage = () => {
    setSaving(true);
    //props.setActiveContent({...props.activeContent, route:'mental-health-view', id:row.id})
    axios
      .delete(`${baseUrl}kpprev/${record.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.success("Record Deleted Successfully");
        patients();
        toggleDeleteModal();
        setSaving(false);
      })
      .catch((error) => {
        setSaving(false);
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
      });
  };

  return (
    <div>
      <Card>
        <CardBody>
          <MaterialTable
            icons={tableIcons}
            title="Patient Kp-Prev History "
            columns={[
              {
                title: "Date Of Services Provided",
                field: "dateOfServicesProvided",
              },
              {
                title: "Prevention Code",
                field: "preventioncode",
                filtering: false,
              },
              { title: "HTS Services", field: "htsServices", filtering: false },
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
              // {
              //   title: "Action",
              //   field: "action",
              //   filtering: false,
              // },

              // { title: "Actions", field: "biomedicalServices", filtering: false },
            ]}
            data={vacinationList.map((row) => ({
              dateOfServicesProvided: row.dateServiceOffered,
              preventioncode: row.prevCode,
              htsServices: row.htsServices?.offered_hts !== "" ? "✅" : "❌",
              prepServices: row.prepServices?.offered_prep !== "" ? "✅" : "❌",
              commodityServices:
                row.commodityServices?.condoms_dispensed !== "" ? "✅" : "❌",
              hivEducationalServices:
                row.hivEducationalServices?.iecMaterial !== "" ? "✅" : "❌",
              biomedicalServices:
                row.biomedicalServices?.sti_screening !== "" ? "✅" : "❌",
              structuralServices:
                row.structuralServices?.legalAidServices !== "" ? "✅" : "❌",
              // action: (
              //   <div>
              //     <Menu.Menu position="right">
              //       <Menu.Item>
              //         <Button
              //           style={{
              //             backgroundColor: "rgb(153,46,98)",
              //             color: "#fff",
              //           }}
              //           primary
              //         >
              //           <Dropdown item text="Action">
              //             <Dropdown.Menu style={{ marginTop: "10px" }}>
              //               <Dropdown.Item onClick={() => LoadEditModal(row)}>
              //                 <IconMenu name="edit" />
              //                 Edit
              //               </Dropdown.Item>
              //               <Dropdown.Item onClick={() => LoadDeleteModal(row)}>
              //                 {" "}
              //                 <IconMenu name="trash" /> Delete
              //               </Dropdown.Item>
              //             </Dropdown.Menu>
              //           </Dropdown>
              //         </Button>
              //       </Menu.Item>
              //     </Menu.Menu>
              //   </div>
              // ),
            }))}
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
        </CardBody>
      </Card>
      <Vaccination
        toggle={toggle}
        showModal={modal}
        patientObj={props.patientObj}
        loadPatients={patients}
        records={record}
      />
      <Modal
        show={openDeleteModal}
        toggle={toggleDeleteModal}
        className="fade"
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Notification!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>
            Are you Sure you want to delete -{" "}
            <b>{record && record.batchNumber}</b>
          </h4>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => LoadDeletePage(record)}
            style={{ backgroundColor: "red", color: "#fff" }}
            disabled={saving}
          >
            {saving === false ? "Yes" : "Deleting..."}
          </Button>
          <Button
            onClick={toggleDeleteModal}
            style={{ backgroundColor: "#014d88", color: "#fff" }}
            disabled={saving}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default KpPrevHistory;
