package usercenter.externalTask.controller;


import java.awt.Rectangle;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
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

import platform.company.service.CompanyForPlateFormService;

import usercenter.externalTask.model.TaskFile;
import usercenter.externalTask.service.TaskFileService;
import usercenter.externalTask.service.TaskService;
import util.Const;
import util.FFMpegUtil;
import util.ImageHepler;
import util.MyJsonUtil;
import util.SRMStringUtil;
import util.SessionUtil;
import util.WebUtil;
import util.annotation.DocLogger;
import util.properties.FFMpeg;

import com.mongodb.gridfs.GridFSDBFile;
import common.mongodb.service.FileOptService;
import common.user.model.LoginAccount;

@Controller
@RequestMapping("taskFile")
public class TaskFileController {
	@Autowired
	private TaskFileService taskFileService;
	@Autowired
	private FileOptService fileService;
	@Autowired
	private TaskService taskservice;
	@Autowired
	private CompanyForPlateFormService companyForPlateFormService;
	
	/**
	* @Description: 上传产品主图
	* @param 
	* @return
	* @throws Exception
	* @author xufeng
	* @date 2016-5-4 
	*/
	@DocLogger(explain="上传一个任务单的产品主图")//日志解释注释*
	@RequestMapping(value="/uploadProductMainPic.do",method=RequestMethod.POST)
	@ResponseBody 
	public String uploadProductMainPic(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object>params=new HashMap<String, Object>();
		LoginAccount regAccount = SessionUtil.getCurrentPlateLoginAccount();
		JSONObject json = new JSONObject();
    	
		if(WebUtil.isEmpty(request.getParameter("t_id"))){//获取任务id
			json.put("message", "没有任务单id");
			json.put("success", false);
			return json.toString();			
		}
		int taskId = Integer.parseInt(request.getParameter("t_id"));
		
		//判断是否有权限操作t_id
		boolean hasPermissoin=taskservice.getPermissoinForSender(qryParam);//判断操作权限
		if(!hasPermissoin){
			json.put(Const.AJAX_SERVICE_SUCCESS,false);
			json.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			json.put(Const.AJAX_SERVICE_MESSAGE, "不是发布任务方，没有操作权限");
			return json.toString() ;
		}
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
        	if (file.getSize() >5*1024*1024) {
				json.put("message", "文件太大，超过5M");
				json.put("success", false);
				return json.toString() ;	
			} 
	        
            String originalName=file.getOriginalFilename();
            if(originalName.indexOf(",")>0){
            	json.put("message", "文件名中存在非法字符(英文逗号),请先去除后上传");
				json.put("success", false);
				return json.toString() ;
            }
            params.put(Const.ISIMG, 0);
            params.put(Const.USE_TYPE, 7);
            params.put(Const.USERNAME, regAccount.getLogin_name());
            params.put(Const.COM_ID, qryParam.get("companyId"));
            params.put(Const.COM_NAME,companyForPlateFormService.getCompanyNameByCompanyId(qryParam));
            boolean flag=false;//默认不 是图片
            //获取文件后缀，与传过来的参数file_name重新组装文件名
            if(originalName.indexOf(".")>0){//有后缀  XX.jpg  XX.RAR
            	String this_suffix=originalName.substring(originalName.lastIndexOf("."));
            	for(String suffix:Const.imgArray){
            		if(suffix.equalsIgnoreCase(this_suffix)){
            			 params.put(Const.ISIMG, 1);
            			flag=true;
            			break;
                    }
            	}          	
            }
            if(!flag){
        		json.put("message", "请按照规定的图片格式上传文件");
        		json.put("success", false);
				return json.toString() ;
        	}else{
        		//先删除旧的产品主图，分别是mongodb和taskFile，再新增新的
        		Map<String,Object> map = taskFileService.updateloadProductMainPic(taskId,file,params);//获取存入信息的id
	           
	            json.put("file_path",map.get("file_path"));
	            json.put("message", "上传成功"); 
	            json.put("success", true);
	            json.put("tf_id",map.get("tf_id")); 
        	}
        }else{
        	json.put("message", "文件不存在");
        	json.put("success", false);
        }
        return json.toString();
	}
	/**
	 * 上传工艺文件的图片文件进mongoDB，并保存文件序列号
	 * @param file
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-18
	 */
	@DocLogger(explain="上传一个任务单的其他图片")//日志解释注释*
	@RequestMapping(value="/addTaskImgFile.do",method=RequestMethod.POST)
	@ResponseBody 
	public String addTaskImgFile(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object>params=new HashMap<String, Object>();
		LoginAccount regAccount = SessionUtil.getCurrentPlateLoginAccount();
		//JSONObject json = new JSONObject();
		Map<String,Object> resmap = WebUtil.getDefaultResponseMap();
    	/*
    	 * 1.检查参数
    	 */
		if(WebUtil.isEmpty(request.getParameter("t_id"))){//获取任务id
			resmap.put("message", "没有任务单id");
			resmap.put("success", false);
			return MyJsonUtil.obj2string(resmap);
			
		}
		if(WebUtil.isEmpty(request.getParameter("file_type"))){//获取任务id
			resmap.put("message", "没有文件类型值");
			resmap.put("success", false);
			return MyJsonUtil.obj2string(resmap);
		}
		/*
		 *2.赋值 
		 */
		int taskId = Integer.parseInt(request.getParameter("t_id"));
		int file_type = Integer.parseInt(request.getParameter("file_type"));
	
		//2.1判断是否有权限操作t_id
		boolean hasPermissoin=taskservice.getPermissoinForSender(qryParam);//判断操作权限
		if(!hasPermissoin){
			resmap.put(Const.AJAX_SERVICE_SUCCESS,false);
			resmap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			resmap.put(Const.AJAX_SERVICE_MESSAGE, "不是发布任务方，没有操作权限");
			return MyJsonUtil.obj2string(resmap);
		}
		TaskFile taskFile = new TaskFile();
		taskFile.setT_id(taskId); 	
		taskFile.setFile_type(file_type);//文件类型值
		
		/*
		 * 3.对文件信息的处理
		 */
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request; 
        if(WebUtil.isEmpty((CommonsMultipartFile) multipartRequest   
                .getFile("file"))){
        	resmap.put("message", "没有文件");
        	resmap.put("success", false);
        	return MyJsonUtil.obj2string(resmap);
		}
        CommonsMultipartFile file = (CommonsMultipartFile) multipartRequest   
                .getFile("file");   //对应前台文件对象   
       
      
        if(file!=null && file.getSize()>0){
        	if (file.getSize() >5*1024*1024) {
        		resmap.put("message", "文件太大，超过5M");
        		resmap.put("success", false);
        		return MyJsonUtil.obj2string(resmap);
			} 
	        
            String originalName=file.getOriginalFilename();
            if(originalName.indexOf(",")>0){
            	resmap.put("message", "文件名中存在非法字符(英文逗号),请先去除后上传");
            	resmap.put("success", false);
            	return MyJsonUtil.obj2string(resmap);
            }
            String filename =file.getOriginalFilename().substring(0, originalName.indexOf("."));//获取文件名
           if( filename.length()>80){
        	   resmap.put("message", "文件名过长，超过80个字符");
        	   resmap.put("success", false);
        	   return MyJsonUtil.obj2string(resmap);
           }            
           params.put(Const.ISIMG, 0);
           params.put(Const.USE_TYPE, file_type);
           params.put(Const.USERNAME, regAccount.getLogin_name());
           params.put(Const.COM_ID, qryParam.get("companyId"));
           params.put(Const.COM_NAME,companyForPlateFormService.getCompanyNameByCompanyId(qryParam));
            boolean flag=false;//默认不 是图片
            //获取文件后缀，与传过来的参数file_name重新组装文件名
            if(originalName.indexOf(".")>0){//有后缀  XX.jpg  XX.RAR
            	String this_suffix=originalName.substring(originalName.lastIndexOf("."));
            	for(String suffix:Const.imgArray){
            		if(suffix.equalsIgnoreCase(this_suffix)){
            			flag=true;
            			 params.put(Const.ISIMG, 1);
            			break;
                    }
            	}          	
            }
            taskFile.setFile_name(filename);
            taskFile.setSuffix_name(originalName.substring(originalName.lastIndexOf(".")));
            if(!flag){
            	resmap.put("message", "请按照规定的图片格式上传文件");
            	resmap.put("success", false);
            	return MyJsonUtil.obj2string(resmap);
        	}else{
        		Map<String,Object> map = taskFileService.addTaskFile(taskFile,file,params);//获取存入信息的id
        		resmap.put("file_path",map.get("file_path"));   
	            resmap.put("message", "上传成功"); 
	            resmap.put("success", true);
	            resmap.put("tf_id",map.get("tf_id")); 
	            resmap.put("filename",map.get("filename"));
	            resmap.put("file_time", map.get("file_time"));
        	}
        }else{
        	resmap.put("message", "文件不存在");
        	resmap.put("success", false);
        }
        return MyJsonUtil.obj2string(resmap);
	}
	
	
	/**
	 * 上传其他文件进mongoDB，并保存文件序列号，上传文件的其他各项填写信息
	 * @param file
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-18
	 */
	@DocLogger(explain="上传一个任务单的其他文件")//日志解释注释*
	@RequestMapping(value="/addTaskOtherFile.do",method=RequestMethod.POST)
	@ResponseBody 
	public String addTaskOtherFile(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object>params=new HashMap<String, Object>();
		LoginAccount regAccount = SessionUtil.getCurrentPlateLoginAccount();		
		Map<String,Object> resmap = WebUtil.getDefaultResponseMap();
    	/*
    	 * 1.检查参数
    	 */
		if(WebUtil.isEmpty(request.getParameter("t_id"))){//获取任务id
			resmap.put("message", "没有任务单id");
			resmap.put("success", false);
			return MyJsonUtil.obj2string(resmap);
		}
		
		boolean hasPermissoin=taskservice.getPermissoinForSender(qryParam);//判断操作权限
		if(!hasPermissoin){
			resmap.put(Const.AJAX_SERVICE_SUCCESS,false);
			resmap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			resmap.put(Const.AJAX_SERVICE_MESSAGE, "不是发布任务方，没有操作权限");
			return MyJsonUtil.obj2string(resmap);
		}
		if(WebUtil.isEmpty(request.getParameter("file_type"))){//获取任务id
			resmap.put("message", "系统错误");
			resmap.put("success", false);
			return MyJsonUtil.obj2string(resmap);
		}
		
		int taskId = Integer.parseInt(request.getParameter("t_id"));
		int file_type = Integer.parseInt(request.getParameter("file_type"));
	
		/*
		 *2. 赋值
		 */
		TaskFile taskFile = new TaskFile();
		taskFile.setT_id(taskId); //任务单id
		taskFile.setFile_type(file_type);//文件类型值	
	
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request; 
        if(WebUtil.isEmpty((CommonsMultipartFile) multipartRequest   
                .getFile("file"))){
        	resmap.put("message", "没有文件");
        	resmap.put("success", false);
        	return MyJsonUtil.obj2string(resmap);
		}
        CommonsMultipartFile file = (CommonsMultipartFile) multipartRequest   
                .getFile("file");   //对应前台文件对象   
           
      /*
       * 3.检查文件大小和格式
       */
        if(file!=null && file.getSize()>0){
        	if (file.getSize() >5*1024*1024) {
        		resmap.put("message", "文件太大，超过5M");
        		resmap.put("success", false);
        		return MyJsonUtil.obj2string(resmap);
			} 
	        
            String originalName=file.getOriginalFilename();  
            if(originalName.indexOf(",")>0){
            	resmap.put("message", "文件名中存在非法字符(英文逗号),请先去除后上传");
            	resmap.put("success", false);
            	return MyJsonUtil.obj2string(resmap);
            }
            String filename =file.getOriginalFilename().substring(0, originalName.indexOf("."));//获取文件名
            if( filename.length()>80){
            	resmap.put("message", "文件名过长，超过80个字符");
            	resmap.put("success", false);
            	return MyJsonUtil.obj2string(resmap);
            } 
            params.put(Const.ISIMG, 0);
            params.put(Const.USE_TYPE, file_type);
            params.put(Const.USERNAME, regAccount.getLogin_name());
            params.put(Const.COM_ID, qryParam.get("companyId"));
            params.put(Const.COM_NAME,companyForPlateFormService.getCompanyNameByCompanyId(qryParam));
            boolean flag=false;//默认不 是图片
            //获取文件后缀，与传过来的参数file_name重新组装文件名
            if(originalName.indexOf(".")>0){//有后缀  XX.jpg  XX.RAR
            	String this_suffix=originalName.substring(originalName.lastIndexOf("."));
            	if(file_type==2){
            	for(String suffix:Const.otherArray){
            		if(suffix.equalsIgnoreCase(this_suffix)){
            			flag=true;
            			break;
                    }
            	}  
            	}else{
            		flag=true;
            	}
            	for(String suffix:Const.imgArray){
            		if(suffix.equalsIgnoreCase(this_suffix)){
            			params.put(Const.ISIMG, 1);
            			break;
                    }
            	}     
            }
            taskFile.setFile_name(filename);
            taskFile.setSuffix_name(originalName.substring(originalName.lastIndexOf(".")));
            if(!flag){
            	resmap.put("message", "请按照规定的格式上传文件");
            	resmap.put("success", false);
            	return MyJsonUtil.obj2string(resmap);
        	}else{
        		/*
        		 * 4.进行信息的处理：
        		 */   
        		
        		 Map<String,Object> map = taskFileService.addTaskFile(taskFile,file,params);//获取存入信息的id
	           
	           // json.put("file_path",map.get("file_path"));   
        		resmap.put("message", "上传成功"); 
        		resmap.put("success", true);
        		resmap.put("tf_id",map.get("tf_id")); 
        		resmap.put("filename",map.get("filename")); 
        		resmap.put("suffix_name",map.get("suffix_name")); 
        		resmap.put("file_time", map.get("file_time"));
        	}
        }else{
        	resmap.put("message", "文件不存在");
        	resmap.put("success", false);
        }
        
        return MyJsonUtil.obj2string(resmap);
	}
	/**
	 * 上传视频文件进mongoDB，并保存文件序列号
	 * @param file
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-18
	 */
	@DocLogger(explain="上传一个任务单的视频文件")//日志解释注释*
	@RequestMapping(value="/addTaskVideoFile.do",method=RequestMethod.POST)
	@ResponseBody 
	public String addTaskVideoFile(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		//JSONObject json = new JSONObject();
		Map<String,Object> resmap = WebUtil.getDefaultResponseMap();
		resmap.put("success", true);
    	/*
    	 * 1.检查参数
    	 */
		if(WebUtil.isEmpty(request.getParameter("t_id"))){//获取任务id
			resmap.put("message", "没有任务单id");
			resmap.put("success", false);
			return MyJsonUtil.obj2string(resmap);
		}
		boolean hasPermissoin=taskservice.getPermissoinForSender(qryParam);//判断操作权限
		if(!hasPermissoin){
			resmap.put(Const.AJAX_SERVICE_SUCCESS,false);
			resmap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			resmap.put(Const.AJAX_SERVICE_MESSAGE, "不是发布任务方，没有操作权限");
			return MyJsonUtil.obj2string(resmap);
		}
		if(WebUtil.isEmpty(request.getParameter("file_type"))){//获取任务id
			resmap.put("message", "没有文件类型值");
			resmap.put("success", false);
			return MyJsonUtil.obj2string(resmap);
		}
		int taskId = Integer.parseInt(request.getParameter("t_id"));
		int file_type = Integer.parseInt(request.getParameter("file_type"));
	
		/*
		 *2. 赋值
		 */
		TaskFile taskFile = new TaskFile();
		taskFile.setT_id(taskId); //任务单id
		taskFile.setFile_type(file_type);//文件类型值	
        /*
         * 3.把文件转化成flv格式，存入mongoDb
         */
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;   
        CommonsMultipartFile file = (CommonsMultipartFile) multipartRequest.getFile("file");   //对应前台文件对象    
        if(file!=null && file.getSize()>0){
        	if (file.getSize() >50*1024*1024) {
        		resmap.put("message", "文件太大，超过50M");
        		resmap.put("success", false);
        		return MyJsonUtil.obj2string(resmap);	
			} 
        }else{
        	resmap.put("message", "文件为空");
        	resmap.put("success", false);
        	return MyJsonUtil.obj2string(resmap);
        }     
		 String filename = file.getOriginalFilename();
		 if(filename.indexOf(",")>0){
			 resmap.put("message", "文件名中存在非法字符(英文逗号),请先去除后上传");
			 resmap.put("success", false);
			 return MyJsonUtil.obj2string(resmap);
         }
		 String filenames =file.getOriginalFilename().substring(0, filename.indexOf("."));//获取文件名
         if( filenames.length()>80){//检查文件名是否过长
        	 resmap.put("message", "文件名过长，超过80个字符");
        	 resmap.put("success", false);
        	 return MyJsonUtil.obj2string(resmap);
         }
       //获取文件后缀，与传过来的参数file_name重新组装文件名   
		 boolean flag=false;//默认不 是视频
		 if(filename.indexOf(".")>0){
        	String this_suffix=filename.substring(filename.lastIndexOf("."));      	
        	for(String suffix:Const.viewArray){
        		if(suffix.equalsIgnoreCase(this_suffix)){
        			flag=true;
        			break;
                }
        	} 
		 }
        	 if(!flag){
        		resmap.put("message", "请按照规定的视频格式上传文件");
        		resmap.put("success", false);
        		return MyJsonUtil.obj2string(resmap);
         	}
         //判断是否可以转化
		boolean canConvertFLV=FFMpegUtil.isConvertFLV(filename);
		String fileType = filename.substring(filename.lastIndexOf(".")); //截取文件格式
		if(!canConvertFLV){
			resmap.put("success", false);
			resmap.put("msg", "无法转换"+fileType+"格式");
			return MyJsonUtil.obj2string(resmap);
		}		
        
		//获取视频转码文件配置信息
    	FFMpeg ffmpeg =FFMpeg.getInstance();
    	//临时文件夹是否存在
		File originvideo_temp_path=new File(ffmpeg.getOriginvideo_temp_path());
		if(!originvideo_temp_path.exists()){
			originvideo_temp_path.mkdirs();
		}
		//重命名，以防重名
		String serialName = SRMStringUtil.getUUID();
		File tempVideoFile = new File(ffmpeg.getOriginvideo_temp_path()+serialName + fileType);
		//将上传的原始文件写入一个临时位置
        InputStream in = file.getInputStream();
        FileOutputStream out =new FileOutputStream(tempVideoFile);
        
        byte[] buf = new byte[1024];
        int len;
        while ((len = in.read(buf)) > 0) {
           out.write(buf, 0, len);
        }
        in.close();
        out.close();
        taskFile.setSuffix_name(filename.substring(filename.lastIndexOf(".")));
        taskFile.setFile_name(filenames);
        Map<String,Object> map = taskFileService.addTaskViewFile(taskFile, tempVideoFile);  
        resmap.put("file_path",map.get("file_path"));   
        resmap.put("message", "上传成功"); 
        resmap.put("success", true);
        resmap.put("tf_id",map.get("tf_id")); 
        resmap.put("filename",map.get("filename")); 
        resmap.put("file_time", map.get("file_time"));
        //删除临时文件
        tempVideoFile.delete();
        return MyJsonUtil.obj2string(resmap);
	}
	/**
	 * 上传任务单终止文件
	 * @param file
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-08-22
	 */
	@RequestMapping(value="/addOTaskStopFile.do",method=RequestMethod.POST)
	@ResponseBody 
	public String addOrderStopFile(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> params=new HashMap<String, Object>();
		JSONObject json = new JSONObject(); 
		boolean hasPermissoin=taskservice.getPermissoinForSender(qryParam);//判断操作权限
		if(!hasPermissoin){
			params.put(Const.AJAX_SERVICE_SUCCESS,false);
			params.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			params.put(Const.AJAX_SERVICE_MESSAGE, "不是发布任务方，没有操作权限");
			return MyJsonUtil.obj2string(params) ;
		}
    	/*
    	 * 1.检查参数
    	 */
		if(WebUtil.isEmpty(request.getParameter("t_id"))){//获取任务id
			json.put("message", "未指定任务单");
			json.put("success", false);
			return json.toString() ;		
		}
		/*
		 *2.赋值 
		 */
		int t_id = Integer.parseInt(request.getParameter("t_id"));
		TaskFile taskFile = new TaskFile();
		taskFile.setT_id(t_id);	
		/*
		 * 3.对文件信息的处理
		 */
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request; 
        if(WebUtil.isEmpty((CommonsMultipartFile) multipartRequest   
                .getFile("file"))){//这个“file”是前端name的value
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
           params.put(Const.USE_TYPE, 48);
           params.put(Const.USERNAME, loginAccount.getLogin_name());
           params.put(Const.COM_ID, qryParam.get("companyId"));
           params.put(Const.COM_NAME,companyForPlateFormService.getCompanyNameByCompanyId(qryParam));
            boolean flag=true;
            if(originalName.indexOf(".")>0){//有后缀  XX.jpg  XX.RAR
            	String this_suffix=originalName.substring(originalName.lastIndexOf(".")); 
            	for(String suffix:Const.imgArray){           	           	
            		if(suffix.equalsIgnoreCase(this_suffix)){
            			params.put(Const.ISIMG, 1);
            			break;
                    }
            	}       	
            }
            taskFile.setFile_name(filename);
            taskFile.setSuffix_name(originalName.substring(originalName.lastIndexOf(".")));
            if(!flag){
        		json.put("message", "文件的格式必须为pdf格式");
        		json.put("success", false);
				return json.toString() ;
        	}else{    
        		int count = taskFileService.getTaskFileCount(taskFile);//(orderAgreementFile);
        		if(count>0){
        		json.put("message", "文件已经上传");
            	json.put("success", false);
    			return json.toString() ;
        		}else{
        		Map<String,Object> map = taskFileService.addOrderAttchedFile(taskFile,file,params);//获取存入信息的id         	     
	            json.put("message", "上传成功"); 
	            json.put("success", true);
	            json.put("tf_id",map.get("tf_id")); 
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
	 * 当任务单为等待派单，发布方 删除一条文件信息，并物理删除mongdb中的文件
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-12
	 */
	@DocLogger(explain="当任务单为等待派单，发布方 删除一条文件信息，并物理删除mongdb中的文件")//日志解释注释*
	@RequestMapping(value="/deleteTaskFile.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> deleteTaskFile(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("tf_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件文件信息ID为空");
			return respMap;
		}
		if(!WebUtil.isEmpty(qryParam.get("t_id"))){	//如果前端没任务单id就不检测				
		boolean hasPermissoin=taskservice.getPermissoinForSender(qryParam);//判断操作权限
		if(!hasPermissoin){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "不是发布任务方，没有操作权限");
			return respMap ;		
		}}
		taskFileService.deleteTaskFile(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "删除成功");
		return respMap;
	}
	/**
	 * 当任务单为派单中和生产中，发布方设置一条文件信息为废弃状态
	 * @param tf_id 文件id 
	 * @param t_id 任务单id
	 * @return
	 * @throws Exception
	 */
	@DocLogger(explain="当任务单为派单中和生产中，发布方设置一条文件信息为废弃状态")//日志解释注释*
	@RequestMapping(value="/updatetaskfile2del.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> updatetaskfile2del(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("tf_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件文件信息ID为空");
			return respMap;
		}
		boolean hasPermissoin=taskservice.getPermissoinForSender(qryParam);//判断操作权限
		if(!hasPermissoin){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "不是发布任务方，没有操作权限");
			return respMap ;
		}
		
		taskFileService.updatetaskfile2del(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "删除成功");
		return respMap;
	}
	/**
	 * 生产方删除一条文件信息，并删除mongdb中的文件
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-12
	 */
	@DocLogger(explain="生产方删除一条文件信息，并删除mongdb中的文件")//日志解释注释*
	@RequestMapping(value="/deleteTaskFileForProducer.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> deleteTaskFileForProducer(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("tf_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件文件信息ID为空");
			return respMap;
		}
		boolean hasPermissoin=taskservice.getPermissoinForProducer(qryParam);//判断操作权限
		if(!hasPermissoin){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "不是生产方，没有操作权限");
			return respMap ;
		}
		
	
		taskFileService.deleteTaskFile(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "删除成功");
		return respMap;
	}
	/**
	 * 运单删除一条文件信息，并删除mongdb中的文件
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-12
	 */
	@RequestMapping(value="/deleteShippingFileForProducer.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> deleteShippingFileForProducer(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();					
		taskFileService.deleteTaskFile(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "删除成功");
		return respMap;
	}
	/**
	 * 修改一条文件信息的文件名,和备注
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-12
	 */
	@DocLogger(explain="修改一条文件信息的文件名,和备注")//日志解释注释*
	@RequestMapping(value="/updateTaskFile.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> updateTaskFile(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("tf_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件文件信息ID为空");
			return respMap;
		}
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		taskFileService.updateTaskFile(qryParam);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "保存成功");
		return respMap;
	}
	/**
	 * 更新指导文件信息
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-27
	 */
	@DocLogger(explain="更新一个任务单的指导文件备注信息")//日志解释注释*
	@RequestMapping(value="/updateTaskFileForRemark.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> updateTaskFileForRemark(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("tf_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件文件信息ID为空");
			return respMap;
		}
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		taskFileService.updateTaskFileForRemark(qryParam);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "保存成功");
		return respMap;
	}
	/**
	 * 外协加载文件
	 * @param request
	 * @param response
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-15
	 */
	@RequestMapping(value="/downLoadFileFormMongo.do",method=RequestMethod.GET)
	@ResponseBody
	public  void downLoadFileFormMongo(HttpServletRequest request,HttpServletResponse response ) throws Exception {
		String filename=request.getParameter("file");
		GridFSDBFile file = fileService.retrieveFileOne("fs", filename);
		if(file != null){
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
	    response.setHeader("Content-Disposition", "attachment;filename=" + filename);
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
	}
	private String tempImagePath=WebUtil.getUpLoadFileRoot()+"tempImage"+File.separator;
	
	@RequestMapping(value="/updateImageByJcrop.do",method=RequestMethod.POST)
	@ResponseBody
	public  Map<String,Object> updateImageByJcrop(HttpServletRequest request,HttpServletResponse response ) throws Exception {
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		//创建文件夹
		File imagePath=new File(tempImagePath);
		if(!imagePath.exists()){
			imagePath.mkdirs();
		}
		//读取文件,并写入临时文件
		String filename=request.getParameter("filename");
		GridFSDBFile file = fileService.retrieveFileOne("fs", filename);
		InputStream old_in = file.getInputStream();
		String ori_name=(String) file.get("aliases");
		String suffix=ori_name.substring(ori_name.lastIndexOf("."));
		File oldFile=new File(tempImagePath+"old_"+filename+suffix);
		oldFile.createNewFile();
		//旧的临时文件
		FileOutputStream old_out =new FileOutputStream(oldFile);
        
        byte[] buf = new byte[1024];
        int len;
        while ((len = old_in.read(buf)) > 0) {
        	old_out.write(buf, 0, len);
        }
        old_in.close();
        old_out.close();
		
		String x = request.getParameter("x");
		String y = request.getParameter("y");
		String w = request.getParameter("w");
		String h = request.getParameter("h");
		String fix_w = request.getParameter("fix_w");
		String fix_h = request.getParameter("fix_h");
		
		int width  = Integer.parseInt(w);
		int height = Integer.parseInt(h);
		int rx = Integer.parseInt(x);
		int ry = Integer.parseInt(y);
		int int_fix_w = Integer.parseInt(fix_w);
		int int_fix_h = Integer.parseInt(fix_h);
		//截取图片并存放到  临时文件
		Rectangle rec = new Rectangle(rx,ry,int_fix_w,int_fix_h);
		File tempFile=new File(tempImagePath+filename+suffix);//因为ImageIO.write必须要有一个输出路径，所以创建临时文件
		ImageHepler.cut(oldFile, tempFile, width, height, rec);
		
		taskFileService.updateOnlyFile(filename, tempFile);
		oldFile.deleteOnExit();
		tempFile.deleteOnExit();
		return respMap;
	}
	/**
	 * 生产加载文件
	 * @param request
	 * @param response
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-15
	 */
	@RequestMapping(value="/downLoadFileFormMongoForProducer.do",method=RequestMethod.GET)
	@ResponseBody
	public  void downLoadFileFormMongoForProducer(HttpServletRequest request,HttpServletResponse response ) throws Exception {
		
		String filename=request.getParameter("file");
		GridFSDBFile file = fileService.retrieveFileOne("fs", filename);
		if(file != null){
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
	}
	/**
	 * 查询出主图和产品图的列表
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-12
	 */
	@RequestMapping(value="/getTaskFileImgListproduct.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskFileImgListproduct(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件文件信息ID为空");
			return respMap;
		}
		if(WebUtil.isEmpty(qryParam.get("file_type"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件文件类型为空");
			return respMap;
		}
		List<TaskFile> list = taskFileService.getTaskFileImgListproduct(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);        
		respMap.put(Const.AJAX_DATA_ROOT,list);
		return respMap;
	}
	/**
	 * 外协查询文件信息列表，
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-12
	 */
	@RequestMapping(value="/getTaskFileList.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskFileList(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件文件信息ID为空");
			return respMap;
		}
		if(WebUtil.isEmpty(qryParam.get("file_type"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件文件类型为空");
			return respMap;
		}
		boolean hasPermissoin=taskservice.getPermissoinForSender(qryParam);//判断操作权限
		if(!hasPermissoin){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "不是发布任务方，没有操作权限");
			return respMap;
		}
		List<TaskFile> list = taskFileService.getTypeTaskFileList(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
        
		respMap.put(Const.AJAX_DATA_ROOT,list);
		return respMap;
	}
	/**
	 * 外协查询文件信息列表，
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-12
	 */
	@RequestMapping(value="/getTaskFileList2.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskFileList2(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件文件信息ID为空");
			return respMap;
		}
		if(WebUtil.isEmpty(qryParam.get("file_type"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件文件类型为空");
			return respMap;
		}
		boolean hasPermissoin=taskservice.getPermissoinForSender(qryParam);//判断操作权限
		if(!hasPermissoin){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "不是发布任务方，没有操作权限");
			return respMap;
		}
		List<TaskFile> list = taskFileService.getTypeTaskFileList2(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
        
		respMap.put(Const.AJAX_DATA_ROOT,list);
		return respMap;
	}
	/**
	 * 生产查询文件信息列表，
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-12
	 */
	@RequestMapping(value="/getTaskFileList2ForProducer.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskFileList2ForProducer(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件文件信息ID为空");
			return respMap;
		}
		boolean hasPermissoin=taskservice.getPermissoinForProducer(qryParam);//判断操作权限
		if(!hasPermissoin){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "不是生产方，没有操作权限");
			return respMap;
		}
		if(WebUtil.isEmpty(qryParam.get("file_type"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件文件类型为空");
			return respMap;
		}
       
		
		List<TaskFile> list = taskFileService.getTypeTaskFileList2(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
        
		respMap.put(Const.AJAX_DATA_ROOT,list);
		return respMap;
	}
	/**
	 * 生产查询文件信息列表，
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-12
	 */
	@RequestMapping(value="/getTaskFileListForProducer.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskFileListForProducer(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件文件信息ID为空");
			return respMap;
		}
		boolean hasPermissoin=taskservice.getPermissoinForProducer(qryParam);//判断操作权限
		if(!hasPermissoin){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "不是生产方，没有操作权限");
			return respMap;
		}
		if(WebUtil.isEmpty(qryParam.get("file_type"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件文件类型为空");
			return respMap;
		}
       
		
		List<TaskFile> list = taskFileService.getTypeTaskFileList(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
        
		respMap.put(Const.AJAX_DATA_ROOT,list);
		return respMap;
	}



/**
 * 外协查询单个文件信息，
 * @param request
 * @param response
 * @return
 * @throws Exception
 * @author chenlong
 * @date 2016-04-12
 */
@RequestMapping(value="/getTaskFile.do",method=RequestMethod.POST)
@ResponseBody 
public Map<String,Object> getTaskFile(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("tf_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件文件信息ID为空");
		return respMap;
	}
	Integer id = Integer.parseInt(qryParam.get("tf_id").toString());

	TaskFile taskFile = taskFileService.getTaskFile(id);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
    
	respMap.put(Const.AJAX_DATA_ROOT,taskFile);
	return respMap;
}

/**
 * 生产查询单个文件信息，
 * @param request
 * @param response
 * @return
 * @throws Exception
 * @author chenlong
 * @date 2016-04-12
 */
@RequestMapping(value="/getTaskFileForProducer.do",method=RequestMethod.POST)
@ResponseBody 
public Map<String,Object> getTaskFileForProducer(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("tf_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件文件信息ID为空");
		return respMap;
	}
	Integer id = Integer.parseInt(qryParam.get("tf_id").toString());

	TaskFile taskFile = taskFileService.getTaskFile(id);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
    
	respMap.put(Const.AJAX_DATA_ROOT,taskFile);
	return respMap;
}
/**
 * 外协查询物流图片列表信息，
 * @param request
 * @param response
 * @return
 * @throws Exception
 * @author chenlong
 * @date 2016-06-23
 */
@RequestMapping(value="/getLogicticsFilelist.do",method=RequestMethod.POST)
@ResponseBody 
public Map<String,Object> getLogicticsFilelist(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("record_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件ID为空");
		return respMap;
	}
	Integer id = Integer.parseInt(qryParam.get("record_id").toString());

	List<TaskFile> taskFiles = taskFileService.getLogicticsFilelist(id);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);    
	respMap.put(Const.AJAX_DATA_ROOT,taskFiles);
	return respMap;
}
/**
 * 导出任务单的列表
* @Description:
* PurchaseOrderController
* downloadSubAccountExcel
* @param request
* @param response
* @throws Exception void
* @author chenlong
* 2016-10-11 上午11:23:38
 */
@DocLogger(explain="将一个任务单的所有文件的放入文件夹内,并生成zip文件打包下来")//日志解释注释*
@RequestMapping(value="/downloadAllTaskFileForZip.do",method=RequestMethod.GET)
@ResponseBody
public  void downloadAllTaskFileForZip(HttpServletRequest request,HttpServletResponse response ) throws Exception {
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	File file = taskFileService.getTaskFileForZIP(qryParam);
	if(file != null){
		String filename=file.getName();
		OutputStream out = null;
	    InputStream in = null;
	    // 获得文件名
	    // 定义输出类型(下载)
	    response.setContentType("application/force-download");
	    response.setHeader("Location", filename);
	
	    // 定义输出文件头
	    response.setHeader("Content-Disposition", "attachment;filename="
	            + filename);
	    out = response.getOutputStream();
	    in = new FileInputStream(file.getPath());
	    BufferedInputStream bin = new BufferedInputStream(in);
	    out = response.getOutputStream();
	    BufferedOutputStream bout = new BufferedOutputStream(out);
	    byte[] buffer = new byte[2048];
	    int i = -1;
	    while ((i = bin.read(buffer,0,2048)) != -1) {
	    	bout.write(buffer, 0, i);
	    }
	    //限速 该方法在用户取消时会报错 
	   // TansferData.limitSpeed(out, in,TansferData.getSpeed500kb(), null, false);
	    bout.flush();
	    in.close();
	    bin.close();
	   // out.flush();
	    out.close();
	    bout.close();
	    // 删除文件,删除前关闭所有的Stream.
	    file.delete();	
	}
}
@DocLogger(explain="重新保存文件,替换原有的文件")//日志解释注释*
@RequestMapping(value="/replaceTaskFile.do",method=RequestMethod.POST)
@ResponseBody 
public String replaceTaskFile(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
	String mogodbId=qryParam.get("mogodbId").toString();
	JSONObject json = new JSONObject();
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
    	if (file.getSize() >5*1024*1024) {
			json.put("message", "文件太大，超过5M");
			json.put("success", false);
			return json.toString() ;	
		} 
        
        String originalName=file.getOriginalFilename();
        if(originalName.indexOf(",")>0){
        	json.put("message", "文件名中存在非法字符(英文逗号),请先去除后上传");
			json.put("success", false);
			return json.toString() ;
        }
        taskFileService.updateOnlyFile(mogodbId, file);
        json.put("message", "替换成功");
    	json.put("success", true);
    }else{
    	json.put("message", "文件不存在");
    	json.put("success", false);
    }  
    return json.toString();
}
/**
 * 查询某个任务单的一种终止文件（1个）
* @Description:
* TaskFileController
* getTaskProhibitFile
* @param request
* @param response
* @return
* @throws Exception Map<String,Object>
* @author chenlong
* 2016-11-22 下午2:25:01
 */
@RequestMapping(value="/getTaskProhibitFile.do",method=RequestMethod.POST)
@ResponseBody
public Map<String,Object>  getTaskProhibitFile(HttpServletRequest request,HttpServletResponse response)  throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	
	if(WebUtil.isEmpty(qryParam.get("t_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件文件信息ID为空");
		return respMap;
	}
	qryParam.put("is_delete", 0);
	TaskFile taskFile = taskFileService.getTaskProhibitFile(qryParam);
	respMap.put(Const.AJAX_SERVICE_SUCCESS, true);    
	respMap.put(Const.AJAX_DATA_ROOT,taskFile);
	return respMap;
}
}


