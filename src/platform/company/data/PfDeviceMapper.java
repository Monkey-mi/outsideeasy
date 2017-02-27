package platform.company.data;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import platform.company.model.PfDevice;

import com.outsideasy.ws.erp.supplier.vo.DeviceOut;

public interface PfDeviceMapper {
	List<DeviceOut> getDeviceOutList(Map<String,Object> params);
	
	/**
	 * 根据companyId获取设备信息;
	*getDeviceByCompanyId
	*@param companyId
	*@return
	*List<E>
	*@author mishengliang
	*2016-4-8上午10:10:37
	 */
	public List<PfDevice> getDeviceByCompanyId(Integer companyId);
	public List<Map<String, Object>> getDeviceMapByCompanyId(Map<String, Object> params);
	
	/**
	 * 删除设备
	*deleteDevice
	*@param params
	*void
	*@author mishengliang
	*2016-4-8下午5:28:09
	 */
	public void deleteDevice(Map<String, Object> params);
	public void deleteDevices(@Param("deviceIds") String[] deviceIds);
	
	/**
	 * 通过设备ID更新设备
	*updateDeviceByGoodsId
	*@param params
	*void
	*@author mishengliang
	*2016-4-8下午5:28:13
	 */
	public void updateDeviceByDeviceId(Map<String, Object> params);
	
	/**
	 * 增加设备
	*addDevice
	*@param params
	*void
	*@author mishengliang
	*2016-4-8下午5:28:18
	 */
	public void addDevice(Map<String, Object> params);

	void deleteDeviceByCompanyId(Map<String, Object> params);
	
}
