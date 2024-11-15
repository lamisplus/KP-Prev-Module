package org.lamisplus.modules.kp_prev.repository;

import java.util.List;

import org.lamisplus.modules.kp_prev.domain.dto.PersonDtos;
import org.lamisplus.modules.kp_prev.domain.entity.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface KpPrevRepository extends JpaRepository<KpPrev, Long> {


	@Query(value = "SELECT active, deceased_date_time, deceased, date_of_registration AS dateOfRegistration, \n" +
			"CAST(identifier AS TEXT) AS identifier, CAST(education AS TEXT) AS education, CAST(employment_status AS TEXT) AS employmentStatus, \n" +
			"CAST(marital_status AS TEXT) AS maritalStatus, CAST(gender AS TEXT) AS gender, CAST(organization AS TEXT) AS organization, \n" +
			"CAST(contact_point AS TEXT) AS contactPoint, CAST(address AS TEXT) AS address,CAST(contact AS TEXT) AS contact, \n" +
			"is_date_of_birth_estimated AS isDateOfBirthEstimated, facility_id AS facilityId, emr_id AS emrId, nin_number AS niNumber, date_of_birth AS dateOfBirth, \n" +
			"pp.id, pp.uuid, sex, first_name AS firstName, surname, other_name AS otherName, full_name AS fullName, pp.hospital_number AS hospitalNumber \n" +
			"FROM patient_person pp WHERE uuid NOT IN (SELECT person_uuid FROM kp_prev kp where kp.archived = 0) \n" +
			"AND (pp.first_name ilike ?1 OR pp.surname ilike ?1 OR pp.other_name ilike ?1 OR pp.full_name ilike ?1 \n" +
			"OR pp.hospital_number ilike ?1)  and pp.archived=?2 AND pp.facility_id=?3", nativeQuery = true)
	Page<PersonDtos> findAllPatientBySearchParameters(String queryParam, Integer archived, Long facilityId, Pageable pageable);


	@Query(value = "SELECT active, deceased_date_time, deceased, date_of_registration AS dateOfRegistration, \n" +
			"CAST(identifier AS TEXT) AS identifier, CAST(education AS TEXT) AS education, CAST(employment_status AS TEXT) AS employmentStatus, \n" +
			"CAST(marital_status AS TEXT) AS maritalStatus, CAST(gender AS TEXT) AS gender, CAST(organization AS TEXT) AS organization, \n" +
			"CAST(contact_point AS TEXT) AS contactPoint, CAST(address AS TEXT) AS address,CAST(contact AS TEXT) AS contact, \n" +
			"is_date_of_birth_estimated AS isDateOfBirthEstimated, facility_id AS facilityId, emr_id AS emrId, nin_number AS niNumber, date_of_birth AS dateOfBirth, \n" +
			"pp.id, pp.uuid, sex, first_name AS firstName, surname, other_name AS otherName, full_name AS fullName, pp.hospital_number AS hospitalNumber \n" +
			"FROM patient_person pp WHERE uuid NOT IN (SELECT person_uuid FROM kp_prev kp where kp.archived = 0) and pp.archived=?1 AND pp.facility_id=?2", nativeQuery = true)
	Page<PersonDtos> findAllPatient (Integer archived,Long facilityId,Pageable pageable);
	
	@Query(value = "select * from kp_prev where archived = ?1 and facility_id = ?2 ",nativeQuery = true)
	Page<KpPrev> getAllByArchivedAndFacilityIdOrderByIdDesc(Integer archived,Long currentOrganisationUnitId,Pageable pageable);
	
	@Query(value = "SELECT * FROM kp_prev WHERE (prevention_code ilike ?1) AND archived=?2 AND facility_id=?3", nativeQuery = true)
    Page<KpPrev> findAllServicesBySearchParameters(String queryParam, Integer archived, Long facilityId, Pageable pageable);

	@Query(value = "select * from kp_prev where archived = 0 and person_uuid = ?1", nativeQuery = true)
	List<KpPrev> getAllKpPrevByPersonId(String patientID);
}
