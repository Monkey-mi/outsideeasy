package com.outsideasy.ws.mes.wxdata;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.jws.soap.SOAPBinding.Style;
import javax.xml.ws.WebServiceContext;

import org.springframework.beans.factory.annotation.Autowired;

import platform.mes.wxdata.model.PfTask;
import platform.mes.wxdata.model.PfTaskOutput;
import platform.mes.wxdata.model.TaskAndGX;
import platform.mes.wxdata.service.MesTaskService;
import util.Const;
import util.MyJsonUtil;
import util.XmlUtil;

import com.outsideasy.ws.common.vo.CXFResponse;
import common.sysmodule.model.WsIdentity;
import common.sysmodule.service.WsIdentityService;

@WebService
@SOAPBinding(style = Style.RPC)
public class MesTaskServiceImpl implements MesTaskServiceInter {
	@Autowired
	private MesTaskService mesTaskService;
	@Resource
	private WebServiceContext context;
	@Autowired
	private WsIdentityService wsIdentityService;
	@Override
	public String getPfTaskOutputList(String rwdh){
		Map<String,Object> params2=new HashMap<String,Object>();
		params2.put("rwdh", rwdh);
		params2.put("send_company", getCompany_id());
		List<PfTaskOutput> list=mesTaskService.getPfTaskOutputList(params2);
		CXFResponse<PfTaskOutput> res=new CXFResponse<PfTaskOutput>();
		if(list!=null && list.size()>0){
			res.setSuccess(Const.SOAP_TRUE);
			res.setList(list);
		}else{
			res.setSuccess(Const.SOAP_FALSE);
			res.setErrorMessage("同步失败，生产方未在平台中录入产量");
		}
		return MyJsonUtil.obj2string(res);
	}

	@Override
	public String addMesTaskAndTaskGx(String jsonobj) {		
		int company_id=getCompany_id();
		TaskAndGX mtAndGx=MyJsonUtil.str2obj(jsonobj, TaskAndGX.class);
		CXFResponse<PfTask> res=new CXFResponse<PfTask>();
		res.setSuccess(Const.SOAP_TRUE);
		if(mtAndGx.getTask()==null){
			res.setErroeResponseInfo("发送失败，发送的任务单为空");
		}else if(mtAndGx.getGxlist()==null || (mtAndGx.getGxlist()!=null && mtAndGx.getGxlist().size()==0)){
			res.setErroeResponseInfo("发送失败，发送的工序为空");
		}else if(mtAndGx.getBomlist()==null || (mtAndGx.getBomlist()!=null && mtAndGx.getBomlist().size()==0)){
			res.setErroeResponseInfo("发送失败，发送的bom材料为空");
		}else{
			mesTaskService.addMesTaskAndTaskGx(res,company_id,mtAndGx);
		}
		return MyJsonUtil.obj2string(res);
	}

	@Override
	public String getMesTaskByrwdh(String rwdh) {
		Map<String,Object> params=new HashMap<String,Object>();
		params.put("rwdh", rwdh);
		params.put("send_company", getCompany_id());
		PfTask task=mesTaskService.getMesTaskListByT_id(params);
		CXFResponse<PfTask> res=new CXFResponse<PfTask>();
		if(task!=null){
			res.setObj(task);
			res.setSuccess(Const.SOAP_TRUE);
		}else{
			res.setErrorMessage("获取任务单失败，平台中没有该任务单");
			res.setSuccess(Const.SOAP_FALSE);
		}
		return MyJsonUtil.obj2string(res);
	}	

	private int getCompany_id(){
		Map<String, Object> message = context.getMessageContext();
		String username=XmlUtil.getSOAPUserName(message);
		List<WsIdentity> wslist=wsIdentityService.getEnabledIdentity(username);
		int send_company=wslist.get(0).getCompany_id();
		return send_company;
	}
}
