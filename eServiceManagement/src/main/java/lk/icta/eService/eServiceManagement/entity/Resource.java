package lk.icta.eService.eServiceManagement.entity;

import javax.persistence.*;

@Entity
@Table(name = "tbl_resource")
public class Resource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "r_id")
    private Long rId;

    @Column(name = "procurement_docs")
    private String procurementDocs;

    @Column(name = "srs")
    private String srs;

    @Column(name = "system_architecture")
    private String systemArchitecture;

    @Column(name = "deployment_architecture")
    private String deploymentArchitecture;
    
    @Column(name = "other")
    private String other;
    
    @Column(name = "status")
    private String status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "e_id")
    private eService eService;

    public Resource() {
    }

	public Resource(Long rId, String procurementDocs, String srs, String systemArchitecture,
			String deploymentArchitecture, String other, String status,
			lk.icta.eService.eServiceManagement.entity.eService eService) {
		
		this.rId = rId;
		this.procurementDocs = procurementDocs;
		this.srs = srs;
		this.systemArchitecture = systemArchitecture;
		this.deploymentArchitecture = deploymentArchitecture;
		this.other = other;
		this.status = status;
		this.eService = eService;
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

	public eService geteService() {
		return eService;
	}

	public void seteService(eService eService) {
		this.eService = eService;
	}

	
}
