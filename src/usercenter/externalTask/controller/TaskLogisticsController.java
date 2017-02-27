package usercenter.externalTask.controller;


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

import common.user.model.LoginAccount;



import usercenter.externalTask.TaskResponse.TasklogisticsVo;
import usercenter.externalTask.model.TaskFile;
import usercenter.externalTask.model.TaskLogistics;
import usercenter.externalTask.service.TaskLogisticsItemService;
import usercenter.externalTask.service.TaskLogisticsService;
import usercenter.externalTask.service.TaskService;

import util.Const;
import util.SessionUtil;
import util.WebUtil;
import util.annotation.DocLogger;



@Controller
@RequestMapping("taskLogistics")
public class TaskLogisticsController {
	@Autowired
	private TaskLogisticsService taskLogisticsService;
	@Autowired
	private TaskLogisticsItemService taskLogisticsItemService;
	@Autowired
	private TaskService taskservice;
	@Autowired
	private CompanyForPlateFormService companyForPlateFormService;
	/**
	 * 外协增加一条物流信息
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-11
	 */
	@DocLogger(explain="外协增加一条物流信息")//日志解释注释*
	@RequestMapping(value="/addTaskLogistics.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> addTaskLogistics(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件任务单ID为空");
			return respMap;
		}
		boolean hasPermissoin=taskservice.getPermissoinForSender(qryParam);//判断操作权限
		if(!hasPermissoin){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "不是发布任务方，没有操作权限");
			return respMap;
		}
		String taskLogistics = taskLogisticsService.addTaskLogistics(qryParam);
		if(taskLogistics=="false"){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "发货编号存在重复");
			return respMap;
		}
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_DATA_ROOT, taskLogistics);
		return respMap;
	}
	/**
	 * 生产增加一条物流信息
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-11
	 */
	@DocLogger(explain="生产增加一条物流信息")//日志解释注释*
	@RequestMapping(value="/addTaskLogisticsForProducer.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> addTaskLogisticsForProducer(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件任务单ID为空");
			return respMap;
		}
		boolean hasPermissoin=taskservice.getPermissoinForProducer(qryParam);//判断操作权限
		if(!hasPermissoin){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "不是生产方，没有操作权限");
			return respMap;
		}
		String taskLogistics = taskLogisticsService.addTaskLogisticsForProducer(qryParam);
		if(taskLogistics=="false"){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "批次编号存在重复");
			return respMap;
		}
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_DATA_ROOT, taskLogistics);
		return respMap;
	}
	/**
	 * 外协根据 发送方或接收方 和类型，时间，司机，或车牌 进行物流信息的查询
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-11
	 */
	@RequestMapping(value="/getTaskLogisticsBySearch.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskLogisticsBySearch(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件任务单ID为空");
			return respMap;
		}	
		int nLimit =0,npage =0;
		qryParam.put("send_company", Integer.parseInt(qryParam.get("company_id").toString()));
		nLimit =qryParam.get("limit")!=null?Integer.parseInt(qryParam.get("limit").toString()):0;
    	npage =qryParam.get("page")!=null?Integer.parseInt(qryParam.get("page").toString()):0;
    	int nStart=nLimit*npage;
    	qryParam.put("start",nStart);
		List<TasklogisticsVo> list = taskLogisticsService.getTaskLogisticsBySearch(qryParam);		
		respMap.put(Const.AJAX_DATA_ROOT, list);	
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);							
		respMap.put(Const.AJAX_SERVICE_TOTAL,qryParam.get(Const.AJAX_SERVICE_TOTAL)!=null?qryParam.get(Const.AJAX_SERVICE_TOTAL):0);	
		respMap.put(Const.AJAX_SERVICE_CURRENT_PAGE, npage);
		return respMap;
	}
	/**
	 * 生产根据 发送方或接收方 和类型，时间，司机，或车牌 进行物流信息的查询
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-11
	 */
	@RequestMapping(value="/getTaskLogisticsBySearchForProducer.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskLogisticsBySearchForProducer(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件任务单ID为空");
			return respMap;
		}	
		
		int nLimit =0,npage =0;
		qryParam.put("send_company", Integer.parseInt(qryParam.get("company_id").toString()));
		nLimit =qryParam.get("limit")!=null?Integer.parseInt(qryParam.get("limit").toString()):0;
    	npage =qryParam.get("page")!=null?Integer.parseInt(qryParam.get("page").toString()):0;
    	int nStart=nLimit*npage;
    	qryParam.put("start",nStart);
		List<TasklogisticsVo> list = taskLogisticsService.getTaskLogisticsBySearch(qryParam);		
		respMap.put(Const.AJAX_DATA_ROOT, list);	
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);							
		respMap.put(Const.AJAX_SERVICE_TOTAL,qryParam.get(Const.AJAX_SERVICE_TOTAL)!=null?qryParam.get(Const.AJAX_SERVICE_TOTAL):0);	
		respMap.put(Const.AJAX_SERVICE_CURRENT_PAGE, npage);
		return respMap;
	}
	/**
	 * 外协根据id删除一条物流信息
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-11
	 */
	@DocLogger(explain="外协根据id删除一条物流信息")//日志解释注释*
	@RequestMapping(value="/deleteTaskLogistics.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> deleteTaskLogistics(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("record_id"))){
				respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
				respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
				respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件ID为空");
				return respMap;
		}
		
		String message = taskLogisticsService.deleteTaskLogistics(Integer.parseInt(qryParam.get("record_id").toString()));	
		if(message==null){
				respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));
				respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
				respMap.put(Const.AJAX_SERVICE_MESSAGE, "成功");
				return respMap;
		}else{
				respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
				respMap.put(Const.AJAX_SERVICE_MESSAGE, message);
				return respMap;
		}
	}
	/**
	 * 生产根据id删除一条物流信息
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-11
	 */
	@DocLogger(explain="生产根据id删除一条物流信息")//日志解释注释*
	@RequestMapping(value="/deleteTaskLogisticsForProducer.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> deleteTaskLogisticsForProducer(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("record_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件ID为空");
			return respMap;
		}				
		boolean hasPermissoin=taskservice.getPermissoinForProducer(qryParam);//判断操作权限
		if(!hasPermissoin){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "不是生产方，没有操作权限");
			return respMap;
		}
		String message = taskLogisticsService.deleteTaskLogisticsForProducer(qryParam);
		if(message==null){
			respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));
			respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "成功");
			return respMap;
		}else{
			respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, message);
			return respMap;
		}
		
	}
	/**
	 *编辑物流信息时的查询出该信息
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-11
	 */
	@RequestMapping(value="/getTaskLogistics.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskLogistics(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("record_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件ID为空");
			return respMap;
		}
		
		int count = taskLogisticsItemService.getTaskItemForRecordId(Integer.parseInt(qryParam.get("record_id").toString()));
		if(count>0){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "该物流信息已经接受过了，无法更新！");
			return respMap;
		}
		TaskLogistics taskLogistics = taskLogisticsService.getTaskLogistics(Integer.parseInt(qryParam.get("record_id").toString()));	
		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_DATA_ROOT,taskLogistics );
		return respMap;
	}
	/**
	 * 编辑一条物流信息的保存
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-11
	 */
	@DocLogger(explain="外协编辑一条物流信息的保存")//日志解释注释*
	@RequestMapping(value="/updateTaskLogisticsvo.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> updateTaskLogistics(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("record_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件ID为空");
			return respMap;
		}
		String message = taskLogisticsService.updateTaskLogisticsvo(qryParam);	
		if(message==null){
			respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "成功");
			respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
			return respMap;
		}else{
			respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, message);
			return respMap;
		}
		
	}
	/**
	 * 生产商编辑一条物流信息的保存
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-11
	 */
	@DocLogger(explain="生产商编辑一条物流信息的保存")//日志解释注释*
	@RequestMapping(value="/updateTaskLogisticspro.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> updateTaskLogisticspro(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("record_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件ID为空");
			return respMap;
		}
		boolean hasPermissoin=taskservice.getPermissoinForProducer(qryParam);//判断操作权限
		if(!hasPermissoin){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "不是生产方，没有操作权限");
			return respMap;
		}
		String message = taskLogisticsService.updateTaskLogisticspro(qryParam);	
		if(message=="成功"){
		      respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));
		      respMap.put(Const.AJAX_SERVICE_MESSAGE, message);
		      respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		      return respMap;
	   }else{
		    respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, message);
			return respMap;
			}
		
	}
	/**
	 * 查询有多少待确认的物流信息
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-13
	 */
	@RequestMapping(value="/getCountLogisticsForState.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getCountLogisticsForState(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件任务单ID为空");
			return respMap;
		}
		Integer count = taskLogisticsService.getCountLogisticsForState(Integer.parseInt(qryParam.get("t_id").toString()));	
		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));
		respMap.put(Const.AJAX_DATA_ROOT, count);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		return respMap;
	}
	/**
	 * 点击查询未确认的物流信息
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-13
	 */
	@RequestMapping(value="/getLogisticsForState.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getLogisticsForState(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件任务单ID为空");
			return respMap;
		}
		List<TaskLogistics> list = taskLogisticsService.getLogisticsForState(Integer.parseInt(qryParam.get("t_id").toString()));	
		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));
		respMap.put(Const.AJAX_DATA_ROOT, list);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		return respMap;
	}
	/**
	 * 生产商点按钮物流信息进行确认
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-13
	 */
	@DocLogger(explain="生产商点按钮一条物流信息进行确认")//日志解释注释*
	@RequestMapping(value="/updateLogisticsForStateForProducer.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> updateLogisticsForStateForProducer(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件任务单ID为空");
			return respMap;
		}
		boolean hasPermissoin=taskservice.getPermissoinForProducer(qryParam);//判断操作权限
		if(!hasPermissoin){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "不是生产方，没有操作权限");
			return respMap;
		}
		if(WebUtil.isEmpty(qryParam.get("record_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件任务单ID为空");
			return respMap;
		}
		String message = taskLogisticsService.updateTaskLogistics(qryParam);
		  respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));		    		    	  
		  respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
	      respMap.put(Const.AJAX_SERVICE_MESSAGE, message);
			return respMap;	
	}
	/**
	 * 生产商点按钮物流信息进行确认
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-13
	 */
	@RequestMapping(value="/getTaskLogisticsState.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskLogisticsState(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("record_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件ID为空");
			return respMap;
		}	
		String message = taskLogisticsService.getTaskLogisticsState(qryParam);
		    respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));		    		    	  
		    respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, message);
			return respMap;	
	}
	/**
	 * 外协方验证任务单号是否重复
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-13
	 */
	@RequestMapping(value="/regSendId.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> regSendId(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件ID为空");
			return respMap;
		}	
		String message = taskLogisticsService.regSendId(qryParam);		
		    respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));		    		    	  
		    respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, message);
			return respMap;	
	}
	/**
	 * 生产方验证任务单号是否重复
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-13
	 */
	@RequestMapping(value="/regSendIdForProducer.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> regSendIdForProducer(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件ID为空");
			return respMap;
		}	
		String message = taskLogisticsService.regSendId(qryParam);		
		    respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));		    		    	  
		    respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, message);
			return respMap;	
	}
	
	/**
	 * 外协方上传物流文件的图片文件进mongoDB，并保存文件序列号
	 * @param file
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-06-22
	 */
	@DocLogger(explain="外协方上传物流文件的图片文件进mongoDB，并保存文件序列号")//日志解释注释*
	@RequestMapping(value="/addLogisticsImgFile.do",method=RequestMethod.POST)
	@ResponseBody 
	public String addTaskImgFile(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object>params=new HashMap<String, Object>();
		LoginAccount regAccount = SessionUtil.getCurrentPlateLoginAccount();
		JSONObject json = new JSONObject();
    	
    	/*
    	 * 1.检查参数
    	 */
		if(WebUtil.isEmpty(request.getParameter("t_id"))){//获取任务id
			json.put("message", "没有任务单id");
			json.put("success", false);
			return json.toString() ;
			
		}
		if(WebUtil.isEmpty(request.getParameter("file_type"))){//获取任务id
			json.put("message", "没有文件类型值");
			json.put("success", false);
			return json.toString();
		}
		/*
		 *2.赋值 
		 */
		int taskId = Integer.parseInt(request.getParameter("t_id"));
		int file_type = Integer.parseInt(request.getParameter("file_type"));
	
		//2.1判断是否有权限操作t_id
		boolean hasPermissoin=taskservice.getPermissoinForSender(qryParam);//判断操作权限
		if(!hasPermissoin){
			json.put(Const.AJAX_SERVICE_SUCCESS,false);
			json.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			json.put(Const.AJAX_SERVICE_MESSAGE, "不是发布任务方，没有操作权限");
			return json.toString() ;
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
            String filename =file.getOriginalFilename().substring(0, originalName.indexOf("."));//获取文件名
           if( filename.length()>80){
        	   json.put("message", "文件名过长，超过80个字符");
				json.put("success", false);
				return json.toString();
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
            			 params.put(Const.ISIMG, 1);
            			flag=true;
            			break;
                    }
            	}          	
            }
            taskFile.setFile_name(filename);
            taskFile.setSuffix_name(originalName.substring(originalName.lastIndexOf(".")));
            if(!flag){
        		json.put("message", "请按照规定的图片格式上传文件");
        		json.put("success", false);
				return json.toString() ;
        	}else{
        		          
        		 Map<String,Object> map = taskLogisticsService.addTaskFile(taskFile,file,params);//获取存入信息的id
	           
	            json.put("file_path",map.get("file_path"));   
	            json.put("message", "上传成功"); 
	            json.put("success", true);
	            json.put("tf_id",map.get("tf_id")); 
	            json.put("filename",map.get("filename")); 
        	}
        }else{
        	json.put("message", "文件不存在");
        	json.put("success", false);
        }
        
        return json.toString();
	}
	/**
	 * 生产方上传物流文件的图片文件进mongoDB，并保存文件序列号
	 * @param file
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-06-24
	 */
	@DocLogger(explain="生产方上传物流文件的图片文件进mongoDB，并保存文件序列号")//日志解释注释*
	@RequestMapping(value="/addLogisticsImgFileForProducer.do",method=RequestMethod.POST)
	@ResponseBody 
	public String addTaskImgFileForProducer(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object>params=new HashMap<String, Object>();
		LoginAccount regAccount = SessionUtil.getCurrentPlateLoginAccount();
		JSONObject json = new JSONObject();
    	
    	/*
    	 * 1.检查参数
    	 */
		if(WebUtil.isEmpty(request.getParameter("t_id"))){//获取任务id
			json.put("message", "没有任务单id");
			json.put("success", false);
			return json.toString() ;		
		}
		if(WebUtil.isEmpty(request.getParameter("file_type"))){//获取任务id
			json.put("message", "没有文件类型值");
			json.put("success", false);
			return json.toString();
		}
		/*
		 *2.赋值 
		 */
		int taskId = Integer.parseInt(request.getParameter("t_id"));
		int file_type = Integer.parseInt(request.getParameter("file_type"));
	
		//2.1判断是否有权限操作t_id
		boolean hasPermissoin=taskservice.getPermissoinForProducer(qryParam);//判断操作权限
		if(!hasPermissoin){
			json.put(Const.AJAX_SERVICE_SUCCESS,false);
			json.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			json.put(Const.AJAX_SERVICE_MESSAGE, "不是生产方，没有操作权限");
			return json.toString() ;
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
            String filename =file.getOriginalFilename().substring(0, originalName.indexOf("."));//获取文件名
           if( filename.length()>80){
        	   json.put("message", "文件名过长，超过80个字符");
				json.put("success", false);
				return json.toString();
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
        		json.put("message", "请按照规定的图片格式上传文件");
        		json.put("success", false);
				return json.toString() ;
        	}else{
        		          
        		 Map<String,Object> map = taskLogisticsService.addTaskFile(taskFile,file,params);//获取存入信息的id
	           
	            json.put("file_path",map.get("file_path"));   
	            json.put("message", "上传成功"); 
	            json.put("success", true);
	            json.put("tf_id",map.get("tf_id")); 
	            json.put("filename",map.get("filename")); 
        	}
        }else{
        	json.put("message", "文件不存在");
        	json.put("success", false);
        }
        
        return json.toString();
	}
/**
 * 生产方上传运单文件的图片文件进mongoDB，并保存文件序列号
 * @param file
 * @param request
 * @param response
 * @return
 * @throws Exception
 * @author chenlong
 * @date 2016-12-7
 */
@RequestMapping(value="/addShippingImgFileForProducer.do",method=RequestMethod.POST)
@ResponseBody 
public String addShippingImgFileForProducer(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
	Map<String,Object>params=new HashMap<String, Object>();
	LoginAccount regAccount = SessionUtil.getCurrentPlateLoginAccount();
	JSONObject json = new JSONObject();	
	/*
	 * 1.检查参数
	 */
	if(WebUtil.isEmpty(request.getParameter("file_type"))){//获取任务id
		json.put("message", "没有文件类型值");
		json.put("success", false);
		return json.toString();
	}
	/*
	 *2.赋值 
	 */
//	int taskId = Integer.parseInt(request.getParameter("t_id"));
	int file_type = Integer.parseInt(request.getParameter("file_type"));

	TaskFile taskFile = new TaskFile();	
	taskFile.setFile_type(file_type);//文件类型值
	
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
        String filename =file.getOriginalFilename().substring(0, originalName.indexOf("."));//获取文件名
       if( filename.length()>80){
    	   json.put("message", "文件名过长，超过80个字符");
			json.put("success", false);
			return json.toString();
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
    		json.put("message", "请按照规定的图片格式上传文件");
    		json.put("success", false);
			return json.toString() ;
    	}else{    		          
    		Map<String,Object> map = taskLogisticsService.addTaskFile(taskFile,file,params);//获取存入信息的id          
            json.put("file_path",map.get("file_path"));   
            json.put("message", "上传成功"); 
            json.put("success", true);
            json.put("tf_id",map.get("tf_id")); 
            json.put("filename",map.get("filename")); 
    	}
    }else{
    	json.put("message", "文件不存在");
    	json.put("success", false);
    }
    
    return json.toString();
}
}
