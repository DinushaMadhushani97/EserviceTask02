package lk.icta.eService.eServiceManagement.service;

import java.util.List;

import lk.icta.eService.eServiceManagement.dto.TenantResponseDTO;
import lk.icta.eService.eServiceManagement.dto.eServiceResponseDTO;

public interface eServiceService {

	//get all eservices
	List<eServiceResponseDTO> getEService(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

	//add new eservice with tID
	eServiceResponseDTO addEService(Long tId, eServiceResponseDTO eserviceResponseDTO);

	//updated recent eservice
	eServiceResponseDTO updatedEService(Long eId, eServiceResponseDTO eserviceResponseDTO, Long tId);

	//disable unwanted eservice
	eServiceResponseDTO disableEService(Long eId, eServiceResponseDTO eserviceResponseDTO);

	//get all details in the tenant
	List<TenantResponseDTO> getAllTenants();
//	//add new eservice
//	eServiceResponseDTO createEService(eServiceResponseDTO eserviceResponseDTO);

}
