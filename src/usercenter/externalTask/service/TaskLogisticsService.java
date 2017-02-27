package usercenter.externalTask.service;




import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import usercenter.externalTask.TaskResponse.TasklogisticsVo;
import usercenter.externalTask.data.TaskLogisticsMapper;
import usercenter.externalTask.model.TaskFile;
import usercenter.externalTask.model.TaskLogistics;
import util.SessionUtil;
import util.WebUtil;


import common.user.model.LoginAccount;


@Service
public class TaskLogisticsService {
	@Autowired
	private TaskLogisticsMapper taskLogisticsMapper;
	@Autowired
	private TaskService taskService;
	@Autowired
	private TaskFileService taskFileService;
	
	/**
	 * 外协方增加一条物流信息
	 * @param taskLogistics
	 * @author chenlong
	 * @throws ParseException 
	 * @date 2016-04-11
	 */
	public String addTaskLogistics(Map<String,Object> params) throws ParseException{
		params.put("send_company",Integer.parseInt(params.get("company_id").toString()));
		params.put("confirm_state",0); //增加一条物流信息时,状态设为未确认状态 :0
		Integer count  = taskLogisticsMapper.getCountLogisticsForsendId(params);//检查发料单号是否重复
		if(count >0){
			return "false";
		}else{
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");	
		TaskLogistics taskLogistics = new TaskLogistics();
		taskLogistics.setConfirm_state(""+0);
		taskLogistics.setSend_company(Integer.parseInt(params.get("company_id").toString()));
		taskLogistics.setDriver(params.get("driver").toString());
		taskLogistics.setPhone_number(params.get("phone_number").toString());
		taskLogistics.setStart_date(sdf.parse(params.get("start_date").toString()));
		taskLogistics.setT_id(Integer.parseInt(params.get("t_id").toString()));
		taskLogistics.setLicence_plate(params.get("licence_plate").toString());
		taskLogistics.setRemark(params.get("remark").toString());
		taskLogistics.setSend_id(params.get("send_id").toString());
		taskLogisticsMapper.addTaskLogistics(taskLogistics);//增加一条物流信息
		Integer imagelen = Integer.parseInt(params.get("imagelen").toString());//物流图片的个数
		if (imagelen != 0){
		for(int i=0;i<imagelen;i++){//循环进行图片中的关联
			Map<String,Object> param = new HashMap<String, Object>();
			param.put("record_id",taskLogistics.getRecord_id());
			param.put("tf_id",params.get("arr["+i+"]").toString());
			taskFileService.updateLogisticsImg(param);
		}
		}
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("file_type", 31);//31代表发料的图片文件类型
		param.put("record_id", 0);//0是与物流信息不存在关联
		param.put("t_id", Integer.parseInt(params.get("t_id").toString()));//
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		param.put("operator_name", loginAccount.getLogin_name());//传入操作员的名称
		taskFileService.deleteLogisticsImg(param);//删除多余的文件
		   return "success";
		}
	}
	/**
	 * 生产增加一条物流信息
	 * @param taskLogistics
	 * @author chenlong
	 * @throws ParseException 
	 * @date 2016-04-11
	 */
	public String addTaskLogisticsForProducer(Map<String,Object> params) throws ParseException{
		params.put("send_company",Integer.parseInt(params.get("company_id").toString()));
		params.put("confirm_state",0); //增加一条物流信息时,状态设为未确认状态 :0
		Integer count  = taskLogisticsMapper.getCountLogisticsForsendId(params);
		if(count >0){
			return "false";
		}else{
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");	
			TaskLogistics taskLogistics = new TaskLogistics();
			taskLogistics.setConfirm_state(""+0);
			taskLogistics.setSend_company(Integer.parseInt(params.get("company_id").toString()));
			taskLogistics.setDriver(params.get("driver").toString());
			taskLogistics.setPhone_number(params.get("phone_number").toString());
			taskLogistics.setStart_date(sdf.parse(params.get("start_date").toString()));
			taskLogistics.setT_id(Integer.parseInt(params.get("t_id").toString()));
			taskLogistics.setLicence_plate(params.get("licence_plate").toString());
			taskLogistics.setRemark(params.get("remark").toString());
			taskLogistics.setSend_id(params.get("send_id").toString());	
			taskLogistics.setSend_count(Double.parseDouble(params.get("send_count").toString()));
		taskLogisticsMapper.addTaskLogistics(taskLogistics);//增加一条物流信息
		Integer imagelen = Integer.parseInt(params.get("imagelen").toString());//物流图片的个数
		if (imagelen != 0){
		for(int i=0;i<imagelen;i++){//循环进行图片中的关联
			Map<String,Object> param = new HashMap<String, Object>();
			param.put("record_id",taskLogistics.getRecord_id());
			param.put("tf_id",params.get("arr["+i+"]").toString());
			taskFileService.updateLogisticsImg(param);
		}
		}
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("file_type", 32);//32代表发货的图片文件类型
		param.put("record_id", 0);//0是与物流信息不存在关联
		param.put("t_id", Integer.parseInt(params.get("t_id").toString()));//
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		param.put("operator_name", loginAccount.getLogin_name());//传入操作员的名称
		taskFileService.deleteLogisticsImg(param);//删除多余的文件
		TasklogisticsVo tasklogisticsVo = taskLogisticsMapper.getTaskLogisticsCount(params);//统计已发货的量
		taskService.updateTaskSendout(tasklogisticsVo,params);//把统计的发货量更新到任务单中字段
		return "success";
		}
	}
	/**
	 * 根据 发送方或接收方 和状态，时间，司机，或车牌 进行物流信息的查询
	 * @param  map params
	 * @author chenlong
	 * @date 2016-04-11
	 */
	public List<TasklogisticsVo> getTaskLogisticsBySearch(Map<String,Object> params){
		List<TasklogisticsVo> list = taskLogisticsMapper.getTaskLogisticsBySearch(params);	
		for(TasklogisticsVo taskLogistics : list ){//是发送方则设置为true，否则设置为接收方false
			if(taskLogistics.getStart_date()!=null){
			taskLogistics.setWeek(WebUtil.getWeek(taskLogistics.getStart_date()));
			 }	 
			if(taskLogistics.getSend_company()==Integer.parseInt(params.get("company_id").toString())){//存在则是外协方
				taskLogistics.setSend(true);
			}else{
			    taskLogistics.setSend(false);
			} 
		}				
		 return list; 
	} 
    /**
	 * 生产方根据id删除一条物流信息
	 * @param id
	 * @author chenlong
	 * @date 2016-04-11
	 */
	public String deleteTaskLogisticsForProducer(Map<String,Object> params){
		Integer id =Integer.parseInt(params.get("record_id").toString());		
		String state = taskLogisticsMapper.getTaskLogisticsState(id);
		if(state==null){
			String message ="此数据不存在";
			return message;
		}
		else if(Integer.parseInt(state)==1){//检查是否已被确认
			String message ="该物流已接收，无法删除";
			return message;
		}else{
		taskLogisticsMapper.deleteTaskLogistics(id);
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("file_type", 32);//
		param.put("record_id", id);//id是与物流信息关联的图片
		taskFileService.deleteLogisticsImg(param);//删除物流信息关联的图片
		params.put("send_company",Integer.parseInt(params.get("company_id").toString()));
		TasklogisticsVo tasklogisticsVo = taskLogisticsMapper.getTaskLogisticsCount(params);//统计已发货的量
		taskService.updateTaskSendout(tasklogisticsVo,params);//把统计的发货量更新到任务单中字段
		return null;
		}
	}
	/**
	 * 外协方根据id删除一条物流信息
	 * @param id
	 * @author chenlong
	 * @date 2016-04-11
	 */
	public String deleteTaskLogistics(Integer id){
		String state = taskLogisticsMapper.getTaskLogisticsState(id);		
		if(state==null){
			String message ="此数据不存在";
			return message;
		}
		else if(Integer.parseInt(state)==1){//检查是否已被确认
			String message ="该物流已接收，无法删除";
			return message;
		}else{
		taskLogisticsMapper.deleteTaskLogistics(id);
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("file_type", 31);//31代表发料的图片文件类型
		param.put("record_id", id);//id是与物流信息关联的图片
		taskFileService.deleteLogisticsImg(param);//删除物流信息关联的图片
		    return null; 
		}
	}
	/**
	 * 编辑物流信息时的查询出该信息
	 * @return
	 * @author chenlong
	 * @date 2016-04-11
	 */
	public TaskLogistics getTaskLogistics(Integer id){		
		return taskLogisticsMapper.getTaskLogistics(id);
		
	}
	/**
	 * 生产确认物流信息
	 * @param  map params
	 * @author chenlong
	 * @date 2016-04-11
	 */
	public String updateTaskLogistics(Map<String,Object> params ){
		String state = taskLogisticsMapper.getTaskLogisticsState(Integer.parseInt(params.get("record_id").toString()));
		if(state==null){
			String message ="此数据不存在";
			return message;
		}else if(Integer.parseInt(state)==1){//检查是否已被确认
			String message ="该物流已接收，无法操作";
			return message;
		}else{
		params.put("confirm_state",1);//确认物流信息,状态设为已收货状态 :1
		params.put("confirm_dt",new Date());//确认物流信息,状态设为已收货状态 :1
		taskLogisticsMapper.updateTaskLogistics(params);
		return "成功";
		}
	}
	/**
	 * 外协更新物流信息
	 * @param params
	 * @return
	 */	
	public String updateTaskLogisticsvo(Map<String,Object> params){
		String state = taskLogisticsMapper.getTaskLogisticsState(Integer.parseInt(params.get("record_id").toString()));
		if(state==null){
			String message ="此数据不存在";
			return message;
		}else if(Integer.parseInt(state)==1){//检查是否已被确认
			String message ="已接收，无法编辑";
			return message;
		}else{
		taskLogisticsMapper.updateTaskLogisticsvo(params);
		    return null;
		}
	}
	/**
	 * 生产更新物流信息
	 * @param params
	 * @author chenlong
	 */
	public String updateTaskLogisticspro(Map<String,Object> params){
		String message = taskService.regeditproduct(params);//编辑时验证发货量是否小于产量
		if(message=="发送的货物量大于您所生产的量,请重新输入"){
			return message;
		}else {
		String state = taskLogisticsMapper.getTaskLogisticsState(Integer.parseInt(params.get("record_id").toString()));
		if(state==null){
			message ="此数据不存在";
			return message;
		}else if(Integer.parseInt(state)==1){//检查是否已被确认
			message ="已接收，无法编辑";
			return message;
		}else{
		taskLogisticsMapper.updateTaskLogisticspro(params);
		params.put("send_company",Integer.parseInt(params.get("company_id").toString()));
		TasklogisticsVo tasklogisticsVo = taskLogisticsMapper.getTaskLogisticsCount(params);//统计已发货的量
		taskService.updateTaskSendout(tasklogisticsVo,params);//把统计的发货量更新到任务单中字段
		    return message;
		}
		}
	}
	/**
	 * 外协出物流的确认状态
	 * @param params
	 * @return
	 * @author chenlong
	 * @date 2016-5-31
	 */
	public String getTaskLogisticsState(Map<String,Object> params){
		String state = taskLogisticsMapper.getTaskLogisticsState(Integer.parseInt(params.get("record_id").toString()));
		String message ="成功";
		if(state==null){
			 message ="此数据不存在";
			return message;
		}
		else if(Integer.parseInt(state)==1){//检查是否已被确认
			 message ="该物流已接收，无法操作";
			return message;
		}
		return message;
	}
	/**
	 * 查询有多少未确认的物流信息
	 * @param id false
	 * @return
	 * @author chenlong
	 * @date 2016-04-11
	 */
	public Integer getCountLogisticsForState(Integer id){
		return taskLogisticsMapper.getCountLogisticsForState(id);
	}
	/**
	 * 查询未确认的物流信息
	 * @param id false
	 * @return
	 * @author chenlong
	 * @date 2016-04-11
	 */
	public List<TaskLogistics> getLogisticsForState(Integer id){
		return taskLogisticsMapper.getLogisticsForState(id);
	}
	/**统计该任务单发料未接收的数量
	 * 查询未确认的物流信息
	 * @param id false
	 * @return
	 * @author chenlong
	 * @date 2017-01-02
	 */
	public Integer getLogisticsForStateSend(Map<String,Object> params){
		return taskLogisticsMapper.getLogisticsForStateSend(params);
	}
	/**
	 * @Description: 查询任务单号是否重复
	 * @param Map<String,Object> params
	 * @return String
	 * @author chenlong
	 * @date 2016-5-31
	 */
	public String regSendId(Map<String,Object> params){
		params.put("send_company",Integer.parseInt(params.get("company_id").toString()));
		TaskLogistics taskLogistics =  taskLogisticsMapper.regSendId(params);		
		String message = "成功";
		if(taskLogistics!=null){
			 message = "任务单号重复";
			return message;
		}
		return message;	
	}
	/**
	 * @Description: 上传工艺文件的图片文件进mongoDB，并保存文件序列号
	 * @param TaskFile arr,CommonsMultipartFile file
	 * @return Map<String,Object>
	 * @author chenlong
	 * @date 2016-6-22
	 */
	public Map<String,Object> addTaskFile(TaskFile arr,CommonsMultipartFile file,Map<String,Object> params) throws Exception {
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();//获取登陆的平台账户
		arr.setOperator_name(loginAccount.getLogin_name());//传入操作员的名称
		return taskFileService.addTaskFile(arr,file,params);//上传工艺文件的图片文件进mongoDB，并保存文件序列号
	}
	
}
