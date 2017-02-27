package manager.supplier.service;

import java.util.List;
import java.util.Map;

import manager.supplier.data.BankAccountMapper;
import manager.supplier.model.BankAccount;
import manager.supplier.model.Devicelist;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import usercenter.saleManage.data.AccessAccountMapper;
import usercenter.saleManage.model.AccessAccount;
import util.BeanUtil;



@Service
public class BankAccountService {
	@Autowired
	private BankAccountMapper mapper;
	@Autowired
	private AccessAccountMapper accMapper;

	public List<BankAccount> getBankAccountList(Map<String,Object> params) {
		return mapper.getBankAccountList(params);
	}
	public List<AccessAccount> getAccBankAccountList(Map<String,Object> params) {
		return accMapper.getAccessAccountList(params);
	}
	@Transactional
	public void addBankAccount(BankAccount[] arr) {
		for(BankAccount obj: arr) {
			mapper.addBankAccount(obj);
		}
	}
	@Transactional
	public void updateBankAccount(BankAccount[] arr) {
		for(BankAccount obj: arr) {
			mapper.updateBankAccount(obj);
		}
	}
	@Transactional
	public void deleteBankAccount(BankAccount[] arr) {
		for(BankAccount obj: arr) {
			mapper.deleteBankAccount(obj);
		}
	}
	public void addAccBankAccount(Map<String,Object> params)throws Exception {
		if(Boolean.parseBoolean(params.get("isSync").toString())){
			BankAccount item=(BankAccount)BeanUtil.mapToObject(params,BankAccount.class);
			item.setCompany_id(Integer.parseInt(params.get("company_id").toString()));
			mapper.addBankAccount(item);
			params.put("app_account_id", item.getAccount_id());
		}
		accMapper.addAccessAccount(params);
	}
	public void updateAccBankAccount(Map<String,Object> params) throws Exception{
		if(Boolean.parseBoolean(params.get("isSync").toString())){
			BankAccount item=(BankAccount)BeanUtil.mapToObject(params,BankAccount.class);
			item.setAccount_id(Integer.parseInt(params.get("app_account_id").toString()));
			mapper.updateBankAccount(item);
		}
		accMapper.updateAccessAccount(params);
	}
}
