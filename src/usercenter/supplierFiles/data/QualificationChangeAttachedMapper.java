package usercenter.supplierFiles.data;

import java.util.List;
import java.util.Map;

import usercenter.supplierFiles.model.QualificationChangeAttached;


public interface QualificationChangeAttachedMapper {
	public List<QualificationChangeAttached> getQualificationChangeAttachedList(Map<String,Object> params);
	public void addQualificationChangeAttached(Map<String,Object> params);
	public void updateQualificationChangeAttached(Map<String,Object> params);
	public void deleteQualificationChangeAttached(Map<String,Object> params);
}
