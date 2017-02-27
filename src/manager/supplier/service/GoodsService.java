package manager.supplier.service;

import java.util.List;
import java.util.Map;

import manager.supplier.data.GoodsMapper;
import manager.supplier.model.Devicelist;
import manager.supplier.model.Goods;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import usercenter.saleManage.data.AccessApplicationGoodsMapper;
import usercenter.saleManage.model.AccessApplicationGoods;
import util.BeanUtil;



@Service
public class GoodsService {
	@Autowired
	private GoodsMapper mapper;
	@Autowired
	private AccessApplicationGoodsMapper accMapper;

	public List<Goods> getGoodsList(Map<String,Object> params) {
		return mapper.getGoodsList(params);
	}
	public List<AccessApplicationGoods> getAccGoodsList(Map<String,Object> params) {
		return accMapper.getAccessApplicationGoodsList(params);
	}
	@Transactional
	public void addGoods(Goods[] arr) {
		for(Goods obj: arr) {
			mapper.addGoods(obj);
		}
	}
	@Transactional
	public void updateGoods(Goods[] arr) {
		for(Goods obj: arr) {
			mapper.updateGoods(obj);
		}
	}
	@Transactional
	public void deleteGoods(Goods[] arr) {
		for(Goods obj: arr) {
			mapper.deleteGoods(obj);
		}
	}
	public void addAccGoods(Map<String,Object> params) throws Exception{
		if(Boolean.parseBoolean(params.get("isSync").toString())){
			Goods item=(Goods)BeanUtil.mapToObject(params,Goods.class);
			item.setCompany_id(Integer.parseInt(params.get("company_id").toString()));
			mapper.addGoods(item);
			params.put("AppGoodsId", item.getGoods_id());
		}
		params.put("goodsName", params.get("goods_name"));
		params.put("goodsBrand", params.get("goods_brand"));
		accMapper.addAccessApplicationGoods(params);
	}
	public void updateAccGoods(Map<String,Object> params) throws Exception{
		if(Boolean.parseBoolean(params.get("isSync").toString())){
			Goods item=(Goods)BeanUtil.mapToObject(params,Goods.class);
			item.setGoods_id(Integer.parseInt(params.get("app_goods_id").toString()));
			mapper.updateGoods(item);
		}
		params.put("goodsId", params.get("goods_id"));
		params.put("goodsName", params.get("goods_name"));
		params.put("goodsBrand", params.get("goods_brand"));
		accMapper.updateAccessApplicationGoods(params);
	}
}
