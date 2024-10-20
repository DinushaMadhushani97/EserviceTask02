package lk.icta.eService.eServiceManagement.entity;

import javax.persistence.*;

@Entity
@Table(name = "tbl_server")
public class Server {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "s_id")
    private Long sId;

    @Column(name = "s_ip_addr")
    private String sIpAddress;

    @Column(name = "s_type")
    private String sType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "e_id")
    private eService eService;
    
    @Column(name = "users")
    private String userList;
    
    @Column(name = "status")
    private String status;

    public Server() {
    }

	public Server(Long sId, String sIpAddress, String sType,
			lk.icta.eService.eServiceManagement.entity.eService eService, String userList, String status) {
		
		this.sId = sId;
		this.sIpAddress = sIpAddress;
		this.sType = sType;
		this.eService = eService;
		this.userList = userList;
		this.status = status;
	}

	public Long getsId() {
		return sId;
	}

	public void setsId(Long sId) {
		this.sId = sId;
	}

	public String getsIpAddress() {
		return sIpAddress;
	}

	public void setsIpAddress(String sIpAddress) {
		this.sIpAddress = sIpAddress;
	}

	public String getsType() {
		return sType;
	}

	public void setsType(String sType) {
		this.sType = sType;
	}

	public eService geteService() {
		return eService;
	}

	public void seteService(eService eService) {
		this.eService = eService;
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
