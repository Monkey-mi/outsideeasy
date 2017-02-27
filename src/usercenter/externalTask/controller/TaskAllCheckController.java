package usercenter.externalTask.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import usercenter.externalTask.model.TaskAllCheck;
import usercenter.externalTask.service.TaskAllCheckService;
import usercenter.externalTask.service.TaskService;
import util.Const;
import util.WebUtil;

@Controller
@RequestMapping("taskAllCheck")
public class TaskAllCheckController {
	@Autowired
	private TaskAllCheckService taskAllCheckService;
	@Autowired
	private TaskService taskservice;
	
	/**
	 * @Description:获取外协任务单全检记录
	 * TaskAllCheckController
	 * getTaskAllCheckList
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-11-21 下午2:24:46
	 */
	@RequestMapping(value="/getTaskAllCheckList.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskAllCheckList(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定任务单");
			return respMap;
		}
		Map<String,Object>  params=new HashMap<String, Object>();
		params.put("t_id", qryParam.get("t_id"));
		boolean hasPermissoin=taskservice.getPermissoinForSender(params);//判断操作权限
		if(!hasPermissoin){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "不是发布任务方，没有操作权限");
			return respMap;
		}
		int nLimit =0,npage =0;
    	nLimit =qryParam.get("limit")!=null?Integer.parseInt(qryParam.get("limit").toString()):0;
    	npage =qryParam.get("page")!=null?Integer.parseInt(qryParam.get("page").toString()):0;
    	int nStart=nLimit*npage;
    	qryParam.put("start",nStart);
    	List<TaskAllCheck> list=taskAllCheckService.getTaskAllCheckList(qryParam);
    	respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL)!=null?qryParam.get(Const.AJAX_SERVICE_TOTAL):0);
		respMap.put(Const.AJAX_SERVICE_CURRENT_PAGE, npage);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
}
