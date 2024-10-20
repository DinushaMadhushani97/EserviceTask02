package lk.icta.eService.eServiceManagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lk.icta.eService.eServiceManagement.dto.TenantResponseDTO;
import lk.icta.eService.eServiceManagement.dto.UserListResponseDTO;
import lk.icta.eService.eServiceManagement.service.UserListService;

@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
@RequestMapping("/api/eService")
public class UserListController {

    @Autowired
    private UserListService userListService;

   
     //get mapping for get all details of the userlists
    @GetMapping("/userList/list")
    public ResponseEntity<List<UserListResponseDTO>> getAllUserLists(
    		@RequestParam(name = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
  			@RequestParam(name = "pageSize", defaultValue = "10", required = false) Integer pageSize,
  			@RequestParam(name = "sortBy", defaultValue = "userListId", required = false) String sortBy,
  			@RequestParam(name = "sortOrder", defaultValue = "ASC", required = false) String sortOrder) {
        List<UserListResponseDTO> userListResponseDTO = userListService.getAllUserLists(pageNumber, pageSize, sortBy,
  				sortOrder);
        return new ResponseEntity<>(userListResponseDTO, HttpStatus.OK);
    }
    
  

    @PostMapping("/userList/add")
    public ResponseEntity<UserListResponseDTO> addUserList(@RequestBody UserListResponseDTO userListResponseDTO) {
        UserListResponseDTO addedUserList = userListService.addUserList(userListResponseDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedUserList);
    }
    
   

    @PutMapping("/userList/update/{userListId}")
    public ResponseEntity<UserListResponseDTO> updateUserList(@PathVariable Long userListId, @RequestBody UserListResponseDTO userListResponseDTO) {
        UserListResponseDTO updatedUserList = userListService.updateUserList(userListId, userListResponseDTO);
        return new ResponseEntity<>(updatedUserList, HttpStatus.OK);
    }

    
}
