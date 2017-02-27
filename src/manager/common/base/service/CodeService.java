package manager.common.base.service;

import util.Const;

import java.util.List;
import java.util.Map;

import manager.common.base.data.CodeMapper;
import manager.common.base.model.Code;
import manager.common.base.model.CodeConfig;
import manager.common.base.model.CodeType;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CodeService {
	@Autowired
	private CodeMapper codeMapper;
	
	protected static Logger logger = Logger.getLogger("service");
	
	public List<Code> getCodeList(Map<String,Object> params){
//		int total=0;
		if(params.get("mode")!=null&&params.get("mode").equals("allSearch")){
			String condition=(String) params.get("condition");
			params.put("name",'%'+condition+'%');
			List<Code> name=codeMapper.getCodeListBySearch(params);
			if(name.size()>0){
				return name;
			}
			params.remove("name");
			params.put("value",'%'+condition+'%');
			List<Code> value=codeMapper.getCodeListBySearch(params);
			if(value.size()>0){
				return value;
			}
			params.remove("value");
			params.put("code",'%'+condition+'%');
			List<Code> code=codeMapper.getCodeListBySearch(params);
			if(code.size()>0){
				return code;
			}
			params.remove("code");
		}
		else if(params.get("mode")!=null&&params.get("mode").equals("Screening")){
			String condition=(String) params.get("condition");
			if(condition!=null){
			params.put("name", '%'+condition+'%');
			List<Code> name=codeMapper.getCodeList(params);
			if(name.size()>0){
				return name;
			}else{
				params.remove("name");
				params.put("value",'%'+condition+'%');
				List<Code> value=codeMapper.getCodeList(params);
				if(value.size()>0){
					return value;
				}
				params.remove("value");
			}
			return codeMapper.getCodeList(params);
		}else{
			return codeMapper.getCodeList(params);
		}
			}
		return codeMapper.getCodeList(params);
	}
	
	/**
	 * @Description: 增加代码
	 * @param @param codes   
	 * @return void  
	 * @throws
	 * @author 华慧
	 * @date 2015-9-1
	 */
	@Transactional
	public void addCode(Code[] codes){
		for(Code code:codes){
			codeMapper.addCode(code);
		}
	}
	/**
	 * @Description: 更新代码
	 * @param @param codes   
	 * @return void  
	 * @throws
	 * @author 华慧
	 * @date 2015-9-1
	 */
	@Transactional
	public void updateCode(Code[] codes){
//		for(Code code:codes){
//			int rowNum =codeMapper.updateCode(code);
//		}
	}
	
	/**
	 * @Description: 删除代码
	 * @param @param codes   
	 * @return void  
	 * @throws
	 * @author 华慧
	 * @date 2015-9-1
	 */
	@Transactional
	public void deleteCode(Code[] codes){
		for(Code code:codes){
			codeMapper.deleteCode(code);
		}
	}
	/**
	 * 代码类型code 是否重复
	 * Request base/Codes.do?method=isExistsCodeType <br/><br/>
	 * @param params code <br/><br/>
	 * @return boolean
	 */
	public boolean isExistsCodeType(Map<String,Object> params){
		return codeMapper.getCodeTypeCount(params)>0;
	}
	/**
	 * @Description: code或者name是否重复
	 * @param @param params
	 * @param @return   
	 * @return boolean  
	 * @throws
	 * @author 华慧
	 * @date 2015-9-1
	 */
	public boolean isExistsCode(Map<String,Object> params){
		return codeMapper.getCodeCount(params)>0;
	}
	/**
	 * 根据参数获取代码数量
	 * Request base/Codes.do?method=getCodeCount <br/><br/>
	 * Response {data:int} <br/><br/>
	 * @param params c_id,type_code
	 * @return int 
	 */
	public int getCodeCount(Map<String,Object> params){
		return codeMapper.getCodeCount(params);
	}
	/**
	 * 获取代码类型
	 * Request base/Codes.do?method=getCodeTypeList <br/><br/>
	 * Response {data:[{@link CodeType}]} <br/><br/>
	 * @param params
	 * @return CodeType
	 */
	@SuppressWarnings("unchecked")
	public List<CodeType> getCodeTypeList(Map<String,Object> params){
		//由于考虑到这个方法用到的地方很多，大致有三种，后台取数，前台不带参数，前台带参数
		List<CodeType> codeType=null;
		if(params.get("basic")==null){
			return codeMapper.getCodeTypeList(params);
		}
		String flag=(String) params.get("basic");
		if(flag!=Const.YESNO_TYPE_YES){
			codeType=(List<CodeType>)BasicData.getMap().get("codeType");
		}
		if(codeType==null){
			codeType=codeMapper.getCodeTypeList(params);
			BasicData.SetCode("codeType",codeType);
		}
		return codeType;
	}
	/**
	 * 增加代码类型
	 * Request base/Codes.do?method=addCodeType <br/><br/>
	 * Response {data:[{@link CodeType}]} <br/><br/>
	 * @param codeTypes 增加代码类型 {@link CodeType}
	 */
	@Transactional
	public void addCodeType(CodeType[] codeTypes){
		for (CodeType codeType : codeTypes) {
			codeMapper.addCodeType(codeType);
		}
	}
	/**
	 * 更新代码种类
	 * Request base/Codes.do?method=updateCodeType <br/><br/>
	 * Response {data:[{@link CodeType}]} <br/><br/>
	 * @param codeTypes 更新代码种类 {@link CodeType}
	 * @throws Exception
	 */
	@Transactional
	public void updateCodeType(CodeType[] codeTypes)throws Exception{
		for (CodeType codeType : codeTypes) {
			codeMapper.updateCodeType(codeType);
		}
	}
	/**
	 * 删除代码种类
	 * Request base/Codes.do?method=deleteCodeType <br/><br/>
	 * Response {data:} <br/><br/>
	 * @param codeTypes 删除代码种类 {@link CodeType}
	 */
	@Transactional
	public void deleteCodeType(CodeType[] codeTypes){
		for (CodeType codeType : codeTypes) {
			codeMapper.deleteCodeType(codeType);
		}
	}
	
	/**
	 * @Description: 获取基础信息配置清单
	 * @param @param params
	 * @param @return   
	 * @return List<CodeConfig>  
	 * @throws
	 * @author 华慧
	 * @date 2015-9-9
	 */
	@Transactional
	public List<CodeConfig> getCodeConfigList(Map<String,Object> params){
		return codeMapper.getCodeConfigList(params);
	}
	
	/**
	 * @Description: 新增基础信息配置清单
	 * @param @param cfs   
	 * @return void  
	 * @throws
	 * @author 华慧
	 * @date 2015-9-9
	 */
	public void addCodeConfig(CodeConfig[] cfs){
		for (CodeConfig cf : cfs) {
			codeMapper.addCodeConfig(cf);
		}
	}
	/**
	 * @Description: 更新基础信息配置
	 * @param @param cfs   
	 * @return void  
	 * @throws
	 * @author 华慧
	 * @date 2015-9-9
	 */
	public void updateCodeConfig(CodeConfig[] cfs){
		for (CodeConfig cf : cfs) {
			codeMapper.updateCodeConfig(cf);
		}
	}
	/**
	 * @Description: 删除基础信息配置
	 * @param @param cfs   
	 * @return void  
	 * @throws
	 * @author 华慧
	 * @date 2015-9-9
	 */
	public void deleteCodeConfig(CodeConfig[] cfs){
		for (CodeConfig cf : cfs) {
			codeMapper.deleteCodeConfig(cf);
		}
	}
	public boolean deleteCodeConfigByCode(Map<String,Object> params) {
		try{
			codeMapper.deleteCodeConfigByCode(params);
			params.put(Const.SERVICE_CALL_RESULT, params.get("typecode"));
			return true;
		}catch(Exception e){
			params.put(Const.SERVICE_CALL_ERROR_MSG, e.getMessage());
			return false;
		}
	}
	public List<CodeType> getCodeTypeSuitList(Map<String,Object> params){
		return codeMapper.getCodeTypeSuitList(params);
	}
}
