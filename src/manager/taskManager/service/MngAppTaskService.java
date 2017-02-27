package manager.taskManager.service;

import java.util.List;
import java.util.Map;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import util.SysSerialId;

import manager.taskManager.data.MngAppTaskMapper;
import manager.taskManager.model.MngAppTask;
import manager.taskManager.taskResponse.MngTask;





@Service
public class MngAppTaskService {
	@Autowired
	private MngAppTaskMapper mapper;

/**
 * 用于后台的显示mes任务单
 * @param params
 * @return  List<MngTask>
 * @author chenlong
 * @date 2016-04-07
 */
	public List<MngTask> getAppTaskList(Map<String,Object> params) {
		return mapper.getAppTaskList(params);
	}
	
	public void addAppTask(MngAppTask[] arr) {
		for(MngAppTask obj: arr) {
			obj.setSerial_no(SysSerialId.getNewNextSerialId());//自动生成任务单流水号
			mapper.addAppTask(obj);
		}
	}
	public void updateAppTask(MngAppTask[] arr) {
		for(MngAppTask obj: arr) {
			mapper.updateAppTask(obj);
		}
	}
	public void deleteAppTask(MngAppTask[] arr) {
		for(MngAppTask obj: arr) {
			mapper.deleteAppTask(obj);
		}
	}
	/**
	 * 任务单的状态有 0:未派发  1:派发中 3:生产中  4:生产完成  5:完成状态  2:终止
	 * 检查状态是否为0,是则可以删除true，不是则为false
	 * @param params
	 * @return
	 * @author chenlong
	 * @date 2016-04-05
	 */
	public String candeletedbg(Map<String,Object> params){
		JSONObject json = new JSONObject();
		json.put("success", true);
		int status = mapper.getStatusById(params);
		if(status <= 3){
		json.put("status", false);		
		
		}else{
			json.put("status", true);
		}
		return json.toString();
		
		
	}
	/**
	 * 检查能否add
	 * @param params
	 * @return
	 * @author chenlong
	 * @date 2016-04-05
	 */
	public String checkAddbg(Map<String,Object> params){
		JSONObject json = new JSONObject();
		json.put("success", true);
		int count = mapper.checkAdd(params);
		if(count == 0){
		json.put("status", true);		
		
		}else{
			json.put("status", false);
		}
		return json.toString();	
	}
	/**
	 * 检查能否update
	 * @param params
	 * @return
	 * @author chenlong
	 * @date 2016-04-05
	 */
	public String checkUpdatebg(Map<String,Object> params){
		JSONObject json = new JSONObject();
		json.put("success", true);
		int count = mapper.checkUpdate(params);
		if(count == 0){
		json.put("status", true);		
		
		}else{
			json.put("status", false);
		}
		return json.toString();	
	}
}
