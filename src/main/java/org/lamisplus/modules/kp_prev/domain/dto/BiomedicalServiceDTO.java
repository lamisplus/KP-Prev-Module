package org.lamisplus.modules.kp_prev.domain.dto;

import java.io.Serializable;

//import org.lamisplus.modules.patient.domain.dto.IdentifierDto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BiomedicalServiceDTO implements Serializable 
{
 private String sti_screening;
 private String sti_syndromic_management;
 private String sti_treatment;
 private String screened_for_tb;
 private String provided_with_tpt;
 private String screened_for_viral_hepatitis;
 private String viral_hepatitis_screen_result;
 private String vaccination_for_viral_hepatitis;
 private String offered_family_planning_services;
 private String referred_for_family_planning_services;
 private String provided_with_drug_rehab;
 private String offered_mhpss;
 private String received_naloxone_for_overdose_treatment;
 private String medical_assisted_therapy_for_six_months;
 private String sti_screening_result;
 //private String facility_referred_sti_synd_mgt;
 private String sti_facility_referred;
 private String tb_facility_reffered;
 //private String facility_referred_txViralHepatitis;
 //private String facility_referred_vaccineViralHepatitis;
 //private String familyPlanning_screen_result;
 //private String facility_referred_familyPlanning;
 private String referred_facility_drug_rehab;
 private String drug_rehab_facility_reffered;
 private String type_of_mhpss;
 
}
