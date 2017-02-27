package usercenter.common.communication.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import common.user.model.LoginAccount;

import usercenter.common.communication.data.AccountCommunDelMapper;
import usercenter.common.communication.data.AppCommunicationMapper;
import usercenter.common.communication.model.AppCommunication;
import usercenter.externalTask.service.TaskFileService;
import util.SessionUtil;


@Service
public class AppCommunicationService {
	@Autowired
	private AppCommunicationMapper mapper;
	@Autowired
	private AccountCommunDelMapper acdMapper;
	@Autowired
	private TaskFileService taskFileService;
	/**
	 * 查询交流信息
	*getAppCommunicationList
	*@param params
	*@return
	*List<AppCommunication>
	*@author mishengliang
	*2016-5-3上午11:00:06
	 */
	public List<List<AppCommunication>> getAppCommunicationList(Map<String,Object> params) {
		params.put("parent_id", 0);
		//获取所有对话信息的父信息
		List<AppCommunication> listForParents = mapper.getAppCommunicationParentList(params);
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		params.put("account_id", loginAccount.getLogin_id());
		params.put("account_type",loginAccount.getAccount_type() );
		params.put("commu_type", 2);
		int count1 = 0;
		int count2 = 0;
		if (listForParents.size() > 0) {
			Map<String,Object> paramsForModel = new HashMap<String, Object>();
			List<List<AppCommunication>> communications = new ArrayList<List<AppCommunication>>();
			for(int i = 0; i < listForParents.size(); i++){//将每个模块分别填进总模块中
				paramsForModel.put("parentId", listForParents.get(i).getId());
				paramsForModel.put("fileTypeId", params.get("fileTypeId"));
				paramsForModel.put("moduleType", params.get("moduleType"));
				params.put("commu_id",  listForParents.get(i).getId());				
				if(Integer.parseInt(params.get("moduleType").toString())==0){
					count1 = taskFileService.getCommitFilelist(listForParents.get(i).getId());
					listForParents.get(i).setFileCount(count1);
				}else{
					addAccountCommunDelForAccount(params);
				}								
				LinkedList<AppCommunication> listForChilden = (LinkedList<AppCommunication>) mapper.getAppCommunicationList(paramsForModel);
				for(AppCommunication appCommunication:listForChilden){
					params.put("commu_id",  appCommunication.getId());					
					if(Integer.parseInt(params.get("moduleType").toString())==0){
						count2 = taskFileService.getCommitFilelist(appCommunication.getId());
						appCommunication.setFileCount(count2);
					}else{
						addAccountCommunDelForAccount(params);
					}										
				}
				listForChilden.addFirst(listForParents.get(i));
				communications.add(listForChilden);
			}
			return communications;
		}
		return null;
	}
	
	/**
	 * 增加一条交流信息
	*addAppCommunication
	*@param obj
	*void
	*@author mishengliang
	*2016-5-3上午10:47:10
	 */
	public void addAppCommunication(AppCommunication obj) {
			mapper.addAppCommunication(obj);
	}
	
	public void updateAppCommunication(AppCommunication[] arr) {
		for(AppCommunication obj: arr) {
			mapper.updateAppCommunication(obj);
		}
	}
	public void deleteAppCommunication(AppCommunication[] arr) {
		for(AppCommunication obj: arr) {
			mapper.deleteAppCommunication(obj);
		}
	}
	
	/**
	 * 订单查询出交流的条数
	* @Description:
	* AppCommunicationService
	* getAppCommunicationCount
	* @param params
	* @return Integer
	* @author chenlong
	* 2016-8-31 上午9:20:47
	 */
	public Integer getAppCommunicationCount(Map<String, Object> params){
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		params.put("account_id", loginAccount.getLogin_id());
		params.put("account_type",loginAccount.getAccount_type() );
		params.put("commu_type", 2);
		params.put("module_type", 1);
		return mapper.getAppCommunicationCount(params);
	}
	/**
	 * @Description:获取最新三条订单留言回复
	 * AppCommunicationService
	 * getLastThreeAppCommunication
	 * @param params
	 * @return List<AppCommunication>
	 * @author yukai
	 * 2016-9-7 下午4:35:06
	 */
	public List<AppCommunication> getLastThreeOrderAppCommunication(Map<String,Object> params) {
		return mapper.getLastThreeOrderAppCommunication(params);
	}
	/**
	 * @Description:添加账号和留言删除关系
	 * AppCommunicationService
	 * addAccountCommunDel
	 * @param params void
	 * @author yukai
	 * 2016-9-8 上午9:45:58
	 */
	public void addAccountCommunDel(Map<String,Object> params) {
		acdMapper.addAccountCommunDel(params);
	}
	/**
	 * @Description:添加账号和留言查看关系
	 * AppCommunicationService
	 * addAccountCommunDel
	 * @param params void
	 * @author yukai
	 * 2016-9-28 上午9:45:58
	 */
	public void addAccountCommunDelForAccount(Map<String,Object> params) {
		int count = acdMapper.queryAccountCommunDelCount(params);
		if(count==0){
			acdMapper.addAccountCommunDel(params);
		}		
	}
	/**
	 * 增加一条账号与留言的查看关系
	* @Description:
	* AppCommunicationService
	* addAccountCommunLook
	* @param params void
	* @author chenlong
	* 2016-9-20 下午3:10:15
	 */
	public void addAccountCommunLook(Map<String,Object> params) {
		acdMapper.addAccountCommunDel(params);
	}

	public List<AppCommunication> getLastThreeTaskrAppCommunication(
			Map<String, Object> params) {
		return mapper.getLastThreeTaskrAppCommunication(params);
	}
}
