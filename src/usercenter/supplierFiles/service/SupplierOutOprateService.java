package usercenter.supplierFiles.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.supplierFiles.data.SupplierOutOprateMapper;
import usercenter.supplierFiles.model.SupplierOutOprate;


@Service
public class SupplierOutOprateService {
	@Autowired
	private SupplierOutOprateMapper mapper;


	public List<SupplierOutOprate> getSupplierOutOprateList(Map<String,Object> params) {
		return mapper.getSupplierOutOprateList(params);
	}
	
	/**
	 * @Description: 增加淘汰记录
	 * SupplierOutOprateService
	 * addSupplierOutOprate
	 * @param obj void
	 * @author mishengliang
	 * 2016-8-19 下午5:25:49
	 */
	public void addSupplierOutOprate(SupplierOutOprate obj) {
			mapper.addSupplierOutOprate(obj);
	}
	
	public void updateSupplierOutOprate(SupplierOutOprate[] arr) {
		for(SupplierOutOprate obj: arr) {
			mapper.updateSupplierOutOprate(obj);
		}
	}
	public void deleteSupplierOutOprate(SupplierOutOprate[] arr) {
		for(SupplierOutOprate obj: arr) {
			mapper.deleteSupplierOutOprate(obj);
		}
	}
}
