package manager.common.codegen.service;

import java.util.List;
import java.util.Map;

import manager.common.codegen.data.CodegenRuleMapper;
import manager.common.codegen.model.CodegenRule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class CodegenRuleService {
	@Autowired
	private CodegenRuleMapper mapper;
	
	public boolean getCGRExists(Map<String,Object> params){
		return mapper.getCodegenRuleList(params).size()>0;
	}
	
	public List<CodegenRule> getCodegenRuleList(Map<String,Object> params) {
		return mapper.getCodegenRuleList(params);
	}
	public void addCodegenRule(CodegenRule[] arr) {
		for(CodegenRule obj: arr) {
			mapper.addCodegenRule(obj);
		}
	}
	public void updateCodegenRule(CodegenRule[] arr) {
		for(CodegenRule obj: arr) {
			mapper.updateCodegenRule(obj);
		}
	}
	public void deleteCodegenRule(CodegenRule[] arr) {
		for(CodegenRule obj: arr) {
			mapper.deleteCodegenRule(obj);
		}
	}
}
