package manager.templet.data;

import java.util.List;
import java.util.Map;

import manager.templet.model.MngAccessTempletElement;


public interface MngAccessTempletElementMapper {
	public List<MngAccessTempletElement> getMngAccessTempletElementList(Map<String,Object> params);
	public void addMngAccessTempletElement(MngAccessTempletElement obj);
	public void updateMngAccessTempletElement(MngAccessTempletElement obj);
	public void deleteMngAccessTempletElement(MngAccessTempletElement obj);
	public List<MngAccessTempletElement> getElementList(Map<String,Object> params);
}
