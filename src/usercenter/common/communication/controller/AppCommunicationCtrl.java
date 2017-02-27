/**    
 * 文件名：AppCommunicationCtrl.java    
 *    
 * 版本信息：    
 * 日期：2016-5-4    
 * Copyright 足下 Corporation 2016     
 * 版权所有    
 *    
 */
package usercenter.common.communication.controller;

import java.util.Date;
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

import common.user.model.LoginAccount;

import platform.company.model.PfCompanySimpleInfo;
import platform.company.service.CompanyForPlateFormService;
import usercenter.common.communication.model.AppCommunication;
import usercenter.common.communication.service.AppCommunicationService;
import usercenter.externalTask.service.TaskFileService;
import util.Const;
import util.DataTrans;
import util.SessionUtil;
import util.WebUtil;

/**    
 * 项目名称：outsideeasy    
 * 类名称：AppCommunicationCtrl    
 * 创建人：mishengliang    
 * 创建时间：2016-5-4 上午11:16:43    
 * 修改人：mishengliang
 * 修改时间：2016-5-4 上午11:16:43    
 * @version     
 *     
 */
@Controller
@RequestMapping("appCommunicationCtrl")
public class AppCommunicationCtrl {
	
	@Autowired
	private AppCommunicationService service;
	@Autowired
	private CompanyForPlateFormService supplierService;
	@Autowired
	private TaskFileService taskFileService;
	/**
	 * 增加交流内容
	*addAppCommunication
	*@param request
	*@param response
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-5-6上午10:53:15
	 */
	@RequestMapping(value="addAppCommunication.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> addAppCommunication(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		AppCommunication communication = new AppCommunication();
		Integer task_id = DataTrans.transToIntegerFromString(request.getParameter("taskId"));
		Integer parent_id = DataTrans.transToIntegerFromString(request.getParameter("parentId"));
		Integer company_id = DataTrans.transToIntegerFromString(request.getParameter("companyId"));
		String com_message = request.getParameter("message");
		Integer module_type = DataTrans.transToIntegerFromString(request.getParameter("moduleType"));
		Date create_time = new Date();
		
		communication.setCom_message(com_message);
		communication.setCompany_id(company_id);
		communication.setCreate_time(create_time);
		communication.setParent_id(parent_id);
		communication.setTask_id(task_id);
		communication.setModule_type(module_type);
		
		Map<String, Object> companyInfoMap=supplierService.getCompanyInfoByCompanyId(company_id);
		PfCompanySimpleInfo companySimpleInfo=(PfCompanySimpleInfo)companyInfoMap.get("companyBaseInfo");
		service.addAppCommunication(communication);
		Map<String,Object> params = new HashMap<String, Object>();
		if(!WebUtil.isEmpty(request.getParameter("arr"))){
		  String[] str = request.getParameter("arr").toString().split(",");
		  params.put("arr", str);
		  params.put("record_id", communication.getId());
		  taskFileService.updateCommitImg(params);	//更新交流协作的图片与交流的id
		}
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("file_type",request.getParameter("file_type"));//43代表外协任务单的交流合作上传文件
		param.put("record_id", 0);//0是与物流信息不存在关联
		param.put("t_id", task_id);//
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		param.put("operator_name", loginAccount.getLogin_name());//传入操作员的名称
		taskFileService.deleteLogisticsImg(param);//删除多余的文件
		respMap.put("company_name", companySimpleInfo.getCpyname_cn());
		respMap.put("communication_id", communication.getId());
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "保存成功");
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_200_OK);
		
		return respMap;
	}
	
	/**
	 * 
	*getAppCommunicationList
	*@param request
	*@param response
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-5-6上午10:53:35
	 */
	@RequestMapping(value="getAppCommunicationList.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getAppCommunicationList(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		Map<String,Object> params = WebUtil.getDefaultParamsMap(request);
		
		List<List<AppCommunication>> communications = service.getAppCommunicationList(params);
		
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_DATA_ROOT, communications);
		respMap.put(Const.AJAX_SERVICE_MESSAGE, "获取成功");
		respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_200_OK);
		
		return respMap;
	}
	
}
