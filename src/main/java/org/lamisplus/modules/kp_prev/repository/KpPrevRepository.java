package org.lamisplus.modules.kp_prev.repository;

import java.util.List;

import org.lamisplus.modules.kp_prev.domain.entity.*;
//import org.lamisplus.modules.patient.domain.entity.Person;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface KpPrevRepository extends JpaRepository<KpPrev, Long> {
	
	
	@Query(value = "select * from kp_prev where archived = ?1 and facility_id = ?2 ",nativeQuery = true)
	Page<KpPrev> getAllByArchivedAndFacilityIdOrderByIdDesc(Integer archived,Long currentOrganisationUnitId,Pageable pageable);
	
	@Query(value = "SELECT * FROM kp_prev WHERE (prevention_code ilike ?1) AND archived=?2 AND facility_id=?3", nativeQuery = true)
    Page<KpPrev> findAllServicesBySearchParameters(String queryParam, Integer archived, Long facilityId, Pageable pageable);

	@Query(value = "select * from kp_prev where archived = 0 and person_uuid = ?1", nativeQuery = true)
	List<KpPrev> getAllKpPrevByPersonId(String patientID);
}
