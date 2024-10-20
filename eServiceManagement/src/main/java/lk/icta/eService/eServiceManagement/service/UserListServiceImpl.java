package lk.icta.eService.eServiceManagement.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import lk.icta.eService.eServiceManagement.dto.UserListResponseDTO;
import lk.icta.eService.eServiceManagement.entity.UserList;
import lk.icta.eService.eServiceManagement.repository.UserListRepository;

@Service
public class UserListServiceImpl implements UserListService {

    @Autowired
    private UserListRepository userListRepository;

 
    
    @Override
    public List<UserListResponseDTO> getAllUserLists(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.Direction.fromString(sortOrder), sortBy);

        Page<UserList> userListPage = userListRepository.findAll(pageable);

        List<UserListResponseDTO> userListResponseDTOs = userListPage
                .getContent()
                .stream()
                .map(this::createResponseDTO)
                .collect(Collectors.toList());

        return userListResponseDTOs;
    }
    
 
    @Override
    public UserListResponseDTO addUserList(UserListResponseDTO userListResponseDTO) {
        UserList userList = convertToEntity(userListResponseDTO);
        userList = userListRepository.save(userList);
        return convertUserListToResponseDTO(userList);
    }

    private UserListResponseDTO convertUserListToResponseDTO(UserList userList) {
        UserListResponseDTO userListResponseDTO = new UserListResponseDTO();
        userListResponseDTO.setUserListId(userList.getUserListId());
        userListResponseDTO.setDepartment(userList.getDepartment());
        userListResponseDTO.setContactPerson(userList.getContactPerson());
        return userListResponseDTO;
    }

    private UserList convertToEntity(UserListResponseDTO userListResponseDTO) {
        UserList userList = new UserList();
        userList.setUserListId(userListResponseDTO.getUserListId());
        userList.setDepartment(userListResponseDTO.getDepartment());
        userList.setContactPerson(userListResponseDTO.getContactPerson());
        return userList;
    }


    @Override
    public UserListResponseDTO updateUserList(Long userListId, UserListResponseDTO userListResponseDTO) {
        Optional<UserList> optionalUserList = userListRepository.findById(userListId);

        if (optionalUserList.isPresent()) {
            UserList userList = optionalUserList.get();
            
            userList.setDepartment(userListResponseDTO.getDepartment());
            userList.setContactPerson(userListResponseDTO.getContactPerson());

            userList = userListRepository.save(userList);

            UserListResponseDTO responseDTO = new UserListResponseDTO(
                userList.getUserListId(),
                userList.getDepartment(),
                userList.getContactPerson()
            );

            return responseDTO;
        }

        throw new EntityNotFoundException("UserList not found with id: " + userListId);
    }
    
    
 // convert to dto
    private UserListResponseDTO createResponseDTO(UserList userList) {
        UserListResponseDTO dto = new UserListResponseDTO();
        dto.setUserListId(userList.getUserListId());
        dto.setDepartment(userList.getDepartment());
        dto.setContactPerson(userList.getContactPerson());
        return dto;
    }
}
