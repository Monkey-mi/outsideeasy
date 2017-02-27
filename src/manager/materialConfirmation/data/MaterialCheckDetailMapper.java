package manager.materialConfirmation.data;

import java.util.List;
import java.util.Map;

import manager.materialConfirmation.model.MaterialCheckDetail;



public interface MaterialCheckDetailMapper {
	public List<MaterialCheckDetail> getMaterialCheckDetailList(Map<String,Object> params);
	public void addMaterialCheckDetail(MaterialCheckDetail obj);
	public void updateMaterialCheckDetail(MaterialCheckDetail obj);
	public void deleteMaterialCheckDetail(MaterialCheckDetail obj);
}
