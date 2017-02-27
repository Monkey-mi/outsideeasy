package platform.contract.data;

import java.util.List;
import java.util.Map;

import platform.contract.model.PfOrderAttchedFile;


public interface PfOrderAttchedFileMapper {
	public List<PfOrderAttchedFile> getPfOrderAttchedFileList(Map<String,Object> params);
	public void addPfOrderAttchedFile(PfOrderAttchedFile obj);
	public void updatePfOrderAttchedFile(PfOrderAttchedFile obj);
	public void deletePfOrderAttchedFile(PfOrderAttchedFile obj);
}
