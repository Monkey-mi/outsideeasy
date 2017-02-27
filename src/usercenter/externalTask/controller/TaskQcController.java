package usercenter.externalTask.controller;



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

import usercenter.externalTask.TaskResponse.QcAllVo;
import usercenter.externalTask.TaskResponse.QcCountVo;
import usercenter.externalTask.model.TaskQc;
import usercenter.externalTask.service.TaskQcService;
import usercenter.externalTask.service.TaskService;
import util.Const;
import util.WebUtil;
import util.annotation.DocLogger;

@Controller
@RequestMapping("taskqc")
public class TaskQcController {

	@Autowired
	private TaskQcService taskQcService;
	@Autowired
	private TaskService taskservice;
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
	@DocLogger(explain="外协增加质检文件进mongoDB")//日志解释注释*
	@RequestMapping(value="/addTaskQcFile.do",method=RequestMethod.POST)
	@ResponseBody 
	public String addTaskOtherFile(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		JSONObject json = new JSONObject();
    	
    	/*
    	 * 1.检查参数
    	 */
		if(WebUtil.isEmpty(request.getParameter("t_id"))){//获取任务id
			json.put("message", "没有任务单id");
			json.put("success", false);
			return json.toString() ;
		}
		boolean hasPermissoin=taskservice.getPermissoinForSender(qryParam);//判断操作权限
		if(!hasPermissoin){
			json.put(Const.AJAX_SERVICE_SUCCESS,false);
			json.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			json.put(Const.AJAX_SERVICE_MESSAGE, "不是发布任务方，没有操作权限");
			return json.toString() ;
		}
     	int taskId = Integer.parseInt(request.getParameter("t_id"));
		int record_id = Integer.parseInt(request.getParameter("record_id"));
		/*
		 *2. 赋值
		 */
		TaskQc taskQc = new TaskQc();
		taskQc.setT_id(taskId); //任务单id
		taskQc.setRecord_id(record_id);//质检的物流信息的id
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request; 
        if(WebUtil.isEmpty((CommonsMultipartFile) multipartRequest   
                .getFile("file"))){
			json.put("message", "文件为空");
			json.put("success", false);
			return json.toString() ;
		}
        CommonsMultipartFile file = (CommonsMultipartFile) multipartRequest   
                .getFile("file");   //对应前台文件对象    
      /*
       * 3.检查文件大小和格式
       */
        String originalName=file.getOriginalFilename();
        if(originalName.indexOf(",")>0){
        	json.put("message", "文件名中存在非法字符(英文逗号),请先去除后上传");
			json.put("success", false);
			return json.toString() ;
        }
        if(file!=null && file.getSize()>0){
        	if (file.getSize() >10*1024*1024) {
				json.put("message", "文件太大，超过10M");
				json.put("success", false);
				return json.toString() ;	
			} 	                    
        		/*
        		 * 4.进行信息的处理：先删除旧的产品主图，分别是mongodb和taskFile，再新增新的
        		 */            
        		Map<String,Object> map = taskQcService.addTaskQcFile(taskQc,file);//获取存入信息的id
	           
	           // json.put("file_path",map.get("file_path"));   
	            json.put("message", "上传成功"); 
	            json.put("success", true);
	            json.put("qc_id", map.get("qc_id"));
	            
        	
        }else{
        	json.put("message", "文件为空");
        	json.put("success", false);
        }
        
        return json.toString();
	}
	/**
	 * 查询是否添加过质检文件
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-12
	 */
	@RequestMapping(value="/getCountforFile.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getCountforFile(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的任务清单ID为空");
			return respMap;
		}
		if(WebUtil.isEmpty(qryParam.get("record_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的物流清单ID为空");
			return respMap;
		}
		String file = taskQcService.getCountforFile(qryParam);
		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));
		respMap.put(Const.AJAX_DATA_ROOT,file);
		return respMap;
	}
	/**
	 * 统计还有多少未完成的任务量，和不合格的量
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-12
	 */
	@RequestMapping(value="/getTotalQty.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTotalQty(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的任务清单ID为空");
			return respMap;
		}

		QcCountVo qcCountVo = taskQcService.getTotalQty(qryParam);
		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));
		respMap.put(Const.AJAX_DATA_ROOT,qcCountVo);
		return respMap;
	}
	/**
	 * 统计还有多少未完成的任务量，和不合格的量
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-12
	 */
	@RequestMapping(value="/getTotalQtyForProducer.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTotalQtyForProducer(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的任务清单ID为空");
			return respMap;
		}

		QcCountVo qcCountVo = taskQcService.getTotalQty(qryParam);
		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));
		respMap.put(Const.AJAX_DATA_ROOT,qcCountVo);
		return respMap;
	}
	/**
	 * 增加质检信息
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-12
	 */
	@DocLogger(explain="外协增加质检信息")//日志解释注释*
	@RequestMapping(value="/addTaskQc.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> addTaskQc(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的任务清单ID为空");
			return respMap;
		}
		if(WebUtil.isEmpty(qryParam.get("record_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的物流清单ID为空");
			return respMap;
		}
		boolean hasPermissoin=taskservice.getPermissoinForSender(qryParam);//判断操作权限
		if(!hasPermissoin){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "不是发布任务方，没有操作权限");
			return respMap;
		}
		String message = taskQcService.addTaskQc(qryParam);
		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));
		respMap.put(Const.AJAX_SERVICE_MESSAGE, message);
		return respMap;
	}
	/**
	 * 外斜方显示质检信息
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-12
	 */
	@RequestMapping(value="/getTaskQcList.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskQcList(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的任务清单ID为空");
			return respMap;
		}
		int taskId = Integer.parseInt(qryParam.get("t_id").toString());	
		QcAllVo qcAllVo = taskQcService.getTaskQcList(taskId);
		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));
		respMap.put(Const.AJAX_DATA_ROOT, qcAllVo);
		return respMap;
	}
	/**
	 * 生产方显示质检信息
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-12
	 */
	@RequestMapping(value="/getTaskQcListForProducer.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskQcListForProducer(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的任务清单ID为空");
			return respMap;
		}
		int taskId = Integer.parseInt(qryParam.get("t_id").toString());	
		QcAllVo qcAllVo = taskQcService.getTaskQcList(taskId);
		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));
		respMap.put(Const.AJAX_DATA_ROOT, qcAllVo);
		return respMap;
	}
	

	/**
	 *外协方编辑质检信息时的查询出该信息
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-11
	 */
	@RequestMapping(value="/getTaskQc.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskQc(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("qc_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件ID为空");
			return respMap;
		}
		TaskQc taskQc = taskQcService.getTaskQc(Integer.parseInt(qryParam.get("qc_id").toString()));	
		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));
		respMap.put(Const.AJAX_DATA_ROOT,taskQc );
		return respMap;
	}
	/**
	 *生产方质检信息时的查询出该信息
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-11
	 */
	@RequestMapping(value="/getTaskQcForProducer.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskQcForProducer(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("qc_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件ID为空");
			return respMap;
		}
		TaskQc taskQc = taskQcService.getTaskQc(Integer.parseInt(qryParam.get("qc_id").toString()));	
		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));
		respMap.put(Const.AJAX_DATA_ROOT,taskQc );
		return respMap;
	}
	

/**
 * 编辑一条质检信息信息的保存
 * @param request
 * @param response
 * @return
 * @throws Exception
 * @author chenlong
 * @date 2016-04-12
 */
@RequestMapping(value="/updateinfo.do",method=RequestMethod.POST)
@ResponseBody 
public Map<String,Object> updateinfo(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("qc_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件ID为空");
		return respMap;
	}
	taskQcService.updateinfo(qryParam);	
	respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));
	return respMap;
}
/**
 * 删除一条质检信息信息的保存
 * @param request
 * @param response
 * @return
 * @throws Exception
 * @author chenlong
 * @date 2016-04-12
 */
@RequestMapping(value="/deleteTaskQc.do",method=RequestMethod.POST)
@ResponseBody 
public Map<String,Object> deleteTaskQc(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("qc_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件ID为空");
		return respMap;
	}
	if(WebUtil.isEmpty(qryParam.get("record_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "你物流条件ID为空");
		return respMap;
	}
	taskQcService.deleteTaskQc(qryParam);	
	respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));
	return respMap;
}
/**
 * 外斜方查询质检文件的名字
 * @param request
 * @param response
 * @return
 * @throws Exception
 * @author chenlong
 * @date 2016-04-12
 */
@RequestMapping(value="/selectFileinfo.do",method=RequestMethod.POST)
@ResponseBody 
public Map<String,Object> selectFileinfo(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("qc_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件ID为空");
		return respMap;
	}
	
	String filename = taskQcService.selectFileinfo(qryParam);	
	respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));
	respMap.put(Const.AJAX_DATA_ROOT,filename);
	return respMap;
}
/**
 * 生产方查询质检文件的名字
 * @param request
 * @param response
 * @return
 * @throws Exception
 * @author chenlong
 * @date 2016-04-12
 */
@RequestMapping(value="/selectFileinfoForProducer.do",method=RequestMethod.POST)
@ResponseBody 
public Map<String,Object> selectFileinfoForProducer(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("qc_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件ID为空");
		return respMap;
	}
	
	String filename = taskQcService.selectFileinfo(qryParam);	
	respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));
	respMap.put(Const.AJAX_DATA_ROOT,filename);
	return respMap;
}

}
