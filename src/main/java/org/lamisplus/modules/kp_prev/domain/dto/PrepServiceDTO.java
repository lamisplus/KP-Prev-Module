package org.lamisplus.modules.kp_prev.domain.dto;

import java.io.Serializable;

//import org.lamisplus.modules.patient.domain.dto.IdentifierDto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PrepServiceDTO implements Serializable {
	
	private int offered_prep;
	private int accepted_prep;
	private int referred_for_prep;

}
