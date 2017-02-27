/**    
 * 文件名：purchaseManageTest.java    
 *    
 * 版本信息：    
 * 日期：2016-7-25    
 * Copyright 足下 Corporation 2016     
 * 版权所有    
 *    
 */
package test.usercenter.supplierFiles;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import test.base.BaseTest;
import usercenter.saleManage.model.CheckFactoryCycle;
import usercenter.supplierFiles.data.SupplierFilesMapper;
import usercenter.supplierFiles.service.SupplierFilesService;

/**    
 *     
 * 项目名称：outsideeasy    
 * 类名称：purchaseManageTest    
 * 类描述：    
 * 创建人：mishengliang    
 * 创建时间：2016-7-25 下午2:48:05    
 * 修改人：mishengliang    
 * 修改时间：2016-7-25 下午2:48:05    
 *     
 */
public class supplierFilesTest extends BaseTest {
	@Autowired
	private SupplierFilesService service;
	
	/**
	 * 根据ID获取供应商列表
	*getSupplierFilseByOnwerIdTest
	*void
	*@author mishengliang
	*2016-7-25下午2:49:44
	 */
	@Test
	public void getSupplierFilseByOnwerIdTest(){
		Map<String, Object> params = new HashMap<String, Object>();
		Integer ownerId = 10000;
		
		params.put("ownerId", ownerId);
		
		List<Map<String, Object>> list = service.getSupplierFilseByOwnerId(params, params);
		logger.debug("MapList : "+ list);
	}
	
	/**
	 * @Description: 测试获取验厂周期信息
	 * supplierFilesTest
	 * getCheckFac void
	 * @author mishengliang
	 * 2016-8-1 下午3:45:51
	 */
	@Test
	public void getCheckFac(){
		List<CheckFactoryCycle> list = service.getCheckCycle();
		logger.debug("CheckFacList:" + list);
	}

}
