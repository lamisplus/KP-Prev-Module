package org.lamisplus.modules.kp_prev.domain.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import lombok.Data;


@Data
public class KpPrevMetaDataDto implements Serializable {
	private  long totalRecords;

    private int totalPages;

    private int pageSize;

    private int currentPage;

    private List records = new ArrayList<>();
}
