package manager.supplier.service;

import java.util.List;
import java.util.Map;

import manager.supplier.data.MetarialMapper;
import manager.supplier.model.Goods;
import manager.supplier.model.Metarial;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import usercenter.saleManage.data.AccessApplicationMetarialMapper;
import usercenter.saleManage.model.AccessApplicationMetarial;
import util.BeanUtil;



@Service
public class MetarialService {
	@Autowired
	private MetarialMapper mapper;
	@Autowired
	private AccessApplicationMetarialMapper accMapper;

	public List<Metarial> getMetarialList(Map<String,Object> params) {
		return mapper.getMetarialList(params);
	}
	public List<AccessApplicationMetarial> getAccMetarialList(Map<String,Object> params) {
		return accMapper.getAccessApplicationMetarialList(params);
	}
	@Transactional
	public void addMetarial(Metarial[] arr) {
		for(Metarial obj: arr) {
			mapper.addMetarial(obj);
		}
	}
	@Transactional
	public void updateMetarial(Metarial[] arr) {
		for(Metarial obj: arr) {
			mapper.updateMetarial(obj);
		}
	}
	@Transactional
	public void deleteMetarial(Metarial[] arr) {
		for(Metarial obj: arr) {
			mapper.deleteMetarial(obj);
		}
	}
	public void addAccMetarial(Map<String,Object> params) throws Exception{
		if(Boolean.parseBoolean(params.get("isSync").toString())){
			Metarial item=(Metarial)BeanUtil.mapToObject(params,Metarial.class);
			item.setCompany_id(Integer.parseInt(params.get("company_id").toString()));
			mapper.addMetarial(item);
			params.put("AppMaterialId", item.getMaterial_id());
		}
		params.put("materialName", params.get("material_name"));
		params.put("materialBrand", params.get("material_brand"));
		accMapper.addAccessApplicationMetarial(params);
	}
	public void updateAccMetarial(Map<String,Object> params) throws Exception{
		if(Boolean.parseBoolean(params.get("isSync").toString())){
			Metarial item=(Metarial)BeanUtil.mapToObject(params,Metarial.class);
			item.setMaterial_id(Integer.parseInt(params.get("app_material_id").toString()));
			mapper.updateMetarial(item);
		}
		params.put("materialId", params.get("material_id"));
		params.put("materialName", params.get("material_name"));
		params.put("materialBrand", params.get("material_brand"));
		accMapper.updateAccessApplicationMetarial(params);
	}
}
