package test.common.sysmodule;

import java.util.List;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import common.sysmodule.model.WsIdentity;
import common.sysmodule.service.WsIdentityService;

import test.base.BaseTest;

public class TestEhCache extends BaseTest{

	@Autowired
	private WsIdentityService wsService;
	@Test
	public void getws(){
		String username = "admin";
		List<WsIdentity> list = wsService.getEnabledIdentity(username);
		logger.debug("---id:"+list.get(0).getCompany_id()+" name:"+list.get(0).getCompany_name());
	}
	@Test
	public void getws2(){
		String username = "admin";
		List<WsIdentity> list = wsService.getEnabledIdentity(username);
		logger.debug("---id:"+list.get(0).getCompany_id()+" name:"+list.get(0).getCompany_name());
	}
}
