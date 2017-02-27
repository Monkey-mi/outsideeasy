package manager.regAccount.service;

import java.util.List;
import java.util.Map;

import manager.regAccount.data.MmgSubAccountMapper;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import usercenter.subAccount.model.SubAccount;



@Service
public class MmgSubAccountService {
	@Autowired
	private MmgSubAccountMapper mapper;
	/**
	 * 后台的子账号查询
	 * @time 2016-03-22
	 * @author chenlong
	 * @param params
	 * @return
	 */
	public List<SubAccount> getSubAccountListbg(Map<String,Object> params) {

		return mapper.getSubAccountList(params);
		
	}
	/**
	 * 后台子账号添加
	 * @time 2016-03-22
	 * @author chenlong
	 * @param obj
	 */
	@Transactional
	public void addSubAccountbg(SubAccount[] obj) {
		for(SubAccount param : obj){		
		mapper.addSubAccount(param);
		}
	}
	/**
	 * 后台子账号更新
	 * @time 2016-03-22
	 * @author chenlong
	 * @param obj
	 */
	@Transactional
	public void updateSubAccountbg(SubAccount[] obj) {
		for(SubAccount param : obj){		
			mapper.updateSubAccount(param);
			}
	}
	/**
	 * 后台子账号删除
	 * @time 2016-03-22
	 * @author chenlong
	 * @param params
	 */
	@Transactional
	public void deleteSubAccountbg(SubAccount[] params) {
		for(SubAccount param : params){		
			mapper.deleteSubAccountbg(param);
			}
	}
	
	/**
	* @Description: 判断记录是否可以被删除
	* @param sa_id  id
	* Request subAccount/subAccountbg.do?method=candeleted
	* Response status=true 可以； status=false 不可以
	* @author chenlong
	* @date 2016-03-23
	*/
	public String candeleted(Map<String,Object> params){
		JSONObject json = new JSONObject();
		json.put("success", true);
		int count=mapper.getXiajiCount(params);
		json.put("status", count==0);
		return json.toString();
	}
	/**
	 * 判断子账号是否可以添加
	 * @param params
	 *  Request subAccount/subAccountbg.do?method=checkForAdd
	 * Response status=true 可以； status=false 不可以
	 * @return json
	 * @author chenlong
	 * @date 2016-03-24
	 */
	public String checkForAdd(Map<String,Object> params){
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("success",true);
		int count = mapper.getCountForAdd(params);
		jsonObject.put("status", count==0);
		return jsonObject.toString();
	}
	/**
	 * 判断子账户是否可以更新
	 * @param params
	 * @return json
	 * @author chenlong
	 * @date 2016-03-24
	 */
	public String checkForUpdate(Map<String,Object> params){
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("success",true);
		int count = mapper.getCountForUpdate(params);
		jsonObject.put("status", count==0);
		return jsonObject.toString();
	}
	
	
}
