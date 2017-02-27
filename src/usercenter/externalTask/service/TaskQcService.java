package usercenter.externalTask.service;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import common.mongodb.service.FileOptService;
import common.user.model.LoginAccount;

import usercenter.externalTask.TaskResponse.QcAllVo;
import usercenter.externalTask.TaskResponse.QcCountVo;
import usercenter.externalTask.TaskResponse.QcVo;
import usercenter.externalTask.data.TaskLogisticsItemMapper;
import usercenter.externalTask.data.TaskQcMapper;
import usercenter.externalTask.model.Task;
import usercenter.externalTask.model.TaskQc;
import util.Const;
import util.SessionUtil;
import util.WebUtil;

@Service
public class TaskQcService {
	@Autowired
	private TaskQcMapper taskQcMapper;
	@Autowired
	private FileOptService fileService;
	@Autowired
	private TaskLogisticsItemMapper taskLogisticsItemMapper;
	@Autowired
	private TaskLogisticsItemService taskLogisticsItemService;
	@Autowired
	private TaskService taskService;
	
	/**
	 * 显示质检信息
	 * @param taskId
	 * @return
	 * @author chenlong
	 * @data 2016-04-11
	 */
	public QcAllVo getTaskQcList(Integer t_id){
		 QcAllVo qcAllVo = new QcAllVo();	
		 Task task =  new Task();
		 QcCountVo qcCountVo = new QcCountVo();//质检的统计信息
		 double deliver = 0,arrived = 0,receive = 0;
		 List<QcVo> list = taskQcMapper.getQcList(t_id);//质检信息列表
		 for(QcVo taskQc : list){
			 deliver = WebUtil.add(qcCountVo.getDeliver_qccount(),taskQc.getQc_count());
			 arrived = WebUtil.add(qcCountVo.getArrived_qccount(),taskQc.getUnqualified_no());
			 qcCountVo.setArrived_qccount(arrived);
			 qcCountVo.setDeliver_qccount(deliver);			
			double vo = WebUtil.sub(taskQc.getQc_count(),taskQc.getUnqualified_no());
			taskQc.setQc_true(vo);
		 }
		 qcCountVo.setArrived_qccount(arrived);//不合格总数
		 qcCountVo.setDeliver_qccount(deliver);//交货总数
		 receive = WebUtil.sub(qcCountVo.getDeliver_qccount(),qcCountVo.getArrived_qccount());
		 qcCountVo.setReceive_qccount(receive);//合格总数
		 /*
		  *更新生产任务单的生产信息
		  */
		 task.setConfirmed_qty(qcCountVo.getDeliver_qccount());//交货数量
		 task.setQualified_qty(qcCountVo.getReceive_qccount());//合格数量
		 task.setT_id(t_id);
		 taskService.updateTaskProducted(task);//更新生产信息
		 
		 qcAllVo.setQcCountVo(qcCountVo);
		 qcAllVo.setQcVos(list);
		 return  qcAllVo;
	}
	/**
	 * 统计还有多少未完成的任务量，和不合格的量
	 * @param t_id
	 * @author chenlong
	 * @data 2016-05-10
	 */
	public QcCountVo getTotalQty(Map<String,Object> params){
	Integer t_id = Integer.parseInt(params.get("t_id").toString());
	double total_qty = 	taskService.gettoQty(t_id);
	List<QcVo> list = taskQcMapper.getQcList(t_id);//质检信息列表
	QcCountVo qcCountVo = new QcCountVo();//质检的统计信息
	 double arrived = 0;
	 for(QcVo taskQc : list){		
		 arrived = WebUtil.add(qcCountVo.getArrived_qccount(),taskQc.getUnqualified_no());	
		 qcCountVo.setArrived_qccount(arrived);	
	 }
	 qcCountVo.setArrived_qccount(arrived);//不合格总数
	 double deliver_count = Double.parseDouble(params.get("deliver_count").toString());
	 double vo =  WebUtil.sub(deliver_count,qcCountVo.getArrived_qccount());
	 qcCountVo.setUnfinished_count(WebUtil.sub(total_qty,vo));//未完成的数量
	 return qcCountVo;	 
	} 
    /**
     * 更新生产任务单的生产信息
     * @author chenlong
     * @param params
     * @date 2016-5-30
     */
    public  void updateTaskproduct(Map<String,Object> params){
    	//更新生产任务单的生产信息
   	 Task task =  new Task();
   	 Integer t_id =Integer.parseInt(params.get("t_id").toString());
   	 QcCountVo qcCountVo = new QcCountVo();//质检的统计信息
   	 double deliver = 0.0,arrived = 0.0,receive = 0.0;
   	 List<QcVo> list = taskQcMapper.getQcList(t_id);//质检信息列表
   	 for(QcVo taskQc : list){
   		 deliver = WebUtil.add(qcCountVo.getDeliver_qccount(),taskQc.getQc_count());
   		 arrived = WebUtil.add(qcCountVo.getArrived_qccount(),taskQc.getUnqualified_no());
   		 qcCountVo.setArrived_qccount(arrived);
   		 qcCountVo.setDeliver_qccount(deliver);			
   	 }
   	 qcCountVo.setArrived_qccount(arrived);//不合格总数
   	 qcCountVo.setDeliver_qccount(deliver);//交货总数
   	 receive = WebUtil.sub(qcCountVo.getDeliver_qccount(),qcCountVo.getArrived_qccount());
   	 qcCountVo.setReceive_qccount(receive);//合格总数
   	 /*
   	  *更新生产任务单的生产信息
   	  */
   	 task.setConfirmed_qty(qcCountVo.getDeliver_qccount());//交货数量
   	 task.setQualified_qty(qcCountVo.getReceive_qccount());//合格数量
   	 task.setT_id(t_id);
     taskService.updateTaskProducted(task);//更新生产信息
    }
	/**
	 *查询是否添加过质检文件
	 * @param taskId
	 * @return
	 * @author chenlong
	 * @data 2016-04-11
	 */
	public String getCountforFile(Map<String,Object> params){		
		return taskQcMapper.getCountforFile(params);
	}
	
	/**
	 * 查询出文件名
	 * @param params
	 * @return
	 * @author chenlong
	 * @date 2015-05-05
	 */
	public String selectFileinfo(Map<String,Object> params){
		return taskQcMapper.selectFileinfo(Integer.parseInt(params.get("qc_id").toString()));
	}
	/**
	 * 增加质检文件信息
	 * @param arr
	 * @throws Exception
	 * @author chenlong
	 * @date 2015-05-05 
	 */
	public Map<String,Object>  addTaskQcFile(TaskQc arr,CommonsMultipartFile file) throws Exception {
		
		TaskQc taskQc = taskQcMapper.selectforFile(arr);
		Map<String,Object> map = new HashMap<String, Object>();
		Map<String,Object> params = new HashMap<String, Object>();
		params.put(Const.ISIMG, "1");//是否图片，1是 ，0否
		params.put(Const.USE_TYPE, "6");//使用类别
		params.put(Const.COM_NAME, "tps");//公司名
		params.put(Const.COM_ID, "tps");//公司ID
		LoginAccount loginAccount = (LoginAccount)SessionUtil.getCurrentPlateLoginAccount();//获取登陆的平台账户
		params.put(Const.USERNAME, loginAccount.getLogin_name());//上传者
		String fileName = fileService.SaveFile(file,params);
		if(taskQc != null){//更新新的质检文件
			if(taskQc.getQc_file() != null){
			fileService.deleteFileByName(taskQc.getQc_file());
			}
			arr.setQc_file(fileName);			
			taskQcMapper.updateForFile(arr);
			map.put("qc_id",taskQc.getQc_id());
			
		}else{	//添加质检文件	
		 arr.setQc_file(fileName);//把存储mongoDb的文件序号存到数据库中      
         taskQcMapper.addTaskQcFile(arr);
         map.put("qc_id",arr.getQc_id());
		}
         map.put("file_path", fileName);
        
		return map;
	}
	/**
	 * 编辑质检信息
	 * @param params
	 */
	public void updateinfo(Map<String,Object> params){
		 Integer qc_id  = Integer.parseInt(params.get("qc_id").toString());
		 TaskQc taskQc = taskQcMapper.getQc(qc_id);
		 params.put("item_id",taskQc.getRecord_id());
		 params.put("receive_no",Integer.parseInt(params.get("qc_count").toString())-Integer.parseInt(params.get("unqualified_no").toString()));
		 taskLogisticsItemMapper.updateLogisticsItemforQc(params);
		 taskQcMapper.updateinfo(params);
	}
	/**
	 * 删除一条质检信息
	 * @param params
	 * @author chenlong
	 * @date 2015-05-05
	 */
	public void deleteTaskQc(Map<String,Object> params){
		String file_name = taskQcMapper.selectFileinfo(Integer.parseInt(params.get("qc_id").toString()));
		fileService.deleteFileByName(file_name);
		taskQcMapper.deleteQc(Integer.parseInt(params.get("qc_id").toString()));
		Map<String,Object> maps = new  HashMap<String, Object>();
		maps.put("item_id",params.get("record_id"));
		maps.put("qc_state", 0);//删除后显示未质检
		maps.put("receive_no",0);
		taskLogisticsItemMapper.updateLogisticsItemforId(maps);
	}
	
	
	/**
	 * 增加一条质检信息
	 * @param params
	 * @author chenlong
	 * @data 2016-04-12
	 */
	public String  addTaskQc(Map<String,Object> params){
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("item_id", params.get("record_id"));
		String message = taskLogisticsItemService.getQcState(param);
		if(message=="成功"){		
		String file = taskQcMapper.getCountforFile(params);
		if(file!=null&&file!=""){
			LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
			params.put("qc_operator",loginAccount.getLogin_name());
			taskQcMapper.updateQcinfo(params);			
		}else{
			taskQcMapper.addAppQc(params);		
		}
		Map<String,Object> maps = new  HashMap<String, Object>();
		
		Integer vo = Integer.parseInt(params.get("qc_count").toString())-Integer.parseInt(params.get("unqualified_no").toString());
		maps.put("receive_no", vo);
		maps.put("item_id",params.get("record_id").toString());
		maps.put("qc_state", 1);
		taskLogisticsItemMapper.updateLogisticsItemforId(maps);		
		updateTaskproduct(params);//更新质检文件的合格和收货数量
		}
		return message;
	}
	
	/**
	 * 查询出要编辑的质检信息
	 * @return
	 * @author chenlong
	 * @date 2016-04-11
	 */
	public TaskQc getTaskQc(Integer qc_id){
		return taskQcMapper.getQc(qc_id);
	}
	

}
