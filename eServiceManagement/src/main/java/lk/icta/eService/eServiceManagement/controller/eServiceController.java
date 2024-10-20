package lk.icta.eService.eServiceManagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lk.icta.eService.eServiceManagement.dto.TenantResponseDTO;
import lk.icta.eService.eServiceManagement.dto.eServiceResponseDTO;
import lk.icta.eService.eServiceManagement.service.eServiceService;

@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
@RequestMapping("/eservices/api")
public class eServiceController {
	
	@Autowired
	private eServiceService eserviceService;
	
	
	
	@GetMapping("/tenants")
	public ResponseEntity<List<TenantResponseDTO>> getDepartments() {
		List<TenantResponseDTO> tenants = eserviceService.getAllTenants();
		return ResponseEntity.ok(tenants);
	}
	
	//controller method for get all data
	@GetMapping("/eservice/list")
    public ResponseEntity<List<eServiceResponseDTO>> getEService(
            @RequestParam(name = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = "10", required = false) Integer pageSize,
            @RequestParam(name = "sortBy", defaultValue = "eId", required = false) String sortBy,
            @RequestParam(name = "sortOrder", defaultValue = "ASC", required = false) String sortOrder) {
        List<eServiceResponseDTO> eserviceResponseDTO = eserviceService.getEService(pageNumber, pageSize, sortBy, sortOrder);

        System.out.println("successfully displayed the data which are available");
        return new ResponseEntity<>(eserviceResponseDTO, HttpStatus.OK);
    }
	
	//controlling adding new eservice according to tId
	@PostMapping("/eservice/add/{tId}")
    public ResponseEntity<eServiceResponseDTO> addEService(
            @PathVariable Long tId, 
            @RequestBody eServiceResponseDTO eserviceResponseDTO)
    {
    	eServiceResponseDTO savedEService = eserviceService.addEService(tId, eserviceResponseDTO);
    	System.out.println("passed tId: " + tId);
        return new ResponseEntity<>(savedEService, HttpStatus.CREATED);
    }
	



	//controlling update recent eService
    @PutMapping("/eservice/update/{eId}")
    public ResponseEntity<eServiceResponseDTO> updatedEService(
    		@PathVariable Long eId,
    		@RequestBody eServiceResponseDTO eserviceResponseDTO,
    		@RequestParam(name = "tId", required = false) Long tId){
    	eServiceResponseDTO updatedEService = eserviceService.updatedEService(eId, eserviceResponseDTO, tId);
    	System.out.println("passed eId: " + eId  + ",passed tId: " + tId);
    	return new ResponseEntity<>(updatedEService,HttpStatus.OK);
    }
    
    
    //controlling disable unwanted eServices
    @PatchMapping("/eservice/disable/{eId}")
	public eServiceResponseDTO disableEService(@PathVariable Long eId, @RequestBody eServiceResponseDTO eserviceResponseDTO) {
		return eserviceService.disableEService(eId, eserviceResponseDTO);
	}
}
