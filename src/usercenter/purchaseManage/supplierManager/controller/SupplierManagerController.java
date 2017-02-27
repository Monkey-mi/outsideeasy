package usercenter.purchaseManage.supplierManager.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;

import platform.company.service.CompanyForPlateFormService;

import usercenter.purchaseManage.supplierManager.model.SupplierCheckfactoryInform;
import usercenter.purchaseManage.supplierManager.model.SupplierCheckfactoryReport;
import usercenter.purchaseManage.supplierManager.model.SupplierMaterialcheck;
import usercenter.purchaseManage.supplierManager.model.WaitNotifySupplier;
import usercenter.purchaseManage.supplierManager.service.SupplierCheckfactoryInformService;
import usercenter.purchaseManage.supplierManager.service.SupplierCheckfactoryReportService;
import usercenter.purchaseManage.supplierManager.service.SupplierMaterialcheckService;
import usercenter.saleManage.model.AccessRecord;
import usercenter.saleManage.service.AccessRecordService;
import usercenter.saleManage.service.AdmittanceAuditService;
import usercenter.supplierFiles.model.SupplierFiles;
import usercenter.supplierFiles.service.SupplierFilesService;
import util.Const;
import util.SessionUtil;
import util.WebUtil;
import util.annotation.DocLogger;

import common.mongodb.service.FileOptService;
import common.user.model.LoginAccount;

/**
 * @author mishengliang
 */
@Controller
@RequestMapping(value="supplierManager")
public class SupplierManagerController {
	@Autowired
	private SupplierCheckfactoryInformService checkInfoService;
	@Autowired
	private SupplierCheckfactoryReportService checkReportService;
	@Autowired
	private FileOptService fileService;
	@Autowired
	private CompanyForPlateFormService companyForPlateFormService;
	@Autowired
	private SupplierMaterialcheckService materialcheckService;
	@Autowired
	private AccessRecordService accessRecordService;
	@Autowired
	private AdmittanceAuditService admittanceAuditService;
	@Autowired
	private SupplierFilesService supplierFilesService;
	/**
	 * @Description:跳转线下验厂页面
	 * SupplierManagerController
	 * gojsp_offlineFactoryCheck
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-15 上午9:37:50
	 */
	@RequestMapping(value = { "/offlineFactoryCheck" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_offlineFactoryCheck(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/purchaseManage/SupplierManage/offlineFactoryCheck");
		return modelAndView;
	}
	/**
	 * @Description:跳转准入审核页面
	 * SupplierManagerController
	 * gojsp_accessVerifyList
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-27 下午1:57:55
	 */
	@RequestMapping(value = { "/accessVerifyList" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_accessVerifyList(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/purchaseManage/SupplierManage/accessVerifyList");
		return modelAndView;
	}
	/**
	 * @Description:跳转准入审核页面
	 * SupplierManagerController
	 * gojsp_accessVerifyList
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-27 下午1:57:55
	 */
	@RequestMapping(value = { "/accessVerifyInfo/{+d}" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_accessVerifyInfo(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/purchaseManage/SupplierManage/accessVerifyInfo");
		return modelAndView;
	}
	/**
	 * @Description:跳转物料报告页面
	 * SupplierManagerController
	 * gojsp_accessVerifyList
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-27 下午1:57:55
	 */
	@RequestMapping(value = { "/materialReport" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_materialReport(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/purchaseManage/SupplierManage/materialReport");
		return modelAndView;
	}
	/**
	 * @Description: 通过账号获取验厂报告列表
	 * SupplierManagerController
	 * getSupplierCheckfactoryReportListByAccount
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author mishengliang
	 * 2016-8-23 下午4:51:44
	 */
	@ResponseBody
	@RequestMapping(value="getSupplierCheckfactoryReportListByAccount.do",method=RequestMethod.POST)
	public Map<String, Object> getSupplierCheckfactoryReportListByAccount(HttpServletRequest request, HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		
		List<SupplierCheckfactoryReport> reportList = checkReportService.getSupplierCheckfactoryReportListByAccount(qryParam,respMap);
		respMap.put("reportList", reportList);
		
		return respMap;
	}
	
	/**
	 * @Description: 获取已通知供应商
	 * SupplierManagerController
	 * getNotifiedSuppliers
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author mishengliang
	 * 2016-8-23 下午7:39:21
	 */
	@ResponseBody
	@RequestMapping(value="getNotifiedSuppliers.do",method=RequestMethod.POST)
	public Map<String, Object> getNotifiedSuppliers(HttpServletRequest request, HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		
		List<SupplierCheckfactoryInform> notifiedSupplierList = checkInfoService.getNotifiedSuppliers(qryParam,respMap);
		respMap.put("notifiedSupplierList", notifiedSupplierList);
		
		return respMap;
	}
	
	/**
	 * @Description: 获取待通知供应商
	 * SupplierManagerController
	 * getWaitNotifySuppliers
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author mishengliang
	 * 2016-8-23 下午7:41:09
	 */
	@ResponseBody
	@RequestMapping(value="getWaitNotifySuppliers.do",method=RequestMethod.POST)
	public Map<String, Object> getWaitNotifySuppliers(HttpServletRequest request, HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		
		List<WaitNotifySupplier> waitNotifyList = checkInfoService.getWaitNotifySuppliers(qryParam,respMap);
		respMap.put("waitNotifyList", waitNotifyList);
		
		return respMap;
	}
	
	/**
	 * @Description: 获取免检供应商
	 * SupplierManagerController
	 * getExemptCheckSupplier
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author mishengliang
	 * 2016-8-23 下午7:41:24
	 */
	@ResponseBody
	@RequestMapping(value="getExemptCheckSupplier.do",method=RequestMethod.POST)
	public Map<String, Object> getExemptCheckSupplier(HttpServletRequest request, HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		
		List<SupplierFiles> examptSupplierList = checkInfoService.getExemptCheckSupplier(qryParam,respMap);
		respMap.put("examptSupplierList", examptSupplierList);
		
		return respMap;
	}
	
	/**
	 * @Description: 取消通知验厂
	 * SupplierManagerController
	 * cancelNotifyToCheckFac
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author mishengliang
	 * 2016-8-24 下午3:09:44
	 */
	@ResponseBody
	@RequestMapping(value="cancelNotifyToCheckFac.do",method=RequestMethod.POST)
	public Map<String, Object> cancelNotifyToCheckFac(HttpServletRequest request, HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		checkInfoService.cancelNotifyToCheckFac(qryParam);
		return respMap;
	}
	
	/**
	 * @Description: 批量取消通知验厂
	 * SupplierManagerController
	 * batchCancelNotifyToCheckFac
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author mishengliang
	 * 2016-9-18 上午11:08:54
	 */
	@ResponseBody
	@RequestMapping(value="batchCancelNotifyToCheckFac.do",method=RequestMethod.POST)
	public Map<String, Object> batchCancelNotifyToCheckFac(HttpServletRequest request, HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		checkInfoService.batchCancelNotifyToCheckFac(qryParam);
		return respMap;
	}
	
	/**
	 * @Description: 设置免检供应商
	 * SupplierManagerController
	 * siteNoCheckSupplierFile
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author mishengliang
	 * 2016-8-24 下午4:44:36
	 */
	@ResponseBody
	@RequestMapping(value="siteNoCheckSupplierFile.do",method=RequestMethod.POST)
	public Map<String, Object> siteNoCheckSupplierFile(HttpServletRequest request, HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		checkInfoService.siteNoCheckSupplierFile(qryParam);
		return respMap;
	}
	@ResponseBody
	@RequestMapping(value="batchSiteNoCheckSupplierFile.do",method=RequestMethod.POST)
	public Map<String, Object> batchSiteNoCheckSupplierFile(HttpServletRequest request, HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		checkInfoService.batchSiteNoCheckSupplierFile(qryParam);
		return respMap;
	}
	
	/**
	 * @Description: 恢复验厂
	 * SupplierManagerController
	 * regainCheckFac
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author mishengliang
	 * 2016-8-24 下午5:40:21
	 */
	@ResponseBody
	@RequestMapping(value="regainCheckFac.do",method=RequestMethod.POST)
	public Map<String, Object> regainCheckFac(HttpServletRequest request, HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		checkInfoService.regainCheckFac(qryParam);
		return respMap;
	}
	@ResponseBody
	@RequestMapping(value="batchRegainCheckFac.do",method=RequestMethod.POST)
	public Map<String, Object> batchRegainCheckFac(HttpServletRequest request, HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		checkInfoService.batchRegainCheckFac(qryParam);
		return respMap;
	}
	
	/**
	 * @Description: 更新验厂通知，即上传的通知报告与供应商相关联
	 * SupplierManagerController
	 * updateNotifySupplier
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author mishengliang
	 * 2016-8-25 下午1:52:15
	 */
	@ResponseBody
	@RequestMapping(value="updateNotifySupplier.do",method=RequestMethod.POST)
	public Map<String, Object> updateNotifySupplier(HttpServletRequest request, HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		checkInfoService.updateNotifySupplier(qryParam);
		return respMap;
	}
	
	/**
	 * @Description: 上传验厂通知文件
	 * SupplierManagerController
	 * uploadCheckFacInfo
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception String
	 * @author mishengliang
	 * 2016-8-25 下午2:23:07
	 */
	@DocLogger(explain="上传验厂通知文件")
	@RequestMapping(value="/uploadCheckFacInfo.do",method=RequestMethod.POST)
	@ResponseBody
	public String uploadCheckFacInfo(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object>params=new HashMap<String, Object>();
		LoginAccount regAccount = SessionUtil.getCurrentPlateLoginAccount();
		JSONObject json = new JSONObject();
    	json.put("success", true);
		/*
		 *2.赋值 
		 */
		
		String fileName = request.getParameter("fileName");
		
		
		if(fileName.indexOf(",") != -1){
			json.put("message", "文件名中存在非法字符(英文逗号),请先去除后上传");
			return json.toString() ;
		}
		
		/*
		 * 3.对文件信息的处理
		 */
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request; 
        if(WebUtil.isEmpty((CommonsMultipartFile) multipartRequest.getFile("file"))){
			json.put("message", "没有文件");
			return json.toString() ;
		}
        CommonsMultipartFile file = (CommonsMultipartFile) multipartRequest.getFile("file");   //对应前台文件对象   
       
        if(file!=null && file.getSize()>0){//检查文件大小和格式
        	if (file.getSize() >5*1024*1024) {
				json.put("message", "文件太大，超过5M");
				return json.toString() ;
			} 
	        
            String originalName=file.getOriginalFilename();
            String this_suffix="";
            params.put(Const.ISIMG, 0);
            params.put(Const.USE_TYPE, 42);
            params.put(Const.USERNAME, regAccount.getLogin_name());
            params.put(Const.COM_ID, qryParam.get("companyId"));
            params.put(Const.COM_NAME,companyForPlateFormService.getCompanyNameByCompanyId(qryParam));
            boolean flag=false;//默认不 是图片
            //获取文件后缀，与传过来的参数file_name重新组装文件名
            if(originalName.indexOf(".")>0){//有后缀  XX.jpg  XX.RAR
            	this_suffix=originalName.substring(originalName.lastIndexOf("."));
            	for(String suffix:Const.docAndPicArray){
            		if(suffix.equalsIgnoreCase(this_suffix)){
            			flag=true;
            			break;
                    }
            	}         
            	for(String suffix:Const.imgArray){
            		if(suffix.equalsIgnoreCase(this_suffix)){
            			params.put(Const.ISIMG, 1);
            			break;
                    }
            	} 
            }
            
            if(!flag){
        		json.put("message", "不是指定格式");
				return json.toString() ;
        	}else{
        		/*
        		 * 4.进行信息的处理
        		 */
	            String mongodbId=fileService.SaveFile(file,params);
	            
	    		SupplierCheckfactoryInform checkFacInfo = new SupplierCheckfactoryInform();
	    		checkFacInfo.setFile_name(originalName);
	    		checkFacInfo.setMogodb_id(mongodbId);
	    		checkInfoService.notifySupplier(checkFacInfo);
	            json.put("fileId",checkFacInfo.getCheckinform_id());
	            json.put("message", "上传成功");
        	}
        }else{
        	json.put("message", "文件不存在");
        }
        
        return json.toString();
	}
	/**
	 * @Description:通过账号获取物料报告列表
	 * SupplierManagerController
	 * getSupplierMaterialcheckList
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author yukai
	 * 2016-12-19 上午9:45:03
	 */
	@ResponseBody
	@RequestMapping(value="getSupplierMaterialcheckListByAccount.do",method=RequestMethod.POST)
	public Map<String, Object> getSupplierMaterialcheckListByAccount(HttpServletRequest request, HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		if(loginAccount.getAccount_type() == 0){//主账号
			qryParam.put("regId", loginAccount.getLogin_id());
		}else if(loginAccount.getAccount_type() == 1){//子账号
			qryParam.put("saId", loginAccount.getLogin_id());
		}
		int nLimit =0,npage =0;
		nLimit =qryParam.get("limit")!=null?Integer.parseInt(qryParam.get("limit").toString()):0;
		npage =qryParam.get("page")!=null?Integer.parseInt(qryParam.get("page").toString()):0;
		int nStart=nLimit*npage;
		qryParam.put("start",nStart);
		List<SupplierMaterialcheck> materialchecks = materialcheckService.getSupplierMaterialcheckListByAccount(qryParam);
		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL)!=null?qryParam.get(Const.AJAX_SERVICE_TOTAL):0);
		respMap.put(Const.AJAX_SERVICE_CURRENT_PAGE, npage);
		respMap.put(Const.AJAX_DATA_ROOT, materialchecks);
		return respMap;
	}
	/**
	 * @Description:删除物料报告
	 * SupplierManagerController
	 * delSupplierMaterialcheck
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author yukai
	 * 2016-12-19 上午10:20:38
	 */
	@ResponseBody
	@RequestMapping(value="delSupplierMaterialcheck.do",method=RequestMethod.POST)
	public Map<String, Object> delSupplierMaterialcheck(HttpServletRequest request, HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		materialcheckService.deleteSupplierMaterialcheck(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, true);
		return respMap;
	}
	/**
	 * @Description:上传物料报告
	 * SupplierManagerController
	 * uploadMaterialReport
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception String
	 * @author yukai
	 * 2016-12-19 下午1:28:40
	 */
	@RequestMapping(value="/uploadMaterialReport.do",method=RequestMethod.POST)
	@ResponseBody
	public String uploadMaterialReport(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object>params=new HashMap<String, Object>();
		LoginAccount regAccount = SessionUtil.getCurrentPlateLoginAccount();
		JSONObject json = new JSONObject();
    	json.put("success", true);
		/*
		 *2.赋值 
		 */
		
		String fileName = request.getParameter("fileName");
		
		
		if(fileName.indexOf(",") != -1){
			json.put("message", "文件名中存在非法字符(英文逗号),请先去除后上传");
			return json.toString() ;
		}
		
		/*
		 * 3.对文件信息的处理
		 */
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request; 
        if(WebUtil.isEmpty((CommonsMultipartFile) multipartRequest.getFile("file"))){
			json.put("message", "没有文件");
			return json.toString() ;
		}
        CommonsMultipartFile file = (CommonsMultipartFile) multipartRequest.getFile("file");   //对应前台文件对象   
       
        if(file!=null && file.getSize()>0){//检查文件大小和格式
        	if (file.getSize() >5*1024*1024) {
				json.put("message", "文件太大，超过5M");
				return json.toString() ;
			} 
	        
            String originalName=file.getOriginalFilename();
            String this_suffix="";
            params.put(Const.ISIMG, 0);
            params.put(Const.USE_TYPE, qryParam.get("file_type_id"));
            params.put(Const.USERNAME, regAccount.getLogin_name());
            params.put(Const.COM_ID, qryParam.get("companyId"));
            params.put(Const.COM_NAME,companyForPlateFormService.getCompanyNameByCompanyId(qryParam));
            boolean flag=false;//默认不 是图片
            //获取文件后缀，与传过来的参数file_name重新组装文件名
            if(originalName.indexOf(".")>0){//有后缀  XX.jpg  XX.RAR
            	this_suffix=originalName.substring(originalName.lastIndexOf("."));
            	for(String suffix:Const.docAndPicArray){
            		if(suffix.equalsIgnoreCase(this_suffix)){
            			flag=true;
            			break;
                    }
            	}         
            	for(String suffix:Const.imgArray){
            		if(suffix.equalsIgnoreCase(this_suffix)){
            			params.put(Const.ISIMG, 1);
            			break;
                    }
            	} 
            }
            
            if(!flag){
        		json.put("message", "不是指定格式");
				return json.toString() ;
        	}else{
        		/*
        		 * 4.进行信息的处理
        		 */
	            String mongodbId=fileService.SaveFile(file,params);
	            
	    		qryParam.put("file_name", originalName);
	    		qryParam.put("mogodb_id", mongodbId);
	    		qryParam.put("operator_id", regAccount.getLogin_id());
	    		qryParam.put("operator_name", regAccount.getLogin_name());
	    		materialcheckService.addSupplierMaterialcheck(qryParam);
	    		json.put("fileName",originalName);
	            json.put("fileId",qryParam.get("materialcheck_id"));
	            json.put("message", "上传成功");
        	}
        }else{
        	json.put("message", "文件不存在");
        }
        
        return json.toString();
	}
	
	/**
	 * @Description:修改物料报告
	 * SupplierManagerController
	 * addSupplierMaterialcheck
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author yukai
	 * 2016-12-19 下午2:24:05
	 */
	@ResponseBody
	@RequestMapping(value="updateSupplierMaterialcheck.do",method=RequestMethod.POST)
	public Map<String, Object> updateSupplierMaterialcheck(HttpServletRequest request, HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		materialcheckService.updateSupplierMaterialcheck(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, true);
		return respMap;
	}
	
	/**
	 * @Description:获取准入申请审核列表
	 * SupplierManagerController
	 * getAccessRecordListForVerify
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author yukai
	 * 2016-12-19 下午4:17:00
	 */
	@ResponseBody
	@RequestMapping(value="getAccessRecordListForVerify.do",method=RequestMethod.POST)
	public Map<String, Object> getAccessRecordListForVerify(HttpServletRequest request, HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		int nLimit =0,npage =0;
		nLimit =qryParam.get("limit")!=null?Integer.parseInt(qryParam.get("limit").toString()):0;
		npage =qryParam.get("page")!=null?Integer.parseInt(qryParam.get("page").toString()):0;
		int nStart=nLimit*npage;
		qryParam.put("start",nStart);
		List<AccessRecord> list = accessRecordService.getAccessRecordListForVerify(qryParam);
		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL)!=null?qryParam.get(Const.AJAX_SERVICE_TOTAL):0);
		respMap.put(Const.AJAX_SERVICE_CURRENT_PAGE, npage);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
	/**
	 * @Description:准入审核-退回修改
	 * SupplierManagerController
	 * returnToUpdate
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author yukai
	 * 2016-12-21 上午10:04:34
	 */
	@ResponseBody
	@RequestMapping(value="returnToUpdate.do",method=RequestMethod.POST)
	public Map<String, Object> returnToUpdate(HttpServletRequest request, HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		LoginAccount regAccount = SessionUtil.getCurrentPlateLoginAccount();
		qryParam.put("auditor_id", regAccount.getLogin_id());
		qryParam.put("auditor_name", regAccount.getLogin_name());
		admittanceAuditService.addAdmittanceAudit(qryParam);//新增一条审核记录
		accessRecordService.updateAccessRecord(qryParam);//修改准入流水状态
		respMap.put(Const.AJAX_DATA_ROOT, true);
		return respMap;
	}
	/**
	 * @Description:准入审核-审核通过
	 * SupplierManagerController
	 * verifyPass
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author yukai
	 * 2016-12-21 上午10:32:30
	 */
	@ResponseBody
	@RequestMapping(value="verifyPass.do",method=RequestMethod.POST)
	public Map<String, Object> verifyPass(HttpServletRequest request, HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		accessRecordService.updateAccessRecord(qryParam);//修改准入流水状态
		qryParam.put("auth_dt", new Date());
		supplierFilesService.updateSupplierStatusByRecordId(qryParam);//修改供应商档案状态
		respMap.put(Const.AJAX_DATA_ROOT, true);
		return respMap;
	}
	/**
	 * @Description:根据record_id获取supplier_id
	 * SupplierManagerController
	 * getSupplierIdByRecordId
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author yukai
	 * 2016-12-21 上午10:58:16
	 */
	@ResponseBody
	@RequestMapping(value="getSupplierIdByRecordId.do",method=RequestMethod.POST)
	public Map<String, Object> getSupplierIdByRecordId(HttpServletRequest request, HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		Integer supplier_id=supplierFilesService.getSupplierIdByRecordId(Integer.parseInt(qryParam.get("record_id").toString()));
		respMap.put(Const.AJAX_DATA_ROOT, supplier_id);
		return respMap;
	}
}
