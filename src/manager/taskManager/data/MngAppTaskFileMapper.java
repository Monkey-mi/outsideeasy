package manager.taskManager.data;

import java.util.List;
import java.util.Map;

import manager.taskManager.model.MngAppTaskFile;
import manager.taskManager.taskResponse.MngTaskFile;


public interface MngAppTaskFileMapper {
	public List<MngTaskFile> getAppTaskFileList(Map<String,Object> params);
	public void addAppTaskFile(MngAppTaskFile obj);
	public void updateAppTaskFile(MngAppTaskFile obj);
	public void deleteAppTaskFile(MngAppTaskFile obj);
	
	public List<MngTaskFile> getAppTaskFileListbg(Map<String,Object> params);
	public void updateTaskFile(Map<String,Object> params);
}
