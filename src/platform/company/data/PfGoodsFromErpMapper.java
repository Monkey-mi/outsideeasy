/**  
* @Title: PfGoodsFromErp.java
* @Package platform.company.data
* @Description: TODO
* @author 舒飞
* @date 2016-8-25 下午3:01:34 
*/ 
package platform.company.data;

import java.util.Map;

import com.outsideasy.ws.erp.supplier.vo.GoodsOut;

public interface PfGoodsFromErpMapper {

	public void updateGoodsFromERP(Map<String, Object> params);
	public void addGoodsFromERP(GoodsOut obj);
	public void deleteGoodsFromERP(Map<String, Object> params);
}
