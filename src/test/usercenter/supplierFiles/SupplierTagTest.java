package test.usercenter.supplierFiles;

import java.io.Serializable;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import test.base.BaseTest;
import usercenter.supplierFiles.model.SupplierTag;
import usercenter.supplierFiles.service.SupplierTagService;

/**
 * @author mishengliang
 * 2016-08-09
 */
public class SupplierTagTest extends BaseTest implements Serializable {


	private static final long serialVersionUID = -446365100614642224L;
	@Autowired
	private SupplierTagService serivce;
	
	@Test
	public void addSupplierTagTest(){
		SupplierTag tag = new SupplierTag();
		tag.setAccount_id(10000);
		tag.setTag_name("心月夜");
		tag.setTag_type(0);//两者的数值一致：tagType: 0共有 1私有
		
		serivce.addSupplierTag(tag);
		logger.debug("tagID :" + tag.getTag_id());
	}
}
