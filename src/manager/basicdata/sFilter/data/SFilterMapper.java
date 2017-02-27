package manager.basicdata.sFilter.data;

import java.util.List;
import java.util.Map;

import manager.basicdata.sFilter.model.SFilter;


public interface SFilterMapper {
	public List<SFilter> getSFilterList(Map<String,Object> params);
	public void addSFilter(SFilter obj);
	public void updateSFilter(SFilter obj);
	public void deleteSFilter(SFilter obj);
	
	//根据 和路径和备注，获取记录数量
	int getCountForAdd(Map<String,Object> params);
	//根据 id和路径和备注，并且不等于指定id，获取记录
	int getCountForUpdate(Map<String,Object> params);
	//根据 id，获取记录数量
	int getXiajiCount(Map<String,Object> params);

}
