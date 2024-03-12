import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import MatButton from "@material-ui/core/Button";
import ButtonMui from "@material-ui/core/Button";
import { TiArrowBack } from "react-icons/ti";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import * as moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
import { url as baseUrl } from "../../../api";
import { token as token } from "../../../api";
import "react-widgets/dist/css/react-widgets.css";

import { Spinner } from "reactstrap";
import { Icon, List, Label as LabelSui } from "semantic-ui-react";

import "react-dual-listbox/lib/react-dual-listbox.css";

import { useTheme } from "@mui/material/styles";
import { Row } from "react-bootstrap";

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
    flexGrow: 1,
    "& .card-title": {
      color: "#fff",
      fontWeight: "bold",
    },
    "& .form-control": {
      borderRadius: "0.25rem",
      height: "41px",
    },
    "& .card-header:first-child": {
      borderRadius: "calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0",
    },
    "& .dropdown-toggle::after": {
      display: " block !important",
    },
    "& select": {
      "-webkit-appearance": "listbox !important",
    },
    "& p": {
      color: "red",
    },
    "& label": {
      fontSize: "14px",
      color: "#014d88",
      fontWeight: "bold",
    },
  },
  input: {
    display: "none",
  },
  error: {
    color: "#f85032",
    fontSize: "11px",
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selectedOptions, theme) {
  return {
    fontWeight:
      selectedOptions.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ViewUpdate = (props) => {
  const theme = useTheme();
  const patientObj = props.patientObj;
  const location = useLocation();

  const kpprevValues = location.state.patientObj;
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [htsCodeVal, setHtsCodeVal] = useState({});
  const [prepCodeVal, setPrepCodeVal] = useState({});
  let temp = { ...errors };
  const classes = useStyles();

  const [saving, setSaving] = useState(false);

  useEffect(() => {}, []);

  const [date, setDate] = useState({
    dateServiceOffered: kpprevValues.dateServiceOffered,
    service_provider: kpprevValues.serviceProvider,
  });
  const [htsServices, setHtsServices] = useState({
    offeredHts: kpprevValues.htsServices.offered_hts,
    acceptedHts: kpprevValues.htsServices.accepted_hts,
    hivTestResult: kpprevValues.htsServices.hiv_test_result,
    referredForArt: kpprevValues.htsServices.referred_for_art,
  });
  const [prepServices, setPrepServices] = useState({
    offeredPrep: kpprevValues.prepServices.offered_prep,
    acceptedPrep: kpprevValues.prepServices.accepted_prep,
    referredForPrep: kpprevValues.prepServices.referred_for_prep,
  });
  const [commodityService, setCommodityService] = useState({
    condomDispensed: kpprevValues.commodityServices.condoms_dispensed,
    lubricantsDispensed: kpprevValues.commodityServices.lubricants_dispensed,
    oralQuickDispensed: kpprevValues.commodityServices.hivst_kits_dispensed,
    newNeedleDispensed: kpprevValues.commodityServices.new_needles_dispensed,
    oldNeedleRetrived: kpprevValues.commodityServices.old_needles_dispensed,
    nalxoneProvided: kpprevValues.commodityServices.naloxane_provided,
    howmanycondomDispensed:
      kpprevValues.commodityServices.how_many_condom_dispensed,
    howmanylubricantsDispensed:
      kpprevValues.commodityServices.how_many_lubricants_dispensed,
    howmanyoralQuickDispensed:
      kpprevValues.commodityServices.how_many_oral_quick_dispensed,
    howmanynewNeedleDispensed:
      kpprevValues.commodityServices.how_many_new_needle_dispensed,
    howmanyoldNeedleRetrived:
      kpprevValues.commodityServices.how_many_old_needle_retrived,
    howmanynalxoneProvided:
      kpprevValues.commodityServices.how_many_nalxone_provided,
  });
  const [hivEducationProvided, setHivEducationProvided] = useState({
    iecMaterial: kpprevValues.hivEducationalServices?.iecMaterial,
    interPersonalCommunication:
      kpprevValues.hivEducationalServices?.interPersonalCommunication,
    peerGroupCommunication:
      kpprevValues.hivEducationalServices?.peerGroupCommunication,
  });
  const [bioMedicalServices, setbioMedicalServices] = useState({
    stiScreening: kpprevValues.biomedicalServices?.sti_screening,
    stiSyndromicManagement:
      kpprevValues.biomedicalServices?.sti_syndromic_management,
    stiTreatment: kpprevValues.biomedicalServices?.sti_treatment,
    screenedForTb: kpprevValues.biomedicalServices?.screened_for_tb,
    providedWithTpt: kpprevValues.biomedicalServices?.provided_with_tpt,
    screenedForViralHepatits:
      kpprevValues.biomedicalServices?.screened_for_viral_hepatitis,
    viralHepatitsScreenResult:
      kpprevValues.biomedicalServices?.viral_hepatitis_screen_result,
    vaccinationForViralHepatits:
      kpprevValues.biomedicalServices?.vaccination_for_viral_hepatitis,
    offeredFamilyPlanningServices:
      kpprevValues.biomedicalServices?.offered_family_planning_services,
    referredForFamilyPlanningServices:
      kpprevValues.biomedicalServices?.referred_for_family_planning_services,
    providedWithDrugRehab:
      kpprevValues.biomedicalServices?.provided_with_drug_rehab,
    offeredMhpss: kpprevValues.biomedicalServices?.offered_mhpss,
    onMedicalAssistedTherapy:
      kpprevValues.biomedicalServices?.medical_assisted_therapy_for_six_months,
    recivedNalxoneForOverdoseTreatment:
      kpprevValues.biomedicalServices?.received_naloxone_for_overdose_treatment,
    stiScreeningResult: kpprevValues.biomedicalServices?.sti_screening_result,
    stifacilityReffered: kpprevValues.biomedicalServices?.sti_facility_referred,
    tbfacilityReffered: kpprevValues.biomedicalServices?.tb_facility_reffered,
    tbtreatmentrefferal: kpprevValues.biomedicalServices?.tb_treatment_refferal,
    typeofMhpss: kpprevValues.biomedicalServices?.type_of_mhpss,
    drugRehabfacilityReffered:
      kpprevValues.biomedicalServices?.drug_rehab_facility_reffered,
    refferedfacilitydrugrehab:
      kpprevValues.biomedicalServices?.referred_facility_drug_rehab,
  });
  const [structuralServices, setstructuralServices] = useState({
    providedOrRefferedForEmpowerment:
      kpprevValues.structuralServices.providedEmpowerment,
    legalAidServiceType: kpprevValues.structuralServices.legalAidServices,
    peerGroupCommunication: "",
    typeempowermentprovided:
      kpprevValues.structuralServices.type_empowerment_provided,
    typelegalempowerment: kpprevValues.structuralServices.typelegalempowerment,
    legalprogramreferred: kpprevValues.structuralServices.legalprogramreferred,
  });
  const [facilityRefferedToo, setFacilityRefferedToo] = useState({
    facilityRefferedToStiScreening: "",
    facilityRefferedToScreenedTo: "",
    facilityRefferedToScreenedForViralHepatits: "",
    facilityRefferedToViralHepatitsScreenResult: "",
    facilityRefferedToVaccinationForViralHepatits: "",
    facilityRefferedToOfferedFamilyPlanningServices: "",
    facilityRefferedToReferredForFamilyPlanningServices: "",
    facilityRefeRredToProvidedWithDrugRehab: "",
    facilityRefferedToOfferedMhpss: "",
    facilityRefferedToOnMedicalAssistedTherapy: "",
    facilityRefferedToRecievedNalxoneForOverdoseTreatment: "",
  });

  const handleInputChange = (e) => {
    //console.log(e.target.value)
    setErrors({ ...temp, [e.target.name]: "" });
    setDate({ ...date, [e.target.name]: e.target.value });
  };
  const handleInputChangeReferred = (e) => {
    //console.log(e.target.value)
    setErrors({ ...temp, [e.target.name]: "" });
    setFacilityRefferedToo({
      ...facilityRefferedToo,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputChangeHtsService = (e) => {
    //console.log(e.target.value)
    setErrors({ ...temp, [e.target.name]: "" });
    setHtsServices({ ...htsServices, [e.target.name]: e.target.value });
  };
  const handleInputChangePrepServices = (e) => {
    //console.log(e.target.value)
    setErrors({ ...temp, [e.target.name]: "" });
    setPrepServices({ ...prepServices, [e.target.name]: e.target.value });
  };
  const handleInputChangeCommodityServices = (e) => {
    //console.log(e.target.value)
    setErrors({ ...temp, [e.target.name]: "" });
    setCommodityService({
      ...commodityService,
      [e.target.name]: e.target.value,
    });
  };
  const handleInputChangeHivEducationProvided = (e) => {
    //console.log(e.target.value)
    setErrors({ ...temp, [e.target.name]: "" });
    setHivEducationProvided({
      ...hivEducationProvided,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputChangebioMedicalServices = (e) => {
    setErrors({ ...temp, [e.target.name]: "" });
    if (e.target.name === "screenedForTb" && e.target.value === "yes") {
      bioMedicalServices.providedWithTpt = "";
    } else if (e.target.name === "screenedForTb" && e.target.value === "no") {
      bioMedicalServices.tbtreatmentrefferal = "";
    }
    setbioMedicalServices({
      ...bioMedicalServices,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputChangestructuralServices = (e) => {
    //console.log(e.target.value)
    setErrors({ ...temp, [e.target.name]: "" });
    setstructuralServices({
      ...structuralServices,
      [e.target.name]: e.target.value,
    });
  };

  //Validations of the forms
  const validateAttempt = () => {
    temp.dateServiceOffered = date.dateServiceOffered
      ? ""
      : "This field is required";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  /* Remove  function **/

  /**** Submit Button Processing  */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateAttempt()) {
      const biomedicalServiceValue = {
        medical_assisted_therapy_for_six_months:
          bioMedicalServices.onMedicalAssistedTherapy,
        offered_family_planning_services:
          bioMedicalServices.offeredFamilyPlanningServices,
        offered_mhpss: bioMedicalServices.offeredMhpss,
        provided_with_drug_rehab: bioMedicalServices.providedWithDrugRehab,
        provided_with_tpt: bioMedicalServices.providedWithTpt,
        received_naloxone_for_overdose_treatment:
          bioMedicalServices.recivedNalxoneForOverdoseTreatment,
        referred_for_family_planning_services:
          bioMedicalServices.referredForFamilyPlanningServices,
        screened_for_tb: bioMedicalServices.screenedForTb,
        screened_for_viral_hepatitis:
          bioMedicalServices.screenedForViralHepatits,
        sti_screening: bioMedicalServices.stiScreening,
        sti_syndromic_management: bioMedicalServices.stiSyndromicManagement,
        sti_treatment: bioMedicalServices.stiTreatment,
        vaccination_for_viral_hepatitis:
          bioMedicalServices.vaccinationForViralHepatits,
        viral_hepatitis_screen_result:
          bioMedicalServices.viralHepatitsScreenResult,
        sti_screening_result: bioMedicalServices.stiScreeningResult,
        sti_facility_referred: bioMedicalServices.stifacilityReffered,
        tb_facility_reffered: bioMedicalServices.tbfacilityReffered,
        type_of_mhpss: bioMedicalServices.typeofMhpss,
        drug_rehab_facility_reffered:
          bioMedicalServices.drugRehabfacilityReffered,
        referred_facility_drug_rehab:
          bioMedicalServices.refferedfacilitydrugrehab,
          tb_treatment_refferal:
                    bioMedicalServices.tbtreatmentrefferal,

      };

      const commodityServicesValue = {
        condoms_dispensed: commodityService.condomDispensed,
        hivst_kits_dispensed: commodityService.oralQuickDispensed,
        lubricants_dispensed: commodityService.lubricantsDispensed,
        naloxane_provided: commodityService.nalxoneProvided,
        new_needles_dispensed: commodityService.newNeedleDispensed,
        old_needles_dispensed: commodityService.oldNeedleRetrived,
        how_many_condom_dispensed: commodityService.howmanycondomDispensed,
        how_many_lubricants_dispensed:
          commodityService.howmanylubricantsDispensed,
        how_many_oral_quick_dispensed:
          commodityService.howmanyoralQuickDispensed,
        how_many_new_needle_dispensed:
          commodityService.howmanynewNeedleDispensed,
        how_many_old_needle_retrived: commodityService.howmanyoldNeedleRetrived,
        how_many_nalxone_provided: commodityService.howmanynalxoneProvided,
      };

      const htsServicesValue = {
        accepted_hts: htsServices.acceptedHts,
        hiv_test_result: htsServices.hivTestResult,
        offered_hts: htsServices.offeredHts,
        referred_for_art: htsServices.referredForArt,
      };

      const prepServicesValue = {
        accepted_prep: prepServices.acceptedPrep,
        offered_prep: prepServices.offeredPrep,
        referred_for_prep: prepServices.referredForPrep,
      };

      const structuralServicesValue = {
        legalAidServices: structuralServices.legalAidServiceType,
        providedEmpowerment:
          structuralServices.providedOrRefferedForEmpowerment,
        type_empowerment_provided: structuralServices.typeempowermentprovided,
        typelegalempowerment: structuralServices.typelegalempowerment,
        legalprogramreferred: structuralServices.legalprogramreferred,
      };

      const data = {
        htsCode: kpprevValues?.htsCode,
        prepCode: kpprevValues?.prepCode,
        prevCode: kpprevValues.prevCode,
        patientId: kpprevValues.uuid,
        serviceProvider: date.service_provider,
        target_group: kpprevValues.target_group,
        dateServiceOffered: date.dateServiceOffered,
        htsServices: htsServicesValue,
        prepServices: prepServicesValue,
        entryPoint: {},
        bioMedicalServices: biomedicalServiceValue,
        structuralServices: structuralServicesValue,
        commodityServices: commodityServicesValue,
        hivEducationalServices: hivEducationProvided,
      };
      console.log("update", data);
      setSaving(true);
      axios
        .put(`${baseUrl}kpprev/${kpprevValues.id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response);
          setSaving(false);
          toast.success("Record Updated successfully");
          setDate({
            dateServiceOffered: "",
            service_provider: "",
          });
          setHtsServices({
            offeredHts: "",
            acceptedHts: "",
            hivTestResult: "",
            referredForArt: "",
          });
          setPrepServices({
            offeredPrep: "",
            acceptedPrep: "",
            referredForPrep: "",
          });
          setCommodityService({
            condomDispensed: "",
            lubricantsDispensed: "",
            oralQuickDispensed: "",
            newNeedleDispensed: "",
            oldNeedleRetrived: "",
            nalxoneProvided: "",
            howmanycondomDispensed: "",
            howmanylubricantsDispensed: "",
            howmanyoralQuickDispensed: "",
            howmanynewNeedleDispensed: "",
            howmanyoldNeedleRetrived: "",
            howmanynalxoneProvided: "",
          });
          setHivEducationProvided({
            iecMaterial: "",
            interPersonalCommunication: "",
            peerGroupCommunication: "",
          });
          setbioMedicalServices({
            stiScreening: "",
            stiSyndromicManagement: "",
            stiTreatment: "",
            screenedForTb: "",
            providedWithTpt: "",
            screenedForViralHepatits: "",
            viralHepatitsScreenResult: "",
            vaccinationForViralHepatits: "",
            offeredFamilyPlanningServices: "",
            referredForFamilyPlanningServices: "",
            providedWithDrugRehab: "",
            offeredMhpss: "",
            onMedicalAssistedTherapy: "",
            recivedNalxoneForOverdoseTreatment: "",
            stiScreeningResult: "",
            stifacilityReffered: "",
            tbfacilityReffered: "",
            typeofMhpss: "",
            drugRehabfacilityReffered: "",
          });
          setstructuralServices({
            providedOrRefferedForEmpowerment: "",
            legalAidServiceType: "",
            peerGroupCommunication: "",
            typeempowermentprovided: "",
            typelegalempowerment: "",
            legalprogramreferred: "",
          });
          history.push("/");
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
    }
  };

  return (
    <div>
      <Card className={classes.root}>
        <CardBody>
          <Row>
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
          </Row>
          <br />
          <Row>
            <form>
              {/* <div className="card d-flex"> */}
              <div
                className="card-header"
                style={{
                  backgroundColor: "#014d88",
                  color: "#fff",
                  fontWeight: "bolder",
                  borderRadius: "0.2rem",
                }}
              >
                <h5 className="card-title" style={{ color: "#fff" }}>
                  KEY POPULATION PREVENTION FORM
                </h5>
              </div>

              <div className="row d-flex">
                <div className="form-group mb-3 col-md-4 ">
                  <br />
                  <FormGroup>
                    <Label>Date Of Service Provisions</Label>
                    <Input
                      type="date"
                      name="dateServiceOffered"
                      value={date.dateServiceOffered}
                      onChange={handleInputChange}
                      id="dateServiceOffered"
                      max={moment(new Date()).format("YYYY-MM-DD")}
                      style={{
                        border: "1px solid #014D88",
                        borderRadius: "0.25rem",
                      }}
                    ></Input>
                    {errors.dateServiceOffered !== "" ? (
                      <span className={classes.error}>
                        {errors.dateServiceOffered}
                      </span>
                    ) : (
                      ""
                    )}
                  </FormGroup>
                </div>
                <div className="form-group mb-3 col-md-4 ">
                  <br />
                  <FormGroup>
                    <Label>Hospital Number</Label>
                    <Input
                      type="text"
                      name="hospitalNumber"
                      value={
                        kpprevValues.htsCode !== null
                          ? kpprevValues.htsCode
                          : kpprevValues.prepCode
                      }
                      // onChange={handleInputChange}
                      id="hospitalNumber"
                      style={{
                        border: "1px solid #014D88",
                        borderRadius: "0.25rem",
                      }}
                      readonly
                    ></Input>
                    {errors.dateServiceOffered !== "" ? (
                      <span className={classes.error}>
                        {errors.dateServiceOffered}
                      </span>
                    ) : (
                      ""
                    )}
                  </FormGroup>
                </div>
                <div className="form-group mb-3 col-md-4 ">
                  <br />
                  <FormGroup>
                    <Label>Prevention Code</Label>
                    <Input
                      type="text"
                      name="PrevCode"
                      value={kpprevValues.prevCode}
                      // onChange={handleInputChange}
                      id="PrevCode"
                      style={{
                        border: "1px solid #014D88",
                        borderRadius: "0.25rem",
                      }}
                      readonly
                    ></Input>
                    {errors.dateServiceOffered !== "" ? (
                      <span className={classes.error}>
                        {errors.dateServiceOffered}
                      </span>
                    ) : (
                      ""
                    )}
                  </FormGroup>
                </div>
                {/* HTS service */}

                <LabelSui
                  as="a"
                  color="teal"
                  style={{
                    width: "100%",
                    height: "45px",
                    marginBottom: "10px",
                  }}
                  ribbon
                >
                  <h2 style={{ color: "#fff" }}>HTS Services</h2>
                </LabelSui>
                <br />
                <br />

                <div className="form-group mb-10 col-xs-6 col-md-3 ">
                  <FormGroup>
                    <Label>Offered HTS</Label>
                    <Input
                      type="select"
                      name="offeredHts"
                      id="offeredHts"
                      onChange={handleInputChangeHtsService}
                      value={htsServices.offeredHts}
                      style={{
                        border: "1px solid #014D88",
                        borderRadius: "0.25rem",
                      }}
                    >
                      <option value="">Select</option>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </Input>
                  </FormGroup>
                </div>
                <div className="form-group mb-3 col-xs-6 col-md-3 ">
                  <FormGroup>
                    <Label>Accepted HTS</Label>
                    <Input
                      type="select"
                      name="acceptedHts"
                      id="acceptedHts"
                      onChange={handleInputChangeHtsService}
                      value={htsServices.acceptedHts}
                      style={{
                        border: "1px solid #014D88",
                        borderRadius: "0.25rem",
                      }}
                    >
                      <option value="">Select</option>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </Input>
                  </FormGroup>
                </div>
                {htsServices.acceptedHts === "1" ? (
                  <div className="form-group mb-3 col-xs-6 col-md-3 ">
                    <FormGroup>
                      <Label>Hiv Test Result</Label>
                      <Input
                        type="select"
                        name="hivTestResult"
                        id="hivTestResult"
                        onChange={handleInputChangeHtsService}
                        value={htsServices.hivTestResult}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      >
                        <option value="">Select</option>
                        <option value="positive">Positive</option>
                        <option value="negative">Negative</option>
                      </Input>
                    </FormGroup>
                  </div>
                ) : (
                  ""
                )}
                {htsServices.hivTestResult === "positive" ? (
                  <div className="form-group mb-3 col-xs-6 col-md-3 ">
                    <FormGroup>
                      <Label>Reffered for ART</Label>
                      <Input
                        type="select"
                        name="referredForArt"
                        id="referredForArt"
                        onChange={handleInputChangeHtsService}
                        value={htsServices.referredForArt}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      >
                        <option value="">Select</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </Input>
                    </FormGroup>
                  </div>
                ) : (
                  ""
                )}

                <LabelSui
                  as="a"
                  color="teal"
                  style={{
                    width: "100%",
                    height: "45px",
                    marginBottom: "10px",
                  }}
                  ribbon
                >
                  <h2 style={{ color: "#fff" }}>PreP Services</h2>
                </LabelSui>
                <br />
                <br />
                <div className="form-group mb-3 col-md-4 ">
                  <FormGroup>
                    <Label>Offered Prep</Label>
                    <Input
                      type="select"
                      name="offeredPrep"
                      id="offeredPrep"
                      onChange={handleInputChangePrepServices}
                      value={prepServices.offeredPrep}
                      style={{
                        border: "1px solid #014D88",
                        borderRadius: "0.25rem",
                      }}
                    >
                      <option value="">Select</option>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </Input>
                  </FormGroup>
                </div>
                <div className="form-group mb-3 col-md-4 ">
                  <FormGroup>
                    <Label>Accepted PreP</Label>
                    <Input
                      type="select"
                      name="acceptedPrep"
                      id="acceptedPrep"
                      onChange={handleInputChangePrepServices}
                      value={prepServices.acceptedPrep}
                      style={{
                        border: "1px solid #014D88",
                        borderRadius: "0.25rem",
                      }}
                    >
                      <option value="">Select</option>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </Input>
                  </FormGroup>
                </div>
                <div className="form-group mb-3 col-md-4 ">
                  <FormGroup>
                    <Label>Reffered for Prep</Label>
                    <Input
                      type="select"
                      name="referredForPrep"
                      id="referredForPrep"
                      onChange={handleInputChangePrepServices}
                      value={prepServices.referredForPrep}
                      style={{
                        border: "1px solid #014D88",
                        borderRadius: "0.25rem",
                      }}
                    >
                      <option value="">Select</option>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </Input>
                  </FormGroup>
                </div>

                <div className="row">
                  <LabelSui
                    as="a"
                    color="blue"
                    style={{
                      width: "100%",
                      height: "45px",
                      marginBottom: "10px",
                    }}
                    ribbon
                  >
                    <h2 style={{ color: "#fff" }}>Commodity Service</h2>
                  </LabelSui>

                  <div className="form-group mb-3 col-md-3 ">
                    <FormGroup>
                      <Label>Condom Dispensed</Label>
                      <Input
                        type="select"
                        name="condomDispensed"
                        id="condomDispensed"
                        onChange={handleInputChangeCommodityServices}
                        value={commodityService.condomDispensed}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </Input>
                    </FormGroup>
                  </div>
                  {commodityService.condomDispensed === "yes" && (
                    <div className="form-group mb-3 col-md-3">
                      <FormGroup>
                        <Label>How Many Condom Dispensed</Label>
                        <Input
                          type="number"
                          name="howmanycondomDispensed"
                          id="howmanycondomDispensed"
                          onChange={handleInputChangeCommodityServices}
                          value={commodityService.howmanycondomDispensed}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.25rem",
                          }}
                        ></Input>
                      </FormGroup>
                    </div>
                  )}

                  <div className="form-group mb-3 col-md-3 ">
                    <FormGroup>
                      <Label>Lubricants Dispensed</Label>
                      <Input
                        type="select"
                        name="lubricantsDispensed"
                        id="lubricantsDispensed"
                        onChange={handleInputChangeCommodityServices}
                        value={commodityService.lubricantsDispensed}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </Input>
                    </FormGroup>
                  </div>
                  {commodityService.lubricantsDispensed === "yes" && (
                    <div className="form-group mb-3 col-md-3 ">
                      <FormGroup>
                        <Label>How Many Lubricants Dispensed</Label>
                        <Input
                          type="number"
                          name="howmanylubricantsDispensed"
                          id="howmanylubricantsDispensed"
                          onChange={handleInputChangeCommodityServices}
                          value={commodityService.howmanylubricantsDispensed}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.25rem",
                          }}
                        ></Input>
                      </FormGroup>
                    </div>
                  )}

                  <div className="form-group mb-3 col-md-3 ">
                    <FormGroup>
                      <Label>Oral Quick/ HIVST dispensed</Label>
                      <Input
                        type="select"
                        name="oralQuickDispensed"
                        id="oralQuickDispensed"
                        onChange={handleInputChangeCommodityServices}
                        value={commodityService.oralQuickDispensed}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </Input>
                    </FormGroup>
                  </div>
                  {commodityService.oralQuickDispensed === "yes" && (
                    <div className="form-group mb-3 col-md-3">
                      <FormGroup>
                        <Label>How Many Oral Quick/ HIVST dispensed</Label>
                        <Input
                          type="number"
                          name="howmanyoralQuickDispensed"
                          id="howmanyoralQuickDispensed"
                          onChange={handleInputChangeCommodityServices}
                          value={commodityService.howmanyoralQuickDispensed}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.25rem",
                          }}
                        ></Input>
                      </FormGroup>
                    </div>
                  )}

                  <div className="form-group mb-3 col-md-3 ">
                    <FormGroup>
                      <Label>New Needles/Syringe Dispesend</Label>
                      <Input
                        type="select"
                        name="newNeedleDispensed"
                        id="newNeedleDispensed"
                        onChange={handleInputChangeCommodityServices}
                        value={commodityService.newNeedleDispensed}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </Input>
                    </FormGroup>
                  </div>
                  {commodityService.newNeedleDispensed === "yes" && (
                    <div className="form-group mb-3 col-md-3 ">
                      <FormGroup>
                        <Label>How Many New Needles/Syringe Dispesend</Label>
                        <Input
                          type="number"
                          name="howmanynewNeedleDispensed"
                          id="howmanynewNeedleDispensed"
                          onChange={handleInputChangeCommodityServices}
                          value={commodityService.howmanynewNeedleDispensed}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.25rem",
                          }}
                        ></Input>
                      </FormGroup>
                    </div>
                  )}

                  <div className="form-group mb-3 col-md-3 ">
                    <FormGroup>
                      <Label>Old Needles/Syringe Retrived</Label>
                      <Input
                        type="select"
                        name="oldNeedleRetrived"
                        id="oldNeedleRetrived"
                        onChange={handleInputChangeCommodityServices}
                        value={commodityService.oldNeedleRetrived}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </Input>
                    </FormGroup>
                  </div>
                  {commodityService.oldNeedleRetrived === "yes" && (
                    <div className="form-group mb-3 col-md-3">
                      <FormGroup>
                        <Label>Old Needles/Syringe Retrived</Label>
                        <Input
                          type="number"
                          name="howmanyoldNeedleRetrived"
                          id="howmanyoldNeedleRetrived"
                          onChange={handleInputChangeCommodityServices}
                          value={commodityService.howmanyoldNeedleRetrived}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.25rem",
                          }}
                        ></Input>
                      </FormGroup>
                    </div>
                  )}

                  <div className="form-group mb-3 col-md-3 ">
                    <FormGroup>
                      <Label>Nalxone Provided</Label>
                      <Input
                        type="select"
                        name="nalxoneProvided"
                        id="nalxoneProvided"
                        onChange={handleInputChangeCommodityServices}
                        value={commodityService.nalxoneProvided}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </Input>
                    </FormGroup>
                  </div>
                  {commodityService.nalxoneProvided === "yes" && (
                    <div className="form-group mb-3 col-md-3">
                      <FormGroup>
                        <Label>How Many Nalxone Provided</Label>
                        <Input
                          type="number"
                          name="howmanynalxoneProvided"
                          id="howmanynalxoneProvided"
                          onChange={handleInputChangeCommodityServices}
                          value={commodityService.howmanynalxoneProvided}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.25rem",
                          }}
                        ></Input>
                      </FormGroup>
                    </div>
                  )}
                </div>

                <div className="row">
                  <LabelSui
                    as="a"
                    color="blue"
                    style={{
                      width: "106%",
                      height: "45px",
                      marginBottom: "10px",
                    }}
                    ribbon
                  >
                    <h2 style={{ color: "#fff" }}>HIV Educaton Provided</h2>
                  </LabelSui>
                  <div className="form-group mb-3 col-md-4 ">
                    <FormGroup>
                      <Label>IEC materials/pamphlets provided </Label>
                      <Input
                        type="select"
                        name="iecMaterial"
                        id="iecMaterial"
                        onChange={handleInputChangeHivEducationProvided}
                        value={hivEducationProvided.iecMaterial}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </Input>
                    </FormGroup>
                  </div>

                  <div className="form-group mb-3 col-md-4 ">
                    <FormGroup>
                      <Label>InterPersonal Communication</Label>
                      <Input
                        type="select"
                        name="interPersonalCommunication"
                        id="interPersonalCommunication"
                        onChange={handleInputChangeHivEducationProvided}
                        value={hivEducationProvided.interPersonalCommunication}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </Input>
                    </FormGroup>
                  </div>
                  <div className="form-group mb-3 col-md-4 ">
                    <FormGroup>
                      <Label>Peer Group Communication</Label>
                      <Input
                        type="select"
                        name="peerGroupCommunication"
                        id="peerGroupCommunication"
                        onChange={handleInputChangeHivEducationProvided}
                        value={hivEducationProvided.peerGroupCommunication}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </Input>
                    </FormGroup>
                  </div>
                </div>
              </div>
              <br />
              {/* <div className='card'> */}

              <div className=" row d-flex">
                <div className="row">
                  <LabelSui
                    as="a"
                    color="blue"
                    style={{
                      width: "106%",
                      height: "45px",
                      marginBottom: "10px",
                    }}
                    ribbon
                  >
                    <h2 style={{ color: "#fff" }}>Biomedical Services</h2>
                  </LabelSui>

                  <div className="row">
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label>STI Screening</Label>
                        <Input
                          type="select"
                          name="stiScreening"
                          id="stiScreening"
                          value={bioMedicalServices.stiScreening}
                          onChange={handleInputChangebioMedicalServices}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.25rem",
                          }}
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </Input>
                      </FormGroup>
                    </div>
                    {bioMedicalServices.stiScreening === "yes" && (
                      <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label>STI Screening Result</Label>
                          <Input
                            type="select"
                            name="stiScreeningResult"
                            id="stiScreeningResult"
                            value={bioMedicalServices.stiScreeningResult}
                            onChange={handleInputChangebioMedicalServices}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.25rem",
                            }}
                          >
                            <option value="">Select</option>
                            <option value="positive">Positive</option>
                            <option value="negative">Negative</option>
                          </Input>
                        </FormGroup>
                      </div>
                    )}
                    {bioMedicalServices.stiScreeningResult === "positive" && (
                      <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label>STI Treatment/ Referral</Label>
                          <Input
                            type="select"
                            name="stiTreatment"
                            id="stiTreatment"
                            value={bioMedicalServices.stiTreatment}
                            onChange={handleInputChangebioMedicalServices}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.25rem",
                            }}
                          >
                            <option value=""> Select </option>
                            <option value="yes"> Yes </option>
                            <option value="no"> No </option>
                          </Input>
                        </FormGroup>
                      </div>
                    )}

                    {bioMedicalServices.stiTreatment === "yes" && (
                      <div className="form-group mb-3 col-md-4">
                        <Label> Facility Refferred to </Label>
                        <Input
                          type="text"
                          name="stifacilityReffered"
                          id="stifacilityReffered"
                          value={bioMedicalServices.stifacilityReffered}
                          onChange={handleInputChangebioMedicalServices}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.25rem",
                          }}
                        />
                      </div>
                    )}

                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label>STI Syndromic Management</Label>
                        <Input
                          type="select"
                          name="stiSyndromicManagement"
                          id="stiSyndromicManagement"
                          value={bioMedicalServices.stiSyndromicManagement}
                          onChange={handleInputChangebioMedicalServices}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.25rem",
                          }}
                        >
                          <option value="">Select</option>
                          <option value="1">Yes</option>
                          <option value="0">No</option>
                        </Input>
                      </FormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label>Screened for TB</Label>
                        <Input
                          type="select"
                          name="screenedForTb"
                          id="screenedForTb"
                          value={bioMedicalServices.screenedForTb}
                          onChange={handleInputChangebioMedicalServices}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.25rem",
                          }}
                        >
                          <option value=""> Select </option>
                          <option value="yes"> Yes </option>
                          <option value="no"> No </option>
                        </Input>
                      </FormGroup>
                    </div>
                    {bioMedicalServices.screenedForTb === "no" && (
                      <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label>Provided with TPT</Label>
                          <Input
                            type="select"
                            name="providedWithTpt"
                            id="providedWithTpt"
                            value={bioMedicalServices.providedWithTpt}
                            onChange={handleInputChangebioMedicalServices}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.25rem",
                            }}
                          >
                            <option value=""> Select </option>
                            <option value="yes"> Yes </option>
                            <option value="no"> No </option>
                          </Input>
                        </FormGroup>
                      </div>
                    )}
                    {bioMedicalServices.screenedForTb === "yes" && (
                      <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label>TB treatment/referral </Label>
                          <Input
                            type="select"
                            name="tbtreatmentrefferal"
                            id="tbtreatmentrefferal"
                            value={bioMedicalServices.tbtreatmentrefferal}
                            onChange={handleInputChangebioMedicalServices}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.25rem",
                            }}
                          >
                            <option value=""> Select </option>
                            <option value="yes"> Yes </option>
                            <option value="no"> No </option>
                          </Input>
                        </FormGroup>
                      </div>
                    )}
                    {bioMedicalServices.tbtreatmentrefferal === "yes" && (
                      <div className="form-group mb-3 col-md-4">
                        <Label> Facility Refferred to </Label>
                        <Input
                          type="text"
                          name="tbfacilityReffered"
                          id="tbfacilityReffered"
                          value={bioMedicalServices.tbfacilityReffered}
                          onChange={handleInputChangebioMedicalServices}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.25rem",
                          }}
                        />
                      </div>
                    )}
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label>Screened For Viral Heaptits</Label>
                        <Input
                          type="select"
                          name="screenedForViralHepatits"
                          id="screenedForViralHepatits"
                          value={bioMedicalServices.screenedForViralHepatits}
                          onChange={handleInputChangebioMedicalServices}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.25rem",
                          }}
                        >
                          <option value=""> Select </option>
                          <option value="yes"> Yes </option>
                          <option value="no"> No </option>
                        </Input>
                      </FormGroup>
                    </div>
                    {bioMedicalServices.screenedForViralHepatits === "yes" && (
                      <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label>Viral Hepatits Screen Result</Label>
                          <Input
                            type="select"
                            name="viralHepatitsScreenResult"
                            id="viralHepatitsScreenResult"
                            value={bioMedicalServices.viralHepatitsScreenResult}
                            onChange={handleInputChangebioMedicalServices}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.25rem",
                            }}
                          >
                            <option value=""> Select </option>
                            <option value="positive"> Positive </option>
                            <option value="negative"> Negative</option>
                          </Input>
                        </FormGroup>
                      </div>
                    )}

                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label>Vaccination For Viral Hepatits</Label>
                        <Input
                          type="select"
                          name="vaccinationForViralHepatits"
                          id="vaccinationForViralHepatits"
                          value={bioMedicalServices.vaccinationForViralHepatits}
                          onChange={handleInputChangebioMedicalServices}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.25rem",
                          }}
                        >
                          <option value=""> Select </option>
                          <option value="Yes"> Yes </option>
                          <option value="No"> No </option>
                        </Input>
                        {/* {errors.discontinuation !== "" ? (
                    <span className={classes.error}>
                      {errors.discontinuation}
                    </span>
                  ) : (
                    ""
                  )} */}
                      </FormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label>Offered Family Planning Services</Label>
                        <Input
                          type="select"
                          name="offeredFamilyPlanningServices"
                          id="offeredFamilyPlanningServices"
                          value={
                            bioMedicalServices.offeredFamilyPlanningServices
                          }
                          onChange={handleInputChangebioMedicalServices}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.25rem",
                          }}
                        >
                          <option value=""> Select </option>
                          <option value="yes"> Yes </option>
                          <option value="no"> No </option>
                        </Input>
                      </FormGroup>
                    </div>
                    {bioMedicalServices.offeredFamilyPlanningServices ===
                      "yes" && (
                      <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label>Refferred For Family Planning Services</Label>
                          <Input
                            type="select"
                            name="referredForFamilyPlanningServices"
                            id="referredForFamilyPlanningServices"
                            value={
                              bioMedicalServices.referredForFamilyPlanningServices
                            }
                            onChange={handleInputChangebioMedicalServices}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.25rem",
                            }}
                          >
                            <option value=""> Select </option>
                            <option value="Yes"> Yes </option>
                            <option value="No"> No </option>
                          </Input>
                        </FormGroup>
                      </div>
                    )}

                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label>Provided With Drug Rehab</Label>
                        <Input
                          type="select"
                          name="providedWithDrugRehab"
                          id="providedWithDrugRehab"
                          value={bioMedicalServices.providedWithDrugRehab}
                          onChange={handleInputChangebioMedicalServices}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.25rem",
                          }}
                        >
                          <option value=""> Select </option>
                          <option value="yes"> Yes </option>
                          <option value="no"> No </option>
                        </Input>
                      </FormGroup>
                    </div>
                    {bioMedicalServices.providedWithDrugRehab === "yes" && (
                      <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label>Offered MHPSS</Label>
                          <Input
                            type="select"
                            name="offeredMhpss"
                            id="offeredMhpss"
                            value={bioMedicalServices.offeredMhpss}
                            onChange={handleInputChangebioMedicalServices}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.25rem",
                            }}
                          >
                            <option value=""> Select </option>
                            <option value="yes"> Yes </option>
                            <option value="no"> No </option>
                          </Input>
                        </FormGroup>
                      </div>
                    )}

                    {bioMedicalServices.offeredMhpss === "yes" && (
                      <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label>Type of MHPSS Provided</Label>
                          <Input
                            type="select"
                            name="typeofMhpss"
                            id="typeofMhpss"
                            value={bioMedicalServices.typeofMhpss}
                            onChange={handleInputChangebioMedicalServices}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.25rem",
                            }}
                          >
                            <option value=""> Select </option>
                            <option value="yes"> Yes </option>
                            <option value="no"> No </option>
                          </Input>
                        </FormGroup>
                      </div>
                    )}

                    {bioMedicalServices.providedWithDrugRehab === "yes" && (
                      <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label>Referred to facility for Drug Rehab </Label>
                          <Input
                            type="select"
                            name="refferedfacilitydrugrehab"
                            id="refferedfacilitydrugrehab"
                            value={bioMedicalServices.refferedfacilitydrugrehab}
                            onChange={handleInputChangebioMedicalServices}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.25rem",
                            }}
                          >
                            <option value=""> Select </option>
                            <option value="yes"> Yes </option>
                            <option value="no"> No </option>
                          </Input>
                        </FormGroup>
                      </div>
                    )}

                    {bioMedicalServices.refferedfacilitydrugrehab === "yes" && (
                      <div className="form-group mb-3 col-md-4">
                        <Label>Drug Rehab Facility Refferred to </Label>
                        <Input
                          type="text"
                          name="drugRehabfacilityReffered"
                          id="drugRehabfacilityReffered"
                          value={bioMedicalServices.drugRehabfacilityReffered}
                          onChange={handleInputChangebioMedicalServices}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.25rem",
                          }}
                        />
                      </div>
                    )}

                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label>
                          On Medical Assisted Therapy (MAT) for atleast 6 months
                        </Label>
                        <Input
                          type="select"
                          name="onMedicalAssistedTherapy"
                          id="onMedicalAssistedTherapy"
                          value={bioMedicalServices.onMedicalAssistedTherapy}
                          onChange={handleInputChangebioMedicalServices}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.25rem",
                          }}
                        >
                          <option value=""> Select </option>
                          <option value="yes"> Yes </option>
                          <option value="no"> No </option>
                        </Input>
                      </FormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label>Recived Nalxone for Overdose Treatment</Label>
                        <Input
                          type="select"
                          name="recivedNalxoneForOverdoseTreatment"
                          id="recivedNalxoneForOverdoseTreatment"
                          value={
                            bioMedicalServices.recivedNalxoneForOverdoseTreatment
                          }
                          onChange={handleInputChangebioMedicalServices}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.25rem",
                          }}
                        >
                          <option value=""> Select </option>
                          <option value="yes"> Yes </option>
                          <option value="no"> No </option>
                        </Input>
                      </FormGroup>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <LabelSui
                    as="a"
                    color="blue"
                    style={{
                      width: "106%",
                      height: "45px",
                      marginBottom: "10px",
                    }}
                    ribbon
                  >
                    <h2 style={{ color: "#fff" }}> Structural Services </h2>
                  </LabelSui>
                  <br />
                  <br />
                  <div className="form-group mb-3 col-md-6">
                    <FormGroup>
                      <Label>Provided or Reffered for Empowerment</Label>
                      <Input
                        type="select"
                        name="providedOrRefferedForEmpowerment"
                        id="providedOrRefferedForEmpowerment"
                        value={
                          structuralServices.providedOrRefferedForEmpowerment
                        }
                        onChange={handleInputChangestructuralServices}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      >
                        <option value=""> Select </option>
                        <option value="yes"> Yes </option>
                        <option value="no"> No </option>
                      </Input>
                    </FormGroup>
                    {structuralServices.recivedNalxoneForOverdoseTreatment ===
                      "yes" && (
                      <div className="form-group mb-3 col-md-4">
                        <Label> Type of Empowerment Provided </Label>
                        <Input
                          type="text"
                          name="typeempowermentprovided"
                          id="typeempowermentprovided"
                          value={structuralServices.typeempowermentprovided}
                          onChange={handleInputChangestructuralServices}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.25rem",
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="form-group mb-3 col-md-6">
                    <FormGroup>
                      <Label>Legal Aid Service Type</Label>
                      <Input
                        type="select"
                        name="legalAidServiceType"
                        id="legalAidServiceType"
                        value={structuralServices.legalAidServiceType}
                        onChange={handleInputChangestructuralServices}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      >
                        <option value=""> Select </option>
                        <option value="yes"> Yes </option>
                        <option value="no"> No </option>
                      </Input>
                    </FormGroup>
                  </div>
                  {structuralServices.legalAidServiceType === "yes" && (
                    <div className="form-group mb-3 col-md-6">
                      <Label> Type of Legal Empowerment Provided </Label>
                      <Input
                        type="text"
                        name="typelegalempowerment"
                        id="typelegalempowerment"
                        value={structuralServices.typelegalempowerment}
                        onChange={handleInputChangestructuralServices}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      />
                    </div>
                  )}
                  {structuralServices.legalAidServiceType === "yes" && (
                    <div className="form-group mb-3 col-md-6">
                      <Label> Legal Program referred </Label>
                      <Input
                        type="text"
                        name="legalprogramreferred"
                        id="legalprogramreferred"
                        value={structuralServices.legalprogramreferred}
                        onChange={handleInputChangestructuralServices}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="row">
                  <LabelSui
                    as="a"
                    color="blue"
                    style={{
                      width: "106%",
                      height: "45px",
                      marginBottom: "10px",
                    }}
                    ribbon
                  >
                    <h2 style={{ color: "#fff" }}> Service Provider </h2>
                  </LabelSui>

                  <div className="form-group mb-3 col-md-6">
                    <FormGroup>
                      <Label>Name of service provider</Label>
                      <Input
                        type="text"
                        name="service_provider"
                        id="service_provider"
                        value={date.service_provider}
                        onChange={handleInputChange}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      />

                      {/* {errors.discontinuation !== "" ? (
                    <span className={classes.error}>
                      {errors.discontinuation}
                    </span>
                  ) : (
                    ""
                  )} */}
                    </FormGroup>
                    {structuralServices.recivedNalxoneForOverdoseTreatment ===
                      "Yes" && (
                      <div className="form-group mb-3 col-md-4">
                        <Label> Facility Refferred to </Label>
                        <Input
                          type="text"
                          name="facilityRefferedToRecievedNalxoneForOverdoseTreatment"
                          id="facilityRefferedToRecievedNalxoneForOverdoseTreatment"
                          value={
                            facilityRefferedToo.facilityRefferedToRecievedNalxoneForOverdoseTreatment
                          }
                          onChange={handleInputChangestructuralServices}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.25rem",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                {/* </div> */}
              </div>
              {saving ? <Spinner /> : ""}
              <br />

              <MatButton
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<SaveIcon />}
                //hidden={props.activeContent.actionType === "view" ? true : false}
                onClick={handleSubmit}
                style={{ backgroundColor: "#014d88", color: "#ffffff" }}
                //disabled={attemptList.length <= 0 && !saving ? true : false}
              >
                <span style={{ textTransform: "capitalize" }}>Update</span>
              </MatButton>
              {/* </div> */}
            </form>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};
export default ViewUpdate;
