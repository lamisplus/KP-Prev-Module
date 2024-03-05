import React, {useState, useEffect} from 'react';
import { Card,CardBody,Form, FormGroup, Label, Input, Button} from 'reactstrap';
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import { FaPlus } from "react-icons/fa";
import CancelIcon from '@material-ui/icons/Cancel'
import { Table  } from "react-bootstrap";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
import { toast} from "react-toastify";
import { url as baseUrl } from "../../../api";
import { token as token } from "../../../api";
import "react-widgets/dist/css/react-widgets.css";
import moment from "moment";
import { Spinner } from "reactstrap";
import {Icon, List, Label as LabelSui} from 'semantic-ui-react'
import DualListBox from "react-dual-listbox";
import 'react-dual-listbox/lib/react-dual-listbox.css';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl'

const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    cardBottom: {
        marginBottom: 20
    },
    Select: {
        height: 45,
        width: 350
    },
    button: {
        margin: theme.spacing(1)
    },

    root: {
        flexGrow: 1,
        "& .card-title":{
            color:'#fff',
            fontWeight:'bold'
        },
        "& .form-control":{
            borderRadius:'0.25rem',
            height:'41px'
        },
        "& .card-header:first-child": {
            borderRadius: "calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0"
        },
        "& .dropdown-toggle::after": {
            display: " block !important"
        },
        "& select":{
            "-webkit-appearance": "listbox !important"
        },
        "& p":{
            color:'red'
        },
        "& label":{
            fontSize:'14px',
            color:'#014d88',
            fontWeight:'bold'
        }
    },
    input: {
        display: 'none'
    } ,
    error: {
        color: "#f85032",
        fontSize: "11px",
      },
}))

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

const KpPrev = (props) =>{
    const theme = useTheme();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const patientObj = props.patientObj;
    const [errors, setErrors] = useState({});
    let temp = { ...errors }
    const classes = useStyles()
   
    const [saving, setSaving] = useState(false);
    const [selected, setSelected] = useState([]);
    // const [optionsForCallOutCome, setOptionsForCallOutCome] = useState([]);
    const [observation, setObservation]=useState({
            data: {},
            date: "",
            htsService:"",
            prepServices:"",
            personId: 0,
            type: "",
           
    })
    const [date, setDate]=useState({
      dateServiceOffered:""
    })
    const [htsServices, setHtsServices] = useState({  
            offeredHts:"",
            acceptedHts:"",
            hivTestResult:"",
            referredForArt:"",
    });
    const [prepServices,setPrepServices]= useState({
            offeredPrep:"",
            acceptedPrep:"",
            referredForPrep:""
    })
    const [commodityService, setCommodityService] =useState({
          condomDispensed:"",
          lubricantsDispensed:"",
          oralQuickDispensed:"",
          newNeedleDispensed:"",
          oldNeedleRetrived:"",
          nalxoneProvided:""

    })
    const [hivEducationProvided, setHivEducationProvided] =useState({
            iecMaterial:"",
            interPersonalCommunication:"",
            peerGroupCommunication:""
    })
    const [bioMedicalServices, setbioMedicalServices] = useState({
        stiScreening:"",
        stiSyndromicManagement:"",
        stiTreatment:"",
        screenedForTb:"",
        providedWithTpt:"",
        screenedForViralHepatits:"",
        viralHepatitsScreenResult:"",
        vaccinationForViralHepatits:"",
        offeredFamilyPlanningServices:"",
        referredForFamilyPlanningServices:"",
        providedWithDrugRehab:"",
        offeredMhpss:"",
        onMedicalAssistedTherapy:"",
        recivedNalxoneForOverdoseTreatment:"",



    });
    const [structuralServices, setstructuralServices] =useState({
      providedOrRefferedForEmpowerment:"",
      legalAidServiceType:"",
      peerGroupCommunication:""
})

    
    // useEffect(() => {
    //         if(props.activeContent.actionType==='update' || props.activeContent.actionType==='view'){
    //             GetFormDetail(props.activeContent.id)
    //         }
    // }, [props.activeContent.actionType]);
    // const GetFormDetail =(id)=>{
    //     axios
    //         .get(`${baseUrl}observation/${id}`,
    //             { headers: {"Authorization" : `Bearer ${token}`} }
    //         )
    //         .then((response) => {
    //             const Obj= response.data
    //             setObservation({...Obj})
    //             //setClientVerificationObj({...Obj.data})
    //             setAttemptList([...Obj.data.attempt]);
    //             setSelected([...Obj.data.anyOfTheFollowing])
    //         })
    //         .catch((error) => {
    //             //console.log(error);
    //         });
    // }
    const handleInputChange= e => {
      //console.log(e.target.value)
      setErrors({...temp, [e.target.name]:""})
      setDate({...date,  [e.target.name]: e.target.value});
      
  }
    const handleInputChangeHtsService= e => {
        //console.log(e.target.value)
        setErrors({...temp, [e.target.name]:""})
        setHtsServices({...htsServices,  [e.target.name]: e.target.value});
        
    }
    const handleInputChangePrepServices= e => {
        //console.log(e.target.value)
        setErrors({...temp, [e.target.name]:""})
        setPrepServices({...prepServices,  [e.target.name]: e.target.value});
        
    }
    const handleInputChangeCommodityServices= e => {
        //console.log(e.target.value)
        setErrors({...temp, [e.target.name]:""})
        setCommodityService({...commodityService,  [e.target.name]: e.target.value});
        
    }
    const handleInputChangeHivEducationProvided = e => {
        //console.log(e.target.value)
        setErrors({...temp, [e.target.name]:""})
        setHivEducationProvided({...hivEducationProvided,  [e.target.name]: e.target.value});
        
    }

    const handleInputChangebioMedicalServices = e => {
        //console.log(e.target.value)
        setErrors({...temp, [e.target.name]:""})
        setbioMedicalServices ({...bioMedicalServices,  [e.target.name]: e.target.value});
       
    }
    const handleInputChangestructuralServices = e => {
      //console.log(e.target.value)
      setErrors({...temp, [e.target.name]:""})
      setstructuralServices ({...structuralServices,  [e.target.name]: e.target.value});
     
  }

    //Validations of the forms
    const validateAttempt = () => { 
        //attempt.verificationAttempts=selected
         temp.dateServiceOffered =date.dateServiceOffered?"": "This field is required"
         setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x === "")
    }
  
   
    /* Remove  function **/
    
    
    /**** Submit Button Processing  */
    const handleSubmit = (e) => {
      e.preventDefault();
      if (validateAttempt()) {
        const data = {
          observation: {
            data: {},
            date: date.dateServiceOffered,
            htsService: htsServices,
            prepServices: prepServices,
            personId: observation.personId,
            type: observation.type,
            //visitId: observation.visitId,
          },
          commodityService: commodityService,
          hivEducationProvided: hivEducationProvided,
          bioMedicalServices: bioMedicalServices,
          structuralServices: structuralServices,
        };
        setSaving(true);
        
        axios.put(`${baseUrl}api/v1/kpprev {props.activeContent.id}`,observation, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            setSaving(false);
            toast.success("Record save successful");
            // Handle any other logic here
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
                    <h5 className='card-title' style={{color:"#fff"}}>
                      KEY POPULATION PREVENTION FORM
                    </h5>
                  
            </div>
            <div className="row d-flex">
              <h2>Service Provider </h2>
              <br />
              <br />
              <div className = "form-group mb-3 col-md-4 "> 
                <FormGroup>
                  <Label>
                  Date Of Service Provisions 
                  </Label>
                  <Input
                  type="date"
                  name="dateServiceOffered"
                  value={date.dateServiceOffered}
                  onChange={handleInputChange}
                  id="dateServiceOffered"
                  style={{
                    border: "1px solid #014D88",
                    borderRadius: "0.25rem",
                  }}
                  >
                  </Input>
                   {errors.dateServiceOffered !== "" ? (
                    <span className={classes.error}>
                      {errors.dateServiceOffered}
                    </span>
                  ) : (
                    ""
                  )}
                </FormGroup>
              </div>
            {/* <div className='card'> */}
                
                <div 
                  className="card-header"
                  style={{
                  backgroundColor: "teal",
                  color: "#fff",
                  fontWeight: "bolder",
                  borderRadius: "0.2rem",}} 
                  
                >
                    <h2 style={{color:'#fff'}}>HTS Services</h2>
                </div>
                    <br />
                    <br />                
                <div className = "form-group mb-3 col-xs-5 col-sm-5 col-md-5 col-lg-5 "> 
                <FormGroup>
                  <Label>
                  Offered HTS
                  </Label>
                  <Input
                  type="select"
                  name="offeredHts"
                  id="offeredHts"
                  onChange ={handleInputChangeHtsService}
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
                <div className = "form-group mb-3 col-xs-5 col-sm-5 col-md-5 col-lg-5 "> 
                <FormGroup>
                  <Label>
                  Accepted HTS
                  </Label>
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
                <div className = "form-group mb-3 col-xs-5 col-sm-5 col-md-5 col-lg-5 "> 
                <FormGroup>
                  <Label>
                    Hiv Test Result
                  </Label>
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
                    <option value="1">Yes</option> 
                    <option value="0">No</option> 
                  </Input>
                </FormGroup>
                </div>
                <div className = "form-group mb-3 col-xs-5 col-sm-5 col-md-5 col-lg-5 "> 
                <FormGroup>
                  <Label>
                    Reffered for ART
                  </Label>
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
            
            {/* </div> */}
            
            <br />

            {/* <div className='card'> */}

            {/* <div className="row d-flex"> */}
            <LabelSui as='a' color='teal' style={{width:'100%', height:'45px'}} ribbon>
                  <h2 style={{color:'#fff'}}>PreP Services</h2>
            </LabelSui> 
            <br />
            <br />
              <div className = "form-group mb-3 col-xs-5 col-sm-5 col-md-5 col-lg-5 "> 
              <FormGroup>
                <Label>
                 Offered Prep
                </Label>
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
              <div className = "form-group mb-3 col-xs-5 col-sm-5 col-md-5 col-lg-5 "> 
              <FormGroup>
                <Label>
                Accepted PreP
                </Label>
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
              <div className = "form-group mb-3 col-xs-5 col-sm-5 col-md-5 col-lg-5 "> 
              <FormGroup>
                <Label>
                  Reffered for Prep
                </Label>
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
            {/* </div> */}

            {/* <div className='card'> */}
                <LabelSui as='a' color='teal' style={{width:'100%', height:'45px'}} ribbon>
                    <h2 style={{color:'#fff'}}>Commodity Service</h2>
                </LabelSui> 
                    <br />
                    <br />
                <div className = "form-group mb-3 col-md-4 col-lg-4"> 
                <FormGroup>
                  <Label>
                    Condom Dispensed 
                  </Label>
                  <Input
                  type="number"
                  name="condomDispensed"
                  id="condomDispensed"
                  onChange={handleInputChangeCommodityServices}
                  value={commodityService.condomDispensed}
                  style={{
                    border: "1px solid #014D88",
                    borderRadius: "0.25rem",
                  }}
                  >
                  </Input>
                </FormGroup>
                </div>
                <div className = "form-group mb-3 col-md-4 col-lg-4 "> 
                <FormGroup>
                  <Label>
                  Lubricants Dispensed
                  </Label>
                  <Input
                  type="number"
                  name="lubricantsDispensed"
                  id="lubricantsDispensed"
                  onChange={handleInputChangeCommodityServices}
                  value={commodityService.lubricantsDispensed}
                  style={{
                    border: "1px solid #014D88",
                    borderRadius: "0.25rem",
                  }}
                  >
                  </Input>
                </FormGroup>
                </div>
                <div className = "form-group mb-3 col-md-4 col-lg-4"> 
                <FormGroup>
                  <Label>
                    Oral Quick/ HIVST dispensed 
                  </Label>
                  <Input
                  type="number"
                  name="oralQuickDispensed"
                  id="oralQuickDispensed"
                  onChange={handleInputChangeCommodityServices}
                  value={commodityService.oralQuickDispensed}
                  style={{
                    border: "1px solid #014D88",
                    borderRadius: "0.25rem",
                  }}
                  >
                  </Input>
                </FormGroup>
                </div>
                <div className = "form-group mb-3 col-md-4 col-lg-4 "> 
                <FormGroup>
                  <Label>
                    New Needles/Syringe Dispesend 
                  </Label>
                  <Input
                  type="number"
                  name="newNeedleDispensed"
                  id="newNeedleDispensed"
                  onChange={handleInputChangeCommodityServices}
                  value={commodityService.newNeedleDispensed}
                  style={{
                    border: "1px solid #014D88",
                    borderRadius: "0.25rem",
                  }}
                  >
                  </Input>
                </FormGroup>
                </div>
                <div className = "form-group mb-3 col-md-4 col-lg-4"> 
                <FormGroup>
                  <Label>
                    Old Needles/Syringe Retrived  
                  </Label>
                  <Input
                  type="number"
                  name="oldNeedleRetrived"
                  id="oldNeedleRetrived"
                  onChange={handleInputChangeCommodityServices}
                  value={commodityService.oldNeedleRetrived}
                  style={{
                    border: "1px solid #014D88",
                    borderRadius: "0.25rem",
                  }}
                  >
                  </Input>
                </FormGroup>
                </div>
                <div className = "form-group mb-3 col-md-4 col-lg-4"> 
                <FormGroup>
                  <Label>
                    Nalxone Provided 
                  </Label>
                  <Input
                  type="number"
                  name="nalxoneProvided"
                  id="nalxoneProvided"
                  onChange={handleInputChangeCommodityServices}
                  value={commodityService.nalxoneProvided}
                  style={{
                    border: "1px solid #014D88",
                    borderRadius: "0.25rem",
                  }}
                  >
                  </Input>
                </FormGroup>
                </div>
                {/* </div> */}
           
           </div>
           <br/>
           {/* <div className='card'> */}
           <div className=" row d-flex">
           <div className="row d-flex">
        <LabelSui as='a' color='blue' style={{width:'106%', height:'45px'}} ribbon>
          <h2 style={{color:'#fff'}}>Biomedical Services</h2>
        </LabelSui>
        <br />
        <br />
            <div className="row">
              <div className="form-group mb-3 col-md-4">
                <FormGroup>
                  <Label>
                    STI Screening
                  </Label>
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
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </Input>
                </FormGroup>    
              </div>
                {bioMedicalServices.stiScreening === "1" && (
                  <div className="form-group mb-3 col-md-4">
                    <Input
                      type="select"
                      name="stiScreeningResponse"
                      id="stiScreeningResponse"
                      value={bioMedicalServices.stiScreeningResponse}
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
                    STI Syndromic Management
                  </Label>
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
                {bioMedicalServices.stiSyndromicManagement === "1" && (
                  <div className="form-group mb-3 col-md-4">
                    <Label>Facility Referred to</Label>
                    <Input
                      type="text"
                      name="facilityReferredTo"
                      id="facilityReferredTo"
                      value={bioMedicalServices.facilityReferredTo}
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
                  STI Treatment/ Referral
                    
                  </Label>
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
                    <option value="1"> Yes </option>
                    <option value="0"> No </option>
                  </Input>
                 
                </FormGroup>
              </div>
              {bioMedicalServices.stiTreatment === "Yes" && (
                <div className="form-group mb-3 col-md-4">
                  <Label> Facility Refferred to </Label>
                  <Input
                    type="text"
                    name="facilityRefferedTo"
                    id="facilityRefferedTo"
                    //value={ioMedicalServices.dateOfDiscontinuation} //  min={enrollDate}
                    //onChange={handleInputChangebioMedicalServices}
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
                      Screened for TB                    
                  </Label>
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
              {bioMedicalServices.screenedForTb === "Yes" && (
                <div className="form-group mb-3 col-md-4">
                  <Label> Facility Refferred to </Label>
                  <Input
                    type="text"
                    name="facilityRefferedTo"
                    id="facilityRefferedTo"
                    //value={clientVerificationObj.dateOfDiscontinuation} //  min={enrollDate}
                    //onChange={handleInputChangebioMedicalServices}
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
                  Provided with TPT      
                  </Label>
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
                  <Label>
                  Screened For Viral Heaptits 
                  </Label>
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
                    <option value="1"> Yes </option>
                    <option value="0"> No </option>
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
              {bioMedicalServices.screenedForViralHepatits === "Yes" && (
                <div className="form-group mb-3 col-md-4">
                  <Label> Facility Refferred to </Label>
                  <Input
                    type="text"
                    name="facilityRefferedTo"
                    id="facilityRefferedTo"
                    //value={clientVerificationObj.dateOfDiscontinuation} //  min={enrollDate}
                    //onChange={handleInputChangebioMedicalServices}
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
                  Viral Hepatits Screen Result 
                  </Label>
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
                    <option value="Positive"> Positive </option>
                    <option value="Negative"> Negative</option>
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
              {bioMedicalServices.viralHepatitsScreenResult === "Positive" && (
                <div className="form-group mb-3 col-md-4">
                  <Label> Facility Refferred to </Label>
                  <Input
                    type="text"
                    name="facilityRefferedTo"
                    id="facilityRefferedTo"
                    //value={clientVerificationObj.dateOfDiscontinuation} //  min={enrollDate}
                    //onChange={handleInputChangebioMedicalServices}
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
                  Vaccination For Viral Hepatits
                  </Label>
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
              {bioMedicalServices.vaccinationForViralHepatits === "Yes" && (
                <div className="form-group mb-3 col-md-4">
                  <Label> Facility Refferred to </Label>
                  <Input
                    type="text"
                    name="facilityRefferedTo"
                    id="facilityRefferedTo"
                    //value={clientVerificationObj.dateOfDiscontinuation} //  min={enrollDate}
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
                  Offered Family Planning Services
                    
                  </Label>
                  <Input
                    type="select"
                    name="offeredFamilyPlanningServices"
                    id="offeredFamilyPlanningServices"
                    value={bioMedicalServices.offeredFamilyPlanningServices}
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
              {bioMedicalServices.offeredFamilyPlanningServices === "Yes" && (
                <div className="form-group mb-3 col-md-4">
                  <Label> Facility Refferred to </Label>
                  <Input
                    type="text"
                    name="facilityRefferedTo"
                    id="facilityRefferedTo"
                    //value={clientVerificationObj.dateOfDiscontinuation} //  min={enrollDate}
                    //onChange={handleInputChangebioMedicalServices}
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
                  Refferred For Family Planning Services
                    
                  </Label>
                  <Input
                    type="select"
                    name="refferedForFamilyPlanningServices"
                    id="refferedForFamilyPlanningServices"
                    value={bioMedicalServices.refferedForFamilyPlanningServices}
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
              {bioMedicalServices.refferedForFamilyPlanningServices === "Yes" && (
                <div className="form-group mb-3 col-md-4">
                  <Label> Facility Refferred to </Label>
                  <Input
                    type="text"
                    name="facilityRefferedTo"
                    id="facilityRefferedTo"
                    //value={clientVerificationObj.dateOfDiscontinuation} //  min={enrollDate}
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
                  Provided With Drug Rehab
                    
                  </Label>
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
              {bioMedicalServices.providedWithDrugRehab === "Yes" && (
                <div className="form-group mb-3 col-md-4">
                  <Label> Facility Refferred to </Label>
                  <Input
                    type="text"
                    name="facilityRefeRredTo"
                    id="facilityRefeRredTo"
                    //value={clientVerificationObj.dateOfDiscontinuation} //  min={enrollDate}
                    //onChange={handleInputChangebioMedicalServices}
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
                  Offered MHPSS
                  </Label>
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
              {bioMedicalServices.offeredMhpss === "Yes" && (
                <div className="form-group mb-3 col-md-4">
                  <Label>Facility Refferred to </Label> Type  of MHpss 
                  <Input
                    type="text"
                    name="facilityRefferedTo"
                    id="facilityRefferedTo"
                    //value={clientVerificationObj.dateOfDiscontinuation} //  min={enrollDate}
                    //onChange={handleInputChangebioMedicalServices}
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
                  On Medical Assisted Therapy (MAT) for atleast
                    
                  </Label>
                  <Input
                    type="select"
                    name="onMedicalAssistedTherapy"
                    id="onMedicalAssistedTherapy"
                    value={bioMedicalServices.onMedicalAssistedTherapy}
                    //onChange={handleInputChangebioMedicalServices}
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
              {bioMedicalServices.onMedicalAssistedTherapy === "Yes" && (
                <div className="form-group mb-3 col-md-4">
                  <Label> Facility Refferred to </Label>
                  <Input
                    type="text"
                    name="facilityRefferedTo"
                    id="facilityRefferedTo"
                    //value={clientVerificationObj.dateOfDiscontinuation} //  min={enrollDate}
                    //onChange={handleInputChangebioMedicalServices}
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
                  Recived Nalxone for Overdose Treatment 
                    
                  </Label>
                  <Input
                    type="select"
                    name="recivedNalxoneForOverdoseTreatment"
                    id="recivedNalxoneForOverdoseTreatment"
                    value={bioMedicalServices.recivedNalxoneForOverdoseTreatment}
                    //onChange={handleInputChangebioMedicalServices}
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
             </div>
             </div>

             <div className="row d-flex">

             <LabelSui as='a' color='blue' style={{width:'106%', height:'45px'}} ribbon>

              <h2 style={{color:'#fff'}}> Structural Services  </h2>
              </LabelSui>
              <br />
              <br />
                <div className="form-group mb-3 col-md-4">
                <FormGroup>
                  <Label>
                  Provided or Reffered for Empowerment
                    
                  </Label>
                  <Input
                    type="select"
                    name="providedOrRefferedForEmpowerment"
                    id="providedOrRefferedForEmpowerment"
                    value={structuralServices.recivedNalxoneForOverdoseTreatment}
                    onChange={handleInputChangestructuralServices}
                    style={{
                      border: "1px solid #014D88",
                      borderRadius: "0.25rem",
                    }}
                  >
                    <option value=""> Select </option>
                    <option value="1"> Yes </option>
                    <option value="0"> No </option>
                  </Input>
                  {/* {errors.discontinuation !== "" ? (
                    <span className={classes.error}>
                      {errors.discontinuation}
                    </span>
                  ) : (
                    ""
                  )} */}
                </FormGroup>
                {/* {structuralService.recivedNalxoneForOverdoseTreatment === "Yes" && (
                <div className="form-group mb-3 col-md-4">
                  <Label> Facility Refferred to </Label>
                  <Input
                    type="text"
                    name="facilityRefferedTo"
                    id="facilityRefferedTo"
                    //value={clientVerificationObj.dateOfDiscontinuation} //  min={enrollDate}
                    //onChange={handleInputChangebioMedicalServices}
                    style={{
                      border: "1px solid #014D88",
                      borderRadius: "0.25rem",
                    }}
                  
                  />
                </div>
              )} */}

                </div>
                <div className="form-group mb-3 col-md-4">
                <FormGroup>
                  <Label>
                       Legal Aid Service Type
                  </Label>
                  <Input
                    type="select"
                    name="legalAidServiceType"
                    id="legalAidServiceType"
                    value={structuralServices.recivedNalxoneForOverdoseTreatment}
                    onChange={handleInputChangestructuralServices}
                    style={{
                      border: "1px solid #014D88",
                      borderRadius: "0.25rem",
                    }}
                  >
                    <option value=""> Select </option>
                    <option value="1"> Yes </option>
                    <option value="0"> No </option>
                  </Input>
                  {/* {errors.legalAidServiceType !== "" ? (
                    <span className={classes.error}>
                      {errors.legalAidServiceType}
                    </span>
                  ) : (
                    ""
                  )} */}
                </FormGroup>
                {/* {structuralService.recivedNalxoneForOverdoseTreatment === "Yes" && (
                <div className="form-group mb-3 col-md-4">
                  <Label> Facility Refferred to </Label>
                  <Input
                    type="text"
                    name="facilityRefferedTo"
                    id="facilityRefferedTo"
                    //value={clientVerificationObj.dateOfDiscontinuation} //  min={enrollDate}
                    //onChange={handleInputChangebioMedicalServices}
                    style={{
                      border: "1px solid #014D88",
                      borderRadius: "0.25rem",
                    }}
                  
                  />
                </div>
              )} */}

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
              {!saving ? (
                <span style={{ textTransform: "capitalize" }}>
                  {" "}
                  {props.activeContent.actionType === "update"
                    ? "Update"
                    : "Save"}
                </span>
              ) : (
                <span style={{ textTransform: "capitalize" }}>
                  {props.activeContent.actionType === "update"
                    ? "Update..."
                    : "Save..."}
                </span>
              )}
            </MatButton>
            {/* </div> */}
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
export default KpPrev;
