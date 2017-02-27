package manager.common.main.data;

import java.util.List;
import java.util.Map;

import manager.common.main.model.Function;
import manager.common.main.model.Module;
import manager.common.main.model.SRMLog;
import manager.common.main.model.Test;


public interface ModuleMapper {
	void addLog(SRMLog log);
	public List<SRMLog> getLogList(Map<String,Object> params);
	
	public List<Module> getSysMenuByLoginId(Map<String,Object> params);
	
	List<Module> getModuleList(Map<String,Object> params);
	void addModule(Module obj);
	void updateModule(Module obj);
	void deleteModule(Module obj);
	
	List<Module> getModuleListFilterRole(Map<String,Object> params);
	List<Function> getFuncListFilterUid(Map<String,Object> params);
	int getCountByPId(Map<String,Object> params);
	
	List<Function> getFuncList(Map<String,Object> params);
	void deleteFuncByMid(int Mid);
	void addFunction(Function func);
	void updateFunction(Function func);
	void deleteFunction(Function func);
	
	int getCountByModCode(Map<String,Object> params);
	void addTest(Test test);
}
