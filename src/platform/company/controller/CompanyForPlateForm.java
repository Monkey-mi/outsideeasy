/**    
 * 文件名：SupplierForPlateForm.java    
 *    
 * 版本信息：    
 * 日期：2016-3-28    
 * Copyright 足下 Corporation 2016     
 * 版权所有    
 *    
 */
package platform.company.controller;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import common.user.model.LoginAccount;
import common.user.model.RegAccout;
import common.user.model.RegAccoutCompanyInfo;
import common.user.service.RegAccoutCompanyInfoService;
import common.user.service.RegAccoutService;

import platform.company.model.CompanyInfoVo;
import platform.company.model.PfCompany;
import platform.company.model.PfCompanySimpleInfo;
import platform.company.service.PfAttchedService;
import platform.company.service.PfBankAccountService;
import platform.company.service.PfCompetitorService;
import platform.company.service.PfDeviceService;
import platform.company.service.PfGoodsService;
import platform.company.service.PfInvoiceTitleService;
import platform.company.service.PfMainCustomerService;
import platform.company.service.PfMetarialService;
import platform.company.service.CompanyForPlateFormService;
import platform.supplierAccess.model.PfAuthcationUpdate;
import usercenter.company.model.CompanySimpleInfo;
import usercenter.saleManage.model.AccessApplicationCategory;
import usercenter.saleManage.model.AccessRecord;
import usercenter.saleManage.service.AccessApplicationCategoryService;
import usercenter.saleManage.service.AccessRecordService;
import usercenter.saleManage.service.AccessTempletHeadService;
import util.Const;
import util.DataTrans;
import util.SessionUtil;
import util.WebUtil;
import util.annotation.DocLogger;

/**    
 *     
 * 项目名称：outsideeasy    
 * 类名称：SupplierForPlateForm    
 * 类描述：   平台通过搜索显示供应商信息 
 * 创建人：米升亮    
 * 创建时间：2016-3-28 下午2:55:28    
 * 修改人：米升亮
 * 修改时间：2016-3-28 下午2:55:28    
 * 修改备注：    
 * @version     
 *     
 */
@Controller
@RequestMapping("supplierForPlateForm")
public class CompanyForPlateForm {
	@Autowired
	private CompanyForPlateFormService supplierService;
	@Autowired
	private PfMainCustomerService coustomerService;
	@Autowired
	private PfCompetitorService competitorService;
	@Autowired
	private PfGoodsService goodsService;
	@Autowired
	private PfMetarialService materialSerivce;
	@Autowired
	private PfDeviceService deviceService;
	@Autowired
	private PfBankAccountService bankAccountService;
	@Autowired
	private PfInvoiceTitleService invoiceTilteService;
	@Autowired
	private RegAccoutService regAccoutService;
	@Autowired
	private PfAttchedService pfAttchedService;
	@Autowired
	private AccessTempletHeadService accessTempletHeadService;
	@Autowired
	private RegAccoutCompanyInfoService regAccoutCompanyInfoService;
	@Autowired
	private AccessRecordService accessRecordService;
	@Autowired
	private AccessApplicationCategoryService accessApplicationCategoryService;
	
	@RequestMapping(value = { "/companyWindow" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_companyWindow(ModelAndView modelAndView ){
		modelAndView.setViewName("/companyWindow/companyWindow");
		return modelAndView;
	}
	@RequestMapping(value = { "/registerInfo" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_register(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/accountManage/registerInfo");
		return modelAndView;
	}
	@RequestMapping(value = { "/vipApplyAccess" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_vipApplyAccess(ModelAndView modelAndView ){
		modelAndView.setViewName("/vip/usercenter/saleManage/accessManage/vipApplyAccess");
		return modelAndView;
	}
	@RequestMapping(value = { "/vipSearchCompany" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_vipSearchCompany(ModelAndView modelAndView ){
		modelAndView.setViewName("/vip/vipSearchCompany");
		return modelAndView;
	}
	
	/**
	 * @Description:跳转企业基本信息
	 * CompanyForPlateForm
	 * gojsp_baseInfo
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-13 下午4:08:44
	 */
	@RequestMapping(value = { "/baseInfo" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_baseInfo(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/companyManage/baseInfo");
		return modelAndView;
	}
	/**
	 * @Description:跳转企业详细信息
	 * CompanyForPlateForm
	 * gojsp_detailsInfo
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-13 下午4:09:47
	 */
	@RequestMapping(value = { "/detailsInfo" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_detailsInfo(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/companyManage/detailsInfo");
		return modelAndView;
	}
	/**
	 * @Description:跳转企业规模能力
	 * CompanyForPlateForm
	 * gojsp_scalepowerInfo
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-13 下午4:09:51
	 */
	@RequestMapping(value = { "/scalepowerInfo" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_scalepowerInfo(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/companyManage/scalepowerInfo");
		return modelAndView;
	}
	/**
	 * @Description:跳转入驻认证
	 * CompanyForPlateForm
	 * gojsp_certification
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-13 下午4:19:11
	 */
	@RequestMapping(value = { "/certification" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_certification(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/companyManage/certification");
		return modelAndView;
	}
	/**
	 * @Description:跳转入驻变更
	 * CompanyForPlateForm
	 * gojsp_updateCertification
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-13 下午4:19:14
	 */
	@RequestMapping(value = { "/updateCertification" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_updateCertification(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/companyManage/updateCertification");
		return modelAndView;
	}
	/**
	 * @Description:跳转企业交易资料
	 * CompanyForPlateForm
	 * gojsp_tradeInfo
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-13 下午4:34:19
	 */
	@RequestMapping(value = { "/tradeInfo" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_tradeInfo(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/tradeManage/tradeInfo");
		return modelAndView;
	}
	/**
	 * 通过条件查找公司结果
	*getSuppliersByMultiSearch
	*@param request
	*@param response
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-3-28下午5:27:22
	 */
	@RequestMapping(value="/getSuppliersByMultiSearch.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getSuppliersByMultiSearch(HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> resMap = WebUtil.getDefaultResponseMap();
		Map<String, Object> params = new HashMap<String, Object>();
		
		params.put("key1", request.getParameter("multi_search_key1"));
		params.put("key2", request.getParameter("multi_search_key2"));
		params.put("key3", request.getParameter("multi_search_key3"));
		params.put("usePaging", request.getParameter("usePaging"));
		params.put("limit", request.getParameter("limit"));
		params.put("start", request.getParameter("start"));
		params.put("addr", request.getParameter("areaCode"));
		
		try {
			Integer totalNum = supplierService.getSupplierTotalNum(params);
			List<CompanySimpleInfo> supplierInfoList = supplierService.getSuppliersSimpleInfo(params);
			resMap.put("success", true);
			resMap.put(Const.AJAX_DATA_ROOT, supplierInfoList);
			resMap.put(Const.AJAX_SERVICE_TOTAL, totalNum);
			resMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
		} catch (Exception e) {
			resMap.put("success", false);
			resMap.put(Const.AJAX_SERVICE_MESSAGE, e.toString());
		}
		
		return resMap;
	}
	
	/**
	 * @Description:通过companyId获取公司详细信息
	 * CompanyForPlateForm
	 * getCompanyInfoByCompanyId
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author yukai
	 * 2016-8-3 下午4:28:06
	 */
	@RequestMapping(value="/getCompanyInfoByCompanyId1.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getCompanyInfoByCompanyId1(HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> resMap = WebUtil.getDefaultResponseMap();
		Map<String, Object> companyInfoMap = new HashMap<String, Object>();
		Integer companyId = DataTrans.transToIntegerFromString(request.getParameter("companyId"));//公司ID
		String isVip = (String)request.getParameter("isVip");//是否VIP
		if(companyId!=null&&companyId!=0){
			try {
				companyInfoMap = supplierService.getCompanyInfoByCompanyId(companyId);
				if("isVip".equals(isVip)){//获取供应品类
					//获取指定流水表信息
					Map<String, Object> recordParams = new HashMap<String, Object>();
					recordParams.put("companyId", companyId);
					List<AccessRecord> recordList = accessRecordService.getAccessRecordList(recordParams);
					Integer recordId = recordList.size()>0 ? recordList.get(0).getRecord_id():null;
					if(recordId!=null){
						recordParams.put("record_id", recordId);
						List<AccessApplicationCategory> cateList = accessApplicationCategoryService.getAccessApplicationCategoryList(recordParams);
						companyInfoMap.put("cateList", cateList);//供应品类
						
						Map<String, Object> statueMap = accessRecordService.getStatusByRecordId(recordParams);
						companyInfoMap.put("statueMap", statueMap);//审核状态
					}
				}
				resMap.put(Const.AJAX_SERVICE_SUCCESS, true);
				resMap.put(Const.AJAX_DATA_ROOT, companyInfoMap);
				resMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
			} catch (Exception e) {
				resMap.put(Const.AJAX_SERVICE_SUCCESS, false);
				resMap.put(Const.AJAX_SERVICE_MESSAGE, "failed");
			}
		}else{
			resMap.put(Const.AJAX_SERVICE_SUCCESS, null);
		}
		return resMap;
	}
	
	@RequestMapping(value="/getStatueMap.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getStatueMap(HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> resMap = WebUtil.getDefaultResponseMap();
		Integer companyId = DataTrans.transToIntegerFromString(request.getParameter("companyId"));//公司ID
		//获取指定流水表信息
		Map<String, Object> recordParams = new HashMap<String, Object>();
		recordParams.put("companyId", companyId);
		List<AccessRecord> recordList = accessRecordService.getAccessRecordList(recordParams);
		Integer recordId = recordList.size()>0 ? recordList.get(0).getRecord_id():null;
		if(recordId!=null){
			recordParams.put("record_id", recordId);
			Map<String, Object> statueMap = accessRecordService.getStatusByRecordId(recordParams);
			resMap.put("statueMap", statueMap);//审核状态
		}else{
			resMap.put("statueMap", 0);//没有审核记录 默认为0
		}
		return resMap;
	}
	
	@RequestMapping(value="/getTradeInfo.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getTradeInfo(HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> resMap = WebUtil.getDefaultResponseMap();
		Map<String, Object> companyInfoMap = new HashMap<String, Object>();
		Integer companyId = DataTrans.transToIntegerFromString(request.getParameter("companyId"));//公司ID
		if(companyId!=null&&companyId!=0){
			try {
				companyInfoMap = supplierService.getTradeInfo(companyId);
				resMap.put(Const.AJAX_SERVICE_SUCCESS, true);
				resMap.put(Const.AJAX_DATA_ROOT, companyInfoMap);
				resMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
			} catch (Exception e) {
				resMap.put(Const.AJAX_SERVICE_SUCCESS, false);
				resMap.put(Const.AJAX_SERVICE_MESSAGE, "failed");
			}
		}else{
			resMap.put(Const.AJAX_SERVICE_SUCCESS, null);
		}
		return resMap;
	}
	@RequestMapping(value="/getProductInfo.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getProdectInfo(HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> resMap = WebUtil.getDefaultResponseMap();
		Map<String, Object> companyInfoMap = new HashMap<String, Object>();
		Integer companyId = DataTrans.transToIntegerFromString(request.getParameter("companyId"));//公司ID
		if(companyId!=null&&companyId!=0){
			try {
				companyInfoMap = supplierService.getProdectInfo(companyId);
				resMap.put(Const.AJAX_SERVICE_SUCCESS, true);
				resMap.put(Const.AJAX_DATA_ROOT, companyInfoMap);
				resMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
			} catch (Exception e) {
				resMap.put(Const.AJAX_SERVICE_SUCCESS, false);
				resMap.put(Const.AJAX_SERVICE_MESSAGE, "failed");
			}
		}else{
			resMap.put(Const.AJAX_SERVICE_SUCCESS, null);
		}
		return resMap;
	}
	@RequestMapping(value="/getDeviceInfo.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getDeviceInfo(HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> resMap = WebUtil.getDefaultResponseMap();
		Map<String, Object> companyInfoMap = new HashMap<String, Object>();
		Integer companyId = DataTrans.transToIntegerFromString(request.getParameter("companyId"));//公司ID
		if(companyId!=null&&companyId!=0){
			try {
				companyInfoMap = supplierService.getDeviceInfo(companyId);
				resMap.put(Const.AJAX_SERVICE_SUCCESS, true);
				resMap.put(Const.AJAX_DATA_ROOT, companyInfoMap);
				resMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
			} catch (Exception e) {
				resMap.put(Const.AJAX_SERVICE_SUCCESS, false);
				resMap.put(Const.AJAX_SERVICE_MESSAGE, "failed");
			}
		}else{
			resMap.put(Const.AJAX_SERVICE_SUCCESS, null);
		}
		return resMap;
	}
	
	/**
	 * 通过companyId获取公司的详细信息,转为搜索使用，因其数据冗余太多，所以重新使用另一个方法
	 *getCompanyInfoByCompanyIdForSearcher
	 *@param request
	 *@param response
	 *@return
	 *Map<String,Object>
	 *@author mishengliang
	 *2016-3-29下午1:21:06
	 */
	@RequestMapping(value="/getCompanyInfoByCompanyIdForSearcher.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getCompanyInfoByCompanyIdForSearcher(HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> resMap = WebUtil.getDefaultResponseMap();
		Map<String, Object> companyInfoMap = new HashMap<String, Object>();
		String companyId = request.getParameter("companyId");//公司ID
		
		try {
			companyInfoMap = supplierService.getCompanyInfoByCompanyIdForSearcher(companyId);
			resMap.put(Const.AJAX_SERVICE_SUCCESS, true);
			resMap.put(Const.AJAX_DATA_ROOT, companyInfoMap);
			resMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
		}catch (Exception e) {
			resMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			resMap.put(Const.AJAX_SERVICE_MESSAGE, "failed");
		}
		return resMap;
	}
	
	/**
	 * 企业门户信息展示，在不登录状态和登录状态下查看的信息不同；故需要分两种状态返回不同的数据
	 * 未登录状态 ：公司基本信息
	 * 登录状态 ：公司基本信息+公司的交易信息	*getCompanyInfoByCompanyIdForWindow
	*@param request
	*@param response
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-7-5上午9:45:34
	 */
	@RequestMapping(value="/getCompanyInfoByCompanyIdForWindow.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> getCompanyInfoByCompanyIdForWindow(HttpServletRequest request,HttpServletResponse response){
		Integer companyId = DataTrans.transToIntegerFromString(request.getParameter("companyId"));
		Integer companyIdForAll = DataTrans.transToIntegerFromString(request.getParameter("companyIdForAll"));
		Map<String, Object> resMap = supplierService.getCompanyInfoByCompanyIdForWindow(companyId,companyIdForAll);
		return resMap;
	}
	
	/**
	 * 通过公司ID更新信息
	*updateSupplierInfoByCompanyId
	*@param request
	*@param response
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-4-14下午3:32:55
	 */
	@DocLogger(explain="提交入驻审核")
	@RequestMapping(value="/updateSupplierInfoByCompanyId.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> updateSupplierInfoByCompanyId(HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> resMap = WebUtil.getDefaultResponseMap();
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		
		Map<String, Object> companyInfoMap = new HashMap<String, Object>();
		LoginAccount regAccount = SessionUtil.getCurrentPlateLoginAccount();
		Integer RegId = null;
		if(regAccount != null){
			RegId = regAccount.getLogin_id();
		}
		Integer companyId = DataTrans.transToIntegerFromString(request.getParameter("companyId"));
		Boolean isVip  = "isVip".equals((String)request.getParameter("isVip"));
		Integer receiveCompanyId = DataTrans.transToIntegerFromString(request.getParameter("receiveId"));
		//String isSubmit = request.getParameter("isSubmit");//vip保存操作为 提交触发，还是保存触发
		
		//详细信息中的基础信息字段
		String cpynameCn = request.getParameter("cpynameCn");//公司名
		String contactAddrCode = request.getParameter("contactAddrCode");//联系地址编码
		String contactAddr = request.getParameter("contactAddr");//联系地址
		String fPhone = request.getParameter("fPhone");//联系电话
		String contacts = request.getParameter("contacts");//联系人
		String mPhone = request.getParameter("mPhone");//联系手机
		String fax = request.getParameter("fax");//传真号
		String email = request.getParameter("email");//Email
		String companyIntroduction = request.getParameter("companyIntroduction");//企业简介
		
		//规模能力中的基础信息字段
		Integer emplyees = DataTrans.transToIntegerFromString(request.getParameter("emplyees"));//员工人数
		Integer techNum = DataTrans.transToIntegerFromString(request.getParameter("techNum"));//研发人员
		Integer opNum = DataTrans.transToIntegerFromString(request.getParameter("opNum"));//操作工
		Integer qcNum = DataTrans.transToIntegerFromString(request.getParameter("qcNum"));//检验人员
		Integer staffNum = DataTrans.transToIntegerFromString(request.getParameter("staffNum"));//间接员工
		Integer internalAuditorNum = DataTrans.transToIntegerFromString(request.getParameter("internalAuditorNum"));//内审人员
		Integer collegeNum = DataTrans.transToIntegerFromString(request.getParameter("collegeNum"));//本科及以上
		Integer diplomaNum = DataTrans.transToIntegerFromString(request.getParameter("diplomaNum"));//专科
		Integer diplomaDownNum = DataTrans.transToIntegerFromString(request.getParameter("diplomaDownNum"));//专科以下
		String certificationSystem = request.getParameter("certificationSystem");//管理体系认证
		Integer qualityControl = DataTrans.transToIntegerFromString(request.getParameter("qualityControl"));//质量控制
		Integer isOem = DataTrans.transToIntegerFromString(request.getParameter("isOem"));//OEM代工
		Float turnover = DataTrans.transToFloatFromString(request.getParameter("turnover"));//年营业额
		Integer turnoverCurrencyId = DataTrans.transToIntegerFromString(request.getParameter("turnoverCurrencyId"));//营业额币种
		Float importNum = DataTrans.transToFloatFromString(request.getParameter("importNum"));//年出口额
		Integer importCurrencyId = DataTrans.transToIntegerFromString(request.getParameter("importCurrencyId"));//出口额币种
		Float exportNum = DataTrans.transToFloatFromString(request.getParameter("exportNum"));//年进口额
		Integer exportCurrencyId = DataTrans.transToIntegerFromString(request.getParameter("exportCurrencyId"));//进口额币种
		Float companyArea = DataTrans.transToFloatFromString(request.getParameter("companyArea"));//企业面积
		Float factoryArea = DataTrans.transToFloatFromString(request.getParameter("factoryArea"));//厂房面积
		String factoryOwner = request.getParameter("factoryOwner");//产权
		String useBegintime = request.getParameter("useBegintime");//使用起始日期
		String useEndtime = request.getParameter("useEndtime");//使用结束日期
		String schoolCoop = request.getParameter("schoolCoop");//合作院校
		
		//注册认证
		String companyCorporate = request.getParameter("companyCorporate");//法人
		String companyEstablishDt = request.getParameter("companyEstablishDt");//成立日期
		String companyRegFund = request.getParameter("companyRegFund");//注册资本
		String companyMainBussiness = request.getParameter("companyMainBussiness");//主营业务
		String companyNature = request.getParameter("companyNature");//企业类型
		String companyClass = request.getParameter("companyClass");//所属行业
		Integer industryName = DataTrans.transToIntegerFromString(request.getParameter("industryName"));//企业类型
		String currency = request.getParameter("currency");//币种
		Float lng=DataTrans.transToFloatFromString(request.getParameter("lng"));//经度
		Float lat=DataTrans.transToFloatFromString(request.getParameter("lat"));//纬度
		qryParam.put("lng", lng);
		qryParam.put("lat", lat);
		
		//将基础字段塞进参数集合中
		companyInfoMap.put("companyId",companyId );
		companyInfoMap.put("cpynameCn",cpynameCn );
		companyInfoMap.put("contactAddrCode", contactAddrCode);
		companyInfoMap.put("contactAddr",contactAddr );
		companyInfoMap.put("fPhone",fPhone );
		companyInfoMap.put("contacts", contacts);
		companyInfoMap.put("mPhone",mPhone);
		companyInfoMap.put("fax", fax);
		companyInfoMap.put("email", email);
		companyInfoMap.put("companyIntroduction", companyIntroduction);
		
		companyInfoMap.put("emplyees",emplyees );
		companyInfoMap.put("techNum",techNum );
		companyInfoMap.put("opNum",opNum );
		companyInfoMap.put("qcNum",qcNum );
		companyInfoMap.put("staffNum",staffNum );
		companyInfoMap.put("internalAuditorNum", internalAuditorNum);
		companyInfoMap.put("collegeNum",collegeNum );
		companyInfoMap.put("diplomaNum", diplomaNum);
		companyInfoMap.put("diplomaDownNum",diplomaDownNum );
		companyInfoMap.put("certificationSystem",certificationSystem );
		companyInfoMap.put("qualityControl", qualityControl);
		companyInfoMap.put("isOem",isOem );
		companyInfoMap.put("turnover", turnover);
		companyInfoMap.put("turnoverCurrencyId",turnoverCurrencyId );
		companyInfoMap.put("importNum",importNum );
		companyInfoMap.put("importCurrencyId",importCurrencyId );
		companyInfoMap.put("exportNum",exportNum );
		companyInfoMap.put("exportCurrencyId", exportCurrencyId);
		companyInfoMap.put("companyArea",companyArea );
		companyInfoMap.put("factoryArea",factoryArea );
		companyInfoMap.put("factoryOwner",factoryOwner );
		companyInfoMap.put("useBegintime", useBegintime);
		companyInfoMap.put("useEndtime",useEndtime );
		companyInfoMap.put("schoolCoop", schoolCoop);
		companyInfoMap.put("operaterDt", new Date());
		
		String customer = request.getParameter("customer");//主要客户操作//格式为：A:a,B:b; A:a,B:b; A:a,B:b;...
		String competitor = request.getParameter("competitor");//竞争对手
		String goods = request.getParameter("goods");//产品
		String material = request.getParameter("material");//原材料
		String device = request.getParameter("device");//设备
		String bankAccount = request.getParameter("bankAccount");//银行账号
		String invoiceTilte = request.getParameter("invoiceTilte");//发票抬头
		String attched=request.getParameter("attched");//公司证照
		
		String applySts = request.getParameter("applySts");//申请状态
		
		//注册认证
		companyInfoMap.put("corporation", companyCorporate);
		companyInfoMap.put("establishDt", companyEstablishDt);
		companyInfoMap.put("regFund", companyRegFund);
		companyInfoMap.put("keyRemark", companyMainBussiness);
		companyInfoMap.put("natureId", companyNature);//企业类型
		companyInfoMap.put("classId", companyClass);//所属行业
		companyInfoMap.put("industryId", industryName);//经营模式
		companyInfoMap.put("currencyId", currency);//币种
		companyInfoMap.put("lng", lng);//经度
		companyInfoMap.put("lat", lat);//纬度
		
		companyInfoMap.put("applySts", applySts);//申请状态
		
		try {
			if(companyId!=null&&companyId!=0){
				supplierService.updateSupplierInfoByCompanyId(companyInfoMap);
			}else {
				supplierService.addSupplierInfo(companyInfoMap);
				companyId=DataTrans.transToIntegerFromString(companyInfoMap.get("company_id").toString());
				RegAccoutCompanyInfo regAccoutCompanyInfo=new RegAccoutCompanyInfo();
				regAccoutCompanyInfo.setCompany_id(companyId);
				regAccoutCompanyInfo.setReg_id(RegId);
				regAccoutService.addRegAccoutCompanyInfo(regAccoutCompanyInfo);
				resMap.put("companyId", companyId);
			}
			
			if(customer != null||competitor != null||goods != null||material != null){//详细信息页面
				coustomerService.addOrUpdateCustomerCluster(customer,companyId);//更新主要客户信息
				competitorService.addOrUpdateCompetitorCluster(competitor,companyId);//更新竞争对手信息
				goodsService.addOrUpdateGoodsCluster(goods,companyId);//更新商品信息
				materialSerivce.addOrUpdateMetarialCluster(material,companyId);//更新原材料
			}else if(device != null){//规模能力页面
				deviceService.addOrUpdateDeviceCluster(device,companyId);//更新设备清单
			}else if(bankAccount != null || invoiceTilte != null){//注册认证更新
				bankAccountService.addOrUpdateBankAccountCluster(bankAccount,companyId);
				invoiceTilteService.addOrUpdateInvoiceTilteCluster(invoiceTilte,companyId);
			}else {
				
			}
			
			pfAttchedService.addOrUpdateAttchedCluster(attched,companyId);
			
			//vip保存，先生成相应的流水表
			if(isVip){
				Integer recordId = null;
				//获取指定流水表信息
				Map<String, Object> recordParams = new HashMap<String, Object>();
				recordParams.put("companyId", companyId);
				List<AccessRecord> recordList = accessRecordService.getAccessRecordList(recordParams);
				
				if(recordList.size() == 0){//没有流水记录
					Integer HId = accessTempletHeadService.getHID(receiveCompanyId);//找到模板头
					Integer accepterRegId = regAccoutCompanyInfoService.getRegIdByCpId(receiveCompanyId);//获取接收公司的所属主账号
					
					Map<String, Object> params = new HashMap<String, Object>();
					params.put("submit_id", companyId);//已提交状态 保存
					params.put("receive_id", receiveCompanyId);//已提交状态 保存
					params.put("access_status", 1);//已提交状态 保存
					params.put("h_id", HId);//表头
					params.put("accepter_reg_id", accepterRegId);//主账号ID
					accessRecordService.addAccessRecord(params);
					recordId = Integer.parseInt(params.get("record_id").toString());
				}else{
					recordId = recordList.get(0).getRecord_id();
				}
				
				//供应品类保存
				if(request.getParameter("categoryList") != null && request.getParameter("categoryList") != ""){
					String[] cateList = ((String)request.getParameter("categoryList")).split(",");
					if(cateList.length != 0){
						Map<String, Object> recordParam = new HashMap<String, Object>();
						recordParam.put("record_id", recordId);
						accessApplicationCategoryService.deleteAccessApplicationCategoryByRecordId(recordParam);
						for(int i = 0; i<cateList.length; i++){
							recordParam.put("category_id", Integer.parseInt(cateList[i]));
							accessApplicationCategoryService.addAccessApplicationCategory(recordParam);
						}
					}
				}
			}
			
			resMap.put(Const.AJAX_SERVICE_SUCCESS, true);
			resMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
		} catch (Exception e) {
			resMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			resMap.put(Const.AJAX_SERVICE_MESSAGE, e.toString());
		}
		return resMap;
	} 
	@RequestMapping(value="/updateSupplierInfoByCompanyIdForVIP.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> updateSupplierInfoByCompanyIdForVIP(HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> resMap = WebUtil.getDefaultResponseMap();
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		
		Map<String, Object> companyInfoMap = new HashMap<String, Object>();
		LoginAccount regAccount = SessionUtil.getCurrentPlateLoginAccount();
		Integer RegId = null;
		if(regAccount != null){
			RegId = regAccount.getLogin_id();
		}
		Integer companyId = DataTrans.transToIntegerFromString(request.getParameter("companyId"));
		Boolean isVip  = "isVip".equals((String)request.getParameter("isVip"));
		Integer receiveCompanyId = DataTrans.transToIntegerFromString(request.getParameter("receiveId"));
		//String isSubmit = request.getParameter("isSubmit");//vip保存操作为 提交触发，还是保存触发
		
		//详细信息中的基础信息字段
		String cpynameCn = request.getParameter("cpynameCn");//公司名
		String contactAddrCode = request.getParameter("contactAddrCode");//联系地址编码
		String contactAddr = request.getParameter("contactAddr");//联系地址
		String fPhone = request.getParameter("fPhone");//联系电话
		String contacts = request.getParameter("contacts");//联系人
		String mPhone = request.getParameter("mPhone");//联系手机
		String fax = request.getParameter("fax");//传真号
		String email = request.getParameter("email");//Email
		String companyIntroduction = request.getParameter("companyIntroduction");//企业简介
		
		//规模能力中的基础信息字段
		Integer emplyees = DataTrans.transToIntegerFromString(request.getParameter("emplyees"));//员工人数
		Integer techNum = DataTrans.transToIntegerFromString(request.getParameter("techNum"));//研发人员
		Integer opNum = DataTrans.transToIntegerFromString(request.getParameter("opNum"));//操作工
		Integer qcNum = DataTrans.transToIntegerFromString(request.getParameter("qcNum"));//检验人员
		Integer staffNum = DataTrans.transToIntegerFromString(request.getParameter("staffNum"));//间接员工
		Integer internalAuditorNum = DataTrans.transToIntegerFromString(request.getParameter("internalAuditorNum"));//内审人员
		Integer collegeNum = DataTrans.transToIntegerFromString(request.getParameter("collegeNum"));//本科及以上
		Integer diplomaNum = DataTrans.transToIntegerFromString(request.getParameter("diplomaNum"));//专科
		Integer diplomaDownNum = DataTrans.transToIntegerFromString(request.getParameter("diplomaDownNum"));//专科以下
		String certificationSystem = request.getParameter("certificationSystem");//管理体系认证
		Integer qualityControl = DataTrans.transToIntegerFromString(request.getParameter("qualityControl"));//质量控制
		Integer isOem = DataTrans.transToIntegerFromString(request.getParameter("isOem"));//OEM代工
		Float turnover = DataTrans.transToFloatFromString(request.getParameter("turnover"));//年营业额
		Integer turnoverCurrencyId = DataTrans.transToIntegerFromString(request.getParameter("turnoverCurrencyId"));//营业额币种
		Float importNum = DataTrans.transToFloatFromString(request.getParameter("importNum"));//年出口额
		Integer importCurrencyId = DataTrans.transToIntegerFromString(request.getParameter("importCurrencyId"));//出口额币种
		Float exportNum = DataTrans.transToFloatFromString(request.getParameter("exportNum"));//年进口额
		Integer exportCurrencyId = DataTrans.transToIntegerFromString(request.getParameter("exportCurrencyId"));//进口额币种
		Float companyArea = DataTrans.transToFloatFromString(request.getParameter("companyArea"));//企业面积
		Float factoryArea = DataTrans.transToFloatFromString(request.getParameter("factoryArea"));//厂房面积
		String factoryOwner = request.getParameter("factoryOwner");//产权
		String useBegintime = request.getParameter("useBegintime");//使用起始日期
		String useEndtime = request.getParameter("useEndtime");//使用结束日期
		String schoolCoop = request.getParameter("schoolCoop");//合作院校
		
		//注册认证
		String companyCorporate = request.getParameter("companyCorporate");//法人
		String companyEstablishDt = request.getParameter("companyEstablishDt");//成立日期
		String companyRegFund = request.getParameter("companyRegFund");//注册资本
		String companyMainBussiness = request.getParameter("companyMainBussiness");//主营业务
		String companyNature = request.getParameter("companyNature");//企业类型
		String companyClass = request.getParameter("companyClass");//所属行业
		Integer industryName = DataTrans.transToIntegerFromString(request.getParameter("industryName"));//企业类型
		String currency = request.getParameter("currency");//币种
		Float lng=DataTrans.transToFloatFromString(request.getParameter("lng"));//经度
		Float lat=DataTrans.transToFloatFromString(request.getParameter("lat"));//纬度
		qryParam.put("lng", lng);
		qryParam.put("lat", lat);
		
		//将基础字段塞进参数集合中
		companyInfoMap.put("companyId",companyId );
		companyInfoMap.put("cpynameCn",cpynameCn );
		companyInfoMap.put("contactAddrCode", contactAddrCode);
		companyInfoMap.put("contactAddr",contactAddr );
		companyInfoMap.put("fPhone",fPhone );
		companyInfoMap.put("contacts", contacts);
		companyInfoMap.put("mPhone",mPhone);
		companyInfoMap.put("fax", fax);
		companyInfoMap.put("email", email);
		companyInfoMap.put("companyIntroduction", companyIntroduction);
		
		companyInfoMap.put("emplyees",emplyees );
		companyInfoMap.put("techNum",techNum );
		companyInfoMap.put("opNum",opNum );
		companyInfoMap.put("qcNum",qcNum );
		companyInfoMap.put("staffNum",staffNum );
		companyInfoMap.put("internalAuditorNum", internalAuditorNum);
		companyInfoMap.put("collegeNum",collegeNum );
		companyInfoMap.put("diplomaNum", diplomaNum);
		companyInfoMap.put("diplomaDownNum",diplomaDownNum );
		companyInfoMap.put("certificationSystem",certificationSystem );
		companyInfoMap.put("qualityControl", qualityControl);
		companyInfoMap.put("isOem",isOem );
		companyInfoMap.put("turnover", turnover);
		companyInfoMap.put("turnoverCurrencyId",turnoverCurrencyId );
		companyInfoMap.put("importNum",importNum );
		companyInfoMap.put("importCurrencyId",importCurrencyId );
		companyInfoMap.put("exportNum",exportNum );
		companyInfoMap.put("exportCurrencyId", exportCurrencyId);
		companyInfoMap.put("companyArea",companyArea );
		companyInfoMap.put("factoryArea",factoryArea );
		companyInfoMap.put("factoryOwner",factoryOwner );
		companyInfoMap.put("useBegintime", useBegintime);
		companyInfoMap.put("useEndtime",useEndtime );
		companyInfoMap.put("schoolCoop", schoolCoop);
		companyInfoMap.put("operaterDt", new Date());
		
		String customer = request.getParameter("customer");//主要客户操作//格式为：A:a,B:b; A:a,B:b; A:a,B:b;...
		String competitor = request.getParameter("competitor");//竞争对手
		String goods = request.getParameter("goods");//产品
		String material = request.getParameter("material");//原材料
		String device = request.getParameter("device");//设备
		String bankAccount = request.getParameter("bankAccount");//银行账号
		String invoiceTilte = request.getParameter("invoiceTilte");//发票抬头
		String attched=request.getParameter("attched");//公司证照
		
		String applySts = request.getParameter("applySts");//申请状态
		
		//注册认证
		companyInfoMap.put("corporation", companyCorporate);
		companyInfoMap.put("establishDt", companyEstablishDt);
		companyInfoMap.put("regFund", companyRegFund);
		companyInfoMap.put("keyRemark", companyMainBussiness);
		companyInfoMap.put("natureId", companyNature);//企业类型
		companyInfoMap.put("classId", companyClass);//所属行业
		companyInfoMap.put("industryId", industryName);//经营模式
		companyInfoMap.put("currencyId", currency);//币种
		companyInfoMap.put("lng", lng);//经度
		companyInfoMap.put("lat", lat);//纬度
		
		companyInfoMap.put("applySts", applySts);//申请状态
		
		try {
			if(companyId!=null&&companyId!=0){
				supplierService.updateSupplierInfoByCompanyId(companyInfoMap);
			}else {
				supplierService.addSupplierInfo(companyInfoMap);
				companyId=DataTrans.transToIntegerFromString(companyInfoMap.get("company_id").toString());
				RegAccoutCompanyInfo regAccoutCompanyInfo=new RegAccoutCompanyInfo();
				regAccoutCompanyInfo.setCompany_id(companyId);
				regAccoutCompanyInfo.setReg_id(RegId);
				regAccoutService.addRegAccoutCompanyInfo(regAccoutCompanyInfo);
				resMap.put("companyId", companyId);
			}
			
			if(customer != null||competitor != null||goods != null||material != null){//详细信息页面
				coustomerService.addOrUpdateCustomerCluster(customer,companyId);//更新主要客户信息
				competitorService.addOrUpdateCompetitorCluster(competitor,companyId);//更新竞争对手信息
				goodsService.addOrUpdateGoodsCluster(goods,companyId);//更新商品信息
				materialSerivce.addOrUpdateMetarialCluster(material,companyId);//更新原材料
			}else if(device != null){//规模能力页面
				deviceService.addOrUpdateDeviceCluster(device,companyId);//更新设备清单
			}else if(bankAccount != null || invoiceTilte != null){//注册认证更新
				bankAccountService.addOrUpdateBankAccountCluster(bankAccount,companyId);
				invoiceTilteService.addOrUpdateInvoiceTilteCluster(invoiceTilte,companyId);
			}else {
				
			}
			
			pfAttchedService.addOrUpdateAttchedCluster(attched,companyId);
			
			//vip保存，先生成相应的流水表
			if(isVip){
				Integer recordId = null;
				//获取指定流水表信息
				Map<String, Object> recordParams = new HashMap<String, Object>();
				recordParams.put("companyId", companyId);
				List<AccessRecord> recordList = accessRecordService.getAccessRecordList(recordParams);
				
				if(recordList.size() == 0){//没有流水记录
					Integer HId = accessTempletHeadService.getHID(receiveCompanyId);//找到模板头
					Integer accepterRegId = regAccoutCompanyInfoService.getRegIdByCpId(receiveCompanyId);//获取接收公司的所属主账号
					
					Map<String, Object> params = new HashMap<String, Object>();
					params.put("submit_id", companyId);//已提交状态 保存
					params.put("receive_id", receiveCompanyId);//已提交状态 保存
					params.put("access_status", 1);//已提交状态 保存
					params.put("h_id", HId);//表头
					params.put("accepter_reg_id", accepterRegId);//主账号ID
					params.put("object_type", 1);//vip提交类型
					accessRecordService.addAccessRecord(params);
					recordId = Integer.parseInt(params.get("record_id").toString());
				}else{
					recordId = recordList.get(0).getRecord_id();
				}
				
				//供应品类保存
				if(request.getParameter("categoryList") != null && request.getParameter("categoryList") != ""){
					String[] cateList = ((String)request.getParameter("categoryList")).split(",");
					if(cateList.length != 0){
						Map<String, Object> recordParam = new HashMap<String, Object>();
						recordParam.put("record_id", recordId);
						accessApplicationCategoryService.deleteAccessApplicationCategoryByRecordId(recordParam);
						for(int i = 0; i<cateList.length; i++){
							recordParam.put("category_id", Integer.parseInt(cateList[i]));
							accessApplicationCategoryService.addAccessApplicationCategory(recordParam);
						}
					}
				}
			}
			
			resMap.put(Const.AJAX_SERVICE_SUCCESS, true);
			resMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
		} catch (Exception e) {
			resMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			resMap.put(Const.AJAX_SERVICE_MESSAGE, e.toString());
		}
		return resMap;
	} 
	
	/**
	 * 根据公司Id获取企业信息表中的申请状态 
	*getApplyStsByCompanyId
	*@param request
	*@param response
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-5-19上午10:30:37
	 */
	@RequestMapping(value="/getApplyStsByCompanyId.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getApplyStsByCompanyId(HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> resMap = WebUtil.getDefaultResponseMap();
		
		Integer companyId = DataTrans.transToIntegerFromString(request.getParameter("companyId"));//公司ID
		
		Integer applySts = supplierService.getApplyStsByCompanyId(companyId);
		
		resMap.put("applySts", applySts);
		resMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		resMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
		return resMap;
	}
	
	/**
	 * 根据申请状态获取所有的供应商名称、id
	 * @author yangliping
	 * 2016年5月20日13:26:47
	 * */
	@RequestMapping(value="/getSupplierNameList.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getSupplierNameList(HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> resMap = WebUtil.getDefaultResponseMap();
		Map<String, Object> reqMap=WebUtil.getDefaultParamsMap(request);
		List<PfCompanySimpleInfo> companyList = new ArrayList<PfCompanySimpleInfo>();
		
		try {
			companyList = supplierService.getSupplierNameList(reqMap);
			resMap.put(Const.AJAX_SERVICE_SUCCESS, true);
			resMap.put(Const.AJAX_DATA_ROOT, companyList);
			resMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
		} catch (Exception e) {
			
			resMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			resMap.put(Const.AJAX_SERVICE_MESSAGE, "failed");
		}
		return resMap;
	}
	
	/***
	 * 
	*getLastAuthcationUpdateItem
	*@param request
	*@param response
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-5-23下午3:03:59
	 */
	@RequestMapping(value="/getLastAuthcationUpdateItem.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object>  getLastAuthcationUpdateItem(HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> resMap = WebUtil.getDefaultResponseMap();
		Map<String, Object> reqMap=WebUtil.getDefaultParamsMap(request);
		try {
			PfAuthcationUpdate updateInfo = supplierService.getLastAuthcationUpdateItem(reqMap);
			
			resMap.put(Const.AJAX_SERVICE_SUCCESS, true);
			resMap.put(Const.AJAX_DATA_ROOT, updateInfo);
			resMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
		} catch (Exception e) {
			resMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			resMap.put(Const.AJAX_SERVICE_MESSAGE, "failed");
		}
		
		return resMap;
	}
	
	/**
	 * 保存企业变更信息
	*saveAuthcationUpdateInfo
	*@param request
	*@param response
	*@return
	*@throws Exception
	*Map<String,Object>
	*@author mishengliang
	*2016-5-25上午8:56:11
	 */
	@RequestMapping(value="/saveAuthcationUpdateInfo.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> saveAuthcationUpdateInfo(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String, Object> resMap = new HashMap<String, Object>();
		Integer saveOrSubmit = DataTrans.transToIntegerFromString(request.getParameter("saveOrSubmit"));//保存或提交标识符 0：保存  1：提交
		Float lng=DataTrans.transToFloatFromString(request.getParameter("lng"));//经度
		Float lat=DataTrans.transToFloatFromString(request.getParameter("lat"));//纬度
		String attched=request.getParameter("attched");//公司证照
		String delUpdateFileIds=request.getParameter("delUpdateFileIds");//公司证照
		//构造变更企业信息的对象
		PfAuthcationUpdate authcationUpdate = new PfAuthcationUpdate();
		//authcationUpdate.setCompany_id(DataTrans.transToIntegerFromString(request.getParameter("companyId")));***
		authcationUpdate.setCompany_id(DataTrans.transToIntegerFromString(request.getParameter("companyId")));
		authcationUpdate.setClass_id(request.getParameter("companyClass"));
		authcationUpdate.setNature_id(request.getParameter("companyNature"));
		authcationUpdate.setKey_remark(request.getParameter("companyMainBussiness"));
		authcationUpdate.setCpyname_cn(request.getParameter("cpynameCn"));
		authcationUpdate.setContact_addr_code(DataTrans.transToIntegerFromString(request.getParameter("contactAddrCode")));
		authcationUpdate.setContact_addr(request.getParameter("contactAddr"));
		authcationUpdate.setIndustry_id(DataTrans.transToIntegerFromString(request.getParameter("industryName")));
		authcationUpdate.setF_phone(request.getParameter("fPhone"));
		authcationUpdate.setCorporation(request.getParameter("companyCorporate"));
		authcationUpdate.setReg_fund(DataTrans.transToDoubleFromString(request.getParameter("companyRegFund")));
		authcationUpdate.setCurrency_id(DataTrans.transToIntegerFromString(request.getParameter("currency")));
		authcationUpdate.setEstablish_dt(DataTrans.transToDateFromString(request.getParameter("companyEstablishDt")));
		authcationUpdate.setCompany_introduction(request.getParameter("companyIntroduction"));
		if(lng != null){//不为空设置
			authcationUpdate.setLng(new BigDecimal(Float.toString(lng)));
			authcationUpdate.setLat(new BigDecimal(Float.toString(lat)));
		}
		
		resMap = supplierService.saveAuthcationUpdateInfo(authcationUpdate,saveOrSubmit,attched,delUpdateFileIds);
		
		return resMap;
	}
	/**
	 * @Description:根据登录ID找到所有子公司
	 * CompanyForPlateForm
	 * getCompanyListByRegId
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author yukai
	 * 2016-8-3 上午9:49:13
	 */
	@RequestMapping(value="/getCompanyListByRegId.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getCompanyListByRegId(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String, Object> resMap = WebUtil.getDefaultResponseMap();
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		if(loginAccount.getAccount_type()==0){
			qryParam.put("reg_id", loginAccount.getLogin_id());
		}else {
			qryParam.put("sa_id", loginAccount.getLogin_id());
		}
		List<CompanyInfoVo>list=supplierService.getCompanyListByRegId(qryParam);
		resMap.put(Const.AJAX_DATA_ROOT, list);
		return resMap;
	}
	
	@RequestMapping(value="/getCompanyFromDictionary.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getCompanyFromDictionary(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String, Object> resMap = WebUtil.getDefaultResponseMap();
		PfCompanySimpleInfo pfCompanySimpleInfo=supplierService.getCompanyFromDictionary(qryParam);
		resMap.put(Const.AJAX_DATA_ROOT, pfCompanySimpleInfo);
		return resMap;
	}
	
	@RequestMapping(value="/checkCanUpdate.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> checkCanUpdate(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String, Object> resMap = WebUtil.getDefaultResponseMap();
		boolean canUpdate=supplierService.checkCanUpdate(qryParam);
		resMap.put(Const.AJAX_DATA_ROOT, canUpdate);
		return resMap;
	}
}
