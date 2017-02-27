/**  
* @Title: PfDevicelistFromErpMapper.java
* @Package platform.company.data
* @Description: TODO
* @author 舒飞
* @date 2016-8-25 下午2:43:31 
*/ 
package platform.company.data;

import java.util.Map;

import com.outsideasy.ws.erp.supplier.vo.DeviceOut;

public interface PfDevicelistFromErpMapper {
	
	public void updateDevicelistFromERP(Map<String, Object> params);
	public void addDevicelistFromERP(DeviceOut obj);
	public void deleteDevicelistFromERP(Map<String, Object> params);

}
