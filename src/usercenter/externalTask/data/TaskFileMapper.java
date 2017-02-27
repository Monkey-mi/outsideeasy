package usercenter.externalTask.data;

import java.util.List;
import java.util.Map;

import usercenter.externalTask.model.TaskFile;


public interface TaskFileMapper {
	public List<TaskFile> getTaskFileList(Map<String,Object> params);
	public void addTaskFile(TaskFile obj);
	public void updateTaskFile(Map<String,Object> params);
	public void deleteTaskFile(Integer id);
	public List<TaskFile> getTaskFileImgList(Map<String,Object> params);
	public List<TaskFile> getTaskFileImgList2(Map<String,Object> params);
	public List<TaskFile> getTaskFileAllList(Map<String,Object> params);
	public void updateImgTaskFile (Map<String,Object> params);
	public TaskFile getTaskFile(Integer id);
	public Integer getTaskFileBytime(TaskFile obj);
	public void updateTaskFileForRemark(Map<String,Object> params);
	public void addTaskViewFile(TaskFile arr);
	public void updateCommitImg(Map<String,Object> params);
	public Integer getCommitFilelist(Integer record_id);
	public int getTaskFileCount(Map<String,Object> params);
	/**
	 * 查询某个任务单的一种类型文件（1个）
	* @Description:
	* TaskFileMapper
	* getTaskProhibitFile
	* @param params
	* @return TaskFile
	* @author chenlong
	* 2016-11-22 下午2:18:49
	 */
	public TaskFile getTaskProhibitFile(Map<String,Object> params);
	/**
	 * @Description: 更新图片与物流中的之间的关联 record_id
	 * @param map
	 * @return 
	 * @author chenlong
	 * @date 2016-6-23
	 */
	public void updateLogisticsImg(Map<String,Object> params);
	/**
	 * @Description: 删除没有和物流进行关联的图片，清理数据库
	 * @param Map<String,Object> params
	 * @return 
	 * @author chenlong
	 * @date 2016-6-23
	 */
	public void deleteLogisticsImg(Integer tf_id);
	/**
	 * @Description: 查询出没有和物流进行关联的图片，清理数据库
	 * @param Map<String,Object> params
	 * @return 
	 * @author chenlong
	 * @date 2016-6-23
	 */
	public List<TaskFile> getLogisticsImg(Map<String,Object> params);
	/**
	 * @Description: 查出生产主图和产品图
	 * @param 
	 * @return 
	 * @author chenlong
	 * @date 2016-5-30
	 */
	public List<TaskFile>  getTaskFileImgListproduct(Map<String,Object> params);
	
	/**
	* @Description: 删除文件记录
	* @param object_id mongodb的UUID文件名
	* @author xufeng
	* @date 2016-5-4 
	*/
	public void deleteTaskFileByobject_id(Map<String,Object> params);
	/**
	* @Description: 获取文件记录
	* @param object_id mongodb的UUID文件名
	* @author xufeng
	* @date 2016-5-4 
	*/
	public List<TaskFile> getTaskFileByobject_id(Map<String,Object> params);
	/**
	 * @Description: 查询出与该物流相关联的图片
	 * @param Integer
	 * @return List<TaskFile>
	 * @author chenlong
	 * @date 2016-6-23
	 */
	public List<TaskFile> getLogicticsFilelist(Integer id);
	
	/**
	* @Description:设置taskfile为删除状态
	* @param tf_id
	* @author xufeng
	* @date 2016-9-21 
	*/
	public void updatetaskfile2del(Map<String,Object> params);
	public TaskFile getTaskFileByCondition(Map<String, Object> params);
	/**
	 * 更新运单表中的关联图片
	* @Description:
	* TaskFileMapper
	* updateForShipping
	* @param params void
	* @author chenlong
	* 2016-12-15 下午3:15:36
	 */
	public void updateForShipping(Map<String,Object> params);
	/**
	 * 查询运单文件
	* @Description:
	* TaskFileMapper
	* getTaskShippingFile
	* @param params
	* @return List<TaskFile>
	* @author chenlong
	* 2016-12-21 上午11:20:14
	 */
	public List<TaskFile> getTaskShippingFile(Map<String,Object> params);
}
