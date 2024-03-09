package org.lamisplus.modules.kp_prev.domain.dto;

import java.io.Serializable;

//import org.lamisplus.modules.patient.domain.dto.IdentifierDto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HivEducationalServiceDTO implements Serializable {
	
	private String peerGroupCommunication;
	private String interPersonalCommunication;
	private String iecMaterial;

}
