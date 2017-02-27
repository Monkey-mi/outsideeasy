/**
 *outsideeasytest.platform.emailAppSendEmailinfoServiceTest.java
 *	2016-3-11下午6:51:30
 * mishengliang
 */
package test.platform.email;

import java.util.HashMap;
import java.util.Map;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import test.base.BaseTest;

import common.email.model.AppSendEmailinfo;
import common.email.service.AppSendEmailinfoService;

/**
 * @author mishengliang
 *
 */
public class AppSendEmailinfoServiceTest extends BaseTest {
	@Autowired
	private AppSendEmailinfoService emailService;
	
	@Test
	public void getEmailInfoTest(){
		Map<String, Object> params = new HashMap<String, Object>();
		AppSendEmailinfo emailInfo = new AppSendEmailinfo();
		
		params.put("UUID", "f33fd2c7baba405a8e2529cb3bb06f2b");
		try {
			emailInfo = emailService.getAppSendEmailinfoList(params);
			logger.debug("----------------------"+emailInfo.toString());
		} catch (Exception e) {
			logger.debug("IS OK" + e);
		}
	}
}
