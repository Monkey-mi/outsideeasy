package usercenter.saleManage.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.saleManage.data.AccessAccountMapper;
import usercenter.saleManage.model.AccessAccount;
@Service
public class AccessAccountService {
	@Autowired
	private AccessAccountMapper mapper;
	
	
	public List<AccessAccount> getAccessAccountList(Map<String, Object>params) {
		return mapper.getAccessAccountList(params);
	}
	
	public void addAccessAccount(Map<String, Object>params){
		 mapper.addAccessAccount(params);
	}
	public void deleteAccessAccount(Map<String, Object>params){
		 mapper.deleteAccessAccount(params);
	}
	public void deleteAccessAccountByRI(Map<String, Object>params){
		mapper.deleteAccessAccountByRI(params);
	}
	public void updateAccessAccount(Map<String, Object>params){
		 mapper.updateAccessAccount(params);
	}
	public void deleteAccessAccounts(Map<String, Object>params){
		String arrayStr=params.get("account_ids").toString();
		String[] arrayaccount_id=arrayStr.split(",");
		for(int i=0;i<arrayaccount_id.length;i++){
			params.put("account_id", arrayaccount_id[i]);
			mapper.deleteAccessAccount(params);
		}
	}
	@SuppressWarnings("unchecked")
	public void addAccountInfos(HttpServletRequest request) {
		Map<String, Object> params = new HashMap<String, Object>();
		Integer recordId = Integer.parseInt(request.getParameter("recordId"));
		Integer supplierId = Integer.parseInt(request.getParameter("supplierId"));
		String bankInfos= request.getParameter("bankInfos");
		JSONArray infosArray = JSONArray.fromObject(bankInfos);
		params.put("record_id", recordId);
		deleteAccessAccountByRI(params);
		for (int i = 0; i < infosArray.size(); i++) {
			params = infosArray.getJSONObject(i);
			params.put("app_account_id", null);
			params.put("account_sts", 0);
			params.put("record_id", recordId);
			params.put("supplier_id", supplierId);
			addAccessAccount(params);
		}
	}
}
