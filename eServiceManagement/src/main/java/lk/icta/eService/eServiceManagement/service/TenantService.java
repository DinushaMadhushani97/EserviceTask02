package lk.icta.eService.eServiceManagement.service;

import java.util.List;

import lk.icta.eService.eServiceManagement.dto.TenantResponseDTO;
import lk.icta.eService.eServiceManagement.dto.UserListResponseDTO;
import lk.icta.eService.eServiceManagement.dto.eServiceResponseDTO;

public interface TenantService {

	// get method for get all tenant details
	List<TenantResponseDTO> getAllTenants(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

//	// post method for add new tenant to the system
//	TenantResponseDTO addTenant(TenantResponseDTO tenantResponseDTO);

	// patch method for the disable if some tenant make tempory unavailble
	TenantResponseDTO disableTenant(Long id, TenantResponseDTO tenantResponseDTO);

//	// put method for the update recent tenant details
//	TenantResponseDTO updateTenant(Long id, TenantResponseDTO tenantResponseDTO);

	

	// post method for add new tenant to the system
	TenantResponseDTO addTenant(Long userListId, TenantResponseDTO tenantResponseDTO);
	// put method for the update recent tenant details
	TenantResponseDTO updateTenant(Long userListId, TenantResponseDTO tenantResponseDTO, Long tId);

	//get method for fetch all users list
	List<UserListResponseDTO> getAllUserLists();

	//get all tenant as select option
	List<TenantResponseDTO> getTenantList();

	//get all the eservice list to the tenant
	List<eServiceResponseDTO> getEserviceList();

	
	


}
