package org.lamisplus.modules.kp_prev.controller;

import org.lamisplus.modules.kp_prev.domain.dto.*;

import org.lamisplus.modules.kp_prev.service.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
public ResponseEntity<KpPrevResponseDTO> createKpPrev(@RequestBody KpPrevInputDTO kpPrevInputDTO)
{
  return ResponseEntity.ok(kpPrevService.createKpPrev(kpPrevInputDTO));	

}
@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity<KpPrevMetaDataDto> getAllPatients(
        @RequestParam(defaultValue = "*") String searchParam,
        @RequestParam(defaultValue = "0") Integer pageNo,
        @RequestParam(defaultValue = "10") Integer pageSize) {
    KpPrevMetaDataDto kpPrevMetaDataDto = kpPrevService.findKpPrevBySearchParam(searchParam, pageNo, pageSize);
    return new ResponseEntity<>(kpPrevMetaDataDto, new HttpHeaders(), HttpStatus.OK);
}


@GetMapping("/retrieve")
public ResponseEntity<String> getKpPrev()
{
	return ResponseEntity.ok("Call was successful!");
}


@PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity<KpPrevResponseDTO> updateKpPrev(@PathVariable("id") Long id, @RequestBody KpPrevInputDTO kpPrevInputDto) {
    return ResponseEntity.ok(kpPrevService.updateKpPrev(id, kpPrevInputDto));
}

@DeleteMapping(value = "/{id}",
produces = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity<String> deleteKpPrev(@PathVariable("id") Long id) {
kpPrevService.deleteKpPrevById(id);
return ResponseEntity.accepted().build();
}
}
