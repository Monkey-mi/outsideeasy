package manager.basicdata.checkFactory.data;

import java.util.List;
import java.util.Map;

import manager.basicdata.checkFactory.model.CheckFactory;


public interface CheckFactoryMapper {
	public List<CheckFactory> getCheckFactoryList(Map<String,Object> params);
	public void addCheckFactory(CheckFactory obj);
	public void updateCheckFactory(CheckFactory obj);
	public void deleteCheckFactory(CheckFactory obj);
}
