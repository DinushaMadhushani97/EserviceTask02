package lk.icta.eService.eServiceManagement.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import lk.icta.eService.eServiceManagement.dto.eServiceResponseDTO;
import lk.icta.eService.eServiceManagement.dto.TenantResponseDTO;
import lk.icta.eService.eServiceManagement.dto.ResourceResponseDTO;
import lk.icta.eService.eServiceManagement.dto.ServerResponseDTO;
import lk.icta.eService.eServiceManagement.entity.Tenant;
import lk.icta.eService.eServiceManagement.entity.UserList;
import lk.icta.eService.eServiceManagement.entity.eService;
import lk.icta.eService.eServiceManagement.repository.TenantRepository;
import lk.icta.eService.eServiceManagement.repository.eServiceRepository;

@Service
public class eServiceServiceImpl implements eServiceService {

	@Autowired
	private eServiceRepository eserviceRepository;

	@Autowired
	private TenantRepository tenantRepository;

	// Bussiness Logic for get all data
	@Override
	public List<eServiceResponseDTO> getEService(Integer pageNumber, Integer pageSize, String sortBy,
			String sortOrder) { 
		Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.Direction.fromString(sortOrder), sortBy);

		Page<eService> eServicePage = eserviceRepository.findAll(pageable);

		List<eServiceResponseDTO> eserviceResponseDTOs = eServicePage.getContent().stream()
				.map(this::convertEserviceResponseDTO).collect(Collectors.toList());

		return eserviceResponseDTOs;
	}

	// Bussiness Logic for add new eService according to tId
	@Override
	public eServiceResponseDTO addEService(Long tId, eServiceResponseDTO eserviceResponseDTO) {
		eService addEService = new eService();

		Optional<Tenant> optionalTenant = tenantRepository.findById(tId);
		if (optionalTenant.isPresent()) {
			Tenant tenant = optionalTenant.get();
			addEService.setTenant(tenant);
			System.out.println("Found Tenant: " + tenant.gettName());
		} else {
			System.out.println("Tenant not found for ID: " + tId);
		}
		// Map the values from the request JSON to the addServer instance
		addEService.seteName(eserviceResponseDTO.geteName());
		addEService.setStatus(eserviceResponseDTO.getStatus());
		addEService.setvCPU(eserviceResponseDTO.getvCPU());
		addEService.setRam(eserviceResponseDTO.getRam());
		addEService.setStorage(eserviceResponseDTO.getStorage());
		addEService.setOrganizationName(eserviceResponseDTO.getOrganizationName());
		addEService.setDescription(eserviceResponseDTO.getDescription());
		addEService.setContactPerson(eserviceResponseDTO.getContactPerson());

		System.out.println("Received eName: " + eserviceResponseDTO.geteName() + ",Received status:"
				+ eserviceResponseDTO.getStatus() + ",Received vCPU:" + eserviceResponseDTO.getvCPU() + ",Received RAM:"
				+ eserviceResponseDTO.getRam() + ",Received Storage:" + eserviceResponseDTO.getStorage()
				+ ",Receieved userList:" + eserviceResponseDTO.getOrganizationName());

		// Save the server to the repository
		addEService = eserviceRepository.save(addEService);

		// Convert the saved server to ServerResponseDTO and return it
		return convertEserviceResponseDTO(addEService);
	}


	// Bussiness Logic for update recent eService
	@Override
	public eServiceResponseDTO updatedEService(Long eId, eServiceResponseDTO eserviceResponseDTO, Long tId) {
		eService eservice = eserviceRepository.findById(eId).orElse(null);

		if (eservice != null) {
			// if want to change the tenant id also
			if (tId != null) {
			    Optional<Tenant> optionalTenant = tenantRepository.findById(tId);
			    if (optionalTenant.isPresent()) {
			        Tenant tenant = optionalTenant.get();
			        eservice.setTenant(tenant);
			        System.out.println("Found Tenant: " + tenant.gettName());
			    } else {
			        System.out.println("Tenant not found for ID: " + tId);
			    }
			} else {
			    // If tId is not provided, do nothing, and the recent value will remain
			    // unchanged.
			    System.out.println("No new tId provided, keeping the recent value.");
			}

			eservice.seteName(eserviceResponseDTO.geteName());
			eservice.setStatus(eserviceResponseDTO.getStatus());
			eservice.setvCPU(eserviceResponseDTO.getvCPU());
			eservice.setRam(eserviceResponseDTO.getRam());
			eservice.setStorage(eserviceResponseDTO.getStorage());
			eservice.setOrganizationName(eserviceResponseDTO.getOrganizationName());
			eservice.setDescription(eserviceResponseDTO.getDescription());
			eservice.setContactPerson(eserviceResponseDTO.getContactPerson());
			eservice = eserviceRepository.save(eservice);

			return convertEserviceResponseDTO(eservice);
		} else {
		    // the eService with eId is not found
		    System.out.println("EID unavailable");
		    throw new RuntimeException("EService not found with ID: " + eId);
		}
	}

	// Business Logic for disable unwanted eservice
	@Override
	public eServiceResponseDTO disableEService(Long eId, eServiceResponseDTO eserviceResponseDTO) {
		Optional<eService> optionalEService = eserviceRepository.findById(eId);
		if (optionalEService.isPresent()) {
			eService existingEService = optionalEService.get();
			// Change the status
			existingEService.setStatus(eserviceResponseDTO.getStatus());
			// Save changes
			existingEService = eserviceRepository.save(existingEService);
			return convertEserviceResponseDTO(existingEService);
		} else {
			throw new RuntimeException("EService not found with ID: " + eId);
		}
	}

	// Convert entity to DTO
	private eServiceResponseDTO convertEserviceResponseDTO(eService eservice) {
		eServiceResponseDTO dto = new eServiceResponseDTO();
		dto.seteId(eservice.geteId());
		dto.seteName(eservice.geteName());

		if ("1".equals(eservice.getStatus())) {
			dto.setStatus("active");
		} else if ("0".equals(eservice.getStatus())) {
			dto.setStatus("inactive");
		} else {
			dto.setStatus("unknown");
		}
		dto.setvCPU(eservice.getvCPU());
		dto.setRam(eservice.getRam());
		dto.setStorage(eservice.getStorage());
		dto.setOrganizationName(eservice.getOrganizationName());
		dto.setDescription(eservice.getDescription());
		dto.setContactPerson(eservice.getContactPerson());

//		// Convert Tenant entity to TenantResponseDTO
//		if (eservice.getTenant() != null) {
//			dto.setTenant(new TenantResponseDTO(eservice.getTenant().gettId(), eservice.getTenant().gettName(),
//					eservice.getTenant().getStatus(), eservice.getTenant().getUserList()));
//		}
		
		//convert Tenant entity to TenantResponseDTO
		if (eservice.getTenant() !=null) {

			Tenant tenant = eservice.getTenant();
			UserList userList = tenant.getUserList();
			TenantResponseDTO dtos = new TenantResponseDTO(tenant.gettId(), tenant.gettName(), tenant.getStatus(), userList);
			
		} 
		
		
//		// Convert Tenant entity to TenantResponseDTO
//		if (eservice.getTenant() != null) {
//		    Tenant tenant = eservice.getTenant();
//		    UserList userList = tenant.getUserList();
//
//		    TenantResponseDTO dtos = new TenantResponseDTO(tenant.gettId(), tenant.gettName(), tenant.getStatus(), userList);
//		    dto.setTenant(dtos);
//		} 

		// Convert Resource entities to ResourceResponseDTOs
		if (eservice.getResourceList() != null) {
			List<ResourceResponseDTO> resourceDTOs = eservice.getResourceList().stream()
					.map(resource -> new ResourceResponseDTO(resource.getrId(), resource.getProcurementDocs(),
							resource.getDeploymentArchitecture(), resource.getSystemArchitecture(), resource.getSrs(),
							resource.getOther(), resource.getStatus()))
					.collect(Collectors.toList());
			dto.setResourceList(resourceDTOs);
		}

		// Convert Server entities to ServerResponseDTOs
		if (eservice.getServerList() != null) {
			List<ServerResponseDTO> serverDTOs = eservice
					.getServerList().stream().map(server -> new ServerResponseDTO(server.getsId(),
							server.getsIpAddress(), server.getsType(), server.getUserList(), server.getStatus()))
					.collect(Collectors.toList());
			dto.setServerList(serverDTOs);
		}

		return dto;
	}

	// pass all tenants data to eService
	@Override
	public List<TenantResponseDTO> getAllTenants() {
		// TODO Auto-generated method stub
		List<Tenant> tenants = tenantRepository.findAll();
		List<TenantResponseDTO> tenantResponseDTOs = new ArrayList<>();

		for (Tenant tenant : tenants) {
			TenantResponseDTO tenantResponseDTO = new TenantResponseDTO();
			tenantResponseDTO.settId(tenant.gettId());
			tenantResponseDTO.settName(tenant.gettName());
			tenantResponseDTO.setStatus(tenant.getStatus());
			tenantResponseDTO.setUserList(tenant.getUserList());
			tenantResponseDTOs.add(tenantResponseDTO);
		}

		return tenantResponseDTOs;
	}

}
