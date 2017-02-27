/**
 *outsideeasytest.usercenter.suplierSupplierServiceTest.java
 *	2016-3-24下午2:55:24
 * mishengliang
 */
package test.usercenter.suplier;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import test.base.BaseTest;
import usercenter.common.main.data.TradeClassDoMapper;
import usercenter.company.data.CompanyMapper;
import usercenter.company.model.CompanySimpleInfo;
import usercenter.company.service.CompanyService;

/**
 * @author mishengliang
 *
 */
public class SupplierServiceTest extends BaseTest {
	@Autowired
	private TradeClassDoMapper tradeClassDoMapper;
	@Autowired
	private CompanyService service;
	@Autowired
	private CompanyMapper mapper;
	
	@Test
	public void getClassListForTest(){
		String tradeClass = "五金";
		List<Integer> classesNumArray = tradeClassDoMapper.getTradeClassCode(tradeClass);
		logger.debug("++++++++++++++"+classesNumArray.toString()+"+++++++++++");
	}
	
	
	@Test
	public void integerArrayTest(){
		Integer[] integerArray = null;
		String integerString = Arrays.toString(integerArray);
		String num = integerString.substring(1, integerString.length()-1);
		logger.debug("++++++++++++"+num+"+++++++++++++++");
	}
	
	
	@Test
	public void getSupplierListByaddrOrclassTest(){
		Map<String, Object> params = new HashMap<String, Object>();
		String tradeClassOrCompanyName = "五金";
		String addr = "330000";
		params.put("addr", addr);
		params.put("key1", tradeClassOrCompanyName);
		params.put("start", 0);
		params.put("limit", 5);
		List<CompanySimpleInfo> list = service.getSupplierListByaddrOrclass(params);
		for(int i = 0;i < list.size();i++){
			logger.debug("*************************"+list.get(i).getContact_addr()+"***************************");
		}
	}
	
	/**
	 * 根据companyId获取公司详细信息
	*getCompanyInfoByCompanyIdTest
	*void
	*@author mishengliang
	*2016-3-28上午11:26:00
	 */
	@Test
	public void getCompanyInfoByCompanyIdTest(){
		Map<String, Object> companyInfoMap = null;
		String companyId = "1";
		companyInfoMap = service.getCompanyInfoByCompanyId(companyId);
		logger.debug("行业类别："+companyInfoMap.get("tradeClass").toString()
				+" 销售类别："+ companyInfoMap.get("saleItem").toString()
				+" 购买类别："+companyInfoMap.get("buyItem").toString());
		logger.debug("额外信息："+companyInfoMap.get("compnayExtraInfo").toString());
	}
	
	/**
	 * 根据companyId获取行业名称
	*getTradeClassByCompanyIdTest
	*void
	*@author mishengliang
	*2016-3-28下午12:08:45
	 */
	@Test
	public void getTradeClassByCompanyIdTest(){
		Integer companyId = 39;
		String tradeClass = mapper.getTradeClassByCompanyId(companyId);
		logger.debug("************"+tradeClass);
	}
	
	/**
	 * 通过companyId获取销售条目
	*getSaleItemByCompanyIdTest
	*void
	*@author mishengliang
	*2016-3-28下午1:33:21
	 */
	@Test
	public void getSaleItemByCompanyIdTest(){
		Integer companyId = 57;
		List<String> saleItem = mapper.getSaleItemByCompanyId(companyId);
		logger.debug("************"+saleItem.toString());
	}
	
	/**
	 * 通过companyId查询购买条目
	*getBuyItemByCompanyIdTest
	*void
	*@author mishengliang
	*2016-3-28下午1:34:33
	 */
	@Test
	public void getBuyItemByCompanyIdTest(){
		Integer companyId = 65;
		List<String> buyItem = mapper.getBuyItemByCompanyId(companyId); 
		logger.debug("************"+buyItem.toString());
	}
	
	
}
