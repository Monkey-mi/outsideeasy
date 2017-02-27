package usercenter.saleManage.controller;

import java.util.ArrayList;
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

import usercenter.saleManage.model.CheckfactoryInform;
import usercenter.saleManage.model.CheckfactoryReport;
import usercenter.saleManage.model.CustomerFiles;
import usercenter.saleManage.model.Materialcheck;
import usercenter.saleManage.service.CheckfactoryInformService;
import usercenter.saleManage.service.CheckfactoryReportService;
import usercenter.saleManage.service.CustomerFilesService;
import usercenter.saleManage.service.MaterialcheckService;
import usercenter.supplierFiles.model.SupplierTagInfo;
import usercenter.supplierFiles.service.SupplierTagInfoService;
import util.Const;
import util.SessionUtil;
import util.WebUtil;
import util.annotation.DocLogger;

@Controller
@RequestMapping("CustomerFilesCtrl")
public class CustomerFilesCtrl {
	@Autowired
	private CustomerFilesService cfService;
	@Autowired
	private MaterialcheckService mcService;
	@Autowired
	private CheckfactoryReportService crService;
	@Autowired
	private CheckfactoryInformService ciService;
	@Autowired
	private SupplierTagInfoService stService;
	
	@RequestMapping(value = { "/accessCheckfactoryList" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_accessCheckfactoryList(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/saleManage/accessManage/accessCheckfactoryList");
		return modelAndView;
	}
	@RequestMapping(value = { "/accessMaterialcheckList" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_accessMaterialcheckList(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/saleManage/accessManage/accessMaterialcheckList");
		return modelAndView;
	}
	@RequestMapping(value = { "/customerfilesList" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_customerfilesList(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/saleManage/accessManage/customerfilesList");
		return modelAndView;
	}
	@RequestMapping(value = { "/customerfilesInfo/{+d}" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_customerfilesInfo(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/saleManage/accessManage/customerfilesInfo");
		return modelAndView;
	}
	/**
	 * 获取客户库列表
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value="/getCustomerFilesList.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getCustomerFilesList(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		int nLimit =0,npage =0;
		nLimit =qryParam.get("limit")!=null?Integer.parseInt(qryParam.get("limit").toString()):0;
    	npage =qryParam.get("page")!=null?Integer.parseInt(qryParam.get("page").toString()):0;
    	int nStart=nLimit*npage;
    	qryParam.put("start",nStart);
		List<CustomerFiles>list=cfService.getCustomerFilesList(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL)!=null?qryParam.get(Const.AJAX_SERVICE_TOTAL):0);
		respMap.put(Const.AJAX_SERVICE_CURRENT_PAGE, npage);
		return respMap;
	}
	/**
	 * 获取对应客户物料确认列表
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value="/getMaterialCheckList.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getMaterialCheckList(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<Materialcheck>list=mcService.getMaterialcheckList(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		respMap.put(Const.AJAX_SERVICE_TOTAL, list.size());
		return respMap;
	}
	/**
	 * 获取对应客户验厂报告列表
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value="/getCheckFactoryList.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getCheckFactoryList(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<CheckfactoryReport>list=crService.getCheckfactoryReportList(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		respMap.put(Const.AJAX_SERVICE_TOTAL, list.size());
		return respMap;
	}
	/**
	 * 获取所有客户物料确认列表
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value="/getAllMaterialCheckList.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getAllMaterialCheckList(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		int nLimit =0,npage =0;
		nLimit =qryParam.get("limit")!=null?Integer.parseInt(qryParam.get("limit").toString()):0;
    	npage =qryParam.get("page")!=null?Integer.parseInt(qryParam.get("page").toString()):0;
    	int nStart=nLimit*npage;
    	qryParam.put("start",nStart);
		List<Materialcheck>list=mcService.getAllMaterialcheckList(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL)!=null?qryParam.get(Const.AJAX_SERVICE_TOTAL):0);
		respMap.put(Const.AJAX_SERVICE_CURRENT_PAGE, npage);
		return respMap;
	}
	/**
	 * 获取所有客户验厂报告列表
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value="/getAllCheckfactoryReportList.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getAllCheckfactoryReportList(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		int nLimit =0,npage =0;
		nLimit =qryParam.get("limit")!=null?Integer.parseInt(qryParam.get("limit").toString()):0;
    	npage =qryParam.get("page")!=null?Integer.parseInt(qryParam.get("page").toString()):0;
    	int nStart=nLimit*npage;
    	qryParam.put("start",nStart);
		List<CheckfactoryReport>list=crService.getAllCheckfactoryReportList(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL)!=null?qryParam.get(Const.AJAX_SERVICE_TOTAL):0);
		respMap.put(Const.AJAX_SERVICE_CURRENT_PAGE, npage);
		return respMap;
	}
	/**
	 * 获取所有客户验厂通知列表
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value="/getAllCheckfactoryInformList.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getAllCheckfactoryInformList(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		int nLimit =0,npage =0;
		nLimit =qryParam.get("limit")!=null?Integer.parseInt(qryParam.get("limit").toString()):0;
    	npage =qryParam.get("page")!=null?Integer.parseInt(qryParam.get("page").toString()):0;
    	int nStart=nLimit*npage;
    	qryParam.put("start",nStart);
		List<CheckfactoryInform>list=ciService.getAllCheckfactoryInformList(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL)!=null?qryParam.get(Const.AJAX_SERVICE_TOTAL):0);
		respMap.put(Const.AJAX_SERVICE_CURRENT_PAGE, npage);
		return respMap;
	}
	/**
	 * @Description:获取供应商在当前登陆账号下的所有客户
	 * CustomerFilesCtrl
	 * getCustomerFilesListByRegId
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author yukai
	 * 2016-8-2 上午10:20:27
	 */
	@RequestMapping(value="/getCustomerFilesListByRegId.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getCustomerFilesListByRegId(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<CustomerFiles>list=cfService.getCustomerFilesListByRegId(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
	/**
	 * @Description:获取当前供应商标签
	 * CustomerFilesCtrl
	 * getSupplierTagBySupplierId
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author yukai
	 * 2016-9-21 下午4:43:39
	 */
	@RequestMapping(value="/getSupplierTagBySupplierId.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getSupplierTagBySupplierId(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<SupplierTagInfo> tagInfoList =new ArrayList<SupplierTagInfo>();
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		Integer loginId = loginAccount.getLogin_id();//账号ID
		Integer accountType = loginAccount.getAccount_type();//账号类型
		if(accountType == 0){//主账号
			qryParam.put("tagType", 0);//标签类型 公共标签，即主账号标签
			qryParam.put("accountId", loginId);
			 tagInfoList = stService.getSupplierTag(qryParam);//主账号标签 只获取主账号下的标签
		}else if(accountType == 1){//子账号
			qryParam.put("tagType", 1);//标签类型 私有标签，即子账号标签
			qryParam.put("accountId", loginId);
			List<SupplierTagInfo> tagInfoListForSub = stService.getSupplierTag(qryParam);//子账号下标签
			qryParam.put("tagType", 0);//标签类型 公共标签，即主账号标签
			qryParam.put("accountId", loginAccount.getParent_id());
			List<SupplierTagInfo> tagInfoListForMain = stService.getSupplierTag(qryParam);//主账号下的标签
			tagInfoListForMain.addAll(tagInfoListForSub);//将两个list合并为一个
			tagInfoList=tagInfoListForMain;
		}
		respMap.put(Const.AJAX_DATA_ROOT, tagInfoList);
		return respMap;
	}
	/**
	 * @Description:接受邀请时回传record_id
	 * CustomerFilesCtrl
	 * returnRecordIdToSupplier
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author yukai
	 * 2016-8-8 下午3:09:44
	 */
	@RequestMapping(value="/returnRecordIdToSupplier.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> returnRecordIdToSupplier(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		cfService.updateCustomerFiles(qryParam);
		return respMap;
	}
	/**
	 * @Description:接受邀请走快速通道时直接建立关系
	 * CustomerFilesCtrl
	 * directCreateRelation
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author yukai
	 * 2016-8-12 上午9:28:10
	 */
	@RequestMapping(value="/directCreateRelation.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> directCreateRelation(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		cfService.directCreateRelation(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, true);
		return respMap;
	}
	/**
	 * @Description:申请加入供应商
	 * CustomerFilesCtrl
	 * applyJoinSupplier
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-8-12 下午4:09:10
	 */
	@DocLogger(explain="主动申请加入供应商")
	@RequestMapping(value="/applyJoinSupplier.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> applyJoinSupplier(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		Map<String, Object> recordParams=new HashMap<String, Object>();
		recordParams=cfService.applyJoinSupplier(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT,recordParams);
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
		return respMap;
	}
	/**
	 * @Description:检验输入的客户名称是否有效
	 * CustomerFilesCtrl
	 * checkCustomer
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-8-16 下午2:42:25
	 */
	@RequestMapping(value="/checkCustomer.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> checkCustomer(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		String message=cfService.checkCustomer(qryParam);
		respMap.put(Const.AJAX_SERVICE_MESSAGE,message);
		return respMap;
	}
	/**
	 * @Description:确认验厂通知
	 * CustomerFilesCtrl
	 * confirmCheckfactoryInform
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-8-17 上午11:12:45
	 */
	@RequestMapping(value="/confirmCheckfactoryInform.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> confirmCheckfactoryInform(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		ciService.confirmCheckfactoryInform(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
		return respMap;
	}
	/**
	 * @Description:检查是否有物料确认报告
	 * CustomerFilesCtrl
	 * hasMaterialCheck
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-9-1 上午9:26:04
	 */
	@RequestMapping(value="/hasMaterialCheck.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> hasMaterialCheck(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		boolean flag=mcService.hasMaterialCheck(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT,flag);
		return respMap;
	}
	/**
	 * @Description:检查是否有验厂报告
	 * CustomerFilesCtrl
	 * hasMaterialCheck
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-9-1 上午9:26:04
	 */
	@RequestMapping(value="/hasCheckFactory.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> hasCheckFactory(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		boolean flag=crService.hasCheckFactory(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT,flag);
		return respMap;
	}
}
