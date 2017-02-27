package usercenter.externalTask.data;

import java.util.List;
import java.util.Map;

import usercenter.externalTask.TaskResponse.DeStatusVo;
import usercenter.externalTask.TaskResponse.DeliverGoodsListVo;
import usercenter.externalTask.TaskResponse.StateCount;
import usercenter.externalTask.model.Task;
import usercenter.externalTask.model.TaskDeliverGoods;


public interface TaskDeliverGoodsMapper {
	public List<TaskDeliverGoods> getTaskDeliverGoodsList(Map<String,Object> params);
	public List<TaskDeliverGoods> getTaskDeliverGoodsListForReceive(Map<String,Object> params);
	public List<TaskDeliverGoods> getTaskDeliverGoodsListvo(Map<String,Object> params);
	public List<TaskDeliverGoods> getTaskDeliverGoodsListvoForReceive(Map<String,Object> params);
	public Integer getTaskDeliverGoodsListForCount(Map<String,Object> params);
	public Integer getTaskDeliverGoodsListForCountForReceive(Map<String,Object> params);
	
	public void addTaskDeliverGoods(Map<String,Object> params);
	public List<Task> getTaskProductList(Map<String,Object> params);
	public void updateTaskDeliverGoods(TaskDeliverGoods obj);
	public void updateTaskDeliverGoodsFordel(Map<String,Object> params);
	public List<TaskDeliverGoods>  getTaskDeliverGoods(Map<String,Object> params);
	public void updateDeliverForGoods(Map<String,Object> params);
	public List<TaskDeliverGoods> getDeliverdetail(Map<String,Object> params);
	public void updateDeliverGoodsForQuantity(Map<String,Object> params);
	public double getDeliverdetailSum(Map<String,Object> params);
	public double getDeliverdetailSumVo(Map<String,Object> params);
	
	public double getDeliverdetailCount(Map<String,Object> params);
	public List<StateCount> getDeliverGoodsCountOfState(Map<String,Object> params);
	public void deletedeliverGoods(Map<String,Object> params);
	public void deleteOutTime(Map<String,Object> params);
	public List<DeliverGoodsListVo> getdeliverGoodsForNumber(Map<String,Object> params);
	public List<DeliverGoodsListVo> getdeliverGoodsForID(Map<String,Object> params);
	public List<StateCount> getdeliverGoodsForIDCount(Map<String,Object> params);
	public void updateCancelDertail(Map<String,Object> params);
	public  DeStatusVo getdelivergoodState(Map<String,Object> params);
	public List<DeStatusVo> getdelivergoodStateList(Map<String,Object> params);
	public Integer getNowShippingDetailCount(Map<String,Object> params);
	
	public TaskDeliverGoods getDeliverForID(Map<String,Object> params);
	public void ReciveDeliverForID(Map<String,Object> params);
	public List<TaskDeliverGoods> getTaskDeliverGoodsforOneTask(Map<String,Object> params);
	public List<TaskDeliverGoods> getTaskDeliverGoodsListDeliver(Map<String,Object> params);
	public List<StateCount> getDeliverGoodsCountOfStateForReceive(Map<String,Object> params);
	public List<TaskDeliverGoods> getTaskDeliverGoodsListDeliverForReceive(Map<String,Object> params);

	public List<TaskDeliverGoods> getTaskDeliverGoodsStatus(Map<String,Object> params);
	public double getDeliveryQtyForType(Map<String,Object> params);
	/**
	 * 根据发货单号查询当前发货单的状态
	* @Description:
	* TaskDeliverGoodsMapper
	* getDeliverGoodsStatesInNumber
	* @param params
	* @return List<TaskDeliverGoods>
	* @author chenlong
	* 2017-1-11 上午10:46:14
	 */
	public List<TaskDeliverGoods> getDeliverGoodsStatesInNumber(Map<String,Object> params);
	/**
	 * 返回未接受返修数量的
	* @Description:
	* TaskDeliverGoodsMapper
	* getDeliverdetailReturnSumVo
	* @param params
	* @return List<TaskDeliverGoods>
	* @author chenlong
	* 2017-1-17 上午9:23:23
	 */
	public double getDeliverdetailReturnSumVo(Map<String,Object> params);
	/**
	 * 发挥当前可发货的数量
	* @Description:
	* TaskOutputMapper
	* getDeliverdetailSumDemo
	* @param params
	* @return double
	* @author chenlong
	* 2017-2-7 下午3:10:03
	 */
	public void  getDeliverdetailSumDemo(Map<String,Object> params);
	public void  addPfPurchaseOrderOperating(Map<String,Object> params);
}
