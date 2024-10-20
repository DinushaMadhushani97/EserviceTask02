package lk.icta.eService.eServiceManagement.dto;

import java.util.List;

public class eServiceResponseDTO {
    private Long eId;
    private String eName;
    private String status;
    private String vCPU;
    private String ram;
    private String storage;
    private String organizationName;
    private String description;
    private String contactPerson;
    private TenantResponseDTO tenant;
    private List<ResourceResponseDTO> resourceList;
    private List<ServerResponseDTO> serverList;
	public eServiceResponseDTO() {
		
	}
	public eServiceResponseDTO(Long eId, String eName, String status, String vCPU, String ram, String storage,
			String organizationName, String description, String contactPerson, TenantResponseDTO tenant,
			List<ResourceResponseDTO> resourceList, List<ServerResponseDTO> serverList) {
		
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
	public TenantResponseDTO getTenant() {
		return tenant;
	}
	public void setTenant(TenantResponseDTO tenant) {
		this.tenant = tenant;
	}
	public List<ResourceResponseDTO> getResourceList() {
		return resourceList;
	}
	public void setResourceList(List<ResourceResponseDTO> resourceList) {
		this.resourceList = resourceList;
	}
	public List<ServerResponseDTO> getServerList() {
		return serverList;
	}
	public void setServerList(List<ServerResponseDTO> serverList) {
		this.serverList = serverList;
	}
	

    
}
