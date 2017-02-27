package usercenter.supplierFiles.data;

import java.util.List;
import java.util.Map;

import usercenter.supplierFiles.model.QualificationChange;


public interface QualificationChangeMapper {
	public List<QualificationChange> getQualificationChangeList(Map<String,Object> params);
	public void addQualificationChange(Map<String,Object> params);
	public void updateQualificationChange(Map<String,Object> params);
	public void deleteQualificationChange(Map<String,Object> params);
}
