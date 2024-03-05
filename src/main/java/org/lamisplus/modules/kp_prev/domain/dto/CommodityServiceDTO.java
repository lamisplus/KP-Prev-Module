package org.lamisplus.modules.kp_prev.domain.dto;

import java.io.Serializable;

//import org.lamisplus.modules.patient.domain.dto.IdentifierDto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CommodityServiceDTO implements Serializable {
	
	private String condoms_dispensed;
	private String lubricants_dispensed;
	private String hivst_kits_dispensed;
	private String new_needles_dispensed;
	private String old_needles_dispensed;
	private String naloxane_provided;

}
