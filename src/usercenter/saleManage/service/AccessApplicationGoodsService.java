package usercenter.saleManage.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.saleManage.data.AccessApplicationGoodsMapper;
import usercenter.saleManage.model.AccessApplicationGoods;


@Service
public class AccessApplicationGoodsService {
	@Autowired
	private AccessApplicationGoodsMapper mapper;

	public List<AccessApplicationGoods> getAccessApplicationGoodsList(Map<String,Object> params) {
		return mapper.getAccessApplicationGoodsList(params);
	}
	public void addAccessApplicationGoods(Map<String,Object> params) {
			mapper.addAccessApplicationGoods(params);
	}
	public void updateAccessApplicationGoods(Map<String,Object> params) {
			mapper.updateAccessApplicationGoods(params);
	}
	
	@SuppressWarnings("unchecked")
	public void addGoodsInfos(HttpServletRequest request) {
		Map<String, Object> params = new HashMap<String, Object>();
		Integer recordId = Integer.parseInt(request.getParameter("recordId"));
		Integer supplierId = Integer.parseInt(request.getParameter("supplierId"));
		String goodInfos= request.getParameter("goodInfos");
		JSONArray infosArray = JSONArray.fromObject(goodInfos);
		params.put("record_id", recordId);
		deleteAccessApplicationGoodsByRI(params);
		for (int i = 0; i < infosArray.size(); i++) {
			params = infosArray.getJSONObject(i);
			params.put("AppGoodsId", null);
			params.put("record_id", recordId);
			params.put("supplier_id", supplierId);
			addAccessApplicationGoods(params);
		}
	}
	public void deleteAccessApplicationGoods(Map<String,Object> params) {
			mapper.deleteAccessApplicationGoods(params);
	}
	public void deleteAccessApplicationGoodsByRI(Map<String,Object> params) {
		mapper.deleteAccessApplicationGoodsByRI(params);
	}
	@SuppressWarnings("unchecked")
	public void addOrUpdateAccessApplicationGoods(String goodsInfo,Integer recordId,Integer access_status,Integer supplier_id) {
		// TODO Auto-generated method stub
		goodsInfo = "["+ goodsInfo +"]";
		JSONArray goodsArray = JSONArray.fromObject(goodsInfo);
		for(int i = 0; i<goodsArray.size(); i++){
			Map<String, Object> addParams = new HashMap<String, Object>();//新增的数据集合
			Map<String, Object> updateParams = new HashMap<String, Object>();//新增的数据集合
			JSONObject goodsJsonObject = goodsArray.getJSONObject(i);
			if("".equals(goodsJsonObject.get("goodsBrand").toString()) && "".equals(goodsJsonObject.get("goodsName").toString())){
				if(!"-1".equals(goodsJsonObject.get("goodsId").toString())){//原有的记录，置为空，则将此条记录删除
					deleteAccessApplicationGoods(goodsJsonObject);
				}
			}else if("-1".equals(goodsJsonObject.get("goodsId").toString())||access_status==0){
				addParams = goodsJsonObject;//将数据添加到map中  JSONObject为实现了Map接口，所以直接上转型赋值即可
				addParams.put("record_id", recordId);
				addParams.put("supplier_id", supplier_id);
				addAccessApplicationGoods(addParams);
			}else{
				updateParams = goodsJsonObject;
				updateParams.put("record_id", recordId);
				updateAccessApplicationGoods(updateParams);
			}
		}
	}
	public void deleteAccessApplicationGoodses(Map<String,Object> params) {
		Map<String, Object> map=new HashMap<String, Object>();
		if (!"".equals(params.get("goods_ids").toString())) {
			String arrayStr=params.get("goods_ids").toString();
			String[] arrayId=arrayStr.split(",");
			for(int i=0;i<arrayId.length;i++){
				map.put("goodsId", arrayId[i]);
				mapper.deleteAccessApplicationGoods(map);
			}
		}
	}
}
