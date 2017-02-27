package manager.basicdata.materialClass.data;

import java.util.List;
import java.util.Map;

import manager.basicdata.materialClass.model.MaterialClass;



public interface MaterialClassMapper {
	public List<MaterialClass> getMaterialClassList(Map<String,Object> params);
	public void addMaterialClass(MaterialClass obj);
	public void updateMaterialClass(MaterialClass obj);
	public void deleteMaterialClass(MaterialClass obj);
	//根据父级Id获取材料类别集合
	public List<MaterialClass> getMaterialClassListByFid(Map<String,Object> params);
	
	//根据 上级id和名称，获取记录数量
	int getCountForAdd(Map<String,Object> params);
	//根据 上级id和名称，并且不等于指定id，获取记录
	int getCountForUpdate(Map<String,Object> params);
	//根据 上级id，获取记录数量
	int getXiajiCount(Map<String,Object> params);
	//被引用的数量
	int getCountBylevel(Map<String,Object> params);
}
