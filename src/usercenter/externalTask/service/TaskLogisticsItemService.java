package usercenter.externalTask.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import common.user.model.LoginAccount;

import usercenter.externalTask.TaskResponse.LogisticsCount;
import usercenter.externalTask.TaskResponse.LogisticsItemAll;
import usercenter.externalTask.TaskResponse.LogisticsItemVo;
import usercenter.externalTask.TaskResponse.QcCountVo;
import usercenter.externalTask.TaskResponse.QcVo;
import usercenter.externalTask.data.TaskLogisticsItemMapper;
import usercenter.externalTask.data.TaskLogisticsMapper;
import usercenter.externalTask.data.TaskMapper;
import usercenter.externalTask.data.TaskQcMapper;
import usercenter.externalTask.model.Task;
import usercenter.externalTask.model.TaskLogisticsItem;
import util.SessionUtil;
import util.WebUtil;

@Service
public class TaskLogisticsItemService {
@Autowired
private TaskLogisticsItemMapper taskLogisticsItemMapper;
@Autowired
private TaskLogisticsMapper taskLogisticsMapper;
@Autowired
private TaskQcMapper taskQcMapper;
@Autowired
private TaskMapper taskMapper;
@Autowired
private TaskService taskService;
@Autowired
private  TaskLogisticsService taskLogisticsService;

/**
 * 显示来货记录和统计信息
 * @param taskId
 * @return
 * @author chenlong
 * @date 2016-04-11
 */
public LogisticsItemAll getLogisticsItemList(Integer t_id){
	LogisticsItemAll logisticsItemAll = new LogisticsItemAll();
	LogisticsCount logisticsCount = new LogisticsCount();
	 double deliver = 0,arrived = 0,receive = 0;
	List<LogisticsItemVo> list = taskLogisticsItemMapper.getLogisticsItemList(t_id);
	for(LogisticsItemVo logisticsItemVo : list){
		deliver = WebUtil.add(logisticsCount.getDeliver_count(),logisticsItemVo.getDeliver_no());
		arrived = WebUtil.add(logisticsCount.getArrived_count(),logisticsItemVo.getArrived_no());
		receive = WebUtil.add(logisticsCount.getReceive_count(),logisticsItemVo.getReceive_no());
		logisticsCount.setArrived_count(arrived);
		logisticsCount.setDeliver_count(deliver);
		logisticsCount.setReceive_count(receive);
	}
	logisticsCount.setArrived_count(arrived);
	logisticsCount.setDeliver_count(deliver);
	logisticsCount.setReceive_count(receive);
	logisticsItemAll.setLogisticsCount(logisticsCount);
	logisticsItemAll.setLogisticsItemVo(list);
	return logisticsItemAll;
	
}
/**
* @Description:
* TaskLogisticsItemService
* updateLogisticsItemforQc
* @param params void
* @author chenlong
* 2016-8-15 下午12:32:50
 */
public void updateLogisticsItemforQc(Map<String,Object> params){
	taskLogisticsItemMapper.updateLogisticsItemforQc(params);
}

/**
 * 增加一条来货记录
 * @param params
 * @author chenlong
 * @date 2016-04-11
 */
public String addLogisticsItem(Map<String,Object> params){
	String message = taskLogisticsService.getTaskLogisticsState(params);
	if(message=="成功"){
	Date date = new Date();
	params.put("receive_time", date);
	params.put("qc_state", 0);
	taskLogisticsItemMapper.addLogisticsItem(params);
	params.put("confirm_state",1);//确认物流信息,状态设为已收货状态 :1
	params.put("confirm_dt",date);//确认物流信息,状态设为已收货状态 :1
	taskLogisticsMapper.updateTaskLogistics(params);
	//更新任务单中的入库数量
	Map<String,Object> param = new  HashMap<String,Object>();
	param.put("t_id",params.get("t_id") );
	Task task = taskMapper.getTaskToaleConfirmed_qtyVo(params);//查询出已入库的量
	double arrived_no =0;
	arrived_no = Double.parseDouble(params.get("arrived_no").toString());
	arrived_no = WebUtil.add(task.getConfirmed_qtyVo(),arrived_no);
	param.put("confirmed_qtyVo", arrived_no);
	taskMapper.updateTaskToaleConfirmed_qtyVo(param);//更新已入库的量
	return message;
	}else{
		return message;
	}
}
/**
 * 删除一条来货记录
 * @param id
 * @author chenlong
 * @date 2016-04-12
 */
public void deleteLogisticsItem(Integer id){
	taskLogisticsItemMapper.deleteLogisticsItem(id);
}

/**
 * 查询该物流信息是否接受过，接受过则返回值大于0
 * @param record_id
 * @return
 * @author chenlong
 * @date 2016-04-14
 */
public Integer getTaskItemForRecordId(Integer record_id){
	return taskLogisticsItemMapper.getTaskItemForRecordId(record_id);
}
/**
 * 查询出未质检的物流信息的批次号集合
 * @param record_id
 * @return
 * @author chenlong
 * @date 2016-05-04
 */
public List<LogisticsItemVo>  getLogisticsItemforState(Map<String,Object> params){
	
	return taskLogisticsItemMapper.getLogisticsItemforState(Integer.parseInt(params.get("t_id").toString()));
}
/**
 *  查询出选择的未质检的物流信息的到货量
 * @param item_id
 * @return
 * @author chenlong
 * @date 2016-05-19
 */
public TaskLogisticsItem getLogisticsItemforCount(Map<String,Object> params){
	return taskLogisticsItemMapper.getLogisticsItemforCount(params);
}
/**
 * 入库前质检增加一条来货记录,并同时默认已质检过,在质检中增加一条质检信息
 * @param request
 * @param response
 * @return
 * @throws Exception
 * @author chenlong
 * @param params
 */
public String addTaskLogisticsItemForQc(Map<String,Object> params){
	String message = taskLogisticsService.getTaskLogisticsState(params);
	if(message=="成功"){
	params.put("receive_time", new Date());
	params.put("qc_state", 1);//已质检
	taskLogisticsItemMapper.addLogisticsItem(params);
	Integer record_id = Integer.parseInt(params.get("record_id").toString());
	LogisticsItemVo logisticsItemVo = taskLogisticsItemMapper.getLogisticsItemForRecordId(record_id);//查询出物流清单的id和物流表的发送编号
	params.put("confirm_state",1);//确认物流信息,状态设为已收货状态 :1
	params.put("confirm_dt",  new Date());//confirm_dt确认收货的时间
	taskLogisticsMapper.updateTaskLogistics(params);
	Map<String,Object> param = new  HashMap<String,Object>();
	param.put("t_id", params.get("t_id"));
	param.put("record_id", logisticsItemVo.getItem_id());
	param.put("qc_count", params.get("arrived_no"));
	param.put("unqualified_no", Integer.parseInt(params.get("arrived_no").toString())-Integer.parseInt(params.get("receive_no").toString()));
	param.put("qc_time", new Date());
	param.put("send_id",logisticsItemVo.getSend_id());
	LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
	param.put("qc_operator",loginAccount.getLogin_name());

	taskQcMapper.addAppQc(param);//增加质检信息
	
	//更新任务单中的入库数量
		Map<String,Object> param1 = new  HashMap<String,Object>();
		param1.put("t_id",params.get("t_id"));
		Task task1 = taskMapper.getTaskToaleConfirmed_qtyVo(param1);//查询出已入库的量
		double arrived_no =0.0;
		double arrived_vo =0.0;
		arrived_no = Double.parseDouble(params.get("arrived_no").toString());
		arrived_vo = WebUtil.add(task1.getConfirmed_qtyVo(),arrived_no);
		param1.put("confirmed_qtyVo", arrived_vo);
		taskMapper.updateTaskToaleConfirmed_qtyVo(param1);//更新已入库的量
		
	//更新生产任务单的生产信息
	 Task task =  new Task();
	 Integer t_id =Integer.parseInt(params.get("t_id").toString());
	 QcCountVo qcCountVo = new QcCountVo();//质检的统计信息
	 double deliver = 0.0,arrived = 0.0,receive = 0.0;
	 List<QcVo> list = taskQcMapper.getQcList(t_id);//质检信息列表
	 for(QcVo taskQc : list){
		 deliver = WebUtil.add(qcCountVo.getDeliver_qccount(),taskQc.getQc_count());
		 arrived = WebUtil.add(qcCountVo.getArrived_qccount(),taskQc.getUnqualified_no());
		 qcCountVo.setArrived_qccount(arrived);
		 qcCountVo.setDeliver_qccount(deliver);			
	 }
	 qcCountVo.setArrived_qccount(arrived);//不合格总数
	 qcCountVo.setDeliver_qccount(deliver);//交货总数
	 receive = WebUtil.sub(qcCountVo.getDeliver_qccount(),qcCountVo.getArrived_qccount());
	 qcCountVo.setReceive_qccount(receive);//合格总数
	 /*
	  *更新生产任务单的生产信息
	  */
	 task.setConfirmed_qty(qcCountVo.getDeliver_qccount());//交货数量
	 task.setQualified_qty(qcCountVo.getReceive_qccount());//合格数量
	 task.setT_id(t_id);
	 taskService.updateTaskProducted(task);//更新生产信息
	 return message;
	}else{
		return message;
	}
}
 
/**
 * 查询质检状态
 * @param params
 * @return
 * @author chenlong
 * @param params
 * @date 2016-6-2
 */
public String getQcState(Map<String,Object>  params){
	String message = "成功";
	String state  = taskLogisticsItemMapper.getQcState(params);
	if(state== null){
		message = "不存在该物流";
	}else if(Integer.parseInt(state)==1){
		message = "已质检过了";
	}
	return message;
}
}
