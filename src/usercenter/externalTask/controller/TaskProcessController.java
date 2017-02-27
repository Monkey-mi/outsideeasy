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

import usercenter.externalTask.model.TaskProcess;
import usercenter.externalTask.service.TaskProcessService;

import util.Const;
import util.WebUtil;
@Controller
@RequestMapping("process")
public class TaskProcessController {
	@Autowired
	private  TaskProcessService taskProcessService;
	
	/**外协获取生产信息*/
	@RequestMapping(value="/getTaskProcessList.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskProcessList(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件文件信息ID为空");
			return respMap;
		}
		
		List<TaskProcess> list = taskProcessService.getTaskProcessList(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_DATA_ROOT,list);
		return respMap;
	}
	/**生产获取生产信息*/
	@RequestMapping(value="/getTaskProcessListForProducer.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskProcessListForProducer(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件文件信息ID为空");
			return respMap;
		}
		
		
		List<TaskProcess> list = taskProcessService.getTaskProcessList(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_DATA_ROOT,list);
		return respMap;
	}
}
