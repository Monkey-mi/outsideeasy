package usercenter.externalTask.service;

import java.util.List;
import java.util.Map;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.externalTask.data.TaskBOMMapper;
import usercenter.externalTask.model.TaskBom;

@Service
public class TaskBOMService {
	@Autowired
	private TaskBOMMapper mapper;

    /**
     * 查询出材料清单
     * @param params
     * @return
     * @author chenlong
     * @date 2016-04-13
     */
	public List<TaskBom> getTaskBomList(Integer taskId) {
		return mapper.getTaskBomList(taskId);
	}
	/**
	 * 增加材料清单
	 * @param params
	 * @author chenlong
     * @date 2016-04-13
	 */
	public void addTaskBom(Map<String,Object> params) {
	
			mapper.addTaskBom(params);
		
	}
	/**
	 * 查询出一条材料数据
	 * @param tb_id
	 * @return
	 * @author chenlong
     * @date 2016-04-13
	 */
	public TaskBom getTaskBom(Integer tb_id) {
		
		return mapper.getTaskBom(tb_id);

}
	/**
	 * 修改一条材料清单
	 * @param params
	 * @author chenlong
     * @date 2016-04-13
	 */
	public void updateTaskBom(Map<String,Object> params) {
	
			mapper.updateTaskBom(params);
	
	}
	
	/**
	 * 删除一条材料清单
	 * @param params
	 * @author chenlong
     * @date 2016-04-13
	 */
	public void deleteTaskBom(Integer tb_id) {
		
			mapper.deleteTaskBom(tb_id);
		
	}
	
	
}
