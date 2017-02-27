package platform.company.data;

import java.util.List;
import java.util.Map;

import platform.company.model.PfSupplierCheckfactoryReport;


public interface PfSupplierCheckfactoryReportMapper {
	public List<PfSupplierCheckfactoryReport> getPfSupplierCheckfactoryReportList(Map<String,Object> params);
	public void addPfSupplierCheckfactoryReport(PfSupplierCheckfactoryReport obj);
	public void updatePfSupplierCheckfactoryReport(PfSupplierCheckfactoryReport obj);
	public void deletePfSupplierCheckfactoryReport(PfSupplierCheckfactoryReport obj);
}
