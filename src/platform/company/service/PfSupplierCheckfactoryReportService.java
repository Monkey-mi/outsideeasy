package platform.company.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform.company.data.PfSupplierCheckfactoryReportMapper;
import platform.company.model.PfSupplierCheckfactoryReport;


@Service
public class PfSupplierCheckfactoryReportService {
	@Autowired
	private PfSupplierCheckfactoryReportMapper mapper;


	public List<PfSupplierCheckfactoryReport> getPfSupplierCheckfactoryReportList(Map<String,Object> params) {
		return mapper.getPfSupplierCheckfactoryReportList(params);
	}
	public void addPfSupplierCheckfactoryReport(PfSupplierCheckfactoryReport obj) {
		mapper.addPfSupplierCheckfactoryReport(obj);
	}
	public void addPfSupplierCheckfactoryReport(PfSupplierCheckfactoryReport[] arr) {
		for(PfSupplierCheckfactoryReport obj: arr) {
			mapper.addPfSupplierCheckfactoryReport(obj);
		}
	}
	public void updatePfSupplierCheckfactoryReport(PfSupplierCheckfactoryReport[] arr) {
		for(PfSupplierCheckfactoryReport obj: arr) {
			mapper.updatePfSupplierCheckfactoryReport(obj);
		}
	}
	public void deletePfSupplierCheckfactoryReport(PfSupplierCheckfactoryReport[] arr) {
		for(PfSupplierCheckfactoryReport obj: arr) {
			mapper.deletePfSupplierCheckfactoryReport(obj);
		}
	}
}
