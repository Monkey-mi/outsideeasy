package usercenter.saleManage.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.saleManage.data.AdmittanceAuditMapper;
import usercenter.saleManage.model.AdmittanceAudit;


@Service
public class AdmittanceAuditService {
	@Autowired
	private AdmittanceAuditMapper mapper;


	public List<AdmittanceAudit> getAdmittanceAuditList(Map<String,Object> params) {
		return mapper.getAdmittanceAuditList(params);
	}
	public void addAdmittanceAudit(Map<String,Object> params) {
			mapper.addAdmittanceAudit(params);
	}
	public void updateAdmittanceAudit(Map<String,Object> params) {
			mapper.updateAdmittanceAudit(params);
	}
	public void deleteAdmittanceAudit(Map<String,Object> params) {
			mapper.deleteAdmittanceAudit(params);
	}
	public List<AdmittanceAudit> getAdmittanceAuditById(Map<String,Object> params) {
		return mapper.getAdmittanceAuditById(params);
	}
}
