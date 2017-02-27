package common.dictionary.data;

import java.util.List;
import java.util.Map;

import common.dictionary.model.DictionaryInfo;


public interface DictionaryInfoMapper {
	public List<DictionaryInfo> getDictionaryInfoList(Map<String,Object> params);
	public void addDictionaryInfo(DictionaryInfo obj);
	public void updateDictionaryInfo(DictionaryInfo obj);
	public void deleteDictionaryInfo(DictionaryInfo obj);
	public DictionaryInfo getDictionaryInfo(String key);
}
