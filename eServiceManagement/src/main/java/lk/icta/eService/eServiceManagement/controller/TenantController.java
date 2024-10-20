package lk.icta.eService.eServiceManagement.controller;

import lk.icta.eService.eServiceManagement.dto.TenantResponseDTO;
import lk.icta.eService.eServiceManagement.dto.UserListResponseDTO;
import lk.icta.eService.eServiceManagement.dto.eServiceResponseDTO;
import lk.icta.eService.eServiceManagement.service.TenantService;
import lk.icta.eService.eServiceManagement.service.eServiceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
@RequestMapping("/eservices/api")
public class TenantController { 

	@Autowired 
	private TenantService tenantService;  
	
	

	//get mapping for get all details of the tenant 
	@GetMapping("/tenant/list")
	public ResponseEntity<List<TenantResponseDTO>> getAllTenants(
			@RequestParam(name = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
			@RequestParam(name = "pageSize", defaultValue = "10", required = false) Integer pageSize,
			@RequestParam(name = "sortBy", defaultValue = "tId", required = false) String sortBy,
			@RequestParam(name = "sortOrder", defaultValue = "ASC", required = false) String sortOrder) {

		List<TenantResponseDTO> tenantResponseDTO = tenantService.getAllTenants(pageNumber, pageSize, sortBy,
				sortOrder);

		return new ResponseEntity<List<TenantResponseDTO>>(tenantResponseDTO, HttpStatus.OK);
	}
	
	
 
	 
	@PostMapping("/add/{userListId}")
    public ResponseEntity<TenantResponseDTO> addTenant(
            @PathVariable Long userListId, @RequestBody TenantResponseDTO tenantResponseDTO) {
        TenantResponseDTO savedTenant = tenantService.addTenant(userListId, tenantResponseDTO);
        return new ResponseEntity<>(savedTenant, HttpStatus.CREATED);
    }
	

	//patchMapping for inActive unwanted tenant
	@PatchMapping("/tenant/disable/{id}")
	public TenantResponseDTO disableTenant(@PathVariable Long id, @RequestBody TenantResponseDTO tenantResponseDTO) {
		return tenantService.disableTenant(id, tenantResponseDTO);
	}

	
	//putMapping for update recent tenant
		@PutMapping("/tenant/update/{tId}")
		public ResponseEntity<TenantResponseDTO> updateTenant(
				@PathVariable Long tId, 
				@RequestBody TenantResponseDTO tenantResponseDTO,
				@RequestParam(name = "userListId", required = false) Long userListId) {
			
			TenantResponseDTO updatedTenant = tenantService.updateTenant(userListId, tenantResponseDTO,tId);
			return new ResponseEntity<>(updatedTenant,HttpStatus.OK);
		}
		
		
		//get userList to the tenant
		@GetMapping("/tenant/userList")
		public ResponseEntity<List<UserListResponseDTO>> getAllUserLists() {
			List<UserListResponseDTO> users = tenantService.getAllUserLists();
			return ResponseEntity.ok(users);
		}
		
		//get tenantList to the tenant select option
		
		@GetMapping("/tenant/tenantList")
		public ResponseEntity<List<TenantResponseDTO>> getTenantList() {
			List<TenantResponseDTO> tenants = tenantService.getTenantList();
			return ResponseEntity.ok(tenants);
		}
		 
		@GetMapping("/tenant/eserviceList")
		public ResponseEntity<List<eServiceResponseDTO>> getEserviceList() {
			List<eServiceResponseDTO> eservices = tenantService.getEserviceList();
			return ResponseEntity.ok(eservices);
		}
		


	
}
