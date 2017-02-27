package manager.taskManager.data;

import java.util.List;
import java.util.Map;

import manager.taskManager.model.MngProcessSection;


public interface MngProcessSectionMapper {
	public List<MngProcessSection> getMngProcessSectionList(Map<String,Object> params);
	public void addMngProcessSection(MngProcessSection obj);
	public void updateMngProcessSection(MngProcessSection obj);
	public void deleteMngProcessSection(MngProcessSection obj);
}
