package usercenter.saleManage.data;

import java.util.List;
import java.util.Map;

import com.outsideasy.ws.erp.supplier.vo.DeviceOut;

import usercenter.saleManage.model.AccessApplicationDevicelist;


public interface AccessApplicationDevicelistMapper {
	public List<AccessApplicationDevicelist> getAccessApplicationDevicelistList(Map<String,Object> params);
	//准入申请 主要设备
	public List<DeviceOut> getPfAccessApplicationDevicelistList(Map<String,Object> params);
	public void addAccessApplicationDevicelist(Map<String,Object> params);
	public void updateAccessApplicationDevicelist(Map<String,Object> params);
	public void deleteAccessApplicationDevicelist(Map<String,Object> params);
	public void deleteAccessApplicationDevicelistByRI(Map<String,Object> params);
}
