package manager.materialConfirmation.service;

import java.util.List;
import java.util.Map;

import manager.materialConfirmation.data.MaterialConfirmationMapper;
import manager.materialConfirmation.model.MaterialConfirmation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class MaterialConfirmationService {
	@Autowired
	private MaterialConfirmationMapper mapper;


	public List<MaterialConfirmation> getMaterialConfirmationList(Map<String,Object> params) {
		return mapper.getMaterialConfirmationList(params);
	}
	public void addMaterialConfirmation(MaterialConfirmation[] arr) {
		for(MaterialConfirmation obj: arr) {
			mapper.addMaterialConfirmation(obj);
		}
	}
	public void updateMaterialConfirmation(MaterialConfirmation[] arr) {
		for(MaterialConfirmation obj: arr) {
			mapper.updateMaterialConfirmation(obj);
		}
	}
	public void deleteMaterialConfirmation(MaterialConfirmation[] arr) {
		for(MaterialConfirmation obj: arr) {
			mapper.deleteMaterialConfirmation(obj);
		}
	}
}
