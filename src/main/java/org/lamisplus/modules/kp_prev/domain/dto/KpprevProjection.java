package org.lamisplus.modules.kp_prev.domain.dto;

import java.time.LocalDate;

public interface KpprevProjection {
    Long id();
    String hospitalNumber();
    String firstName();
    String lastName();
    String dateOfBirth();
    String htsCode();
    String prevCode();
    String patientId();
    String patientIdentifier();
    LocalDate dateServiceOffered();
    Object htsServices();
    Object prepServices();
    Object biomedicalServices();
    Object structuralServices();
    Object commodityServices();
    Object hivEducationalServices();
}
