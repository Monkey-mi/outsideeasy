package test.managertest.regAccountTest;



import java.util.HashMap;
import java.util.List;
import java.util.Map;


import manager.ipmanager.ipResponse.AllAccount;
import manager.ipmanager.service.IpAddressService;
import manager.regAccount.model.RegAccountResponse;
import manager.regAccount.service.MmgRegAccountService;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;


import test.base.BaseTest;

public class RegAccountTest extends BaseTest{
	@Autowired
	private MmgRegAccountService accountService;
	@Autowired
	private IpAddressService ipAddressService;

	
    @Test
    public void MmgRegAccountListTest(){
    	Map<String, Object> params = new HashMap<String,Object>();
    	for(RegAccountResponse li : (accountService.getRegAccoutListbg(params))){
    		System.out.println(li);
    	}
    	//accountService.getRegAccoutListbg(params);
    }
    @Test
    public void getAllAccount(){
    	Map<String, Object> params = new HashMap<String,Object>();
    	params.put("search", "ad");
    	List<AllAccount> list = ipAddressService.getAllAccount(params);
    	for(AllAccount li : list){
    		logger.debug(li.getAllname()+" ");
    	}
    }
}
