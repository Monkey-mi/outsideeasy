package usercenter.saleManage.tradeManager.data;

import java.util.List;
import java.util.Map;

import usercenter.saleManage.tradeManager.model.ProductList;


public interface ProductListMapper {
	public List<ProductList> getProductList(Map<String,Object> params);
	public List<ProductList> getProductAllList(Map<String,Object> params);
	public List<ProductList> getProductListListForSearch(Map<String,Object> params);
	public int getProductCount(Map<String,Object> params);
}
