package test.base;

import org.apache.log4j.Logger;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;



@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"../../config/erp-cxf.xml","../../config/cxf.xml","../../config/beans.xml","../../config/spring-ehcache.xml","../../config/spring-mongodb.xml"})
public abstract class BaseTest{
	protected Logger logger = Logger.getLogger(BaseTest.class);
	//protected org.junit.Assert Assert;	


}
