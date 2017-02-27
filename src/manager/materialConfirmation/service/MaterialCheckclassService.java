package manager.materialConfirmation.service;

import java.util.List;
import java.util.Map;

import manager.materialConfirmation.data.MaterialCheckclassMapper;
import manager.materialConfirmation.model.MaterialCheckclass;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class MaterialCheckclassService {
	@Autowired
	private MaterialCheckclassMapper mapper;


	public List<MaterialCheckclass> getMaterialCheckclassList(Map<String,Object> params) {
		return mapper.getMaterialCheckclassList(params);
	}
	public void addMaterialCheckclass(MaterialCheckclass[] arr) {
		for(MaterialCheckclass obj: arr) {
			mapper.addMaterialCheckclass(obj);
		}
	}
	public void updateMaterialCheckclass(MaterialCheckclass[] arr) {
		for(MaterialCheckclass obj: arr) {
			mapper.updateMaterialCheckclass(obj);
		}
	}
	public void deleteMaterialCheckclass(MaterialCheckclass[] arr) {
		for(MaterialCheckclass obj: arr) {
			mapper.deleteMaterialCheckclass(obj);
		}
	}
}
