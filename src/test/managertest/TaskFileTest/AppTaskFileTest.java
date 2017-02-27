package test.managertest.TaskFileTest;




import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import java.util.Map;

import manager.taskManager.model.MngAppTaskProcess;
import manager.taskManager.service.MngAppQcService;
import manager.taskManager.service.MngAppTaskFileService;
import manager.taskManager.service.MngAppTaskProcessService;
import manager.taskManager.taskResponse.MngTaskFile;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import test.base.BaseTest;
import usercenter.externalTask.service.TaskFileService;

public class AppTaskFileTest extends BaseTest{
	
	@Autowired
	private MngAppTaskFileService mngAppTaskFileService;

	@Autowired
	private MngAppTaskProcessService mngAppTaskProcessService;
	@Autowired
	private MngAppQcService mngAppQcService;
	@Autowired
	private TaskFileService taskFileService;
	
	@Test
	public void queryAppTaskFile(){
		Map<String ,Object> params = new  HashMap<String, Object>();
		params.put("t_id",1);
		List<MngTaskFile> list1 = new ArrayList<MngTaskFile>();
		list1 = mngAppTaskFileService.getAppTaskFileListbg(params);
		for(MngTaskFile m :list1){
			System.out.println(m);
		}
	}
	@Test
	public void getAppTaskProcessListbg(){
		Map<String ,Object> params = new  HashMap<String, Object>();
		params.put("t_id",1);
		List<MngAppTaskProcess> list1 = new ArrayList<MngAppTaskProcess>();
		list1 = mngAppTaskProcessService.getAppTaskProcessListbg(params);
		for(MngAppTaskProcess m :list1){
			System.out.println(m);
		}
	}
	@Test
	public void addQcFile(){
		Map<String ,Object> params = new  HashMap<String, Object>();
		params.put("qc_id",3);
		params.put("qc_file",1);
		mngAppQcService.updateQcFile(params);
		
	}
	@Test
	public void getTaskFileForZIP() throws IOException{
		Map<String,Object> params = new HashMap<String, Object>();
		params.put("t_id",41);
		params.put("scdh","16-03-123B");
		taskFileService.getTaskFileForZIP(params);		
	}
	@Test
	public void subString(){
		String str =  "{\"age\":23,\"id\":123,\"name\":\"tt_2009\"," +  
	            "\"province\":\"上海\",\"sex\":\"男\"}";
	}

}
