package org.lamisplus.modules.kpprev.repository;

import java.util.List;

import org.lamisplus.modules.kpprev.domain.entity.KpPrev;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KpPrevRepository extends JpaRepository<KpPrev, Long> {
	
	
	List<KpPrev> getAllByArchivedOrderByLastModifiedDate();
}
