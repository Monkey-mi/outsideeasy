package usercenter.externalTask.controller;


import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import usercenter.externalTask.TaskResponse.TaskOutputVo;

import usercenter.externalTask.model.TaskOutput;
import usercenter.externalTask.service.TaskOutputService;
import usercenter.externalTask.service.TaskService;
import util.Const;
import util.WebUtil;
import util.annotation.DocLogger;

@Controller
@RequestMapping("OutputItem")
public class TaskOutputController {
	@Autowired
	private TaskOutputService taskOutputService;
	@Autowired
	private TaskService taskservice;
	/**
	 * 外协查询出材料清单
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-13
	 */
	@RequestMapping(value="/getTaskOutputList.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskOutputList(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的任务清单ID为空");
			return respMap;
		}		
		int nLimit =0,npage =0;
		nLimit =qryParam.get("limit")!=null?Integer.parseInt(qryParam.get("limit").toString()):0;
    	npage =qryParam.get("page")!=null?Integer.parseInt(qryParam.get("page").toString()):0;
    	int nStart=nLimit*npage;
    	qryParam.put("start",nStart);
		List<TaskOutputVo> list = taskOutputService.getTaskOutputList(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT,list);
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
		respMap.put(Const.AJAX_SERVICE_TOTAL,qryParam.get(Const.AJAX_SERVICE_TOTAL)!=null?qryParam.get(Const.AJAX_SERVICE_TOTAL):0);		
		respMap.put(Const.AJAX_SERVICE_CURRENT_PAGE, npage);
		return respMap;
	}
	/**
	 * 生产查询出材料清单
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-13
	 */
	@RequestMapping(value="/getTaskOutputListForProducer.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskOutputListForProducer(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的任务清单ID为空");
			return respMap;
		}
		
		List<TaskOutputVo> list = taskOutputService.getTaskOutputList(qryParam);
		Integer size = Integer.parseInt(qryParam.get(Const.AJAX_SERVICE_TOTAL).toString());
		respMap.put(Const.AJAX_SERVICE_TOTAL,qryParam.get(Const.AJAX_SERVICE_TOTAL)!=null?qryParam.get(Const.AJAX_SERVICE_TOTAL):0);	
		respMap.put(Const.AJAX_DATA_ROOT,size!=0?list:0);
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
		return respMap;
	}

/**
 * 点击保存该日期工段信息
 * @param request
 * @param response
 * @return
 * @throws Exception
 * @author chenlong
 * @date 2016-04-29
 */
@DocLogger(explain="生产方点击保存该日期工段的产量录入")//日志解释注释*
@RequestMapping(value="/addTaskOutput.do",method=RequestMethod.POST)
@ResponseBody 
public Map<String,Object> addTaskOutput(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		
	if(WebUtil.isEmpty(qryParam.get("t_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的任务清单ID为空");
		return respMap;
	}
	boolean hasPermissoin=taskservice.getPermissoinForProducer(qryParam);//判断操作权限
	if(!hasPermissoin){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "不是生产方，没有操作权限");
		return respMap;
	}	
	String message = taskOutputService.addTaskOutput(qryParam);	
	respMap.put(Const.AJAX_SERVICE_MESSAGE, message);
	respMap.put(Const.AJAX_DATA_ROOT, message);
	respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
	return respMap;		
}
/**
 * 清空该日期生产的信息
 * @param request
 * @param response
 * @return
 * @throws Exception
 * @author chenlong
 * @date 2016-04-29
 */
@DocLogger(explain="生产方点击清空该日期生产的信息")//日志解释注释*
@RequestMapping(value="/deleteTaskOutput.do",method=RequestMethod.POST)
@ResponseBody 
public Map<String,Object> deleteTaskOutput(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("t_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的任务清单ID为空");
		return respMap;
	}
	boolean hasPermissoin=taskservice.getPermissoinForProducer(qryParam);//判断操作权限
	if(!hasPermissoin){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "不是生产方，没有操作权限");
		return respMap;
	}
	//判断是否已经上锁
	List<TaskOutputVo> list=taskOutputService.getTaskOutputList(qryParam);
	for(TaskOutputVo vo:list){
		if(vo.getLocked()==1){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "产量已经锁定，不可编辑");
			return respMap;
		}
		double deProductAll = 0;
		if(vo.getMjbz()==1){//统计产量
			deProductAll = WebUtil.add(deProductAll, vo.getYield_qty());
			qryParam.put("deProductAll", deProductAll);
		}
		
	}	
    String message = taskOutputService.deleteTaskOutput(qryParam);	
    if(message.equals("产量已经锁定，不可编辑")){
    	respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, message);
		return respMap;
    }
	respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
	return respMap;
}
/**
 * 查询该月份下的所有生产记录
 * @param request
 * @param response
 * @return
 * @throws Exception
 * @author chenlong
 * @date 2016-04-13
 */
@RequestMapping(value="/getTaskOutputListForMouth.do",method=RequestMethod.POST)
@ResponseBody 
public Map<String,Object> getTaskOutputListForMouth(HttpServletRequest request,HttpServletResponse response) throws Exception{
	Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
	Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
	if(WebUtil.isEmpty(qryParam.get("t_id"))){
		respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的任务清单ID为空");
		return respMap;
	}
	boolean hasPermissoin=taskservice.getPermissoinForProducer(qryParam);//判断操作权限
	if(!hasPermissoin){
		respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "不是生产方，没有操作权限");
		return respMap;
	}
	List<TaskOutput> list = taskOutputService.getTaskOutputListForMouth(qryParam);
	respMap.put(Const.AJAX_SERVICE_TOTAL,qryParam.get(Const.AJAX_SERVICE_TOTAL)!=null?qryParam.get(Const.AJAX_SERVICE_TOTAL):0);	
	respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
	respMap.put(Const.AJAX_DATA_ROOT, list);
	return respMap;
}
}


