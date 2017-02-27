/**  
* @Title: PfCompetitorFromErpMapper.java
* @Package platform.company.data
* @Description: TODO
* @author 舒飞
* @date 2016-8-25 下午2:34:42 
*/ 
package platform.company.data;

import java.util.Map;

import com.outsideasy.ws.erp.supplier.vo.CompetitorOut;

public interface PfCompetitorFromErpMapper {
	public void updateCompetitorFromERP(Map<String, Object> params);
	public void addCompetitorFromERP(CompetitorOut obj);
	public void deleteCompetitorFromERP(Map<String, Object> params);

}
