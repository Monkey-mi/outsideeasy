package usercenter.saleManage.data;

import java.util.List;
import java.util.Map;

import usercenter.saleManage.model.AdmittanceAudit;


public interface AdmittanceAuditMapper {
	public List<AdmittanceAudit> getAdmittanceAuditList(Map<String,Object> params);
	public void addAdmittanceAudit(Map<String,Object> params);
	public void updateAdmittanceAudit(Map<String,Object> params);
	public void deleteAdmittanceAudit(Map<String,Object> params);
	public List<AdmittanceAudit> getAdmittanceAuditById(Map<String, Object> params);
}
