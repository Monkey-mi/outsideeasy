package test.usercenter.supplierFiles;

import java.util.HashMap;
import java.util.Map;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import test.base.BaseTest;
import usercenter.supplierFiles.service.SupplierFactoryCycleInfoService;

/**
 * @author mishengliang
 *
 */
public class SupplierFacCycInfoTest extends BaseTest {
	@Autowired
	private SupplierFactoryCycleInfoService serivce;
	
	@Test
	public void addOrUpdateTest(){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("supplierId", "11");
		params.put("checkFacId", "31");//31一年周期 34一个月周期
		serivce.addOrUpdate(params);
	}
	
}
