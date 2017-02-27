package usercenter.saleManage.deliveryManage.controller;

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

import common.mongodb.service.FileOptService;
import common.user.model.LoginAccount;

import usercenter.saleManage.deliveryManage.model.DeliveryRegister;
import usercenter.saleManage.deliveryManage.response.DeliveryRegisterDetailVo;
import usercenter.saleManage.deliveryManage.service.DeliveryAttachedService;
import usercenter.saleManage.deliveryManage.service.DeliveryRegisterDetailsService;
import usercenter.saleManage.deliveryManage.service.DeliveryRegisterService;
import util.Const;
import util.SessionUtil;
import util.WebUtil;
import util.annotation.DocLogger;


@Controller
@RequestMapping("deliveryRegister")
public class DeliveryRegisterCtrl {
	@Autowired
	private DeliveryRegisterService drService;
	@Autowired
	private DeliveryAttachedService daService;
	@Autowired
	private DeliveryRegisterDetailsService drdService;
	@Autowired
	private FileOptService fileService;
	@Autowired
	private CompanyForPlateFormService companyForPlateFormService;
	
	/**
	 * @Description:跳转送货登记页面
	 * DeliveryRegisterCtrl
	 * gojsp_deliveryRegister
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-15 上午9:02:48
	 */
	@RequestMapping(value = { "/deliveryRegister" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_deliveryRegister(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/saleManage/deliveryManage/deliveryRegister");
		return modelAndView;
	}
	
	/**
	 * @Description:跳转送货记录页面
	 * DeliveryRegisterCtrl
	 * gojsp_deliveryRecord
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-15 上午9:02:53
	 */
	@RequestMapping(value = { "/deliveryRecord" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_deliveryRecord(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/purchaseManage/deliveryManage/deliveryRecord");
		return modelAndView;
	}
	
	/**
	 * @Description:根据供应商ID查询所有的合同编号
	 * QualityFeedbackCtrl
	 * getPurchaseOrderList
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-8-22 上午11:40:52
	 */
	@RequestMapping(value="/getAgreementNumByID.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getAgreementNumByID(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<DeliveryRegisterDetailVo>list=drdService.getAgreementNumByID(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
	/**
	 * @Description:上传送货单
	 * DeliveryRegisterCtrl
	 * uploadDeliveryAttached
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-8-24 上午9:02:49
	 */
	@DocLogger(explain="上传送货单")
	@RequestMapping(value="/uploadDeliveryAttached.do",method=RequestMethod.POST)
	@ResponseBody
	public String uploadAccessApplicationAttched(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object>params=new HashMap<String, Object>();
		LoginAccount regAccount = SessionUtil.getCurrentPlateLoginAccount();
		JSONObject json = new JSONObject();
    	json.put("success", true);
		/*
		 *2.赋值 
		 */
		
		String fileName = request.getParameter("fileName");
		int file_type_id = Integer.parseInt(request.getParameter("file_type_id"));
		
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
            params.put(Const.USE_TYPE, file_type_id);
            params.put(Const.USERNAME, regAccount.getLogin_name());
            params.put(Const.COM_ID, qryParam.get("companyId"));
            params.put(Const.COM_NAME,companyForPlateFormService.getCompanyNameByCompanyId(qryParam));
            boolean flag=false;//默认不 是图片
            //获取文件后缀，与传过来的参数file_name重新组装文件名
            if(originalName.indexOf(".")>0){//有后缀  XX.jpg  XX.RAR
            	this_suffix=originalName.substring(originalName.lastIndexOf("."));
            	
            	String[] format = new String[Const.imgArray.length+Const.otherArray.length];
            	System.arraycopy(Const.imgArray, 0, format, 0, Const.imgArray.length);  
            	System.arraycopy(Const.otherArray, 0, format, Const.imgArray.length, Const.otherArray.length); 
            	for(String suffix:format){
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
        		int id = 0;
	            String mongodbId=fileService.SaveFile(file,params);
	            Map<String, Object> qryParams = new HashMap<String, Object>();
	            qryParams.put("mogodb_id", mongodbId);
	            qryParams.put("file_name", fileName);
	            qryParams.put("suffix_name", this_suffix);
	            qryParams.put("file_type_id", file_type_id);
	            daService.addDeliveryAttached(qryParams);
	            id=Integer.parseInt(qryParams.get("id").toString());
	            json.put("fileId",id);
	            json.put("message", "上传成功");
        	}
        }else{
        	json.put("message", "文件不存在");
        }
        
        return json.toString();
	}
	/**
	 * @Description:删除送货单文件
	 * DeliveryRegisterCtrl
	 * deleteDeliveryAttached
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-8-24 上午9:27:28
	 */
	@RequestMapping(value="/deleteDeliveryAttached.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> deleteDeliveryAttached(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		daService.deleteDeliveryAttached(qryParam);
		return respMap;
	}
	/**
	 * @Description:提交送货单
	 * DeliveryRegisterCtrl
	 * submitDeliveryRegister
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-8-24 上午10:51:36
	 */
	@RequestMapping(value="/submitDeliveryRegister.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> submitDeliveryRegister(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		drService.submitDeliveryRegister(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, true);
		return respMap;
	}
	/**
	 * @Description:查询送货登记列表
	 * DeliveryRegisterCtrl
	 * getDeliveryRegisterList
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-8-24 下午4:16:08
	 */
	@RequestMapping(value="/getDeliveryRegisterList.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getDeliveryRegisterList(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		int nLimit =0,npage =0;
		nLimit =qryParam.get("limit")!=null?Integer.parseInt(qryParam.get("limit").toString()):0;
		npage =qryParam.get("page")!=null?Integer.parseInt(qryParam.get("page").toString()):0;
		int nStart=nLimit*npage;
		qryParam.put("start",nStart);
		List<DeliveryRegister>list=drService.getDeliveryRegisterList(qryParam);
		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL)!=null?qryParam.get(Const.AJAX_SERVICE_TOTAL):0);
		respMap.put(Const.AJAX_SERVICE_CURRENT_PAGE, npage);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
	/**
	 * @Description:删除送货登记记录
	 * DeliveryRegisterCtrl
	 * deleteDeliveryRegister
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-8-25 上午9:05:30
	 */
	@RequestMapping(value="/deleteDeliveryRegister.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> deleteDeliveryRegister(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		drService.deleteDeliveryRegister(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, true);
		return respMap;
	}
}
