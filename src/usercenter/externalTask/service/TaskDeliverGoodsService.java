package usercenter.externalTask.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import common.user.model.LoginAccount;


import usercenter.externalTask.TaskResponse.AllStateVo;
import usercenter.externalTask.TaskResponse.DeStatusVo;
import usercenter.externalTask.TaskResponse.DeliverGoods;
import usercenter.externalTask.TaskResponse.DeliverGoodsListVo;
import usercenter.externalTask.TaskResponse.DeliverListAndCount;
import usercenter.externalTask.TaskResponse.SendDeliverManagerVo;
import usercenter.externalTask.TaskResponse.ShippingAndDetailVo;
import usercenter.externalTask.TaskResponse.ShippingDetailListVo;
import usercenter.externalTask.TaskResponse.StateCount;
import usercenter.externalTask.data.TaskDeliverGoodsMapper;
import usercenter.externalTask.model.ShippingRegistration;
import usercenter.externalTask.model.Task;
import usercenter.externalTask.model.TaskDeliverGoods;
import usercenter.externalTask.model.TaskFile;
import util.Const;
import util.SessionUtil;
import util.WebUtil;


@Service
public class TaskDeliverGoodsService {
	@Autowired
	private TaskDeliverGoodsMapper mapper;
	@Autowired
	private TaskService taskService;
	@Autowired
	private ShippingRegistrationService shippingRegistrationService;
	@Autowired
	private TaskFileService taskFileService;
	@Autowired
	private ReceiptDetailService receiptDetailService;
    
	/**
	 * 销售查询出发货单列表
	* @Description:
	* TaskDeliverGoodsService
	* getTaskDeliverGoodsList
	* @param params
	* @return List<TaskDeliverGoods>
	* @author chenlong
	* 2016-12-20 上午9:57:44
	 */
	public SendDeliverManagerVo  getTaskDeliverGoodsList(Map<String,Object> params) {
		SendDeliverManagerVo sendDeliverManagerVo = new SendDeliverManagerVo();
		params.put("is_delete", 0);
		deletedeliverGoods(params);		
		List<TaskDeliverGoods> lists = new ArrayList<TaskDeliverGoods>();
		params.put(Const.USE_CUSTOM_COUNT, true);//表示不使用默认统计	
		List<TaskDeliverGoods> listvo = mapper.getTaskDeliverGoodsList(params);//先查出来发货单号
		for(Iterator<TaskDeliverGoods> tIterator = listvo.iterator();tIterator.hasNext();){
			TaskDeliverGoods taskDeliverGoods = tIterator.next();
			params.put("deliver_number", taskDeliverGoods.getDeliver_number());				
			params.put(Const.USE_PAGING, false);
			params.put(Const.USE_CUSTOM_COUNT, true);//表示不使用默认统计
			List<TaskDeliverGoods> list = mapper.getTaskDeliverGoodsListvo(params);//查出所有的该发货号的任务
			if(list.size()==1){
				lists.add(list.get(0));
			}else{//发货单中有不同的任务单时，以待发货状态为基准
				TaskDeliverGoods taskDeliverGoodsvos = new TaskDeliverGoods();
				for(Iterator<TaskDeliverGoods> tIterators = list.iterator();tIterators.hasNext();){
					TaskDeliverGoods taskDeliverGoodsvo = tIterators.next();
					taskDeliverGoodsvos = taskDeliverGoodsvo;
					if(taskDeliverGoodsvo.getDeliver_state()==5){
						if(taskDeliverGoodsvos.getDeliver_state()==5){							
						}else{
						   taskDeliverGoodsvos.setDeliver_state(5);
						}
					}else if(taskDeliverGoodsvo.getDeliver_state()==15){
						if(taskDeliverGoodsvos.getDeliver_state()==5){							
						}else{
						   taskDeliverGoodsvos.setDeliver_state(15);
						}
					}
				}
				lists.add(taskDeliverGoodsvos);
			}				
		}
		AllStateVo allStateVo = getDeliverGoodsCountOfState(params,0);
		sendDeliverManagerVo.setAllStateVo(allStateVo);
		sendDeliverManagerVo.setList(lists);
		params.put(Const.USE_CUSTOM_COUNT, true);//表示不使用默认统计	
		int count = mapper.getTaskDeliverGoodsListForCount(params);//统计总共的发货条数
		params.put(Const.AJAX_SERVICE_TOTAL, count);
		return 	sendDeliverManagerVo;			
	}
	/**
	 * 派单查询出发货单列表
	* @Description:
	* TaskDeliverGoodsService
	* getTaskDeliverGoodsList
	* @param params
	* @return List<TaskDeliverGoods>
	* @author chenlong
	* 2016-12-20 上午9:57:44
	 */
	public SendDeliverManagerVo  getTaskDeliverGoodsListForReceive(Map<String,Object> params) {
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		if(loginAccount.getAccount_type()==0){//主账号
			params.put("reg_id", loginAccount.getLogin_id());
		}else if(loginAccount.getAccount_type()==1){//子账号
			params.put("sa_id", loginAccount.getLogin_id());
		}
		SendDeliverManagerVo sendDeliverManagerVo = new SendDeliverManagerVo();
		params.put("is_delete", 0);		
		List<TaskDeliverGoods> lists = new ArrayList<TaskDeliverGoods>();
		params.put(Const.USE_CUSTOM_COUNT, true);//表示不使用默认统计	
		List<TaskDeliverGoods> listvo = mapper.getTaskDeliverGoodsListForReceive(params);//先查出来发货单号
		for(Iterator<TaskDeliverGoods> tIterator = listvo.iterator();tIterator.hasNext();){
			TaskDeliverGoods taskDeliverGoods = tIterator.next();
			params.put("deliver_number", taskDeliverGoods.getDeliver_number());				
			params.put(Const.USE_PAGING, false);
			params.put(Const.USE_CUSTOM_COUNT, true);//表示不使用默认统计	
			List<TaskDeliverGoods> list = mapper.getTaskDeliverGoodsListvoForReceive(params);//查出所有的该发货号的任务
			if(list.size()==1){
				lists.add(list.get(0));
			}else{//发货单中有不同的任务单时，以待发货状态为基准
				TaskDeliverGoods taskDeliverGoodsvos = new TaskDeliverGoods();
				for(Iterator<TaskDeliverGoods> tIterators = list.iterator();tIterators.hasNext();){
					TaskDeliverGoods taskDeliverGoodsvo = tIterators.next();
					taskDeliverGoodsvos = taskDeliverGoodsvo;
					if(taskDeliverGoodsvo.getDeliver_state()==5){
						if(taskDeliverGoodsvos.getDeliver_state()==5){							
						}else{
						   taskDeliverGoodsvos.setDeliver_state(5);
						}
					}else if(taskDeliverGoodsvo.getDeliver_state()==15){
						if(taskDeliverGoodsvos.getDeliver_state()==5){							
						}else{
						   taskDeliverGoodsvos.setDeliver_state(15);
						}
					}
				}
				lists.add(taskDeliverGoodsvos);
			}				
		}
		AllStateVo allStateVo = getDeliverGoodsCountOfState(params,1);
		sendDeliverManagerVo.setAllStateVo(allStateVo);
		sendDeliverManagerVo.setList(lists);
		params.put(Const.USE_CUSTOM_COUNT, true);//表示不使用默认统计	
		int count = mapper.getTaskDeliverGoodsListForCountForReceive(params);//统计总共的发货条数
		params.put(Const.AJAX_SERVICE_TOTAL, count);
		return 	sendDeliverManagerVo;			
	}
	/**
	 * 获取各种状态任务单的数量
	* @Description:
	* TaskDeliverGoodsService
	* getDeliverGoodsCountOfState
	* @param params
	* @return AllStateVo
	* @author chenlong
	* 2016-12-20 下午2:00:30
	 */
	public AllStateVo  getDeliverGoodsCountOfState(Map<String,Object> params,int type) {
		AllStateVo vo=new AllStateVo(0,0,0,0,0,0,0,0,0);//借用一个回参TODO
		params.put("is_delete", 0);
		List<TaskDeliverGoods> list = new ArrayList<TaskDeliverGoods>();
		List<StateCount> list1 = new ArrayList<StateCount>();
		params.put(Const.USE_CUSTOM_COUNT, true);//表示不使用默认统计	
		if(type == 0){
		   list = mapper.getTaskDeliverGoodsListDeliver(params);		  
		}else{
		   list = mapper.getTaskDeliverGoodsListDeliverForReceive(params);		  
		}
		List<StateCount> list2 = new ArrayList<StateCount>();
		for(Iterator<TaskDeliverGoods> iterator = list.iterator();iterator.hasNext();){
			TaskDeliverGoods taskDeliverGoods = iterator.next();
			params.put("deliver_number", taskDeliverGoods.getDeliver_number());
			params.put(Const.USE_CUSTOM_COUNT, true);//表示不使用默认统计	
			if(type == 0){
			    list1 = mapper.getDeliverGoodsCountOfState(params);		
			}else{
				list1 = mapper.getDeliverGoodsCountOfStateForReceive(params);		
			}
			if(list1.size()==1){
				list2.add(list1.get(0));
			}else{	
				StateCount stateCount2 = new StateCount();
				for(Iterator<StateCount> tIterators = list1.iterator();tIterators.hasNext();){
					StateCount stateCount = tIterators.next();
					stateCount2 = stateCount;
					if(stateCount.getState()==5){
						if(stateCount2.getState()==5){							
						}else{
							stateCount2.setState(5);
						}
					}else if(stateCount.getState()==15){
						if(stateCount2.getState()==5){							
						}else{
							stateCount2.setState(15);
						}
					}
				}
				list2.add(stateCount2);
			}			
		}
		if(list2 != null){
			int all= 0;
			int setsend = 0;
			int tosend = 0;
			int productnum = 0;
			for(StateCount stateCount : list2){
				switch(stateCount.getState()){
					case 5:
						tosend++;											
						break;
					case 10:						
						setsend++;					
						break;
					case 15:
						productnum++;						
						break;
					default:
						break;
				}	
			}
			all = tosend+setsend+productnum;
			vo.setToBeSend(tosend);
			vo.setSended(setsend);
			vo.setProducting(productnum);
			vo.setAll(all);
		}
		return vo;
	}
	/**
	 * 添加发货清单
	* @Description:
	* TaskDeliverGoodsService
	* addTaskDeliverGoods
	* @param params void
	* @author chenlong
	* 2016-12-13 上午11:19:25
	 */
	public DeliverGoods addTaskDeliverGoods(Map<String,Object> params) {
		String[] arr = params.get("arr").toString().split(",");
		params.put("arr",arr);
		DeliverGoods deliverGoods = new DeliverGoods();
		boolean flag = taskService.RegCompanyForOne(params);//验证是否是同一个公司的任务单
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		params.put("operator", loginAccount.getLogin_name());
		if(flag){
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("arrs", arr);
			List<Task> lists = mapper.getTaskProductList(map);//返回任务单详情
			for(Iterator<Task> it2 = lists.iterator();it2.hasNext();){
				Task task = it2.next();
				params.put("customer_id",task.getSend_company());
				params.put("customer_name", task.getSend_company_name());
				params.put("t_id", task.getT_id());	
				params.put("is_delete",0);//;//是否删除
				double num_qty  = getDeliverdetailSum(task,params);// 查出当前任务单的可发货数量
				params.put("delivery_quantity",num_qty>0?num_qty:0);
				task.setDelivery_quantity(num_qty>0?num_qty:0);//将可发货数量存入任务表信息中发回给页面
				params.put("deliver_state",5);//				
				mapper.addTaskDeliverGoods(params);//发货清单中添加任务单	
		     }
		    deliverGoods.setFlag(true);		   		   		   
		    int listlength = lists.size();
		    if(listlength>0){
			    deliverGoods.setList(lists); 
			    deliverGoods.setCompany_name(lists.get(0).getSend_company_name());
			    deliverGoods.setDeliver_number(params.get("deliver_number").toString());
			    deliverGoods.setListlength(listlength);
		    }
		}else{
			deliverGoods.setFlag(false);
		}			
		return deliverGoods;
	}

	/**
	 * 查出当前任务单的可发货数量
	* @Description:
	* TaskDeliverGoodsService
	* getDeliverdetailSum
	* @param params
	* @return double
	* @author chenlong
	* 2017-1-12 下午2:09:43
	 */
     public double getDeliverdetailSum(Task task,Map<String,Object> params){
    	// long t1=System.currentTimeMillis(); 
//    	LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
// 		params.put("operator", loginAccount.getLogin_name());
// 		//params.put("is_delete",0);//;//是否删除
// 		params.put(Const.USE_PAGING, false);
// 		params.put("t_id", task.getT_id());	
// 		params.put("confirmed_qtyVo", task.getConfirmed_qtyVo());	
// 		params.put("return_qtyVo", task.getReturn_qtyVo());	
// 		params.put("producted_qty", task.getProduced_qty());	
// 		params.put("total_qty", task.getTotal_qty());
// 		//params.put("num_qty", 0);		
// 		if(WebUtil.isEmpty(params.get("deliver_number"))){
// 			params.put("deliver_number","");
// 		}		
// 		if(!WebUtil.isEmpty(params.get("type"))){
//			params.put("deliver_type", params.get("type"));			
//		}
// 		double num_qty = 0;//能够返回的发货数		
//		mapper.getDeliverdetailSumDemo(params);
//		System.out.println(params.get("num_qty"));
//		num_qty = Double.parseDouble(params.get("num_qty").toString());
    	            
	    	 LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
	 		params.put("operator", loginAccount.getLogin_name());
	 		params.put("is_delete",0);//;//是否删除
	 		params.put(Const.USE_PAGING, false);
	 		params.put("t_id", task.getT_id());		
	 		double sum = 0;//页面正常发货量
	 		double sum2 = 0;//页面返修发货值
	 		double sumvo1 = mapper.getDeliverdetailSumVo(params);//除了当前发货单还有在发货途中的正常数量的
	 		double sumvo2 = mapper.getDeliverdetailReturnSumVo(params);//除了当前发货单还有在发货途中的返修数量的
	 		double count1 = WebUtil.add(task.getConfirmed_qtyVo(), sumvo1);//正常发货总量
	 		double count2 = WebUtil.add(task.getReturn_qtyVo(), sumvo2);//返修发货总量
	 		double num_qty = 0;//能够返回的发货数
	 		if(!WebUtil.isEmpty(params.get("type"))){
	 			params.put("deliver_type", params.get("type"));
	 		}
	 		if(Integer.parseInt(params.get("deliver_type").toString())==0){//正常发货时页面的值
	 			params.put("deliverTypes", params.get("deliver_type").toString());
	 		sum = mapper.getDeliverdetailSum(params);//取出现在该任务单所有正常的要发货的数量			
	 		params.put("deliverTypes", 1);
	 		sum2 = mapper.getDeliverdetailSum(params);//取出现在该任务单所有页面的要返修发货的数量	
	 		num_qty =WebUtil.sub(WebUtil.sub(task.getProduced_qty(),WebUtil.add(count1, count2)),WebUtil.add(sum,sum2));
	 		double num_qtyVo = WebUtil.sub(task.getTotal_qty(), WebUtil.add(count1, sum));//正常须发货的产量
	 		if(num_qtyVo<num_qty){
	 			num_qty = num_qtyVo;//获得发回的可发数量
	 		}
	 		}else{//返修发货时直接计算页面的总值
	 			sum = mapper.getDeliverdetailSum(params);//取出现在该页面任务单所有的要发货的数量<不做严格控制>
	 			num_qty =WebUtil.sub(WebUtil.sub(task.getProduced_qty(),WebUtil.add(count1, count2)),WebUtil.add(sum,sum2));
	 		}	
	 		// long t2=System.currentTimeMillis();
	 		// System.out.println(t2-t1);  
	 	return num_qty>0?num_qty:0;
     }
	/**
	 * 删除发货清单中的一条任务单
	* @Description:
	* TaskDeliverGoodsService
	* deleteTaskDeliverGoods
	* @param arr void
	* @author chenlong
	* 2016-12-14 下午2:41:06
	 */
	public void deleteTaskDeliverGoods(Map<String, Object> map){
		    map.put("is_delete", 1);
		    String[] tarr = map.get("arr").toString().split(",");
		    map.put("tarr", tarr);
			mapper.updateTaskDeliverGoodsFordel(map);		
	}
	/**
	 * 返回已添加过载该清单中的任务单
	* @Description:
	* TaskDeliverGoodsService
	* getTaskDeliverGoods
	* @param map
	* @return List<TaskDeliverGoods>
	* @author chenlong
	* 2016-12-14 下午2:53:14
	 */
	public List<TaskDeliverGoods> getTaskDeliverGoods(Map<String, Object> map){
		    map.put("is_delete", 0);
			return mapper.getTaskDeliverGoods(map);		
     }
	/**
	 * 更新发货明细中的所有关联运单的id
	* @Description:
	* TaskDeliverGoodsService
	* updateDeliverForGoods
	* @param map void
	* @author chenlong
	* 2016-12-15 下午3:47:22
	 */
	public void updateDeliverForGoods(Map<String, Object> map){
		 map.put("is_delete", 0);
		 map.put("deliver_state", 5);
		 mapper.updateDeliverForGoods(map);
	}
	/**
	 * 更新任务单的发货量
	* @Description:
	* TaskDeliverGoodsService
	* getDeliverdetail
	* @param map
	* @return boolean
	* @author chenlong
	* 2016-12-15 下午5:43:42
	 */
	public boolean updateDeliverdetail(Map<String, Object> map){
	    map.put("is_delete", 0);
	    boolean flag = true;
	    List<TaskDeliverGoods> list =  mapper.getDeliverdetail(map);
	    LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
	    map.put("operator", loginAccount.getLogin_name());
	    for(Iterator<TaskDeliverGoods> it2 = list.iterator();it2.hasNext();){//第一次遍历进行验证
	    	TaskDeliverGoods taskDeliverGoods = it2.next();
	    	map.put("t_id", taskDeliverGoods.getT_id());
	    	map.put("deliver_number", taskDeliverGoods.getDeliver_number());
	    	Task task = taskService.regTaskForShipping(map);
	    	map.put("is_delete", 0);
	    	map.put("deliver_type", taskDeliverGoods.getDeliver_type());
	    	double num_qty = getDeliverdetailSum(task,map);	    		    	
	    	double send_count =	taskDeliverGoods.getDelivery_quantity();
	 		if(send_count>num_qty){
	 			flag = false;
	 			break;
	 		} 		
	    }
	    if(flag){
	    for(Iterator<TaskDeliverGoods> it2 = list.iterator();it2.hasNext();){//第二次遍历进行数据的插入与更新
	    	TaskDeliverGoods taskDeliverGoods = it2.next();
	    	double send_count =	taskDeliverGoods.getDelivery_quantity();
	    	map.put("t_id", taskDeliverGoods.getT_id());
	    	Task task = taskService.regTaskForShipping(map);
	    	if(taskDeliverGoods.getDeliver_type()==0){//统计正常发货总数
 			    send_count = WebUtil.add(send_count,task.getSendout_qty());	//这是新增还未统计入总数量，所以直接相加
 			    map.put("sendout_qty", send_count);
	    	}else if(taskDeliverGoods.getDeliver_type()==1){//统计返修发货总数
	    	    send_count = WebUtil.add(send_count,task.getReturn_send_qtyVo());
	    	    map.put("return_send_qtyVo", send_count);	    	    
	    	} 			
 			taskService.updateTaskSendout(map);
	    }
 		}
	    return flag;
  }
	/**
	 * 添加时更新发货单的发货量
	* @Description:
	* TaskDeliverGoodsService
	* updateDeliverGoodsForQuantity
	* @param map
	* @return boolean
	* @author chenlong
	* 2016-12-30 下午4:01:52
	 */
	public boolean updateDeliverGoodsForQuantity(Map<String, Object> map){
		boolean flag = false;
		double send_count = Double.parseDouble(map.get("send_count").toString());
		if(send_count>0){
			LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
			map.put("operator", loginAccount.getLogin_name());
			map.put("is_delete", 0);																
			Task task = taskService.regTaskForShipping(map);//验证总数是否超过	    	
	    	double num_qty = getDeliverdetailSum(task,map);				
			if(num_qty>=send_count){
				map.put("delivery_quantity", send_count);
				mapper.updateDeliverGoodsForQuantity(map);//更新该发货明细的发货量
				flag = true;
		    }			   
		   }	
		 return flag;
	}
	/**
	 * 除了当前发货单还有在发货途中的正常数量的
	* @Description:
	* TaskDeliverGoodsService
	* getDeliverdetailSumVo
	* @param map
	* @return double
	* @author chenlong
	* 2017-1-13 下午1:24:31
	 */
	public double getDeliverdetailSumVo(Map<String, Object> map){	
		map.put("is_delete", 0);
		return mapper.getDeliverdetailSumVo(map);//除了当前发货单还有在发货途中的正常数量的
	}
	/**
	 * 在编辑发货时用---更新发货单的发货量
	* @Description:
	* TaskDeliverGoodsService
	* updateDeliverGoodsForQuantity
	* @param map void
	* @author chenlong
	* 2016-12-16 上午10:35:03
	 */
	public String updateDeliverGoodsForQuantitys(Map<String, Object> map){
		String message = "成功";
		boolean flag = shippingRegistrationService.getShippingStatus(map);
		if(flag){
			map.put("is_delete", 0);
			if(getDeliverGoodsStatesInNumber(map)){
				String[] tids = map.get("tids").toString().split(",");//修改的任务单 id
				String[] sendcounts = map.get("sendcounts").toString().split(",");//修改的任务单的数量
				String[] products = map.get("products").toString().split(",");//修改的任务单的产品名称
				message = "成功";
				for(int i=0;i<sendcounts.length;i++){		
					double send_count = Double.parseDouble(sendcounts[i]);
					if(send_count>0){
						map.put("t_id", tids[i]);
						LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
						map.put("operator", loginAccount.getLogin_name());
						map.put("is_delete", 0);
						Task task = taskService.regTaskForShipping(map);//TODO	
						double num_qty = getDeliverdetailSum(task,map);																
						if(send_count>num_qty){
							message =products[i]+"的发送的货物量大于您所生产的量,请重新输入";
							break;
						}
				}
				}
				if(message.equals("成功")){
					for(int i=0;i<sendcounts.length;i++){
						double send_count = Double.parseDouble(sendcounts[i]);
						if(send_count>0){
							map.put("t_id", tids[i]);
							double send_counts = send_count;							   					
							map.put("is_delete", 0);						
							map.put("delivery_quantity", send_counts);	
							mapper.updateDeliverGoodsForQuantity(map);//更新该发货明细的发货量
							double count = mapper.getDeliveryQtyForType(map);//获取返修或者正常的发货该任务单的发货总数量
							if(Integer.parseInt(map.get("type").toString())==0){
								map.put("sendout_qty", count);
							}else if(Integer.parseInt(map.get("type").toString())==1){
								map.put("return_send_qtyVo", count);
							}
							taskService.updateTaskSendout(map);//更新数量
					}
					}			
				}
			}else{
				message = "该发货单已经不是待接收状态！！";
			}
		}else{
			message = "该运单单已被取消！！";
		}
		return message;
	}
	/**
	 * 删除数据库中多余的数据
	* @Description:
	* TaskDeliverGoodsService
	* deletedeliverGoods
	* @param map void
	* @author chenlong
	* 2016-12-20 下午3:33:50
	 */
	public void  deletedeliverGoods(Map<String, Object> map){
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		map.put("operator", loginAccount.getLogin_name());
		map.put("is_delete", 0);
		mapper.deletedeliverGoods(map);
		Date dNow = new Date();   //当前时间
		Date dBefore = new Date();
		Calendar calendar = Calendar.getInstance(); //得到日历
		calendar.setTime(dNow);//把当前时间赋给日历
		calendar.add(Calendar.DAY_OF_MONTH, -1);  //设置为前一天
		dBefore = calendar.getTime();   //得到前一天的时间
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String defaultStartDate = sdf.format(dBefore);
		map.put("create_time", defaultStartDate);
		mapper.deleteOutTime(map);
	}
	/**
	 * 查询出运单的信息
	* @Description:
	* TaskDeliverGoodsService
	* getdeliverGoodsForNumber
	* @param map
	* @return ShippingAndDetailVo
	* @author chenlong
	* 2016-12-21 上午10:03:07
	 */
	public ShippingAndDetailVo getdeliverGoodsForNumber(Map<String, Object> map){
		 ShippingAndDetailVo shippingAndDetailVo = new ShippingAndDetailVo();		 
		 map.put("is_delete", 0);
		 Map<String, Object> param = new HashMap<String, Object>();
		 ShippingDetailListVo shippingDetailListVo = new ShippingDetailListVo();
		 List<DeliverGoodsListVo> list =  mapper.getdeliverGoodsForNumber(map);
		 if(list!=null){
			 if(list.size()>1){
				 for(Iterator<DeliverGoodsListVo> iterator = list.iterator();iterator.hasNext();){
					 DeliverGoodsListVo iDeliverGoodsListVo = iterator.next();
					 if(iDeliverGoodsListVo.getDeliver_state()==5){
						 if(shippingDetailListVo.getDeliver_state()==5){							
							}else{
						        shippingDetailListVo.setDeliver_state(iDeliverGoodsListVo.getDeliver_state());						    
								shippingDetailListVo.setCustomer_name(iDeliverGoodsListVo.getCustomer_name());
								shippingDetailListVo.setConfirm_dt(iDeliverGoodsListVo.getConfirm_dt());
								shippingDetailListVo.setDeliver_type(iDeliverGoodsListVo.getDeliver_type());
								shippingDetailListVo.setReceipt_remark(iDeliverGoodsListVo.getReceipt_remark());
							}
					 }else if(iDeliverGoodsListVo.getDeliver_state()==15){
							if(shippingDetailListVo.getDeliver_state()==5){							
							}else{
								shippingDetailListVo.setDeliver_state(iDeliverGoodsListVo.getDeliver_state());
								shippingDetailListVo.setCustomer_name(iDeliverGoodsListVo.getCustomer_name());
								shippingDetailListVo.setConfirm_dt(iDeliverGoodsListVo.getConfirm_dt());
								shippingDetailListVo.setDeliver_type(iDeliverGoodsListVo.getDeliver_type());
								shippingDetailListVo.setReceipt_remark(iDeliverGoodsListVo.getReceipt_remark());
							}
					}
				 }
			 }else{			 
				 shippingDetailListVo.setDeliver_state(list.get(0).getDeliver_state());
				 shippingDetailListVo.setCustomer_name(list.get(0).getCustomer_name());
				 shippingDetailListVo.setConfirm_dt(list.get(0).getConfirm_dt());
				 shippingDetailListVo.setDeliver_type(list.get(0).getDeliver_type());
				 shippingDetailListVo.setReceipt_remark(list.get(0).getReceipt_remark());
			 }
			 shippingDetailListVo.setList(list);	
			 shippingAndDetailVo.setShippingDetailListVo(shippingDetailListVo);
			 param.put("shipping_id",  list.get(0).getShipping_id());
			 ShippingRegistration shippingRegistration = shippingRegistrationService.getShippingForID(param);
			 shippingAndDetailVo.setShippingRegistration(shippingRegistration);
			 param.put("file_type",  49);
			 param.put("is_delete",  0);
			 List<TaskFile> fileList = taskFileService.getTaskShippingFile(param);
			 shippingAndDetailVo.setTaskFiles(fileList);
		 }
		 return shippingAndDetailVo;		 
	}
	/**
	 * 查询运单下所有的发货清单
	* @Description:
	* TaskDeliverGoodsService
	* getdeliverGoodsForID
	* @param params
	* @return List<DeliverGoodsListVo>
	* @author chenlong
	* 2016-12-21 下午1:46:20
	 */
	public List<ShippingDetailListVo> getdeliverGoodsForID(Map<String,Object> params){
		List<ShippingDetailListVo> shippingDetailListVo = new ArrayList<ShippingDetailListVo>();
		params.put("is_delete", 0);
		List<StateCount> listCount = mapper.getdeliverGoodsForIDCount(params);
		Map<String, Object> param = new HashMap<String, Object>();
		for(Iterator<StateCount> sIterator = listCount.iterator();sIterator.hasNext();){
			StateCount stateCount = sIterator.next();
			ShippingDetailListVo shippingDetailListVo2 = new ShippingDetailListVo();
			param.put("deliver_number", stateCount.getDeliver_number());
			param.put("is_delete", 0);
			List<DeliverGoodsListVo> list =  mapper.getdeliverGoodsForNumber(param);
			if(list!=null){
				 if(list.size()>1){
					 for(Iterator<DeliverGoodsListVo> iterator = list.iterator();iterator.hasNext();){
						 DeliverGoodsListVo iDeliverGoodsListVo = iterator.next();
						 if(iDeliverGoodsListVo.getDeliver_state()==5){
							 if(shippingDetailListVo2.getDeliver_state()==5){							
								}else{
									shippingDetailListVo2.setDeliver_state(iDeliverGoodsListVo.getDeliver_state());						    
									shippingDetailListVo2.setCustomer_name(iDeliverGoodsListVo.getCustomer_name());
									shippingDetailListVo2.setConfirm_dt(iDeliverGoodsListVo.getConfirm_dt());
									shippingDetailListVo2.setDeliver_type(iDeliverGoodsListVo.getDeliver_type());
									shippingDetailListVo2.setDeliver_number(iDeliverGoodsListVo.getDeliver_number());
								}
						 }else if(iDeliverGoodsListVo.getDeliver_state()==15){
								if(shippingDetailListVo2.getDeliver_state()==5){							
								}else{
									shippingDetailListVo2.setDeliver_state(iDeliverGoodsListVo.getDeliver_state());
									shippingDetailListVo2.setCustomer_name(iDeliverGoodsListVo.getCustomer_name());
									shippingDetailListVo2.setConfirm_dt(iDeliverGoodsListVo.getConfirm_dt());
									shippingDetailListVo2.setDeliver_type(iDeliverGoodsListVo.getDeliver_type());
									shippingDetailListVo2.setDeliver_number(iDeliverGoodsListVo.getDeliver_number());
								}
						}
					 }
				 }else{			 
					 shippingDetailListVo2.setDeliver_number(list.get(0).getDeliver_number());
					 shippingDetailListVo2.setDeliver_state(list.get(0).getDeliver_state());
					 shippingDetailListVo2.setCustomer_name(list.get(0).getCustomer_name());
					 shippingDetailListVo2.setConfirm_dt(list.get(0).getConfirm_dt());
					 shippingDetailListVo2.setDeliver_type(list.get(0).getDeliver_type());
				 }							
				shippingDetailListVo2.setListlength(list.size());//(list.get(0).getCustomer_name());
				shippingDetailListVo2.setList(list);
				shippingDetailListVo.add(shippingDetailListVo2);
			}
		}
		return shippingDetailListVo;
	}
	/**
	 *  取消一个发货单状态
	* @Description:
	* TaskDeliverGoodsService
	* updateCancelDertail
	* @param params void
	* @author chenlong
	* 2016-12-22 下午4:41:45
	 */
	public String  updateCancelDertail(Map<String,Object> params){
		Map<String,Object> map = getNowDertailStatus(params);	
		map.put("t_id", params.get("t_id"));
		map.put("deliver_number", params.get("deliver_number"));
		if((map.get("message").toString()).equals("成功")){//1.先把该单条取消
				params.put("deliver_state", 15);
				mapper.updateCancelDertail(params);
				taskService.updateProductSend(map);		
			}		 
		 map.put("is_delete", 0);//查看当前的发货单的状态
		 ShippingDetailListVo shippingDetailListVo = new ShippingDetailListVo();
		 List<DeliverGoodsListVo> list =  mapper.getdeliverGoodsForNumber(map);
		 if(list!=null){
			 if(list.size()>1){
				 for(Iterator<DeliverGoodsListVo> iterator = list.iterator();iterator.hasNext();){
					 DeliverGoodsListVo iDeliverGoodsListVo = iterator.next();
					 if(iDeliverGoodsListVo.getDeliver_state()==5){
						 if(shippingDetailListVo.getDeliver_state()==5){							
							}else{
						        shippingDetailListVo.setDeliver_state(iDeliverGoodsListVo.getDeliver_state());						    	
							}
					 }else if(iDeliverGoodsListVo.getDeliver_state()==15){
							if(shippingDetailListVo.getDeliver_state()==5){							
							}else{
								shippingDetailListVo.setDeliver_state(iDeliverGoodsListVo.getDeliver_state());
							}
					}
				 }
			 }else{			 
				 shippingDetailListVo.setDeliver_state(list.get(0).getDeliver_state());
			 }
			 shippingDetailListVo.setList(list);
			 //TODO查询出shipping_id
			 if(shippingDetailListVo.getDeliver_state()==15){//3.更具当前发货单状态进行运单是否取消
				  map.put("is_delete", 0);
				//  map.put("deliver_state", 5);
				  map.put("shipping_id",list.get(0).getShipping_id());
			      Integer count =  mapper.getNowShippingDetailCount(map);			     
			      if(count==0){//4.判断当前运单是否可以取消
			    	  map.put("shipping_state", 1);
			    	  shippingRegistrationService.updateShippingRegistrationForCancel(map);
			      }
			 }
		 }		
		return map.get("message").toString();
	}
	/**
	 * 取消发货单的请求
	* @Description:
	* TaskDeliverGoodsService
	* updateCancelDertailvo
	* @param params void
	* @author chenlong
	* 2016-12-23 下午4:34:32
	 */
	public void updateCancelDertailvo(Map<String,Object> params){
		mapper.updateCancelDertail(params);
	}
	/**
	 *  取消一批发货单状态
	* @Description:
	* TaskDeliverGoodsService
	* updateCancelDertail
	* @param params void
	* @author chenlong
	* 2016-12-22 下午4:41:45
	 */
	public String updateCancelDertaillist(Map<String,Object> params){
		Map<String,Object> param = updateCancelDertailVo(params);
		@SuppressWarnings("unchecked")
		List<DeStatusVo> list = (ArrayList<DeStatusVo>)(param.get("list"));
		if((param.get("message").toString()).equals("成功")){
			params.put("deliver_state", 15);
			for(Iterator<DeStatusVo> iterator = list.iterator();iterator.hasNext();){
				DeStatusVo deStatusVo = iterator.next();				
				if(deStatusVo.getDeliver_state() == 5){	//状态为待收货时进行删除	
				  params.put("delivery_quantity", deStatusVo.getDelivery_quantity());//减去产量
				  params.put("t_id", deStatusVo.getT_id());
				  params.put("deliver_type", deStatusVo.getDeliver_type());
				  updateCancelDertailvo(params);			    
			      taskService.updateProductSend(params);
			      param.put("is_delete", 0);
			      Integer count =  mapper.getNowShippingDetailCount(param);			     
			      if(count==0){
			    	  param.put("shipping_state", 1);
			    	  shippingRegistrationService.updateShippingRegistrationForCancel(param);
			      }
			    }else{//状态为已取消时不进行操作			    	
			    }
			}
		}
		return param.get("message").toString();			
	}
	/**
	 *  取消发货单状态
	* @Description:
	* TaskDeliverGoodsService
	* updateCancelDertail
	* @param params void
	* @author chenlong
	* 2016-12-22 下午4:41:45
	 */
	public Map<String,Object> updateCancelDertailVo(Map<String,Object> params){
		String message = "成功";
		Map<String,Object> param = new HashMap<String, Object>();
		List<DeStatusVo> list = mapper.getdelivergoodStateList(params);
		params.put("shipping_id", list.get(0).getShipping_id());
		boolean flag = shippingRegistrationService.getShippingStatus(params);//查询当前运单的状态
		for(Iterator<DeStatusVo> iterator = list.iterator();iterator.hasNext();){
			DeStatusVo deStatusVo = iterator.next();
			if(flag){				
				if(deStatusVo.getDeliver_state() == 5){	
					
				}else if(deStatusVo.getDeliver_state() == 15){//存在已被取消的发货单
					    message="成功";
				}else{//存在已被收货消的发货单
					    message="发货单状态已改变!无法操作";
					    break;
				}
			}else{//存在已被收货消的运单
				   message="运单已被取消!无法操作";
				   break;
				}
		}		
		param.put("message", message);
		param.put("list", list);
		param.put("shipping_id", list.get(0).getShipping_id());
		return param;			
	}
	
	/**
	 * 当前发货单是否可编辑 return‘成功’==可编辑
	* @Description:
	* TaskDeliverGoodsService
	* getNowDertailStatus
	* @param params
	* @return String
	* @author chenlong
	* 2016-12-22 下午5:31:30
	 */
	public Map<String,Object>  getNowDertailStatus(Map<String,Object> params){
		String message = "成功";
		Map<String,Object> param = new HashMap<String, Object>();
		DeStatusVo deStatusVo = mapper.getdelivergoodState(params);
		if(deStatusVo.getDeliver_state() == 5){
			params.put("shipping_id", deStatusVo.getShipping_id());
			boolean flag = shippingRegistrationService.getShippingStatus(params);//查询当前运单的状态
			if(flag){						   
			}else{
			   message="运单已被取消!无法操作";
			}
		}else if(deStatusVo.getDeliver_state() == 15){
			   message="已被取消！";
		    }else{
		       message="发货单状态已改变!无法操作";	    
		}
		param.put("message", message);
		param.put("delivery_quantity", deStatusVo.getDelivery_quantity());
		param.put("deliver_type",deStatusVo.getDeliver_type());
		return param;
	}
	/**
	 * 收取一批发货单
	* @Description:
	* TaskDeliverGoodsService
	* updateReciveDertailVo
	* @param params void
	* @author chenlong
	* 2016-12-27 上午10:58:53
	 */
	public String updateReciveDertailVo(Map<String,Object> params){
		String message = getDeliverGoodsStatesInNumberVos(params);
		if(message.equals("success")){
			String[] deliver_ids = params.get("deliver_id").toString().split(",");
			String[] receive_nos = params.get("receive_no").toString().split(",");
			/**
			 * 1.遍历所有的发货单是接受数量否符合数量
			 */
			for(int i=0;i<deliver_ids.length;i++){
				int deliver_id = Integer.parseInt(deliver_ids[i]);
				params.put("deliver_id", deliver_id);
				TaskDeliverGoods taskDeliverGoods = mapper.getDeliverForID(params);
				if(taskDeliverGoods.getDelivery_quantity()>=Double.parseDouble(receive_nos[i])){
				}else{
					message = "确认收货数量不能大于送货数!!";
					break;
				}			
			}
			/**
			 * 2.符合数量再进行操作，遍历两次主要防止中途出现验证失败，而数据不会回滚，造成脏数据
			 */
			if(message.equals("success")){	
				for(int i=0;i<deliver_ids.length;i++){
					int deliver_id = Integer.parseInt(deliver_ids[i]);
					params.put("deliver_id", deliver_id);
					TaskDeliverGoods taskDeliverGoods = mapper.getDeliverForID(params);
					params.put("receive_no", receive_nos[i]);
					params.put("t_id", taskDeliverGoods.getT_id());
					params.put("deliver_no",taskDeliverGoods.getDelivery_quantity());
					receiptDetailService.addReceiptDetail(params);//添加一条收货信息
					params.put("deliver_type", taskDeliverGoods.getDeliver_type());
					taskService.getReturnQtyVoS(params);//更新任务单的到货总数量和返修总数
					params.put("deliver_state", 10);
					params.put("confirm_dt", new Date());
					mapper.ReciveDeliverForID(params);//更新该任务单发货单的状态
				}
			}
		}else{			
		}
		return message;
	}
	/**
	 * 返回发货单下所有的该任务单的情况
	* @Description:
	* TaskDeliverGoodsService
	* getTaskDeliverGoodsforOneTask
	* @param params
	* @return List<TaskDeliverGoods>
	* @author chenlong
	* 2016-12-27 下午3:44:41
	 */
	public DeliverListAndCount getTaskDeliverGoodsforOneTask(Map<String,Object> params){
		params.put("is_delete", 0);
		DeliverListAndCount deliverListAndCount = new DeliverListAndCount();
		List<TaskDeliverGoods> list = mapper.getTaskDeliverGoodsforOneTask(params);
		double deliver_all = 0;
		double deliver_reAll = 0;
		for(TaskDeliverGoods taskDeliverGoods : list) {		
			taskDeliverGoods.setStart_week(WebUtil.getWeek(taskDeliverGoods.getStart_date()));
			switch(taskDeliverGoods.getDeliver_state()){
			case 5:
				deliver_all += taskDeliverGoods.getDelivery_quantity();
				break;
			case 10:
				deliver_all += taskDeliverGoods.getDelivery_quantity();
				deliver_reAll += taskDeliverGoods.getReceive_no();
				break;
			case 15:
				break;
			}
		}
		deliverListAndCount.setDeliver_all(deliver_all);
		deliverListAndCount.setDeliver_reAll(deliver_reAll);
		deliverListAndCount.setList(list);
		return deliverListAndCount;
	}
	/**
	 * 判断当前任务单是否存在未接收的发货单
	* @Description:存在 :为false给终止任务单用的
	* TaskDeliverGoodsService
	* getTaskDeliverGoodsStatus
	* @param params
	* @return Integer
	* @author chenlong
	* 2017-1-2 上午10:55:19
	 */
	public boolean getTaskDeliverGoodsStatus(Map<String,Object> params){
		List<TaskDeliverGoods> list  = mapper.getTaskDeliverGoodsStatus(params);
		boolean flag = true;
		if(list != null){
			if(list.size()==1){
				if(list.get(0).getDeliver_state()==5){
					flag = false;
				}
			}else{
				for(Iterator<TaskDeliverGoods> iterator = list.iterator();iterator.hasNext();){
					TaskDeliverGoods taskDeliverGoods = iterator.next();
					if(taskDeliverGoods.getDeliver_state()==5){
						flag = false;
						break;
					}
				}
			}
		}else{
		}
		return flag;
	}
	/**
	 * 判断当前的发货单是否可以编辑
	* @Description:
	* TaskDeliverGoodsService
	* getDeliverGoodsStatesInNumber
	* @param params
	* @return boolean
	* @author chenlong
	* 2017-1-11 上午10:55:24
	 */
	public boolean getDeliverGoodsStatesInNumber(Map<String,Object> params){
		boolean flag = true ;
		List<TaskDeliverGoods> list = mapper.getDeliverGoodsStatesInNumber(params);
		TaskDeliverGoods taskDeliverGoods = new TaskDeliverGoods();
		if(list.size()==1){
			taskDeliverGoods = list.get(0);
		}else{//发货单中有不同的任务单时，以待发货状态为基准
			for(Iterator<TaskDeliverGoods> tIterators = list.iterator();tIterators.hasNext();){
				TaskDeliverGoods taskDeliverGoodsvo = tIterators.next();
				taskDeliverGoods = taskDeliverGoodsvo;
				if(taskDeliverGoodsvo.getDeliver_state()==5){
					if(taskDeliverGoods.getDeliver_state()==5){							
					}else{
						taskDeliverGoods.setDeliver_state(5);
					}
				}else if(taskDeliverGoodsvo.getDeliver_state()==15){
					if(taskDeliverGoods.getDeliver_state()==5){							
					}else{
						taskDeliverGoods.setDeliver_state(15);
					}
				}
			}
		}
		if(taskDeliverGoods.getDeliver_state() == 5){
			flag = true;
		}else{
			flag = false;
		}
		return flag;
	}
	/**
	 * 检查当前修改发货信息时对发货单和运单的状态检查（必须验证）
	* @Description:
	* TaskDeliverGoodsService
	* getDeliverGoodsStatesInNumberVos
	* @param map
	* @return String
	* @author chenlong
	* 2017-1-11 上午11:07:19
	 */
	public String getDeliverGoodsStatesInNumberVos(Map<String,Object> map){
		String message = "success";
		boolean flag = shippingRegistrationService.getShippingStatus(map);
		if(flag){			
			if(!WebUtil.isEmpty(map.get("deliver_number"))){
				map.put("is_delete", 0);
				if(getDeliverGoodsStatesInNumber(map)){				
				}else{
					message = "该发货单已经不是待接收状态！！";
				}
			}
		}else{
			message = "该运单单已被取消！！";
	    }
		return message;
     }
	public void addPfPurchaseOrderOperating(Map<String,Object> map){
		mapper.addPfPurchaseOrderOperating(map);
	}
}

