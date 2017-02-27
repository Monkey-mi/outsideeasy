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

import usercenter.externalTask.model.TaskProcessSection;
import usercenter.externalTask.service.TaskProcessSectionService;


import util.Const;
import util.WebUtil;

@Controller
@RequestMapping("ProcessSection")
public class TaskProcessSectionController {
	@Autowired
	private  TaskProcessSectionService taskProcessSectionService;
	
	
	
	/**获取工段的信息*/
	@RequestMapping(value="/getTaskProcessSectionList.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskProcessSectionList(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "你传入的条件文件信息ID为空");
			return respMap;
		}
		
		Integer t_id = Integer.parseInt((qryParam.get("t_id")).toString());
		List<TaskProcessSection> list = taskProcessSectionService.getTaskProcessSectionList(t_id);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_DATA_ROOT,list);
		return respMap;
	}
	
}


