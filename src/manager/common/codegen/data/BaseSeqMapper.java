package manager.common.codegen.data;

import java.util.List;
import java.util.Map;

import manager.common.codegen.model.BaseSeq;



public interface BaseSeqMapper {
	public List<BaseSeq> getBaseSeqList(Map<String,Object> params);
	public void addBaseSeq(BaseSeq obj);
	public void updateBaseSeq(BaseSeq obj);
	public void deleteBaseSeq(BaseSeq obj);
	public void incSeq(Map<String,Object> params);
}
