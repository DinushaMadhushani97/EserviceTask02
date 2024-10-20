package lk.icta.eService.eServiceManagement.entity;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tbl_tenant_master")
public class Tenant {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "t_id")
	private Long tId;

	@Column(name = "t_name")
	private String tName;

	@Column(name = "status")
	private String status;

	@ManyToOne
    @JoinColumn(name = "user_list_id")
    private UserList userList;

	@OneToMany(mappedBy = "tenant", cascade = CascadeType.ALL)
	private List<eService> eServiceList = new ArrayList<>();

	public Tenant() {

	}

	public Tenant(Long tId, String tName, String status, UserList userList, List<eService> eServiceList) {
		
		this.tId = tId;
		this.tName = tName;
		this.status = status;
		this.userList = userList;
		this.eServiceList = eServiceList;
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

	public List<eService> geteServiceList() {
		return eServiceList;
	}

	public void seteServiceList(List<eService> eServiceList) {
		this.eServiceList = eServiceList;
	}
	
	

	

}
