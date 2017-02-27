package manager.taskManager.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import common.mongodb.service.FileOptService;

import manager.taskManager.data.MngAppQcMapper;
import manager.taskManager.model.MngAppQc;
import manager.taskManager.taskResponse.MngTaskQc;


@Service
public class MngAppQcService {
	@Autowired
	private MngAppQcMapper mapper;
	@Autowired
	private FileOptService fileService;


	public List<MngAppQc> getAppQcList(Map<String,Object> params) {
		return mapper.getAppQcList(params);
	}
	public void addAppQc(MngAppQc[] arr) {
		for(MngAppQc obj: arr) {
			mapper.addAppQc(obj);
		}
	}
	public void updateAppQc(MngAppQc[] arr) {
		for(MngAppQc obj: arr) {
			mapper.updateAppQc(obj);
		}
	}
	public void deleteAppQc(MngAppQc[] arr) {
		for(MngAppQc obj: arr) {
			if(obj.getQc_file() != null){
			fileService.deleteFileByName(obj.getQc_file());//删除质检中的附件
			}
			mapper.deleteAppQc(obj);
		}
	}
	/**
	 * 查询与任务列表相关的数据
	 * @param params t_id
	 * @return List<MngAppQc>
	 * @author chenlong
	 * @date 2016-04-05
	 */
	public List<MngTaskQc> getAppQcListbg(Map<String,Object> params) {
		return mapper.getAppQcListbg(params);
	}
	/**
	 * 更新附件
	 * @param params
	 */
	public  void updateQcFile(Map<String,Object> params){
		mapper.updateQcFile(params);
	}
}
