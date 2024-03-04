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
	
    @Convert(converter = LocalDateConverter.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate dateServiceOffered;
	private HtsServiceDTO htsServices;
	private PrepServiceDTO prepServices;
	private EntryPointDTO entryPoint;
	private BiomedicalServiceDTO biomedicalServices;
	private StructuralServiceDTO structuralServices;
	private CommodityServiceDTO commodityServices;
	private HivEducationalServiceDTO hivEducationalServices;
	/*public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getHtsCode() {
		return htsCode;
	}
	public void setHtsCode(String htsCode) {
		this.htsCode = htsCode;
	}
	public String getPatientId() {
		return patientId;
	}
	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}
	public HtsServiceDTO getHtsServices() {
		return htsServices;
	}
	public void setHtsServices(HtsServiceDTO htsServices) {
		this.htsServices = htsServices;
	}
	public PrepServiceDTO getPrepServices() {
		return prepServices;
	}
	public void setPrepServices(PrepServiceDTO prepServices) {
		this.prepServices = prepServices;
	}
	public EntryPointDTO getEntryPoint() {
		return entryPoint;
	}
	public void setEntryPoint(EntryPointDTO entryPoint) {
		this.entryPoint = entryPoint;
	}
	public BiomedicalServiceDTO getBiomedicalServices() {
		return biomedicalServices;
	}
	public void setBiomedicalServices(BiomedicalServiceDTO biomedicalServices) {
		this.biomedicalServices = biomedicalServices;
	}
	public StructuralServiceDTO getStructuralServices() {
		return structuralServices;
	}
	public void setStructuralServices(StructuralServiceDTO structuralServices) {
		this.structuralServices = structuralServices;
	}
	public CommodityServiceDTO getCommodityServices() {
		return commodityServices;
	}
	public void setCommodityServices(CommodityServiceDTO commodityServices) {
		this.commodityServices = commodityServices;
	}
	public HivEducationalServiceDTO getHivEducationalServices() {
		return hivEducationalServices;
	}
	public void setHivEducationalServices(HivEducationalServiceDTO hivEducationalServices) {
		this.hivEducationalServices = hivEducationalServices;
	}
	public String getPrevCode() {
		return prevCode;
	}
	public void setPrevCode(String prevCode) {
		this.prevCode = prevCode;
	}
	public String getServiceProvider() {
		return serviceProvider;
	}
	public void setServiceProvider(String serviceProvider) {
		this.serviceProvider = serviceProvider;
	}
	public String getTarget_group() {
		return target_group;
	}
	public void setTarget_group(String target_group) {
		this.target_group = target_group;
	}
	public Date getDateServiceOffered() {
		return dateServiceOffered;
	}
	public void setDateServiceOffered(Date dateServiceOffered) {
		this.dateServiceOffered = dateServiceOffered;
	}*/
	
	

}
