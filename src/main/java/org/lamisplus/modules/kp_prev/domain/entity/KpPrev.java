package org.lamisplus.modules.kp_prev.domain.entity;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

import javax.persistence.*;

import org.hibernate.annotations.Type;
import org.springframework.data.domain.Persistable;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "kp_prev")
@Data
@NoArgsConstructor
public class KpPrev extends KpPrevAuditEntity implements Persistable<Long>, Serializable {
	

@Id
@Column(name = "id", updatable = false)
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

@Column(name = "prevention_code")
private  String prevCode;

@Column(name = "hts_client_code")
private String htsCode;

@Column(name = "archived")
private Integer archived;

@Column(name = "target_group")
private String target_group;


@Column(name = "person_uuid")
private String personId;

@Column(name = "uuid")
private String uuid;

@Column(name = "visit_date")
private LocalDate dateServiceOffered;

/*@Column(name = "facility_id")
private Long facility_id;*/

@Type(type = "jsonb-node")
@Column(columnDefinition = "jsonb", name = "entry_point", nullable = true)
private JsonNode entryPoint;

@Type(type = "jsonb-node")
@Column(columnDefinition = "jsonb", name = "hts_services", nullable = true)
private JsonNode htsServices;

@Type(type = "jsonb-node")
@Column(columnDefinition = "jsonb", name = "prep_services", nullable = true)
private JsonNode prepServices;

@Type(type = "jsonb-node")
@Column(columnDefinition = "jsonb", name = "commodity_services", nullable = true)
private JsonNode commodityServices;

@Type(type = "jsonb-node")
@Column(columnDefinition = "jsonb", name = "hiv_educational_services", nullable = true)
private JsonNode hivEducationalServices;

@Type(type = "jsonb-node")
@Column(columnDefinition = "jsonb", name = "biomedical_services", nullable = true)
private JsonNode biomedicalServices;

@Type(type = "jsonb-node")
@Column(columnDefinition = "jsonb", name = "structural_services", nullable = true)
private JsonNode structuralServices;

@Column(name = "service_provider_name")
private String serviceProviderName;

@Override
public boolean isNew() {
	// TODO Auto-generated method stub
	return id == null;
}
}
