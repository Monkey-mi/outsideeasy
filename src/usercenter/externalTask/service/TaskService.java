package usercenter.externalTask.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import common.model.BusinessException;

import common.user.model.LoginAccount;

import usercenter.externalTask.TaskResponse.AllStateVo;
import usercenter.externalTask.TaskResponse.RexAccountVo;
import usercenter.externalTask.TaskResponse.StateCount;
import usercenter.externalTask.TaskResponse.TakForShipping;
import usercenter.externalTask.TaskResponse.TaskEndDetails;
import usercenter.externalTask.TaskResponse.TasklogisticsVo;
import usercenter.externalTask.data.TaskMapper;
import usercenter.externalTask.model.Task;
import usercenter.externalTask.model.TaskDeliverGoods;
import usercenter.externalTask.model.TaskEndRecord;
import usercenter.externalTask.model.TaskFile;
import usercenter.externalTask.model.TaskLogistics;
import usercenter.company.service.CompanyService;
import util.Const;
import util.SessionUtil;
import util.WebUtil;



@Service
public class TaskService {
	@Autowired
	private TaskMapper mapper;
	@Autowired
	private TaskOutputService taskOutputService;
	@Autowired
	private CompanyService supplierService;
	@Autowired
	private TaskLogisticsService taskLogisticsService;
	@Autowired
	private TaskFileService taskFileService;
	@Autowired
	private TaskAllCheckService taskAllCheckService;
	@Autowired
	private TaskDeliverGoodsService taskDeliverGoodsService;
	/**
	 * 
	* @Description:
	* TaskService
	* queryTaskListForAccount
	* @param params
	* @return List<Task>
	* @author chenlong
	* 2016-10-6 下午3:37:17
	 */
	public List<Task> queryTaskListForAccount(Map<String,Object> params){
		List<Task> list = new ArrayList<Task>();
		//1.把所有该公司下的任务单的外协单位附上po抛出的单位名称
		params.put(Const.USE_CUSTOM_COUNT, true);//表示不使用默认统计	
		list = mapper.queryTaskProduct(params);
		for(Task task : list){//更新company——id
    		task.getProducers_company_name();
    		if(task.getReceive_company() == 0 && task.getProducers_company_name() != null && task.getProducers_company_name() != ""){
    			Map<String,Object> maps = new HashMap<String, Object>();	
    			maps.put("cpyname_cn",task.getProducers_company_name());
    			maps.put("t_id", task.getT_id());
    			Integer id = supplierService.getCpynameId(maps);
    			if(id != null && id != 0){
    				task.setReceive_company(id);
    				task.setReceive_company_name(task.getProducers_company_name());
    				maps.put("receive_company", id);
        			mapper.updatetaskId(maps);
    			}	
    		}
    	}
		//2.查询所有的权限下的任务单
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		if(!WebUtil.isEmpty(params.get("order_flag"))){
			boolean order_flag_out = Boolean.parseBoolean(params.get("order_flag").toString());
			if(order_flag_out){
				params.put("order_flag", "ASC");//表示不使用默认统计	
			}else{
				params.put("order_flag", "DESC");//表示不使用默认统计	
			}
			}
		if(loginAccount.getAccount_type()==0){//主账号
			list = getTaskList(params);
		}else if(loginAccount.getAccount_type()==1){//子账号
			params.put("sa_id", loginAccount.getLogin_id());			
			params.put(Const.USE_CUSTOM_COUNT, true);//表示不使用默认统计	
			list = mapper.queryTaskList(params);
			params.put(Const.IS_CUSTOM_COUNT, true);
			int count=mapper.queryTaskList_count(params);
			params.put(Const.AJAX_SERVICE_TOTAL, count);
		}
		return list;
	}
	/**
	* @Description: 返回发出的任务单列表
	* @param 
	* state 状态；
	* state=0 全状态查询
	* state!=0 按状态查询
	* 
	* send_company 发送公司
	* 
	*  if plan_start_flag==true
	*    plan_start_1<=plan_start<=plan_start_2
	*    
	*  if send_time_flag==true
	*    send_time_1<=send_time<=send_time_2
	*	if receive_time_flag==true
	*    receive_time_1<=receive_time<=receive_time_2
	*  
	*  if search_text!=null || search_text!=''
	*  	按照search_text查询产品名   or 外协单位 or 任务单号  or 生产单号
	* 
	* 	
	* @return	任务单列表
	* @author xufeng
	* @date 2016-4-18 
	*/
	public List<Task> getTaskList(Map<String,Object> params) {
		params.put(Const.USE_CUSTOM_COUNT, true);//表示不使用默认统计
		List<Task> list=mapper.getTaskList(params);
		params.put(Const.IS_CUSTOM_COUNT, true);
		int count=mapper.getTaskList_count(params);
		params.put(Const.AJAX_SERVICE_TOTAL, count);
		return list;
	}
	/**
	* @Description: 返回收到的任务单列表
	* @param 
	* state 状态；
	* state=0 全状态查询
	* state!=0 按状态查询
	* 
	* receive_company 接收公司
	* 
	*  if plan_start_flag==true
	*    plan_start_1<=plan_start<=plan_start_2
	*  if send_time_flag==true
	*    send_time_1<=send_time<=send_time_2
	*	if receive_time_flag==true
	*    receive_time_1<=receive_time<=receive_time_2
	*  if search_text!=null || search_text!=''
	*  	按照search_text查询产品名   or 派单单位 or 任务单号 
	* 
	* @return	任务单列表
	* @author xufeng
	* @date 2016-4-18 
	*/
	public List<Task> getTaskListForProducer(Map<String,Object> params) {
		if(!WebUtil.isEmpty(params.get("order_flag"))){
			boolean order_flag_out = Boolean.parseBoolean(params.get("order_flag").toString());
			if(order_flag_out){
				params.put("order_flag", "ASC");//表示不使用默认统计	
			}else{
				params.put("order_flag", "DESC");//表示不使用默认统计	
			}
			}
		params.put(Const.USE_CUSTOM_COUNT, true);//表示不使用默认统计
		List<Task> list=mapper.getTaskListForProducer(params);
		params.put(Const.IS_CUSTOM_COUNT, true);
		int count=mapper.getTaskListForProducer_count(params);
		params.put(Const.AJAX_SERVICE_TOTAL, count);
		return list;
	}
	/**
	 * 获得运单的生产和生产完成的所有任务单的列表
	* @Description:
	* TaskService
	* getTaskListForShipping_count
	* @return List<Task>
	* @author chenlong
	* 2016-12-8 下午3:23:06
	 */
	public TakForShipping getTaskListForShipping(Map<String,Object> params){
		List<Integer> lists = new LinkedList<Integer>();
		List<Task> list = new ArrayList<Task>();
		if(!WebUtil.isEmpty(params.get("deliver_number"))){//发货清单号不为空怎是修改发货清单
		  params.put(Const.USE_PAGING, false);
		  params.put(Const.USE_CUSTOM_COUNT, true);//表示不使用默认统计
		  List<TaskDeliverGoods> listvo = taskDeliverGoodsService.getTaskDeliverGoods(params);
		  params.put("send_company", listvo.get(0).getCustomer_id());//只展示该公司的任务单 send_company		  
		  for(TaskDeliverGoods taskDeliverGoods : listvo){
			  lists.add(taskDeliverGoods.getT_id());
			}
		  params.put("list", lists);//这些任务单不展示
		}		
		TakForShipping takForShipping = new TakForShipping();
		List<Integer> listsvo = new LinkedList<Integer>();
		params.put(Const.USE_CUSTOM_COUNT, true);//表示不使用默认统计
		params.put(Const.USE_PAGING, false);
		list = mapper.getTaskListForShipping(params);//查询出任务单
		for(Iterator<Task> iterator =  list.iterator();iterator.hasNext();){
			Task task = iterator.next();
			double num_qty = taskDeliverGoodsService.getDeliverdetailSum(task,params);
			if(num_qty==0){				
				listsvo.add(task.getT_id());
			 }			
		}
		System.out.println(listsvo);
		listsvo.addAll(lists);
		params.put(Const.USE_CUSTOM_COUNT, true);//表示不使用默认统计
		if(listsvo.size()!=0){
			params.put("list", listsvo);//这些任务单可发货数为0的不展示
		}		
		params.put(Const.USE_PAGING, true);
		list = mapper.getTaskListForShipping(params);//查询出任务单	
		params.put(Const.USE_PAGING, false);
		params.put(Const.USE_CUSTOM_COUNT, true);//表示不使用默认统计
		int counts = mapper.getTaskListForShipping_count(params);
		params.put(Const.AJAX_SERVICE_TOTAL, counts);		
		params.put(Const.USE_CUSTOM_COUNT, true);//表示不使用默认统计
		Integer count  =  mapper.getTaskListForShipping_counts(params);//查看任务单中是否是不同公司的任务单
		if(count > 1 && count != null){
        	takForShipping.setRegComment(false);     
		}	         
		takForShipping.setTask(list);
		return takForShipping;
	}
	/**
	* @Description: 获取各种状态任务单的数量
	* @param send_company 发送公司
	* 	或者      receive_company 接受公司
	* @return AllStateVo
	* @author xufeng
	* @date 2016-4-18 
	*/
	public AllStateVo getTaskCountOfAllState(Map<String,Object> params){
		AllStateVo vo=new AllStateVo(0,0,0,0,0,0,0,0,0);
		List<StateCount> clist=new ArrayList<StateCount>();
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		if(loginAccount.getAccount_type()==0){//主账号
			clist = mapper.getTaskCountOfAllState(params);
		}else if(loginAccount.getAccount_type()==1){//子账号
			params.put("sa_id", loginAccount.getLogin_id());
		    clist = mapper.queryTaskCountOfAllState(params);
		}
		int all=0;
		int end = 0;
		int cancel = 0;
		if(clist!=null && clist.size()>0){
			for(StateCount sc:clist){
				all=all+sc.getStateCount();
				switch(sc.getState()){
					case 5:
						vo.setToBeSend(sc.getStateCount());
						break;
					case 10:
						vo.setSended(sc.getStateCount());
						break;
					case 15:
						vo.setProducting(sc.getStateCount());
						break;
					case 20:
						vo.setFinishproduct(sc.getStateCount());
						break;
					case 25:
						vo.setTaskOver(sc.getStateCount());
						break;
					case 30:
						end = sc.getStateCount();						
						break;	
					case 40:
						cancel = sc.getStateCount();						
						break;
					default:
						break;
				}
				vo.setStoped(end+cancel);
			}
		}
		vo.setAll(all);
		return vo;
	}
	/**
	* @Description: 获取各种状态任务单的数量
	* @param receive_company 接受公司
	* @return AllStateVo
	* @author xufeng
	* @date 2016-4-25 
	*/
	public AllStateVo getProducerTaskCountOfAllState(Map<String,Object> params){
		AllStateVo vo=new AllStateVo(0,0,0,0,0,0,0,0,0);
		List<StateCount> clist=mapper.getProducerTaskCountOfAllState(params);
		int all=0;		
		if(clist!=null && clist.size()>0){
			for(StateCount sc:clist){
				all=all+sc.getStateCount();
				switch(sc.getState()){
					case 5:
						vo.setToBeSend(sc.getStateCount());
						break;
					case 10:
						vo.setSended(sc.getStateCount());
						break;
					case 15:
						vo.setProducting(sc.getStateCount());
						break;
					case 20:
						vo.setFinishproduct(sc.getStateCount());
						break;
					case 25:
						vo.setTaskOver(sc.getStateCount());
						break;
					case 30:
						vo.setStoped(sc.getStateCount()) 	;	
						break;	
					case 40:
						vo.setEnded(sc.getStateCount()); 							
						break;
					default:
						break;
				}
				
			}
		}
		vo.setAll(all);
		return vo;
	}
	
	/**
	* @Description: 取消任务单
	* @param 反馈信息json;t_id state reason
	* @return JSONObject 处理结果
	* @author xufeng
	* @date 2016-4-21 
	*/
	public JSONObject updateTaskState2Stop(Map<String,Object> params){
		JSONObject json = new JSONObject();
		json.put("success", true);
		json.put("message", "成功");
		Task task=getTaskByT_id(params);
		if(task.getState()>=15){
			json.put("success", true);
			json.put("message", "对方已经确认，不可取消");
			return json;
		}else if(task.getState()==30){
			json.put("success", true);
			json.put("message", "对方已经取消，不可重复操作");
			return json;
		}
		params.put("state", 30);
		params.put("stop_time", new Date());
		mapper.updateTaskState2Stop(params);
		return json;
	}
	/**
	 * 生产方接单后到任务单完结前，都可以发起终止 
	* @Description:TODO终止可操作条件：发货未完、发料未完、到货全检（全检不合格数量不结算）未完不能终止
	* TaskService
	* updateTaskStateProhibit
	* @param params
	* @return String
	* @author chenlong
	* 2016-11-22 上午10:58:45
	 */
	public String updateTaskStateProhibit(Map<String,Object> params){
		String message = Const.AJAX_SERVICE_SUCCESS;
		params.put("is_delete", 0);
		Integer state = getTaskStateByID(params);//当前任务单状态
		if(state==15||state==20){
			boolean flag = taskDeliverGoodsService.getTaskDeliverGoodsStatus(params);//判断当前任务单是否存在未接收的任务单 
			Integer count = taskLogisticsService.getLogisticsForStateSend(params);//判断当前任务单是否有来料未接受
			Task task = mapper.getQtyCount(params);
			if(!flag){
				message = "当前任务单有来货未接收！";
			}else if(count>0){
				message = "当前任务单有发料未接收！";
			}else if(task.getQualified_qty()<WebUtil.add(task.getConfirmed_qtyVo(), task.getReturn_qtyVo())){
				message = "该任务单接受的的货物未完全质检！";
			}else{
				//message ="";
				params.put("state", 40);//TODO终止
				mapper.updateTaskState2Stop(params);
				params.put("end_status", 1);
				mapper.addTaskEndRecord(params);
			}
		}else{			
			message = "当前任务单的状态已经改变,无法终止";
		}	
		return message;
	}
	
	/**
	* @Description:判断任务单是否可以终止
	* TaskService
	* isTaskStateProhibit
	* @param params
	* @return String
	* @author mishengliang
	* 2017-1-6 下午1:57:25
	*/
	public Map<String, Object> isTaskStateProhibit(Map<String,Object> params){
		Map<String, Object> resMap = new HashMap<String, Object>();
		String message = Const.AJAX_SERVICE_SUCCESS;
		Boolean isProhibit = false;
		params.put("is_delete", 0);
		Integer state = getTaskStateByID(params);
		if(state==15||state==20){
			boolean flag = taskDeliverGoodsService.getTaskDeliverGoodsStatus(params);
			Integer count = taskLogisticsService.getLogisticsForStateSend(params);
			Task task = mapper.getQtyCount(params);
			if(!flag){
				message = "当前任务单有来货未接收！";
			}else if(count>0){
				message = "当前任务单有发料未接收！";
			}else if(task.getQualified_qty()<WebUtil.add(task.getConfirmed_qtyVo(), task.getReturn_qtyVo())){
				message = "该任务单接受的的货物未完全质检！";
			}else{
				message ="可以终止";
				isProhibit = true;
			}
		}else{			
			message = "当前任务单的状态已经改变,无法终止";
		}	
		resMap.put("message", message);
		resMap.put("isProhibit", isProhibit);
		return resMap;
	}
	/**
	 * 查询当前的任务单的状态
	* @Description:
	* TaskService
	* getTaskStateByID
	* @param params
	* @return Integer
	* @author chenlong
	* 2016-11-22 下午2:56:24
	 */
	public Integer getTaskStateByID(Map<String,Object> params){
		Integer state = mapper.getTaskStateByID(params);
		if(state==null){
			throw new BusinessException("任务单已经不存在");
		}
		return state;		
	}
	/**
	* @Description: 获取任务单
	* @param t_id
	* @return Task
	* @author xufeng
	* @date 2016-4-21 
	*/
	public Task getTaskByT_id(Map<String,Object> params){
		Task task=mapper.getTaskByT_id(params);
		if(task==null){
			throw new BusinessException("任务单已经不存在");
		}else{
			//信息补充
			//获取开工第一天
			Date firstDay=taskOutputService.getFirstDay(params);
			task.setFirst_start_time(firstDay);
			return task;
		}
	}
	/**
	* @Description: 派发任务单
	* @param 反馈信息json;t_id state 
	* @return JSONObject 处理结果
	* @author xufeng
	* @date 2016-4-22 
	*/
	public JSONObject updateTaskState2Send(Map<String,Object> params){
		Task task=getTaskByT_id(params);
		JSONObject json = new JSONObject();
		json.put("success", true);
		json.put("message", "成功");
		//判断任务单是否有产品主图，是否有接收公司，状态是否为等待发送
		if(task.getState()!=5){
			json.put("success", true);
			json.put("message", "任务单当前状态不是等待派单");
			return json;
		}
		if(task.getSend_company()==0){
			json.put("success", false);
			json.put("message", "尚未指定接受公司");
			return json;
		}
		/*if(task.getProduct_pic()==null || "".equals(task.getProduct_pic())){
			json.put("success", false);
			json.put("message", "尚未指定产品主图");
			return json;
		}*/
		//判断工艺文件是否完善
		Map<String,Object> params2=new HashMap<String,Object>();
		params2.put("t_id", params.get("t_id"));
		params2.put("file_type", 1);//工艺文件的图片
		int count1=mapper.getFileCount(params2);
		params2.put("file_type", 3);//工艺文件的视频
		int count3=mapper.getFileCount(params2);
		params2.put("file_type", 5);//作业指导的文件
		int count5=mapper.getFileCount(params2);
		//质检标准的上传可以不必填 20160822 (bugid 958)
		//params2.put("file_type", 6);//质检标准的附件
		//int count6=mapper.getFileCount(params2);
	
		if((count1==0 ||count3==0||count5==0)){
		
			json.put("success", true);
			json.put("toConfirm", true);
			json.put("message", "工艺文件尚未完善");
			return json;
		}
		/*else if(count6==0){
			
			json.put("success", true);
			json.put("toConfirm", false);
			json.put("message", "质检文件未上传");
			return json;
		}*/
		else{
			json.put("toConfirm", false);
		}
		params.put("state", 10);
		params.put("send_time", new Date());
		mapper.updateTaskState2Send(params);
		return json;
	}
	/**
	* @Description: 第二次确认，派发任务单
	* @param 反馈信息json;t_id state 
	* @return JSONObject 处理结果
	* @author xufeng
	* @date 2016-4-22 
	*/
	public JSONObject updateTaskState2SendSecond(Map<String,Object> params){
		Task task=getTaskByT_id(params);
		params.put("file_type", 5);//作业指导的文件
		int count=mapper.getFileCount(params);
		JSONObject json = new JSONObject();
		json.put("success", true);
		json.put("message", "成功");
		//判断状态是否为等待发送
		if(task.getState()!=5){
			json.put("success", false);
			json.put("message", "任务单当前状态不是等待派单");
			return json;
		}	
		if(task.getSend_company()==0){
			json.put("success", false);
			json.put("message", "尚未指定接受公司");
			return json;
		}
		if(task.getPlan_complete()==null||"".equals(task.getPlan_complete())||task.getPlan_start()==null||"".equals(task.getPlan_start())){
			json.put("success", false);
			json.put("message", "计划的的时间段不够完全");
			return json;
		}
		/*if(task.getQc_type()==null||"".equals(task.getQc_type())){
			json.put("success", false);
			json.put("message", "尚未指定质检方式");
			return json;
		}*/
		/*if(task.getProduct_pic()==null || "".equals(task.getProduct_pic())){
			json.put("success", false);
			json.put("message", "尚未指定产品主图");
			return json;
		}*/
		if(count==0){
			json.put("success", false);
			json.put("message", "尚未指定指导文件");
			return json;
		}
		params.put("state", 10);
		params.put("send_time", new Date());
		mapper.updateTaskState2Send(params);
		return json;
	}
	/**
	 * 批量派发任务单
	* @Description:
	* TaskService
	* updateTaskStateForList
	* @param params
	* @return JSONObject
	* @author chenlong
	* 2016-9-26 下午2:19:12
	 */
	public JSONObject updateTaskStateForList(Map<String,Object> params){
		int count = Integer.parseInt(params.get("count").toString());
		String[] strb = params.get("tidlist").toString().split(",");
		Map<String,Object> map = new HashMap<String,Object>();
		JSONObject jsonObject = new JSONObject();
		int count1 = 0;
		for(String str : strb){
			int id = Integer.parseInt(str);
			map.put("t_id", id);
			jsonObject = updateTaskState2SendSecond(map);
			if(jsonObject.getBoolean("success")==false){
				count1++;
			}
		}
		if(count == count1&&count1!=0){
			jsonObject.put("success", false);
			jsonObject.put("message", "选中的"+count+"条任务单的派单条件不满足,请认真核对后再派单！");
			return jsonObject;
		}else if(count >count1&&count1!=0){
			jsonObject.put("success", true);
			jsonObject.put("message", "选中的"+(count-count1)+"条任务单派发成功,</br>但选中的"+count1+"条任务单的派单条件不满足,请认真核对后再派单！");
			return jsonObject;
		}
		jsonObject.put("success", true);
		jsonObject.put("message", "选中的"+count+"条任务单派发成功!");
		return jsonObject;
	}
	/**
	* @Description: 收回任务单
	* @param 反馈信息json;t_id
	* @return JSONObject 处理结果
	* @author xufeng
	* @date 2016-4-22 
	*/
	public JSONObject updateTaskState2toBeSend(Map<String,Object> params){
		Task task=getTaskByT_id(params);
		JSONObject json = new JSONObject();
		json.put("success", true);
		json.put("message", "成功");
		//判断状态是否为等待发送
		if(task.getState()>10){
			json.put("success", true);
			json.put("message", "任务单当前已被接受,无法收回派单");
			return json;
		}
		if(task.getState()==5){
			json.put("success", true);
			json.put("message", "任务单当前已被收回,无法再操作");
			return json;
		}
		params.put("state", 5);
		mapper.updateTaskState2toBeSend(params);
		return json;
	}
	/**
	 * 批量收回派单
	* @Description:
	* TaskService
	* updateTaskState2toBeSendList
	* @param params
	* @return JSONObject
	* @author chenlong
	* 2016-9-26 下午3:46:33
	 */
	public JSONObject updateTaskState2toBeSendList(Map<String,Object> params){
		int count = Integer.parseInt(params.get("count").toString());
		int count1 = 0;
		String[] strb = params.get("tidlist").toString().split(",");
		Map<String,Object> map = new HashMap<String,Object>();
		JSONObject json = new JSONObject();
		json.put("success", true);
		json.put("message", "成功");
		for(String str : strb){
			int id = Integer.parseInt(str);
			map.put("t_id", id);
			json = updateTaskState2toBeSend(map);
			if(!(json.get("message").equals("成功"))){
				count1++;
			}
		}
		if(count == count1 && count1 != 0){
			json.put("message", "选中的这"+count+"条任务单由于任状态无法被收回");
			return json;
		}else if(count>count1  && count1 != 0){
			json.put("message", "选中的这"+(count-count1)+"条任务单被收回成功,</br>"+count1+"条任务单由于状态不能被收回");
			return json;
		}
		json.put("message", "选中的"+count+"条任务单收回成功!");
		return json;		
	}
	/**
	* @Description: 更新计划开工、完工日期
	* @param t_id plan_start plan_complete
	* @return JSONObject
	* @author xufeng
	* @date 2016-4-28 
	*/
	public JSONObject updateTaskPlanDate(Map<String,Object> params){
		Task task=getTaskByT_id(params);
		JSONObject json = new JSONObject();
		json.put("success", true);
		//判断状态是否为未派单
		if(task.getState()!=5){
			json.put("success", false);
			json.put("message", "任务单当前状态不是等待派单");
			return json;
		}
		mapper.updateTaskPlanDate(params);
		return json;
	}
	/**
	* @Description: 更新任务单说明
	* @param t_id remark
	* @return JSONObject
	* @author xufeng
	* @date 2016-4-28 
	*/
	public JSONObject updateTaskRemark(Map<String,Object> params){
		Task task=getTaskByT_id(params);
		JSONObject json = new JSONObject();
		json.put("success", true);
		//判断状态是否为未派单
		if(task.getState()!=5){
			json.put("success", false);
			json.put("message", "任务单当前状态不是等待派单");
			return json;
		}
		mapper.updateTaskRemark(params);
		return json;
	}
	/**
	* @Description:更新质检类型
	* @param t_id qc_type
	* @return JSONObject
	* @author xufeng
	* @date 2016-4-28 
	*/
	public JSONObject updateTaskqc_type(Map<String,Object> params){
		Task task=getTaskByT_id(params);
		JSONObject json = new JSONObject();
		json.put("success", true);
		//判断状态是否为未派单
		if(task.getState()!=5){
			json.put("success", false);
			json.put("message", "任务单当前状态不是等待派单");
			return json;
		}
		mapper.updateTaskqc_type(params);
		return json;
	}
	/**
	* @Description:更新外协单位
	* @param t_id receive_company
	* @return JSONObject
	* @author xufeng
	* @date 2016-4-28 
	*/
	public JSONObject updateTaskreceive_company(Map<String,Object> params){
		Task task=getTaskByT_id(params);
		JSONObject json = new JSONObject();
		json.put("success", true);
		//判断状态是否为未派单
		if(task.getState()!=5){
			json.put("success", false);
			json.put("message", "任务单当前状态不是等待派单");
			return json;
		}
		mapper.updateTaskreceive_company(params);
		return json;
	}
	/**
	* @Description:更新任务总数
	* @param t_id    total_qty
	* @return JSONObject
	* @author xufeng
	* @date 2016-4-28 
	*/
	public JSONObject updateTasktotal_qty(Map<String,Object> params){
		Task task=getTaskByT_id(params);
		JSONObject json = new JSONObject();
		json.put("success", true);
		//判断状态是否为未派单
		if(task.getState()!=5){
			json.put("success", false);
			json.put("message", "任务单当前状态不是等待派单");
			return json;
		}
		mapper.updateTasktotal_qty(params);
		return json;
	}
	/**
	* @Description: 确认接收任务单
	* @param 反馈信息json;t_id
	* @return JSONObject 处理结果
	* @author xufeng
	* @date 2016-4-25 
	*/
	public JSONObject updateTaskState2producting(Map<String,Object> params){
		Task task=getTaskByT_id(params);
		JSONObject json = new JSONObject();
		json.put("success", true);
		json.put("message", "成功");
		//判断状态是否为等待发送
		if(task.getState()!=10){
			json.put("success", true);
			json.put("message", "任务单当前状态不是等待接收");
			return json;
		}else if(task.getState()>=15){
			json.put("success", true);
			json.put("message", "任务单当前状态已接收");
			return json;
		}		
		params.put("state", 15);
		params.put("receive_time",new Date());
		mapper.updateTaskState2producting(params);
		return json;
	}
	/**
	 * 批量接受订单
	* @Description:
	* TaskService
	* updateTaskState2productingList
	* @param params
	* @return JSONObject
	* @author chenlong
	* 2016-9-26 下午4:17:27
	 */
	public JSONObject updateTaskState2productingList(Map<String,Object> params){
		int count = Integer.parseInt(params.get("count").toString());
		int count1 = 0;
		String[] strb = params.get("tidlist").toString().split(",");
		Map<String,Object> map = new HashMap<String,Object>();
		JSONObject json = new JSONObject();
		json.put("success", true);
		json.put("message", "成功");
		for(String str : strb){
			int id = Integer.parseInt(str);
			map.put("t_id", id);
			json = updateTaskState2producting(map);
			if(!(json.get("message").equals("成功"))){
				count1++;
			}
		}
		if(count == count1 && count1 != 0){
			json.put("message", "选中的这"+count+"条任务单由于任状态无法被接收");
			return json;
		}else if(count>count1  && count1 != 0){
			json.put("message", "选中的这"+(count-count1)+"条任务单被接收成功,</br>"+count1+"条任务单由于状态不能被接收");
			return json;
		}
		json.put("message", "选中的"+count+"条任务单接收成功!");
		return json;
	}
	/**
	* @Description: 返回任务单的状态值
	* @param Map
	* @return Integer
	* @author chnelong
	* @date 2016-5-31 
	*/
	public Integer getTaskState(Map<String,Object> params){
		Task task=getTaskByT_id(params);	
		Integer state = task.getState();
		return state;
	}
	/**
	* @Description:返回子账号或者主账号下的所有公司的id
	* TaskService
	* getRexAccountVo
	* @return List<RexAccountVo>
	* @author chenlong
	* 2016-8-12 下午1:06:11
	 */
	public List<RexAccountVo> getRexAccountVo(){
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		Map<String,Object> maps = new HashMap<String, Object>();
		if(loginAccount.getAccount_type()==0){//主账号
			maps.put("reg_id", loginAccount.getLogin_id());
		}else if(loginAccount.getAccount_type()==1){//子账号
			maps.put("sa_id", loginAccount.getLogin_id());
		}
		List<RexAccountVo> list = mapper.getTaskCompanyidVo(maps);
		return list;
	}
	/**
	* @Description: 判断生产方的供应商，提交的请求对资源有没有操作权限
	* @param t_id 任务单编号；
	* 该编号必须是和提交的数据相关的，不能和提交的数据无关。
	* 例如1：记录直接含 t_id，新增任务单文件记录，文件类型。先直接传参，判断权限，再操作。
	* 例如2：记录不含t_id，修改提交文件描述，数据只有 文件编号和描述。必须数据库查询出t_id，再通过t_id判断权限
	* 		这种情况下，如果 提交数据含t_id，用来判断权限，是无效的，是绕过权限判断，是必须禁止的，因为操作的数据和t_id本身没有关联。
	* @return	true 有权限；false 没权限
	* @author xufeng
	* @date 2016-4-25 
	*/
	public boolean getPermissoinForProducer(Map<String,Object> params){
		Task task=getTaskByT_id(params);
		List<RexAccountVo> list = getRexAccountVo();
		boolean flag = false;
		for(RexAccountVo rexAccountVo : list){
			if(task.getReceive_company() == rexAccountVo.getCompany_id()){
				flag = true;
				break;
			}else{
				flag = false;
			}
		}
		return flag;
	}
	/**
	* @Description: 判断发布任务的供应商，提交的请求对资源有没有操作权限
	* @param t_id 任务单编号；
	* 该编号必须是和提交的数据相关的，不能和提交的数据无关。
	* 例如1：记录直接含 t_id，新增任务单文件记录，文件类型。先直接传参，判断权限，再操作。
	* 例如2：记录不含t_id，修改提交文件描述，数据只有 文件编号和描述。必须数据库查询出t_id，再通过t_id判断权限
	* 		这种情况下，如果 提交数据含t_id，用来判断权限，是无效的，是绕过权限判断，是必须禁止的，因为操作的数据和t_id本身没有关联。
	* @return true 有权限；false 没权限
	* @author xufeng
	* @date 2016-4-25 
	*/
	public boolean getPermissoinForSender(Map<String,Object> params){
		Task task=getTaskByT_id(params);
		List<RexAccountVo> list = getRexAccountVo();
		boolean flag = false;
		for(RexAccountVo rexAccountVo : list){
			if(task.getSend_company() == rexAccountVo.getCompany_id()){
				flag = true;
				break;
			}else{
				flag = false;
			}
		}
		return flag;
	}
	/**
	* @Description: 更新任务单的产品主图
	* @param mongo_file_name t_id
	* @author xufeng
	* @date 2016-5-4 
	*/
	public void updateproduct_pic(Map<String,Object> params){
		mapper.updateproduct_pic(params);
	}
	/**
	* @Description: 更新完成数量
	* @param produced_qty t_id
	* @author xufeng
	* @date 2016-05-04
	*/
	public void updateproduced_qty(Map<String,Object> params){
		mapper.updateproduced_qty(params);
		Task task = mapper.getTaskToaleProductCount(params);
		if(task.getProduced_qty()>=task.getTotal_qty()){
			Map<String,Object> map= new HashMap<String,Object>();
			map.put("state", 20);
			map.put("t_id", params.get("t_id"));
			map.put("finish_product_time", new Date());
			mapper.updateTaskState2Complete(map);//变成完成状态
		}else{
			Map<String,Object> map= new HashMap<String,Object>();
			map.put("state", 15);
			map.put("t_id", params.get("t_id"));
			map.put("finish_product_time", null);
			mapper.updateTaskState2Complete(map);//变成生产中状态
		}
	}
	/**
	 * @Description:查询出该任务单的质检类型
	 * @param t_id
	 * @author chenlong
	 * @param params
	 * @return String
	 * @date 2016-5-9
	 */
	public String getTaskQcType(Integer t_id){
		return mapper.getTaskQcType(t_id);
	}
	/**
	 * 更新任务单的指导文件
	 * @param taskFile
	 * @author chenlong
	 * @date 2015-6-1
	 */
	public void updateOperator_file(TaskFile taskFile){
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("t_id", taskFile.getT_id());
		map.put("operator_file", taskFile.getObject_id());
		mapper.updateOperator_file(map);
	}
	/**
	 *  更新任务单的指导文件
	 * @param map
	 * @author chenlong
	 * @date 2015-6-1
	 */
	public void updateOperators_file(Map<String,Object> map){
		map.put("operator_file", "");
		mapper.updateOperator_file(map);
	}
	/**
	 *  更新任务单的的接收方id
	 * @param map
	 * @author chenlong
	 * @date 2015-6-1
	 */
	public String updateproducers(Map<String,Object> map){
		String message = "成功";
		Map<String,Object> maps = new HashMap<String, Object>();	
		maps.put("cpyname_cn",map.get("product_name"));
		Integer id = supplierService.getCpynameId(maps);
		if(id==null){
			message ="不存在此供应商";
			return message;
		}
		map.put("receive_company", id);
		mapper.updatetaskId(map);
		return message;
	}
	/**
	 * @Description: 更新任务单的完结状态
	 * @param 
	 * @return 
	 * @author chenlong
	 * @date
	 */
	public void updateTaskProducted(Task task){
		mapper.updateTaskProducted(task);//更新生产信息
		Task tasks = mapper.getTaskQuliterCount(task.getT_id());
		if(tasks.getQualified_qty()>=tasks.getTotal_qty()){
			Map<String,Object> map= new HashMap<String,Object>();
			map.put("state", 25);
			map.put("t_id", task.getT_id());
			map.put("finish_task_time", new Date());
			mapper.updateTaskStateCompleteEnd(map);//变成任务终结
		}
		
	}
	/**
	 * 返回任务单的生产和产量
	* @Description:
	* TaskService
	* regTaskForShipping
	* @param map
	* @return Task
	* @author chenlong
	* 2016-12-15 下午4:53:59
	 */
	public Task regTaskForShipping(Map<String,Object> map){
		return  mapper.getregTaskproduct(map);
	}

	/**
	 * 取消发货单后后更新发货数量和返修数量
	* @Description:
	* TaskService
	* updateProductSend
	* @param map void
	* @author chenlong
	* 2016-12-22 下午5:47:58
	 */
	public void updateProductSend(Map<String,Object> map){
		Task task = mapper.getregTaskproduct(map);
		double delivery_quantity = 0;
		double nowSend = 0;
		if(Integer.parseInt(map.get("deliver_type").toString())==0){
			 delivery_quantity =	Double.parseDouble(map.get("delivery_quantity").toString());
			 nowSend = WebUtil.sub(task.getSendout_qty(),delivery_quantity);
			 map.put("sendout_qty", nowSend);
		}else if(Integer.parseInt(map.get("deliver_type").toString())==1){
			 delivery_quantity =	Double.parseDouble(map.get("delivery_quantity").toString());
			 nowSend = WebUtil.sub(task.getReturn_send_qtyVo(),delivery_quantity);
			 map.put("return_send_qtyVo", nowSend);
		}	
		mapper.updateTaskSendout(map);    
	}
	/**
	 * 检测发送量是否大于产量
	 * @param map
	 * @return
	 * @author chenlong
	 * @date 2015-6-1
	 */
	public String regTaskproduct(Map<String,Object> map){
		    String message ="成功";		
			Task task = mapper.getregTaskproduct(map);
			double sumvos = taskDeliverGoodsService.getDeliverdetailSumVo(map);//除了当前发货单还有在发货途中的正常数量的
			double count =	Double.parseDouble(map.get("count").toString());
		    double send_count =	Double.parseDouble(map.get("send_count").toString());
		    double product = 0;	
			double produced_qtys = WebUtil.sub(WebUtil.sub(task.getProduced_qty(),task.getReturn_send_qtyVo()),WebUtil.add(sumvos, task.getConfirmed_qtyVo()));//当前
			if(produced_qtys>task.getTotal_qty()&&Integer.parseInt(map.get("deliver_type").toString())==0){
				product =WebUtil.sub(WebUtil.sub(task.getTotal_qty(),task.getConfirmed_qtyVo()),count);
			}else{
				product =WebUtil.sub(produced_qtys,count);				   
			}					
			if(send_count>product){
				message ="发送的货物量大于您所生产的量,请重新输入";
			}else{	
				double send_new = 0;
				if(Integer.parseInt(map.get("deliver_type").toString())==0){
					send_new = WebUtil.add(WebUtil.sub(task.getSendout_qty(),count), send_count);
					map.put("sendout_qty", send_new);
				}else if(Integer.parseInt(map.get("deliver_type").toString())==1){
					send_new = WebUtil.add(WebUtil.sub(task.getReturn_send_qtyVo(),count), send_count);
					map.put("return_send_qtyVo", send_new);
				}	
				mapper.updateTaskSendout(map);
			}
			return message;	
	}
	/**
	 * 编辑时验证发货量是否小于产量
	 * @param map
	 * @return
	 * @author chenlong
	 * @date 2015-6-1
	 */
	public String regeditproduct(Map<String,Object> map){
		String message ="成功";
		TaskLogistics t = taskLogisticsService.getTaskLogistics(Integer.parseInt(map.get("record_id").toString()));
		Task task = mapper.getregTaskproduct(map);
	    double send_count =	Double.parseDouble(map.get("send_count").toString());
	    double product = WebUtil.sub(task.getSendout_qty(),t.getSend_count());
	    product = WebUtil.sub(task.getProduced_qty(),product);
		if(send_count>product){
			message ="发送的货物量大于您所生产的量,请重新输入";
		}
		return message;
	}
	/**
	 * 查询出任务单中的生产数量
	 * @param map
	 * @return
	 * @author chenlong
	 * @date 2015-6-1
	 */
	public double getTotalQty(Map<String,Object> map){
		Task  task = mapper.getregTaskproduct(map);
		return task.getProduced_qty();
	}
	/**
	 * @Description:查询出任务单中的生产数量 
	 * @param t_id
	 * @return double
	 * @author chenlong
	 * @date 2016-6-7
	 */
	public double gettoQty(Integer t_id){
		Task  task = mapper.getTotalQty(t_id);
		return task.getTotal_qty();
	}
	/**	
	 * @Description: //更新最新的的生产总量
	 * @param 
	 * @return 
	 * @author chenlong
	 * @date 2016-6-7
	 */
	public void updateTaskSendout(TasklogisticsVo tasklogisticsVo,Map<String, Object> params){
		if(tasklogisticsVo != null){		
			params.put("sendout_qty", tasklogisticsVo.getSendout_qty());
		}else{
			params.put("sendout_qty", 0);
		}
		mapper.updateTaskSendout(params);
	}
	
	/**
	 * 更新任务单的发货总数数量或者返修总数量
	* @Description:
	* TaskService
	* updateTaskSendout
	* @param params void
	* @author chenlong
	* 2016-12-15 下午5:23:30
	 */
	public synchronized void updateTaskSendout(Map<String, Object> params){
		mapper.updateTaskSendout(params);
	}
    /**
     * @Description:获取最新三条生产任务单
     * TaskService
     * getLastThreeDeliverTask
     * @param params
     * @return List<Task>
     * @author yukai
     * 2016-9-13 上午9:28:14
     */
	public List<Task> getLastThreeDeliverTask(Map<String, Object> params) {
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		if(loginAccount.getAccount_type()==0){//主账号
		params.put("reg_id", loginAccount.getLogin_id());
		}else if(loginAccount.getAccount_type()==1){//子账号
		params.put("sa_id", loginAccount.getLogin_id());
		}else {
			return null;
		}				
		List<Task> list=mapper.getLastThreeDeliverTask(params);
		return list;
	} 
	 /**
     * @Description:获取最新三条外协任务单
     * TaskService
     * getLastThreeDeliverTask
     * @param params
     * @return List<Task>
     * @author yukai
     * 2016-11-22 上午9:28:14
     */
	public List<Task> getLastThreeDeliverTaskForOut(Map<String, Object> params) {
		List<Task> list = new ArrayList<Task>();
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		if(loginAccount.getAccount_type()==0){//主账号
			list = mapper.getLastThreeDeliverTaskForOut(params);
		}else if(loginAccount.getAccount_type()==1){//子账号
			params.put("sa_id", loginAccount.getLogin_id());
			params.put(Const.USE_CUSTOM_COUNT, true);//表示不使用默认统计	
			list = mapper.queryTaskProduct(params);
			for(Task task : list){//更新company——id
	    		task.getProducers_company_name();
	    		if(task.getReceive_company() == 0 && task.getProducers_company_name() != null && task.getProducers_company_name() != ""){
	    			Map<String,Object> maps = new HashMap<String, Object>();	
	    			maps.put("cpyname_cn",task.getProducers_company_name());
	    			maps.put("t_id", task.getT_id());
	    			Integer id = supplierService.getCpynameId(maps);
	    			if(id != null && id != 0){
	    				task.setReceive_company(id);
	    				task.setReceive_company_name(task.getProducers_company_name());
	    				maps.put("receive_company", id);
	        			mapper.updatetaskId(maps);
	    			}	
	    		}
	    	}
			params.put(Const.USE_CUSTOM_COUNT, true);//表示不使用默认统计	
			list = mapper.getSubLastThreeDeliverTaskForOut(params);
		}
		return list;
	} 
	/**
	 * 更新任务单的主图
	* @Description:
	* TaskService
	* updateTaskPicture
	* @param params void
	* @author mishengliang
	* 2016-12-13 下午6:06:49
	 */
	public  void updateTaskPicture(Map<String, Object> params) {
		params.put("product_pic", null);
		mapper.updateTaskPicture(params);
	}
	/**
	 * 查询中止任务单的终止详情
	* @Description:
	* TaskService
	* getTaskEndRecord
	* @param params
	* @return TaskEndDetails
	* @author chenlong
	* 2016-11-24 下午4:07:33
	 */
	public TaskEndDetails  getTaskEndRecord(Map<String, Object> params) {
		TaskEndDetails taskEndDetails = new TaskEndDetails();
		params.put("is_delete", 0);
		params.put("file_type", 48);
		TaskFile taskFile = taskFileService.getTaskProhibitFile(params);//终止文件
		taskEndDetails.setTaskFile(taskFile);
		params.put("end_status", 1);
		TaskEndRecord taskEndRecord = mapper.getTaskEndRecord(params);//终止理由
		taskEndDetails.setTaskEndRecord(taskEndRecord);//(taskEndRecord);
		return taskEndDetails;
	}
	/**
	 * @Description:确认完结
	 * TaskService
	 * comfirmFinish
	 * @param params void
	 * @author yukai
	 * 2016-12-7 上午10:08:35
	 */
	public void comfirmFinish(Map<String, Object> params) {
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		params.put("source_type", 1);
		params.put("jlrq", new Date());
		params.put("czym", loginAccount.getLogin_name());
		taskAllCheckService.addTaskAllCheck(params);//增加一条质检数据
		params.put("finish_task_time", new Date());
		mapper.updateTaskStateCompleteEnd(params);//任务单状态标志为完结
		
		Task task=mapper.getTaskByT_id(params);
		//Double confirmedQty =  task.getConfirmed_qty()+(Double.parseDouble(params.get("checkNum").toString()));
		Double qualifiedQty =  task.getQualified_qty()+(Double.parseDouble(params.get("qualifiedNum").toString()));
		//task.setConfirmed_qty(confirmedQty);
		task.setQualified_qty(qualifiedQty);
		mapper.updateTaskProducted(task);//更新任务单质检数量和合格数量
	}
	/**
	 * 验证任务单组是否是同一个公司
	* @Description:
	* TaskService
	* RegCompanyForOne
	* @param params
	* @return boolean
	* @author chenlong
	* 2016-12-13 下午1:59:32
	 */
	public boolean RegCompanyForOne(Map<String, Object> params){
		Integer count = mapper.RegCompanyForOne(params);
		if(count >1){
			return false;
		}else{
			return true;
		}	
	}
	/**
	 * 返回发货量和返修发货量
	* @Description:
	* TaskService
	* getReturnQtyVo
	* @param params
	* @return Task
	* @author chenlong
	* 2016-12-28 下午2:52:53
	 */
	public Task getReturnQtyVo(Map<String, Object> params){
		 return mapper.getReturnQtyVo(params);
	}
	/**
	 * 一个接收发货单后更新该任务单的发货量和返修发货量
	* @Description:
	* TaskService
	* getReturnQtyVo
	* @param params void
	* @author chenlong
	* 2016-12-28 下午2:27:23
	 */
	public  void getReturnQtyVoS(Map<String, Object> params){
		int deliver_type = Integer.parseInt(params.get("deliver_type").toString());
		double receive_no = Double.parseDouble(params.get("receive_no").toString());
		Task task = mapper.getReturnQtyVo(params);
		double return_qtyVo = 0;
		double confirmed_qtyVo = 0;
		if(deliver_type == 1){
			 return_qtyVo = WebUtil.add(task.getReturn_qtyVo(), receive_no);
			 params.put("return_qtyVo", return_qtyVo);
		}else{
			 confirmed_qtyVo = WebUtil.add(task.getConfirmed_qtyVo(), receive_no);
			 params.put("confirmed_qtyVo", confirmed_qtyVo);
		}	
		mapper.updateReturnQtyVo(params);//更新确认收货的数量和返修数量
	}
	/**
	 * 查出来当前的任务单的发货数量和生产数量
	* @Description:
	* TaskService
	* getRegQtyCount
	* @param params
	* @return Task
	* @author chenlong
	* 2017-1-12 上午10:18:46
	 */
	public Task getRegQtyCount(Map<String, Object> params){
		return  mapper.getRegQtyCount(params);
	}
}
