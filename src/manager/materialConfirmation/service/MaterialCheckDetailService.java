package manager.materialConfirmation.service;

import java.util.List;
import java.util.Map;

import manager.materialConfirmation.data.MaterialCheckDetailMapper;
import manager.materialConfirmation.model.MaterialCheckDetail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class MaterialCheckDetailService {
	@Autowired
	private MaterialCheckDetailMapper mapper;


	public List<MaterialCheckDetail> getMaterialCheckDetailList(Map<String,Object> params) {
		return mapper.getMaterialCheckDetailList(params);
	}
	public void addMaterialCheckDetail(MaterialCheckDetail[] arr) {
		for(MaterialCheckDetail obj: arr) {
			mapper.addMaterialCheckDetail(obj);
		}
	}
	public void updateMaterialCheckDetail(MaterialCheckDetail[] arr) {
		for(MaterialCheckDetail obj: arr) {
			mapper.updateMaterialCheckDetail(obj);
		}
	}
	public void deleteMaterialCheckDetail(MaterialCheckDetail[] arr) {
		for(MaterialCheckDetail obj: arr) {
			mapper.deleteMaterialCheckDetail(obj);
		}
	}
}
