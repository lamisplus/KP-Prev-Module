package org.lamisplus.modules.kp_prev.domain.dto;

import java.io.Serializable;

//mport org.lamisplus.modules.patient.domain.dto.IdentifierDto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HtsServiceDTO implements Serializable

{
private String offered_hts;
private String accepted_hts;
private String hiv_test_result;
private String referred_for_art;
private String known_positive;
private String hts_client_code;
private String hts_final_result;


}
