package manager.supplier.data;

import java.util.List;
import java.util.Map;

import manager.supplier.model.MngSupplierCheckfactoryReport;


public interface MngSupplierCheckfactoryReportMapper {
	public List<MngSupplierCheckfactoryReport> getSupplierCheckfactoryReportList(Map<String,Object> params);
	public void addSupplierCheckfactoryReport(MngSupplierCheckfactoryReport obj);
	public void updateSupplierCheckfactoryReport(MngSupplierCheckfactoryReport obj);
	public void deleteSupplierCheckfactoryReport(MngSupplierCheckfactoryReport obj);
}
