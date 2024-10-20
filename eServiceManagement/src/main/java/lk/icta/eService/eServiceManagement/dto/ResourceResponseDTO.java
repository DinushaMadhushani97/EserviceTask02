package lk.icta.eService.eServiceManagement.dto;

public class ResourceResponseDTO {

    private Long rId;
    private String procurementDocs;
    private String srs;
    private String systemArchitecture;
    private String deploymentArchitecture;
    private String other;
    private String status;
	public ResourceResponseDTO() {
		
	}
	public ResourceResponseDTO(Long rId, String procurementDocs, String srs, String systemArchitecture,
			String deploymentArchitecture, String other, String status) {
		
		this.rId = rId;
		this.procurementDocs = procurementDocs;
		this.srs = srs;
		this.systemArchitecture = systemArchitecture;
		this.deploymentArchitecture = deploymentArchitecture;
		this.other = other;
		this.status = status;
	}
	public Long getrId() {
		return rId;
	}
	public void setrId(Long rId) {
		this.rId = rId;
	}
	public String getProcurementDocs() {
		return procurementDocs;
	}
	public void setProcurementDocs(String procurementDocs) {
		this.procurementDocs = procurementDocs;
	}
	public String getSrs() {
		return srs;
	}
	public void setSrs(String srs) {
		this.srs = srs;
	}
	public String getSystemArchitecture() {
		return systemArchitecture;
	}
	public void setSystemArchitecture(String systemArchitecture) {
		this.systemArchitecture = systemArchitecture;
	}
	public String getDeploymentArchitecture() {
		return deploymentArchitecture;
	}
	public void setDeploymentArchitecture(String deploymentArchitecture) {
		this.deploymentArchitecture = deploymentArchitecture;
	}
	public String getOther() {
		return other;
	}
	public void setOther(String other) {
		this.other = other;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
    
	
   
}