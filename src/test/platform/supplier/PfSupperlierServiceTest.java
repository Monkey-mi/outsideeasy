/**    
 * 文件名：PfSupperlierServiceTest.java    
 *    
 * 版本信息：    
 * 日期：2016-4-8    
 * Copyright 足下 Corporation 2016     
 * 版权所有    
 *    
 */
package test.platform.supplier;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import platform.company.data.PfBankAccountMapper;
import platform.company.data.PfCompetitorMapper;
import platform.company.data.PfDeviceMapper;
import platform.company.data.PfGoodsMapper;
import platform.company.data.PfInvoiceTitleMapper;
import platform.company.data.PfMainCustomerMapper;
import platform.company.data.PfMetarialMapper;
import platform.company.data.PfCompanyExtraInfoMapper;
import platform.company.data.PfCompanyMapper;
import platform.company.model.PfBankAccount;
import platform.company.model.PfCompanySimpleInfo;
import platform.company.model.PfCompetitor;
import platform.company.model.PfDevice;
import platform.company.model.PfGoods;
import platform.company.model.PfMainCustomer;
import platform.company.model.PfMaterial;
import platform.company.service.CompanyForPlateFormService;
import platform.supplierAccess.model.PfAuthcationUpdate;
import test.base.BaseTest;

/**    
 *     
 * 项目名称：outsideeasy    
 * 类名称：PfSupperlierServiceTest    
 * 创建人：mishengliang
 * 创建时间：2016-4-8 上午9:37:43    
 * 修改人：mishengliang    
 * 修改时间：2016-4-8 上午9:37:43    
 * @version     
 *     
 */
public class PfSupperlierServiceTest extends BaseTest {
	@Autowired
	private PfCompanyExtraInfoMapper mapper;
	@Autowired
	private PfGoodsMapper goodsMapper;
	@Autowired
	private PfMetarialMapper metarialMapper;
	@Autowired
	private PfMainCustomerMapper mainCustomerMapper;
	@Autowired
	private PfCompetitorMapper competitorMapper;
	@Autowired
	private PfDeviceMapper deviceMapper;
	@Autowired
	private PfBankAccountMapper bankAccountMapper;
	@Autowired
	private PfInvoiceTitleMapper invoiceTitleMapper;
	@Autowired
	private PfCompanyMapper supplierMapper;
	@Autowired
	private CompanyForPlateFormService service;
	
	
	/**
	 * 测试mapper层获取销售产品、采购产品、主要客户、竞争对手信息
	*getMoreInfoTest
	*void
	*@author mishengliang
	*2016-4-8上午9:38:41
	 */
	@Test
	public void getMoreInfoTest(){
		Integer companyId = 6;
		List<PfMaterial> materialList= mapper.getBuyModelByCompanyId(companyId);//采购产品
		List<PfGoods> goodsList= mapper.getSaleModelByCompanyId(companyId);//销售产品
		List<PfMainCustomer> customerList= mapper.getMainCustomerByCompanyId(companyId);//主要客户
		List<PfCompetitor> competitorList= mapper.getCompetitorByCompanyId(companyId);//竞争对手信息
		List<PfDevice> deviceList = mapper.getDeviceByCompanyId(companyId);
		
		logger.debug("原材料："+ materialList
					+"产品："+ goodsList
					+"主要客户："+ customerList
					+"竞争对手："+ competitorList
					+"设备："+ deviceList);
	}
	
	/**
	 * 产品的CURD测试
	*goodsForTest
	*void
	*@author mishengliang
	*2016-4-8下午3:50:18
	 */
	@Test
	public void goodsForTest(){
		Integer goodsId = 5;
		String goodsName = "MikeSun";
		String goodsBrand = "Springlight";
		Integer companyId = 6;
		Map<String, Object> params = new HashMap<String, Object>();
		
		params.put("goodsId", goodsId);
		params.put("goodsName", goodsName);
		params.put("goodsBrand", goodsBrand);
		params.put("companyId", companyId);
		
		List<PfGoods> goodsList= goodsMapper.getSaleModelByCompanyId(companyId);
		//goodsMapper.updateGoodsByGoodsId(params);//测试更新商品
		//goodsMapper.addGoods(params);//测试增加商品
		goodsMapper.deleteGoods(params);
		
		logger.debug("商品列表："+goodsList.toString());
	}
	
	/**
	 * 原材料CURD测试
	*metatiralMapper
	*void
	*@author mishengliang
	*2016-4-9上午10:32:23
	 */
	@Test
	public void metatiralTest(){
		Integer materialId = 5;
		String materialName = "Shaline";
		String materialBrand = "SpringLight";
		Integer companyId = 6;
		Map<String, Object> params = new HashMap<String, Object>();
		
		params.put("materialId", materialId);
		params.put("materialName", materialName);
		params.put("materialBrand", materialBrand);
		params.put("companyId", companyId);
		
		//metarialMapper.addMetarial(params);
		//metarialMapper.deleteMetarial(params);
		List<PfMaterial> materialList = metarialMapper.getBuyModelByCompanyId(companyId);
		metarialMapper.updateMetarialById(params);
		
		logger.debug("原材料列表："+materialList.toString());
	}
	
	/**
	 * 主要客户CURD测试
	*mainCustomerTest
	*void
	*@author mishengliang
	*2016-4-9上午10:45:45
	 */
	@Test
	public void mainCustomerTest(){
		Integer customerId = 6;
		String customerName = "Shailene";
		Integer companyId = 6;
		Map<String, Object> params = new HashMap<String, Object>();
		
		params.put("customerId", customerId);
		params.put("customerName", customerName);
		params.put("companyId", companyId);
		
		//mainCustomerMapper.addCustomer(params);
		mainCustomerMapper.deleteCustomer(params);
		//mainCustomerMapper.updateCustomer(params);
		List<PfMainCustomer> mainCustomer = mainCustomerMapper.getMainCustomerByCompanyId(companyId);
		
		logger.debug("主要客户："+mainCustomer);
	}
	
	/**
	 * 主要竞争对手CURD测试
	*CompetitorTest
	*void
	*@author mishengliang
	*2016-4-9上午11:02:35
	 */
	@Test
	public void CompetitorTest(){
		Integer competitorId = 6;
		String competitorName = "Shailene";
		Integer companyId = 6;
		Map<String, Object> params = new HashMap<String, Object>();
		
		params.put("competitorId", competitorId);
		params.put("competitorName", competitorName);
		params.put("companyId", companyId);
		
		//competitorMapper.addCompetitor(params);
		competitorMapper.deleteCompetitor(params);
		//competitorMapper.updateCompetitor(params);
		List<PfCompetitor> competitorList= competitorMapper.getCompetitorByCompanyId(companyId);
		
		logger.debug("主要竞争对手："+competitorList);
	}
	
	/**
	 * 设备CURD测试
	*deviceTest
	*void
	*@author mishengliang
	*2016-4-9下午1:24:07
	 */
	@Test
	public void deviceTest(){
		Integer deviceId = 6;//设备ID
		String deviceName = "Shailene";//设备名
		Integer companyId = 6;//公司ID
		String specifications = "2365*698";//规格
		String place = "台湾";//产地
		float price = (float) 2.33;//价格
		Date buyDay = new Date();//购买日期
		String advanced = "中上";//等级
		Integer deviceNum = 23;//设备编号
		Map<String, Object> params = new HashMap<String, Object>();
		
		params.put("deviceId", deviceId);
		params.put("deviceName", deviceName);
		params.put("companyId", companyId);
		params.put("specifications", specifications);
		params.put("place", place);
		params.put("price", price);
		params.put("buyDay", buyDay);
		params.put("advanced", advanced);
		params.put("deviceNum", deviceNum);
		
		//deviceMapper.addDevice(params);
		//deviceMapper.updateDeviceByDeviceId(params);
		deviceMapper.deleteDevice(params);
		List<PfDevice> deviceList = deviceMapper.getDeviceByCompanyId(companyId);
		
		logger.debug("设备名："+deviceList);
	}
	
	/**
	 * 银行账户CURD测试
	*bankAccountTest
	*void
	*@author mishengliang
	*2016-4-9下午3:35:07
	 */
	@Test
	public void bankAccountTest(){
		Integer accountId = 6;
		String accountName = "Shailene";
		Integer companyId = 6;
		Byte defaultId = 0;//默认使用账户，即经常使用的银行账户
		String accountCode = "321";
		Map<String, Object> params = new HashMap<String, Object>();
		
		params.put("accountId", accountId);
		params.put("accountName", accountName);
		params.put("companyId", companyId);
		params.put("defaultId", defaultId);
		params.put("accountCode", accountCode);
		
		bankAccountMapper.addBankAccount(params);
		bankAccountMapper.updateBankAccountByAccountId(params);
		bankAccountMapper.deleteBankAccount(params);
		List<PfBankAccount> bankAccountList = bankAccountMapper.getBankAccount(companyId);
		
		logger.debug("银行账户：" + bankAccountList);
	}
	
	/**
	 * 抬头发票CURD测试
	*invoiceTitleTest
	*void
	*@author mishengliang
	*2016-4-9下午4:15:13
	 */
	@Test
	public void invoiceTitleTest(){
		Integer invoiceTitleId = 6;
		String invoiceTitleName = "shailene";
		Integer companyId = 6;
		Byte defaultId = 0;
		Map<String, Object> params = new HashMap<String, Object>();
		
		params.put("invoiceTitleId", invoiceTitleId);
		params.put("invoiceTitleName", invoiceTitleName);
		params.put("companyId", companyId);
		params.put("defaultId", defaultId);
		
		//invoiceTitleMapper.addInvoiceTitle(params);
		//invoiceTitleMapper.updateInvoiceTitleByTitleId(params);
		invoiceTitleMapper.deleteInvoiceTitle(params);
		List<String> invoiceList= invoiceTitleMapper.getInvoiceTitleNames(companyId);
		
		logger.debug("抬头发票" + invoiceList);
	}
	
	/**
	 * 基础信息更新
	*updateSupplierTest
	*void
	*@author mishengliang
	*2016-4-14下午2:46:46
	 */
	@Test
	public void updateSupplierTest(){
		Map<String, Object> params = new HashMap<String, Object>();
		Integer companyId = 8;
		String cpynameEn = "Ruth Benedict";
		String cpynameCn = "中华大帝国";
		Integer classId = 1;
		String fPhone = "123564";
		Integer currencyId = 1;
		Integer emplyees = 2365;
		Integer collegeNum = 0;
		
		Integer diplomaNum = 0; 
		Integer diplomaDownDum = 23;
		
		params.put("cpynameEn", cpynameEn);
		params.put("cpynameCn", cpynameCn);
		params.put("companyId", companyId);
		params.put("classId", classId);
		params.put("fPhone", fPhone);
		params.put("currencyId", currencyId);
		params.put("emplyees", emplyees);
		params.put("collegeNum", collegeNum);
		
		params.put("diplomaNum", diplomaNum);
		params.put("diplomaDownDum", diplomaDownDum);
		
		supplierMapper.updateSupplierInfo(params);
	}
	
	/**
	 * 基础信息获取
	*getCompanyInfoByCompanyIdTest
	*void
	*@author mishengliang
	*2016-4-15下午2:33:27
	 */
	@Test
	public void getCompanyInfoByCompanyIdTest(){
		Integer companyId = 1;
		PfCompanySimpleInfo simpleInfo = supplierMapper.getCompanyBaseInfo(companyId);
		logger.debug(simpleInfo);
	}
	
	/**
	 * 根据公司ID获取企业信息表中的申请状态
	*getApplyStsByCompanyIdTest
	*void
	*@author mishengliang
	*2016-5-19上午10:23:13
	 */
	@Test
	public void getApplyStsByCompanyIdTest(){
		Integer companyId = 10000;
		Integer applySts = service.getApplyStsByCompanyId(companyId);
		logger.debug("ApplySts:"+applySts);
	}
	
	/**
	 * 供应商变更信息保存或提交
	*saveAuthcationUpdateInfoTest
	*void
	*@author mishengliang
	*2016-5-24下午4:26:15
	 */
	@Test
	public void saveAuthcationUpdateInfoTest(){
		Integer saveOrSubmit = 1;// 0:保存 1：提交
		
		PfAuthcationUpdate authcationUpdate = new PfAuthcationUpdate();
		authcationUpdate.setCompany_id(10000);
		authcationUpdate.setClass_id("1");
		authcationUpdate.setNature_id("2");
		authcationUpdate.setKey_remark("五金铠甲02");
		authcationUpdate.setCpyname_cn("TopSun");
		authcationUpdate.setContact_addr_code(330105);
		authcationUpdate.setContact_addr("拱墅区金光大道");
		authcationUpdate.setIndustry_id(2);
		authcationUpdate.setF_phone("3698-5698742");
		authcationUpdate.setCorporation("Mr.Feng");
		authcationUpdate.setReg_fund(100.23);
		authcationUpdate.setCurrency_id(2);
		authcationUpdate.setEstablish_dt(new Date());
		authcationUpdate.setCompany_introduction("这是其中的第一次修改");
		
		//service.saveAuthcationUpdateInfo(authcationUpdate,saveOrSubmit);
	}
}


