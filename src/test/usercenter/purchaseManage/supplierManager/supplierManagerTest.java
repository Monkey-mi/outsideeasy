package test.usercenter.purchaseManage.supplierManager;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import test.base.BaseTest;
import usercenter.purchaseManage.supplierManager.model.SupplierCheckfactoryInform;
import usercenter.purchaseManage.supplierManager.model.SupplierCheckfactoryReport;
import usercenter.purchaseManage.supplierManager.model.WaitNotifySupplier;
import usercenter.purchaseManage.supplierManager.service.SupplierCheckfactoryInformService;
import usercenter.purchaseManage.supplierManager.service.SupplierCheckfactoryReportService;
import usercenter.supplierFiles.model.SupplierFiles;

/**
 * @author mishengliang
 */
public class supplierManagerTest extends BaseTest {

	@Autowired
	private SupplierCheckfactoryReportService reportService;
	@Autowired
	private SupplierCheckfactoryInformService checkService;
	@Test
	public void getSupplierCheckfactoryReportListByAccountTest(){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("regId", 12);
		List<SupplierCheckfactoryReport> list = reportService.getSupplierCheckfactoryReportListByAccount(params,params);
		logger.debug("Num:"+list.size()+"***/n"+list);
	}
	
	@Test
	public void getExemptCheckSupplierTest(){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("regId", 12);
		List<SupplierFiles> list = checkService.getExemptCheckSupplier(params,params);
		logger.debug("Num:"+list.size()+"***/n"+list);
	}
	
	@Test
	public void getWaitNotifySuppliersTest(){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("regId", 12);
		params.put("beforeDate", 15);
		
		List<WaitNotifySupplier> list = checkService.getWaitNotifySuppliers(params,params);
		logger.debug("Num:"+list.size()+"***"+list);
	}
	
	@Test
	public void getNotifiedSuppliers(){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("regId", 12);
		List<SupplierCheckfactoryInform> list = checkService.getNotifiedSuppliers(params,params);
		logger.debug("Num:"+list.size()+"***"+list);
	}
	
	@Test
	public void notifySupplierTest(){
		SupplierCheckfactoryInform checkInfo = new SupplierCheckfactoryInform();
		checkInfo.setFile_name("验厂报告test.docx");
		checkInfo.setMogodb_id("jk948390dli003");
		
		checkService.notifySupplier(checkInfo);
		logger.debug("***"+checkInfo);
	}
	
	@Test
	public void updateNotifySupplierTest(){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("supplierId", 11);
		params.put("planCheckDt", new Date());
		params.put("sendCompanyId", 999);
		params.put("checkMan", "王佳欣");
		params.put("checkManPhone", "12589635896");
		params.put("checkinformId", 5);
		checkService.updateNotifySupplier(params);
	}
}
