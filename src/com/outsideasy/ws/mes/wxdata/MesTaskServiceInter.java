package com.outsideasy.ws.mes.wxdata;

import javax.jws.WebService;

@WebService
public interface MesTaskServiceInter {
	
	/**
	* @Description: 新增 发送者的  平台任务单 以及关联的工段 工序 bom材料。
	* @param json格式的 信息主体 TaskAndGX,该对象包含了 任务单信息，工序 ，工段和bom材料信息
	* @return json格式的 CXFResponse<PfTask>
	* 如果success=true，新增成功，并返回PfTask对象；
	* 如果success=false，新增失败，并返回失败信息errorMessage；
	*/
	public String addMesTaskAndTaskGx(String jsonobj);
	/**
	* @Description: 根据发送者的任务单号获取工段产量
	* @param rwdh
	* @return json格式的 CXFResponse<PfTaskOutput>
	* 如果success=true，新增成功，并返回List<PfTaskOutput>；
	* 如果success=false，新增失败，并返回失败信息errorMessage；
	*/
	public String getPfTaskOutputList(String rwdh);
	/**
	* @Description: 根据发送者的任务单号获取平台任务单
	* @param rwdh
	* @return json格式的 CXFResponse<PfTask>
	* 如果success=true，新增成功，并返回PfTask对象；
	* 如果success=false，新增失败，并返回失败信息errorMessage；
	*/
	public String getMesTaskByrwdh(String rwdh);
}
