package platform.contract.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform.contract.data.PfOrderAttchedFileMapper;
import platform.contract.model.PfOrderAttchedFile;


@Service
public class PfOrderAttchedFileService {
	@Autowired
	private PfOrderAttchedFileMapper mapper;


	public List<PfOrderAttchedFile> getPfOrderAttchedFileList(Map<String,Object> params) {
		return mapper.getPfOrderAttchedFileList(params);
	}
	public void addPfOrderAttchedFile(PfOrderAttchedFile obj) {
			mapper.addPfOrderAttchedFile(obj);
	}
	public void updatePfOrderAttchedFile(PfOrderAttchedFile[] arr) {
		for(PfOrderAttchedFile obj: arr) {
			mapper.updatePfOrderAttchedFile(obj);
		}
	}
	public void deletePfOrderAttchedFile(PfOrderAttchedFile[] arr) {
		for(PfOrderAttchedFile obj: arr) {
			mapper.deletePfOrderAttchedFile(obj);
		}
	}
}
