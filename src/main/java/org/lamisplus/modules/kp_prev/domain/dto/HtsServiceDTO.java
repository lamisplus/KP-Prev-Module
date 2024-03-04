package org.lamisplus.modules.kp_prev.domain.dto;

import java.io.Serializable;

//mport org.lamisplus.modules.patient.domain.dto.IdentifierDto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HtsServiceDTO implements Serializable

{
private int offered_hts;
private int accepted_hts;
private int hiv_test_result;
private int referred_for_art;


}
