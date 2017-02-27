/**    
 * 文件名：AuthcationInfoTest.java    
 *    
 * 版本信息：    
 * 日期：2016-5-20    
 * Copyright 足下 Corporation 2016     
 * 版权所有    
 *    
 */
package test.platform.supplierAccess;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import platform.company.service.CompanyForPlateFormService;
import platform.supplierAccess.model.PfAuthcationInfo;
import platform.supplierAccess.model.PfAuthcationUpdate;
import platform.supplierAccess.model.PfUpdateRegisterAttched;
import platform.supplierAccess.service.PfAuthcationInfoService;
import platform.supplierAccess.service.PfAuthcationUpdateService;
import platform.supplierAccess.service.PfUpdateRegisterAttchedService;

import test.base.BaseTest;

/**    
 *     
 * 项目名称：outsideeasy    
 * 类名称：AuthcationInfoTest    
 * 创建人：mishengliang    
 * 创建时间：2016-5-20 上午10:20:55    
 * 修改人：mishengliang    
 * 修改时间：2016-5-20 上午10:20:55    
 * @version     
 *     
 */
public class AuthcationInfoTest extends BaseTest{
	@Autowired
	private PfAuthcationInfoService service;
	@Autowired
	private PfAuthcationUpdateService updateService;
	@Autowired
	private CompanyForPlateFormService supplierService;
	@Autowired
	private PfUpdateRegisterAttchedService updateRegisterAttchedService;
	
	
	/**
	 * 
	*getPfAuthcationInfoByCompanyIdTest
	*void
	*@author mishengliang
	*2016-5-20上午10:23:15
	 */
	@Test
	public void getPfAuthcationInfoByCompanyIdTest(){
		Map<String,Object> params = new HashMap<String, Object>();
		
		params.put("companyId", 10000);
		params.put("state", 20);
		
		PfAuthcationInfo authInfo = service.getPfAuthcationInfoByCompanyId(params);
		System.out.println(authInfo);
	}
	
	/**
	 * 获取最后一条变更信息
	*getLastAuthcationUpdateItemTest
	*void
	*@author mishengliang
	*2016-5-23下午2:08:07
	 */
	@Test
	public void getLastAuthcationUpdateItemTest(){
		Map<String,Object> params = new HashMap<String, Object>();
		params.put("company_id", 10000);
		
		PfAuthcationUpdate authcation = updateService.getLastAuthcationUpdateItem(params);
		System.out.println(authcation);
	}
	
	/**
	 * service层测试获取更新状态
	*getLastAuthcationUpdateItemTestService
	*void
	*@author mishengliang
	*2016-5-23下午2:12:10
	 */
	@Test
	public void getLastAuthcationUpdateItemTestService(){
		Map<String,Object> params = new HashMap<String, Object>();
		params.put("company_id", 31);
		
		PfAuthcationUpdate authcation = supplierService.getLastAuthcationUpdateItem(params);
		System.out.println(authcation);
	}
	
	/**
	 * 企业证照变更表信息获取
	*getPfUpdateRegisterAttchedList
	*void
	*@author mishengliang
	*2016-5-26上午10:04:53
	 */
	@Test
	public void getPfUpdateRegisterAttchedList(){
		Map<String,Object> params = new HashMap<String, Object>();
		params.put("company_id", 10000);
		params.put("file_type_id", 18);
		List<PfUpdateRegisterAttched> list = updateRegisterAttchedService.getPfUpdateRegisterAttchedList(params);
		logger.debug(list.get(0).toString());
	}
}
