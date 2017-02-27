package usercenter.saleManage.data;

import java.util.List;
import java.util.Map;

import usercenter.saleManage.model.AccessApplicationGoods;


public interface AccessApplicationGoodsMapper {
	public List<AccessApplicationGoods> getAccessApplicationGoodsList(Map<String,Object> params);
	public void addAccessApplicationGoods(Map<String,Object> params);
	public void updateAccessApplicationGoods(Map<String,Object> params);
	public void deleteAccessApplicationGoods(Map<String,Object> params);
	public void deleteAccessApplicationGoodsByRI(Map<String,Object> params);
}
