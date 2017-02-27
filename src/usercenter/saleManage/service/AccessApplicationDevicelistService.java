package usercenter.saleManage.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.saleManage.data.AccessApplicationDevicelistMapper;
import usercenter.saleManage.model.AccessApplicationDevicelist;

import com.outsideasy.ws.erp.supplier.vo.DeviceOut;


@Service
public class AccessApplicationDevicelistService {
	@Autowired
	private AccessApplicationDevicelistMapper mapper;
	public List<DeviceOut> getPfAccessApplicationDevicelistList(Map<String,Object> params) {
		return mapper.getPfAccessApplicationDevicelistList(params);
	}
	public List<AccessApplicationDevicelist> getAccessApplicationDevicelistList(Map<String,Object> params) {
		return mapper.getAccessApplicationDevicelistList(params);
	}
	@SuppressWarnings("unchecked")
	public void addDeviceInfos(HttpServletRequest request) {
		Map<String, Object> params = new HashMap<String, Object>();
		Integer recordId = Integer.parseInt(request.getParameter("recordId"));
		Integer supplierId = Integer.parseInt(request.getParameter("supplierId"));
		String deviceInfos= request.getParameter("deviceInfos");
		JSONArray infosArray = JSONArray.fromObject(deviceInfos);
		params.put("record_id", recordId);
		deleteAccessApplicationDevicelistByRI(params);//删除相应设备
		for (int i = 0; i < infosArray.size(); i++) {
			params = infosArray.getJSONObject(i);
			params.put("AppDeviceId", null);
			params.put("record_id", recordId);
			params.put("supplier_id", supplierId);
			addAccessApplicationDevicelist(params);
		}
	}
	public void addAccessApplicationDevicelist(Map<String,Object> params) {
		mapper.addAccessApplicationDevicelist(params);
	}
	public void updateAccessApplicationDevicelist(Map<String,Object> params) {
			mapper.updateAccessApplicationDevicelist(params);
	}
	public void deleteAccessApplicationDevicelist(Map<String,Object> params) {
			mapper.deleteAccessApplicationDevicelist(params);
	}
	public void deleteAccessApplicationDevicelistByRI(Map<String,Object> params) {
		mapper.deleteAccessApplicationDevicelistByRI(params);
	}
	public void deleteAccessApplicationDevicelists(Map<String,Object> params) {
		Map<String, Object> map=new HashMap<String, Object>();
		if (!"".equals(params.get("devicelist_ids").toString())) {
			String arrayStr=params.get("devicelist_ids").toString();
			String[] arrayId=arrayStr.split(",");
			for(int i=0;i<arrayId.length;i++){
				map.put("deviceId", arrayId[i]);
				mapper.deleteAccessApplicationDevicelist(map);
			}
		}
	}
	@SuppressWarnings("unchecked")
	public void addOrUpdateAccessApplicationDevicelist(String devicelistInfo,Integer recordId,Integer access_status,Integer supplier_id) throws Exception{
		//java json字符创解析为json对象
		devicelistInfo = "["+ devicelistInfo +"]";
		JSONArray devicelistArray = JSONArray.fromObject(devicelistInfo);
		for(int i = 0; i<devicelistArray.size(); i++){
			Map<String, Object> addParams = new HashMap<String, Object>();//新增的数据集合
			Map<String, Object> updateParams = new HashMap<String, Object>();//新增的数据集合
			JSONObject devicelistJsonObject = devicelistArray.getJSONObject(i);
			if("".equals(devicelistJsonObject.get("deviceName").toString()) && "".equals(devicelistJsonObject.get("specifications").toString())
			 &&"".equals(devicelistJsonObject.get("place").toString()) && "".equals(devicelistJsonObject.get("advanced").toString())
			 &&"".equals(devicelistJsonObject.get("price").toString()) && "".equals(devicelistJsonObject.get("deviceNum").toString())){
				if(!"-1".equals(devicelistJsonObject.get("deviceId").toString())){//原有的记录，置为空，则将此条记录删除
					deleteAccessApplicationDevicelist(devicelistJsonObject);
				}
			}else if("-1".equals(devicelistJsonObject.get("deviceId").toString())||access_status==0){
				addParams = devicelistJsonObject;//将数据添加到map中  JSONObject为实现了Map接口，所以直接上转型赋值即可
				addParams.put("record_id", recordId);
				addParams.put("supplier_id", supplier_id);
				addAccessApplicationDevicelist(addParams);
			}else{
				updateParams=devicelistJsonObject;
				updateParams.put("record_id", recordId);
				updateAccessApplicationDevicelist(updateParams);
			}
		}
	}
}
