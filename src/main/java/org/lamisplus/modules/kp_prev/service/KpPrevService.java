package org.lamisplus.modules.kp_prev.service;

import java.util.List;
import java.util.Optional;



import java.util.UUID;
import java.util.stream.Collectors;

import org.lamisplus.modules.kp_prev.domain.dto.*;
import org.lamisplus.modules.kp_prev.domain.entity.*;
import org.lamisplus.modules.kp_prev.repository.*;
import org.audit4j.core.util.Log;
import org.lamisplus.modules.base.controller.apierror.EntityNotFoundException;
import org.lamisplus.modules.base.domain.entities.User;
import org.lamisplus.modules.base.domain.repositories.ApplicationCodesetRepository;
import org.lamisplus.modules.base.domain.repositories.OrganisationUnitRepository;
import org.lamisplus.modules.base.service.MenuService;
import org.lamisplus.modules.base.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
	static final String SERVICE_NOT_FOUND_MESSAGE = "No such service instance with id";
	
	public KpPrevResponseDTO createKpPrev(KpPrevInputDTO dto)
	{
		KpPrev preventionService = this.getPreventionServiceFromDto(dto);
		Optional<User> currentUser = userService.getUserWithRoles();
		if (currentUser.isPresent()) {
            User user = currentUser.get();
            Long currentOrganisationUnitId = user.getCurrentOrganisationUnitId();
            preventionService.setFacilityId(currentOrganisationUnitId);
        }
        preventionService.setUuid(UUID.randomUUID().toString());
		return this.getDtoFromKpPrev(kpPrevRepository.save(preventionService));
	}
   
	
	private KpPrev getPreventionServiceFromDto(KpPrevInputDTO dto)
	{
		log.info("hellllllooooo...herree" + dto.getPatientIdentifier());
		//System.out.print(dto.getPrevCode() + ";"+dto.getHtsCode()+";"+dto.getServiceProvider()+";"+dto.getTarget_group());
		KpPrev preventionService = new KpPrev();
		if(dto.getHtsCode() != null) preventionService.setHtsCode(dto.getHtsCode());
		if(dto.getPrevCode() != null) preventionService.setPrevCode(dto.getPrevCode());
		if(dto.getPatientId() != null) preventionService.setPersonId(dto.getPatientId());
		if(dto.getServiceProvider() != null) preventionService.setServiceProviderName(dto.getServiceProvider());
		if(dto.getServiceProviderSignature() != null) preventionService.setServiceProviderSignature(dto.getServiceProviderSignature());
		if(dto.getTarget_group() != null) preventionService.setTarget_group(dto.getTarget_group());
		preventionService.setArchived(0);
		if(dto.getDateServiceOffered() != null) preventionService.setDateServiceOffered(dto.getDateServiceOffered());
		HtsServiceDTO hts = dto.getHtsServices();
		PrepServiceDTO prep = dto.getPrepServices();
		EntryPointDTO entry = dto.getEntryPoint();
		BiomedicalServiceDTO biomed = dto.getBioMedicalServices();
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
		preventionService.setPatientIdentifier(dto.getPatientIdentifier());

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
		response.setServiceProviderSignature(kpprev.getServiceProviderSignature());
		response.setBiomedicalServices(kpprev.getBiomedicalServices());
		response.setCommodityServices(kpprev.getCommodityServices());
		response.setHtsServices(kpprev.getHtsServices());
		response.setPrepServices(kpprev.getPrepServices());
		response.setStructuralServices(kpprev.getStructuralServices());
		response.setHivEducationalServices(kpprev.getHivEducationalServices());
		response.setEntryPoint(kpprev.getEntryPoint());
		response.setDateServiceOffered(kpprev.getDateServiceOffered());
		response.setUuid(kpprev.getUuid());
		response.setPatientIdentifier(kpprev.getPatientIdentifier());

		
		return response;
		
	}


	public  KpPrevMetaDataDto findKpPrevBySearchParam(String searchParam, Integer pageNo, Integer pageSize) {
		Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by("id").descending());
        Optional<User> currentUser = this.userService.getUserWithRoles();
        Long currentOrganisationUnitId = 0L;
        if (currentUser.isPresent()) {
            User user = (User) currentUser.get();
            currentOrganisationUnitId = user.getCurrentOrganisationUnitId();
            System.out.println("facility id is:" + currentOrganisationUnitId);

        }
        String queryParam = "";
        Page<KpPrev> services = null;
        if (!((searchParam == null) || (searchParam.equals("*")))) {
            searchParam = searchParam.replaceAll("\\s", "");
            searchParam = searchParam.replaceAll(",", "");

            queryParam = "%" + searchParam + "%";
            services = kpPrevRepository.findAllServicesBySearchParameters(queryParam, 0, currentOrganisationUnitId, paging);
        } else {
            services = kpPrevRepository.getAllByArchivedAndFacilityIdOrderByIdDesc(0, currentOrganisationUnitId, paging);
        }

        if (services.hasContent()) {

        	System.out.println("There are a total of :"+services.getSize());
        	KpPrevMetaDataDto kpPrevMetaDataDto = new KpPrevMetaDataDto();
            kpPrevMetaDataDto.setTotalRecords(services.getTotalElements());
            kpPrevMetaDataDto.setPageSize(services.getSize());
            kpPrevMetaDataDto.setTotalPages(services.getTotalPages());
            kpPrevMetaDataDto.setCurrentPage(services.getNumber());
            kpPrevMetaDataDto.setRecords(services.getContent().stream().map(this::getDtoFromKpPrev).collect(Collectors.toList()));
            return kpPrevMetaDataDto;
        }
        
		return null;
	}
	
	public KpPrevResponseDTO updateKpPrev(Long id, KpPrevInputDTO kpPrevDto) {
        KpPrev existservice = kpPrevRepository
                .findById(id).orElseThrow(() -> new EntityNotFoundException(KpPrevService.class, SERVICE_NOT_FOUND_MESSAGE + id));
        KpPrev preventionService = this.getPreventionServiceFromDto(kpPrevDto);
        preventionService.setId(existservice.getId());
        preventionService.setUuid(existservice.getUuid());
		preventionService.setPersonId(existservice.getPersonId());
        preventionService.setCreatedBy(existservice.getCreatedBy());
        preventionService.setCreatedDate(existservice.getCreatedDate());
        preventionService.setArchived(existservice.getArchived());
        preventionService.setFacilityId(existservice.getFacilityId());
		preventionService.setPatientIdentifier(existservice.getPatientIdentifier());
        return getDtoFromKpPrev(kpPrevRepository.save(preventionService));
    }
	public void deleteKpPrevById(Long id) {
        KpPrev kpPrev = kpPrevRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException(KpPrevService.class, "errorMessage", SERVICE_NOT_FOUND_MESSAGE + id));
        kpPrev.setArchived(1);
        kpPrevRepository.save(kpPrev);
    }

	public List<KpPrev> getAllKpPrevById(String person_uuid) {
		return kpPrevRepository.getAllKpPrevByPersonId(person_uuid);
	}

}
