package manager.webPublish.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import manager.common.user.model.UserInfo;
import manager.webPublish.service.WebContentFileService;
import manager.webPublish.service.WebContentModuleService;
import manager.webPublish.service.WebPublishService;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import common.mongodb.service.FileOptService;

import util.Const;
import util.SessionUtil;
import util.WebUtil;
import util.annotation.DocLogger;

@Controller
@RequestMapping("webPublish")
public class WebPublishController {
	@Autowired
	private WebPublishService webPublishService;
	@Autowired
	private WebContentFileService webContentFileService;
	@Autowired
	private WebContentModuleService webContentModuleService;
	@Autowired
	private FileOptService fileService;
	
	@RequestMapping(value="/webPublish.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> webPublish(HttpServletRequest request,HttpServletResponse response) throws Exception{
		
		return WebUtil.DynamicCallCURD(request,response,webPublishService);
	}
	
	@RequestMapping(value="/WebContentModule.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> WebContentModule(HttpServletRequest request,HttpServletResponse response) throws Exception{
		
		return WebUtil.DynamicCallCURD(request,response,webContentModuleService);
	}
	/**
	 * @Description:获取页面HTML
	 * WebPublishController
	 * getHtml
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-11-4 上午8:49:33
	 */
	@RequestMapping(value="/getHtml.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getHtml(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		String htmlString=webPublishService.getHtml(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, htmlString);
		return respMap;
	}
	/**
	 * @Description:后台公告和网页上传图片
	 * WebPublishController
	 * uploadImage
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception String
	 * @author yukai
	 * 2016-11-4 上午8:50:39
	 */
	@DocLogger(explain="后台公告和网页上传图片")
	@RequestMapping(value="/uploadImage.do",method = RequestMethod.POST)
    @ResponseBody
    public String uploadImage(HttpServletRequest request,HttpServletResponse response) throws Exception {
    	//Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object>params=new HashMap<String, Object>();
		UserInfo userInfo = (UserInfo)SessionUtil.getAttribute(Const.SESSION_USER);
		JSONObject json = new JSONObject();
    	json.put("success", true);
    	/*
    	 * 1.检查参数
    	 */
		/*
		 *2.赋值 
		 */
		String formatType = "image";
		/*
		 * 3.对文件信息的处理
		 */
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request; 
        if(WebUtil.isEmpty((CommonsMultipartFile) multipartRequest.getFile("imgFile"))){
			json.put("message", "没有文件");
			return json.toString() ;
		}
        CommonsMultipartFile file = (CommonsMultipartFile) multipartRequest.getFile("imgFile");   //对应前台文件对象   
        if(file!=null && file.getSize()>0){//检查文件大小和格式
        	if (file.getSize() >5*1024*1024) {
				json.put("message", "文件太大，超过5M");
				return json.toString() ;
			} 
	        
            String originalName=file.getOriginalFilename();
            String this_suffix="";
            params.put(Const.ISIMG, 0);
            params.put(Const.USE_TYPE, 47);
            params.put(Const.USERNAME, userInfo.getLogin_id());
            params.put(Const.COM_ID, 0);
            params.put(Const.COM_NAME,"");
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
        		String mongodbId=fileService.SaveFile(file,params);
        		json.put("error", 0);
        		json.put("url", "/PfTaskFileCtrl/downLoadFileFormMongo.do?fileId=" + mongodbId);
        		params.put("file_name", originalName);
        		params.put("file_format", this_suffix);
        		params.put("mogodb_id", mongodbId);
        		webContentFileService.addWebContentFile(params);
        		//json.put("mongodbId", mongodbId);
	           // json.put("message", "上传成功");
        	}
        }else{
        	json.put("message", "文件不存在");
        }
        return json.toString();
    }
	/**
	 * @Description:将上传的图片和web_id进行关联
	 * WebPublishController
	 * addWebFiles
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-11-16 上午11:19:42
	 */
	@RequestMapping(value="/addWebFiles.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> addWebFiles(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		webContentFileService.addWebFiles(qryParam);
		return respMap;
	}
}
