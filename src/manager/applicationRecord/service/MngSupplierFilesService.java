package manager.applicationRecord.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.applicationRecord.data.MngSupplierFilesMapper;
import manager.applicationRecord.model.MngSupplierFiles;


@Service
public class MngSupplierFilesService {
	@Autowired
	private MngSupplierFilesMapper mapper;

    /**
    * @Description:供应商档案的插入一条记录
    * MngSupplierFilesService
    * getMngSupplierFilesList
    * @param params
    * @return List<MngSupplierFiles>
    * @author chenlong
    * 2016-8-4 上午11:37:16
     */
	public List<MngSupplierFiles> getMngSupplierFilesList(Map<String,Object> params) {
		return mapper.getMngSupplierFilesList(params);
	}
	public void addMngSupplierFiles(MngSupplierFiles[] arr) {
		for(MngSupplierFiles obj: arr) {
			mapper.addMngSupplierFiles(obj);
		}
	}
	public void updateMngSupplierFiles(MngSupplierFiles[] arr) {
		for(MngSupplierFiles obj: arr) {
			mapper.updateMngSupplierFiles(obj);
		}
	}
	public void deleteMngSupplierFiles(MngSupplierFiles[] arr) {
		for(MngSupplierFiles obj: arr) {
			mapper.deleteMngSupplierFiles(obj);
		}
	}
	/**
	* @Description:
	* MngSupplierFilesService 根据准入申请流水号的ID，更新档案表中的状态
	* UpdateMngSupplierFileState
	* @param params void
	* @author chenlong
	* 2016-8-4 下午3:38:16
	 */
	public void UpdateMngSupplierFileState(Map<String,Object> params){
		mapper.UpdateMngSupplierFileState(params);
	}
}
