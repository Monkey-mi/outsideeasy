package manager.orderManager.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.orderManager.data.MngOrderAttchedFileMapper;
import manager.orderManager.model.MngOrderAttchedFile;


@Service
public class MngOrderAttchedFileService {
	@Autowired
	private MngOrderAttchedFileMapper mapper;


	public List<MngOrderAttchedFile> getMngOrderAttchedFileList(Map<String,Object> params) {
		return mapper.getMngOrderAttchedFileList(params);
	}
	public void addMngOrderAttchedFile(MngOrderAttchedFile[] arr) {
		for(MngOrderAttchedFile obj: arr) {
			mapper.addMngOrderAttchedFile(obj);
		}
	}
	public void updateMngOrderAttchedFile(MngOrderAttchedFile[] arr) {
		for(MngOrderAttchedFile obj: arr) {
			mapper.updateMngOrderAttchedFile(obj);
		}
	}
	public void deleteMngOrderAttchedFile(MngOrderAttchedFile[] arr) {
		for(MngOrderAttchedFile obj: arr) {
			mapper.deleteMngOrderAttchedFile(obj);
		}
	}
}
