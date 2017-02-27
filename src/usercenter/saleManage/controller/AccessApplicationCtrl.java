package usercenter.saleManage.controller;

import java.text.SimpleDateFormat;
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

import platform.common.model.PfRegisterAttched;
import platform.company.service.CompanyForPlateFormService;


import common.mongodb.service.FileOptService;
import common.user.model.LoginAccount;
import common.user.model.RegAccout;
import common.user.model.RegAccoutCompanyInfo;
import common.user.service.RegAccoutCompanyInfoService;

import usercenter.saleManage.model.AccessAccount;
import usercenter.saleManage.model.AccessApplicationAttched;
import usercenter.saleManage.model.AccessApplicationCategory;
import usercenter.saleManage.model.AccessApplicationCompetitor;
import usercenter.saleManage.model.AccessApplicationCustomer;
import usercenter.saleManage.model.AccessApplicationDevicelist;
import usercenter.saleManage.model.AccessApplicationGoods;
import usercenter.saleManage.model.AccessApplicationInfo;
import usercenter.saleManage.model.AccessApplicationMetarial;
import usercenter.saleManage.model.AccessInvoiceTitle;
import usercenter.saleManage.model.AccessRecord;
import usercenter.saleManage.model.AccessTemplet;
import usercenter.saleManage.model.AccessTempletHead;
import usercenter.saleManage.model.AdmittanceAudit;
import usercenter.saleManage.model.AdmittanceInvite;
import usercenter.saleManage.model.CustomerFiles;
import usercenter.saleManage.service.AccessAccountService;
import usercenter.saleManage.service.AccessApplicationAttchedService;
import usercenter.saleManage.service.AccessApplicationCategoryService;
import usercenter.saleManage.service.AccessApplicationCompetitorService;
import usercenter.saleManage.service.AccessApplicationCustomerService;
import usercenter.saleManage.service.AccessApplicationDevicelistService;
import usercenter.saleManage.service.AccessApplicationGoodsService;
import usercenter.saleManage.service.AccessApplicationInfoService;
import usercenter.saleManage.service.AccessApplicationMaterialService;
import usercenter.saleManage.service.AccessApplicationService;
import usercenter.saleManage.service.AccessInvoiceTitleService;
import usercenter.saleManage.service.AccessRecordService;
import usercenter.saleManage.service.AccessTempletHeadService;
import usercenter.saleManage.service.AccessTempletService;
import usercenter.saleManage.service.AdmittanceAuditService;
import usercenter.saleManage.service.CustomerFilesService;
import util.Const;
import util.DataTrans;
import util.SessionUtil;
import util.WebUtil;
import util.annotation.DocLogger;

@Controller
@RequestMapping("AccessApplicationCtrl")
public class AccessApplicationCtrl {
	@Autowired
	private AccessApplicationService aaService;
	@Autowired
	private AccessTempletService atService;
	@Autowired
	private AccessTempletHeadService ahService;
	@Autowired
	private AccessApplicationInfoService aiService;
	@Autowired
	private AccessApplicationAttchedService asService;
	@Autowired
	private AccessApplicationMaterialService amService;
	@Autowired
	private AccessApplicationGoodsService agService;
	@Autowired
	private AccessApplicationCompetitorService acService;
	@Autowired
	private AccessApplicationCustomerService auService;
	@Autowired
	private AccessApplicationDevicelistService adService;
	@Autowired
	private AccessAccountService abService;
	@Autowired
	private AccessInvoiceTitleService afService;
	@Autowired
	private AccessRecordService arService;
	@Autowired
	private FileOptService fileService;
	@Autowired
	private AdmittanceAuditService ayService;
	@Autowired
	private AccessApplicationCategoryService aeService;
	@Autowired
    private RegAccoutCompanyInfoService rcService;
	@Autowired 
	private CustomerFilesService cfService;
	@Autowired
	private CompanyForPlateFormService companyForPlateFormService;
	
	@RequestMapping(value = { "/applyAccessList" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_applyAccessList(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/saleManage/accessManage/applyAccessList");
		return modelAndView;
	}
	
	@RequestMapping(value = { "/appAccessInfo/{+d}" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_appAccessInfo(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/saleManage/accessManage/appAccessInfo");
		return modelAndView;
	}
	
	/**
	 * 获取准入申请列表
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value="/getAccessApplicationList.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getAccessApplicationList(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		int nLimit =0,npage =0;
		nLimit =qryParam.get("limit")!=null?Integer.parseInt(qryParam.get("limit").toString()):0;
    	npage =qryParam.get("page")!=null?Integer.parseInt(qryParam.get("page").toString()):0;
    	int nStart=nLimit*npage;
    	qryParam.put("start",nStart);
		List<AdmittanceInvite>list=aaService.getAccessApplicationList(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL)!=null?qryParam.get(Const.AJAX_SERVICE_TOTAL):0);
		respMap.put(Const.AJAX_SERVICE_CURRENT_PAGE, npage);
		return respMap;
	}
	/**
	 * 接收邀请
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value="/acceptInvite.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> acceptInvite(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		aaService.updateAdmittanceInvite(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, true);
		return respMap;
	}
	/**
	 * 获取准入申请模板
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value="/getAccessTemplet.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getAccessTemplet(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<AccessTemplet>list=atService.getAccessTempletList(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
	/**
	 * 获取准入申请模板头
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value="/getAccessTempletHead.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getAccessTempletHead(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<AccessTempletHead>list=ahService.getAccessTempletHeadList(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
	/**
	 * 保存准入资料
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value="/addAccessApplicationInfo.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> addAccessApplicationInfo(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		aiService.addAccessApplicationInfo(qryParam);
		return respMap;
	}
	/**
	 * 更新准入资料
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value="/updateAccessApplicationInfo.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> updateAccessApplicationInfo(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		aiService.updateAccessApplicationInfo(qryParam);
		return respMap;
	}
	
	/**
	* @Description:批量更改详细信息
	* AccessApplicationCtrl
	* updateAccessApplicationInfoBatch
	* @param request
	* @param response
	* @return Map<String,Object>
	* @author mishengliang
	* 2017-2-15 上午9:01:57
	*/
	@RequestMapping(value="/updateAccessApplicationInfoBatch.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> updateAccessApplicationInfoBatch(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		String infos= request.getParameter("infos");
		String goodInfos= request.getParameter("goodInfos");
		String deviceInfos= request.getParameter("deviceInfos");
		String bankInfos= request.getParameter("bankInfos");
		
		if(bankInfos == null){//交易信息中没有这两项操作
			asService.addAndDelFileInfos(qryParam);//供应商文件操作
			aiService.updateAccessApplicationInfoBatch(infos);
		}
		if(goodInfos != null){//详细信息更新
			agService.addGoodsInfos(request);
			amService.addMateialInfos(request);
			acService.addCompetitorInfos(request);
			auService.addCustomerInfos(request);
		}
		if(deviceInfos != null){//详细信息更新
			adService.addDeviceInfos(request);
		}
		if(bankInfos != null){//详细信息更新
			abService.addAccountInfos(request);
			afService.addInvoiceInfos(request);
		}
		
		return respMap;
	}
	/**
	 * 获取准入资料信息
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value="/getAccessApplicationInfo.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getAccessApplicationInfo(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<AccessApplicationInfo> list=aiService.getAccessApplicationInfoList(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
	
	/**
	 * 获取准入资料附件
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value="/getAccessApplicationAttched.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getAccessApplicationAttched(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<AccessApplicationAttched>list=asService.getAccessApplicationAttched(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
	/**
	 * 保存准入资料附件
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value="/addAccessApplicationAttched.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> addAccessApplicationAttched(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		asService.addAccessApplicationAttched(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, true);
		return respMap;
	}
	/**
	 * 删除准入资料附件
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value="/delAccessApplicationAttched.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> delAccessApplicationAttched(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		asService.delAccessApplicationAttcheds(qryParam);
		return respMap;
	}
	/**
	 * 删除没用的准入资料附件
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value="/delUselessAttched.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> delUselessAttched(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		asService.delUselessAttched(qryParam);
		return respMap;
	}
	/**
	 * 更改准入资料附件
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value="/updateAccessApplicationAttched.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> updateAccessApplicationAttched(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		asService.updateAccessApplicationAttched(qryParam);
		return respMap;
	}
	/**
	 * 上传准入资料附件
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@DocLogger(explain="上传准入资料附件")
	@RequestMapping(value="/uploadAccessApplicationAttched.do",method=RequestMethod.POST)
	@ResponseBody 
	public String uploadAccessApplicationAttched(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object>params=new HashMap<String, Object>();
		LoginAccount regAccount = SessionUtil.getCurrentPlateLoginAccount();
		JSONObject json = new JSONObject();
    	json.put("success", true);
    	/*
    	 * 1.检查参数
    	 */
		if(WebUtil.isEmpty(request.getParameter("fileType"))){//获取任务id
			json.put("message", "没有文件类型值");
			return json.toString() ;
		}
		/*
		 *2.赋值 
		 */
		
		int fileType = Integer.parseInt(request.getParameter("fileType"));
		String fileName = request.getParameter("fileName");
		String formatType = request.getParameter("formatType");
		
		
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
            params.put(Const.USE_TYPE, fileType);
            params.put(Const.USERNAME, regAccount.getLogin_name());
            params.put(Const.COM_ID, qryParam.get("companyId"));
            params.put(Const.COM_NAME,companyForPlateFormService.getCompanyNameByCompanyId(qryParam));
            boolean flag=false;//默认不 是图片
            //获取文件后缀，与传过来的参数file_name重新组装文件名
            if(originalName.indexOf(".")>0){//有后缀  XX.jpg  XX.RAR
            	this_suffix=originalName.substring(originalName.lastIndexOf("."));
            	
            	String[] format = null;
            	if("image".equals(formatType)){//判断上传文件的类型：image 图片，text 文档
            		format = Const.imgArray;
            		params.put(Const.ISIMG, 1);
            	}else if("text".equals(formatType)){
            		format = Const.otherArray;
            	}
            	
            	for(String suffix:format){
            		if(suffix.equalsIgnoreCase(this_suffix)){
            			flag=true;
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
        		int id = 0;
        		Date date = new Date();
        		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	            String mongodbId=fileService.SaveFile(file,params);
	            Map<String, Object> qryParams = new HashMap<String, Object>();
	            qryParams.put("mogodb_id", mongodbId);
	            qryParams.put("file_type_id", fileType);
	            qryParams.put("file_name", fileName);
	            qryParams.put("file_format", this_suffix);
	            asService.addAccessApplicationAttched(qryParams);
	            id=Integer.parseInt(qryParams.get("id").toString());
	            json.put("fileId",id);
	            json.put("fileFormat",this_suffix);
	            json.put("mongodbId", mongodbId);
	            json.put("creatDate", sf.format(date));
	            json.put("message", "上传成功");
        	}
        }else{
        	json.put("message", "文件不存在");
        }
        
        return json.toString();
	}
	/**
	 * 获取准入资料主要原材料及品牌
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="/getAccessApplicationMaterial.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getAccessApplicationMaterial(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<AccessApplicationMetarial>list=amService.getAccessApplicationMetarialList(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
	/**
	 * 获取准入资料主要销售产品及品牌
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="/getAccessApplicationGoods.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getAccessApplicationGoods(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<AccessApplicationGoods>list=agService.getAccessApplicationGoodsList(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
	/**
	 * 获取准入资料主要竞争对手
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="/getAccessApplicationCompetitor.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getAccessApplicationCompetitor(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<AccessApplicationCompetitor>list=acService.getAccessApplicationCompetitorList(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
	/**
	 * 获取准入资料主要客户
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="/getAccessApplicationCustomer.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getAccessApplicationCustomer(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<AccessApplicationCustomer>list=auService.getAccessApplicationCustomerList(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
	/**
	 * 获取准入资料设备清单
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="/getAccessApplicationDevicelist.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getAccessApplicationDevicelist(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<AccessApplicationDevicelist>list=adService.getAccessApplicationDevicelistList(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
	/**
	 * 获取准入资料银行信息
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="/getAccessAccount.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getAccessAccount(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<AccessAccount>list=abService.getAccessAccountList(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
	/**
	 * 删除准入资料银行信息
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="/delAccessAccount.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> delAccessAccount(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		abService.deleteAccessAccounts(qryParam);
		return respMap;
	}
	/**
	 * 保存准入资料银行信息
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="/addAccessAccount.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> addAccessAccount(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		abService.addAccessAccount(qryParam);
		return respMap;
	}
	/**
	 * 获取准入资料发票信息
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="/getAccessInvoiceTitle.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getAccessInvoiceTitle(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<AccessInvoiceTitle>list=afService.getAccessInvoiceTitleList(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
	/**
	 * 删除准入资料发票信息
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="/delAccessInvoiceTitle.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> delAccessInvoiceTitle(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		afService.deleteAccessInvoiceTitles(qryParam);
		return respMap;
	}
	/**
	 * 保存准入资料发票信息
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="/addAccessInvoiceTitle.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> addAccessInvoiceTitle(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		afService.addAccessInvoiceTitle(qryParam);
		return respMap;
	}
	/**
	 * 修改准入流水状态
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="/updateAccessRecord.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> updateAccessRecord(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		arService.updateAccessRecord(qryParam);
		return respMap;
	}
	/**
	 * 增加准入流水
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="/addAccessRecord.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> addAccessRecord(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		Map<String,Object> params=new HashMap<String, Object>();
		int recive_id=Integer.parseInt(qryParam.get("receive_id").toString());
		params.put("company_id", recive_id);
		List<RegAccoutCompanyInfo> list=rcService.getRegAccoutCompanyInfoList(params);
		qryParam.put("accepter_reg_id", list.get(0).getReg_id());
		arService.addAccessRecord(qryParam);
		int record_id=Integer.parseInt(qryParam.get("record_id").toString());
		int h_id=Integer.parseInt(qryParam.get("h_id").toString());
		int access_status=Integer.parseInt(qryParam.get("access_status").toString());
		respMap.put("record_id", record_id);
		respMap.put("h_id", h_id);
		respMap.put("access_status", access_status);
		return respMap;
	}
	/**
	 * 获取准入流水状态
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="/getAccessRecord.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getAccessRecord(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<AccessRecord>list=arService.getAccessRecordList(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
	/**
	 * 删除准入资料主要销售产品及品牌
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="/delAccessGoods.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> delAccessGoods(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		agService.deleteAccessApplicationGoodses(qryParam);
		return respMap;
	}
	/**
	 * 删除准入资料主要原材料及品牌
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="/delAccessMateial.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> delAccessMateial(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		amService.deleteAccessApplicationMaterials(qryParam);
		return respMap;
	}
	/**
	 * 删除准入资料主要竞争对手
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="/delAccessCompetitor.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> delAccessCompetitor(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		acService.deleteAccessApplicationCompetitors(qryParam);
		return respMap;
	}
	/**
	 * 删除准入资料主要客户
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="/delAccessCustomer.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> delAccessCustomer(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		auService.deleteAccessApplicationCustomers(qryParam);
		return respMap;
	}
	/**
	 * 删除准入资料设备清单
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="/delAccessDevicelist.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> delAccessDevicelist(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		adService.deleteAccessApplicationDevicelists(qryParam);
		return respMap;
	}
	/**
	 * 获取审核意见
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="/getAuthOpinions.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getAuthOpinions(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<AdmittanceAudit> admittanceAudits=ayService.getAdmittanceAuditById(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, admittanceAudits);
		return respMap;
	}
	/**
	 * 获取供应品类
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="/getAccessApplicationCategoryList.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getAccessApplicationCategoryList(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<AccessApplicationCategory>list=aeService.getAccessApplicationCategoryList(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
	/**
	 * 获取供应品类
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="/getAccessApplicationCategoryStr.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getAccessApplicationCategoryStr(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		String str=aeService.getAccessApplicationCategoryStr(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, str);
		return respMap;
	}
	/**
	 * 删除供应品类
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="/delAccessApplicationCategory.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> delAccessApplicationCategory(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		aeService.deleteAccessApplicationCategorys(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, true);
		return respMap;
	}
	/**
	 * 添加供应品类
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="/addAccessApplicationCategory.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> addAccessApplicationCategory(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		aeService.addAccessApplicationCategory(qryParam);
		return respMap;
	}
	/**
	 * 添加供应品类
	 * yukai
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="/addAccessApplicationCategorys.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> addAccessApplicationCategorys(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		aeService.addAccessApplicationCategorys(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, true);
		return respMap;
	}
	/**
	 * @Description:保存所有信息
	 * AccessApplicationCtrl
	 * saveAllInfo
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-8-17 下午3:23:33
	 */
	@RequestMapping(value="/saveAllInfo.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> saveAllInfo(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		aiService.saveAllInfo(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, true);
		return respMap;
	}
	/**
	 * @Description:更新平台其他信息
	 * AccessApplicationCtrl
	 * updatePlatformOtherInfo
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-8-29 上午11:04:22
	 */
	@RequestMapping(value="/updatePlatformOtherInfo.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> updatePlatformOtherInfo(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		aiService.updatePlatformOtherInfo(qryParam);
		return respMap;
	}
	/**
	 * @Description:获取准入通过的时间
	 * AccessApplicationCtrl
	 * getPassTime
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-9-8 上午10:47:40
	 */
	@RequestMapping(value="/getPassTime.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getPassTime(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		/*List<CustomerFiles> customerFiles=cfService.getCustomerFilesList(qryParam);
		if (customerFiles.size()>0) {
			CustomerFiles customer=customerFiles.get(0);
			Date passTime=customer.getAuth_dt();
			respMap.put(Const.AJAX_DATA_ROOT, passTime);
		}*/
		Date passTime=cfService.getPassTime(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, passTime);
		return respMap;
	}
}
