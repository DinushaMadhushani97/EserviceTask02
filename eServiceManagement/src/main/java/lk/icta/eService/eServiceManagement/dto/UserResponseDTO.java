package lk.icta.eService.eServiceManagement.dto;

import java.util.List;

public class UserResponseDTO {

	private Long id;
    private String name;
    private String email;
    private String status;
    private String disable;
    private List<TenantResponseDTO> tenantList;
    private List<ServerResponseDTO> serverList;
	

	public UserResponseDTO() {

	}


	public UserResponseDTO(Long id, String name, String email, String status, String disable,
			List<TenantResponseDTO> tenantList, List<ServerResponseDTO> serverList) {
		
		this.id = id;
		this.name = name;
		this.email = email;
		this.status = status;
		this.disable = disable;
		this.tenantList = tenantList;
		this.serverList = serverList;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public String getDisable() {
		return disable;
	}


	public void setDisable(String disable) {
		this.disable = disable;
	}


	public List<TenantResponseDTO> getTenantList() {
		return tenantList;
	}


	public void setTenantList(List<TenantResponseDTO> tenantList) {
		this.tenantList = tenantList;
	}


	public List<ServerResponseDTO> getServerList() {
		return serverList;
	}


	public void setServerList(List<ServerResponseDTO> serverList) {
		this.serverList = serverList;
	}


	
	
}
