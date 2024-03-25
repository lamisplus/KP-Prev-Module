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
import { Button, Card, CardBody } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import "@reach/menu-button/styles.css";
import { Modal } from "react-bootstrap";
import { Dropdown, Menu, Icon as IconMenu } from "semantic-ui-react";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import { useQuery } from "react-query";
import { fetchKpPrevRecordByPatientId } from "../../services/fetchKpPrevRecordByPatientId";
import { getKpPrevRecordByPatientIdKey } from "../../utils/queryKeys";
import { useDeleteKpPrevRecord } from "../../../hooks/useDeleteKpPrevRecord";

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

const KpPrevHistory = (props) => {
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);
  const [record, setRecord] = useState(null);

 const  onToggleModal = (row) => {
  toggleDeleteModal()
  setRecord(row)
}

  const { data } = useQuery(
    [getKpPrevRecordByPatientIdKey, props?.patientObj?.uuid],
    () => fetchKpPrevRecordByPatientId(props?.patientObj?.uuid),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      enabled: props?.patientObj?.uuid ? true : false,
    }
  );

  const LoadDeletePage = () => {
    toggleDeleteModal()
    mutate({id: record?.id});
    setRecord(null)
  };
  const LoadViewPage = (row) => {
    props.setActiveContent({
      ...props.activeContent,
      route: "kp-prev",
      actionType: "view",
      record: row,
    });
  };

  const LoadEditPage = (row) => {
    props.setActiveContent({
      ...props.activeContent,
      route: "kp-prev",
      actionType: "update",
      record: row,
    });
  };

  const { mutate, isLoading } = useDeleteKpPrevRecord();

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
                field: "dateServiceOffered",
                render: (row) => row?.dateServiceOffered || "",
              },
              {
                title: "Prevention Code",
                field: "preventioncode",
                filtering: false,
                render: (row) => row?.prevCode || "",
              },
              {
                title: "Hospital Number",
                field: "hospital_number",
                filtering: false,
                render: (row) =>
                  row.htsCode !== null ? row.htsCode : row.prepCode,
              },
    
              {
                title: "HTS Services",
                field: "htsServices",
                filtering: false,
                render: (row) =>
                  row?.htsServices.offered_hts !== "" ? "✅" : "❌",
              },
              {
                title: "Prep Services",
                field: "prepServices",
                filtering: false,
                render: (row) =>
                  row?.prepServices.offered_prep !== "" ? "✅" : "❌",
              },
              {
                title: "Commodity Services",
                field: "commodityServices",
                filtering: false,
                render: (row) =>
                  row?.commodityServices.condoms_dispensed !== "" ? "✅" : "❌",
              },
              {
                title: "HIV Educational Services",
                field: "hivEducationalServices",
                filtering: false,
                render: (row) =>
                  row?.hivEducationalServices.iecMaterial !== "" ? "✅" : "❌",
              },
              {
                title: "Biomedical Services",
                field: "biomedicalServices",
                filtering: false,
                render: (row) =>
                  row?.biomedicalServices.sti_screening !== "" ? "✅" : "❌",
              },
              {
                title: "Structural Services",
                field: "structuralServices",
                filtering: false,
                render: (row) =>
                  row?.structuralServices.legalAidServices !== "" ? "✅" : "❌",
              },
              {
                title: "Actions",
                render: (row) => (
                  <div>
                    <Menu.Menu position="right">
                      <Menu.Item>
                        <Button
                          style={{
                            backgroundColor: "rgb(153,46,98)",
                            color: "#fff",
                          }}
                          primary
                        >
                          <Dropdown item text="Action">
                            <Dropdown.Menu style={{ marginTop: "10px" }}>
                              <Dropdown.Item onClick={() => LoadViewPage(row)}>
                                <IconMenu name="eye" />
                                View
                              </Dropdown.Item>
                              <Dropdown.Item onClick={() => LoadEditPage(row)}>
                                <IconMenu name="edit" />
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item onClick={()=> onToggleModal(row)}>
                                {" "}
                                <IconMenu name="trash" /> Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </Button>
                      </Menu.Item>
                    </Menu.Menu>
                  </div>
                ),
              },
            ]}
            data={data || []}
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
            disabled={isLoading}
          >
            {isLoading === false ? "Yes" : "Deleting..."}
          </Button>
          <Button
            onClick={toggleDeleteModal}
            style={{ backgroundColor: "#014d88", color: "#fff" }}
            disabled={isLoading}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default KpPrevHistory;
