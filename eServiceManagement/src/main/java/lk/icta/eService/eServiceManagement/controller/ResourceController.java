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
import org.springframework.web.multipart.MultipartFile;

import lk.icta.eService.eServiceManagement.dto.ResourceResponseDTO;
import lk.icta.eService.eServiceManagement.service.ResourceService;
@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
@RequestMapping("/eservices/api")
public class ResourceController {
	
	    @Autowired
	    private ResourceService resourceService;

	    //controller method for get all details
	    @GetMapping("/resource/list")
	    public ResponseEntity<List<ResourceResponseDTO>> getResource(
	            @RequestParam(name = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
	            @RequestParam(name = "pageSize", defaultValue = "10", required = false) Integer pageSize,
	            @RequestParam(name = "sortBy", defaultValue = "rId", required = false) String sortBy,
	            @RequestParam(name = "sortOrder", defaultValue = "ASC", required = false) String sortOrder) {
	        List<ResourceResponseDTO> resourceResponseDTO = resourceService.getResource(pageNumber, pageSize, sortBy, sortOrder);

	        System.out.println("successfully displayed the data which are available");
	        return new ResponseEntity<>(resourceResponseDTO, HttpStatus.OK);
	    }

	    //controller method for add new resource
	    @PostMapping("/resource/add/{eId}")
	    public ResponseEntity<ResourceResponseDTO> addResources(
	            @PathVariable Long eId,
	            @RequestParam(name = "procurementDocs", required = false) MultipartFile procurementDocs,
	            @RequestParam(name = "srs", required = false) MultipartFile srs,
	            @RequestParam(name = "systemArchitecture", required = false) MultipartFile systemArchitecture,
	            @RequestParam(name = "deploymentArchitecture", required = false) MultipartFile deploymentArchitecture,
	            @RequestParam(name = "other", required = false)MultipartFile other,
	            @RequestParam(name = "status", required = false) String status)
	    {
	        ResourceResponseDTO savedResource = resourceService.addResources(eId, procurementDocs, srs, systemArchitecture, deploymentArchitecture,other, status);
	        System.out.println("passed status: " + status);
	        return new ResponseEntity<>(savedResource, HttpStatus.CREATED);
	    }

	    //controller method for update recent resource
	    @PutMapping("/resource/update/{rId}")
	    public ResponseEntity<ResourceResponseDTO> updateResource(
	    		@PathVariable Long rId,
	            @RequestParam(name = "procurementDocs", required = false) MultipartFile procurementDocs,
	            @RequestParam(name = "srs", required = false) MultipartFile srs,
	            @RequestParam(name = "systemArchitecture", required = false) MultipartFile systemArchitecture,
	            @RequestParam(name = "deploymentArchitecture", required = false) MultipartFile deploymentArchitecture,
	            @RequestParam(name = "other", required = false) MultipartFile other,
	            @RequestParam(name = "eId", required = false) Long eId) {
	    	ResourceResponseDTO updatedResource = resourceService.updateResource(rId, procurementDocs, srs,
                    systemArchitecture, deploymentArchitecture,other,eId);
	        return new ResponseEntity<>(updatedResource, HttpStatus.OK);
	    }

	  //controller method for disable unwanted resource
	  @PatchMapping("/resource/disable/{rId}")
		public ResourceResponseDTO disableResource(@PathVariable Long rId, @RequestBody ResourceResponseDTO resourceResponseDTO) {
			return resourceService.disableResource(rId, resourceResponseDTO);
		}


}
