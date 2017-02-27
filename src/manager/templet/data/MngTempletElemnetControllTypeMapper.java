package manager.templet.data;

import java.util.List;
import java.util.Map;

import manager.templet.model.MngTempletElemnetControllType;


public interface MngTempletElemnetControllTypeMapper {
	public List<MngTempletElemnetControllType> getMngTempletElemnetControllTypeList(Map<String,Object> params);
	public void addMngTempletElemnetControllType(MngTempletElemnetControllType obj);
	public void updateMngTempletElemnetControllType(MngTempletElemnetControllType obj);
	public void deleteMngTempletElemnetControllType(MngTempletElemnetControllType obj);
	public List<MngTempletElemnetControllType> getelTypeList(Map<String,Object> params);
}
