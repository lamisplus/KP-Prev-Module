package org.lamisplus.modules.kp_prev.domain.dto;

import java.io.Serializable;

//import org.lamisplus.modules.patient.domain.dto.IdentifierDto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BiomedicalServiceDTO implements Serializable 
{
 private int sti_screening;
 private int sti_syndromic_management;
 private int sti_treatment;
 private int screened_for_tb;
 private int provided_with_tpt;
 private int screened_for_viral_hepatitis;
 private int viral_hepatitis_screen_result;
 private int vaccination_for_viral_hepatitis;
 private int offered_family_planning_services;
 private int referred_for_family_planning_services;
 private int provided_with_drug_rehab;
 private int offered_mhpss;
 private int received_naloxone_for_overdose_treatment;
 private int medical_assisted_therapy_for_six_months;
 
}
