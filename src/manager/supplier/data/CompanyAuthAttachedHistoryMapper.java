package manager.supplier.data;

import java.util.List;
import java.util.Map;

import manager.supplier.model.CompanyAuthAttachedHistory;


public interface CompanyAuthAttachedHistoryMapper {
	public List<CompanyAuthAttachedHistory> getCompanyAuthAttachedHistoryList(Map<String,Object> params);
	public void addCompanyAuthAttachedHistory(CompanyAuthAttachedHistory obj);
	public void updateCompanyAuthAttachedHistory(CompanyAuthAttachedHistory obj);
	public void deleteCompanyAuthAttachedHistory(CompanyAuthAttachedHistory obj);
}
