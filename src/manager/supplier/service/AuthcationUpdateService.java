package manager.supplier.service;

import java.util.List;
import java.util.Map;

import manager.supplier.data.AuthcationUpdateMapper;
import manager.supplier.model.AuthcationUpdate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class AuthcationUpdateService {
	@Autowired
	private AuthcationUpdateMapper mapper;
	@Autowired
	private CompanyAuthcationHistoryService companyAuthcationHistoryService;
	@Autowired
	private CompanyAuthAttachedHistoryService companyAuthAttachedHistoryService;
	@Autowired
	private AuthUpdateAttchedService authUpdateAttchedService;

	public List<AuthcationUpdate> getAuthcationUpdateList(Map<String,Object> params) {
		return mapper.getAuthcationUpdateList(params);
	}
	public void addAuthcationUpdate(AuthcationUpdate[] arr) {
		for(AuthcationUpdate obj: arr) {
			mapper.addAuthcationUpdate(obj);
		}
	}
	public void updateAuthcationUpdate(AuthcationUpdate[] arr) {
		for(AuthcationUpdate obj: arr) {
			mapper.updateAuthcationUpdate(obj);
		}
	}
	public void deleteAuthcationUpdate(AuthcationUpdate[] arr) {
		for(AuthcationUpdate obj: arr) {
			mapper.deleteAuthcationUpdate(obj);
		}
	}
	
}
