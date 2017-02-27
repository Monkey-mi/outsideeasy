package manager.common.base.data;


import java.util.List;
import java.util.Map;

import manager.common.base.model.Code;
import manager.common.base.model.CodeConfig;
import manager.common.base.model.CodeType;



public interface CodeMapper {
	List<Code> getCodeListBySearch(Map<String,Object> params);
	List<Code> getCodeList(Map<String,Object> params);
	int getCodeCount(Map<String,Object> params);
	void addCode(Code code);
	int updateCode(Code code);
	void deleteCode(Code code);
	
	List<CodeType> getCodeTypeList(Map<String,Object> params);
	void addCodeType(CodeType codeType);
	//void addCodeType_Oracle(CodeType codeType);
	void updateCodeType(CodeType codeType);
	void deleteCodeType(CodeType codeType);
	
	List<CodeConfig> getCodeConfigList(Map<String,Object> params);
	void addCodeConfig(CodeConfig obj);
	void updateCodeConfig(CodeConfig obj);
	void deleteCodeConfig(CodeConfig obj);
	List<CodeType> getCodeTypeSuitList(Map<String,Object> params);
	void deleteCodeConfigByCode(Map<String,Object> params);
	int getCodeTypeCount(Map<String,Object> params);
}
