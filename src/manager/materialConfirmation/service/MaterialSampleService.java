package manager.materialConfirmation.service;

import java.util.List;
import java.util.Map;

import manager.materialConfirmation.data.MaterialSampleMapper;
import manager.materialConfirmation.model.MaterialSample;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class MaterialSampleService {
	@Autowired
	private MaterialSampleMapper mapper;


	public List<MaterialSample> getMaterialSampleList(Map<String,Object> params) {
		return mapper.getMaterialSampleList(params);
	}
	public void addMaterialSample(MaterialSample[] arr) {
		for(MaterialSample obj: arr) {
			mapper.addMaterialSample(obj);
		}
	}
	public void updateMaterialSample(MaterialSample[] arr) {
		for(MaterialSample obj: arr) {
			mapper.updateMaterialSample(obj);
		}
	}
	public void deleteMaterialSample(MaterialSample[] arr) {
		for(MaterialSample obj: arr) {
			mapper.deleteMaterialSample(obj);
		}
	}
}
