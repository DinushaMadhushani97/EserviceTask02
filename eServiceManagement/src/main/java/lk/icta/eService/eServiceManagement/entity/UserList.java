package lk.icta.eService.eServiceManagement.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "user_list")
public class UserList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_list_id")
    private Long userListId;

    
    @Column(name = "department")
    private String department;
    @Column(name = "contact_person")
    private String contactPerson;

    @OneToMany(mappedBy = "userList")
    private List<Tenant> tenants;

    
	public UserList() {
		
	}


	public UserList(Long userListId, String department, String contactPerson, List<Tenant> tenants) {
		
		this.userListId = userListId;
		this.department = department;
		this.contactPerson = contactPerson;
		this.tenants = tenants;
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


	public List<Tenant> getTenants() {
		return tenants;
	}


	public void setTenants(List<Tenant> tenants) {
		this.tenants = tenants;
	}

	
    
}

