package manager.supplier.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.supplier.data.CompanyAuthAttachedHistoryMapper;
import manager.supplier.model.CompanyAuthAttachedHistory;


@Service
public class CompanyAuthAttachedHistoryService {
	@Autowired
	private CompanyAuthAttachedHistoryMapper mapper;


	public List<CompanyAuthAttachedHistory> getCompanyAuthAttachedHistoryList(Map<String,Object> params) {
		return mapper.getCompanyAuthAttachedHistoryList(params);
	}
	public void addCompanyAuthAttachedHistory(CompanyAuthAttachedHistory obj) {
		mapper.addCompanyAuthAttachedHistory(obj);
		
	}
	public void updateCompanyAuthAttachedHistory(CompanyAuthAttachedHistory[] arr) {
		for(CompanyAuthAttachedHistory obj: arr) {
			mapper.updateCompanyAuthAttachedHistory(obj);
		}
	}
	public void deleteCompanyAuthAttachedHistory(CompanyAuthAttachedHistory[] arr) {
		for(CompanyAuthAttachedHistory obj: arr) {
			mapper.deleteCompanyAuthAttachedHistory(obj);
		}
	}
}
