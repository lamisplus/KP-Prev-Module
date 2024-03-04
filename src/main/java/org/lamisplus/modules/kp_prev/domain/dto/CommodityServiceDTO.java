package org.lamisplus.modules.kp_prev.domain.dto;

import java.io.Serializable;

//import org.lamisplus.modules.patient.domain.dto.IdentifierDto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CommodityServiceDTO implements Serializable {
	
	private int condoms_dispensed;
	private int lubricants_dispensed;
	private int hivst_kits_dispensed;
	private int new_needles_dispensed;
	private int old_needles_dispensed;
	private int naloxane_provided;

}
