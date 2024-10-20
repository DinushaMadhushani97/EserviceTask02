package lk.icta.eService.eServiceManagement.service;

import org.springframework.web.multipart.MultipartFile;
import lk.icta.eService.eServiceManagement.dto.ResourceResponseDTO;
import java.util.List;

public interface ResourceService {
	
	//get all resourses
    List<ResourceResponseDTO> getResource(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    //add new resource
	ResourceResponseDTO addResources(Long eId, MultipartFile procurementDocs, MultipartFile srs,
			MultipartFile systemArchitecture, MultipartFile deploymentArchitecture, MultipartFile other, String status);

	//update recent resource
	ResourceResponseDTO updateResource(Long rId, MultipartFile procurementDocs, MultipartFile srs,
			MultipartFile systemArchitecture, MultipartFile deploymentArchitecture, MultipartFile other, Long eId);

	//disable unwanted resource
	ResourceResponseDTO disableResource(Long rId, ResourceResponseDTO resourceResponseDTO);
}
 