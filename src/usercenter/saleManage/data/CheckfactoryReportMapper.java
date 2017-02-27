package usercenter.saleManage.data;

import java.util.List;
import java.util.Map;

import usercenter.saleManage.model.CheckfactoryReport;


public interface CheckfactoryReportMapper {
	public List<CheckfactoryReport> getCheckfactoryReportList(Map<String,Object> params);
	public void addCheckfactoryReport(CheckfactoryReport obj);
	public void updateCheckfactoryReport(CheckfactoryReport obj);
	public void deleteCheckfactoryReport(CheckfactoryReport obj);
	public List<CheckfactoryReport> getAllCheckfactoryReportList(Map<String,Object> params);
	
	/**
	 * 获取拥有者的供应商列表信息
	*getCheckfactoryReportAndcheckCycleList
	*@param params
	*@return
	*List<CheckfactoryReport>
	*@author mishengliang
	*2016-7-28下午5:18:26
	 */
	public List<Map<String, Object>> getCheckfactoryReportAndcheckCycleList(Map<String,Object> params);
	public List<CheckfactoryReport> getLastThreeCheckFactory(
			Map<String, Object> params);
	public int hasCheckFactory(Map<String, Object> params);
}
