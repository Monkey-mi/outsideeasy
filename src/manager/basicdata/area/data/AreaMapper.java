package manager.basicdata.area.data;

import java.util.List;
import java.util.Map;

import manager.basicdata.area.model.Area;



public interface AreaMapper {
	public List<Area> getAreaList(Map<String,Object> params);
	public void addArea(Area obj);
	public void updateArea(Area obj);
	public void deleteArea(Area obj);
	//根据 上级id和名称，获取记录数量
	int getCountForAdd(Map<String,Object> params);
	//根据 上级id和名称，并且不等于指定id，获取记录
	int getCountForUpdate(Map<String,Object> params);
	//根据 上级id，获取记录数量
	int getXiajiCount(Map<String,Object> params);
}
