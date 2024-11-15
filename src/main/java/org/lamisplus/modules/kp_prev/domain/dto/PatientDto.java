package org.lamisplus.modules.kp_prev.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PatientDto {


        private String hospitalNumber;
        private String surname;
        private String otherName;
        private String firstName;
        private String uniqueId;
        private String sex;
        private String personUuid;
        private String currentStatus;
        private String createBy;
        private boolean clinicalEvaluation;
        private boolean mentalHealth;
        private  Boolean biometricStatus;
        private Boolean isEnrolled;
        private Boolean commenced;
        private Boolean isDobEstimated;
        private Long id;
        private Integer age;
        private Long facilityId;
        private Long targetGroupId;
        private Long enrollmentId;
        private LocalDate dateOfBirth;
        private LocalDate dateOfRegistration;
    }

