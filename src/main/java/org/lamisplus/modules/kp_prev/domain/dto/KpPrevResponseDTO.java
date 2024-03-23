package org.lamisplus.modules.kp_prev.domain.dto;

import java.time.LocalDate;


import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Convert;

import org.lamisplus.modules.kp_prev.utility.*;
//import org.lamisplus.modules.patient.domain.dto.PersonResponseDto;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@NoArgsConstructor
public class KpPrevResponseDTO {
	
	private Long id;
	private String htsCode;
	private String prevCode;
	private String patientId;
	private String target_group;
	private String serviceProvider;
	private String uuid;
	private String patientIdentifier;
	
    @Convert(converter = LocalDateConverter.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate dateServiceOffered;
	private Object htsServices;
	private Object prepServices;
	private Object entryPoint;
	private Object biomedicalServices;
	private Object structuralServices;
	private Object commodityServices;
	private Object hivEducationalServices;
	

}
