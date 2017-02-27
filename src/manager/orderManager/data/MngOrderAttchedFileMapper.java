package manager.orderManager.data;

import java.util.List;
import java.util.Map;

import manager.orderManager.model.MngOrderAttchedFile;


public interface MngOrderAttchedFileMapper {
	public List<MngOrderAttchedFile> getMngOrderAttchedFileList(Map<String,Object> params);
	public void addMngOrderAttchedFile(MngOrderAttchedFile obj);
	public void updateMngOrderAttchedFile(MngOrderAttchedFile obj);
	public void deleteMngOrderAttchedFile(MngOrderAttchedFile obj);
}
