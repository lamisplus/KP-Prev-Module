package org.lamisplus.modules.kp_prev.domain.dto;

import java.time.LocalDate;

public interface PersonDtos {

    String getHospitalNumber();
    String getFirstName();
    String getSurname();
    String getOtherName();
    String getSex();
    String getUniqueId();
    String getUuid();
    Boolean getIsDobEstimated();
    Integer getAge();
    Long getId();
    Long getFacilityId();
    LocalDate getDateOfBirth();
}
