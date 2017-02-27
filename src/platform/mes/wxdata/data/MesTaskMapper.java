package platform.mes.wxdata.data;

import java.util.List;
import java.util.Map;

import platform.mes.wxdata.model.PfProcessSection;
import platform.mes.wxdata.model.PfTask;
import platform.mes.wxdata.model.PfTaskBom;
import platform.mes.wxdata.model.PfTaskOutput;
import platform.mes.wxdata.model.PfTaskProcess;



public interface MesTaskMapper {
	/**按照任务单号和公司编号，获取未终止的任务单
	 * 参数：send_company rwdh
	 * */
	public List<PfTask> getMesTaskListByT_id(Map<String,Object> params);
	/**
	* @Description: 新增任务单
	* @param 任务单对象
	* 隐藏返回信息：主键反写到对象中
	* @author xufeng
	* @date 2016-4-15 
	*/
	public void addPfTask(PfTask obj);
	/**
	* @Description: 按照任务单号和公司编号，获取未终止的任务单数量
	* @param send_company rwdh
	* @return 未终止的任务单数量
	* @author xufeng
	* @date 2016-4-15 
	*/
	public int getCountOfPfTask(Map<String,Object> params);
	/**按照任务单主键 获取工段产量
	 * 参数：t_id
	 * */
	public List<PfTaskOutput> getPfTaskOutputByT_id(Integer t_id);

	/**新增工序*/
	public void addPfTaskProcess(PfTaskProcess obj);
	
	/**新增工段*/
	public void addPfProcessSection(PfProcessSection obj);
	/**新增材料bom*/
	public void addPfTaskBom(PfTaskBom obj);
}
