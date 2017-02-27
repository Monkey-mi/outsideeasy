package usercenter.externalTask.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.externalTask.TaskResponse.TaskOutputVo;
import usercenter.externalTask.data.TaskOutputMapper;
import usercenter.externalTask.model.Task;
import usercenter.externalTask.model.TaskOutput;
import usercenter.externalTask.model.TaskProcessSection;
import util.Const;
import util.WebUtil;

@Service
public class TaskOutputService {
	@Resource
	private TaskOutputMapper taskOutputMapper;
	@Autowired
	private TaskProcessSectionService taskProcessSectionService;
	@Autowired
	private TaskService taskService;
	/**
	 * 查询生产信息
	 * @param 
	 * @return
	 * @author chenlong
	 * @date 2016-04-27
	 */
	public List<TaskOutputVo> getTaskOutputList(Map<String,Object> params){
		params.put(Const.USE_CUSTOM_COUNT, true);//表示不使用默认统计	
		List<TaskOutputVo> list = taskOutputMapper.getTaskOutputList(params);
		params.put(Const.USE_PAGING, false);
		Integer count = taskOutputMapper.getTaskOutputListCount(params);
		params.put(Const.AJAX_SERVICE_TOTAL, count);
		return list;
	}
	/**
	 *添加该条件下的所有产量信息
	 * @param params
	 * @author chenlong
	 * @throws ParseException 
	 * @date 2016-04-29
	 */
	public String addTaskOutput(Map<String,Object> qryParam ) {
		Integer counts = Integer.parseInt(qryParam.get("count").toString());	
		Integer t_id = Integer.parseInt(qryParam.get("t_id").toString());//获得任务单ID
		String scrq =qryParam.get("scrq").toString();//获得生产日期
		double deProductAll = 0;
		int sec_idM = 0;
		double yield_qty = 0;
		Map<String,Object> param=new HashMap<String,Object>();
		String flag = "success";
		for(int i=0;i<counts;i++ ){
			if(i==0){
				param.put("t_id", t_id);
				param.put("scrq", scrq);
				//1.判断是否已经上锁
				List<TaskOutputVo> templist = getTaskOutputList(param);
				for(TaskOutputVo vo:templist){
					if(vo.getLocked()==1){//产量已被锁定无法修改
						flag = "产量已经被锁定！无法修改";
						break;
					}					
					if(vo.getMjbz()==1){//统计产量
						deProductAll = WebUtil.add(deProductAll, vo.getYield_qty());
						qryParam.put("deProductAll", deProductAll);
						sec_idM = vo.getSec_id();//标记字段的ID暂时任务单就一个标记字段
					}
				}				
			}
			//2.为上锁就直接更新或添加
			if(flag.equals("success")){							
				String sec_id = "arr["+i+"][sec_id]";
				param.put("sec_id",qryParam.get(sec_id).toString());
				int count = taskOutputMapper.selectCountForOneday(param);
				String str = "arr["+i+"][worker_no]";	
				param.put("worker_no",qryParam.get(str).toString());
				String str1 = "arr["+i+"][yield_qty]";
				param.put("yield_qty",qryParam.get(str1).toString());
				if(count>0){
					if(sec_idM == Integer.parseInt(qryParam.get(sec_id).toString())){//标记字段的更新
						yield_qty = Double.parseDouble(qryParam.get(str1).toString());
						Task task = taskService.getRegQtyCount(qryParam);
						double nowProduct =WebUtil.add(WebUtil.sub(task.getProduced_qty(), deProductAll), yield_qty) ;
						if(nowProduct>=(WebUtil.add(task.getSendout_qty(), task.getReturn_send_qtyVo()))){//判断该货物是否已经被发出去
							 taskOutputMapper.updateTaskOutput(param);
						}else{
							 flag = "产量已经被锁定！无法修改";
							 break;
						}
					}else{//非标记字段的更新
						taskOutputMapper.updateTaskOutput(param);
					}
				}else {
					taskOutputMapper.addTaskOutput(param);//添加
				}								
			}			
		}				
		updateCount2Task(param);//检查是否完成任务单
		return flag;
	}
	/**
	 * 删除该条件下的所有产量信息
	 * @param params sec_id,t_id,scrq
	 * @author chenlong
	 * @date 2016-04-29
	 */
	public String deleteTaskOutput(Map<String,Object> params){
		String message = "success";
		double deProductAll = 0;
		if(!WebUtil.isEmpty(params.get("deProductAll"))){
		   deProductAll = Double.parseDouble(params.get("deProductAll").toString());
		}	
		Task task = taskService.getRegQtyCount(params);
		double nowProduct = WebUtil.sub(task.getProduced_qty(), deProductAll);
		if(nowProduct>=(WebUtil.add(task.getSendout_qty(), task.getReturn_send_qtyVo()))){//判断该货物是否已经被发出去
			taskOutputMapper.deleteTaskOutput(params);
			updateCount2Task(params);
		}else{
			message = "产量已经锁定，不可编辑";
		}
		return message;
	}
	/**
	 * 查询出该日期有值是否，没有怎判断前面（后面）日期有值不，最后返回该值（TODO不建议用递归）
	* @Description:
	* TaskOutputService
	* getTaskOutputListForMouth
	* @param params
	* @return List<TaskOutput>
	* @author chenlong
	* 2017-1-5 下午3:11:34
	 */
	public List<TaskOutput> getTaskOutputListForMouth(Map<String,Object> params){		
		List<TaskOutput> list = taskOutputMapper.getTaskOutputListForMouth(params);	//查询当前日期下的记录
		int buType = Integer.parseInt(params.get("buType").toString());
		params.put("buType", buType);
		if(list.size()==0&&buType!=3){
			if(buType==1){
				params.put("order","ASC");
			}else{
				params.put("order","DESC");
			}
			List<TaskOutput> listvo = taskOutputMapper.getTaskOutputListForMouthVo(params);//查询前面（后面）日期有值日期下的一条记录
			if(listvo.size()>0){
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
				String dateStr = sdf.format(listvo.get(0).getScrq());
				params.put("scrq",dateStr);	 				
				list = taskOutputMapper.getTaskOutputListForMouth(params);//取出有值日期下的记录
			}
		}
		return list;
	}
	/**
	* @Description: 更新任务单的完工数量
	* @param t_id
	* @author xufeng
	* @date 2016-5-4 
	*/
	private void updateCount2Task(Map<String,Object> params){
		//获取  用于计数的工段，这里取末级标记了一条；
		Map<String,Object> tempparams=new HashMap<String,Object>();
		tempparams.put("t_id", params.get("t_id"));
		tempparams.put("mjbz", 1);
		TaskProcessSection section=taskProcessSectionService.getOneSection(tempparams);
		//计算，该任务单，该工段，所有完工总数
		if(section==null){
		}else{
			tempparams.put("sec_id", section.getSec_id());
			Integer allCount=taskOutputMapper.getCountForTask(tempparams);	
			//回写 完工总数到任务单
			tempparams.put("produced_qty", allCount);
			taskService.updateproduced_qty(tempparams);
		}
		
	}
	/**
	* @Description: 获取第一天的产量记录
	* @param t_id
	* @return TaskOutput
	* @author xufeng
	* @date 2016-5-6 
	*/
	public Date getFirstDay(Map<String,Object> params){
		TaskOutput output=taskOutputMapper.getFirstDay(params);
		if(output!=null){
			return output.getScrq();
		}else{
			return null;
		}
		
	}
}
