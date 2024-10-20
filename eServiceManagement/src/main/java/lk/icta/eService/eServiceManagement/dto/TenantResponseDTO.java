package lk.icta.eService.eServiceManagement.dto;

import java.util.List;

import lk.icta.eService.eServiceManagement.entity.UserList;

public class TenantResponseDTO {

	private Long tId;
	private String tName;
	private String status;
	private UserList userList;
	
	public TenantResponseDTO() {

	}

	public TenantResponseDTO(Long tId, String tName, String status, UserList userList) {
		
		this.tId = tId;
		this.tName = tName;
		this.status = status;
		this.userList = userList;
	}

	public Long gettId() {
		return tId;
	}

	public void settId(Long tId) {
		this.tId = tId;
	}

	public String gettName() {
		return tName;
	}

	public void settName(String tName) {
		this.tName = tName;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public UserList getUserList() {
		return userList;
	}

	public void setUserList(UserList userList) {
		this.userList = userList;
	}

	
	
}
