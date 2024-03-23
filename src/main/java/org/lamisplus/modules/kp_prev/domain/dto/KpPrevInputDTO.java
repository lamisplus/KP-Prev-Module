package org.lamisplus.modules.kp_prev.domain.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import javax.annotation.Nullable;
import javax.persistence.Convert;

import org.lamisplus.modules.kp_prev.utility.*;


import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;


@Data
@AllArgsConstructor
@Builder
public class KpPrevInputDTO implements Serializable {
	
	private Long id;
	private String htsCode;
	private String prevCode;
	private String patientId;
	private String serviceProvider;
	private String target_group;
	private String prepCode;
	private String patientIdentifier;

	
    @Convert(converter = LocalDateConverter.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate dateServiceOffered;
	private HtsServiceDTO htsServices;
	private PrepServiceDTO prepServices;
	private EntryPointDTO entryPoint;
	private BiomedicalServiceDTO bioMedicalServices;
	private StructuralServiceDTO structuralServices;
	private CommodityServiceDTO commodityServices;
	private HivEducationalServiceDTO hivEducationalServices;


	
	

}
