package common.dictionary.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import common.dictionary.data.DictionaryInfoMapper;
import common.dictionary.model.DictionaryInfo;


@Service
public class DictionaryInfoService {
	@Autowired
	private DictionaryInfoMapper mapper;


	public List<DictionaryInfo> getDictionaryInfoList(Map<String,Object> params) {
		return mapper.getDictionaryInfoList(params);
	}
	public void addDictionaryInfo(DictionaryInfo[] arr) {
		for(DictionaryInfo obj: arr) {
			mapper.addDictionaryInfo(obj);
		}
	}
	public void updateDictionaryInfo(DictionaryInfo[] arr) {
		for(DictionaryInfo obj: arr) {
			mapper.updateDictionaryInfo(obj);
		}
	}
	public void deleteDictionaryInfo(DictionaryInfo[] arr) {
		for(DictionaryInfo obj: arr) {
			mapper.deleteDictionaryInfo(obj);
		}
	}
	/**
	* @Description:根据key值查询出 value
	* DictionaryInfoService
	* getDictionaryInfo
	* @param key
	* @return DictionaryInfo
	* @author chenlong
	* 2016-8-11 下午4:42:49
	 */
	public DictionaryInfo getDictionaryInfo(String key) {
		return mapper.getDictionaryInfo(key);
	}
}
