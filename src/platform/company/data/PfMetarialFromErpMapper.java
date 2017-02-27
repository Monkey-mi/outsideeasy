/**  
* @Title: PfMetarialFromErpMapper.java
* @Package platform.company.data
* @Description: TODO
* @author 舒飞
* @date 2016-8-25 下午2:51:31 
*/ 
package platform.company.data;

import java.util.Map;

import com.outsideasy.ws.erp.supplier.vo.MetarialOut;

public interface PfMetarialFromErpMapper {

	public void updateMetarialFromERP(Map<String, Object> params);
	public void addMetarialFromERP(MetarialOut obj);
	public void deleteMetarialFromERP(Map<String, Object> params);
}
