package lk.icta.eService.eServiceManagement.service;

import java.util.List;

import lk.icta.eService.eServiceManagement.dto.UserListResponseDTO;

public interface UserListService {

   

    

    UserListResponseDTO addUserList(UserListResponseDTO userListResponseDTO);

    UserListResponseDTO updateUserList(Long userListId, UserListResponseDTO userListResponseDTO);

	List<UserListResponseDTO> getAllUserLists(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    
}
