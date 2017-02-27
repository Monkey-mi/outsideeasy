package manager.common.codegen.data;

import java.util.List;
import java.util.Map;

import manager.common.codegen.model.CodegenRule;



public interface CodegenRuleMapper {
	public List<CodegenRule> getCodegenRuleList(Map<String,Object> params);
	public void addCodegenRule(CodegenRule obj);
	public void updateCodegenRule(CodegenRule obj);
	public void deleteCodegenRule(CodegenRule obj);
}
