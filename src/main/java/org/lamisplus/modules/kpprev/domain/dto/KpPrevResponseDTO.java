package org.lamisplus.modules.kpprev.domain.dto;

import java.util.Date;
import javax.persistence.Convert;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.lamisplus.modules.kpprev.utility.LocalDateConverter;


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
	
    @Convert(converter = LocalDateConverter.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date dateServiceOffered;
	private Object htsServices;
	private Object prepServices;
	private Object entryPoint;
	private Object biomedicalServices;
	private Object structuralServices;
	private Object commodityServices;
	private Object hivEducationalServices;
	

}
