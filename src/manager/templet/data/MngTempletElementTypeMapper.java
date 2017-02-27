package manager.templet.data;

import java.util.List;
import java.util.Map;

import manager.templet.model.MngTempletElementType;


public interface MngTempletElementTypeMapper {
	public List<MngTempletElementType> getMngTempletElementTypeList(Map<String,Object> params);
	public void addMngTempletElementType(MngTempletElementType obj);
	public void updateMngTempletElementType(MngTempletElementType obj);
	public void deleteMngTempletElementType(MngTempletElementType obj);
	public List<MngTempletElementType> getTypeList(Map<String,Object> params);
}
