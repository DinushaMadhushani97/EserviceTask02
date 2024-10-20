package lk.icta.eService.eServiceManagement.dto;

public class ServerResponseDTO {

	private Long sId;
	private String ipAddress;
	private String type;

	private String userList;

	private String status;

	public ServerResponseDTO() {

	}

	public ServerResponseDTO(Long sId, String ipAddress, String type, String userList, String status) {

		this.sId = sId;
		this.ipAddress = ipAddress;
		this.type = type;
		this.userList = userList;
		this.status = status;
	}

	public Long getsId() {
		return sId;
	}

	public void setsId(Long sId) {
		this.sId = sId;
	}

	public String getIpAddress() {
		return ipAddress;
	}

	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getUserList() {
		return userList;
	}

	public void setUserList(String userList) {
		this.userList = userList;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}
