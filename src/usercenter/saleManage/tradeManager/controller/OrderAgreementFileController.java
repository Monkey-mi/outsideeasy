package usercenter.saleManage.tradeManager.controller;

import java.io.InputStream;
import java.io.OutputStream;
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

import com.mongodb.gridfs.GridFSDBFile;

import common.mongodb.service.FileOptService;
import common.user.model.LoginAccount;

import usercenter.saleManage.tradeManager.model.OrderAgreementFile;
import usercenter.saleManage.tradeManager.model.OrderAttchedFile;
import usercenter.saleManage.tradeManager.service.OrderAgreementFileService;
import usercenter.saleManage.tradeManager.service.OrderAttchedFileService;
import util.Const;
import util.SessionUtil;
import util.WebUtil;
import util.annotation.DocLogger;

@Controller
@RequestMapping("orderAgreementFile")
public class OrderAgreementFileController {
	@Autowired
	private OrderAgreementFileService service;
	@Autowired
	private OrderAttchedFileService orderAttchedFileService;
	@Autowired
	private FileOptService fileService;
	@Autowired
	private CompanyForPlateFormService companyForPlateFormService;
	
	@RequestMapping(value = { "/purchaseOrderVideoView" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_purchaseOrderVideoView(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/purchaseManage/tradeManage/orderVideoView");
		return modelAndView;
	}
	@RequestMapping(value = { "/purchaseOrderImgView" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_purchaseOrderImgView(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/purchaseManage/tradeManage/orderImgView");
		return modelAndView;
	}
	@RequestMapping(value = { "/saleOrderVideoView" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_saleOrderVideoView(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/saleManage/tradeManage/orderVideoView");
		return modelAndView;
	}
	@RequestMapping(value = { "/saleOrderImgView" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_saleOrderImgView(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/saleManage/tradeManage/orderImgView");
		return modelAndView;
	}

	/**
	 * 上传订单回签合同附件
	 * @param file
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-08-22
	 */
	@DocLogger(explain="上传订单回签合同附件")
	@RequestMapping(value="/addOrderArgeementFile.do",method=RequestMethod.POST)
	@ResponseBody 
	public String addOrderArgeementFile(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> params=new HashMap<String, Object>();
		JSONObject json = new JSONObject();    	
    	/*
    	 * 1.检查参数
    	 */
		if(WebUtil.isEmpty(request.getParameter("pur_order_id"))){//获取任务id
			json.put("message", "未指定订单");
			json.put("success", false);
			return json.toString() ;		
		}
		/*
		 *2.赋值 
		 */
		int pur_order_id = Integer.parseInt(request.getParameter("pur_order_id"));
		OrderAgreementFile orderAgreementFile = new OrderAgreementFile();
		orderAgreementFile.setPur_order_id(pur_order_id);	
		/*
		 * 3.对文件信息的处理
		 */
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request; 
        if(WebUtil.isEmpty((CommonsMultipartFile) multipartRequest   
                .getFile("file"))){
			json.put("message", "没有文件");
			json.put("success", false);
			return json.toString() ;
		}
        CommonsMultipartFile file = (CommonsMultipartFile) multipartRequest   
                .getFile("file");   //对应前台文件对象   
       
      
        if(file!=null && file.getSize()>0){
        	if (file.getSize() >10*1024*1024) {
				json.put("message", "合同文件太大，超过10M");
				json.put("success", false);
				return json.toString() ;	
			} 
	        
            String originalName=file.getOriginalFilename();
            if(originalName.indexOf(",")>0){
            	json.put("message", "合同文件名中存在非法字符(英文逗号),请先去除后上传");
				json.put("success", false);
				return json.toString() ;
            }
            String filename =file.getOriginalFilename().substring(0, originalName.indexOf("."));//获取文件名
           if( filename.length()>80){
        	    json.put("message", "合同文件名过长，超过80个字符");
				json.put("success", false);
				return json.toString();
           }  
           LoginAccount loginAccount=SessionUtil.getCurrentPlateLoginAccount();
           params.put(Const.ISIMG, 0);
           params.put(Const.USE_TYPE, 40);
           params.put(Const.USERNAME, loginAccount.getLogin_name());
           params.put(Const.COM_ID, qryParam.get("companyId"));
           params.put(Const.COM_NAME,companyForPlateFormService.getCompanyNameByCompanyId(qryParam));
            boolean flag=false;//默认不 是图片
            //获取文件后缀，与传过来的参数file_name重新组装文件名
            if(originalName.indexOf(".")>0){//有后缀  XX.jpg  XX.RAR
            	String this_suffix=originalName.substring(originalName.lastIndexOf(".")); 
            	for(String suffix:Const.agreementArray){           	           	
            		if(suffix.equalsIgnoreCase(this_suffix)){
            			flag=true;
                    }
            	}
            	for(String suffix:Const.imgArray){           	           	
            		if(suffix.equalsIgnoreCase(this_suffix)){
            			params.put(Const.ISIMG, 1);
            			break;
                    }
            	}
            	
            }
            orderAgreementFile.setAgreement_name(filename);
            orderAgreementFile.setSuffix_name(originalName.substring(originalName.lastIndexOf(".")));
            if(!flag){
        		json.put("message", "合同的格式必须为pdf格式");
        		json.put("success", false);
				return json.toString() ;
        	}else{  
        		boolean argee = Boolean.parseBoolean(request.getParameter("argee").toString());
        		int count = service.getOrderAgreementFileCount(orderAgreementFile);
        		if(count>0 && argee==false){
        		json.put("message", "回签合同已经上传");
            	json.put("success", false);
    			return json.toString() ;
        		}else{
        		Map<String,Object> map = service.addOrderAgreementFile(orderAgreementFile,file,params);//获取存入信息的id         	     
	            json.put("message", "上传成功"); 
	            json.put("success", true);
	            json.put("agreement_id",map.get("agreement_id")); 
	            json.put("filename",map.get("filename")); 
	            json.put("suffix_name",map.get("suffix_name")); 
        		}
        	}
        }else{
        	json.put("message", "文件不存在");
        	json.put("success", false);
        }
        return json.toString();
}
	/**
	 * 上传终止文件
	 * @param file
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-08-22
	 */
	@DocLogger(explain="上传终止文件")
	@RequestMapping(value="/addOrderStopFile.do",method=RequestMethod.POST)
	@ResponseBody 
	public String addOrderStopFile(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> params=new HashMap<String, Object>();
		JSONObject json = new JSONObject();    	
    	/*
    	 * 1.检查参数
    	 */
		if(WebUtil.isEmpty(request.getParameter("pur_order_id"))){//获取任务id
			json.put("message", "未指定订单");
			json.put("success", false);
			return json.toString() ;		
		}
		/*
		 *2.赋值 
		 */
		int pur_order_id = Integer.parseInt(request.getParameter("pur_order_id"));
		OrderAttchedFile orderAttchedFile = new OrderAttchedFile();
		orderAttchedFile.setPur_order_id(pur_order_id);	
		/*
		 * 3.对文件信息的处理
		 */
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request; 
        if(WebUtil.isEmpty((CommonsMultipartFile) multipartRequest   
                .getFile("file"))){
			json.put("message", "没有文件");
			json.put("success", false);
			return json.toString() ;
		}
        CommonsMultipartFile file = (CommonsMultipartFile) multipartRequest   
                .getFile("file");   //对应前台文件对象   
       
      
        if(file!=null && file.getSize()>0){
        	if (file.getSize() >10*1024*1024) {
				json.put("message", "文件太大，超过10M");
				json.put("success", false);
				return json.toString() ;	
			} 
	        
            String originalName=file.getOriginalFilename();
            if(originalName.indexOf(",")>0){
            	json.put("message", "文件名中存在非法字符(英文逗号),请先去除后上传");
				json.put("success", false);
				return json.toString() ;
            }
            String filename =file.getOriginalFilename().substring(0, originalName.indexOf("."));//获取文件名
           if( filename.length()>40){
        	    json.put("message", "文件名过长，超过40个字符");
				json.put("success", false);
				return json.toString();
           }      
           LoginAccount loginAccount=SessionUtil.getCurrentPlateLoginAccount();
           params.put(Const.ISIMG, 0);
           params.put(Const.USE_TYPE, 38);
           params.put(Const.USERNAME, loginAccount.getLogin_name());
           params.put(Const.COM_ID, qryParam.get("companyId"));
           params.put(Const.COM_NAME,companyForPlateFormService.getCompanyNameByCompanyId(qryParam));
            boolean flag=true;//默认不 是图片
            //获取文件后缀，与传过来的参数file_name重新组装文件名
//            if(originalName.indexOf(".")>0){//有后缀  XX.jpg  XX.RAR
//            	String this_suffix=originalName.substring(originalName.lastIndexOf("."));            	
//            		if(".pdf".equalsIgnoreCase(this_suffix)){
//            			flag=true;
//                    }
//            }
            if(originalName.indexOf(".")>0){//有后缀  XX.jpg  XX.RAR
            	String this_suffix=originalName.substring(originalName.lastIndexOf(".")); 
            	for(String suffix:Const.imgArray){           	           	
            		if(suffix.equalsIgnoreCase(this_suffix)){
            			params.put(Const.ISIMG, 1);
            			break;
                    }
            	}
            	
            }
            orderAttchedFile.setOrder_attched_name(filename);
            orderAttchedFile.setSuffix_name(originalName.substring(originalName.lastIndexOf(".")));
            if(!flag){
        		json.put("message", "文件的格式必须为pdf格式");
        		json.put("success", false);
				return json.toString() ;
        	}else{    
        		int count = orderAttchedFileService.addOrderAttchedFileCount(orderAttchedFile);//(orderAgreementFile);
        		if(count>0){
        		json.put("message", "文件已经上传");
            	json.put("success", false);
    			return json.toString() ;
        		}else{
        		Map<String,Object> map = orderAttchedFileService.addOrderAttchedFile(orderAttchedFile,file,params);//获取存入信息的id         	     
	            json.put("message", "上传成功"); 
	            json.put("success", true);
	            json.put("order_attched_id",map.get("order_attched_id")); 
	            json.put("filename",map.get("filename")); 
	            json.put("suffix_name",map.get("suffix_name")); 
        		}
        	}
        }else{
        	json.put("message", "文件不存在");
        	json.put("success", false);
        }
        return json.toString();
}
	
	/**
	 * 删除合同文件
	* @Description:
	* OrderAgreementFileController
	* deleteOrderAgreementFile
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-8-22 下午3:12:57
	 */
	@RequestMapping(value="/deleteOrderAgreementFile.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> deleteOrderAgreementFile(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("agreement_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "删除时,合同为空！联系管理员");
			return respMap;
		}
		service.deleteOrderAgreementFile(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		return respMap;
	}
	/**
	 * 根据订单ID查询出回签合同
	* @Description:
	* OrderAgreementFileController
	* getOrderAgreementFileforId
	* @param request
	* @param response
	* @return orderAgreementFile
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-8-22 下午4:06:27
	 */
	@RequestMapping(value="/getOrderAgreementFileforId.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getOrderAgreementFileforId(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单！联系管理员");
			return respMap;
		}
		OrderAgreementFile orderAgreementFile = service.getOrderAgreementFileforId(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_DATA_ROOT,orderAgreementFile);
		return respMap;
	}
	/**
	 *  查询出要下载的合同文件（唯一）
	* @Description:
	* OrderAgreementFileController
	* getOrderAgreementFileforId
	* @param request
	* @param response
	* @return orderAgreementFile
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-8-24 下午4:06:27
	 */
	@RequestMapping(value="/getOrderAgreementFileforOne.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getOrderAgreementFileforOne(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单！联系管理员");
			return respMap;
		}
		if(WebUtil.isEmpty(qryParam.get("agreement_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定合同！联系管理员");
			return respMap;
		}
		OrderAgreementFile orderAgreementFile = service.getOrderAgreementFileforOne(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_DATA_ROOT,orderAgreementFile);
		return respMap;
	}
	/**
	 *  查询出要下载的文件（唯一）
	* @Description:
	* OrderAgreementFileController
	* getOrderAgreementFileforId
	* @param request
	* @param response
	* @return orderAgreementFile
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-8-24 下午4:06:27
	 */
	@RequestMapping(value="/getOrderAttchedFileListSub.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getOrderAttchedFileListSub(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("order_attched_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定文件！联系管理员");
			return respMap;
		}
		OrderAttchedFile orderAttchedFile = orderAttchedFileService.getOrderAttchedFileListSub(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_DATA_ROOT,orderAttchedFile);
		return respMap;
	}
	/**
	 * 根据订单ID查询出文件
	* @Description:
	* OrderAgreementFileController
	* getOrderAgreementFileforId
	* @param request
	* @param response
	* @return orderAgreementFile
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-8-24 下午4:06:27
	 */
	@RequestMapping(value="/getOrderAttchedFileForSub.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getOrderAttchedFileForSub(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单！联系管理员");
			return respMap;
		}
		qryParam.put("is_look",1);
		List<OrderAttchedFile> list = orderAttchedFileService.getOrderAttchedFileForSub(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_DATA_ROOT,list);
		return respMap;
	}
	/**
	 * 外协根据订单ID查询出文件
	* @Description:
	* OrderAgreementFileController
	* getOrderAgreementFileforId
	* @param request
	* @param response
	* @return orderAgreementFile
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-8-24 下午4:06:27
	 */
	@RequestMapping(value="/getOrderAttchedFileForOut.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getOrderAttchedFileForOut(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单！联系管理员");
			return respMap;
		}
		qryParam.put("is_look",0);
		List<OrderAttchedFile> list = orderAttchedFileService.getOrderAttchedFileForSub(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_DATA_ROOT,list);
		return respMap;
	}
	/**
	 * 下载文件接口
	 * @param request
	 * @param response
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-08-24
	 */
	@RequestMapping(value="/downLoadFileFormMongoForSub.do",method=RequestMethod.GET)
	@ResponseBody
	public  void downLoadFileFormMongoForProducer(HttpServletRequest request,HttpServletResponse response ) throws Exception {
		
		String filename=request.getParameter("file");
		GridFSDBFile file = fileService.retrieveFileOne("fs", filename);
		InputStream in = file.getInputStream();
		filename=(String) file.get("aliases");
		String fileName = filename;	
		filename=filename.replace(" ", ""); 
		/* 根据request的locale 得出可能的编码，中文操作系统通常是gb2312 */
		fileName = new String(filename.getBytes("GB2312"), "ISO_8859_1");
		filename = fileName;		
		response.setContentType(file.getContentType());			
	    response.setHeader("Content-Disposition", "attachment;filename="
                + filename);
	    OutputStream out = response.getOutputStream();
	    byte[] buffer = new byte[2048];
        int i = -1;
        while ((i = in.read(buffer)) != -1) {
            out.write(buffer, 0, i);
        }    
        in.close();
        out.flush();
        out.close();
	}
	/**
	 * 读取视频的接口
	* @Description:
	* OrderAgreementFileController
	* downLoadFileFormMongo
	* @param request
	* @param response
	* @throws Exception void
	* @author chenlong
	* 2016-9-22 上午10:32:31
	 */
	@RequestMapping(value="/downLoadFileFormMongo.do",method=RequestMethod.GET)
	@ResponseBody
	public  void downLoadFileFormMongo(HttpServletRequest request,HttpServletResponse response ) throws Exception {
		String filename=request.getParameter("file");
		GridFSDBFile file = fileService.retrieveFileOne("fs", filename);
		InputStream in = file.getInputStream();
		filename=(String) file.get("aliases");
		String fileName = filename;
		filename=filename.replace(" ", ""); 
		   /* 根据request的locale 得出可能的编码，中文操作系统通常是gb2312 */
		fileName = new String(filename.getBytes("GB2312"), "ISO_8859_1");
		filename = fileName;
//		for(String name:list){
//			filename=name;
//			System.out.println(name);
//		}
		response.setContentType(file.getContentType());
	    response.setHeader("Content-Disposition", "attachment;filename="
                + filename);
	    OutputStream out = response.getOutputStream();
	    byte[] buffer = new byte[2048];
        int i = -1;
        while ((i = in.read(buffer)) != -1) {
            out.write(buffer, 0, i);
        }
        
        in.close();
        out.flush();
        out.close();
	}
	/**
	 * 预览pdf文件的接口
	 * @param request
	 * @param response
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-08-24
	 */
	@RequestMapping(value="/downOnlineFileFormMongoForSub.do",method=RequestMethod.GET)
	@ResponseBody
	public  void downOnlineFileFormMongoForSub(HttpServletRequest request,HttpServletResponse response ) throws Exception {
		
		String filename=request.getParameter("file");
		GridFSDBFile file = fileService.retrieveFileOne("fs", filename);
		InputStream in = file.getInputStream();
		filename=(String) file.get("aliases");
		String fileName = filename;
		filename=filename.replace(" ", ""); 
		/* 根据request的locale 得出可能的编码，中文操作系统通常是gb2312 */
		fileName = new String(filename.getBytes("GB2312"), "ISO_8859_1");
		filename = fileName;
		
		response.setContentType(file.getContentType());
	    response.setHeader("Content-Disposition", "filename="
                + filename);
	    OutputStream out = response.getOutputStream();
	    byte[] buffer = new byte[2048];
        int i = -1;
        while ((i = in.read(buffer)) != -1) {
            out.write(buffer, 0, i);
        }    
        in.close();
        out.flush();
        out.close();
	}
	/**
	 *销售方 根据订单ID查询出合同
	* @Description:
	* OrderAgreementFileController
	* getOrderAgreementFileforId
	* @param request
	* @param response
	* @return orderAgreementFile
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-8-24 下午4:06:27
	 */
	@RequestMapping(value="/getOrderAgreementFileForSub.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getOrderAgreementFileForSub(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单！联系管理员");
			return respMap;
		}
		List<OrderAgreementFile> list = service.getOrderAgreementFileForSub(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_DATA_ROOT,list);
		return respMap;
	}
	/**
	 *外协方 根据订单ID查询出合同
	* @Description:
	* OrderAgreementFileController
	* getOrderAgreementFileforId
	* @param request
	* @param response
	* @return orderAgreementFile
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-8-24 下午4:06:27
	 */
	@RequestMapping(value="/getOrderAgreementFileForOut.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getOrderAgreementFileForOut(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单！联系管理员");
			return respMap;
		}
		List<OrderAgreementFile> list = service.getOrderAgreementFileForSub(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_DATA_ROOT,list);
		return respMap;
	}
	/**
	 *查询出终止文件
	* @Description:
	* OrderAgreementFileController
	* getOrderAgreementFileforId
	* @param request
	* @param response
	* @return orderAgreementFile
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-8-24 下午4:06:27
	 */
	@RequestMapping(value="/getOrderAttchedFileForOne.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getOrderAttchedFileForOne(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单！联系管理员");
			return respMap;
		}
		OrderAttchedFile orderAttchedFile = orderAttchedFileService.getOrderAttchedFileForOne(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_DATA_ROOT,orderAttchedFile);
		return respMap;
	}
	/**
	 *查询出其他文件
	* @Description:
	* OrderAgreementFileController
	* getOrderAttchedFileForOneOther
	* @param request
	* @param response
	* @return orderAgreementFile
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-9-19 下午4:06:27
	 */
	@RequestMapping(value="/getOrderAttchedFileForOneOther.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getOrderAttchedFileForOneOther(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单！联系管理员");
			return respMap;
		}
		OrderAttchedFile orderAttchedFile = orderAttchedFileService.getOrderAttchedFileForOneOther(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_DATA_ROOT,orderAttchedFile);
		return respMap;
	}
	/**
	 * 更新终止的文件状态为不可用
	* @Description:
	* OrderAgreementFileController
	* updateOrderAttchedFileForStop
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-9-19 上午9:28:47
	 */
	@RequestMapping(value="/updateOrderAttchedFileStop.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> updateOrderAttchedFileStop(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("order_attched_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定文件！联系管理员");
			return respMap;
		}
		 orderAttchedFileService.updateOrderAttchedFileStop(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		return respMap;
	}
	/**
	 * 查询出图片集
	* @Description:
	* OrderAgreementFileController
	* getOrderAttchedFileForList
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-9-21 下午6:36:18
	 */
	@RequestMapping(value="/getOrderAttchedFileForImage.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getOrderAttchedFileForList(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定文件！联系管理员");
			return respMap;
		}
		qryParam.put("ft_id",35);
		List<OrderAttchedFile> list = orderAttchedFileService.getOrderAttchedFileForList(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
	/**
	 * 查询出视频集
	* @Description:
	* OrderAgreementFileController
	* getOrderAttchedFileForVideo
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-9-22 上午10:04:31
	 */
	@RequestMapping(value="/getOrderAttchedFileForVideo.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getOrderAttchedFileForVideo(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("pur_order_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定文件！联系管理员");
			return respMap;
		}
		qryParam.put("ft_id",37);
		List<OrderAttchedFile> list = orderAttchedFileService.getOrderAttchedFileForList(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
}
