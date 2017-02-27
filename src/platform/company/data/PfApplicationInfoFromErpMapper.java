/**  
* @Title: PfApplicationInfoFromErpMapper.java
* @Package platform.company.data
* @Description: TODO
* @author 舒飞
* @date 2016-8-25 下午3:09:35 
*/ 
package platform.company.data;

import java.util.Map;

import usercenter.saleManage.model.AccessApplicationInfo;

public interface PfApplicationInfoFromErpMapper {

	Integer getEID(Map<String, Object> params);	
	void updateAccessApplicationInfoFromErp(AccessApplicationInfo obj);
}
