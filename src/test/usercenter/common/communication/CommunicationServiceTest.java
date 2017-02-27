/**    
 * 文件名：CommunicationServiceTest.java    
 *    
 * 版本信息：    
 * 日期：2016-5-3    
 * Copyright 足下 Corporation 2016     
 * 版权所有    
 *    
 */
package test.usercenter.common.communication;

import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import test.base.BaseTest;
import usercenter.common.communication.data.AppCommunicationMapper;
import usercenter.common.communication.model.AppCommunication;
import usercenter.common.communication.service.AppCommunicationService;

/**    
 *     
 * 项目名称：outsideeasy    
 * 类名称：CommunicationServiceTest    
 * 创建人：mishengliang    
 * 创建时间：2016-5-3 上午11:05:24    
 * 修改人：mishengliang    
 * 修改时间：2016-5-3 上午11:05:24    
 * @version     
 *     
 */
public class CommunicationServiceTest extends BaseTest{
	
	@Autowired
	private AppCommunicationService service;
	
	@Autowired
	private AppCommunicationMapper mapper;
	
	/**
	 * 增加交流信息测试
	*addCommunicationTest
	*void
	*@author mishengliang
	*2016-5-3上午11:17:00
	 */
	@Test
	public void addCommunicationTest(){
		Integer			task_id = 1000;//任务单ID
		Integer			parent_id = 24;//父信息ID
		Date			create_time = new Date();//创建时间
		Integer			company_id = 10000;//公司ID
		String			com_message = "印度北部比哈尔邦今年入夏以来高温炎热，火灾不断。";//交流信息
		
		AppCommunication communication = new AppCommunication();
		
		communication.setCom_message(com_message);
		communication.setCompany_id(company_id);
		communication.setCreate_time(create_time);
		communication.setParent_id(parent_id);
		communication.setTask_id(task_id);
		
		service.addAppCommunication(communication);
		//mapper.addAppCommunication(communication);
	}
	
	/**
	 * 查找交流信息
	*getCommunicationTest
	*void
	*@author mishengliang
	*2016-5-3下午2:49:52
	 */
	@Test
	public void getCommunicationTest(){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("task_id", 1000);
		//params.put("parent_id", 24);
		//List<AppCommunication> listParents = mapper.getAppCommunicationParentList(params);
		//List<AppCommunication> list = (LinkedList<AppCommunication>)mapper.getAppCommunicationList(params);
		List<List<AppCommunication>> listMode = service.getAppCommunicationList(params);
		logger.debug(listMode);
	}
	
	public static void main(String[] args) {
		System.out.println("args:"+ args.length);
	}
}
