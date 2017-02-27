package manager.supplier.service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import manager.supplier.data.DevicelistMapper;
import manager.supplier.model.Devicelist;
import manager.supplier.model.SupplierFile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import usercenter.saleManage.data.AccessApplicationDevicelistMapper;
import usercenter.saleManage.model.AccessApplicationDevicelist;
import util.BeanUtil;



@Service
public class DevicelistService {
	@Autowired
	private DevicelistMapper mapper;
	@Autowired
	private AccessApplicationDevicelistMapper accMapper;

	public List<Devicelist> getDevicelistList(Map<String,Object> params) {
		return mapper.getDevicelistList(params);
	}
	public List<AccessApplicationDevicelist> getAccDevicelistList(Map<String,Object> params) {
		return accMapper.getAccessApplicationDevicelistList(params);
	}
	@Transactional
	public void addDevicelist(Devicelist[] arr) {
		for(Devicelist obj: arr) {
			mapper.addDevicelist(obj);
		}
	}
	@Transactional
	public void updateDevicelist(Devicelist[] arr) {
		for(Devicelist obj: arr) {
			mapper.updateDevicelist(obj);
		}
	}
	@Transactional
	public void deleteDevicelist(Devicelist[] arr) {
		for(Devicelist obj: arr) {
			mapper.deleteDevicelist(obj);
		}
	}
	public void addAccDevicelist(Map<String,Object> params) throws Exception{
		Map<String,Object> accparams =new HashMap<String, Object>();
		if(Boolean.parseBoolean(params.get("isSync").toString())){
			//Devicelist item=(Devicelist)BeanUtil.mapToObject(params,Devicelist.class);
			//item.setCompany_id(Integer.parseInt(params.get("company_id").toString()));
			mapper.addDevicelist1(params);
			accparams.put("AppDeviceId", params.get("device_id"));
		}
		accparams.put("deviceName", params.get("device_name"));
		accparams.put("specifications", params.get("specifications"));
		accparams.put("place", params.get("place"));
		accparams.put("price", params.get("price"));
		accparams.put("buyDay", params.get("buy_day"));
		accparams.put("advanced", params.get("advanced"));
		accparams.put("deviceNum", params.get("device_num"));
		accparams.put("supplier_id", params.get("supplier_id"));
		accMapper.addAccessApplicationDevicelist(accparams);
	}
	public void updateAccDevicelist(Map<String,Object> params) throws Exception{
		if(Boolean.parseBoolean(params.get("isSync").toString())){
			params.put("device_id", params.get("app_device_id"));
			mapper.updateDevicelist1(params);
		}
		Map<String,Object> accparams =new HashMap<String, Object>();
		//SimpleDateFormat dt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//DateFormat
		//params.put("buy_day",dt.parse(params.get("buy_day").toString()));
		//Devicelist item=(Devicelist)BeanUtil.mapToObject(params,Devicelist.class);
		//item.setDevice_id(Integer.parseInt(params.get("app_device_id").toString()));
		accparams.put("deviceId", params.get("device_id"));
		accparams.put("deviceName", params.get("device_name"));
		accparams.put("specifications", params.get("specifications"));
		accparams.put("place", params.get("place"));
		accparams.put("price", params.get("price"));
		accparams.put("buyDay", params.get("buy_day"));
		accparams.put("advanced", params.get("advanced"));
		accparams.put("deviceNum", params.get("device_num"));
		accMapper.updateAccessApplicationDevicelist(accparams);
	}
}
