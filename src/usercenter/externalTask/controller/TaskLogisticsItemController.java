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


import usercenter.externalTask.TaskResponse.LogisticsItemAll;
import usercenter.externalTask.TaskResponse.LogisticsItemVo;
import usercenter.externalTask.model.TaskLogisticsItem;
import usercenter.externalTask.service.TaskLogisticsItemService;
import usercenter.externalTask.service.TaskService;
import util.Const;
import util.WebUtil;
import util.annotation.DocLogger;

@Controller
@RequestMapping("logisticsItem")
public class TaskLogisticsItemController {
	@Autowired
	private TaskLogisticsItemService taskLogisticsItemService;
	@Autowired
	private TaskService taskservice;
	/**
	 * 外斜方显示来货记录
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-11
	 */
	@RequestMapping(value="/getlogisticsItemList.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskLogisticsItemList(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();	
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的物流信息ID为空");
			return respMap;
		}
		int taskId = Integer.parseInt(qryParam.get("t_id").toString());	
		LogisticsItemAll logisticsItemAll = taskLogisticsItemService.getLogisticsItemList(taskId);
		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));
		respMap.put(Const.AJAX_DATA_ROOT, logisticsItemAll);
		return respMap;
	}
	/**
	 * 生产方显示来货记录
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-11
	 */
	@RequestMapping(value="/getlogisticsItemListForProducer.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskLogisticsItemListForProducer(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();	
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的物流信息ID为空");
			return respMap;
		}
		int taskId = Integer.parseInt(qryParam.get("t_id").toString());	
		LogisticsItemAll logisticsItemAll = taskLogisticsItemService.getLogisticsItemList(taskId);
		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));
		respMap.put(Const.AJAX_DATA_ROOT, logisticsItemAll);
		return respMap;
	}
	/**
	 * 入库后质检增加一条来货记录
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-14
	 */
	@DocLogger(explain="入库后质检增加一条来货记录")//日志解释注释*
	@RequestMapping(value="/addlogisticsItem.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> addTaskLogisticsItem(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("record_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件物流信息ID为空");
			return respMap;
		}
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的任务单ID为空");
			return respMap;
		}
		boolean hasPermissoin=taskservice.getPermissoinForSender(qryParam);//判断操作权限
		if(!hasPermissoin){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "不是发布任务方，没有操作权限");
			return respMap;
		}	 
		String message = taskLogisticsItemService.addLogisticsItem(qryParam);		
		    respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));		    		    	  
		    respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, message);
			return respMap;				 		
	}
	/**
	 * 入库前质检增加一条来货记录,并同时默认已质检过,在质检中增加一条质检信息
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-5-9
	 */
	@DocLogger(explain="入库前质检增加一条来货记录,并同时默认已质检过,在质检中增加一条质检信息")//日志解释注释*
	@RequestMapping(value="/addTaskLogisticsItemForQc.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> addTaskLogisticsItemForQc(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("record_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件物流信息ID为空");
			return respMap;
		}
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的任务单ID为空");
			return respMap;
		}
		boolean hasPermissoin=taskservice.getPermissoinForSender(qryParam);//判断操作权限
		if(!hasPermissoin){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "不是发布任务方，没有操作权限");
			return respMap;
		}	 
		String message = taskLogisticsItemService.addTaskLogisticsItemForQc(qryParam);		
		      respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));
		      respMap.put(Const.AJAX_SERVICE_MESSAGE, message);
		      respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		      return respMap; 		  
	}
	/**
	 * 对方法发货的统计
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-11
	 */
	@RequestMapping(value="/deletelogisticsItem.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> deleteTaskLogisticsItem(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("item_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件ID为空");
			return respMap;
		}
		taskLogisticsItemService.deleteLogisticsItem(Integer.parseInt(qryParam.get("item_id").toString()));	
		return respMap;
	}

	/**
	 * 查询出未质检的物流信息的批次号集合
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-05-04
	 */
	@RequestMapping(value="/getLogisticsItemforState.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getLogisticsItemforState(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件ID为空");
			return respMap;
		}
		
		List<LogisticsItemVo> list = taskLogisticsItemService.getLogisticsItemforState(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT,list);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));
		return respMap;
	}
	/**
	 * 查询出选择的未质检的物流信息的到货量
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-05-04
	 */
	@RequestMapping(value="/getLogisticsItemforCount.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getLogisticsItemforCount(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("item_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件ID为空");
			return respMap;
		}
		
		TaskLogisticsItem log = taskLogisticsItemService.getLogisticsItemforCount(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT,log);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));
		return respMap;
	}
	/**
	 * 查询质检状态并判断
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-06-2
	 */
	@RequestMapping(value="/getQcState.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getQcState(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("item_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件ID为空");
			return respMap;
		}	
		String message = taskLogisticsItemService.getQcState(qryParam);
		respMap.put(Const.AJAX_SERVICE_MESSAGE,message);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));
		return respMap;
	}
}
