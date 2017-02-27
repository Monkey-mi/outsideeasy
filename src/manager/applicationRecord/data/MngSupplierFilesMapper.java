package manager.applicationRecord.data;

import java.util.List;
import java.util.Map;

import manager.applicationRecord.model.MngSupplierFiles;


public interface MngSupplierFilesMapper {
	public List<MngSupplierFiles> getMngSupplierFilesList(Map<String,Object> params);
	public void addMngSupplierFiles(MngSupplierFiles obj);
	public void updateMngSupplierFiles(MngSupplierFiles obj);
	public void deleteMngSupplierFiles(MngSupplierFiles obj);
	public void UpdateMngSupplierFileState(Map<String,Object> params);
}
