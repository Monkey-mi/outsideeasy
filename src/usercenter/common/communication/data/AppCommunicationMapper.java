package usercenter.common.communication.data;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import usercenter.common.communication.model.AppCommunication;


public interface AppCommunicationMapper {
	/**
	 * 获取子交流信息
	*getAppCommunicationList
	*@param params
	*@return
	*LinkedList<AppCommunication>
	*@author mishengliang
	*2016-5-6上午11:05:27
	 */
	public LinkedList<AppCommunication> getAppCommunicationList(Map<String,Object> params);
	
	/**
	 * 查询所有父交流信息  与子交流信息获取的数据排序不同
	*getAppCommunicationParentList
	*@param params
	*@return
	*List<AppCommunication>
	*@author mishengliang
	*2016-5-3下午3:36:08
	 */
	public List<AppCommunication> getAppCommunicationParentList(Map<String,Object> params);
	
	/**
	 * 增加就留记录
	*addAppCommunication
	*@param obj
	*@author mishengliang
	*2016-5-9下午1:32:29
	 */
	public void addAppCommunication(AppCommunication obj);
	public void updateAppCommunication(AppCommunication obj);
	public void deleteAppCommunication(AppCommunication obj);
	
	/**
	 * 查询出新的信息数量
	* @Description:
	* AppCommunicationMapper
	* getAppCommunicationCount
	* @param params
	* @return Integer
	* @author chenlong
	* 2016-8-31 上午9:16:22
	 */
	public Integer getAppCommunicationCount(Map<String, Object> params);
	
	public List<AppCommunication> getLastThreeOrderAppCommunication(Map<String,Object> params);

	public List<AppCommunication> getLastThreeTaskrAppCommunication(
			Map<String, Object> params);
}
