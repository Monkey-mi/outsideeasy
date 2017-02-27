package manager.supplier.data;

import java.util.List;
import java.util.Map;

import manager.supplier.model.Devicelist;


public interface DevicelistMapper {
	public List<Devicelist> getDevicelistList(Map<String,Object> params);
	public void addDevicelist(Devicelist obj);
	public void updateDevicelist(Devicelist obj);
	public void deleteDevicelist(Devicelist obj);
	public void updateDevicelist1(Map<String,Object> params);
	public void addDevicelist1(Map<String, Object> params);
}
