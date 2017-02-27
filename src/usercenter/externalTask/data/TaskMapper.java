package usercenter.externalTask.data;

import java.util.List;
import java.util.Map;

import usercenter.externalTask.TaskResponse.StateCount;
import usercenter.externalTask.TaskResponse.RexAccountVo;
import usercenter.externalTask.model.Task;
import usercenter.externalTask.model.TaskEndRecord;


public interface TaskMapper {
	/**
	* @Description:返回发出的任务单列表
	* @param state 状态；send_company 发送公司
	* state=0 全状态查询
	* state!=0 按状态查询
	* @return List<Task>
	* @author xufeng
	* @date 2016-4-18 
	*/
	public List<Task> getTaskList(Map<String,Object> params);
	/**
	 * 子账号登录时对所有的任务单先进行一次查询，由于po跑出来的结果接受公司的取值
	* @Description:
	* TaskMapper
	* queryTaskProduct
	* @param params
	* @return List<Task>
	* @author chenlong
	* 2016-10-6 下午3:23:16
	 */
	public List<Task> queryTaskProduct(Map<String,Object> params);
	/**
	 * 子账号查询出有权限的的任务单
	* @Description:
	* TaskMapper
	* queryTaskList
	* @param params
	* @return List<Task>
	* @author chenlong
	* 2016-10-6 下午3:28:39
	 */
	public List<Task> queryTaskList(Map<String,Object> params);
	/**
	* @Description: 任务单列表数量
	* @param 同getTaskList
	* @return 数量
	* @author xufeng
	* @date 2016-5-5 
	*/
	public Integer getTaskList_count(Map<String,Object> params);
	/**
	 * 子账号查询出任务单的数量
	* @Description:
	* TaskMapper
	* queryTaskList_count
	* @param params
	* @return Integer
	* @author chenlong
	* 2016-10-6 下午3:47:22
	 */
	public Integer queryTaskList_count(Map<String,Object> params);
	/**
	* @Description:返回收到的任务单列表
	* @param state 状态；receive_company 接收公司
	* state=0 全状态查询
	* state!=0 按状态查询
	* @return List<Task>
	* @author xufeng
	* @date 2016-4-25
	*/
	public List<Task> getTaskListForProducer(Map<String,Object> params);
	/**
	* @Description: 任务单列表数量
	* @param 同getTaskListForProducer
	* @return 数量
	* @author xufeng
	* @date 2016-5-5 
	*/
	public Integer getTaskListForProducer_count(Map<String,Object> params);
	/**
	* @Description: TODO ？？？
	* @param params
	* @return
	*/
	public Integer getTaskSendCompany(Map<String,Object> params);
	/**
	 * 子账号对应的任务单当前所有状态的数量
	* @Description:
	* TaskMapper
	* queryTaskCountOfAllState
	* @param params
	* @return List<StateCount>
	* @author chenlong
	* 2016-10-6 下午5:00:20
	 */
	public List<StateCount> queryTaskCountOfAllState(Map<String,Object> params);
	/**
	* @Description: 获取指定公司的当前所有状态的数量
	* @param send_company 发送公司
	* @return 状态-数量 对应列表
	* @author xufeng
	* @date 2016-4-18 
	*/
	public List<StateCount> getTaskCountOfAllState(Map<String,Object> params);
	/**
	* @Description: 获取指定公司的当前所有状态的数量
	* @param   receive_company 接受公司
	* @return 状态-数量 对应列表
	* @author xufeng
	* @date 2016-4-25 
	*/
	public List<StateCount> getProducerTaskCountOfAllState(Map<String,Object> params);
	
	/**
	* @Description: 更新任务单状态为取消
	* @param t_id state reason
	* @author xufeng
	* @date 2016-4-21 
	*/
	public void updateTaskState2Stop(Map<String,Object> params);
	/**
	* @Description: 更新任务单状态为发送
	* @param t_id state send_time
	* @author xufeng
	* @date 2016-4-21 
	*/
	public void updateTaskState2Send(Map<String,Object> params);
	/**
	* @Description: 更新任务单状态为等待发送
	* @param t_id state send_time
	* @author xufeng
	* @date 2016-4-21 
	*/
	public void updateTaskState2toBeSend(Map<String,Object> params);
	/**
	* @Description: 更新计划开工、完工日期
	* @param t_id plan_start plan_complete
	* @author xufeng
	* @date 2016-4-28 
	*/
	public void updateTaskPlanDate(Map<String,Object> params);
	/**
	* @Description: 更新任务单说明
	* @param t_id remark
	* @author xufeng
	* @date 2016-4-28 
	*/
	public void updateTaskRemark(Map<String,Object> params);
	
	/**
	* @Description: 更新外协单位
	* @param t_id receive_company
	* @author xufeng
	* @date 2016-4-28 
	*/
	public void updateTaskreceive_company(Map<String,Object> params);
	/**
	* @Description: 更新质检类型
	* @param t_id qc_type
	* @author xufeng
	* @date 2016-4-28 
	*/
	public void updateTaskqc_type(Map<String,Object> params);
	/**
	* @Description: 更新任务总数
	* @param t_id    total_qty
	* @author xufeng
	* @date 2016-4-28 
	*/
	public void updateTasktotal_qty(Map<String,Object> params);
	/**
	* @Description: 更新任务单状态为生产中
	* @param t_id state receive_time
	* @author xufeng
	* @date 2016-4-21 
	*/
	public void updateTaskState2producting(Map<String,Object> params);
	/**
	* @Description: 更新任务单状态
	* @param t_id state 
	* @author xufeng
	* @date 2016-4-22 
	*/
	public void updateTaskState(Map<String,Object> params);
	
	/**
	* @Description:获取任务单
	* @param 任务单id
	* @return 任务单
	* @author xufeng
	* @date 2016-4-21 
	*/
	public Task getTaskByT_id(Map<String,Object> params);
	/**
	* @Description:获取任务单指定类型的文件数量
	* @param 任务单id 文件类型file_type
	* @return 文件类型数量
	* @author xufeng
	* @date 2016-4-22 
	*/
	public Integer getFileCount(Map<String,Object> params);
	/**
	* @Description: 更新任务单的产品主图
	* @param mongo_file_name t_id
	* @author xufeng
	* @date 2016-5-4 
	*/
	public void updateproduct_pic(Map<String,Object> params);
	/**
	* @Description: 更新完成数量
	* @param produced_qty t_id
	* @author xufeng
	* @date 2016-05-04
	*/
	public void updateproduced_qty(Map<String,Object> params);
	/**
	 * @Description:查询出该任务单的质检类型
	 * @param t_id
	 * @author chenlong
	 * @param params
	 * @return String
	 * @date 2016-5-9
	 */
	public String getTaskQcType(Integer t_id);
	/**
	 * @Description:更新任务单中的生产数量
	 * @param t_id
	 * @author chenlong
	 * @param Task task
	 * @return String
	 * @date 2016-5-10
	 */
	public void  updateTaskProducted(Task task);
	/**
	 * @Description:查询出任务单中的生产数量
	 * @param t_id
	 * @author chenlong
	 * @param Task task
	 * @return String
	 * @date 2016-5-10
	 */
	public Task   getTotalQty(Integer t_id);
	/**
	 * @Description:查询出任务单中的生产数量 和任务数量
	 * @param t_id
	 * @param params
	 * @return String
	 * @date 2016-5-19
	 */
	public Task getTaskToaleProductCount(Map<String,Object> params);
	/**
	 * @Description:更新成完成状态
	 * @author chenlong
	 * @param params
	 * @date 2016-5-19
	 */
	public void updateTaskState2Complete(Map<String,Object> params);
	/**
	 @Description:跟新指导文件上传状态
	 * @author chenlong
	 * @param params map
	 * @date 2016-5-19
	 */
	public void updateOperator_file(Map<String,Object> map);
	/**
	 @Description:跟新id
	 * @author chenlong
	 * @param params map
	 * @date 2016-5-19
	 */
	public void updatetaskId(Map<String,Object> map);
	/**
	 @Description:查询出任务单的入库量
	 * @author chenlong
	 * @param params map
	 * @date 2016-5-19
	 */
	public Task getTaskToaleConfirmed_qtyVo(Map<String,Object> map);//查询出任务单的入库量
	/**
	 @Description:更新已入库的量
	 * @author chenlong
	 * @param params map
	 * @date 2016-5-19
	 */
	public void updateTaskToaleConfirmed_qtyVo(Map<String,Object> map);//更新已入库的量
	/**
	 @Description:查询出合格总量
	 * @author chenlong
	 * @param params Integer
	 * @date 2016-5-19
	 */
	public Task getTaskQuliterCount(Integer id);
	/**
	 @Description:更新任务单为完结状态
	 * @author chenlong
	 * @param params Integer
	 * @date 2016-5-19
	 */
	public void updateTaskStateCompleteEnd(Map<String,Object> map);
	/**
	 @Description:验证发货量是否小于产量
	 * @author chenlong
	 * @param params Integer
	 * @date 2016-5-19
	 */
	public Task getregTaskproduct(Map<String,Object> map);
	/**
	 * 
	 * @Description: //更新最新的的生产总量
	 * @param map
	 * @return 
	 * @author chenlong
	 * @date 2016-6-7
	 */
	public void updateTaskSendout(Map<String,Object> map);
	/**
	* @Description:查询出相应的账号所管理的公司ID
	* TaskMapper
	* getTaskCompanyidVo
	* @param map
	* @return rexAccountVo
	* @author chenlong
	* 2016-8-12 上午11:11:32
	 */
	public List<RexAccountVo> getTaskCompanyidVo(Map<String,Object> map);
	/**
	 * 更新任务单的主图
	* @Description:
	* TaskMapper
	* updateTaskPicture
	* @param map void
	* @author mishengliang
	* 2016-12-13 下午6:05:19
	 */
	public void  updateTaskPicture(Map<String,Object> map);

	/**
	 * 根据id查询出任务单的状态值
	* @Description:
	* TaskMapper
	* getTaskStateByID
	* @param map
	* @return Integer
	* @author chenlong
	* 2016-11-22 下午2:45:44
	 */
	public Integer getTaskStateByID(Map<String,Object> map);
	/**
	 * 增加一条终止记录
	* @Description:
	* TaskMapper
	* addTaskEndRecord
	* @param map void
	* @author chenlong
	* 2016-11-22 下午4:54:03
	 */
	public void addTaskEndRecord(Map<String,Object> map);
	/**
	 * 查询出终止的理由
	* @Description:
	* TaskMapper
	* getTaskEndRecord
	* @param map
	* @return TaskEndRecord
	* @author chenlong
	* 2016-11-24 下午4:17:28
	 */
	public TaskEndRecord getTaskEndRecord(Map<String,Object> map);
	/**
	 * 获得运单的生产和生产完成的所有任务单的列表
	* @Description:
	* TaskMapper
	* getTaskListForShipping
	* @param map
	* @return List<Task>
	* @author chenlong
	* 2016-12-8 下午3:11:50
	 */
	public List<Task> getTaskListForShipping(Map<String,Object> map);
	/**
	 * 获得运单的生产和生产完成的所有任务单的总数
	* @Description:
	* TaskMapper
	* getTaskListForShipping_count
	* @param map
	* @return List<Task>
	* @author chenlong
	* 2016-12-8 下午3:11:54
	 */
	public Integer getTaskListForShipping_counts(Map<String,Object> map);
	/**
	 * 验证任务单组是否是同一个公司
	* @Description:
	* TaskMapper
	* RegCompanyForOne
	* @param map
	* @return Integer
	* @author chenlong
	* 2016-12-13 下午1:56:35
	 */
	public Integer RegCompanyForOne(Map<String,Object> map);
	/**
	 *获得运单的生产和生产完成的所有任务单的总数
	* @Description:
	* TaskMapper
	* getTaskListForShipping_count
	* @param map
	* @return Integer
	* @author chenlong
	* 2016-12-15 上午9:22:19
	 */
	public Integer getTaskListForShipping_count(Map<String,Object> map);
	/**
	 *发货返回到货量和返修到货量
	* @Description:
	* TaskMapper
	* getReturnQtyVo
	* @param map
	* @return Task
	* @author chenlong
	* 2016-12-28 下午2:23:23
	 */
	public Task getReturnQtyVo(Map<String,Object> map);
	/**
	 * 更新到货总量和返修到货量
	* @Description:
	* TaskMapper
	* updateReturnQtyVo
	* @param map void
	* @author chenlong
	* 2016-12-28 下午2:24:16
	 */
	public void updateReturnQtyVo(Map<String,Object> map);
	/**
	 * 获得质检总数，和接收货物总数
	* @Description:
	* TaskMapper
	* getQtyCount
	* @param map
	* @return Task
	* @author chenlong
	* 2017-1-2 下午1:47:47
	 */
	public Task getQtyCount(Map<String,Object> map);
	
	/**
	 * ------
	* @Description:
	* TaskMapper
	* getLastThreeDeliverTask
	* @param params
	* @return List<Task>
	* @author yukai
	* 2016-12-28 下午2:25:05
	 */
	public List<Task> getLastThreeDeliverTask(Map<String, Object> params);
	/**
	 * 查出来当前的任务单的发货数量和生产数量
	* @Description:
	* TaskMapper
	* getRegQtyCount
	* @param params
	* @return Task
	* @author chenlong
	* 2017-1-12 上午10:16:56
	 */
	public Task getRegQtyCount(Map<String, Object> params);
	
	public List<Task> getLastThreeDeliverTaskForOut(Map<String, Object> params);
	public List<Task> getSubLastThreeDeliverTaskForOut(
			Map<String, Object> params);
}
