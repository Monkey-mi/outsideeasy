/**    
 * 文件名：SaleManageTest.java    
 *    
 * 版本信息：    
 * 日期：2016-7-28    
 * Copyright 足下 Corporation 2016     
 * 版权所有    
 *    
 */
package test.usercenter.saleManage;
import static org.junit.Assert.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
 

import org.easymock.EasyMock;
import org.junit.Test;

import org.springframework.beans.factory.annotation.Autowired;

import test.base.BaseTest;

import usercenter.externalTask.service.TaskDeliverGoodsService;
import usercenter.saleManage.data.CheckfactoryReportMapper;
import usercenter.saleManage.model.AccessApplicationCategory;
import usercenter.saleManage.service.AccessApplicationCategoryService;
import usercenter.saleManage.service.AccessTempletHeadService;
import usercenter.saleManage.tradeManager.service.OrderDeliveryNoticeService;
import usercenter.supplierFiles.data.SupplierTagInfoMapper;
import usercenter.supplierFiles.data.SupplierTagMapper;
import usercenter.supplierFiles.model.SupplierTagInfo;

/**    
 *     
 * 项目名称：outsideeasy    
 * 类名称：SaleManageTest    
 * 创建人：mishengliang    
 * 创建时间：2016-7-28 下午2:52:46    
 * 修改人：mishengliang 
 * 修改时间：2016-7-28 下午2:52:46    
 *     
 */
public class SaleManageTest extends BaseTest {
	@Autowired
	private CheckfactoryReportMapper checkFackMapper;
//	@Autowired
//	private ReceiptDetailService receiptDetailService;
	@Autowired
	private SupplierTagMapper tagMapper;
	@Autowired
	private SupplierTagInfoMapper tagSupplierMapper;
	@Autowired
	private AccessTempletHeadService accessTempletHeadService;
	@Autowired
	private AccessApplicationCategoryService accessApplicationCategoryService;
	@Autowired
	private OrderDeliveryNoticeService orderDeliveryNoticeService;
	@Autowired
	private TaskDeliverGoodsService taskDeliverGoodsService;
	/**
	 * mock测试的demo
	* @Description:
	* SaleManageTest
	* testSayHi
	* @throws java.lang.Exception void
	* @author chenlong
	* 2017-2-5 下午3:47:17
	 */
	@Test
	public void testSayHi() throws Exception{
		String Strsc = new String();
		Adder adder = EasyMock.createMock(Adder.class);	//mock模拟出一个对象	。用于代替真实的adder		
		EasyMock.expect(adder.add("10", "01")).andThrow(new Exception());
		EasyMock.expect(adder.add("10", "01")).andReturn(Strsc).times(3);//我们可以通过mock UserDao来模拟出UserDao的各种行为以便检测UserServiceImpl在这些行为下的处理是否正确: 不同的返回值，错误场景，异常场景
		EasyMock.replay(adder);
		
		
		SayHi sh = new SayHi();
		System.out.println(sh.sayHi("asc", "dsf"));
		assertTrue(sh.sayHi("abc", "def").equalsIgnoreCase("failed"));
	}	
	/**
	 * 测试批量插入
	* @Description:
	* SaleManageTest
	* testaddPfPurchaseOrderOperating void
	* @author chenlong
	* 2017-2-22 下午2:59:16
	 */
	@Test
    public void testaddPfPurchaseOrderOperating(){
    	Map<String, Object> params = new HashMap<String, Object>();
    	String[] arr = {"1","2","3"};
    	params.put("arrs", arr);
    	params.put("order_status", 9);
    	taskDeliverGoodsService.addPfPurchaseOrderOperating(params);
    }
	/**
	 * 获取验厂报告
	*getCheckfactoryReportList
	*void
	*@author mishengliang
	*2016-7-28下午2:56:45
	 */
	@Test
	public void getCheckfactoryReportList(){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("supplier_id", 6);
		//params.put("limit_num", 1);
		
		List<Map<String, Object>> checkFacList = checkFackMapper.getCheckfactoryReportAndcheckCycleList(params);
		logger.debug("message:" + checkFacList);
	}
	
	/**
	 * @Description: 账号下的标签内容
	 * SaleManageTest
	 * getTagContentList void
	 * @author mishengliang
	 * 2016-8-5 上午10:23:48
	 */
	@Test
	public void getTagContentList(){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("accountId", 10000);
		
		List<Map<String, Object>> list = tagMapper.getSupplierTagListForAccount(params);
		logger.debug(list);
	}
	
	/**
	 * @Description: 供应商拥有的标签内容
	 * SaleManageTest
	 * getSupplierTag void
	 * @author mishengliang
	 * 2016-8-5 上午10:23:45
	 */
	@Test
	public void getSupplierTag(){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("supplierId", 6);
		
		List<SupplierTagInfo> list = tagSupplierMapper.getSupplierTag(params);
		logger.debug(list);
	}
	
	@Test
	public void getHid(){
		Integer hid = accessTempletHeadService.getHID(9999);
		logger.debug("wuli:"+hid);
	}
	
	@Test
	public void getAccessApplicationCategoryListTest(){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("record_id", 130);
		params.put("supplier_id", 198);
		List<AccessApplicationCategory> list = accessApplicationCategoryService.getAccessApplicationCategoryList(params);
		logger.debug("*******************"+list);
	}
	
	@Test
	public void orderDeliveryNoticeService(){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("noticeId", 24);
		Integer mStatu = orderDeliveryNoticeService.getDeliveryStatu(params);
		logger.debug("******"+mStatu);
	}
}
