package org.lamisplus.modules.kp_prev.domain.dto;

import java.io.Serializable;

//import org.lamisplus.modules.patient.domain.dto.IdentifierDto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StructuralServiceDTO implements Serializable {
	
	private String providedEmpowerment;
	private String legalAidServices;
	private String type_empowerment_provided;
	private String typeLegalEmpowerment;
	private String legalProgramReferred;
	private String empowermentProgramReferred;
	

}
