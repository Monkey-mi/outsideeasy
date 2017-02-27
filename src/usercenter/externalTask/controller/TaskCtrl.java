package usercenter.externalTask.controller;

import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import common.user.model.LoginAccount;

import usercenter.externalTask.TaskResponse.AllStateVo;
import usercenter.externalTask.TaskResponse.TakForShipping;
import usercenter.externalTask.TaskResponse.TaskEndDetails;
import usercenter.externalTask.model.Task;
import usercenter.externalTask.service.TaskService;
import util.Const;
import util.SRMStringUtil;
import util.SessionUtil;
import util.WebUtil;
import util.annotation.DocLogger;

@Controller
@RequestMapping("externalTask")
public class TaskCtrl {

	@Autowired
	private TaskService taskservice;
	
	/**
	 * @Description:跳转外协任务单列表
	 * TaskCtrl
	 * gojsp_outsourceTaskList
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-14 上午9:58:18
	 */
	@RequestMapping(value = { "/outsourceTaskList" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_outsourceTaskList(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/outsourceTaskManage/taskList");
		return modelAndView;
	}
	
	/**
	 * @Description:跳转外协任务单详情页面
	 * TaskCtrl
	 * gojsp_outsourceTaskInfo
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-14 下午1:51:30
	 */
	@RequestMapping(value = { "/outsourceTaskInfo/{d+}" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_outsourceTaskInfo(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/outsourceTaskManage/taskInfo");
		return modelAndView;
	}
	
	/**
	 * @Description:跳转外协任务单物流信息页面
	 * TaskCtrl
	 * gojsp_outsourceLogisticsInfo
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-14 下午2:19:01
	 */
	@RequestMapping(value = { "/outsourceLogisticsInfo/{d+}" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_outsourceLogisticsInfo(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/outsourceTaskManage/logisticsInfo");
		return modelAndView;
	}
	
	/**
	 * @Description:跳转外协任务单生产信息页面
	 * TaskCtrl
	 * gojsp_outsourceProductionInfo
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-14 下午2:19:05
	 */
	@RequestMapping(value = { "/outsourceProductionInfo/{d+}" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_outsourceProductionInfo(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/outsourceTaskManage/productionInfo");
		return modelAndView;
	}
	
	/**
	 * @Description:跳转外协任务单交货信息页面
	 * TaskCtrl
	 * gojsp_outsourceDeliveredInfo
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-14 下午2:19:08
	 */
	@RequestMapping(value = { "/outsourceDeliveredInfo/{d+}" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_outsourceDeliveredInfo(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/outsourceTaskManage/deliveredInfo");
		return modelAndView;
	}
	
	/**
	 * @Description:跳转外协任务单交流合作页面
	 * TaskCtrl
	 * gojsp_outsourceConnection
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-14 下午2:19:11
	 */
	@RequestMapping(value = { "/outsourceConnection/{d+}" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_outsourceConnection(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/outsourceTaskManage/connection");
		return modelAndView;
	}
	
	/**
	 * @Description:跳转外协任务单质检信息页面
	 * TaskCtrl
	 * gojsp_outsourceConnection
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-14 下午2:19:11
	 */
	@RequestMapping(value = { "/outsourceQualityControl/{d+}" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_outsourceQualityControl(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/outsourceTaskManage/qualityControl");
		return modelAndView;
	}
	
	/**
	 * @Description:跳转外协任务单图片预览页面
	 * TaskCtrl
	 * gojsp_outsourceTaskImgView
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-14 下午2:19:11
	 */
	@RequestMapping(value = { "/outsourceTaskImgView" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_outsourceTaskImgView(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/outsourceTaskManage/taskImgView");
		return modelAndView;
	}
	
	/**
	 * @Description:跳转外协任务单视频预览页面
	 * TaskCtrl
	 * gojsp_outsourceTaskVideoView
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-14 下午2:19:11
	 */
	@RequestMapping(value = { "/outsourceTaskVideoView" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_outsourceTaskVideoView(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/outsourceTaskManage/taskVideoView");
		return modelAndView;
	}
	
	/**
	 * @Description:跳转生产任务单列表
	 * TaskCtrl
	 * gojsp_producTaskList
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-14 上午9:58:18
	 */
	@RequestMapping(value = { "/producTaskList" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_producTaskList(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/producTaskManage/taskList");
		return modelAndView;
	}
	
	/**
	 * @Description:跳转生产任务单详情页面
	 * TaskCtrl
	 * gojsp_producTaskInfo
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-14 下午1:51:30
	 */
	@RequestMapping(value = { "/producTaskInfo/{d+}" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_producTaskInfo(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/producTaskManage/taskInfo");
		return modelAndView;
	}
	
	/**
	 * @Description:跳转生产任务单物流信息页面
	 * TaskCtrl
	 * gojsp_producLogisticsInfo
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-14 下午2:19:01
	 */
	@RequestMapping(value = { "/producLogisticsInfo/{d+}" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_producLogisticsInfo(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/producTaskManage/logisticsInfo");
		return modelAndView;
	}
	
	/**
	 * @Description:跳转生产任务单生产信息页面
	 * TaskCtrl
	 * gojsp_producProductionInfo
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-14 下午2:19:05
	 */
	@RequestMapping(value = { "/producProductionInfo/{d+}" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_producProductionInfo(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/producTaskManage/productionInfo");
		return modelAndView;
	}
	
	/**
	 * @Description:跳转生产任务单交货信息页面
	 * TaskCtrl
	 * gojsp_producDeliveredInfo
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-14 下午2:19:08
	 */
	@RequestMapping(value = { "/producDeliveredInfo/{d+}" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_producDeliveredInfo(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/producTaskManage/deliveredInfo");
		return modelAndView;
	}
	
	/**
	 * @Description:跳转生产任务单交流合作页面
	 * TaskCtrl
	 * gojsp_producConnection
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-14 下午2:19:11
	 */
	@RequestMapping(value = { "/producConnection/{d+}" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_producConnection(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/producTaskManage/connection");
		return modelAndView;
	}
	
	/**
	 * @Description:跳转生产任务单图片预览页面
	 * TaskCtrl
	 * gojsp_producTaskImgView
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-14 下午2:19:11
	 */
	@RequestMapping(value = { "/producTaskImgView" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_producTaskImgView(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/producTaskManage/taskImgView");
		return modelAndView;
	}
	
	/**
	 * @Description:跳转生产任务单视频预览页面
	 * TaskCtrl
	 * gojsp_producTaskVideoView
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-14 下午2:19:11
	 */
	@RequestMapping(value = { "/producTaskVideoView" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_producTaskVideoView(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/producTaskManage/taskVideoView");
		return modelAndView;
	}
	
	/**
	 * @Description:跳转生产任务单质检信息页面
	 * TaskCtrl
	 * gojsp_producQualityControl
	 * @param modelAndView
	 * @return ModelAndView
	 * @author yukai
	 * 2016-12-14 下午2:19:11
	 */
	@RequestMapping(value = { "/producQualityControl/{d+}" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_producQualityControl(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/producTaskManage/qualityControl");
		return modelAndView;
	}
	
	/**获取任务单,发布方的供应商*/
	@RequestMapping(value="/getTaskListByCondition.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskListByCondition(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("state"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "姓名为空");
			return respMap;
		}
		int htmlstate=Integer.parseInt(qryParam.get("state").toString());
		int state=0;
		switch(htmlstate){
			case 1:
				state=5;
				break;
			case 2:
				state=10;
				break;
			case 3:
				state=15;
				break;
			case 4:
				state=20;
				break;
			case 5:
				state=25;
				break;
			case 6:
				state=30;
				break;
			default:
				state=0;
				break;
		}
		qryParam.put("state", state);
		int nLimit =0,npage =0;
    	nLimit =qryParam.get("limit")!=null?Integer.parseInt(qryParam.get("limit").toString()):0;
    	npage =qryParam.get("page")!=null?Integer.parseInt(qryParam.get("page").toString()):0;
    	int nStart=nLimit*npage;
    	qryParam.put("start",nStart);
    	if(WebUtil.isEmpty(qryParam.get("select_type"))){
    		qryParam.put("start_filter_date", null);
    		qryParam.put("end_filter_date", null);
    	}else{
    		int select_type=Integer.parseInt(qryParam.get("select_type").toString());
    		switch(select_type){
    			case 1:
    				qryParam.put("plan_start_flag", true);
    				if(!WebUtil.isEmpty(qryParam.get("start_filter_date"))){
    					qryParam.put("plan_start_1", qryParam.get("start_filter_date"));
    				}
    				if(!WebUtil.isEmpty(qryParam.get("end_filter_date"))){
    					qryParam.put("plan_start_2", qryParam.get("end_filter_date"));
    				}
    				break;
    			case 2:
    				qryParam.put("send_time_flag", true);
    				if(!WebUtil.isEmpty(qryParam.get("start_filter_date"))){
    					qryParam.put("send_time_1", qryParam.get("start_filter_date"));
    				}
    				if(!WebUtil.isEmpty(qryParam.get("end_filter_date"))){
    					qryParam.put("send_time_2", qryParam.get("end_filter_date"));
    				}
    				break;
    			case 3:
    				qryParam.put("receive_time_flag", true);
    				if(!WebUtil.isEmpty(qryParam.get("start_filter_date"))){
    					qryParam.put("receive_time_1", qryParam.get("start_filter_date"));
    				}
    				if(!WebUtil.isEmpty(qryParam.get("end_filter_date"))){
    					qryParam.put("receive_time_2", qryParam.get("end_filter_date"));
    				}
    				break;
    		}
    	}
    	List<Task> taskList=taskservice.queryTaskListForAccount(qryParam);
    	for(int i=0;i<taskList.size();i++){
    		Task tempt=taskList.get(i);
    		tempt.setProduct_name(SRMStringUtil.escapeHtml(tempt.getProduct_name()));
    		tempt.setRemark(SRMStringUtil.escapeHtml(tempt.getRemark()));
    		tempt.setProducers_company_name(SRMStringUtil.escapeHtml(tempt.getProducers_company_name()));
    		tempt.setSend_company_name(SRMStringUtil.escapeHtml(tempt.getSend_company_name()));
    		tempt.setReceive_company_name(SRMStringUtil.escapeHtml(tempt.getReceive_company_name()));
    	}
		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL)!=null?qryParam.get(Const.AJAX_SERVICE_TOTAL):0);
		respMap.put(Const.AJAX_SERVICE_CURRENT_PAGE, npage);
		respMap.put(Const.AJAX_DATA_ROOT, taskList);
		return respMap;
	}
	/**获取各种状态任务单的数量，发布任务的供应商*/
	@RequestMapping(value="/getTaskCountOfAllState.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskCountOfAllState(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();	
		AllStateVo vo=taskservice.getTaskCountOfAllState(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, vo);
		return respMap;
	}	
	/**取消任务单，发布任务的供应商
	 * t_id	reason*/
	@DocLogger(explain="取消一个任务单")//日志解释注释*
	@RequestMapping(value="/updateTaskState2Stop.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> updateTaskState2Stop(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定任务单");
			return respMap;
		}
		if(WebUtil.isEmpty(qryParam.get("reason"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "请输入取消原因");
			return respMap;
		}
		boolean hasPermissoin=taskservice.getPermissoinForSender(qryParam);//判断操作权限
		if(!hasPermissoin){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "不是发布任务方，没有操作权限");
			return respMap;
		}
		
		JSONObject json =taskservice.updateTaskState2Stop(qryParam);
		if(!json.getBoolean("success")){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, json.get("message"));
			return respMap;
		}else{
			respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, json.get("message"));
		}
		return respMap;
	}
	/**派发任务单，发布任务的供应商
	 * t_id*/
	@DocLogger(explain="所有条件都满足，派发一个任务单")//日志解释注释*
	@RequestMapping(value="/updateTaskState2Send.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> modifyState2send(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定任务单");
			return respMap;
		}
		boolean hasPermissoin=taskservice.getPermissoinForSender(qryParam);//判断操作权限
		if(!hasPermissoin){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "不是发布任务方，没有操作权限");
			return respMap;
		}
		
		JSONObject json =taskservice.updateTaskState2Send(qryParam);
		if(!json.getBoolean("success")){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, json.get("message"));
			return respMap;
		}
		if(json.getBoolean("toConfirm")){
			respMap.put("toConfirm",true);
		}else{
			respMap.put("toConfirm",false);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, json.get("message"));
		}
		return respMap;
	}
	/**派发任务单，发布任务的供应商
	 * t_id*/
	@DocLogger(explain="在任务单文件不全的情况下，派发一个任务单")//日志解释注释*
	@RequestMapping(value="/updateTaskState2SendSecond.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> updateTaskState2SendSecond(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定任务单");
			return respMap;
		}
		boolean hasPermissoin=taskservice.getPermissoinForSender(qryParam);//判断操作权限
		if(!hasPermissoin){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "不是发布任务方，没有操作权限");
			return respMap;
		}
		
		JSONObject json =taskservice.updateTaskState2SendSecond(qryParam);
		if(!json.getBoolean("success")){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, json.get("message"));
			return respMap;
		}else{
			respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, json.get("message"));
		}
		return respMap;
	}
	/**批量派发任务单，发布任务的供应商
	 * t_id*/
	@DocLogger(explain="一次批量派发任务单")//日志解释注释*
	@RequestMapping(value="/updateTaskStateForList.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> updateTaskStateForList(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();				
		JSONObject json =taskservice.updateTaskStateForList(qryParam);
		if(!json.getBoolean("success")){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, json.get("message"));
			return respMap;
		}else{
			respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, json.get("message"));
		}
		return respMap;
	}
	
	
	/**收回任务单，发布任务的供应商
	 * t_id*/
	@DocLogger(explain="收回一个任务单")//日志解释注释*
	@RequestMapping(value="/updateTaskState2toBeSend.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> updateTaskState2toBeSend(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定任务单");
			return respMap;
		}
		boolean hasPermissoin=taskservice.getPermissoinForSender(qryParam);//判断操作权限
		if(!hasPermissoin){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "不是发布任务方，没有操作权限");
			return respMap;
		}
		
		JSONObject json =taskservice.updateTaskState2toBeSend(qryParam);
		if(!json.getBoolean("success")){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, json.get("message"));
			return respMap;
		}else{
			respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, json.get("message"));
		}
		return respMap;
	}
	/**收回任务单，发布任务的供应商
	 * t_id*/
	@DocLogger(explain="批量收回任务单")//日志解释注释*
	@RequestMapping(value="/updateTaskState2toBeSendList.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> updateTaskState2toBeSendList(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();	
	
		JSONObject json =taskservice.updateTaskState2toBeSendList(qryParam);
		if(!json.getBoolean("success")){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, json.get("message"));
			return respMap;
		}else{
			respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, json.get("message"));
		}
		return respMap;
	}
	/**获取任务单信息，发布任务的供应商
	 * t_id*/
	@RequestMapping(value="/getTaskByID.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskByID(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定任务单");
			return respMap;
		}
		boolean hasPermissoin=taskservice.getPermissoinForSender(qryParam);//判断操作权限
		if(!hasPermissoin){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "不是发布任务方，没有操作权限");
			return respMap;
		}
		Task task=taskservice.getTaskByT_id(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, task);
		return respMap;
	}
	/**
	 * 查询当前的任务单的状态
	* @Description:
	* TaskCtrl
	* getTaskByID
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-11-22 下午3:03:12
	 */
	@RequestMapping(value="/getTaskStateByID.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskStateByID(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定任务单");
			return respMap;
		}
		Integer status = taskservice.getTaskStateByID(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, status);
		return respMap;
	}
	/**更新计划开工、完工日期
	 * t_id plan_start plan_complete*/
	@DocLogger(explain="更新一个任务单的计划时间和计划完工时间")//日志解释注释*
	@RequestMapping(value="/updateTaskPlanDate.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> updateTaskPlanDate(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定任务单");
			return respMap;
		}
		if(WebUtil.isEmpty(qryParam.get("plan_start"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "请输入计划开工日期");
			return respMap;
		}
		if(WebUtil.isEmpty(qryParam.get("plan_complete"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "请输入计划完工日期");
			return respMap;
		}
		boolean hasPermissoin=taskservice.getPermissoinForSender(qryParam);//判断操作权限
		if(!hasPermissoin){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "不是发布任务方，没有操作权限");
			return respMap;
		}
		String plan_start=qryParam.get("plan_start").toString();
		String plan_complete=qryParam.get("plan_complete").toString();
		String eL = "^[0-9]{4}-[0-9]{2}-[0-9]{2}$";
		Pattern p = Pattern.compile(eL);
		Matcher m = p.matcher(plan_start);
		boolean dateFlag1 = m.matches();
		Matcher m2 = p.matcher(plan_complete);
		boolean dateFlag2 = m2.matches();
		if(!dateFlag1 || !dateFlag2){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "日期格式不对");
			return respMap;
		}
		JSONObject json =taskservice.updateTaskPlanDate(qryParam);
		if(!json.getBoolean("success")){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, json.get("message"));
			return respMap;
		}
		return respMap;
	}
	/**更新任务单说明
	 * t_id remark*/
	@DocLogger(explain="更新一个任务单说明")//日志解释注释*
	@RequestMapping(value="/updateTaskRemark.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> updateTaskRemark(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定任务单");
			return respMap;
		}		
		if(qryParam.get("remark")!=null && qryParam.get("remark").toString().length()>100){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "说明限制输入100字符");
			return respMap;
		}
		boolean hasPermissoin=taskservice.getPermissoinForSender(qryParam);//判断操作权限
		if(!hasPermissoin){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "不是发布任务方，没有操作权限");
			return respMap;
		}
		JSONObject json =taskservice.updateTaskRemark(qryParam);
		if(!json.getBoolean("success")){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, json.get("message"));
			return respMap;
		}
		return respMap;
	}
	/**更新外协单位
	 * t_id    company_id*/
	@DocLogger(explain="更新一个任务单的外协单位")//日志解释注释*
	@RequestMapping(value="/updateTaskreceive_company.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> updateTaskreceive_company(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定任务单");
			return respMap;
		}
		if(WebUtil.isEmpty(qryParam.get("company_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "生产方未指定");
			return respMap;
		}
		boolean hasPermissoin=taskservice.getPermissoinForSender(qryParam);//判断操作权限
		if(!hasPermissoin){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "不是发布任务方，没有操作权限");
			return respMap;
		}
		qryParam.put("receive_company", qryParam.get("company_id"));
		JSONObject json =taskservice.updateTaskreceive_company(qryParam);
		if(!json.getBoolean("success")){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, json.get("message"));
			return respMap;
		}
		return respMap;
	}
	/**更新质检类型
	 * t_id qc_type*/
	@DocLogger(explain="更新一个任务单的质检类型")//日志解释注释*
	@RequestMapping(value="/updateTaskqc_type.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> updateTaskqc_type(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定任务单");
			return respMap;
		}
		if(WebUtil.isEmpty(qryParam.get("qc_type"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "请选择质检类型");
			return respMap;
		}
		boolean hasPermissoin=taskservice.getPermissoinForSender(qryParam);//判断操作权限
		if(!hasPermissoin){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "不是发布任务方，没有操作权限");
			return respMap;
		}
		JSONObject json =taskservice.updateTaskqc_type(qryParam);
		if(!json.getBoolean("success")){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, json.get("message"));
			return respMap;
		}
		return respMap;
	}
	/**更新任务总数
	 * t_id    total_qty
	@RequestMapping(value="/updateTasktotal_qty.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> updateTasktotal_qty(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定任务单");
			return respMap;
		}
		if(WebUtil.isEmpty(qryParam.get("total_qty"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "请输入任务总数");
			return respMap;
		}
		boolean hasPermissoin=taskservice.getPermissoinForSender(qryParam);//判断操作权限
		if(!hasPermissoin){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "不是发布任务方，没有操作权限");
			return respMap;
		}
		JSONObject json =taskservice.updateTasktotal_qty(qryParam);
		if(!json.getBoolean("success")){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, json.get("message"));
			return respMap;
		}
		return respMap;
	}*/
	/**获取任务单,生产方的供应商*/

	@RequestMapping(value="/getTaskListForProducer.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskListForProducer(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("state"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "姓名为空");
			return respMap;
		}
		int htmlstate=Integer.parseInt(qryParam.get("state").toString());
		int state=0;
		switch(htmlstate){
			case 1:
				state=10;
				break;
			case 2:
				state=15;
				break;
			case 3:
				state=20;
				break;
			case 4:
				state=25;
				break;	
			case 5:
				state=40;
				break;	
			default:
				state=0;
				break;
		}
		qryParam.put("state", state);
		int nLimit =0,npage =0;
    	nLimit =qryParam.get("limit")!=null?Integer.parseInt(qryParam.get("limit").toString()):0;
    	npage =qryParam.get("page")!=null?Integer.parseInt(qryParam.get("page").toString()):0;
    	int nStart=nLimit*npage;
    	qryParam.put("start",nStart);
    	if(WebUtil.isEmpty(qryParam.get("select_type"))){
    		qryParam.put("start_filter_date", null);
    		qryParam.put("end_filter_date", null);
    	}else{
    		int select_type=Integer.parseInt(qryParam.get("select_type").toString());
    		switch(select_type){
    			case 1:
    				qryParam.put("plan_start_flag", true);
    				if(!WebUtil.isEmpty(qryParam.get("start_filter_date"))){
    					qryParam.put("plan_start_1", qryParam.get("start_filter_date"));
    				}
    				if(!WebUtil.isEmpty(qryParam.get("end_filter_date"))){
    					qryParam.put("plan_start_2", qryParam.get("end_filter_date"));
    				}
    				break;
    			case 2:
    				qryParam.put("send_time_flag", true);
    				if(!WebUtil.isEmpty(qryParam.get("start_filter_date"))){
    					qryParam.put("send_time_1", qryParam.get("start_filter_date"));
    				}
    				if(!WebUtil.isEmpty(qryParam.get("end_filter_date"))){
    					qryParam.put("send_time_2", qryParam.get("end_filter_date"));
    				}
    				break;
    			case 3:
    				qryParam.put("receive_time_flag", true);
    				if(!WebUtil.isEmpty(qryParam.get("start_filter_date"))){
    					qryParam.put("receive_time_1", qryParam.get("start_filter_date"));
    				}
    				if(!WebUtil.isEmpty(qryParam.get("end_filter_date"))){
    					qryParam.put("receive_time_2", qryParam.get("end_filter_date"));
    				}
    				break;
    		}
    	}
    	List<Task> taskList=taskservice.getTaskListForProducer(qryParam);
		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL)!=null?qryParam.get(Const.AJAX_SERVICE_TOTAL):0);
		respMap.put(Const.AJAX_SERVICE_CURRENT_PAGE, npage);
		respMap.put(Const.AJAX_DATA_ROOT, taskList);
		return respMap;
	}
	/**
	* 获得运单的生产和生产完成的所有任务单的列表
	* @Description:
	* TaskCtrl
	* getTaskListForShipping
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-12-8 下午3:29:47
	 */
	@RequestMapping(value="/getTaskListForShipping.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskListForShipping(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();					
		int nLimit =0,npage =0;
    	nLimit =qryParam.get("limit")!=null?Integer.parseInt(qryParam.get("limit").toString()):0;
    	npage =qryParam.get("page")!=null?Integer.parseInt(qryParam.get("page").toString()):0;
    	int nStart=nLimit*npage;
    	qryParam.put("start",nStart);    	
    	TakForShipping takForShipping = taskservice.getTaskListForShipping(qryParam);
		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL)!=null?qryParam.get(Const.AJAX_SERVICE_TOTAL):0);
		respMap.put(Const.AJAX_SERVICE_CURRENT_PAGE, npage);
		respMap.put(Const.AJAX_DATA_ROOT, takForShipping);
		return respMap;
	}
	/**获取各种状态任务单的数量,生产方的供应商*/
	@RequestMapping(value="/getProducerTaskCountOfAllState.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getProducerTaskCountOfAllState(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();	
		AllStateVo vo=taskservice.getProducerTaskCountOfAllState(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, vo);
		return respMap;
	}
	/**确认接收任务单,生产方的供应商
	 * t_id*/
	@DocLogger(explain="确认接收一个任务单")//日志解释注释*
	@RequestMapping(value="/updateTaskState2producting.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> updateTaskState2producting(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定任务单");
			return respMap;
		}
		boolean hasPermissoin=taskservice.getPermissoinForProducer(qryParam);//判断操作权限
		if(!hasPermissoin){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "不是生产方，没有操作权限");
			return respMap;
		}
		
		JSONObject json =taskservice.updateTaskState2producting(qryParam);
		if(!json.getBoolean("success")){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, json.get("message"));
			return respMap;
		}else{
			respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, json.get("message"));
		}
		return respMap;
	}
	/**批量确认接收任务单,生产方的供应商
	 * t_id*/
	@DocLogger(explain="批量确认接收任务单")//日志解释注释*
	@RequestMapping(value="/updateTaskState2productingList.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> updateTaskState2productingList(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();			
		JSONObject json =taskservice.updateTaskState2productingList(qryParam);
		if(!json.getBoolean("success")){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, json.get("message"));
			return respMap;
		}else{
			respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, json.get("message"));
		}
		return respMap;
	}
	/**获取任务单信息,生产方的供应商
	 * t_id*/
	@RequestMapping(value="/getProductTaskByID.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getProductTaskByID(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定任务单");
			return respMap;
		}
		boolean hasPermissoin=taskservice.getPermissoinForProducer(qryParam);//判断操作权限
		if(!hasPermissoin){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "不是生产方，没有操作权限");
			return respMap;
		}
		Task task=taskservice.getTaskByT_id(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, task);
		return respMap;
	}
	/**
	 * @Description:查询出该任务单的质检类型
	 * @param request
	 * @param response
	 * @return
	 * @author chenlong
	 * @throws Exception
	 */
	@RequestMapping(value="/getTaskQcType.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskQcType(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定任务单");
			return respMap;
		}
		boolean hasPermissoin=taskservice.getPermissoinForSender(qryParam);//判断操作权限
		if(!hasPermissoin){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "不是发布任务方，没有操作权限");
			return respMap ;
		}
		Integer t_id = Integer.parseInt(qryParam.get("t_id").toString());
		String qc_type=taskservice.getTaskQcType(t_id);
		respMap.put(Const.AJAX_DATA_ROOT, qc_type);
		return respMap;
	}
	/**
	 * @Description:更新任务单的指导文件信息
	 * @param request
	 * @param response
	 * @return
	 * @author chenlong
	 * @throws Exception
	 */
	@DocLogger(explain="更新一条任务单的指导文件信息")//日志解释注释*
	@RequestMapping(value="/updateOperators_file.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> updateOperators_file(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		taskservice.updateOperators_file(qryParam);		
		return respMap;
	}
	/**
	 * @Description:更新任务单的接收方id
	 * @param request
	 * @param response
	 * @return
	 * @author chenlong
	 * @throws Exception
	 */
	@DocLogger(explain="更新一条任务单的接收方公司")//日志解释注释*
	@RequestMapping(value="/updateproducers.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> updateproducers(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		String message = taskservice.updateproducers(qryParam);	
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
		respMap.put(Const.AJAX_SERVICE_MESSAGE,message);
		return respMap;
	}
	/**
	 * @Description:返回任务单的状态值
	 * @param request
	 * @param response
	 * @return
	 * @author chenlong
	 * @throws Exception
	 */
	@RequestMapping(value="/getTaskState.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTaskState(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		Integer state = taskservice.getTaskState(qryParam);	
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
		respMap.put("getstate",state);
		return respMap;
	}
	/**
	 * @Description: 验证发货量是否小于产量
	 * @param request
	 * @param response
	 * @return
	 * @author chenlong
	 * @throws Exception
	 */
	@RequestMapping(value="/regTaskproduct.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> regTaskproduct(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		qryParam.put("operator", loginAccount.getLogin_name());
		qryParam.put("is_delete", 0);	
		String message = taskservice.regTaskproduct(qryParam);	
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
		respMap.put(Const.AJAX_SERVICE_MESSAGE,message);
		return respMap;
	}
	/**
	 * @Description:查询出任务单中的生产数量
	 * @param request
	 * @param response
	 * @return
	 * @author chenlong
	 * @throws Exception
	 */
	@RequestMapping(value="/getTotalQty.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTotalQty(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定任务单");
			return respMap;
		}
		double product = taskservice.getTotalQty(qryParam);	
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
		respMap.put(Const.AJAX_DATA_ROOT,product);
		return respMap;
	}
	/**
	 * @Description:查询出任务单中的生产数量
	 * @param request
	 * @param response
	 * @return
	 * @author chenlong
	 * @throws Exception
	 */
	@RequestMapping(value="/getTotalQtyForProducer.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getTotalQtyForProducer(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定任务单");
			return respMap;
		}
		double product = taskservice.getTotalQty(qryParam);	
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
		respMap.put(Const.AJAX_DATA_ROOT,product);
		return respMap;
	}
	/**
	 * 添加终止止的信息
	* @Description:
	* PurchaseOrderController
	* accpetOrderByID
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-9-1 下午5:22:45
	 */
	@RequestMapping(value="/addTaskEndRecord.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> addOrderEndRecord(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单");
			return respMap;
		}
		String message = taskservice.updateTaskStateProhibit(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_DATA_ROOT, message);
		return respMap;
	}
	
	/**
	 * 添加终止止的信息
	* @Description:
	* PurchaseOrderController
	* accpetOrderByID
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-9-1 下午5:22:45
	 */
	@RequestMapping(value="/getTaskEndRecord.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getTaskEndRecord(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单");
			return respMap;
		}
		TaskEndDetails taskEndDetails = taskservice.getTaskEndRecord(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_DATA_ROOT,taskEndDetails);
		return respMap;
	}
	/**
	 * @Description:确认完结
	 * TaskCtrl
	 * comfirmFinish
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-12-7 上午10:07:48
	 */
	@RequestMapping(value="/comfirmFinish.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> comfirmFinish(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定任务单");
			return respMap;
		}
		Task task = taskservice.getTaskByT_id(qryParam);
		if(task.getState()!=20){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "该任务单状态已改变，请刷新页面");
			return respMap;
		}
		if(task.getReturn_qtyVo()<(task.getConfirmed_qty()-task.getQualified_qty())){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "返修数量不足！");
			return respMap;
		}
		taskservice.comfirmFinish(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		return respMap;
	}
	/**
	 * 返回发货量和返修发货量
	* @Description:
	* TaskCtrl
	* getReturnQtyVo
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-12-28 下午2:57:08
	 */
	@RequestMapping(value="/getReturnQtyVo.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getReturnQtyVo(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("t_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS,false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "未指定订单");
			return respMap;
		}
		Task task = taskservice.getReturnQtyVo(qryParam);
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_DATA_ROOT, task);
		return respMap;
	}
	
	@RequestMapping(value="/isTaskStateProhibit.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> isTaskStateProhibit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		Map<String, Object> map = taskservice.isTaskStateProhibit(qryParam);
		respMap.putAll(map);
		return respMap;
	}
	
	
}
