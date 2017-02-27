package manager.basicdata.file.data;

import java.util.List;
import java.util.Map;

import manager.basicdata.file.model.MngBaseFileType;


public interface MngBaseFileTypeMapper {
	public List<MngBaseFileType> getMngBaseFileTypeList(Map<String,Object> params);
	public void addMngBaseFileType(MngBaseFileType obj);
	public void updateMngBaseFileType(MngBaseFileType obj);
	public void deleteMngBaseFileType(MngBaseFileType obj);
	public int getCountForAdd(Map<String,Object> params);
	public int getCountForUpdate(Map<String,Object> params);
	public int getXiajiCount(Map<String,Object> params);
}
