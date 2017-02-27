package manager.common.codegen.data;

import java.util.List;
import java.util.Map;

import manager.common.codegen.model.CgrDetail;



public interface CgrDetailMapper {
	public List<CgrDetail> getCgrDetailList(Map<String,Object> params);
	public void addCgrDetail(CgrDetail obj);
	public void updateCgrDetail(CgrDetail obj);
	public void deleteCgrDetail(CgrDetail obj);
}
