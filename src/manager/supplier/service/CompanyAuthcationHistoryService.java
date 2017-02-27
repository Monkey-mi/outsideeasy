package manager.supplier.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.supplier.data.CompanyAuthcationHistoryMapper;
import manager.supplier.model.CompanyAuthcationHistory;


@Service
public class CompanyAuthcationHistoryService {
	@Autowired
	private CompanyAuthcationHistoryMapper mapper;


	public List<CompanyAuthcationHistory> getCompanyAuthcationHistoryList(Map<String,Object> params) {
		return mapper.getCompanyAuthcationHistoryList(params);
	}
	public void addCompanyAuthcationHistory(CompanyAuthcationHistory obj) {
		mapper.addCompanyAuthcationHistory(obj);
		
	}
	public void updateCompanyAuthcationHistory(CompanyAuthcationHistory[] arr) {
		for(CompanyAuthcationHistory obj: arr) {
			mapper.updateCompanyAuthcationHistory(obj);
		}
	}
	public void deleteCompanyAuthcationHistory(CompanyAuthcationHistory[] arr) {
		for(CompanyAuthcationHistory obj: arr) {
			mapper.deleteCompanyAuthcationHistory(obj);
		}
	}
}
