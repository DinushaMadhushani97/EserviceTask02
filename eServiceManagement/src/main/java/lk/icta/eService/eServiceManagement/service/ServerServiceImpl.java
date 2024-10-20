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

import lk.icta.eService.eServiceManagement.dto.ServerResponseDTO;
import lk.icta.eService.eServiceManagement.dto.TenantResponseDTO;
import lk.icta.eService.eServiceManagement.entity.Server;
import lk.icta.eService.eServiceManagement.entity.Tenant;
import lk.icta.eService.eServiceManagement.entity.eService;
import lk.icta.eService.eServiceManagement.repository.ServerRepository;
import lk.icta.eService.eServiceManagement.repository.eServiceRepository;




@Service
public class ServerServiceImpl implements ServerService {

    @Autowired
    private ServerRepository serverRepository;
    
    @Autowired
    private eServiceRepository eserviceRepository;

    //Bussiness Logic for get all server details
    @Override
    public List<ServerResponseDTO> getAllServers(Integer pageNumber, Integer pageSize, String sortBy,
            String sortOrder) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.Direction.fromString(sortOrder), sortBy);

        Page<Server> serverPage = serverRepository.findAll(pageable);

        List<ServerResponseDTO> serverResponseDTOs = serverPage
                .getContent()
                .stream()
                .map(this::convertServerToServerResponseDTO)
                .collect(Collectors.toList());
        System.out.println("All details of the server");
        return serverResponseDTOs;
    }

   

    @Override
    public ServerResponseDTO addServer(Long eId, ServerResponseDTO serverResponseDTO) {
        Server addServer = new Server();

        Optional<eService> optionalEservice = eserviceRepository.findById(eId);
        if (optionalEservice.isPresent()) {
            eService eservice = optionalEservice.get();
            addServer.seteService(eservice);
            System.out.println("Found eService: " + eservice.geteName());
        } else {
            System.out.println("eService not found for ID: " + eId);
        }

        // Map the values from the request JSON to the addServer instance
        addServer.setsIpAddress(serverResponseDTO.getIpAddress());
        addServer.setsType(serverResponseDTO.getType());
        addServer.setUserList(serverResponseDTO.getUserList());
        addServer.setStatus(serverResponseDTO.getStatus());
        System.out.println("Received ipAddress: " + serverResponseDTO.getIpAddress());
        System.out.println("Received type: " + serverResponseDTO.getType());

       
        // Save the server to the repository
        addServer = serverRepository.save(addServer);

        // Convert the saved server to ServerResponseDTO and return it
        return convertServerToServerResponseDTO(addServer);
    }


	//Business logic for update recent server
    @Override
    public ServerResponseDTO updateServer(Long sId, Long eId, ServerResponseDTO serverResponseDTO) {
    	// TODO Auto-generated method stub
        Optional<Server> optionalServer = serverRepository.findById(sId);
        if (optionalServer.isPresent()) {
            Server server = optionalServer.get();
            
            Optional<eService> optionalEservice = eserviceRepository.findById(eId);
            if (optionalEservice.isPresent()) {
                eService eservice = optionalEservice.get();
                server.seteService(eservice);
                System.out.println("Found eService: " + eservice.geteName());
            } else {
                System.out.println("eService not found for ID: " + eId);
            }

            // Map the values from the request JSON to the server instance
            server.setsIpAddress(serverResponseDTO.getIpAddress());
            server.setsType(serverResponseDTO.getType());
            server.setUserList(serverResponseDTO.getUserList());
            server.setStatus(serverResponseDTO.getStatus());

            // Save the updated server to the repository
            server = serverRepository.save(server);

            // Convert the saved server to ServerResponseDTO and return it
            return convertServerToServerResponseDTO(server);
        } else {
            //the server with sId is not found
        	System.out.println("SID unavailble");
            throw new RuntimeException("Server not found with ID: " + sId);
        }
    }

	
	

	//Bussiness logic for delete unwanted server
	@Override
	public void deleteServer(Long id) {
		// TODO Auto-generated method stub
		 Optional<Server> optionalServer = serverRepository.findById(id);
	        if (optionalServer.isPresent()) {
	        	System.out.println("Deleted Successfully");
	        	serverRepository.delete(optionalServer.get());
	        } else {
	        	System.out.println("SID unavailble");
	        	//the server with sid is not available
	            throw new RuntimeException("Server not found with ID: " + id);
	        }
	}
	
	
	//convert to DTO
	 private ServerResponseDTO createResponseDTO(Server server) {
	        ServerResponseDTO serverResponseDTO = new ServerResponseDTO();
	        serverResponseDTO.setsId(server.getsId());
	        serverResponseDTO.setIpAddress(server.getsIpAddress());
	        serverResponseDTO.setType(server.getsType());
	        serverResponseDTO.setUserList(server.getUserList());
	        serverResponseDTO.setStatus(server.getStatus());
	      
	        return serverResponseDTO;
	    }

	 //convert to entity
	    private Server convertToEntity(ServerResponseDTO serverResponseDTO) {
	        Server server = new Server();

	        server.setsIpAddress(serverResponseDTO.getIpAddress());
	        server.setsType(serverResponseDTO.getType());
	        return server;
	    }

	    //convert server entity to server dto
	    private ServerResponseDTO convertServerToServerResponseDTO(Server server) {
	        ServerResponseDTO serverResponseDTO = new ServerResponseDTO();
	        serverResponseDTO.setsId(server.getsId());
	        serverResponseDTO.setType(server.getsType());
	        serverResponseDTO.setIpAddress(server.getsIpAddress());
	        serverResponseDTO.setUserList(server.getUserList());
	        serverResponseDTO.setStatus(server.getStatus());

	        return serverResponseDTO;
	    }



		@Override
		public List<ServerResponseDTO> getServerList() {
			// TODO Auto-generated method stub
			List<Server> servers = serverRepository.findAll();
			List<ServerResponseDTO> serverResponseDTOs = new ArrayList<>();
			for (Server server : servers) {
				ServerResponseDTO serverResponseDTO = new ServerResponseDTO();
				serverResponseDTO.setsId(server.getsId());
				serverResponseDTO.setIpAddress(server.getsIpAddress());
				serverResponseDTO.setType(server.getsType());
				
				serverResponseDTOs.add(serverResponseDTO);
			}
			return serverResponseDTOs;
		}
	
	
		
   
}
