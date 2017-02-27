package manager.taskManager.data;

import java.util.List;
import java.util.Map;

import manager.taskManager.model.MngAppTaskBom;


public interface MngAppTaskBomMapper {
	public List<MngAppTaskBom> getAppTaskBomList(Map<String,Object> params);
	public void addAppTaskBom(MngAppTaskBom obj);
	public void updateAppTaskBom(MngAppTaskBom obj);
	public void deleteAppTaskBom(MngAppTaskBom obj);
	public List<MngAppTaskBom> getAppTaskBomListbg(Map<String,Object> params);
}
