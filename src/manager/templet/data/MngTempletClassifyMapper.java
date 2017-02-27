package manager.templet.data;

import java.util.List;
import java.util.Map;

import manager.templet.model.MngTempletClassify;


public interface MngTempletClassifyMapper {
	public List<MngTempletClassify> getMngTempletClassifyList(Map<String,Object> params);
	public void addMngTempletClassify(MngTempletClassify obj);
	public void updateMngTempletClassify(MngTempletClassify obj);
	public void deleteMngTempletClassify(MngTempletClassify obj);
	public List<MngTempletClassify> getClassifyList(Map<String,Object> params);
}
