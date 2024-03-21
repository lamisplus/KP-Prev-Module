import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import { Link } from "react-router-dom";
import ButtonMui from "@material-ui/core/Button";
import { TiArrowBack } from "react-icons/ti";
import Divider from "@material-ui/core/Divider";
import "semantic-ui-css/semantic.min.css";
import { Col, Row } from "reactstrap";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";

import {
  calculateAge,
  getPhoneNumber,
  getAddress,
  getLastName,
  getHospitalNumber,
} from "../../utils";

//Dtate Picker package
Moment.locale("en");
momentLocalizer();

const styles = (theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },
  column: {
    flexBasis: "20.33%",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

function PatientCard(props) {
  const { classes } = props;
  const patientObj = props.patientObj;

  

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary>
          <Row>
            <Col md={12}>
              <Row className={"mt-1"}>
                <Col md={12} className={classes.root2}>
                  <b style={{ fontSize: "25px", color: "rgb(153, 46, 98)" }}>
                    {patientObj.firstName + " " + getLastName(patientObj)}
                  </b>
                  <Link to={"/"}>
                    <ButtonMui
                      variant="contained"
                      color="primary"
                      className=" float-end ms-2 mr-2 mt-2"
                      //startIcon={<FaUserPlus size="10"/>}
                      startIcon={<TiArrowBack />}
                      style={{
                        backgroundColor: "rgb(153, 46, 98)",
                        color: "#fff",
                        height: "35px",
                      }}
                    >
                      <span style={{ textTransform: "capitalize" }}>Back</span>
                    </ButtonMui>
                  </Link>
                </Col>
                <Col md={4} className={classes.root2}>
                  <span>
                    {" "}
                    Patient ID :{" "}
                    <b style={{ color: "#0B72AA" }}>
                      {getHospitalNumber(patientObj)}
                    </b>
                  </span>
                </Col>

                <Col md={4} className={classes.root2}>
                  <span>
                    Date Of Birth :{" "}
                    <b style={{ color: "#0B72AA" }}>
                      {patientObj?.dob || patientObj?.dateOfBirth}
                    </b>
                  </span>
                </Col>
                <Col md={4} className={classes.root2}>
                  <span>
                    {" "}
                    Age :{" "}
                    <b style={{ color: "#0B72AA" }}>
                      {calculateAge(patientObj?.dob || patientObj?.dateOfBirth)}
                    </b>
                  </span>
                </Col>
                <Col md={4}>
                  <span>
                    {" "}
                    Gender :{" "}
                    <b style={{ color: "#0B72AA" }}>
                      {patientObj.gender !== null
                        ? patientObj.gender.display
                        : ""}
                    </b>
                  </span>
                </Col>
                <Col md={4} className={classes.root2}>
                  <span>
                    {" "}
                    Phone Number :{" "}
                    <b style={{ color: "#0B72AA" }}>
                      {getPhoneNumber(patientObj.contactPoint)}
                    </b>
                  </span>
                </Col>
                <Col md={4} className={classes.root2}>
                  <span>
                    {" "}
                    Address :{" "}
                    <b style={{ color: "#0B72AA" }}>
                      {getAddress(patientObj.address)}{" "}
                    </b>
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
        </ExpansionPanelSummary>
        <Divider />
      </ExpansionPanel>
    </div>
  );
}

PatientCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PatientCard);
