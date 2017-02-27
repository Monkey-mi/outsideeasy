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

import usercenter.externalTask.model.TaskAllcheckUnqudetails;
import usercenter.externalTask.service.TaskAllcheckUnqudetailsService;
import util.Const;
import util.WebUtil;

@Controller
@RequestMapping("taskAllCheckUnqudetail")
public class TaskAllCheckUnqudetailCtrl {
	@Autowired
	private TaskAllcheckUnqudetailsService taskAllcheckUnqudetailsService;
	
	/**
	 * @Description:获取不合格明细
	 * TaskAllCheckUnqudetailCtrl
	 * getTaskAllCheckUnqudetailList
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-11-21 下午3:40:21
	 */
	@RequestMapping(value="/getTaskAllCheckUnqudetailList.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskAllCheckUnqudetailList(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
    	List<TaskAllcheckUnqudetails> list=taskAllcheckUnqudetailsService.getTaskAllcheckUnqudetailsList(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
}
