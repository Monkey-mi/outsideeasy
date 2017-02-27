package manager.taskManager.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import common.mongodb.service.FileOptService;

import manager.taskManager.data.MngAppTaskFileMapper;
import manager.taskManager.model.MngAppTaskFile;
import manager.taskManager.taskResponse.MngTaskFile;


@Service
public class MngAppTaskFileService {
	@Autowired
	private MngAppTaskFileMapper mapper;
	@Autowired
	private FileOptService fileService;


	public List<MngTaskFile> getAppTaskFileList(Map<String,Object> params) {
		return mapper.getAppTaskFileList(params);
	}
	public void addAppTaskFile(MngAppTaskFile[] arr) {
		for(MngAppTaskFile obj: arr) {
			mapper.addAppTaskFile(obj);
		}
	}
	public void updateAppTaskFile(MngAppTaskFile[] arr) {
		for(MngAppTaskFile obj: arr) {
			mapper.updateAppTaskFile(obj);
		}
	}
	public void deleteAppTaskFile(MngAppTaskFile[] arr) {
		for(MngAppTaskFile obj: arr) {
			if(obj.getObject_id() != null){
				fileService.deleteFileByName(obj.getObject_id());//删除文件表中的文件
				}
			mapper.deleteAppTaskFile(obj);
		}
	}
	
	/**
	 * 查询与任务列表相关的数据
	 * @param params t_id
	 * @return  List<MngTaskFile>
	 * @author chenlong
	 * @date 2016-04-15
	 */
	public List<MngTaskFile> getAppTaskFileListbg(Map<String,Object> params) {
		return mapper.getAppTaskFileListbg(params);
	}
	/**
	 * 更新文件增加和删除
	 * @param params tf_id,object_id
	 * @author chenlong
	 * @date 2016-04-15
	 */
	public void updateTaskFile(Map<String,Object> params) {
		 mapper.updateTaskFile(params);
	}
}
