/**    
 * 文件名：SupplierForPlateFormService.java    
 *    
 * 版本信息：    
 * 日期：2016-3-28    
 * Copyright 足下 Corporation 2016     
 * 版权所有    
 *    
 */
package platform.company.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import manager.sysmodule.service.SysRoleSerivce;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform.common.model.CurrencyForPlat;
import platform.common.model.PfRegisterAttched;
import platform.common.service.CurrencyForPlatService;

import platform.company.data.PfCompanyExtraInfoMapper;
import platform.company.data.PfCompanyMapper;
import platform.company.data.PfCompetitorMapper;
import platform.company.data.PfDeviceMapper;
import platform.company.data.PfGoodsMapper;
import platform.company.data.PfMainCustomerMapper;
import platform.company.data.PfMetarialMapper;
import platform.company.model.CompanyInfoVo;
import platform.company.model.PfBankAccount;
import platform.company.model.PfCompanyExtraInfo;
import platform.company.model.PfCompanySimpleInfo;
import platform.company.model.PfCompetitor;
import platform.company.model.PfDevice;
import platform.company.model.PfGoods;
import platform.company.model.PfInvoiceTitle;
import platform.company.model.PfMainCustomer;
import platform.company.model.PfMaterial;
import platform.supplierAccess.model.PfAuthcationInfo;
import platform.supplierAccess.model.PfAuthcationUpdate;
import platform.supplierAccess.model.PfSupplierAccessScoreSummary;
import platform.supplierAccess.model.PfUpdateRegisterAttched;
import platform.supplierAccess.service.PfAuthcationInfoService;
import platform.supplierAccess.service.PfAuthcationUpdateService;
import platform.supplierAccess.service.PfSupplierAccessScoreService;
import platform.supplierAccess.service.PfUpdateRegisterAttchedService;
import usercenter.company.model.CompanySimpleInfo;
import usercenter.company.service.CompanyService;
import usercenter.saleManage.model.AccessRecord;
import usercenter.saleManage.service.AccessRecordService;
import util.AppUtils;
import util.Const;
import util.DataTrans;
import util.SessionUtil;
import util.WebUtil;

import common.mongodb.service.FileOptService;
import common.user.model.LoginAccount;

/**    
 *     
 * 项目名称：outsideeasy    
 * 类名称：SupplierForPlateFormService    
 * 创建人：mishengliang
 * 创建时间：2016-3-28 下午3:53:45    
 * 修改人：mishengliang
 * 修改时间：2016-3-28 下午3:53:45    
 * 修改备注：    
 * @version     
 *     
 */
@Service
public class CompanyForPlateFormService {
	@Autowired
	private CompanyService supplierService;
	@Autowired
	private PfAuthcationInfoService pfAuthcationInfoService;
	@Autowired
	private PfAuthcationUpdateService pfAuthcationUpdateService;
	@Autowired
	private PfCompanyMapper mapper;
	@Autowired
	private PfCompanyExtraInfoMapper extraMapper;
	@Autowired
	private PfDeviceMapper deviceMapper;
	@Autowired
	private PfDeviceService deviceService;
	@Autowired
	private PfGoodsMapper goodsMapper;
	@Autowired
	private PfGoodsService goodsService;
	@Autowired
	private PfMetarialMapper metarialMapper;
	@Autowired
	private PfMetarialService metarialService;
	@Autowired
	private PfMainCustomerMapper customerMapper;
	@Autowired
	private PfCompetitorMapper competitorMapper;
	@Autowired
	private PfSupplierAccessScoreService pfSupplierAccessScoreService;
	@Autowired
	private PfUpdateRegisterAttchedService pfUpdateRegisterAttchedService;
	@Autowired
	private CurrencyForPlatService curService;
	@Autowired
	private AccessRecordService recordService;
	@Autowired
	private SysRoleSerivce sysRoleService;
	@Autowired
	private FileOptService fileService;
	/**
	 * 查询企业信息的简略信息
	*getSuppliersSimpleInfo
	*@param params 查询企业信息所需参数封装
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-3-28下午4:32:16
	*TODO 返回类型需要优化修改，将CompanySimpleInfo换为PfCompanySimpleInfo类型，将其与usercenter分离
	 */
	public List<CompanySimpleInfo> getSuppliersSimpleInfo(Map<String, Object> params){
		Integer accountRole;//账号的主账号角色ID
		Integer mainAccountId;//主账号ID
		Map<String, Object> paramsForAccess = new HashMap<String, Object>();
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		Integer accountType = loginAccount.getAccount_type();
		if(accountType == 0){//主账号
			accountRole = loginAccount.getRole_id();
			mainAccountId = loginAccount.getLogin_id();
		}else{//子账号
			Integer mainAcountId = loginAccount.getParent_id();
			Map<String, Object> paramsForRole = new HashMap<String, Object>();
			paramsForRole.put("accountId", mainAcountId);
			accountRole = sysRoleService.getMainAccountRole(paramsForRole);//获取子账号对应主账号的角色ID
			mainAccountId = loginAccount.getParent_id();
		}
		
		params.put("accountRole", accountRole);
		params.put("mainAccountId", mainAccountId);
		List<CompanySimpleInfo> companyInfoList= supplierService.getSupplierListByaddrOrclass(params);//调用usercenter接口
		
		Integer accountId;
		if(loginAccount.getAccount_type() == 0){
			accountId = loginAccount.getLogin_id();
		}else{
			accountId = loginAccount.getParent_id();
		}
		for(int i = 0; i < companyInfoList.size(); i++){//资质评分
			params.put("companyId", companyInfoList.get(i).getCompany_id());
			params.put("accountId", accountId);
			Integer isSupplier = mapper.getIsSupplier(params);
			companyInfoList.get(i).setIsSupplier(isSupplier);
			
			Double scoreRealSum = 0.0;//总得分
			Double socreMaxSum = 0.0;//总分
			Double accessScore = 0.0;
			paramsForAccess.put("company_id",companyInfoList.get(i).getCompany_id());
			List<PfSupplierAccessScoreSummary> scoreSummaryList = pfSupplierAccessScoreService.getPfSupplierAccessScoreSummaryList(paramsForAccess);
			for(int j = 0;j < scoreSummaryList.size(); j++){
				scoreRealSum += scoreSummaryList.get(j).getRealmum();
				socreMaxSum += scoreSummaryList.get(j).getMaxmum();
			}
			accessScore = scoreRealSum/socreMaxSum;
			companyInfoList.get(i).setAccessScore(accessScore);
		}
		return companyInfoList;
	}
	
	/**
	 * 符合查询条件的结果数
	*getSupplierTotalNum
	*@param params
	*@return
	*Integer
	*@author mishengliang
	*2016-3-28下午8:17:14
	 */
	public Integer getSupplierTotalNum(Map<String, Object> params){
		Integer accountRole;//账号的主账号角色ID
		Integer mainAccountId;//主账号ID
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		Integer accountType = loginAccount.getAccount_type();
		if(accountType == 0){//主账号
			accountRole = loginAccount.getRole_id();
			mainAccountId = loginAccount.getLogin_id();
		}else{//子账号
			Integer mainAcountId = loginAccount.getParent_id();
			Map<String, Object> paramsForRole = new HashMap<String, Object>();
			paramsForRole.put("accountId", mainAcountId);
			accountRole = sysRoleService.getMainAccountRole(paramsForRole);//获取子账号对应主账号的角色ID
			mainAccountId = loginAccount.getParent_id();
		}
		
		String addrString = (String) params.get("addr");
		String key1 = (String) params.get("key1");
		String key2 = (String) params.get("key2");
		String key3 = (String) params.get("key3");
		String usePaging = (String)params.get("usePaging");
		String pageSize = (String) params.get("pageSize");
		String start = (String) params.get("start");
		
		//调用的usercenter的接口
		Integer total = supplierService.getTotalNum(addrString,key1,accountRole,mainAccountId);
		return total;
	}
	
	/**
	 * 通过companyId获取公司的详细信息 企业登录后查看
	*getCompanyInfoByCompanyId
	*@param companyId
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-3-29下午1:09:33
	 */
	public Map<String, Object> getCompanyInfoByCompanyId(Integer companyId){
		Map<String, Object> companyInfoMap = new HashMap<String, Object>();
		Map<String, Object> authcationParams = new HashMap<String, Object>();
		PfAuthcationInfo authInfo = new PfAuthcationInfo();
		
		String tradeClass = mapper.getTradeClassByCompanyId(companyId);//获取行业信息；行业只有一种，所以使用String
		List<String> saleItem = extraMapper.getSaleItemByCompanyId(companyId);//销售商品集
		List<String> buyItem = extraMapper.getBuyItemByCompanyId(companyId);//购买商品集
		PfCompanySimpleInfo companyBaseInfo = mapper.getCompanyBaseInfo(companyId);//基础信息
		PfCompanyExtraInfo companyExtraInfo = mapper.getCompanyExtraInfo(companyId);//附加信息 无发票抬头和银行账户信息
		
		List<PfDevice> deviceList = deviceMapper.getDeviceByCompanyId(companyId);//设备名称
		List<PfGoods> goodsList = goodsMapper.getSaleModelByCompanyId(companyId);//销售产品
		List<PfMaterial> metarialList = metarialMapper.getBuyModelByCompanyId(companyId);//购买原材料
		List<PfMainCustomer> customerList = customerMapper.getMainCustomerByCompanyId(companyId);//主要客户
		List<PfCompetitor> competitorList = competitorMapper.getCompetitorByCompanyId(companyId);//主要竞争对手
		
		if(companyBaseInfo.getReg_phone() != null){//隐藏部分电话号信息
			companyBaseInfo.setReg_phone(AppUtils.hidePhoneNum(companyBaseInfo.getReg_phone()));
		}
		if (companyExtraInfo == null) {//固定的附加信息不为空
			companyExtraInfo = new PfCompanyExtraInfo();
		}
		List<PfBankAccount> bankAccount = extraMapper.getBankAccount(companyId);//获取银行账户
		List<PfInvoiceTitle> invoiceTitles = extraMapper.getInvoiceTitleNames(companyId);//获取发票抬头
		companyExtraInfo.setBankAccount(bankAccount);
		companyExtraInfo.setInvoiceTitles(invoiceTitles);
		
		if(companyBaseInfo.getApply_sts() == 20 && companyId != null){//未通过 将不通过原因加入额外信息中
			authcationParams.put("companyId", companyId);
			authcationParams.put("state", 1);
			authInfo = pfAuthcationInfoService.getPfAuthcationInfoByCompanyId(authcationParams);
		}
		if (authInfo!=null) {
			companyExtraInfo.setAuth_opinion(authInfo.getAuth_opinion());
		}
		
		//认证评估 待添加
		companyInfoMap.put("tradeClass", tradeClass);
		companyInfoMap.put("saleItem", saleItem);
		companyInfoMap.put("buyItem", buyItem);
		companyInfoMap.put("companyBaseInfo", companyBaseInfo);
		companyInfoMap.put("compnayExtraInfo", companyExtraInfo);
		companyInfoMap.put("deviceList", deviceList);
		companyInfoMap.put("goodsList", goodsList);
		companyInfoMap.put("metarialList", metarialList);
		companyInfoMap.put("customerList", customerList);
		companyInfoMap.put("competitorList", competitorList);
		
		return companyInfoMap;
	}

	public Map<String, Object> getTradeInfo(Integer companyId){
		Map<String, Object> companyInfoMap = new HashMap<String, Object>();
		PfCompanyExtraInfo companyExtraInfo = mapper.getCompanyExtraInfo(companyId);//附加信息 无发票抬头和银行账户信息
		if(companyExtraInfo == null){
			companyExtraInfo = new PfCompanyExtraInfo();
		}
		List<PfBankAccount> bankAccount = extraMapper.getBankAccount(companyId);//获取银行账户
		List<PfInvoiceTitle> invoiceTitles = extraMapper.getInvoiceTitleNames(companyId);//获取发票抬头
		companyExtraInfo.setBankAccount(bankAccount);
		companyExtraInfo.setInvoiceTitles(invoiceTitles);
		companyInfoMap.put("compnayExtraInfo", companyExtraInfo);
		return companyInfoMap;
	}
	public Map<String, Object> getProdectInfo(Integer companyId){
		Map<String, Object> companyInfoMap = new HashMap<String, Object>();
		List<PfGoods> goodsList = goodsMapper.getSaleModelByCompanyId(companyId);//销售产品
		List<PfMaterial> metarialList = metarialMapper.getBuyModelByCompanyId(companyId);//购买原材料
		List<PfMainCustomer> customerList = customerMapper.getMainCustomerByCompanyId(companyId);//主要客户
		List<PfCompetitor> competitorList = competitorMapper.getCompetitorByCompanyId(companyId);//主要竞争对手
		companyInfoMap.put("goodsList", goodsList);
		companyInfoMap.put("metarialList", metarialList);
		companyInfoMap.put("customerList", customerList);
		companyInfoMap.put("competitorList", competitorList);
		return companyInfoMap;
	}
	public Map<String, Object> getDeviceInfo(Integer companyId){
		Map<String, Object> companyInfoMap = new HashMap<String, Object>();
		List<PfDevice> deviceList = deviceMapper.getDeviceByCompanyId(companyId);//设备名称
		companyInfoMap.put("deviceList", deviceList);
		return companyInfoMap;
	}
	
	/**
	 * CompanyForPlateFormService
	 * getCompanySimpleInfo
	 * @param companyId
	 * @return PfCompanySimpleInfo
	 * @author mishengliang
	 * 2016-10-28 下午3:29:08
	 */
	public PfCompanySimpleInfo getCompanySimpleInfo(Integer companyId){
		return mapper.getCompanyBaseInfo(companyId);//基础信息
	}
	
	/**
	 * 通过companyId获取公司的详细信息,转为搜索使用，因其数据冗余太多，所以重新使用另一个方法
	 *getCompanyInfoByCompanyIdForSearcher
	 *@param companyId
	 *@return
	 *Map<String,Object>
	 *@author mishengliang
	 *2016-3-29下午1:09:33
	 */
	public Map<String, Object> getCompanyInfoByCompanyIdForSearcher(String companyId){
		Map<String, Object> params = new HashMap<String, Object>();
		Map<String, Object> companyInfoMap = new HashMap<String, Object>();
		Integer companyIdNum = Integer.parseInt(companyId);
		
		PfCompanyExtraInfo companyExtraInfo = mapper.getCompanyExtraInfo(companyIdNum);//附加信息 无发票抬头和银行账户信息
		List<String> saleItem = extraMapper.getSaleItemByCompanyId(companyIdNum);//销售商品集
		List<String> buyItem = extraMapper.getBuyItemByCompanyId(companyIdNum);//购买商品集
		PfCompanySimpleInfo companyBaseInfo = mapper.getCompanyBaseInfo(companyIdNum);//基础信息
		
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();//获取当前账号信息
		Integer accountId;
		if(loginAccount.getAccount_type() == 0){
			accountId = loginAccount.getLogin_id();
		}else{
			accountId = loginAccount.getParent_id();
		}
		
		params.put("companyId", companyIdNum);
		params.put("accountId", accountId);
		Integer isSupplier = mapper.getIsSupplier(params);
		
		//认证评估
		params.put("company_id",companyIdNum);
		List<PfSupplierAccessScoreSummary> scoreSummaryList = pfSupplierAccessScoreService.getPfSupplierAccessScoreSummaryList(params);
		
		companyInfoMap.put("saleItem", saleItem);
		companyInfoMap.put("buyItem", buyItem);
		companyInfoMap.put("companyBaseInfo", companyBaseInfo);
		companyInfoMap.put("compnayExtraInfo", companyExtraInfo);
		companyInfoMap.put("scoreSummaryList",scoreSummaryList);
		companyInfoMap.put("isSupplier",isSupplier);
		
		return companyInfoMap;
	}
	
	/**
	 * 企业门户信息展示，在不登录状态和登录状态下查看的信息不同；故需要分两种状态返回不同的数据
	 * 未登录状态 ：公司基本信息
	 * 登录状态 ：公司基本信息+公司的交易信息
	*getCompanyInfoByCompanyIdForWindow
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-7-4下午2:09:59
	 */
	public Map<String, Object> getCompanyInfoByCompanyIdForWindow(Integer companyId,Integer companyIdForAll){
		Map<String, Object> resMap = WebUtil.getDefaultResponseMap();
		LoginAccount regAccount = SessionUtil.getCurrentPlateLoginAccount();
		if(regAccount == null){//未登录 没有入口
			//neededInfoForWindow(companyId, companyIdForAll, resMap);
		}else{//已登录
			neededInfoForWindow(companyId, companyIdForAll, resMap);
		}
		return resMap;
	}

	/**
	 * 门户网站必要的信息获取
	*neededInfoForWindow
	*@param companyId
	*@param resMap
	*void
	*@author mishengliang
	*2016-7-6下午2:07:40
	*/
	private void neededInfoForWindow(Integer companyId, Integer companyIdForAll, Map<String, Object> resMap) {
		Map<String, Object> params = new HashMap<String, Object>();
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();//获取当前账号信息
		Integer accountId;
		if(loginAccount.getAccount_type() == 0){
			accountId = loginAccount.getLogin_id();
		}else{
			accountId = loginAccount.getParent_id();
		}
		PfCompanySimpleInfo companyBaseInfo = mapper.getCompanyBaseInfo(companyId);//基础信息
		params.put("companyId", companyId);
		params.put("accountId", accountId);
		Integer isSupplier = mapper.getIsSupplier(params);
		companyBaseInfo.setIs_supplier(isSupplier);//设置是否为其供应商
		List<PfDevice> deviceList = deviceService.getDeviceByCompanyId(companyId);//设备名称
		List<PfGoods> goodsList = goodsService.getSaleModelByCompanyId(companyId);//销售产品
		List<PfMaterial> metarialList = metarialService.getBuyModelByCompanyId(companyId);//购买原材料
		List<PfMainCustomer> customerList = customerMapper.getMainCustomerByCompanyId(companyId);//主要客户
		List<PfCompetitor> competitorList = competitorMapper.getCompetitorByCompanyId(companyId);//主要竞争对手
		List<CurrencyForPlat> curList = curService.getCurrencyForPlatList(null);//获取全部的货币信息;存放在前台，避免多次请求
		
		Double scoreRealSum = 0.0;//总得分
		Double socreMaxSum = 0.0;//总分
		Float accessScore = (float)0.0;
		params.put("company_id", companyId);
		List<PfSupplierAccessScoreSummary> scoreSummaryList = pfSupplierAccessScoreService.getPfSupplierAccessScoreSummaryList(params);
		
		for(int j = 0;j < scoreSummaryList.size(); j++){
			scoreRealSum += scoreSummaryList.get(j).getRealmum();
			socreMaxSum += scoreSummaryList.get(j).getMaxmum();
		}
		
		accessScore = (float) (scoreRealSum/socreMaxSum);
		companyBaseInfo.setAccessScore(accessScore);
		resMap.put("companyBaseInfo", companyBaseInfo);
		resMap.put("scoreSummaryList", scoreSummaryList);
		resMap.put("goodsList", goodsList);
		resMap.put("metarialList", metarialList);
		resMap.put("deviceList", deviceList);
		resMap.put("customerList", customerList);
		resMap.put("competitorList", competitorList);
		resMap.put("curList", curList);
	}
	
	/**
	 *通过companyId更新公司信息
	*updateSupplierInfoByCompanyId
	*@param params
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-4-14下午3:12:03
	 */
	public void updateSupplierInfoByCompanyId(Map<String, Object> params){
		mapper.updateSupplierInfo(params);
	}
	
	/**
	 * @Description:新增公司信息
	 * CompanyForPlateFormService
	 * addSupplierInfo
	 * @param params void
	 * @author yukai
	 * 2016-8-4 上午9:05:25
	 */
	public void addSupplierInfo(Map<String, Object> params){
		mapper.addSupplierInfo(params);
	}
	
	/**
	 * 根据公司ID获取企业信息表中的申请状态
	*getApplyStsByCompanyId
	*@param companyId
	*void
	*@author mishengliang
	*2016-5-19上午10:18:27
	 */
	public Integer getApplyStsByCompanyId(Integer companyId){
		return mapper.getApplyStsByCompanyId(companyId);
	}
	
	/**
	 * 根据申请状态获取所有的供应商名称、id
	 * @author yangliping
	 * 2016年5月20日13:26:47
	 * */
	public List<PfCompanySimpleInfo> getSupplierNameList(Map<String, Object> params)
	{
		return mapper.getSupplierNameList(params);
	}
	/**
	 * @Description:根据公司名称查找公司
	 * CompanyForPlateFormService
	 * getSupplierByName
	 * @param params
	 * @return List<PfCompanySimpleInfo>
	 * @author yukai
	 * 2016-8-10 下午3:12:24
	 */
	public List<PfCompanySimpleInfo> getSupplierByName(Map<String, Object> params)
	{
		return mapper.getSupplierByName(params);
	}
	
	/**
	 * 获取企业变更信息
	*getLastAuthcationUpdateItem
	*@return
	*PfAuthcationUpdate
	*@author mishengliang
	*2016-5-23上午11:09:21
	 */
	public PfAuthcationUpdate getLastAuthcationUpdateItem(Map<String, Object> params){
		Map<String, Object> companyInfoMap = new HashMap<String, Object>();
		PfAuthcationUpdate lastAuthcationInfo = new PfAuthcationUpdate();
		
		PfAuthcationUpdate pfAuthcationUpdate = pfAuthcationUpdateService.getLastAuthcationUpdateItem(params);//获取更新表中的信息
		
		if(pfAuthcationUpdate != null && pfAuthcationUpdate.getCpyname_cn() != null){//存在数据
			lastAuthcationInfo = pfAuthcationUpdate;
		}else{//不存在数据  获取供应商中的表
			Integer companyId = Integer.parseInt(params.get("company_id").toString());
			Integer auth_update_id = 0;//不存在变更主表数据时，默认为0
			
			companyInfoMap = getCompanyInfoByCompanyId(companyId);
			PfCompanySimpleInfo companyBaseInfo = (PfCompanySimpleInfo) companyInfoMap.get("companyBaseInfo");//基础信息
			PfCompanyExtraInfo extraInfo = (PfCompanyExtraInfo) companyInfoMap.get("compnayExtraInfo");
			
			if(pfAuthcationUpdate != null){//如果不为空，取出id，数据为空时使用
				auth_update_id = pfAuthcationUpdate.getAuth_update_id();
			}
			
			//构造显示数据
			lastAuthcationInfo.setAuth_update_id(auth_update_id);
			lastAuthcationInfo.setClass_id(companyBaseInfo.getClass_id());
			lastAuthcationInfo.setNature_id(companyBaseInfo.getNature_id());
			lastAuthcationInfo.setCpyname_cn(companyBaseInfo.getCpyname_cn());
			lastAuthcationInfo.setContact_addr_code(DataTrans.transToIntegerFromString(companyBaseInfo.getContact_addr_code()));
			lastAuthcationInfo.setContact_addr(companyBaseInfo.getContact_addr());
			lastAuthcationInfo.setLng(companyBaseInfo.getLng());
			lastAuthcationInfo.setLat(companyBaseInfo.getLat());
			lastAuthcationInfo.setF_phone(companyBaseInfo.getF_phone());
			lastAuthcationInfo.setCorporation(companyBaseInfo.getCorporation());
			if (companyBaseInfo.getReg_fund()!=null) {
				lastAuthcationInfo.setReg_fund(companyBaseInfo.getReg_fund().doubleValue());
			}
			if (companyBaseInfo.getCurrency_id()!=null) {
				lastAuthcationInfo.setCurrency_id(DataTrans.transToIntegerFromString(companyBaseInfo.getCurrency_id()));
			}
			lastAuthcationInfo.setEstablish_dt(companyBaseInfo.getEstablish_dt());
			lastAuthcationInfo.setKey_remark(companyBaseInfo.getKey_remark());
			lastAuthcationInfo.setCompany_introduction(companyBaseInfo.getCompany_introduction());
			lastAuthcationInfo.setState(0);//状态设置为 0：保存   实际是无状态的
			if(extraInfo != null){//判断额外信息不为空
				if (extraInfo.getIndustry_id()!=null) {
					lastAuthcationInfo.setIndustry_id(extraInfo.getIndustry_id());
				}
			}
		}
		
		return lastAuthcationInfo;
	}
	
	/**
	 * 保存或者更新企业信息变更表中的信息
	*saveAuthcationUpdateInfo
	*@param authcationUpdate
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-5-24下午2:43:18
	 */
	@SuppressWarnings("unchecked")
	public Map<String, Object> saveAuthcationUpdateInfo(PfAuthcationUpdate authcationUpdate,Integer saveOrSubmit,String  attched,String  delUpdateFileIds){
		Map<String, Object> resMap = WebUtil.getDefaultResponseMap();
		Map<String, Object> params = new HashMap<String, Object>();
		
		Integer companyId = authcationUpdate.getCompany_id();
		params.put("company_id", companyId);
		
		try {
			PfAuthcationUpdate lastUpdateAuthcationInfo = pfAuthcationUpdateService.getLastAuthcationUpdateItem(params);
			
			if(saveOrSubmit == 0){//保存
				authcationUpdate.setState(0);
			}else{//提交
				authcationUpdate.setState(1);
			}
			
			if(lastUpdateAuthcationInfo == null || lastUpdateAuthcationInfo.getState()  == 2 || lastUpdateAuthcationInfo.getState()  == 3){//之前没有此公司的记录或者状态为通过和未通过，则插入此条新数据
				pfAuthcationUpdateService.addPfAuthcationUpdate(authcationUpdate);
			}else if(lastUpdateAuthcationInfo.getState()  == 0){//如果最近一条数据为保存状态，则更新数据
				authcationUpdate.setAuth_update_id(lastUpdateAuthcationInfo.getAuth_update_id());//设置更新记录的ID
				authcationUpdate.setCreated_dt(new Date());//更新添加时间
				pfAuthcationUpdateService.updatePfAuthcationUpdate(authcationUpdate);
			}
			if(attched != null){
			attched = "["+ attched +"]";
			JSONArray attchedArray = JSONArray.fromObject(attched);
			Map<String, Object> map = new HashMap<String, Object>();//新增的数据集合
			for(int i = 0; i<attchedArray.size(); i++){
				Map<String, Object> updateParams = new HashMap<String, Object>();//新增的数据集合
				
				JSONObject attchedJsonObject = attchedArray.getJSONObject(i);
				if("0".equals(attchedJsonObject.get("isUpdate").toString())||attchedJsonObject.get("isUpdate")==null){
					updateParams = attchedJsonObject;
					updateParams.put("auth_update_id", authcationUpdate.getAuth_update_id());
					pfUpdateRegisterAttchedService.updatePfUpdateRegisterAttched1(updateParams);
				}else {
					map.put("authUpdateId", authcationUpdate.getAuth_update_id());
					map.put("fileTypeId", attchedJsonObject.get("fileTypeId"));
					if(pfUpdateRegisterAttchedService.getPfUpdateRegisterAttchedList(map).size()>0){
						PfUpdateRegisterAttched attchedOld = pfUpdateRegisterAttchedService.getPfUpdateRegisterAttchedList(map).get(0);
						fileService.deleteFileByName(attchedOld.getObject_id());//删除原有的文件
						pfUpdateRegisterAttchedService.deletePfUpdateRegisterAttched(attchedOld);
					}
					updateParams = attchedJsonObject;
					updateParams.put("auth_update_id", authcationUpdate.getAuth_update_id());
					pfUpdateRegisterAttchedService.updatePfUpdateRegisterAttched1(updateParams);
				}
			}
			}
			Map<String , Object> map1=new HashMap<String, Object>();
			if (!"".equals(delUpdateFileIds) && delUpdateFileIds!=null) {
				String[] arrayfile_id=delUpdateFileIds.split(",");
				for(int i=0;i<arrayfile_id.length;i++){
					map1.put("id", arrayfile_id[i]);
					pfUpdateRegisterAttchedService.deletePfUpdateRegisterAttched1(map1);
				}
			}
/*			else if(lastUpdateAuthcationInfo.getState()  == 3){//如果最近一条记录为不通过，则上一条记录的企业证照要关联到新的记录中
				PfAuthcationUpdate lastUpdateAuthcationInfoForNew = pfAuthcationUpdateService.getLastAuthcationUpdateItem(params);//刚刚新插进去的记录
				Integer newId = lastUpdateAuthcationInfoForNew.getAuth_update_id();
				
				Map<String, Object> newParams = new HashMap<String, Object>();
				Map<String, Object> oldParams = new HashMap<String, Object>();
				newParams.put("authUpdateId", newId);
				oldParams.put("authUpdateId", lastUpdateAuthcationInfo.getAuth_update_id());
				List<PfUpdateRegisterAttched> oldList = pfUpdateRegisterAttchedService.getPfUpdateRegisterAttchedList(oldParams);//不通过记录中的附件集合
				for(int i = 0; i < oldList.size(); i++){//将旧记录的ID置空，将关联主键设置为新关联主键
					PfUpdateRegisterAttched obj = oldList.get(i);
					obj.setId(null);
					obj.setAuth_update_id(newId);
					pfUpdateRegisterAttchedService.addPfUpdateRegisterAttched(obj);
				}
			}*/
			
			resMap.put(Const.AJAX_SERVICE_SUCCESS, true);
			resMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
		} catch (Exception e) {
			resMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			resMap.put(Const.AJAX_SERVICE_MESSAGE, e.toString());
		}

		return resMap;
	}

	public List<CompanyInfoVo> getCompanyListByRegId(Map<String, Object> params) {
		Map<String, Object> params1=new HashMap<String, Object>();
		List<CompanyInfoVo> list= mapper.getCompanyListByRegId(params);
		for (CompanyInfoVo companyInfoVo : list) {
			params1.put("submit_id", companyInfoVo.getCompany_id());
			List<AccessRecord>records=recordService.getSubmitRecordBySubmitId(params1);
			if (records.size()>0) {
				companyInfoVo.setCanUpdate(false);
			}else {
				companyInfoVo.setCanUpdate(true);
			}
		}
		return list;
	}

	public PfCompanySimpleInfo getCompanyFromDictionary(
			Map<String, Object> params) {
		return mapper.getCompanyFromDictionary(params);
	}
	public String getCompanyNameByCompanyId(
			Map<String, Object> params) {
		return mapper.getCompanyNameByCompanyId(params);
	}
	public boolean checkCanUpdate(Map<String, Object> params) {
		Map<String, Object> params1=new HashMap<String, Object>();
		params1.put("submit_id", params.get("companyId"));
		List<AccessRecord>records=recordService.getSubmitRecordBySubmitId(params1);
		if (records.size()>0) {
			return false;
		}else {
			return true;
		}
	}
	public List<PfCompanySimpleInfo> getCompanyByName(Map<String, Object> params)
	{
		return mapper.getCompanyByName(params);
	}
}
