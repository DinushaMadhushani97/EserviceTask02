package lk.icta.eService.eServiceManagement.entity;

import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "tbl_eservice_details")
public class eService {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "e_id")
	private Long eId;

	@Column(name = "e_name")
	private String eName;

	@Column(name = "status")
	private String status;

	@Column(name = "vcpu")
	private String vCPU;

	@Column(name = "ram")
	private String ram;

	@Column(name = "storage")
	private String storage;

	@Column(name = "organization")
	private String organizationName;

	@Column(name = "description")
	private String description;

	@Column(name = "contact_person")
	private String contactPerson;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "t_id")
	private Tenant tenant;

	@OneToMany(mappedBy = "eService", cascade = CascadeType.ALL)
	private List<Resource> resourceList;

	@OneToMany(mappedBy = "eService", cascade = CascadeType.ALL)
	private List<Server> serverList;

	public eService() {
	}

	public eService(Long eId, String eName, String status, String vCPU, String ram, String storage,
			String organizationName, String description, String contactPerson, Tenant tenant,
			List<Resource> resourceList, List<Server> serverList) {

		this.eId = eId;
		this.eName = eName;
		this.status = status;
		this.vCPU = vCPU;
		this.ram = ram;
		this.storage = storage;
		this.organizationName = organizationName;
		this.description = description;
		this.contactPerson = contactPerson;
		this.tenant = tenant;
		this.resourceList = resourceList;
		this.serverList = serverList;
	}

	public Long geteId() {
		return eId;
	}

	public void seteId(Long eId) {
		this.eId = eId;
	}

	public String geteName() {
		return eName;
	}

	public void seteName(String eName) {
		this.eName = eName;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getvCPU() {
		return vCPU;
	}

	public void setvCPU(String vCPU) {
		this.vCPU = vCPU;
	}

	public String getRam() {
		return ram;
	}

	public void setRam(String ram) {
		this.ram = ram;
	}

	public String getStorage() {
		return storage;
	}

	public void setStorage(String storage) {
		this.storage = storage;
	}

	public String getOrganizationName() {
		return organizationName;
	}

	public void setOrganizationName(String organizationName) {
		this.organizationName = organizationName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getContactPerson() {
		return contactPerson;
	}

	public void setContactPerson(String contactPerson) {
		this.contactPerson = contactPerson;
	}

	public Tenant getTenant() {
		return tenant;
	}

	public void setTenant(Tenant tenant) {
		this.tenant = tenant;
	}

	public List<Resource> getResourceList() {
		return resourceList;
	}

	public void setResourceList(List<Resource> resourceList) {
		this.resourceList = resourceList;
	}

	public List<Server> getServerList() {
		return serverList;
	}

	public void setServerList(List<Server> serverList) {
		this.serverList = serverList;
	}

}