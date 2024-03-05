package org.lamisplus.modules.kp_prev.domain.dto;

import java.io.Serializable;

//import org.lamisplus.modules.patient.domain.dto.IdentifierDto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PrepServiceDTO implements Serializable {
	
	private String offered_prep;
	private String accepted_prep;
	private String referred_for_prep;

}
