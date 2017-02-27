package manager.basicdata.level.data;

import java.util.List;
import java.util.Map;

import manager.basicdata.level.model.MaterialLevel;



public interface MaterialLevelMapper {
	public List<MaterialLevel> getMaterialLevelList(Map<String,Object> params);
	public void addMaterialLevel(MaterialLevel obj);
	public void updateMaterialLevel(MaterialLevel obj);
	public void deleteMaterialLevel(MaterialLevel obj);
	
	//根据名称，获取记录数量
	int getCountForAdd(Map<String,Object> params);
	//根据 名称，并且不等于指定id，获取记录
	int getCountForUpdate(Map<String,Object> params);
}
