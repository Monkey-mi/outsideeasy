package manager.basicdata.industryClass.data;

import java.util.List;
import java.util.Map;

import manager.basicdata.industryClass.model.IndustryClass;



public interface IndustryClassMapper {
	public List<IndustryClass> getIndustryClassList(Map<String,Object> params);
	public void addIndustryClass(IndustryClass obj);
	public void updateIndustryClass(IndustryClass obj);
	public void deleteIndustryClass(IndustryClass obj);
}
