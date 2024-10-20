package lk.icta.eService.eServiceManagement.service;

import lk.icta.eService.eServiceManagement.dto.*;
import lk.icta.eService.eServiceManagement.entity.*;
import lk.icta.eService.eServiceManagement.repository.TenantRepository;
import lk.icta.eService.eServiceManagement.repository.UserListRepository;
import lk.icta.eService.eServiceManagement.repository.eServiceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TenantServiceImpl implements TenantService {

    @Autowired
    private TenantRepository tenantRepository;
    
    @Autowired
    private UserListRepository userListRepository;
    
    @Autowired
    private eServiceRepository eserviceRepository;

    // Business logic for get all tenants
    @Override
    public List<TenantResponseDTO> getAllTenants(
            Integer pageNumber,
            Integer pageSize,
            String sortBy,
            String sortOrder) {
        Pageable pageable = PageRequest.of(pageNumber,
                pageSize,
                Sort.Direction.fromString(sortOrder),
                sortBy);

        Page<Tenant> tenantPage = tenantRepository.findAll(pageable);

        List<TenantResponseDTO> tenantResponseDTOs = tenantPage
                .getContent()
                .stream()
                .map(this::createResponseDTO)
                .collect(Collectors.toList());

        return tenantResponseDTOs; 
    }

//    // Business logic for add new tenant
//    @Override
//    public TenantResponseDTO addTenant(TenantResponseDTO tenantResponseDTO) {
//        Tenant tenant = convertToEntity(tenantResponseDTO);
//        tenant = tenantRepository.save(tenant);
//        return convertTenantToTenantResponseDTO(tenant);
//    }

    // Business logic for activate or deactivate tenant
    @Override
    public TenantResponseDTO disableTenant(Long id, TenantResponseDTO tenantResponseDTO) {
        Optional<Tenant> optionalTenant = tenantRepository.findById(id);
        if (optionalTenant.isPresent()) {
            Tenant existingTenant = optionalTenant.get();
            // Change the status
            existingTenant.setStatus(tenantResponseDTO.getStatus());
            // Save changes
            existingTenant = tenantRepository.save(existingTenant);
            return convertTenantToTenantResponseDTO(existingTenant);
        } else {
            throw new RuntimeException("Tenant not found with ID: " + id);
        }
    }

//    // Business logic for update tenant details
//    @Override
//    public TenantResponseDTO updateTenant(Long id, TenantResponseDTO tenantResponseDTO) {
//        Optional<Tenant> optionalTenant = tenantRepository.findById(id);
//        if (optionalTenant.isPresent()) {
//            Tenant tenant = optionalTenant.get();
//            tenant.settName(tenantResponseDTO.gettName());
//            tenant.setStatus(tenantResponseDTO.getStatus());
//            
//            tenant = tenantRepository.save(tenant);
//            return convertTenantToTenantResponseDTO(tenant);
//        } else {
//            throw new RuntimeException("Tenant not found with ID: " + id);
//        }
//    }
    
    
    

    
    private TenantResponseDTO createResponseDTO(Tenant tenant) {
        TenantResponseDTO tenantResponseDTO = new TenantResponseDTO();
        tenantResponseDTO.settId(tenant.gettId());
        tenantResponseDTO.settName(tenant.gettName());
        tenantResponseDTO.setStatus(tenant.getStatus());
      
        return tenantResponseDTO;
    }

    private Tenant convertToEntity(TenantResponseDTO tenantResponseDTO) {
        Tenant tenant = new Tenant();
        tenant.settName(tenantResponseDTO.gettName());
        tenant.setStatus(tenantResponseDTO.getStatus());
       
        return tenant;
    }

    private TenantResponseDTO convertTenantToTenantResponseDTO(Tenant tenant) {
        TenantResponseDTO tenantResponseDTO = new TenantResponseDTO();
        tenantResponseDTO.settId(tenant.gettId());
        tenantResponseDTO.settName(tenant.gettName());
        tenantResponseDTO.setStatus(tenant.getStatus());
        
 
        return tenantResponseDTO;
    }

    @Override
    public TenantResponseDTO addTenant(Long userListId, TenantResponseDTO tenantResponseDTO) {
        // Create a new Tenant
        Tenant addTenant = new Tenant();
        
        // Find the UserList based on the provided ID
        Optional<UserList> optionalUserList = userListRepository.findById(userListId);
        if (optionalUserList.isPresent()) {
            UserList userList = optionalUserList.get();
            addTenant.setUserList(userList);
            System.out.println("Found UserList with ID: " + userListId);
        } else {
            System.out.println("UserList not found with ID: " + userListId);
        }

        // Set other properties from tenantResponseDTO
        addTenant.settName(tenantResponseDTO.gettName());
        addTenant.setStatus(tenantResponseDTO.getStatus());
        
        // Save the tenant to the repository
        addTenant = tenantRepository.save(addTenant);

        // Convert the saved tenant to TenantResponseDTO and return it
        return convertTenantToTenantResponseDTO(addTenant);
    }

//    // Business logic for update tenant details
//	@Override
//	public TenantResponseDTO updateTenant(Long userListId, TenantResponseDTO tenantResponseDTO, Long tId) {
//		// TODO Auto-generated method stub
//		Tenant tenant = tenantRepository.findById(tId).orElse(null);
//		
//		//if need to change the userList id also
//		if(userListId != null) {
//			Optional<UserList> optionalUserList = userListRepository.findById(tId);
//			if(optionalUserList.isPresent()) {
//				UserList userList = optionalUserList.get();
//				tenant.setUserList(userList);
//				System.out.println("done");
//			} else {
//                System.out.println("userList not found for userListId: " + userListId);
//            }
//		} else {
//            // If tId is not provided, do nothing, and the recent value will remain unchanged.
//            System.out.println("No new userListId provided, keeping the recent value.");
//		}
//		tenant.settName(tenantResponseDTO.gettName());
//		tenant = tenantRepository.save(tenant);
//		return convertTenantToTenantResponseDTO(tenant);
//	}
	
    
 // Business logic for update tenant details
    @Override
    public TenantResponseDTO updateTenant(Long userListId, TenantResponseDTO tenantResponseDTO, Long tId) {
        // Fetch the Tenant entity by tId
        Tenant tenant = tenantRepository.findById(tId).orElse(null);

        if (tenant != null) {
            // If userListId is provided, try to fetch the UserList entity by userListId
            if (userListId != null) {
                Optional<UserList> optionalUserList = userListRepository.findById(userListId);
                if (optionalUserList.isPresent()) {
                    UserList userList = optionalUserList.get();
                    tenant.setUserList(userList);
                    System.out.println("UserList updated successfully.");
                } else {
                    System.out.println("UserList not found for userListId: " + userListId);
                    
                }
            } else {
                // If userListId is not provided, do nothing, and the recent value will remain unchanged.
                System.out.println("No new userListId provided, keeping the recent value.");
            }

            // Update other tenant details
            tenant.settName(tenantResponseDTO.gettName());
            tenant = tenantRepository.save(tenant);
            return convertTenantToTenantResponseDTO(tenant);
        } else {
            System.out.println("Tenant not found for tId: " + tId);
            return null; 
        }
    }
    
    //fetch all data to the Tenant

	@Override
	public List<UserListResponseDTO> getAllUserLists() {
		// TODO Auto-generated method stub
		List<UserList> users = userListRepository.findAll();
		List<UserListResponseDTO> userListResponseDTOs = new ArrayList<>();
		for (UserList userList : users) {
			UserListResponseDTO userListResponseDTO = new UserListResponseDTO();
			userListResponseDTO.setUserListId(userList.getUserListId());			
			userListResponseDTO.setDepartment(userList.getDepartment());
			userListResponseDTO.setContactPerson(userList.getContactPerson());
			userListResponseDTOs.add(userListResponseDTO);
			
		}

		return userListResponseDTOs;
	}

	//fetch the data from the userList to tenant
	@Override
	public List<TenantResponseDTO> getTenantList() {
		// TODO Auto-generated method stub
		List<Tenant> tenants = tenantRepository.findAll();
		List<TenantResponseDTO> tenantResponseDTOs = new ArrayList<>();
		for (Tenant tenant : tenants) {
			TenantResponseDTO tenantResponseDTO = new TenantResponseDTO();
			tenantResponseDTO.settName(tenant.gettName());
			tenantResponseDTO.settId(tenant.gettId());
			tenantResponseDTOs.add(tenantResponseDTO);
		}
		return tenantResponseDTOs;
	} 

	//fetch the data from the eservice to tenant
	@Override
	public List<eServiceResponseDTO> getEserviceList() {
		// TODO Auto-generated method stub
		List<eService> eservices = eserviceRepository.findAll();
		List<eServiceResponseDTO> eserviceResponseDTOs = new ArrayList<>();
		for (eService eservice : eservices) {
			eServiceResponseDTO eserviceResponseDTO = new eServiceResponseDTO();
			eserviceResponseDTO.seteName(eservice.geteName());
			eserviceResponseDTOs.add(eserviceResponseDTO);
		}
		return eserviceResponseDTOs;
	}




	
	
	
}
