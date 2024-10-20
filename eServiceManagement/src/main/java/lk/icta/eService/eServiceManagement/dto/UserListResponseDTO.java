package lk.icta.eService.eServiceManagement.dto;

import javax.persistence.Column;

public class UserListResponseDTO {
	
	    private Long userListId;
	    
	    
	   
	    private String department;
	 
	    private String contactPerson;

		public UserListResponseDTO() {
			
		}

		public UserListResponseDTO(Long userListId, String department, String contactPerson) {
			super();
			this.userListId = userListId;
			this.department = department;
			this.contactPerson = contactPerson;
		}

		public Long getUserListId() {
			return userListId;
		}

		public void setUserListId(Long userListId) {
			this.userListId = userListId;
		}

		public String getDepartment() {
			return department;
		}

		public void setDepartment(String department) {
			this.department = department;
		}

		public String getContactPerson() {
			return contactPerson;
		}

		public void setContactPerson(String contactPerson) {
			this.contactPerson = contactPerson;
		}

		
		
}
