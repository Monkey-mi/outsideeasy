/**    
 * 文件名：CompanyForPlateFormTest.java    
 *    
 * 版本信息：    
 * 日期：2016-7-5    
 * Copyright 足下 Corporation 2016     
 * 版权所有    
 *    
 */
package test.platform.company;

import java.util.Map;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import platform.company.service.CompanyForPlateFormService;
import test.base.BaseTest;

/**    
 *     
 * 项目名称：outsideeasy    
 * 类名称：CompanyForPlateFormTest    
 * 创建人：mishengliang    
 * 创建时间：2016-7-5 上午9:25:56    
 * 修改人：mishengliang    
 * 修改时间：2016-7-5 上午9:25:56    
 * @version     
 *     
 */
public class CompanyForPlateFormTest extends BaseTest {
	@Autowired
	private CompanyForPlateFormService service;
	
	/**
	 * 企业门户信息获取
	*getCompanyInfoByCompanyIdForWindowTest
	*void
	*@author mishengliang
	*2016-7-5上午9:30:22
	 */
	@Test
	public void getCompanyInfoByCompanyIdForWindowTest(){
		Integer companyId = 1;
		Integer companyIdForAll = 1;
		Map<String, Object> resMap =  service.getCompanyInfoByCompanyIdForWindow(companyId,companyIdForAll);
		logger.debug(resMap);
	}
	
}
