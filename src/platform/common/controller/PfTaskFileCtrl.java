/**    
 * 文件名：PfTaskFileCtrl.java    
 *    
 * 版本信息：    
 * 日期：2016-4-26    
 * Copyright 足下 Corporation 2016     
 * 版权所有    
 *    
 */
package platform.common.controller;

import java.io.InputStream;
import java.io.OutputStream;
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
import platform.common.service.PfRegisterAttchedService;
import platform.company.service.CompanyForPlateFormService;
import platform.supplierAccess.model.PfUpdateRegisterAttched;
import platform.supplierAccess.service.PfUpdateRegisterAttchedService;
import util.Const;
import util.DataTrans;
import util.SessionUtil;
import util.WebUtil;
import util.annotation.DocLogger;

import com.mongodb.gridfs.GridFSDBFile;
import common.mongodb.service.FileOptService;
import common.user.model.LoginAccount;

/**    
 * mogodb文件上传下载
 * 项目名称：outsideeasy    
 * 类名称：PfTaskFileCtrl    
 * 创建人：mishengliang    
 * 创建时间：2016-4-26 下午1:55:19    
 * 修改人：mishengliang    
 * 修改时间：2016-4-26 下午1:55:19    
 * @version     
 *     
 */
@Controller
@RequestMapping("PfTaskFileCtrl")
public class PfTaskFileCtrl {
	@Autowired
	private PfRegisterAttchedService registerAttchedService;
	@Autowired
	private FileOptService fileService;
	@Autowired
	private PfUpdateRegisterAttchedService updateRegisterAttchedService;
	@Autowired
	private CompanyForPlateFormService companyForPlateFormService;
	
	@RequestMapping(value = { "/companyImageView" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_companyImageView(ModelAndView modelAndView ){
		modelAndView.setViewName("/companyWindow/companyImageView");
		return modelAndView;
	}
	/**
	 * 企业文件上传
	*addOrUpdateTaskImgFile
	*@param request
	*@param response
	*@return
	*@throws Exception
	*String
	*@author mishengliang
	*2016-4-27上午9:55:18
	 */
	@DocLogger(explain="企业文件上传")
	@RequestMapping(value="addOrUpdateTaskImgFile",method=RequestMethod.POST)
	@ResponseBody 
	public String addOrUpdateTaskImgFile(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> params=new HashMap<String, Object>();
		LoginAccount regAccount = SessionUtil.getCurrentPlateLoginAccount();
		JSONObject json = new JSONObject();
    	json.put("success", true);
    	
    	 // 1.检查参数
		if(regAccount == null){//获取任务id
			json.put("message", "未登录");
			return json.toString() ;
		}
		if(WebUtil.isEmpty(request.getParameter("fileType"))){//获取任务id
			json.put("message", "没有文件类型值");
			return json.toString() ;
		}
		
		 //2.赋值 
		int companyId = Integer.parseInt(request.getParameter("companyId"));
		int fileType = Integer.parseInt(request.getParameter("fileType"));
		String fileName = request.getParameter("fileName");
		Integer isUpdate = DataTrans.transToIntegerFromString(request.getParameter("isUpdate"));
		String formatType = request.getParameter("formatType");
		
		PfRegisterAttched pfRegisterAttched = new PfRegisterAttched();
		pfRegisterAttched.setCompany_id(companyId);
		pfRegisterAttched.setFile_type_id(fileType);//文件类型值
		pfRegisterAttched.setFile_name(fileName);//文件名
		
		if(fileName.indexOf(",") != -1){
			json.put("message", "文件名中存在非法字符(英文逗号),请先去除后上传");
			return json.toString() ;
		}
		
		 // 3.对文件信息的处理
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
        		
        		 // 4.进行信息的处理
        		 
        		Integer id = null;
        		Date date = new Date();
        		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	            String mongodbId=fileService.SaveFile(file,params);
	            pfRegisterAttched.setMogodb_id(mongodbId);//把存储mongoDb的文件序号存到数据库中
	            pfRegisterAttched.setCreate_dt(date);
	            pfRegisterAttched.setFile_format(this_suffix);
	            if(isUpdate == null || isUpdate == 0 ){
	            	id = registerAttchedService.addAppRegisterAttched(pfRegisterAttched);//获取存入信息的id
	            }else{
	            	Map<String, Object> qryParams = new HashMap<String, Object>();
	            	PfRegisterAttched attched = new PfRegisterAttched();
	            	
	            	qryParams.put("companyId", companyId);
	            	qryParams.put("fileTypeId", fileType);
	            	
	            	PfRegisterAttched attchedOld = registerAttchedService.getAppRegisterAttchedList(qryParams).get(0);
	            	fileService.deleteFileByName(attchedOld.getMogodb_id());//删除原有的文件
	            	id = attchedOld.getId();//获取文件记录的ID
	            	
	            	attched.setId(id);
	            	attched.setFile_type_id(fileType);
	            	attched.setCreate_dt(date);
	            	attched.setMogodb_id(mongodbId);
	            	
	            	registerAttchedService.updateAppRegisterAttched(attched);//通过ID更新数据
	            }
	            json.put("fileId",id);
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
	 * @Description:企业文件上传
	 * PfTaskFileCtrl
	 * addOrUpdateTaskImgFile1
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception String
	 * @author yukai
	 * 2016-8-4 上午10:03:00
	 */
	@DocLogger(explain="企业文件上传")
	@RequestMapping(value="addOrUpdateTaskImgFile1",method=RequestMethod.POST)
	@ResponseBody 
	public String addOrUpdateTaskImgFile1(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		LoginAccount regAccount = SessionUtil.getCurrentPlateLoginAccount();
		Map<String,Object> params=new HashMap<String, Object>();
		JSONObject json = new JSONObject();
    	json.put("success", true);
    	/*
    	 * 1.检查参数
    	 */
		if(regAccount == null){//获取任务id
			json.put("message", "未登录");
			return json.toString() ;
		}
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
		
		PfRegisterAttched pfRegisterAttched = new PfRegisterAttched();
		pfRegisterAttched.setFile_type_id(fileType);//文件类型值
		pfRegisterAttched.setFile_name(fileName);//文件名
		
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
            String this_suffix = "";
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
        		Date date = new Date();
        		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	            String mongodbId=fileService.SaveFile(file,params);
	            pfRegisterAttched.setMogodb_id(mongodbId);//把存储mongoDb的文件序号存到数据库中
	            pfRegisterAttched.setCreate_dt(date);
	            pfRegisterAttched.setFile_format(this_suffix);
	            Integer id = registerAttchedService.addAppRegisterAttched(pfRegisterAttched);//获取存入信息的id
	            json.put("fileId",id);
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
	 * 变更企业信息文件上传
	 *addOrUpdateTaskImgFile
	 *@param request
	 *@param response
	 *@return
	 *@throws Exception
	 *String
	 *@author mishengliang
	 *2016-4-27上午9:55:18
	 */
	@DocLogger(explain="企业变更文件上传")
	@RequestMapping(value="addOrUpdateTaskImgFileForUpdate",method=RequestMethod.POST)
	@ResponseBody 
	public String addOrUpdateTaskImgFileForUpdate(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String, Object> params = new HashMap<String, Object>();
		LoginAccount regAccount = SessionUtil.getCurrentPlateLoginAccount();
		JSONObject json = new JSONObject();
		json.put("success", true);
		
		 // 1.检查参数
		if(regAccount == null){//获取任务id
			json.put("message", "未登录");
			return json.toString() ;
		}
		if(WebUtil.isEmpty(request.getParameter("fileType"))){//获取任务id
			json.put("message", "没有文件类型值");
			return json.toString() ;
		}
		
		 //2.赋值 
		int companyId = Integer.parseInt(request.getParameter("companyId"));
		int fileType = Integer.parseInt(request.getParameter("fileType"));
		String fileName = request.getParameter("fileName");
		String formatType = request.getParameter("formatType");
		//Integer auth_update_id = Integer.parseInt(request.getParameter("auth_update_id"));
		
		PfUpdateRegisterAttched pfUpdateRegisterAttched = new PfUpdateRegisterAttched();
		pfUpdateRegisterAttched.setCompany_id(companyId);
		pfUpdateRegisterAttched.setFile_type_id(fileType);//文件类型值
		pfUpdateRegisterAttched.setFile_name(fileName);//文件类型值
		
		if(fileName.indexOf(",") != -1){
			json.put("message", "文件名中存在非法字符(英文逗号),请先去除后上传");
			return json.toString() ;
		}
		
		 //3.对文件信息的处理
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		if(WebUtil.isEmpty((CommonsMultipartFile) multipartRequest.getFile("file"))){
			json.put("message", "没有文件");
			return json.toString();
		}
		CommonsMultipartFile file = (CommonsMultipartFile) multipartRequest.getFile("file");//对应前台文件对象   
		
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
				
				//4.进行信息的处理
				 
				Integer id = null;
				Date date = new Date();
				SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				String mongodbId=fileService.SaveFile(file,params);
				pfUpdateRegisterAttched.setObject_id(mongodbId);//把存储mongoDb的文件序号存到数据库中
				pfUpdateRegisterAttched.setCreate_dt(date);
				pfUpdateRegisterAttched.setFile_format(this_suffix);
				id = updateRegisterAttchedService.addPfUpdateRegisterAttched(pfUpdateRegisterAttched);//插入一条变更附件表数据
				/*params.put("authUpdateId", auth_update_id);
				params.put("fileTypeId", fileType);
				
				Map<String, Object> paramsForLast = new HashMap<String, Object>();
				paramsForLast.put("company_id", companyId);
				PfAuthcationUpdate lastUpdateAuthcationInfo = pfAuthcationUpdateService.getLastAuthcationUpdateItem(paramsForLast);
				if(lastUpdateAuthcationInfo == null || lastUpdateAuthcationInfo.getState()  == 2 || lastUpdateAuthcationInfo.getState()  == 3){//已审核通过或审核未通过数据状态 创建一条数据
					PfAuthcationUpdate authcationUpdate = new PfAuthcationUpdate();
					
					authcationUpdate.setCompany_id(companyId);
					authcationUpdate.setState(0);
					
					pfAuthcationUpdateService.addPfAuthcationUpdate(authcationUpdate);//新增一条变更基础表信息
					pfUpdateRegisterAttched.setAuth_update_id(authcationUpdate.getAuth_update_id());
					
					id = updateRegisterAttchedService.addPfUpdateRegisterAttched(pfUpdateRegisterAttched);//插入一条变更附件表数据
				}else{//审核状态为0
					List<PfUpdateRegisterAttched> updateList = updateRegisterAttchedService.getPfUpdateRegisterAttchedList(params);//获取变更表中当前数据
					Integer isUpdate = updateList.size()>0 ? 1:0;//查看是否有数据
					if(isUpdate == 0){//变更表中没有图片数据
						pfUpdateRegisterAttched.setAuth_update_id(lastUpdateAuthcationInfo.getAuth_update_id());
						id = updateRegisterAttchedService.addPfUpdateRegisterAttched(pfUpdateRegisterAttched);//插入一条变更附件表数据
					}else{//存在已有的图片数据
						PfUpdateRegisterAttched attched = new PfUpdateRegisterAttched();
						
						PfUpdateRegisterAttched attchedOld = updateList.get(0);
						fileService.deleteFileByName(attchedOld.getObject_id());//删除原有的文件
						id = attchedOld.getId();//获取文件记录的ID
						
						attched.setId(id);
						attched.setFile_type_id(fileType);
						attched.setCreate_dt(date);
						attched.setObject_id(mongodbId);
						attched.setAuth_update_id(attchedOld.getAuth_update_id());
						
						updateRegisterAttchedService.updatePfUpdateRegisterAttched(attched);//通过ID更新数据
					}
				}
				*/
				json.put("fileId",id);
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
	 * 
	*deleteTaskFile
	*@param request
	*@param response
	*@return
	*@throws Exception
	*Map<String,Object>
	*@author mishengliang
	*2016-4-27下午6:03:03
	 */
	@RequestMapping(value="/deleteTaskFile.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> deleteTaskFile(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam = new HashMap<String, Object>();
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		
		Integer tfId = DataTrans.transToIntegerFromString(request.getParameter("fileId"));
		qryParam.put("id", tfId);
		PfRegisterAttched attached = registerAttchedService.getAppRegisterAttchedList(qryParam).get(0);
		registerAttchedService.deleteAppRegisterAttched(attached);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "删除成功");
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_200_OK);
		return respMap;
	}
	
	/**
	 * 删除变更信息中的文件
	*deleteUpdateTaskFile
	*@param request
	*@param response
	*@return
	*@throws Exception
	*Map<String,Object>
	*@author mishengliang
	*2016-6-3下午3:23:52
	 */
	@RequestMapping(value="/deleteUpdateTaskFile.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> deleteUpdateTaskFile(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam = new HashMap<String, Object>();
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		
		Integer tfId = DataTrans.transToIntegerFromString(request.getParameter("fileId"));
		qryParam.put("id", tfId);
		PfUpdateRegisterAttched attached = updateRegisterAttchedService.getPfUpdateRegisterAttchedList(qryParam).get(0);
		/*if(attached.getObject_id() != null){
			String filename = attached.getObject_id();
			fileService.deleteFileByName(filename);
		}*/
		updateRegisterAttchedService.deletePfUpdateRegisterAttched(attached);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "删除成功");
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_200_OK);
		return respMap;
	}
	
	/**
	 * 只是修改文件名
	*updateTaskFile
	*@param request
	*@param response
	*@return
	*@throws Exception
	*Map<String,Object>
	*@author mishengliang
	*2016-4-28上午11:08:59
	 */
	@RequestMapping(value="/updateTaskFile.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> updateTaskFile(HttpServletRequest request,HttpServletResponse response) throws Exception{
		PfRegisterAttched attched = new PfRegisterAttched();
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		attched.setId(DataTrans.transToIntegerFromString(request.getParameter("id")));
		attched.setFile_name(request.getParameter("fileName"));
		
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		registerAttchedService.updateAppRegisterAttched(attched);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "保存成功");
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_200_OK);
		return respMap;
	}
	
	/**
	 * 加载文件到页面
	 * @param request
	 * @param response
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-15
	 */
	@RequestMapping(value="/downLoadFileFormMongo.do",method=RequestMethod.GET)
	@ResponseBody
	public  void downLoadFileFormMongo(HttpServletRequest request,HttpServletResponse response ) throws Exception {
		String filename=request.getParameter("fileId");
		GridFSDBFile file = fileService.retrieveFileOne("fs", filename);
		InputStream in = file.getInputStream();
		filename=(String) file.get("aliases");
		filename=filename.replace(" ", "");
		String fileName = new String(filename.getBytes("GB2312"), "ISO_8859_1");
		filename = fileName;
		//response.setCharacterEncoding("UTF-8");
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
	
	/**
	 * 查询文件信息列表
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-12
	 */
	/*@RequestMapping(value="/getTaskFileList.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskFileList(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParams = new HashMap<String, Object>();
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		LoginAccount regAccount = SessionUtil.getCurrentPlateLoginAccount();
		
		qryParams.put("companyId", regAccount.getCompany_id());
		qryParams.put("fileTypeId", request.getParameter("fileTypeId"));
		
		List<PfRegisterAttched> list = registerAttchedService.getAppRegisterAttchedList(qryParams);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_DATA_ROOT,list);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_200_OK);
		return respMap;
	}*/
	
	/**
	 * 门户查询文件信息列表
	*getTaskFileListForWindow
	*@param request
	*@param response
	*@return
	*@throws Exception
	*Map<String,Object>
	*@author mishengliang
	*2016-7-5下午5:30:51
	 */
	@RequestMapping(value="/getTaskFileListForWindow.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskFileListForWindow(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParams = new HashMap<String, Object>();
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		
		qryParams.put("companyId", request.getParameter("companyId"));
		qryParams.put("fileTypeId", request.getParameter("fileTypeId"));
		
		List<PfRegisterAttched> list = registerAttchedService.getAppRegisterAttchedList(qryParams);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_DATA_ROOT,list);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_200_OK);
		return respMap;
	}
	/**
	 * @Description:  对图片文件进行预览
	 * @param request response
	 * @return Map
	 * @author chenlong
	 * @date 2016-7-13
	 */
	@RequestMapping(value="/pfgetRegisterAttchedList.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> pfgetRegisterAttchedList(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("companyId"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件公司ID为空");
			return respMap;
		}
		if(WebUtil.isEmpty(qryParam.get("fileTypeId"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的文件类型id为空");
			return respMap;
		}
		List<PfRegisterAttched> list = registerAttchedService.getRegisterAttchedList(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_DATA_ROOT,list);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_200_OK);
		return respMap;
	}
	
	/**
	 * 查询文件信息列表，主页搜索使用，获取方式companyId方式和登录后的获取方式不同
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-12
	 */
	@RequestMapping(value="/getTaskFileListForSeach.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskFileListForSeach(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParams = new HashMap<String, Object>();
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		
		qryParams.put("companyId", request.getParameter("companyId"));
		qryParams.put("fileTypeId", request.getParameter("fileTypeId"));
		
		List<PfRegisterAttched> list = registerAttchedService.getAppRegisterAttchedList(qryParams);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_DATA_ROOT,list);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_200_OK);
		return respMap;
	}
	
	/**
	 * 获取变更表中的公司证照
	*getTaskFileListForUpdate
	*@param request
	*@param response
	*@return
	*@throws Exception
	*Map<String,Object>
	*@author mishengliang
	*2016-5-26上午9:14:12
	 */
	@RequestMapping(value="/getTaskFileListForUpdate.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskFileListForUpdate(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParams = new HashMap<String, Object>();
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		Integer authUpdateState = DataTrans.transToIntegerFromString(request.getParameter("state"));
		
		qryParams.put("authUpdateId", request.getParameter("auth_update_id"));
		qryParams.put("fileTypeId", request.getParameter("fileTypeId"));
		qryParams.put("companyId", request.getParameter("companyId"));
		List<PfUpdateRegisterAttched> updateList = updateRegisterAttchedService.getPfUpdateRegisterAttchedList(qryParams);
		if(updateList.size() != 0 && authUpdateState != 2){//变更表中存在数据 且 此变更信息的审核状态不为通过
			respMap.put(Const.AJAX_DATA_ROOT,updateList);
		}else{//变更表中不存在数据 或者 审核条件为通过
			
			List<PfRegisterAttched> list = registerAttchedService.getAppRegisterAttchedList(qryParams);
			respMap.put(Const.AJAX_DATA_ROOT,list);
		}
		
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_200_OK);
		return respMap;
	}
	

	/**
	 * @Description:删除没有使用的附件
	 * PfTaskFileCtrl
	 * delUselessAttched
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-8-5 上午9:08:13
	 */
	@RequestMapping(value="/delUselessAttched.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> delUselessAttched(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<PfRegisterAttched> list = registerAttchedService.getAppRegisterAttchedList(qryParam);
		for (PfRegisterAttched pfRegisterAttched : list) {
			if(pfRegisterAttched.getMogodb_id() != null){
				String filename = pfRegisterAttched.getMogodb_id();		
				fileService.deleteFileByName(filename);
			}
			registerAttchedService.deleteAppRegisterAttched(pfRegisterAttched);
		}
		return respMap;
	}
	
	/**
	 * @Description:根据ID删除附件
	 * PfTaskFileCtrl
	 * deleteTaskFiles
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-8-5 上午9:08:13
	 */
	@RequestMapping(value="/deleteTaskFiles.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> deleteTaskFiles(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if (qryParam.get("delFileIds").toString()!="" && qryParam.get("delFileIds").toString()!=null) {
			String arrayStr=qryParam.get("delFileIds").toString();
			String[] arrayfile_id=arrayStr.split(",");
			for(int i=0;i<arrayfile_id.length;i++){
				qryParam.put("id", arrayfile_id[i]);
				PfRegisterAttched attched=registerAttchedService.getAppRegisterAttchedList(qryParam).size() > 0 ? registerAttchedService.getAppRegisterAttchedList(qryParam).get(0):null;//161117 msl
				/*if(attched.getMogodb_id() != null){
					String filename = attched.getMogodb_id();		
					fileService.deleteFileByName(filename);
				}*/
				registerAttchedService.deleteAppRegisterAttched(attched);
			}
		}
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		return respMap;
	}
}
