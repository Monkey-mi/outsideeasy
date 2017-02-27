package manager.supplier.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.supplier.data.MngSupplierCheckfactoryReportMapper;
import manager.supplier.model.MngSupplierCheckfactoryReport;


@Service
public class MngSupplierCheckfactoryReportService {
	@Autowired
	private MngSupplierCheckfactoryReportMapper mapper;


	public List<MngSupplierCheckfactoryReport> getSupplierCheckfactoryReportList(Map<String,Object> params) {
		return mapper.getSupplierCheckfactoryReportList(params);
	}
	public void addSupplierCheckfactoryReport(MngSupplierCheckfactoryReport[] arr) {
		for(MngSupplierCheckfactoryReport obj: arr) {
			mapper.addSupplierCheckfactoryReport(obj);
		}
	}
	public void updateSupplierCheckfactoryReport(MngSupplierCheckfactoryReport[] arr) {
		for(MngSupplierCheckfactoryReport obj: arr) {
			mapper.updateSupplierCheckfactoryReport(obj);
		}
	}
	public void deleteSupplierCheckfactoryReport(MngSupplierCheckfactoryReport[] arr) {
		for(MngSupplierCheckfactoryReport obj: arr) {
			mapper.deleteSupplierCheckfactoryReport(obj);
		}
	}
}
