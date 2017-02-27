package manager.materialConfirmation.data;

import java.util.List;
import java.util.Map;

import manager.materialConfirmation.model.MaterialConfirmation;



public interface MaterialConfirmationMapper {
	public List<MaterialConfirmation> getMaterialConfirmationList(Map<String,Object> params);
	public void addMaterialConfirmation(MaterialConfirmation obj);
	public void updateMaterialConfirmation(MaterialConfirmation obj);
	public void deleteMaterialConfirmation(MaterialConfirmation obj);
}
