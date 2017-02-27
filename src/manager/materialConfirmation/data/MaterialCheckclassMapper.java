package manager.materialConfirmation.data;

import java.util.List;
import java.util.Map;

import manager.materialConfirmation.model.MaterialCheckclass;



public interface MaterialCheckclassMapper {
	public List<MaterialCheckclass> getMaterialCheckclassList(Map<String,Object> params);
	public void addMaterialCheckclass(MaterialCheckclass obj);
	public void updateMaterialCheckclass(MaterialCheckclass obj);
	public void deleteMaterialCheckclass(MaterialCheckclass obj);
}
