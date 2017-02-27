package manager.materialConfirmation.data;

import java.util.List;
import java.util.Map;

import manager.materialConfirmation.model.MaterialSample;



public interface MaterialSampleMapper {
	public List<MaterialSample> getMaterialSampleList(Map<String,Object> params);
	public void addMaterialSample(MaterialSample obj);
	public void updateMaterialSample(MaterialSample obj);
	public void deleteMaterialSample(MaterialSample obj);
}
