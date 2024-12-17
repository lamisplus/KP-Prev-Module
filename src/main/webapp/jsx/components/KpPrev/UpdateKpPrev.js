/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Card, CardBody, Label, Input } from "reactstrap";
import MatButton from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import { toast } from "react-toastify";
import "react-widgets/dist/css/react-widgets.css";
import * as moment from "moment";
import { Spinner } from "reactstrap";
import { Label as LabelSui } from "semantic-ui-react";
import "react-dual-listbox/lib/react-dual-listbox.css";
import { useQuery } from "react-query";
import {
  getCodesetsKey,
  getHtsCodeKey,
  getPatientHivEnrolmentKey,
  getPrepCodeKey,
  getProvincesKey,
  getStatesKey,
  getTargetGroupKey,
  getTbStatusKey,
  getMhpssKey,
  getStiTreatmentKey,
} from "../../utils/queryKeys";
import { fetchHtsCode } from "../../services/fetchHtsCode";
import { fetchPrepCode } from "../../services/fetchPrepCode";
import { useKpPrevFormValidationSchema } from "./UseKpPrevFormValidationSchema";
import CustomFormGroup from "../CustomFormGroup/CustomFormGroup";
import { useUpdateKpPrev } from "../../../hooks/useUpdateKpPrev";
import { fetchHivEnrolment } from "../../services/fetchHivEnrolment";
import { fetchCodesets } from "../../services/fetchCodesets";
import { fetchStates } from "../../services/fetchStates";
import { fetchProvinces } from "../../services/fetchProvinces";
import { getHospitalNumber } from "../../utils";

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

const UpdateKpPrev = (props) => {
  const patientObj = props.patientObj;
  const [htsCodeVal, setHtsCodeVal] = useState(null);
  const [prepCodeVal, setPrepCodeVal] = useState(null);
  const [, setPatientHivEnrolment] = useState(null);
  const [targetGroup, setTargetGroup] = useState([]);
  const [, setStateData] = useState([]);
  const [, setProvincesData] = useState([]);
  const [tbStatusData, setTbStatusData] = useState([]);
  const [stiTreatment, setStiTreatment] = useState([]);
  const [mhpssProvided, setMhpssProvided] = useState([]);
  const classes = useStyles();
  const disableInputs = props?.disableInputs;

  const handleSubmit = async (values) => {
    const biomedicalServiceValue = {
      medical_assisted_therapy_for_six_months: values?.onMedicalAssistedTherapy,
      offered_family_planning_services: values?.offeredFamilyPlanningServices,
      offered_mhpss: values?.offeredMhpss,
      provided_with_drug_rehab: values?.providedWithinDrugRehab,
      provided_with_tpt: values?.providedWithTpt,
      received_naloxone_for_overdose_treatment:
        values?.receivedNalxoneForOverdoseTreatment,
      referred_for_family_planning_services:
        values?.referredForFamilyPlanningServices,
      facility_referred_for_family_planning_services:
        formik?.values?.facilityReferredForFamilyPlanningServices,
      screened_for_tb: values?.screenedForTb,
      screened_for_viral_hepatitis: values?.screenedForViralHepatits,
      sti_screening: values?.stiScreening,
      sti_syndromic_management: values?.stiSyndromicManagement,
      sti_treatment: values?.stiTreatment,
      vaccination_for_viral_hepatitis: values?.vaccinationForViralHepatits,
      viral_hepatitis_screen_result: values?.viralHepatitsScreenResult,
      sti_screening_result: values?.stiScreeningResult,
      sti_facility_referred: values?.stiFacilityReffered,
      type_of_sti_treatment: values?.typeOfStiTreatment,
      tb_facility_reffered: values?.tbFacilityReffered,
      type_of_mhpss: values?.typeOfMhpss,
      drug_rehab_facility_reffered: values?.drugRehabFacilityReffered,
      referred_facility_drug_rehab: values?.refferedFacilityDrugRehab,
      tb_treatment_refferal: values?.tbTreatmentRefferal,

      // new variables
      patient_current_tb_status: values?.patientCurrentTbStatus,
      accepted_family_planning: values?.acceptedFamilyPlanningServices,
      facility_referred_for_viral_hepatitis:
        values?.facilityReferredToForViralHepatitis,
    };

    const commodityServicesValue = {
      condoms_dispensed: values?.condomDispensed,
      hivst_kits_dispensed: values?.oralQuickDispensed,
      lubricants_dispensed: values?.lubricantsDispensed,
      naloxane_provided: values?.nalxoneProvided,
      new_needles_dispensed: values?.newNeedleDispensed,
      old_needles_dispensed: values?.oldNeedleRetrieved,
      how_many_condom_dispensed: values?.howManyCondomDispensed,
      how_many_lubricants_dispensed: values?.howManyLubricantsDispensed,
      how_many_oral_quick_dispensed: values?.howManyOralQuickDispensed,
      how_many_new_needle_dispensed: values?.howManyNewNeedleDispensed,
      how_many_old_needle_retrived: values?.howManyOldNeedleRetrieved,
      how_many_nalxone_provided: values?.howManyNalxoneProvided,
    };

    const htsServicesValue = {
      accepted_hts: values?.acceptedHts,
      offered_hts: values?.offeredHts,
      referred_for_art: values?.referredForArt,
      known_positive: values?.knownPositive,
      hts_client_code: values?.htsClientCode,
      hts_final_result: values?.htsFinalResult,
    };

    const prepServicesValue = {
      accepted_prep: values?.acceptedPrep,
      offered_prep: values?.offeredPrep,
      referred_for_prep: values?.referredForPrep,
    };

    const structuralServicesValue = {
      legalAidServices: values?.legalAidServiceType,
      providedEmpowerment: values?.providedOrRefferedForEmpowerment,
      type_empowerment_provided: values?.typeEmpowermentprovided,
      typeLegalEmpowerment: values?.typeLegalEmpowerment,
      legalProgramReferred: values?.legalProgramReferred,
      empowermentProgramReferred: values?.empowermentProgramReferred,
    };

    const hivEducationProvided = {
      iecMaterial: values?.iecMaterial,
      interPersonalCommunication: values?.interPersonalCommunication,
      peerGroupCommunication: values?.peerGroupCommunication,
    };

    const payload = {
      htsCode: values?.htsClientCode,
      hivTestResult: values?.hivTestResult,
      prepCode: prepCodeVal?.prevCode,
      prevCode: formInitialValue?.prevCode,
      patientId: patientObj.uuid,
      kpOfferedHts: values?.kpOfferedHts,
      kpAcceptedHts: values?.kpAcceptedHts,
      kpHtsClientCode: values?.kpHtsClientCode,
      kpHtsFinalResult: values?.kpHtsFinalResult,
      kpPatientArtNumber: values?.kpPatientArtNumber,
      kpPatientHospitalNumber: values?.kpPatientHospitalNumber,
      kpKnownPositive: values?.kpKnownPositive,
      kpPatientTargetGroup: values?.kpPatientTargetGroup,
      kpPatientState: values?.kpPatientState,
      kpPatientProvince: values?.kpPatientProvince,
      patient_current_tb_status: values?.patientCurrentTbStatus,
      accepted_family_planning: values?.acceptedFamilyPlanningServices,
      facility_referred_for_viral_hepatitis:
        values?.facilityReferredToForViralHepatitis,
      serviceProvider: values?.serviceProvider,
      serviceProviderSignature: values?.serviceProviderSignature,
      target_group:
        values?.kpPatientTargetGroup || htsCodeVal?.htsClientDtoList?.length > 0
          ? htsCodeVal?.htsClientDtoList?.[0]?.targetGroup
          : prepCodeVal?.prepDtoList?.[0]?.targetGroup,
      dateServiceOffered: values?.dateServiceOffered,
      htsServices: htsServicesValue,
      prepServices: prepServicesValue,
      entryPoint: {},
      bioMedicalServices: biomedicalServiceValue,
      structuralServices: structuralServicesValue,
      commodityServices: commodityServicesValue,
      patientIdentifier: patientObj?.id?.toString() || patientObj?.personId?.toString(),
      hivEducationalServices: hivEducationProvided,
    };

    mutate({ data: payload, id: formInitialValue?.id });
  };

  const { formik } = useKpPrevFormValidationSchema(handleSubmit);
  const { mutate, isLoading } = useUpdateKpPrev(formik, props);
  const [formInitialValue] = useState(props?.activeContent?.record);

  const { isLoading: isLoadingHtsCode } = useQuery(
    [getHtsCodeKey, patientObj?.id || patientObj?.personId],
    () => fetchHtsCode(patientObj?.id || patientObj?.personId),
    {
      onSuccess: (data) => {
        setHtsCodeVal({
          htsCode: data.clientCode,
          hivStatus: data.hivPositive,
          htsClientDtoList: data.htsClientDtoList,
          ...data,
        });

        // auto populate HTS Client Code field if value is found
        if (data?.clientCode !== "" || data?.clientCode !== null) {
          formik?.setFieldValue("htsClientCode", data?.clientCode);
          formik?.setFieldValue("kpHtsClientCode", data?.clientCode);
        }
      },
      refetchOnMount: "always",
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

  const { isLoading: isLoadingPrepCode } = useQuery(
    [getPrepCodeKey, patientObj?.id || patientObj?.personId],
    () => fetchPrepCode(patientObj?.id || patientObj?.personId),
    {
      onSuccess: (data) => {
        setPrepCodeVal({
          prevCode: data.uniqueId,
          prepStatus: data.prepStatus,
          prepDtoList: data.prepDtoList,
        });
      },
      refetchOnMount: "always",

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

  useQuery([getStatesKey, 1], () => fetchStates(1), {
    onSuccess: (data) => {
      setStateData(data);
    },
    refetchOnMount: "always",
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
  });

  useQuery(
    [getCodesetsKey, getTargetGroupKey],
    () => fetchCodesets(getTargetGroupKey),
    {
      onSuccess: (data) => {
        setTargetGroup(data);
      },
      refetchOnMount: "always",
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

  useQuery(
    [getCodesetsKey, getTbStatusKey],
    () => fetchCodesets(getTbStatusKey),
    {
      onSuccess: (data) => {
        setTbStatusData(data);
      },
      refetchOnMount: "always",
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

  useQuery(
    [getCodesetsKey, getStiTreatmentKey],
    () => fetchCodesets(getStiTreatmentKey),
    {
      onSuccess: (data) => {
        setStiTreatment(data);
      },
      refetchOnMount: "always",
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

  useQuery([getCodesetsKey, getMhpssKey], () => fetchCodesets(getMhpssKey), {
    onSuccess: (data) => {
      setMhpssProvided(data);
    },
    refetchOnMount: "always",
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
  });

  useQuery(
    [getPatientHivEnrolmentKey, patientObj?.id || patientObj?.personId],
    () => fetchHivEnrolment(patientObj?.id || patientObj?.personId),
    {
      onSuccess: (data) => {
        setPatientHivEnrolment(data);
        if (
          data?.enrollment?.uniqueId !== "" ||
          data?.enrollment?.uniqueId !== null
        ) {
          formik?.setFieldValue("patientArtNumber", data?.enrollment?.uniqueId);
        }
      },
      refetchOnMount: "always",

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

  useQuery(
    [getPatientHivEnrolmentKey, patientObj?.id || patientObj?.personId],
    () => fetchHivEnrolment(patientObj?.id || patientObj?.personId),
    {
      onSuccess: (data) => {
        setPatientHivEnrolment(data);
        if (
          data?.enrollment?.uniqueId !== "" ||
          data?.enrollment?.uniqueId !== null
        ) {
          formik?.setFieldValue("patientArtNumber", data?.enrollment?.uniqueId);
        }
      },
      refetchOnMount: "always",

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

  useQuery(
    [
      getProvincesKey,
      formik?.values?.kpPatientState,
      formInitialValue?.kpPatientState,
    ],
    () => fetchProvinces(formik?.values?.kpPatientState),
    {
      onSuccess: (data) => {
        console.log("provinces data", data);
        setProvincesData(data);
      },
      refetchOnMount: "always",

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
      enabled: formik?.values?.kpPatientState === "" ? false : true,
    }
  );

  const newClient =
    htsCodeVal?.htsClientDtoList?.length === 0 ||
    prepCodeVal?.prepDtoList?.length === 0
      ? true
      : false;

  useEffect(() => {
    const initialValues = {
      prevCode: formInitialValue?.prevCode,
      htsCode: formInitialValue?.htsCode,
      prepCode: formInitialValue?.prepCode,
      dateServiceOffered: formInitialValue?.dateServiceOffered,
      serviceProvider: formInitialValue?.serviceProviderName,
      serviceProviderSignature: formInitialValue?.serviceProviderSignature,
      kpOfferedHts: formInitialValue?.kpOfferedHts,
      kpAcceptedHts: formInitialValue?.kpAcceptedHts,
      kpHtsClientCode: formInitialValue?.kpHtsClientCode,
      kpHtsFinalResult: formInitialValue?.kpHtsFinalResult,
      kpPatientArtNumber: formInitialValue?.kpPatientArtNumber,
      kpPatientHospitalNumber: formInitialValue?.kpPatientHospitalNumber || patientObj?.hospitalNumber ||  getHospitalNumber(patientObj),
      kpKnownPositive: formInitialValue?.kpKnownPositive,
      kpPatientTargetGroup: formInitialValue?.kpPatientTargetGroup,
      kpPatientState: formInitialValue?.kpPatientState,
      kpPatientProvince: formInitialValue?.kpPatientProvince,
      patientCurrentTbStatus:
        formInitialValue?.biomedicalServices?.patient_current_tb_status,
      accepted_family_planning:
        formInitialValue?.acceptedFamilyPlanningServices,

      legalAidServiceType:
        formInitialValue?.structuralServices?.legalAidServices,
      providedOrRefferedForEmpowerment:
        formInitialValue?.structuralServices?.providedEmpowerment,
      typeEmpowermentprovided:
        formInitialValue?.structuralServices?.type_empowerment_provided,
      typeLegalEmpowerment:
        formInitialValue?.structuralServices?.typeLegalEmpowerment,
      legalProgramReferred:
        formInitialValue?.structuralServices?.legalProgramReferred,
      empowermentProgramReferred:
        formInitialValue?.structuralServices?.empowermentProgramReferred,
      acceptedPrep: formInitialValue?.prepServices?.accepted_prep,
      offeredPrep: formInitialValue?.prepServices?.offered_prep,
      referredForPrep: formInitialValue?.prepServices?.referred_for_prep,
      acceptedHts: formInitialValue?.htsServices?.accepted_hts,
      hivTestResult: formInitialValue?.htsServices?.hiv_test_result,
      offeredHts: formInitialValue?.htsServices?.offered_hts,
      referredForArt: formInitialValue?.htsServices?.referred_for_art,
      htsFinalResult: formInitialValue?.htsServices?.hts_final_result,
      condomDispensed: formInitialValue?.commodityServices?.condoms_dispensed,

      oralQuickDispensed:
        formInitialValue?.commodityServices?.hivst_kits_dispensed,

      lubricantsDispensed:
        formInitialValue?.commodityServices?.lubricants_dispensed,
      nalxoneProvided: formInitialValue?.commodityServices?.naloxane_provided,
      newNeedleDispensed:
        formInitialValue?.commodityServices?.new_needles_dispensed,
      oldNeedleRetrieved:
        formInitialValue?.commodityServices?.old_needles_dispensed,
      howManyCondomDispensed:
        formInitialValue?.commodityServices?.how_many_condom_dispensed,
      howManyLubricantsDispensed:
        formInitialValue?.commodityServices?.how_many_lubricants_dispensed,
      howManyOralQuickDispensed:
        formInitialValue?.commodityServices?.how_many_oral_quick_dispensed,
      howManyNewNeedleDispensed:
        formInitialValue?.commodityServices?.how_many_new_needle_dispensed,
      howManyOldNeedleRetrieved:
        formInitialValue?.commodityServices?.how_many_old_needle_retrived,
      howManyNalxoneProvided:
        formInitialValue?.commodityServices?.how_many_nalxone_provided,

      onMedicalAssistedTherapy:
        formInitialValue?.biomedicalServices
          ?.medical_assisted_therapy_for_six_months,

      offeredFamilyPlanningServices:
        formInitialValue?.biomedicalServices?.offered_family_planning_services,

      facilityReferredForFamilyPlanningServices:
        formInitialValue?.biomedicalServices
          ?.facility_referred_for_family_planning_services,

      acceptedFamilyPlanningServices:
        formInitialValue?.biomedicalServices?.accepted_family_planning,
      offeredMhpss: formInitialValue?.biomedicalServices?.offered_mhpss,
      providedWithinDrugRehab:
        formInitialValue?.biomedicalServices?.provided_with_drug_rehab,
      providedWithTpt: formInitialValue?.biomedicalServices?.provided_with_tpt,
      receivedNalxoneForOverdoseTreatment:
        formInitialValue?.biomedicalServices
          ?.received_naloxone_for_overdose_treatment,
      referredForFamilyPlanningServices:
        formInitialValue?.biomedicalServices
          ?.referred_for_family_planning_services,

      facilityReferredToForViralHepatitis:
        formInitialValue?.biomedicalServices
          ?.facility_referred_for_viral_hepatitis,

      screenedForTb: formInitialValue?.biomedicalServices?.screened_for_tb,
      screenedForViralHepatits:
        formInitialValue?.biomedicalServices?.screened_for_viral_hepatitis,
      stiScreening: formInitialValue?.biomedicalServices?.sti_screening,
      typeOfStiTreatment:
        formInitialValue?.biomedicalServices?.type_of_sti_treatment,
      stiSyndromicManagement:
        formInitialValue?.biomedicalServices?.sti_syndromic_management,
      stiTreatment: formInitialValue?.biomedicalServices?.sti_treatment,
      vaccinationForViralHepatits:
        formInitialValue?.biomedicalServices?.vaccination_for_viral_hepatitis,
      viralHepatitsScreenResult:
        formInitialValue?.biomedicalServices?.viral_hepatitis_screen_result,
      stiScreeningResult:
        formInitialValue?.biomedicalServices?.sti_screening_result,
      stiFacilityReffered:
        formInitialValue?.biomedicalServices?.sti_facility_referred,
      tbFacilityReffered:
        formInitialValue?.biomedicalServices?.tb_facility_reffered,
      typeOfMhpss: formInitialValue?.biomedicalServices?.type_of_mhpss,
      drugRehabFacilityReffered:
        formInitialValue?.biomedicalServices?.drug_rehab_facility_reffered,
      refferedFacilityDrugRehab:
        formInitialValue?.biomedicalServices?.referred_facility_drug_rehab,
      tbTreatmentRefferal:
        formInitialValue?.biomedicalServices?.tb_treatment_refferal,
      ...formInitialValue?.hivEducationalServices,
    };
    formik.setValues(initialValues);
  }, [formInitialValue]);

  return (
    <div>
      <Card className={classes.root}>
        <CardBody>
          <form onSubmit={formik.handleSubmit}>
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

            <div className="row">
              <div className="form-group mb-10 col-xs-6 col-md-4 ">
                <br />
                <CustomFormGroup formik={formik} name="dateServiceOffered">
                  <Label>Date Of Service Provision</Label>
                  <Input
                    type="date"
                    name="dateServiceOffered"
                    value={formik?.values?.dateServiceOffered}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    id="dateServiceOffered"
                    max={moment(new Date()).format("YYYY-MM-DD")}
                    min={moment(
                      new Date(patientObj?.dob || patientObj?.dateOfBirth)
                    ).format("YYYY-MM-DD")}
                    style={{
                      border: "1px solid #014D88",
                      borderRadius: "0.25rem",
                    }}
                    disabled={disableInputs}
                  ></Input>
                  {formik?.touched.dateServiceOffered &&
                    formik?.errors.dateServiceOffered !== "" && (
                      <span className={classes.error}>
                        {formik?.errors.dateServiceOffered}
                      </span>
                    )}
                </CustomFormGroup>
              </div>

              <div className="form-group mb-3 col-md-4 ">
                <br />
                <CustomFormGroup formik={formik} name="PrevCode">
                  <Label>Prevention Code</Label>
                  <Input
                    type="text"
                    disabled={disableInputs}
                    name="PrevCode"
                    value={formInitialValue?.prevCode}
                    id="PrevCode"
                    style={{
                      border: "1px solid #014D88",
                      borderRadius: "0.25rem",
                    }}
                    readOnly
                  ></Input>
                </CustomFormGroup>
              </div>

              <div className="form-group mb-3 col-md-4 ">
                <br />
                <CustomFormGroup formik={formik} name="hospitalNumber">
                  <Label>Hospital Number</Label>
                  <Input
                    type="text"
                    disabled={disableInputs}
                    name="hospitalNumber"
                    value={formInitialValue?.htsCode}
                    id="hospitalNumber"
                    style={{
                      border: "1px solid #014D88",
                      borderRadius: "0.25rem",
                    }}
                    readOnly
                  ></Input>
                </CustomFormGroup>
              </div>

              <div className="form-group mb-3 col-md-4">
                <br />
                <CustomFormGroup formik={formik} name="kpPatientTargetGroup">
                  <Label>Target Group</Label>
                  <Input
                    type="select"
                    disabled={disableInputs}
                    name="kpPatientTargetGroup"
                    id="kpPatientTargetGroup"
                    value={formik?.values?.kpPatientTargetGroup}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    style={{
                      border: "1px solid #014D88",
                      borderRadius: "0.25rem",
                    }}
                  >
                    <option value="">Select</option>

                    {targetGroup?.filter?.((el) => el?.code !== "TARGET_GROUP_GEN_POP")?.map?.((el) => (
                      <option value={el?.code} key={el?.id}>
                        {el?.display}
                      </option>
                    ))}
                  </Input>
                  {formik?.touched.kpPatientTargetGroup &&
                    formik?.errors.kpPatientTargetGroup !== "" && (
                      <span className={classes.error}>
                        {formik?.errors.kpPatientTargetGroup}
                      </span>
                    )}
                </CustomFormGroup>
              </div>
            </div>

            <div className="row d-flex " style={{ marginTop: "50px" }}>
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
                <h2 style={{ color: "#fff" }}>
                  Entry Point For KP Prevention Services
                </h2>
              </LabelSui>

              <br />
              <br />

              {newClient && (
                <>
                  <div className="form-group mb-10 col-xs-6 col-md-4">
                    <CustomFormGroup formik={formik} name="kpOfferedHts">
                      <Label>HTS Offered</Label>
                      <Input
                        type="select"
                        name="kpOfferedHts"
                        id="kpOfferedHts"
                        value={formik?.values?.kpOfferedHts}
                        disabled={disableInputs}
                        onChange={(e) => {
                          formik?.handleChange(e);
                          formik?.setFieldValue("offeredHts", e.target.value);
                        }}
                        onBlur={formik?.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      >
                        <option value="">Select</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </Input>

                      {formik?.touched.kpOfferedHts &&
                        formik?.errors.kpOfferedHts !== "" && (
                          <span className={classes.error}>
                            {formik?.errors.kpOfferedHts}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>

                  {formik?.values?.kpOfferedHts === "0" && (
                    <div className="form-group mb-10 col-xs-6 col-md-4 ">
                      <CustomFormGroup formik={formik} name="kpKnownPositive">
                        <Label>Known Positive</Label>
                        <Input
                          type="select"
                          name="kpKnownPositive"
                          id="kpKnownPositive"
                          disabled={disableInputs}
                          value={formik?.values?.kpKnownPositive}
                          onChange={formik?.handleChange}
                          onBlur={formik?.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.25rem",
                          }}
                          // readOnly
                        >
                          <option value="">Select</option>
                          <option value="1">Yes</option>
                          <option value="0">No</option>
                        </Input>
                        {formik?.touched.kpKnownPositive &&
                          formik?.errors.kpKnownPositive !== "" && (
                            <span className={classes.error}>
                              {formik?.errors.kpKnownPositive}
                            </span>
                          )}
                      </CustomFormGroup>
                    </div>
                  )}

                  {formik?.values?.kpOfferedHts === "1" && (
                    <div className="form-group mb-10 col-xs-6 col-md-4 ">
                      <CustomFormGroup formik={formik} name="kpAcceptedHts">
                        <Label>HTS Accepted</Label>
                        <Input
                          type="select"
                          name="kpAcceptedHts"
                          id="kpAcceptedHts"
                          disabled={disableInputs}
                          value={formik?.values?.kpAcceptedHts}
                          onChange={formik?.handleChange}
                          onBlur={formik?.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.25rem",
                          }}
                        >
                          <option value="">Select</option>
                          <option value="1">Yes</option>
                          <option value="0">No</option>
                        </Input>
                        {formik?.touched.kpAcceptedHts &&
                          formik?.errors.kpAcceptedHts !== "" && (
                            <span className={classes.error}>
                              {formik?.errors.kpAcceptedHts}
                            </span>
                          )}
                      </CustomFormGroup>
                    </div>
                  )}

                  {
                  formik.values?.kpOfferedHts === "1" && formik?.values?.kpAcceptedHts === "0" && (
                    <div className="form-group mb-10 col-xs-6 col-md-4 ">
                    <CustomFormGroup formik={formik} name="kpKnownPositive">
                      <Label>Known Positive</Label>
                      <Input
                        type="select"
                        name="kpKnownPositive"
                        id="kpKnownPositive"
                        value={formik?.values?.kpKnownPositive}
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                        disabled={
                          formik?.values?.kpHtsFinalResult === "positive" ||  disableInputs
                            ? true
                            : false
                        }
                      >
                        <option value="">Select</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </Input>
                      {formik?.touched.kpKnownPositive &&
                        formik?.errors.kpKnownPositive !== "" && (
                          <span className={classes.error}>
                            {formik?.errors.kpKnownPositive}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>

                  )
                  }

                  {formik?.values?.kpAcceptedHts === "1" && (
                    <>
                      <div className="form-group mb-10 col-xs-6 col-md-4 ">
                        <CustomFormGroup formik={formik} name="kpHtsClientCode">
                          <Label>HTS Client Code</Label>
                          <Input
                            type="text"
                            name="kpHtsClientCode"
                            id="kpHtsClientCode"
                            value={
                              htsCodeVal?.htsCode ||
                              formik?.touched?.kpHtsClientCode
                            }
                            onChange={formik?.handleChange}
                            onBlur={formik?.handleBlur}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.25rem",
                            }}
                            disabled={
                              htsCodeVal?.htsCode !== "" ||
                              htsCodeVal?.htsCode !== null ||  disableInputs
                            }
                          />

                          {formik?.touched?.kpHtsClientCode &&
                            formik?.errors?.kpHtsClientCode !== "" && (
                              <span className={classes.error}>
                                {formik?.errors?.kpHtsClientCode}
                              </span>
                            )}
                        </CustomFormGroup>
                      </div>

                      <div className="form-group mb-10 col-xs-6 col-md-4">
                        <CustomFormGroup
                          formik={formik}
                          name="kpHtsFinalResult"
                        >
                          <Label>HTS Final Result</Label>
                          <Input
                            type="select"
                            name="kpHtsFinalResult"
                            id="kpHtsFinalResult"
                            disabled={disableInputs}
                            value={formik?.values?.kpHtsFinalResult}
                            onChange={(e) => {
                              if (e.target.value === "positive") {
                                formik?.setFieldValue("kpKnownPositive", "1");
                              }
                              formik?.handleChange(e);
                            }}
                            onBlur={formik?.handleBlur}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.25rem",
                            }}
                          >
                            <option value="">Select</option>
                            <option value="positive">Positive</option>
                            <option value="negative">Negative</option>
                          </Input>
                          {formik?.touched.kpHtsFinalResult &&
                            formik?.errors.kpHtsFinalResult !== "" && (
                              <span className={classes.error}>
                                {formik?.errors.kpHtsFinalResult}
                              </span>
                            )}
                        </CustomFormGroup>
                      </div>
                    </>
                  )}

                  {formik?.values?.kpOfferedHts &&
                    formik?.values?.kpAcceptedHts &&
                    formik?.values?.kpHtsFinalResult === "positive" && (
                      <div className="form-group mb-10 col-xs-6 col-md-4 ">
                        <CustomFormGroup formik={formik} name="kpKnownPositive">
                          <Label>Known Positive</Label>
                          <Input
                            type="select"
                            name="kpKnownPositive"
                            id="kpKnownPositive"
                            value={formik?.values?.kpKnownPositive}
                            onChange={formik?.handleChange}
                            onBlur={formik?.handleBlur}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.25rem",
                            }}
                            disabled={
                              formik?.values?.kpHtsFinalResult === "positive" || disableInputs
                                ? true
                                : false 
                            }
                          >
                            <option value="">Select</option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                          </Input>
                          {formik?.touched.kpKnownPositive &&
                            formik?.errors.kpKnownPositive !== "" && (
                              <span className={classes.error}>
                                {formik?.errors.kpKnownPositive}
                              </span>
                            )}
                        </CustomFormGroup>
                      </div>
                    )}
                </>
              )}

              {formik?.values?.kpKnownPositive === "1" && (
                <div className="form-group mb-10 col-xs-6 col-md-4">
                  <CustomFormGroup formik={formik} name="kpPatientArtNumber">
                    <Label>Patient ART Unique ID</Label>
                    <Input
                      type="text"
                      name="kpPatientArtNumber"
                      disabled={disableInputs}
                      id="kpPatientArtNumber"
                      value={formik?.values?.kpPatientArtNumber}
                      onChange={formik?.handleChange}
                      onBlur={formik?.handleBlur}
                      style={{
                        border: "1px solid #014D88",
                        borderRadius: "0.25rem",
                      }}
                    />

                    {formik?.touched?.kpPatientArtNumber &&
                      formik?.errors?.kpPatientArtNumber !== "" && (
                        <span className={classes.error}>
                          {formik?.errors?.kpPatientArtNumber}
                        </span>
                      )}
                  </CustomFormGroup>
                </div>
              )}

            </div>

            {formik?.values?.kpHtsFinalResult === "negative" && (
              <>
                {/* PreP Services */}
                <div className="row">
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
                    <h2 style={{ color: "#fff" }}>PrEP Services</h2>
                  </LabelSui>
                  <br />
                  <br />
                  <div className="form-group mb-3 col-md-4 ">
                    <CustomFormGroup formik={formik} name="offeredPrep">
                      <Label>PrEP Offered</Label>
                      <Input
                        type="select"
                        disabled={disableInputs}
                        name="offeredPrep"
                        id="offeredPrep"
                        value={formik?.values?.offeredPrep}
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      >
                        <option value="">Select</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </Input>
                      {formik?.touched.offeredPrep &&
                        formik?.errors.offeredPrep !== "" && (
                          <span className={classes.error}>
                            {formik?.errors.offeredPrep}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>

                  {formik?.values?.offeredPrep === "1" && (
                    <div className="form-group mb-3 col-md-4 ">
                      <CustomFormGroup formik={formik} name="acceptedPrep">
                        <Label>PrEP Accepted</Label>
                        <Input
                          type="select"
                          disabled={disableInputs}
                          name="acceptedPrep"
                          id="acceptedPrep"
                          value={formik?.values?.acceptedPrep}
                          onChange={formik?.handleChange}
                          onBlur={formik?.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.25rem",
                          }}
                        >
                          <option value="">Select</option>
                          <option value="1">Yes</option>
                          <option value="0">No</option>
                        </Input>
                        {formik?.touched.acceptedPrep &&
                          formik?.errors.acceptedPrep !== "" && (
                            <span className={classes.error}>
                              {formik?.errors.acceptedPrep}
                            </span>
                          )}
                      </CustomFormGroup>
                    </div>
                  )}

                  {formik?.values?.acceptedPrep === "1" && (
                    <div className="form-group mb-3 col-md-4 ">
                      <CustomFormGroup formik={formik} name="referredForPrep">
                        <Label>Referred for PrEP</Label>
                        <Input
                          type="select"
                          disabled={disableInputs}
                          name="referredForPrep"
                          id="referredForPrep"
                          value={formik?.values?.referredForPrep}
                          onChange={formik?.handleChange}
                          onBlur={formik?.handleBlur}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.25rem",
                          }}
                        >
                          <option value="">Select</option>
                          <option value="1">Yes</option>
                          <option value="0">No</option>
                        </Input>

                        {formik?.touched.referredForPrep &&
                          formik?.errors.referredForPrep !== "" && (
                            <span className={classes.error}>
                              {formik?.errors.referredForPrep}
                            </span>
                          )}
                      </CustomFormGroup>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Commodity services */}
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
                <CustomFormGroup formik={formik} name="condomDispensed">
                  <Label>Condom Dispensed</Label>
                  <Input
                    type="select"
                    disabled={disableInputs}
                    name="condomDispensed"
                    id="condomDispensed"
                    value={formik?.values?.condomDispensed}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    style={{
                      border: "1px solid #014D88",
                      borderRadius: "0.25rem",
                    }}
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Input>
                  {formik?.touched.condomDispensed &&
                    formik?.errors.condomDispensed !== "" && (
                      <span className={classes.error}>
                        {formik?.errors.condomDispensed}
                      </span>
                    )}
                </CustomFormGroup>
              </div>
              {formik?.values?.condomDispensed === "yes" && (
                <div className="form-group mb-3 col-md-3">
                  <CustomFormGroup
                    formik={formik}
                    name="howManyCondomDispensed"
                  >
                    <Label>How Many Condom Dispensed</Label>
                    <Input
                      type="number"
                      disabled={disableInputs}
                      name="howManyCondomDispensed"
                      id="howManyCondomDispensed"
                      value={formik?.values?.howManyCondomDispensed}
                      onChange={formik?.handleChange}
                      onBlur={formik?.handleBlur}
                      style={{
                        border: "1px solid #014D88",
                        borderRadius: "0.25rem",
                      }}
                      min="0"
                    ></Input>
                    {formik?.touched.howManyCondomDispensed &&
                      formik?.errors.howManyCondomDispensed !== "" && (
                        <span className={classes.error}>
                          {formik?.errors.howManyCondomDispensed}
                        </span>
                      )}
                  </CustomFormGroup>
                </div>
              )}

              <div className="form-group mb-3 col-md-3 ">
                <CustomFormGroup formik={formik} name="lubricantsDispensed">
                  <Label>Lubricants Dispensed</Label>
                  <Input
                    type="select"
                    disabled={disableInputs}
                    name="lubricantsDispensed"
                    id="lubricantsDispensed"
                    value={formik?.values?.lubricantsDispensed}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    style={{
                      border: "1px solid #014D88",
                      borderRadius: "0.25rem",
                    }}
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Input>
                  {formik?.touched.lubricantsDispensed &&
                    formik?.errors.lubricantsDispensed !== "" && (
                      <span className={classes.error}>
                        {formik?.errors.lubricantsDispensed}
                      </span>
                    )}
                </CustomFormGroup>
              </div>
              {formik?.values?.lubricantsDispensed === "yes" && (
                <div className="form-group mb-3 col-md-3 ">
                  <CustomFormGroup
                    formik={formik}
                    name="howManyLubricantsDispensed"
                  >
                    <Label>How Many Lubricants Dispensed</Label>
                    <Input
                      type="number"
                      disabled={disableInputs}
                      name="howManyLubricantsDispensed"
                      id="howManyLubricantsDispensed"
                      value={formik?.values?.howManyLubricantsDispensed}
                      onChange={formik?.handleChange}
                      onBlur={formik?.handleBlur}
                      style={{
                        border: "1px solid #014D88",
                        borderRadius: "0.25rem",
                      }}
                      min="0"
                    ></Input>
                    {formik?.touched.howManyLubricantsDispensed &&
                      formik?.errors.howManyLubricantsDispensed !== "" && (
                        <span className={classes.error}>
                          {formik?.errors.howManyLubricantsDispensed}
                        </span>
                      )}
                  </CustomFormGroup>
                </div>
              )}

              <div className="form-group mb-3 col-md-3 ">
                <CustomFormGroup formik={formik} name="oralQuickDispensed">
                  <Label>Oral Quick/ HIVST dispensed</Label>
                  <Input
                    type="select"
                    disabled={disableInputs}
                    name="oralQuickDispensed"
                    id="oralQuickDispensed"
                    value={formik?.values?.oralQuickDispensed}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    style={{
                      border: "1px solid #014D88",
                      borderRadius: "0.25rem",
                    }}
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Input>
                  {formik?.touched.oralQuickDispensed &&
                    formik?.errors.oralQuickDispensed !== "" && (
                      <span className={classes.error}>
                        {formik?.errors.oralQuickDispensed}
                      </span>
                    )}
                </CustomFormGroup>
              </div>

              {formik?.values?.oralQuickDispensed === "yes" && (
                <div className="form-group mb-3 col-md-3">
                  <CustomFormGroup
                    formik={formik}
                    name="howManyOralQuickDispensed"
                  >
                    <Label>How Many Oral Quick/ HIVST dispensed</Label>
                    <Input
                      type="number"
                      disabled={disableInputs}
                      name="howManyOralQuickDispensed"
                      id="howManyOralQuickDispensed"
                      value={formik?.values?.howManyOralQuickDispensed}
                      onChange={formik?.handleChange}
                      onBlur={formik?.handleBlur}
                      style={{
                        border: "1px solid #014D88",
                        borderRadius: "0.25rem",
                      }}
                      min="0"
                    ></Input>
                    {formik?.touched.howManyOralQuickDispensed &&
                      formik?.errors.howManyOralQuickDispensed !== "" && (
                        <span className={classes.error}>
                          {formik?.errors.howManyOralQuickDispensed}
                        </span>
                      )}
                  </CustomFormGroup>
                </div>
              )}

              <div className="form-group mb-3 col-md-3 ">
                <CustomFormGroup formik={formik} name="newNeedleDispensed">
                  <Label>New Needles/Syringe Dispensed</Label>
                  <Input
                    type="select"
                    disabled={disableInputs}
                    name="newNeedleDispensed"
                    id="newNeedleDispensed"
                    value={formik?.values?.newNeedleDispensed}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    style={{
                      border: "1px solid #014D88",
                      borderRadius: "0.25rem",
                    }}
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Input>
                  {formik?.touched.newNeedleDispensed &&
                    formik?.errors.newNeedleDispensed !== "" && (
                      <span className={classes.error}>
                        {formik?.errors.newNeedleDispensed}
                      </span>
                    )}
                </CustomFormGroup>
              </div>

              {formik?.values?.newNeedleDispensed === "yes" && (
                <div className="form-group mb-3 col-md-3 ">
                  <CustomFormGroup
                    formik={formik}
                    name="howManyNewNeedleDispensed"
                  >
                    <Label>How Many New Needles/Syringe Dispensed</Label>
                    <Input
                      type="number"
                      disabled={disableInputs}
                      name="howManyNewNeedleDispensed"
                      id="howManyNewNeedleDispensed"
                      value={formik?.values?.howManyNewNeedleDispensed}
                      onChange={formik?.handleChange}
                      onBlur={formik?.handleBlur}
                      style={{
                        border: "1px solid #014D88",
                        borderRadius: "0.25rem",
                      }}
                      min="0"
                    ></Input>

                    {formik?.touched.howManyNewNeedleDispensed &&
                      formik?.errors.howManyNewNeedleDispensed !== "" && (
                        <span className={classes.error}>
                          {formik?.errors.howManyNewNeedleDispensed}
                        </span>
                      )}
                  </CustomFormGroup>
                </div>
              )}

              <div className="form-group mb-3 col-md-3 ">
                <CustomFormGroup formik={formik} name="oldNeedleRetrieved">
                  <Label>Old Needles/Syringe Retrieved</Label>
                  <Input
                    type="select"
                    disabled={disableInputs}
                    name="oldNeedleRetrieved"
                    id="oldNeedleRetrieved"
                    value={formik?.values?.oldNeedleRetrieved}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    style={{
                      border: "1px solid #014D88",
                      borderRadius: "0.25rem",
                    }}
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Input>

                  {formik?.touched.oldNeedleRetrieved &&
                    formik?.errors.oldNeedleRetrieved !== "" && (
                      <span className={classes.error}>
                        {formik?.errors.oldNeedleRetrieved}
                      </span>
                    )}
                </CustomFormGroup>
              </div>

              {formik?.values?.oldNeedleRetrieved === "yes" && (
                <div className="form-group mb-3 col-md-3">
                  <CustomFormGroup
                    formik={formik}
                    name="howManyOldNeedleRetrieved"
                  >
                    <Label>How Many Old Needles/Syringe Retrived</Label>
                    <Input
                      type="number"
                      disabled={disableInputs}
                      name="howManyOldNeedleRetrieved"
                      id="howManyOldNeedleRetrieved"
                      value={formik?.values?.howManyOldNeedleRetrieved}
                      onChange={formik?.handleChange}
                      onBlur={formik?.handleBlur}
                      style={{
                        border: "1px solid #014D88",
                        borderRadius: "0.25rem",
                      }}
                      min="0"
                    ></Input>
                    {formik?.touched.howManyOldNeedleRetrieved &&
                      formik?.errors.howManyOldNeedleRetrieved !== "" && (
                        <span className={classes.error}>
                          {formik?.errors.howManyOldNeedleRetrieved}
                        </span>
                      )}
                  </CustomFormGroup>
                </div>
              )}

              <div className="form-group mb-3 col-md-3 ">
                <CustomFormGroup formik={formik} name="nalxoneProvided">
                  <Label>Naloxone Provided</Label>
                  <Input
                    type="select"
                    disabled={disableInputs}
                    name="nalxoneProvided"
                    id="nalxoneProvided"
                    value={formik?.values?.nalxoneProvided}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    style={{
                      border: "1px solid #014D88",
                      borderRadius: "0.25rem",
                    }}
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Input>
                  {formik?.touched.nalxoneProvided &&
                    formik?.errors.nalxoneProvided !== "" && (
                      <span className={classes.error}>
                        {formik?.errors.nalxoneProvided}
                      </span>
                    )}
                </CustomFormGroup>
              </div>

              {formik?.values?.nalxoneProvided === "yes" && (
                <div className="form-group mb-3 col-md-3">
                  <CustomFormGroup
                    formik={formik}
                    name="howManyNalxoneProvided"
                  >
                    <Label>How Many Naloxone Provided</Label>
                    <Input
                      type="number"
                      disabled={disableInputs}
                      name="howManyNalxoneProvided"
                      id="howManyNalxoneProvided"
                      value={formik?.values?.howManyNalxoneProvided}
                      onChange={formik?.handleChange}
                      onBlur={formik?.handleBlur}
                      style={{
                        border: "1px solid #014D88",
                        borderRadius: "0.25rem",
                      }}
                      min="0"
                    ></Input>

                    {formik?.touched.howManyNalxoneProvided &&
                      formik?.errors.howManyNalxoneProvided !== "" && (
                        <span className={classes.error}>
                          {formik?.errors.howManyNalxoneProvided}
                        </span>
                      )}
                  </CustomFormGroup>
                </div>
              )}
            </div>

            {/* HIV Educaton Provided */}
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
                <CustomFormGroup formik={formik} name="iecMaterial">
                  <Label>IEC materials/pamphlets provided </Label>
                  <Input
                    type="select"
                    disabled={disableInputs}
                    name="iecMaterial"
                    id="iecMaterial"
                    value={formik?.values?.iecMaterial}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    style={{
                      border: "1px solid #014D88",
                      borderRadius: "0.25rem",
                    }}
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </Input>
                  {formik?.touched.iecMaterial &&
                    formik?.errors.iecMaterial !== "" && (
                      <span className={classes.error}>
                        {formik?.errors.iecMaterial}
                      </span>
                    )}
                </CustomFormGroup>
              </div>

              <div className="form-group mb-3 col-md-4 ">
                <CustomFormGroup
                  formik={formik}
                  name="interPersonalCommunication"
                >
                  <Label>InterPersonal Communication</Label>
                  <Input
                    type="select"
                    disabled={disableInputs}
                    name="interPersonalCommunication"
                    id="interPersonalCommunication"
                    value={formik?.values?.interPersonalCommunication}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    style={{
                      border: "1px solid #014D88",
                      borderRadius: "0.25rem",
                    }}
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </Input>
                  {formik?.touched.interPersonalCommunication &&
                    formik?.errors.interPersonalCommunication !== "" && (
                      <span className={classes.error}>
                        {formik?.errors.interPersonalCommunication}
                      </span>
                    )}
                </CustomFormGroup>
              </div>
              <div className="form-group mb-3 col-md-4 ">
                <CustomFormGroup formik={formik} name="peerGroupCommunication">
                  <Label>Peer Group Communication</Label>
                  <Input
                    type="select"
                    disabled={disableInputs}
                    name="peerGroupCommunication"
                    id="peerGroupCommunication"
                    value={formik?.values?.peerGroupCommunication}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    style={{
                      border: "1px solid #014D88",
                      borderRadius: "0.25rem",
                    }}
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </Input>
                  {formik?.touched.peerGroupCommunication &&
                    formik?.errors.peerGroupCommunication !== "" && (
                      <span className={classes.error}>
                        {formik?.errors.peerGroupCommunication}
                      </span>
                    )}
                </CustomFormGroup>
              </div>
            </div>

            {/* Biomedical services */}
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
                  <CustomFormGroup formik={formik} name="stiScreening">
                    <Label>STI Screening</Label>
                    <Input
                      type="select"
                      disabled={disableInputs}
                      name="stiScreening"
                      id="stiScreening"
                      value={formik?.values?.stiScreening}
                      onChange={formik?.handleChange}
                      onBlur={formik?.handleBlur}
                      style={{
                        border: "1px solid #014D88",
                        borderRadius: "0.25rem",
                      }}
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </Input>
                    {formik?.touched.stiScreening &&
                      formik?.errors.stiScreening !== "" && (
                        <span className={classes.error}>
                          {formik?.errors.stiScreening}
                        </span>
                      )}
                  </CustomFormGroup>
                </div>

                {formik?.values?.stiScreening === "yes" && (
                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup formik={formik} name="stiScreeningResult">
                      <Label>STI Screening Result</Label>
                      <Input
                        type="select"
                        disabled={disableInputs}
                        name="stiScreeningResult"
                        id="stiScreeningResult"
                        value={formik?.values?.stiScreeningResult}
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      >
                        <option value="">Select</option>
                        <option value="positive">Positive</option>
                        <option value="negative">Negative</option>
                      </Input>

                      {formik?.touched.stiScreeningResult &&
                        formik?.errors.stiScreeningResult !== "" && (
                          <span className={classes.error}>
                            {formik?.errors.stiScreeningResult}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>
                )}

                {formik?.values?.stiScreeningResult === "positive" && (
                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup
                      formik={formik}
                      name="stiSyndromicManagement"
                    >
                      <Label>STI Syndromic Management</Label>
                      <Input
                        type="select"
                        disabled={disableInputs}
                        name="stiSyndromicManagement"
                        id="stiSyndromicManagement"
                        value={formik?.values?.stiSyndromicManagement}
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      >
                        <option value="">Select</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </Input>

                      {formik?.touched.stiSyndromicManagement &&
                        formik?.errors.stiSyndromicManagement !== "" && (
                          <span className={classes.error}>
                            {formik?.errors.stiSyndromicManagement}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>
                )}

                {formik?.values?.stiSyndromicManagement === "1" && (
                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup formik={formik} name="stiTreatment">
                      <Label>STI Treatment/ Referral</Label>
                      <Input
                        type="select"
                        disabled={disableInputs}
                        name="stiTreatment"
                        id="stiTreatment"
                        value={formik?.values?.stiTreatment}
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      >
                        <option value=""> Select </option>
                        <option value="yes"> Yes </option>
                        <option value="no"> No </option>
                      </Input>
                      {formik?.touched.stiTreatment &&
                        formik?.errors.stiTreatment !== "" && (
                          <span className={classes.error}>
                            {formik?.errors.stiTreatment}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>
                )}

                {formik?.values?.stiTreatment === "yes" && (
                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup formik={formik} name="stiFacilityReffered">
                      <Label> Facility Referred to </Label>
                      <Input
                        type="text"
                        disabled={disableInputs}
                        name="stiFacilityReffered"
                        id="stiFacilityReffered"
                        value={formik?.values?.stiFacilityReffered}
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      />
                      {formik?.touched.stiFacilityReffered &&
                        formik?.errors.stiFacilityReffered !== "" && (
                          <span className={classes.error}>
                            {formik?.errors.stiFacilityReffered}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>
                )}

                {formik?.values?.stiTreatment === "yes" && (
                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup formik={formik} name="typeOfStiTreatment">
                      <Label> Type of STI treatment </Label>
                      <Input
                        type="select"
                        disabled={disableInputs}
                        name="typeOfStiTreatment"
                        id="typeOfStiTreatment"
                        value={formik?.values?.typeOfStiTreatment}
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      >
                        <option value=""> Select </option>
                        {stiTreatment?.map?.((el) => (
                          <option value={el?.code} key={el?.id}>
                            {" "}
                            {el?.display}{" "}
                          </option>
                        ))}
                      </Input>
                      {formik?.touched.typeOfStiTreatment &&
                        formik?.errors.typeOfStiTreatment !== "" && (
                          <span className={classes.error}>
                            {formik?.errors.typeOfStiTreatment}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>
                )}

                <div className="form-group mb-3 col-md-4">
                  <CustomFormGroup formik={formik} name="screenedForTb">
                    <Label>Screened for TB</Label>
                    <Input
                      type="select"
                      disabled={disableInputs}
                      name="screenedForTb"
                      id="screenedForTb"
                      value={formik?.values?.screenedForTb}
                      onChange={formik?.handleChange}
                      onBlur={formik?.handleBlur}
                      style={{
                        border: "1px solid #014D88",
                        borderRadius: "0.25rem",
                      }}
                    >
                      <option value=""> Select </option>
                      <option value="yes"> Yes </option>
                      <option value="no"> No </option>
                    </Input>

                    {formik?.touched.screenedForTb &&
                      formik?.errors.screenedForTb !== "" && (
                        <span className={classes.error}>
                          {formik?.errors.screenedForTb}
                        </span>
                      )}
                  </CustomFormGroup>
                </div>

                {formik?.values?.screenedForTb === "yes" && (
                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup
                      formik={formik}
                      name="patientCurrentTbStatus"
                    >
                      <Label>TB Screening Status </Label>
                      <Input
                        type="select"
                        disabled={disableInputs}
                        name="patientCurrentTbStatus"
                        id="patientCurrentTbStatus"
                        value={formik?.values?.patientCurrentTbStatus}
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      >
                        <option value=""> Select </option>
                        {tbStatusData?.map?.((el) => (
                          <option value={el?.code} key={el?.id}>
                            {" "}
                            {el?.display}{" "}
                          </option>
                        ))}
                      </Input>
                    </CustomFormGroup>
                  </div>
                )}

                {formik?.values?.patientCurrentTbStatus ===
                  "TB_STATUS_NO_SIGN_OR_SYMPTOMS_OF_TB" && (
                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup formik={formik} name="providedWithTpt">
                      <Label>Provided with TPT</Label>
                      <Input
                        type="select"
                        disabled={disableInputs}
                        name="providedWithTpt"
                        id="providedWithTpt"
                        value={formik?.values?.providedWithTpt}
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      >
                        <option value=""> Select </option>
                        <option value="yes"> Yes </option>
                        <option value="no"> No </option>
                      </Input>
                      {formik?.touched.providedWithTpt &&
                        formik?.errors.providedWithTpt !== "" && (
                          <span className={classes.error}>
                            {formik?.errors.providedWithTpt}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>
                )}

                {formik?.values?.patientCurrentTbStatus ===
                  "TB_STATUS_TB_POSITIVE_NOT_ON_TB_DRUGS" && (
                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup formik={formik} name="tbTreatmentRefferal">
                      <Label>TB treatment/referral </Label>
                      <Input
                        type="select"
                        disabled={disableInputs}
                        name="tbTreatmentRefferal"
                        id="tbTreatmentRefferal"
                        value={formik?.values?.tbTreatmentRefferal}
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      >
                        <option value=""> Select </option>
                        <option value="yes"> Yes </option>
                        <option value="no"> No </option>
                      </Input>
                    </CustomFormGroup>
                  </div>
                )}

                {formik?.values?.tbTreatmentRefferal === "yes" && (
                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup formik={formik} name="tbFacilityReffered">
                      <Label> Facility Referred to </Label>
                      <Input
                        type="text"
                        disabled={disableInputs}
                        name="tbFacilityReffered"
                        id="tbFacilityReffered"
                        value={formik?.values?.tbFacilityReffered}
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      />
                      {formik?.touched.tbFacilityReffered &&
                        formik?.errors.tbFacilityReffered !== "" && (
                          <span className={classes.error}>
                            {formik?.errors.tbFacilityReffered}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>
                )}

                <div className="form-group mb-3 col-md-4">
                  <CustomFormGroup
                    formik={formik}
                    name="screenedForViralHepatits"
                  >
                    <Label>Screened For Viral Hepatitis</Label>
                    <Input
                      type="select"
                      disabled={disableInputs}
                      name="screenedForViralHepatits"
                      id="screenedForViralHepatits"
                      value={formik?.values?.screenedForViralHepatits}
                      onChange={formik?.handleChange}
                      onBlur={formik?.handleBlur}
                      style={{
                        border: "1px solid #014D88",
                        borderRadius: "0.25rem",
                      }}
                    >
                      <option value=""> Select </option>
                      <option value="yes"> Yes </option>
                      <option value="no"> No </option>
                    </Input>

                    {formik?.touched.screenedForViralHepatits &&
                      formik?.errors.screenedForViralHepatits !== "" && (
                        <span className={classes.error}>
                          {formik?.errors.screenedForViralHepatits}
                        </span>
                      )}
                  </CustomFormGroup>
                </div>

                {formik?.values?.screenedForViralHepatits === "yes" && (
                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup
                      formik={formik}
                      name="viralHepatitsScreenResult"
                    >
                      <Label>Viral Hepatitis Screen Result</Label>
                      <Input
                        type="select"
                        disabled={disableInputs}
                        name="viralHepatitsScreenResult"
                        id="viralHepatitsScreenResult"
                        value={formik?.values?.viralHepatitsScreenResult}
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      >
                        <option value=""> Select </option>
                        <option value="positive"> Positive </option>
                        <option value="negative"> Negative</option>
                      </Input>
                      {formik?.touched.viralHepatitsScreenResult &&
                        formik?.errors.viralHepatitsScreenResult !== "" && (
                          <span className={classes.error}>
                            {formik?.errors.viralHepatitsScreenResult}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>
                )}

                {formik?.values?.viralHepatitsScreenResult === "negative" && (
                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup
                      formik={formik}
                      name="vaccinationForViralHepatits"
                    >
                      <Label>Vaccination For Viral Hepatitis</Label>
                      <Input
                        type="select"
                        disabled={disableInputs}
                        name="vaccinationForViralHepatits"
                        id="vaccinationForViralHepatits"
                        value={formik?.values?.vaccinationForViralHepatits}
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      >
                        <option value=""> Select </option>
                        <option value="Yes"> Yes </option>
                        <option value="No"> No </option>
                      </Input>
                      {formik?.touched.vaccinationForViralHepatits &&
                        formik?.errors.vaccinationForViralHepatits !== "" && (
                          <span className={classes.error}>
                            {formik?.errors.vaccinationForViralHepatits}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>
                )}

                {formik?.values?.viralHepatitsScreenResult === "positive" && (
                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup
                      formik={formik}
                      name="vaccinationForViralHepatits"
                    >
                      <Label>Facility referred to</Label>
                      <Input
                        type="text"
                        disabled={disableInputs}
                        name="facilityReferredToForViralHepatitis"
                        id="facilityReferredToForViralHepatitis"
                        value={
                          formik?.values?.facilityReferredToForViralHepatitis
                        }
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      />

                      {formik?.touched.facilityReferredToForViralHepatitis &&
                        formik?.errors.facilityReferredToForViralHepatitis !==
                          "" && (
                          <span className={classes.error}>
                            {formik?.errors.facilityReferredToForViralHepatitis}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>
                )}

                <div className="form-group mb-3 col-md-4">
                  <CustomFormGroup
                    formik={formik}
                    name="offeredFamilyPlanningServices"
                  >
                    <Label>Offered Family Planning Services</Label>
                    <Input
                      type="select"
                      disabled={disableInputs}
                      name="offeredFamilyPlanningServices"
                      id="offeredFamilyPlanningServices"
                      value={formik?.values?.offeredFamilyPlanningServices}
                      onChange={formik?.handleChange}
                      onBlur={formik?.handleBlur}
                      style={{
                        border: "1px solid #014D88",
                        borderRadius: "0.25rem",
                      }}
                    >
                      <option value=""> Select </option>
                      <option value="yes"> Yes </option>
                      <option value="no"> No </option>
                    </Input>

                    {formik?.touched.offeredFamilyPlanningServices &&
                      formik?.errors.offeredFamilyPlanningServices !== "" && (
                        <span className={classes.error}>
                          {formik?.errors.offeredFamilyPlanningServices}
                        </span>
                      )}
                  </CustomFormGroup>
                </div>

                {formik?.values?.offeredFamilyPlanningServices === "yes" && (
                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup
                      formik={formik}
                      name="acceptedFamilyPlanningServices"
                    >
                      <Label>Accepted Family Planning Services</Label>
                      <Input
                        type="select"
                        disabled={disableInputs}
                        name="acceptedFamilyPlanningServices"
                        id="acceptedFamilyPlanningServices"
                        value={formik?.values?.acceptedFamilyPlanningServices}
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      >
                        <option value=""> Select </option>
                        <option value="yes"> Yes </option>
                        <option value="no"> No </option>
                      </Input>
                      {formik?.touched.acceptedFamilyPlanningServices &&
                        formik?.errors.acceptedFamilyPlanningServices !==
                          "" && (
                          <span className={classes.error}>
                            {formik?.errors.acceptedFamilyPlanningServices}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>
                )}

                {formik?.values?.acceptedFamilyPlanningServices === "yes" && (
                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup
                      formik={formik}
                      name="referredForFamilyPlanningServices"
                    >
                      <Label>Referred For Family Planning Services</Label>
                      <Input
                        type="select"
                        disabled={disableInputs}
                        name="referredForFamilyPlanningServices"
                        id="referredForFamilyPlanningServices"
                        value={
                          formik?.values?.referredForFamilyPlanningServices
                        }
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      >
                        <option value=""> Select </option>
                        <option value="yes"> Yes </option>
                        <option value="no"> No </option>
                      </Input>
                      {formik?.touched.referredForFamilyPlanningServices &&
                        formik?.errors.referredForFamilyPlanningServices !==
                          "" && (
                          <span className={classes.error}>
                            {formik?.errors.referredForFamilyPlanningServices}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>
                )}

                {formik?.values?.referredForFamilyPlanningServices ===
                  "yes" && (
                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup
                      formik={formik}
                      name="facilityReferredForFamilyPlanningServices"
                    >
                      <Label>Facility referred to</Label>
                      <Input
                        type="text"
                        disabled={disableInputs}
                        name="facilityReferredForFamilyPlanningServices"
                        id="facilityReferredForFamilyPlanningServices"
                        value={
                          formik?.values
                            ?.facilityReferredForFamilyPlanningServices
                        }
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      />
                      {formik?.touched
                        .facilityReferredForFamilyPlanningServices &&
                        formik?.errors
                          .facilityReferredForFamilyPlanningServices !== "" && (
                          <span className={classes.error}>
                            {
                              formik?.errors
                                .facilityReferredForFamilyPlanningServices
                            }
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>
                )}

                <div className="form-group mb-3 col-md-4">
                  <CustomFormGroup
                    formik={formik}
                    name="providedWithinDrugRehab"
                  >
                    <Label>Provided With Drug Rehab</Label>
                    <Input
                      type="select"
                      disabled={disableInputs}
                      name="providedWithinDrugRehab"
                      id="providedWithinDrugRehab"
                      value={formik?.values?.providedWithinDrugRehab}
                      onChange={formik?.handleChange}
                      onBlur={formik?.handleBlur}
                      style={{
                        border: "1px solid #014D88",
                        borderRadius: "0.25rem",
                      }}
                    >
                      <option value=""> Select </option>
                      <option value="yes"> Yes </option>
                      <option value="no"> No </option>
                    </Input>

                    {formik?.touched.providedWithinDrugRehab &&
                      formik?.errors.providedWithinDrugRehab !== "" && (
                        <span className={classes.error}>
                          {formik?.errors.providedWithinDrugRehab}
                        </span>
                      )}
                  </CustomFormGroup>
                </div>

                {formik?.values?.providedWithinDrugRehab === "yes" && (
                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup
                      formik={formik}
                      name="refferedFacilityDrugRehab"
                    >
                      <Label>Referred to facility for Drug Rehab </Label>
                      <Input
                        type="text"
                        disabled={disableInputs}
                        name="refferedFacilityDrugRehab"
                        id="refferedFacilityDrugRehab"
                        value={formik?.values?.refferedFacilityDrugRehab}
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      />

                      {formik?.touched.refferedFacilityDrugRehab &&
                        formik?.errors.refferedFacilityDrugRehab !== "" && (
                          <span className={classes.error}>
                            {formik?.errors.refferedFacilityDrugRehab}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>
                )}

                <div className="form-group mb-3 col-md-4">
                  <CustomFormGroup formik={formik} name="offeredMhpss">
                    <Label>Offered MHPSS</Label>
                    <Input
                      type="select"
                      disabled={disableInputs}
                      name="offeredMhpss"
                      id="offeredMhpss"
                      value={formik?.values?.offeredMhpss}
                      onChange={formik?.handleChange}
                      onBlur={formik?.handleBlur}
                      style={{
                        border: "1px solid #014D88",
                        borderRadius: "0.25rem",
                      }}
                    >
                      <option value=""> Select </option>
                      <option value="yes"> Yes </option>
                      <option value="no"> No </option>
                    </Input>

                    {formik?.touched.offeredMhpss &&
                      formik?.errors.offeredMhpss !== "" && (
                        <span className={classes.error}>
                          {formik?.errors.offeredMhpss}
                        </span>
                      )}
                  </CustomFormGroup>
                </div>

                {formik?.values?.offeredMhpss === "yes" && (
                  <div className="form-group mb-3 col-md-4">
                    <CustomFormGroup formik={formik} name="typeOfMhpss">
                      <Label>Type of MHPSS Provided</Label>
                      <Input
                        type="select"
                        disabled={disableInputs}
                        name="typeOfMhpss"
                        id="typeOfMhpss"
                        value={formik?.values?.typeOfMhpss}
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      >
                        <option value=""> Select </option>
                        {mhpssProvided?.map((el) => (
                          <option value={el?.code} key={el?.id}>
                            {el?.display}
                          </option>
                        ))}
                      </Input>

                      {formik?.touched.typeOfMhpss &&
                        formik?.errors.typeOfMhpss !== "" && (
                          <span className={classes.error}>
                            {formik?.errors.typeOfMhpss}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>
                )}

                <div className="form-group mb-3 col-md-4">
                  <CustomFormGroup
                    formik={formik}
                    name="onMedicalAssistedTherapy"
                  >
                    <Label>
                      On Medical Assisted Therapy (MAT) for at least 6 months
                    </Label>
                    <Input
                      type="select"
                      disabled={disableInputs}
                      name="onMedicalAssistedTherapy"
                      id="onMedicalAssistedTherapy"
                      value={formik?.values?.onMedicalAssistedTherapy}
                      onChange={formik?.handleChange}
                      onBlur={formik?.handleBlur}
                      style={{
                        border: "1px solid #014D88",
                        borderRadius: "0.25rem",
                      }}
                    >
                      <option value=""> Select </option>
                      <option value="yes"> Yes </option>
                      <option value="no"> No </option>
                    </Input>

                    {formik?.touched.onMedicalAssistedTherapy &&
                      formik?.errors.onMedicalAssistedTherapy !== "" && (
                        <span className={classes.error}>
                          {formik?.errors.onMedicalAssistedTherapy}
                        </span>
                      )}
                  </CustomFormGroup>
                </div>

                <div className="form-group mb-3 col-md-4">
                  <CustomFormGroup
                    formik={formik}
                    name="receivedNalxoneForOverdoseTreatment"
                  >
                    <Label>Received Naloxone for Overdose Treatment</Label>
                    <Input
                      type="select"
                      disabled={disableInputs}
                      name="receivedNalxoneForOverdoseTreatment"
                      id="receivedNalxoneForOverdoseTreatment"
                      value={
                        formik?.values?.receivedNalxoneForOverdoseTreatment
                      }
                      onChange={formik?.handleChange}
                      onBlur={formik?.handleBlur}
                      style={{
                        border: "1px solid #014D88",
                        borderRadius: "0.25rem",
                      }}
                    >
                      <option value=""> Select </option>
                      <option value="yes"> Yes </option>
                      <option value="no"> No </option>
                    </Input>

                    {formik?.touched.receivedNalxoneForOverdoseTreatment &&
                      formik?.errors.receivedNalxoneForOverdoseTreatment !==
                        "" && (
                        <span className={classes.error}>
                          {formik?.errors.receivedNalxoneForOverdoseTreatment}
                        </span>
                      )}
                  </CustomFormGroup>
                </div>
              </div>
            </div>

            {/* Structural services */}
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
                <CustomFormGroup
                  formik={formik}
                  name="providedOrRefferedForEmpowerment"
                >
                  <Label>Provided or Referred for Empowerment</Label>
                  <Input
                    type="select"
                    disabled={disableInputs}
                    name="providedOrRefferedForEmpowerment"
                    id="providedOrRefferedForEmpowerment"
                    value={formik?.values?.providedOrRefferedForEmpowerment}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    style={{
                      border: "1px solid #014D88",
                      borderRadius: "0.25rem",
                    }}
                  >
                    <option value=""> Select </option>
                    <option value="yes"> Yes </option>
                    <option value="no"> No </option>
                  </Input>

                  {formik?.touched.providedOrRefferedForEmpowerment &&
                    formik?.errors.providedOrRefferedForEmpowerment !== "" && (
                      <span className={classes.error}>
                        {formik?.errors.providedOrRefferedForEmpowerment}
                      </span>
                    )}
                </CustomFormGroup>
              </div>

              {formik?.values?.providedOrRefferedForEmpowerment === "yes" && (
                <>
                  <div className="form-group mb-3 col-md-6">
                    <CustomFormGroup
                      formik={formik}
                      name="typeEmpowermentprovided"
                    >
                      <Label> Type of Empowerment Provided </Label>
                      <Input
                        type="text"
                        disabled={disableInputs}
                        name="typeEmpowermentprovided"
                        id="typeEmpowermentprovided"
                        value={formik?.values?.typeEmpowermentprovided}
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      />
                      {formik?.touched.typeEmpowermentprovided &&
                        formik?.errors.typeEmpowermentprovided !== "" && (
                          <span className={classes.error}>
                            {formik?.errors.typeEmpowermentprovided}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>

                  <div className="form-group mb-3 col-md-6">
                    <CustomFormGroup
                      formik={formik}
                      name="empowermentProgramReferred"
                    >
                      <Label> Empowerment Program referred</Label>
                      <Input
                        type="text"
                        disabled={disableInputs}
                        name="empowermentProgramReferred"
                        id="empowermentProgramReferred"
                        value={formik?.values?.empowermentProgramReferred}
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.25rem",
                        }}
                      />
                      {formik?.touched.empowermentProgramReferred &&
                        formik?.errors.empowermentProgramReferred !== "" && (
                          <span className={classes.error}>
                            {formik?.errors.empowermentProgramReferred}
                          </span>
                        )}
                    </CustomFormGroup>
                  </div>
                </>
              )}

              <div className="form-group mb-3 col-md-6">
                <CustomFormGroup formik={formik} name="legalAidServiceType">
                  <Label>Legal Aid Service Provided</Label>
                  <Input
                    type="select"
                    disabled={disableInputs}
                    name="legalAidServiceType"
                    id="legalAidServiceType"
                    value={formik?.values?.legalAidServiceType}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    style={{
                      border: "1px solid #014D88",
                      borderRadius: "0.25rem",
                    }}
                  >
                    <option value=""> Select </option>
                    <option value="yes"> Yes </option>
                    <option value="no"> No </option>
                  </Input>

                  {formik?.touched.legalAidServiceType &&
                    formik?.errors.legalAidServiceType !== "" && (
                      <span className={classes.error}>
                        {formik?.errors.legalAidServiceType}
                      </span>
                    )}
                </CustomFormGroup>
              </div>

              {formik?.values?.legalAidServiceType === "yes" && (
                <div className="form-group mb-3 col-md-6">
                  <CustomFormGroup formik={formik} name="typeLegalEmpowerment">
                    <Label> Type of Legal Empowerment Provided </Label>
                    <Input
                      type="text"
                      disabled={disableInputs}
                      name="typeLegalEmpowerment"
                      id="typeLegalEmpowerment"
                      value={formik?.values?.typeLegalEmpowerment}
                      onChange={formik?.handleChange}
                      onBlur={formik?.handleBlur}
                      style={{
                        border: "1px solid #014D88",
                        borderRadius: "0.25rem",
                      }}
                    />
                    {formik?.touched.typeLegalEmpowerment &&
                      formik?.errors.typeLegalEmpowerment !== "" && (
                        <span className={classes.error}>
                          {formik?.errors.typeLegalEmpowerment}
                        </span>
                      )}
                  </CustomFormGroup>
                </div>
              )}

              {formik?.values?.legalAidServiceType === "yes" && (
                <div className="form-group mb-3 col-md-6">
                  <CustomFormGroup formik={formik} name="legalProgramReferred">
                    <Label> Legal Program referred </Label>
                    <Input
                      type="text"
                      disabled={disableInputs}
                      name="legalProgramReferred"
                      id="legalProgramReferred"
                      value={formik?.values?.legalProgramReferred}
                      onChange={formik?.handleChange}
                      onBlur={formik?.handleBlur}
                      style={{
                        border: "1px solid #014D88",
                        borderRadius: "0.25rem",
                      }}
                    />
                    {formik?.touched.legalProgramReferred &&
                      formik?.errors.legalProgramReferred !== "" && (
                        <span className={classes.error}>
                          {formik?.errors.legalProgramReferred}
                        </span>
                      )}
                  </CustomFormGroup>
                </div>
              )}
            </div>

            {/*  Service Provider  */}
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
                <CustomFormGroup formik={formik} name="serviceProvider">
                  <Label>Name of service provider</Label>
                  <Input
                    type="text"
                    disabled={disableInputs}
                    name="serviceProvider"
                    id="serviceProvider"
                    value={formik?.values?.serviceProvider}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    style={{
                      border: "1px solid #014D88",
                      borderRadius: "0.25rem",
                    }}
                  />

                  {formik?.touched.serviceProvider &&
                    formik?.errors.serviceProvider !== "" && (
                      <span className={classes.error}>
                        {formik?.errors.serviceProvider}
                      </span>
                    )}
                </CustomFormGroup>
              </div>

              <div className="form-group mb-3 col-md-6">
                <CustomFormGroup
                  formik={formik}
                  name="serviceProviderSignature"
                >
                  <Label> Service Provider Signature </Label>
                  <Input
                    type="text"
                    disabled={disableInputs}
                    name="serviceProviderSignature"
                    id="serviceProviderSignature"
                    value={formik?.values?.serviceProviderSignature}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    style={{
                      border: "1px solid #014D88",
                      borderRadius: "0.25rem",
                    }}
                  />

                  {formik?.touched.serviceProviderSignature &&
                    formik?.errors.serviceProviderSignature !== "" && (
                      <span className={classes.error}>
                        {formik?.errors.serviceProviderSignature}
                      </span>
                    )}
                </CustomFormGroup>
              </div>
            </div>

            {isLoading ? <Spinner /> : ""}
            <br />

            {!disableInputs && (
              <MatButton
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<SaveIcon />}
                disabled={isLoadingPrepCode || isLoading || isLoadingHtsCode}
                // onClick={handleSubmit}
                style={{ backgroundColor: "#014d88", color: "#ffffff" }}
              >
                {isLoading ? (
                  <span style={{ textTransform: "capitalize" }}>
                    {" "}
                    Updating...
                  </span>
                ) : (
                  <span style={{ textTransform: "capitalize" }}>Update</span>
                )}
              </MatButton>
            )}
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
export default UpdateKpPrev;
