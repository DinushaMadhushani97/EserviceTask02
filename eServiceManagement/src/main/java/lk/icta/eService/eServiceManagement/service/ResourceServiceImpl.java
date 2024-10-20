package lk.icta.eService.eServiceManagement.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import lk.icta.eService.eServiceManagement.dto.ResourceResponseDTO;
import lk.icta.eService.eServiceManagement.entity.Resource;
import lk.icta.eService.eServiceManagement.entity.eService;
import lk.icta.eService.eServiceManagement.repository.ResourceRepository;
import lk.icta.eService.eServiceManagement.repository.eServiceRepository;

import java.nio.file.Path;
import java.nio.file.Paths; 
import java.nio.file.Files;

@Service
public class ResourceServiceImpl implements ResourceService {

	@Autowired
	private ResourceRepository resourceRepository;

	@Autowired
	private eServiceRepository eserviceRepository;

	// Bussiness logic for get Mapping
	@Override
	public List<ResourceResponseDTO> getResource(Integer pageNumber, Integer pageSize, String sortBy,
			String sortOrder) {
		Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.Direction.fromString(sortOrder), sortBy);

		Page<Resource> resourcePage = resourceRepository.findAll(pageable);

		List<ResourceResponseDTO> resourceResponseDTOs = resourcePage.getContent().stream()
				.map(this::convertResourceResponseDTO).collect(Collectors.toList());

		return resourceResponseDTOs;
	}

	// Bussiness logic for add new resources
	@Override
	public ResourceResponseDTO addResources(Long eId, MultipartFile procurementDocs, MultipartFile srs,
			MultipartFile systemArchitecture, MultipartFile deploymentArchitecture, MultipartFile other,
			String status) {

		System.out.println("Received status: " + status);
		// Check if all files are empty
		if ((procurementDocs == null || procurementDocs.isEmpty()) && (srs == null || srs.isEmpty())
				&& (systemArchitecture == null || systemArchitecture.isEmpty())
				&& (deploymentArchitecture == null || deploymentArchitecture.isEmpty())
				&& (other == null || other.isEmpty())) {
			// Return a 401 error with a message
			System.out.println("All of the files can not be empty");
			throw new IllegalArgumentException("At least one file must not be empty.");
		}

		Resource resource = new Resource();
		eService eService = new eService();
		eService.seteId(eId);
		resource.seteService(eService);
 
		try {
			if (procurementDocs != null && !procurementDocs.isEmpty()) {
				String procurementDocsFileName = StringUtils.cleanPath(procurementDocs.getOriginalFilename());
				resource.setProcurementDocs(procurementDocsFileName);
				// Save in "files/procurementDocs"
				saveFile(procurementDocs, "procurementDocs", procurementDocsFileName);
			}

			if (srs != null && !srs.isEmpty()) {
				String srsFileName = StringUtils.cleanPath(srs.getOriginalFilename());
				resource.setSrs(srsFileName);
				// Save in "files/srs"
				saveFile(srs, "srs", srsFileName);
			}

			if (systemArchitecture != null && !systemArchitecture.isEmpty()) {
				String systemArchitectureFileName = StringUtils.cleanPath(systemArchitecture.getOriginalFilename());
				resource.setSystemArchitecture(systemArchitectureFileName);
				// Save in "files/systemArchitecture"
				saveFile(systemArchitecture, "systemArchitecture", systemArchitectureFileName);
			}

			if (deploymentArchitecture != null && !deploymentArchitecture.isEmpty()) {
				String deploymentArchitectureFileName = StringUtils
						.cleanPath(deploymentArchitecture.getOriginalFilename());
				resource.setDeploymentArchitecture(deploymentArchitectureFileName);
				// Save in "files/deploymentArchitecture"
				saveFile(deploymentArchitecture, "deploymentArchitecture", deploymentArchitectureFileName);
			}

			if (other != null && !other.isEmpty()) {
				String otherFileName = StringUtils.cleanPath(other.getOriginalFilename());
				resource.setOther(otherFileName);
				// Save in "files/other"
				saveFile(other, "other", otherFileName);
			}

			System.out.println("Status available: " + status);
			// resource.setStatus(resource.getStatus());
			resource.setStatus(status);
			resourceRepository.save(resource);
			return convertResourceResponseDTO(resource);
		} catch (IOException e) {
			e.printStackTrace();
			System.out.println("Status unavailable: " + status);
			return null;
		}
	}

	// Bussiness logic for update recent resource
	@Override
	public ResourceResponseDTO updateResource(Long rId, MultipartFile procurementDocs, MultipartFile srs,
			MultipartFile systemArchitecture, MultipartFile deploymentArchitecture, MultipartFile other, Long eId) {
		Resource resource = resourceRepository.findById(rId).orElse(null);

		// if want change the e service id also
		if (eId != null) {
			Optional<eService> optionalEservice = eserviceRepository.findById(eId);
			if (optionalEservice.isPresent()) {
				eService eservice = optionalEservice.get();
				resource.seteService(eservice);
				System.out.println("Found eService: " + eservice.geteName());
			} else {
				System.out.println("eService not found for ID: " + eId);
			}
		} else {
			// If eId is not provided, do nothing, and the recent value will remain
			// unchanged.
			System.out.println("No new eId provided, keeping the recent value.");
		}

		if (resource != null) {
			try {
				if (procurementDocs != null && !procurementDocs.isEmpty()) {
					String procurementDocsFileName = StringUtils.cleanPath(procurementDocs.getOriginalFilename());
					resource.setProcurementDocs(procurementDocsFileName);
					// Save in "files/procurementDocs"
					saveFile(procurementDocs, "procurementDocs", procurementDocsFileName);
				}

				if (srs != null && !srs.isEmpty()) {
					String srsFileName = StringUtils.cleanPath(srs.getOriginalFilename());
					resource.setSrs(srsFileName);
					// Save in "files/srs"
					saveFile(srs, "srs", srsFileName);
				}

				if (systemArchitecture != null && !systemArchitecture.isEmpty()) {
					String systemArchitectureFileName = StringUtils.cleanPath(systemArchitecture.getOriginalFilename());
					resource.setSystemArchitecture(systemArchitectureFileName);
					// Save in "files/systemArchitecture"
					saveFile(systemArchitecture, "systemArchitecture", systemArchitectureFileName);
				}

				if (deploymentArchitecture != null && !deploymentArchitecture.isEmpty()) {
					String deploymentArchitectureFileName = StringUtils
							.cleanPath(deploymentArchitecture.getOriginalFilename());
					resource.setDeploymentArchitecture(deploymentArchitectureFileName);
					// Save in "files/deploymentArchitecture"
					saveFile(deploymentArchitecture, "deploymentArchitecture", deploymentArchitectureFileName);
				}

				if (other != null && !other.isEmpty()) {
					String otherFileName = StringUtils.cleanPath(other.getOriginalFilename());
					resource.setOther(otherFileName);
					// Save in "files/other"
					saveFile(other, "other", otherFileName);
				}

//                Resource resource = convertToEntity(rResponseDTO);
//                resource.setStatus(status);
				resourceRepository.save(resource);
				return convertResourceResponseDTO(resource);
			} catch (IOException e) {
				e.printStackTrace();
				return null;
			}
		} else {
			return null;
		}
	}

	private void saveFile(MultipartFile file, String fileType, String fileName) throws IOException {
		// Define the base directory
		String baseDirectory = "files/";

		// Create a directory for the specific file type
		Path fileTypePath = Paths.get(baseDirectory, fileType);
		Files.createDirectories(fileTypePath);

		// Combine the directory path, file type, and the file name to create the full
		// file path
		Path filePath = Paths.get(fileTypePath.toString(), fileName);

		// Save the file to the specified directory
		Files.write(filePath, file.getBytes());
	}

	// Bussiness Logic for disable tempary unwanted resources
	@Override
	public ResourceResponseDTO disableResource(Long rId, ResourceResponseDTO resourceResponseDTO) {
		// TODO Auto-generated method stub
		Optional<Resource> optionalResource = resourceRepository.findById(rId);
		if (optionalResource.isPresent()) {
			Resource existingResource = optionalResource.get();
			// Change the status
			existingResource.setStatus(resourceResponseDTO.getStatus());
			// Save changes
			existingResource = resourceRepository.save(existingResource);
			return convertResourceResponseDTO(existingResource);
		} else {
			throw new RuntimeException("Resource not found with ID: " + rId);
		}

	}

	// convert to dto
	private ResourceResponseDTO convertResourceResponseDTO(Resource resource) {
		ResourceResponseDTO dto = new ResourceResponseDTO();
		dto.setrId(resource.getrId());
		dto.setProcurementDocs(resource.getProcurementDocs());
		dto.setSrs(resource.getSrs());
		dto.setSystemArchitecture(resource.getSystemArchitecture());
		dto.setDeploymentArchitecture(resource.getDeploymentArchitecture());
		dto.setOther(resource.getOther());
		dto.setStatus(resource.getStatus());
		return dto;
	}

}
