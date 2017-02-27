package usercenter.purchaseManage.supplierManager.data;

import java.util.List;
import java.util.Map;

import usercenter.purchaseManage.supplierManager.model.SupplierCheckfactoryReport;


public interface SupplierCheckfactoryReportMapper {
	public List<SupplierCheckfactoryReport> getSupplierCheckfactoryReportList(Map<String,Object> params);
	public void addSupplierCheckfactoryReport(SupplierCheckfactoryReport obj);
	public void updateSupplierCheckfactoryReport(SupplierCheckfactoryReport obj);
	public void deleteSupplierCheckfactoryReport(SupplierCheckfactoryReport obj);
	
	/**
	 * @Description: 通过账号获取验厂报告列表
	 * SupplierCheckfactoryReportMapper
	 * getSupplierCheckfactoryReportListByAccount
	 * @param params
	 * @return List<SupplierCheckfactoryReport>
	 * @author mishengliang
	 * 2016-8-22 下午3:12:49
	 */
	List<SupplierCheckfactoryReport> getSupplierCheckfactoryReportListByAccount(Map<String, Object> params);
	
	/**
	 * @Description: 通过账号获取验厂报告总数
	 * SupplierCheckfactoryReportMapper
	 * getSupplierCheckfactoryReportListByAccountTotal
	 * @param params
	 * @return Integer
	 * @author mishengliang
	 * 2016-8-24 上午10:29:32
	 */
	Integer getSupplierCheckfactoryReportListByAccountTotal(Map<String, Object> params);
}
