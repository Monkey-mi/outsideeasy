package platform.company.data;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import platform.company.model.PfGoods;

import com.outsideasy.ws.erp.supplier.vo.GoodsOut;

public interface PfGoodsMapper {
	public List<GoodsOut> getGoodsOutList(Map<String,Object> params);
	
	/**
	 * 根据companyId获取销售商品对象，包含商品名称和品牌
	*getSaleModelByCompanyId
	*@param companyId
	*@return
	*List<PfGoods>
	*@author mishengliang
	*2016-4-7下午6:20:26
	 */
	public List<PfGoods> getSaleModelByCompanyId(Integer companyId);
	public List<Map<String, Object>> getSaleModelMapByCompanyId(Map<String, Object> params);
	
	/**
	 * 删除指定商品
	*deleteGoods
	*@param params
	*void
	*@author mishengliang
	*2016-4-8下午2:28:04
	 */
	public void deleteGoods(Map<String, Object> params);
	public void deleteGoodss(@Param("goodsIds") String[] goodsIds);
	
	/**
	 * 根据商品ID更新指定商品
	*updateGoodsByGoodsId
	*@param params
	*void
	*@author mishengliang
	*2016-4-8下午2:28:25
	 */
	public void updateGoodsByGoodsId(Map<String, Object> params);
	
	/**
	 * 插入商品
	*addGoods
	*@param params
	*void
	*@author mishengliang
	*2016-4-8下午3:24:24
	 */
	public void addGoods(Map<String, Object> params);

	public void deleteGoodsByCompanyId(Map<String, Object> params);
}
