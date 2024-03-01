package org.lamisplus.modules.kpprev.service;

import java.util.Optional;

import java.util.UUID;
import org.lamisplus.modules.base.domain.entities.User;
import org.lamisplus.modules.base.service.UserService;
import org.lamisplus.modules.kpprev.domain.dto.*;
import org.lamisplus.modules.kpprev.domain.entity.KpPrev;
import org.lamisplus.modules.kpprev.repository.KpPrevRepository;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Service
@RequiredArgsConstructor
@Slf4j
public class KpPrevService {
	
	private final KpPrevRepository kpPrevRepository;
	private final UserService userService;
	
	public KpPrevResponseDTO createKpPrev(KpPrevInputDTO dto)
	{
		KpPrev preventionService = this.getPreventionServiceFromDto(dto);
		Optional<User> currentUser = userService.getUserWithRoles();
        preventionService.setUuid(UUID.randomUUID().toString());
		return this.getDtoFromKpPrev(kpPrevRepository.save(preventionService));
	}
   
	
	private KpPrev getPreventionServiceFromDto(KpPrevInputDTO dto)
	{
		
		KpPrev preventionService = new KpPrev();
		if(dto.getHtsCode() != null) preventionService.setHtsCode(dto.getHtsCode());
		if(dto.getPrevCode() != null) preventionService.setPrevCode(dto.getPrevCode());
		if(dto.getPatientId() != null) preventionService.setPersonId(dto.getPatientId());
		if(dto.getServiceProvider() != null) preventionService.setServiceProviderName(dto.getServiceProvider());
		if(dto.getTarget_group() != null) preventionService.setTarget_group(dto.getTarget_group());
		preventionService.setArchived(0);
		if(dto.getDateServiceOffered() != null) preventionService.setDateServiceOffered(dto.getDateServiceOffered());
		HtsServiceDTO hts = dto.getHtsServices();
		PrepServiceDTO prep = dto.getPrepServices();
		EntryPointDTO entry = dto.getEntryPoint();
		BiomedicalServiceDTO biomed = dto.getBiomedicalServices();
		StructuralServiceDTO structural = dto.getStructuralServices();
		CommodityServiceDTO commodity = dto.getCommodityServices();
		HivEducationalServiceDTO educational = dto.getHivEducationalServices();
		ObjectMapper mapper = new ObjectMapper();
		preventionService.setHtsServices(mapper.valueToTree(hts));
		preventionService.setPrepServices(mapper.valueToTree(prep));
		preventionService.setEntryPoint(mapper.valueToTree(entry));
		preventionService.setBiomedicalServices(mapper.valueToTree(biomed));
		preventionService.setStructuralServices(mapper.valueToTree(structural));
		preventionService.setCommodityServices(mapper.valueToTree(commodity));
		preventionService.setHivEducationalServices(mapper.valueToTree(educational));
		return preventionService;
	}
	
	private KpPrevResponseDTO getDtoFromKpPrev(KpPrev kpprev)
	{
		KpPrevResponseDTO response = new KpPrevResponseDTO();
		response.setId(kpprev.getId());
		response.setHtsCode(kpprev.getHtsCode());
		response.setPrevCode(kpprev.getPrevCode());
		response.setPatientId(kpprev.getPersonId());
		response.setTarget_group(kpprev.getTarget_group());
		response.setServiceProvider(kpprev.getServiceProviderName());
		response.setBiomedicalServices(kpprev.getBiomedicalServices());
		response.setCommodityServices(kpprev.getCommodityServices());
		response.setHtsServices(kpprev.getHtsServices());
		response.setPrepServices(kpprev.getPrepServices());
		response.setStructuralServices(kpprev.getStructuralServices());
		response.setHivEducationalServices(kpprev.getHivEducationalServices());
		response.setEntryPoint(kpprev.getEntryPoint());
		response.setUuid(kpprev.getUuid());
		
		return response;
		
	}
}
