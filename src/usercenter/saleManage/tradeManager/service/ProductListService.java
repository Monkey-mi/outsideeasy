package usercenter.saleManage.tradeManager.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.saleManage.tradeManager.data.ProductListMapper;
import usercenter.saleManage.tradeManager.model.ProductList;


@Service
public class ProductListService {
	@Autowired
	private ProductListMapper mapper;

	/**
	* @Description:根据订单id查询出来0~10产品
	* ProductListService
	* getProductListList
	* @param params
	* @return List<ProductList>
	* @author chenlong
	* 2016-8-18 上午11:09:47
	 */
	public List<ProductList> getProductList(Map<String,Object> params) {
		return  mapper.getProductList(params);		
	}
	/**
	* @Description:根据订单id查询出count
	* ProductListService
	* getProductListList
	* @param params
	* @return List<ProductList>
	* @author chenlong
	* 2016-8-18 上午11:09:47
	 */
	public int getProductCount(Map<String,Object> params) {
		return  mapper.getProductCount(params);		
	}
	/**
	* @Description:根据订单id查询出来所有的产品
	* ProductListService
	* getProductListListForSearch
	* @param params
	* @return List<ProductList>
	* @author chenlong
	* 2016-8-19 下午4:39:17
	 */
	public List<ProductList> getProductListListForSearch(Map<String,Object> params){
		return mapper.getProductAllList(params);
	}
}
