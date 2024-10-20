package lk.icta.eService.eServiceManagement.service;

import java.util.List;

import lk.icta.eService.eServiceManagement.dto.ServerResponseDTO;

public interface ServerService {

	//get all data
	List<ServerResponseDTO> getAllServers(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

	//add new server
	ServerResponseDTO addServer(Long eId, ServerResponseDTO serverResponseDTO);

	//update recent server
	ServerResponseDTO updateServer(Long sId, Long eId, ServerResponseDTO serverResponseDTO); 

	//delete unwanted server
	void deleteServer(Long id);

	//get serverList to the server select option
	List<ServerResponseDTO> getServerList(); 

}
