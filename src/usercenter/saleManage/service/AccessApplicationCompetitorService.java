package usercenter.saleManage.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.saleManage.data.AccessApplicationCompetitorMapper;
import usercenter.saleManage.model.AccessApplicationCompetitor;


@Service
public class AccessApplicationCompetitorService {
	@Autowired
	private AccessApplicationCompetitorMapper mapper;

	public List<AccessApplicationCompetitor> getAccessApplicationCompetitorList(Map<String,Object> params) {
		return mapper.getAccessApplicationCompetitorList(params);
	}
	public void addAccessApplicationCompetitor(Map<String,Object> params) {
			mapper.addAccessApplicationCompetitor(params);
	}
	
	/**
	* @Description:批量修改竞争对手
	* AccessApplicationCompetitorService
	* updateCompetitorInfos
	* @param infos void
	* @author mishengliang
	* 2017-2-15 上午9:04:46
	*/
	@SuppressWarnings("unchecked")
	public void addCompetitorInfos(HttpServletRequest request) {
		Map<String, Object> params = new HashMap<String, Object>();
		Integer recordId = Integer.parseInt(request.getParameter("recordId"));
		Integer supplierId = Integer.parseInt(request.getParameter("supplierId"));
		String competitorInfos= request.getParameter("competitorInfos");
		JSONArray infosArray = JSONArray.fromObject(competitorInfos);
		params.put("record_id", recordId);
		deleteAccessApplicationCompetitorByRI(params);//删除相应设备
		for (int i = 0; i < infosArray.size(); i++) {
			params = infosArray.getJSONObject(i);
			params.put("AppCompetitorId", null);
			params.put("record_id", recordId);
			params.put("supplier_id", supplierId);
			addAccessApplicationCompetitor(params);
		}
	}
	
	public void updateAccessApplicationCompetitor(Map<String,Object> params) {
		mapper.updateAccessApplicationCompetitor(params);
	}
	public void deleteAccessApplicationCompetitor(Map<String,Object> params) {
			mapper.deleteAccessApplicationCompetitor(params);
	}
	public void deleteAccessApplicationCompetitorByRI(Map<String,Object> params) {
		mapper.deleteAccessApplicationCompetitorByRI(params);
	}
	public void deleteAccessApplicationCompetitors(Map<String,Object> params) {
		Map<String, Object> map=new HashMap<String, Object>();
		if (!"".equals(params.get("competitor_ids").toString())) {
			String arrayStr=params.get("competitor_ids").toString();
			String[] arrayId=arrayStr.split(",");
			for(int i=0;i<arrayId.length;i++){
				map.put("competitorId", arrayId[i]);
				mapper.deleteAccessApplicationCompetitor(map);
			}
		}
	}
	@SuppressWarnings("unchecked")
	public void addOrUpdateAccessApplicationCompetitor(String competitorInfo,Integer recordId,Integer access_status,Integer supplier_id) throws Exception{
		competitorInfo = "["+ competitorInfo +"]";
		JSONArray competitorlArray = JSONArray.fromObject(competitorInfo);
		System.out.println(competitorlArray);
		for(int i = 0; i<competitorlArray.size(); i++){
			Map<String, Object> addParams = new HashMap<String, Object>();//新增的数据集合
			Map<String, Object> updateParams = new HashMap<String, Object>();//新增的数据集合
			JSONObject competitorJsonObject = competitorlArray.getJSONObject(i);
			if("".equals(competitorJsonObject.get("competitorName").toString())){
				if(!"-1".equals(competitorJsonObject.get("competitorId").toString())){//原有的记录，置为空，则将此条记录删除
					deleteAccessApplicationCompetitor(competitorJsonObject);
				}
			}else if("-1".equals(competitorJsonObject.get("competitorId").toString())||access_status==0){
				addParams = competitorJsonObject;//将数据添加到map中  JSONObject为实现了Map接口，所以直接上转型赋值即可
				addParams.put("record_id", recordId);
				addParams.put("supplier_id", supplier_id);
				addAccessApplicationCompetitor(addParams);
			}else{
				updateParams=competitorJsonObject;
				updateParams.put("record_id", recordId);
				updateAccessApplicationCompetitor(updateParams);
			}
		}
	}
}
