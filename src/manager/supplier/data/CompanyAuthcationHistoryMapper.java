package manager.supplier.data;

import java.util.List;
import java.util.Map;

import manager.supplier.model.CompanyAuthcationHistory;


public interface CompanyAuthcationHistoryMapper {
	public List<CompanyAuthcationHistory> getCompanyAuthcationHistoryList(Map<String,Object> params);
	public void addCompanyAuthcationHistory(CompanyAuthcationHistory obj);
	public void updateCompanyAuthcationHistory(CompanyAuthcationHistory obj);
	public void deleteCompanyAuthcationHistory(CompanyAuthcationHistory obj);
}
