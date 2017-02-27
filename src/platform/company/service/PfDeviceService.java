package platform.company.service;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform.company.data.PfDeviceMapper;
import platform.company.model.PfDevice;

import com.outsideasy.ws.erp.supplier.vo.DeviceOut;

@Service
public class PfDeviceService {
	@Autowired
	private PfDeviceMapper pfDeviceMapper;
	
	public List<DeviceOut> getDeviceOutList(Map<String,Object> params){
		return pfDeviceMapper.getDeviceOutList(params);
	}

	/**
	 * 
	*getDeviceByCompanyId
	*@param companyId
	*@return
	*List<PfDevice>
	*@author mishengliang
	*2016-4-20下午3:50:33
	 */
	public List<PfDevice> getDeviceByCompanyId(Integer companyId){
		return pfDeviceMapper.getDeviceByCompanyId(companyId);
	}
	public List<Map<String, Object>> getDeviceMapByCompanyId(Map<String, Object> params){
		return pfDeviceMapper.getDeviceMapByCompanyId(params);
	}
	
	/**
	 * 
	*deleteDevice
	*@param params
	*void
	*@author mishengliang
	*2016-4-20下午3:50:46
	 */
	public void deleteDevice(Map<String, Object> params){
		pfDeviceMapper.deleteDevice(params);
	}
	public void deleteDevices(Map<String, Object> params){
		String[] deviceIds = ((String) params.get("deviceIds")).split(",");
		pfDeviceMapper.deleteDevices(deviceIds);
	}
	
	/**
	 * 
	*updateDeviceByDeviceId
	*@param params
	*void
	*@author mishengliang
	*2016-4-20下午3:50:51
	 */
	public void updateDeviceByDeviceId(Map<String, Object> params){
		pfDeviceMapper.updateDeviceByDeviceId(params);
	}
	
	/**
	 * 
	*addDevice
	*@param params
	*void
	*@author mishengliang
	*2016-4-20下午3:50:56
	 */
	public void addDevice(Map<String, Object> params){
		pfDeviceMapper.addDevice(params);
	}
	
	/**
	 * 将增加和更新的数据分离开
	*addOrUpdateDeviceCluster
	*@param deviceInfo
	*void
	*@author mishengliang
	*2016-4-23上午10:22:02
	 * @throws Exception 
	 */
	@SuppressWarnings("unchecked")
	public void addOrUpdateDeviceCluster(String deviceInfo,Integer companyId) throws Exception{
		Map<String, Object> params = new HashMap<String, Object>();//总的数据集合
		Map<String, Object> addParams = new HashMap<String, Object>();//新增的数据集合
		Map<String, Object> updateParams = new HashMap<String, Object>();//更新数据集合
		
		String[] deviceListInfo = deviceInfo.split(";");
		
		for(int i = 0; i<deviceListInfo.length; i++){
			params = stringToMap(deviceListInfo[i]);//构造对象单元数据
			addParams = (Map<String, Object>) params.get("addParams");
			updateParams = (Map<String, Object>) params.get("updateParams");
			
			if(updateParams.size() != 0){
				updateDeviceByDeviceId(updateParams);
			}else if(addParams.size() != 0){
				addParams.put("companyId", companyId);
				if ("".equals(addParams.get("deviceName"))&&"".equals(addParams.get("specifications"))
						&&"".equals(addParams.get("place"))&& addParams.get("price").equals(0)
						&&"".equals(addParams.get("advanced"))&&addParams.get("price").equals(0)) {//空数据不保存
					
				}else {
					addDevice(addParams);
				}
			}
		}
	}
	
	
	/**
	 * 将特定的String格式装进Map中
	*stringToMap
	*@param string 格式为：A:a,B:b;A:a,B:b;A:a,B:b;...  A:a,B:b;即为为一个模块 A B为属性名称，a b为各自的属性值
	*@return
	*Map<String,Object>
	*@author mishengliang
	*2016-4-22下午2:31:59
	 * @throws Exception 
	 */
	private Map<String, Object> stringToMap(String ObjectString) throws Exception{
		Map<String, Object> params = new HashMap<String, Object>();//总的数据集合
		Map<String, Object> addParams = new HashMap<String, Object>();//新增的数据集合
		Map<String, Object> updateParams = new HashMap<String, Object>();//更新数据集合
		Map<String, Object> iParams = new HashMap<String, Object>();//变量引用
		 SimpleDateFormat sdf =   new SimpleDateFormat( "yyyy-MM-dd" );
		
		String[] proArray = ObjectString.split(",");
		for(String s : proArray){//将新增数据和更新数据分离
			String[] characterString = s.split(":");
			if("deviceId".equals(characterString[0].trim()) && "-1".equals(characterString[1].trim())){
				iParams = addParams;
			}else if("deviceId".equals(characterString[0].trim())){
				iParams = updateParams;
			}
		}
		
		for(int i = 0;i < proArray.length; i++){
				String[] characterString = proArray[i].split(":");
				if ("deviceId".equals(characterString[0].trim())) {
					iParams.put(characterString[0], Integer.parseInt(characterString[1]));
				}else if("deviceNum".equals(characterString[0].trim())){
					if(characterString.length > 1){
						iParams.put(characterString[0], Integer.parseInt(characterString[1]));
					}else{//空字符串，默认为0
						iParams.put(characterString[0], 0);
					}
				}else if("price".equals(characterString[0].trim())){
					if(characterString.length > 1){
						iParams.put(characterString[0], Float.parseFloat(characterString[1]));
					}else{
						iParams.put(characterString[0], 0);
					}
				}else if(characterString.length > 1 && characterString[1].length() > 0){
					iParams.put(characterString[0], characterString[1]);
				}else{//空字符串
					iParams.put(characterString[0], "");
				}
		}
		params.put("addParams", addParams);
		params.put("updateParams", updateParams);
		
		return params;
	}
	/**
	 * @Description:根据companyId删除
	 * PfDeviceService
	 * deleteDeviceByCompanyId
	 * @param params void
	 * @author yukai
	 * 2016-8-30 上午9:40:48
	 */
	public void deleteDeviceByCompanyId(Map<String, Object> params) {
		pfDeviceMapper.deleteDeviceByCompanyId(params);
	}
}
