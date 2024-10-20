package lk.icta.eService.eServiceManagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lk.icta.eService.eServiceManagement.dto.ServerResponseDTO;
import lk.icta.eService.eServiceManagement.dto.TenantResponseDTO;
import lk.icta.eService.eServiceManagement.service.ServerService;
@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
@RequestMapping("/eservices/api")
public class ServerController {
	
	@Autowired
	private ServerService serverservice;
	
	//getMapping for display server list
	@GetMapping("/server/list")
	public ResponseEntity<List<ServerResponseDTO>> getAllServers(
			@RequestParam(name = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
			@RequestParam(name = "pageSize", defaultValue = "10", required = false) Integer pageSize,
			@RequestParam(name = "sortBy", defaultValue = "sId", required = false) String sortBy,
			@RequestParam(name = "sortOrder", defaultValue = "ASC", required = false) String sortOrder) {

		List<ServerResponseDTO> serverResponseDTO = serverservice.getAllServers(pageNumber, pageSize, sortBy,
				sortOrder);

		System.out.println("successfully displayed the data which are availble");
		return new ResponseEntity<List<ServerResponseDTO>>(serverResponseDTO, HttpStatus.OK); 
	}  
	
	//postMapping for add new server
	@PostMapping("/server/add/{eId}")
	public ServerResponseDTO addServer(@PathVariable Long eId, @RequestBody ServerResponseDTO serverResponseDTO) {
		return serverservice.addServer(eId, serverResponseDTO);
		
		
		 
	}
	
	@PutMapping("/server/update/{sId}")
	public ServerResponseDTO updateServer(
	        @PathVariable Long sId,
	        @RequestParam(name = "eId") Long eId,
	        @RequestBody ServerResponseDTO serverResponseDTO) {
	    return serverservice.updateServer(sId, eId, serverResponseDTO);
	}
	
	//deleteMapping for delete unwanted server
	@DeleteMapping("/server/delete/{id}")
	public ResponseEntity<String> deleteServer(@PathVariable Long id) {
		 serverservice.deleteServer(id);
		 return ResponseEntity.ok("Succefully Deleted");
	}

	//get serverList to the server select option
	
			@GetMapping("/server/serverList")
			public ResponseEntity<List<ServerResponseDTO>> getServerList() {
				List<ServerResponseDTO> serevers = serverservice.getServerList();
				return ResponseEntity.ok(serevers);
			}
	
	
	

}
