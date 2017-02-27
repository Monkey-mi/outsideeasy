/**
 *outsideeasytest.platform.userRegAccountServiceTest.java
 *	2016-3-11下午6:49:48
 * mishengliang
 */
package test.platform.user;

import java.util.Date;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import test.base.BaseTest;

import common.user.data.RegAccoutMapper;
import common.user.model.RegAccout;
import common.user.service.RegAccoutService;

/**
 * @author mishengliang
 *
 */
public class RegAccountServiceTest extends BaseTest {
	@Autowired
	private RegAccoutService service;
	@Autowired
	private RegAccoutMapper mapper;
	
	@Test
	public void isUserTest(){
		String loginid_or_email = "ylp.1115@qq.com";
		RegAccout regAccount = service.getUserbyAccnameOrEmail(loginid_or_email);
		if(regAccount != null){
			logger.debug("------------------------"+regAccount.toString());
		}
	}
	
	@Test
	public void updateRegAccoutEmailTest(){
		RegAccout regAccount = new RegAccout();
		regAccount.setAcc_name("naa123456");
		regAccount.setReg_email("nana@mike.com");
		regAccount.setUpdate_date(new Date());
		
		service.updateRegAccoutEmail(regAccount);
	}
	
	@Test
	public void addRegAccoutTest(){
		RegAccout regAccount = new RegAccout();
		regAccount.setReg_email("shailene@live.com");
		regAccount.setUpdate_date(new Date());
		service.addRegAccout(regAccount,"jfdsiojsldjfdski","当前供应商");
	}
}
