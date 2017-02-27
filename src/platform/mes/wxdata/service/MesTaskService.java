package platform.mes.wxdata.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform.mes.wxdata.data.MesTaskMapper;
import platform.mes.wxdata.model.PfProcessSection;
import platform.mes.wxdata.model.PfTask;
import platform.mes.wxdata.model.PfTaskBom;
import platform.mes.wxdata.model.PfTaskOutput;
import platform.mes.wxdata.model.PfTaskProcess;
import platform.mes.wxdata.model.TaskAndGX;
import util.Const;
import util.SRMStringUtil;
import util.SysSerialId;

import com.outsideasy.ws.common.vo.CXFResponse;


@Service
public class MesTaskService {
	@Autowired
	private MesTaskMapper mapper;
	
	/**获取未终止的任务单
	 * 参数：任务单号 rwdh send_company公司编号
	 * */
	public PfTask getMesTaskListByT_id(Map<String,Object> params) {
		List<PfTask> list=mapper.getMesTaskListByT_id(params);
		return (list!=null && list.size()>0)?list.get(0):null;
	}
	/**新增平台任务单 以及关联的工段 工序 bom材料。
	 * 
	 * 参数：响应对象res； 发送消息的公司编号company_id ；接收到的信息主体  mtAndGx
	 * mtAndGx包含了  平台任务单数据+工序列表+材料bom列表
	 * 其中工序列表中，每一道工序有  所属 工段字段。*/
	public void addMesTaskAndTaskGx(CXFResponse<PfTask> res,int company_id,TaskAndGX mtAndGx) {
		
		PfTask send_task=mtAndGx.getTask();
		List<PfTaskProcess> gxlist=mtAndGx.getGxlist();
		//判断任务单是否存在
		Map<String,Object> params=new HashMap<String,Object>();
		params.put("send_company", company_id);
		params.put("rwdh", send_task.getRwdh());
		//获取未终止的任务单数量
		int count=mapper.getCountOfPfTask(params);
		if(count>0){
			res.setSuccess(Const.SOAP_FALSE);
			res.setErrorMessage(send_task.getRwdh()+"已经上传");
		}else{
			//保存
			PfTask newtask=new PfTask();
			//接收发送任务单数据
			newtask.setRwdh(send_task.getRwdh());
			newtask.setProduct_name(send_task.getProduct_name());
			newtask.setTotal_qty(send_task.getTotal_qty());
			newtask.setPlan_start(send_task.getPlan_start());
			newtask.setPlan_complete(send_task.getPlan_complete());
			newtask.setScdh(send_task.getScdh());
			newtask.setProducers_company_name(send_task.getProducers_company_name());
			//其他赋值
			String serial_id=SysSerialId.getNewNextSerialId();
			newtask.setSerial_no(serial_id);
			newtask.setState(5);//等待派单
			newtask.setQc_type(1+"");//默认入库质检
			newtask.setCzsj(new Date());
			//按照username设置发送公司
			newtask.setSend_company(company_id);
			mapper.addPfTask(newtask);
			//从数据中获取工段数据
			Map<String,PfProcessSection> gdmap=new HashMap<String,PfProcessSection>();
			for(int j=0;j<gxlist.size();j++){
				PfTaskProcess temppro=gxlist.get(j);
				if(!gdmap.containsKey(temppro.getGdmc())){
					PfProcessSection sec=new PfProcessSection();
					sec.setSection_name(temppro.getGdmc());
					sec.setSx(gdmap.size()+1);
					sec.setT_id(newtask.getT_id());
					sec.setMjbz(temppro.getMjbz());//赋值末级
					gdmap.put(temppro.getGdmc(), sec);
				}
			}
			//保存工段数据 和 工序数据
			String[] array=new String[gdmap.size()];
			gdmap.keySet().toArray(array);
			for(int i=0;i<array.length;i++){
				PfProcessSection tempsec=gdmap.get(array[i]);
				mapper.addPfProcessSection(tempsec);
				for(int j=0;j<gxlist.size();j++){
					PfTaskProcess temppro=gxlist.get(j);
					if(array[i].equals(temppro.getGdmc())){
						temppro.setT_id(newtask.getT_id());
						temppro.setSec_id(tempsec.getSec_id());
						mapper.addPfTaskProcess(temppro);
					}
				}
			}
			List<PfTaskBom> bomlist=mtAndGx.getBomlist();
			for(int i=0;i<bomlist.size();i++){
				PfTaskBom bom=bomlist.get(i);
				bom.setT_id(newtask.getT_id());
				mapper.addPfTaskBom(bom);
			}
			res.setObj(newtask);
			
		}
	}
	/**获取产量
	 * 任务单号 rwdh send_company公司编号*/
	public List<PfTaskOutput> getPfTaskOutputList(Map<String,Object> params) {
		PfTask task=getMesTaskListByT_id(params);
		if(task!=null){
			return mapper.getPfTaskOutputByT_id(task.getT_id());
		}else{
			return null;
		}
		
	}
}
