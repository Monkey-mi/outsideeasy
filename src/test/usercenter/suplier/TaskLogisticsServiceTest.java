package test.usercenter.suplier;


import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import test.base.BaseTest;

import usercenter.externalTask.TaskResponse.LogisticsItemVo;
import usercenter.externalTask.TaskResponse.TaskOutputVo;
import usercenter.externalTask.data.TaskLogisticsItemMapper;
import usercenter.externalTask.model.TaskLogistics;
import usercenter.externalTask.model.TaskProcessSection;
import usercenter.externalTask.service.TaskLogisticsItemService;
import usercenter.externalTask.service.TaskLogisticsService;
import usercenter.externalTask.service.TaskOutputService;
import usercenter.externalTask.service.TaskProcessSectionService;

public class TaskLogisticsServiceTest extends BaseTest{
	@Autowired
	private TaskLogisticsService taskLogisticsService;
	@Autowired
	private TaskOutputService taskOutputService;
	@Autowired
	private  TaskProcessSectionService taskProcessSectionService;
	@Autowired
	private TaskLogisticsItemService taskLogisticsItemService;

	@Test
	public void getCountLogisticsForStateTest(){
		Integer t_id =1;
		Integer count = taskLogisticsService.getCountLogisticsForState(t_id);
		logger.debug("--------"+count);
	}
	@Test
	public void getLogisticsForState(){
		Integer t_id =1;
		List<TaskLogistics> taskLogistics = taskLogisticsService.getLogisticsForState(t_id);
		for(TaskLogistics t : taskLogistics){
		logger.debug("--------"+t);
	}
	}
	@Test
	public void getTaskOutputList(){
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("t_id",2);
		 List<TaskOutputVo> list =  taskOutputService.getTaskOutputList(map);
		for(TaskOutputVo t : list){
		logger.debug("--------"+t);
	}
	}
	@Test
	public void getTaskProcessSectionList(){
		Integer t_id =2;
		
		List<TaskProcessSection> list = taskProcessSectionService.getTaskProcessSectionList(t_id);
		for(TaskProcessSection t : list){
		logger.debug("--------"+t);
	}
	}
	@Test
	public void addTaskOutput(){
		/*Map<String,Object> map = new HashMap<String, Object>();
		map.put("t_id", 2);
		map.put("sec_id", 9);
		map.put("worker_no", 90);
		map.put("yield_qty", 20000);
		map.put("scrq", 2016-04-29);
		Integer count = taskOutputService.addTaskOutput(map);
		
		logger.debug("--------______"+count);
	*/
	}
//	@Test
//	public void getLogisticsItemforState(){
//		Map<String,Object> map = new HashMap<String, Object>();
//		map.put("t_id", 2);
//	
//		List<LogisticsItemVo> list = taskLogisticsItemService.getLogisticsItemforState(t_id);
//		for(LogisticsItemVo logisticsItemVo: list){
//			logger.debug("--------______"+logisticsItemVo.getSend_id());
//		}
//	
//	
//	}
//	@Test
//	public void getTaskLogisticsList(){
//			Integer t_id =1;
//			List<TasklogisticsVo> taskLogistics = taskLogisticsService.getTaskLogisticsList(t_id);
//			for(TasklogisticsVo t : taskLogistics){
//				
//			logger.debug("--------"+t.toString());
//		}
//		}
//	@Test
//	public void getTaskLogisticsBySearchs(){
//		Map<String ,Object> params = new  HashMap<String, Object>();
//		params.put("t_id",2);
//		params.put("tpye",1);
//		params.put("state",1);
//		
//		List<TaskLogistics> taskLogistics = taskLogisticsService.getTaskLogisticsBySearch(params);
//		for(TaskLogistics t : taskLogistics){
//			logger.debug("--------"+t);
//		
//	}
//	}
}
