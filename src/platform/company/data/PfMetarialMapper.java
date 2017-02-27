package platform.company.data;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import platform.company.model.PfMaterial;

import com.outsideasy.ws.erp.supplier.vo.MetarialOut;

public interface PfMetarialMapper {
	public List<MetarialOut> getMetarialOutList(Map<String,Object> params);
	
	/**
	 * 根据companyId获取购买材料的对象,，包含材料名称和品牌
	*getBuyModelByCompanyId
	*@param companyId
	*@return
	*List<PfMaterial>
	*@author mishengliang
	*2016-4-7下午6:21:51
	 */
	public List<PfMaterial> getBuyModelByCompanyId(Integer companyId);
	public List<Map<String, Object>> getBuyModelMapByCompanyId(Map<String, Object> params);
	
	/**
	 * 通过原料ID更新原料信息
	*updateMetarialById
	*@param params
	*void
	*@author mishengliang
	*2016-4-8下午3:19:16
	 */
	public void updateMetarialById(Map<String,Object> params);
	
	/**
	 * 删除指定原材料
	*deleteMetarial
	*@param params
	*void
	*@author mishengliang
	*2016-4-8下午3:20:06
	 */
	public void deleteMetarial(Map<String,Object> params);
	public void deleteMetarials(@Param("goodsIds")String[] goodsIds);
	
	/**
	 * 增加原材料
	*addMetarial
	*@param params
	*void
	*@author mishengliang
	*2016-4-8下午3:53:38
	 */
	public void addMetarial(Map<String,Object> params);

	public void deleteMetarialByCompanyId(Map<String, Object> params);
}
