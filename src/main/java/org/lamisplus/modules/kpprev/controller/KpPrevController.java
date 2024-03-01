package org.lamisplus.modules.kpprev.controller;

import org.lamisplus.modules.kpprev.domain.dto.KpPrevInputDTO;
import org.lamisplus.modules.kpprev.domain.dto.KpPrevResponseDTO;
import org.lamisplus.modules.kpprev.service.KpPrevService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/kpprev")
public class KpPrevController {
	
private final KpPrevService kpPrevService;
	
@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity<KpPrevResponseDTO> createKpPrev(KpPrevInputDTO kpPrevInputDTO) {
  return ResponseEntity.ok(kpPrevService.createKpPrev(kpPrevInputDTO));
}



@GetMapping("/retrieve")
public ResponseEntity<String> getKpPrev()
{
	return ResponseEntity.ok("Call was successful!");
}
}
