package manager.common.codegen.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import manager.common.codegen.data.BaseSeqMapper;
import manager.common.codegen.data.CgrDetailMapper;
import manager.common.codegen.data.CodegenRuleMapper;
import manager.common.codegen.model.BaseSeq;
import manager.common.codegen.model.CgrDetail;
import manager.common.codegen.model.CodegenRule;

import org.apache.commons.lang.time.DateFormatUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import util.Const;
import util.WebUtil;

/**该服务类，必须单例，并且，不允许相同代码共用一个数据库，否则错误
 *  值=值+步长
 *  关于跳跃：指的是，一段值在内存中计算，不从数据库读取，减少数据库访问
 *  如果重启，使用下一段，不会重复
 *  map中，每条序号生成规则加载了，会一直存在，并对应有
 *  keyCode--value有：
 *  cgr_code_*  -  CgrClass  用于整体
 *  cgr_id_     -  CgrClass  用于整体
 *  cgr_instcode_ - BaseSeq  用于序号计数
 *   */
@Service
public class BaseSeqService {
	class CgrClass{
		private int cgrId;
		private List<CgrDetail> cgrdList;
		private CgrDetail incrCgrDetail;
		public void setCgrId(int cgrId) {
			this.cgrId = cgrId;
		}
		public int getCgrId() {
			return cgrId;
		}
		public void setCgrdList(List<CgrDetail> cgrdList) {
			this.cgrdList = cgrdList;
		}
		public List<CgrDetail> getCgrdList() {
			return cgrdList;
		}
		public void setIncrCgrDetail(CgrDetail cgrDetail) {
			this.incrCgrDetail = cgrDetail;
		}
		public CgrDetail getIncrCgrDetail() {
			return incrCgrDetail;
		}
		
	}
	@Autowired
	private BaseSeqMapper mapper;
	@Autowired
	private	CodegenRuleMapper cgrMapper;
	@Autowired
	private CgrDetailMapper cgrdMappper;
	private Map<String,Object> cgrMap = new HashMap<String,Object>();//key有好几类，不同种类的key获取的对象类型不同
	protected static Logger logger = Logger.getLogger("service");
	public List<BaseSeq> getBaseSeqList(Map<String,Object> params) {
		return mapper.getBaseSeqList(params);
	}
	public void addBaseSeq(BaseSeq[] arr) {
		for(BaseSeq obj: arr) {
			mapper.addBaseSeq(obj);
		}
	}
	public void updateBaseSeq(BaseSeq[] arr) {
		for(BaseSeq obj: arr) {
			mapper.updateBaseSeq(obj);
		}
	}
	public void deleteBaseSeq(BaseSeq[] arr) {
		for(BaseSeq obj: arr) {
			mapper.deleteBaseSeq(obj);
		}
	}
	/**
	 * 根据规则ID获得一个最新的序列值
	 * @param cgrId	 编码规则id
	 * @param instCode	 编码规则实例代码
	 * @return 序列值 根据条件正/负都可能  如果不存在返回0
	 */
	private int getBaseSeqByCgrInst(int cgrId,String instCode){
			String keyCode = "cgr_instcode_"+String.valueOf(cgrId)+"_"+instCode;
			BaseSeq curBS=(BaseSeq)cgrMap.get(keyCode);
			
			//只有在首次或者本次跳跃步进值已经使用完毕的情况下才会
			//请求下一次跳跃步进，这样不必每次都要项数据库发起请求，提高系统性能
			//且跳跃步进step_jmp越大那么需要请求次数越少
			//如果程序重启，会跳过已经用过的那一段跳跃
			if(curBS==null || curBS.getJmp_len() <0){
				curBS=this.getBaseSeqByCgrInstB(cgrId,instCode);
				if(curBS==null)
					return 0;
				else
					cgrMap.put(keyCode, curBS);
			}
			int seqValue = curBS.getJmp_value();
			//在本跳远段内自增
			curBS.setJmp_value(seqValue+curBS.getStep());
			curBS.setJmp_len(curBS.getJmp_len() -1);
			return seqValue;
	}
	
	/**
	 * 根据code得到简单编码规则的编码结果
	 * @param paramsMap 接受参数： code --编码规则代码,inst_code --实例代码,user_params --逗号分开的一组用户参数
	 * @return 得到一个新的编码结果
	 */
	public boolean getSimpleCgrByCode(Map<String,Object> paramsMap){
		String callErrMsg = "";
		paramsMap.put(Const.SERVICE_CALL_ERROR_MSG,callErrMsg);
		paramsMap.put(Const.SERVICE_CALL_RESULT,"");
		try{
			Object dataObj = paramsMap.get("code");
			if(WebUtil.isEmpty(dataObj)){
				paramsMap.put(Const.SERVICE_CALL_ERROR_MSG,"未指定调用参数[code]");
				return false;
			}
			String cgrCode = dataObj.toString();
			String instCode = paramsMap.get("instCode")!=null?paramsMap.get("instCode").toString():"default";
			String [] userParams = paramsMap.get("user_params")!=null?paramsMap.get("user_params").toString().split(","):new String[0];
			String retCode = this.getSeqCodeBycgrCodeEx(cgrCode,instCode,userParams);
			if(WebUtil.isEmpty(retCode)){
				paramsMap.put(Const.SERVICE_CALL_ERROR_MSG,"不存在的编码规则或未正确定义!");
				return false;
			}
			paramsMap.put(Const.SERVICE_CALL_ERROR_MSG,"执行完成!");
			paramsMap.put(Const.SERVICE_CALL_RESULT,retCode);
		}catch(Exception e){
			paramsMap.put(Const.SERVICE_CALL_ERROR_MSG,e.getMessage());
			return false;
		}
		return true;
	}
	/**
	 * 根据规则ID获得一个最新的序列值
	 * @param cgrId 编码规则ID
	 * @return BaseSeq 如果不存在返回null
	 */
	private BaseSeq getBaseSeqByCgrInstB(int cgrId,String instCode){
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("cgr_id", cgrId);
		params.put("inst_code", instCode);
		logger.debug(String.format("cgr_id=[%d],inst_code=[%s]", cgrId,instCode));
		List<BaseSeq> bsList = mapper.getBaseSeqList(params);
		if(bsList.size()==0){
			//如果不存在该实例，则需新增一个
			String keyID = "cgr_id_"+String.valueOf(cgrId)+"_cgr_id";
			CgrClass cgrClass = (CgrClass)cgrMap.get(keyID);
			BaseSeq baseSeq = new BaseSeq();
			BeanUtils.copyProperties(cgrClass.getIncrCgrDetail(),baseSeq);
			baseSeq.setId(0);
			baseSeq.setInst_code(instCode);
			mapper.addBaseSeq(baseSeq);
		}
		//自增(减)，这里保证了重启项目，会使用下一个跳跃段
		mapper.incSeq(params);
		//返回当前Seq
		bsList = mapper.getBaseSeqList(params);
		return bsList.size()>0?bsList.get(0):null;
	}
	
	/**
	 * 根据规则code和实例code获得一个最新的编码
	 * @param cgrCode  规则代码
	 * @param instCode  实例代码
	 * @param userParams 用户参数,可以有多个(根据实际情况来)
	 * @return 返回一个新的编码，有错则返回空串  
	 */
	@Transactional
	public String getSeqCodeBycgrCodeEx(String cgrCode,String instCode,String ...userParams){
		synchronized(cgrMap){
			StringBuilder retCode =new StringBuilder();
			String keyCode = "cgr_code_"+cgrCode+"_cgr_code";
			//1.取得规则并缓存于，以后需要考虑分布式部署
			CgrClass cgrClass = (CgrClass)cgrMap.get(keyCode);
			int cgrId =0;
			List<CgrDetail> cgrdList = null;
			if(cgrClass==null){
				Map<String,Object> paramsMap = new HashMap<String,Object>();
				paramsMap.put("code", cgrCode);
				List<CodegenRule> cgrList=cgrMapper.getCodegenRuleList(paramsMap);
				if(cgrList.size()<=0)
					return "";
				
				cgrId =cgrList.get(0).getCgr_id();
				String keyID = "cgr_id_"+String.valueOf(cgrId)+"_cgr_id";
				paramsMap.clear();
				paramsMap.put("cgr_id", cgrId);
				cgrdList =cgrdMappper.getCgrDetailList(paramsMap);
				if(cgrdList.size()<=0)
					return "";
				cgrClass = new CgrClass();
				cgrClass.setCgrId(cgrId);
				cgrClass.setCgrdList(cgrdList);
				
				cgrMap.put(keyCode, cgrClass);
				cgrMap.put(keyID, cgrClass);
			}else{
				cgrId = cgrClass.getCgrId();
				cgrdList = cgrClass.getCgrdList();
			}
			
			//2.按照编码组成部分构造
			int userParamIdx =0; 
			String strCode ="";
			for (CgrDetail cgrDetail : cgrdList) {
				strCode ="";
				String codePart = cgrDetail.getCode();
				int codeLen = cgrDetail.getLen();
				int subS = cgrDetail.getIs_substr()!=null&&cgrDetail.getIs_substr().equals(Const.YESNO_TYPE_YES)?cgrDetail.getSub_start()-1:0;
				if(codePart.equals(Const.CODEPART_TYPE_SYSDATE)){
					//格式化日期，截取
					strCode=DateFormatUtils.format(new Date(), cgrDetail.getDate_format());
					strCode = strCode.substring(subS,subS+codeLen);
				}else if(codePart.equals(Const.CODEPART_TYPE_INCRSEQ)){
					//取得序列号再格式化
					cgrClass.setIncrCgrDetail(cgrDetail);
					long seq = this.getBaseSeqByCgrInst(cgrId,instCode);
					strCode =String.format("%1$0"+codeLen+"d", seq);
				}else if(codePart.equals(Const.CODEPART_TYPE_FIXEDTEXT)){
					//固定文本截取
					strCode = cgrDetail.getFixed_text();
					strCode = strCode.substring(subS,subS+codeLen);
				}if(codePart.equals(Const.CODEPART_TYPE_USERPARAM)){
					//用户参数
					if(userParams.length>0 && userParamIdx<=userParams.length-1){
						//只有提供了用户参数，且当前次序不超过范围时
						//最终结果不允许有空格存在，空格将全部被替换成0
						strCode = String.format("%-"+codeLen+"s",userParams[userParamIdx]).substring(0,codeLen).replace(' ', '0');
					}
					userParamIdx++;	
				}
				retCode.append(strCode);	
			}
			return retCode.toString();
		}
	}
	
	public boolean getCGRStatus(Map<String,Object> paramsMap){
		List<CodegenRule> cgrList = cgrMapper.getCodegenRuleList(paramsMap);
		if(cgrList.size()<=0){
			return false;
		}
		else
			return Const.YESNO_TYPE_YES.equals(cgrList.get(0).getIs_valid());
	}
	/**
	 * 清理编码规则缓存
	 * @param paramsMap 接受参数 cgrId,cgrCode
	 * @return true--执行完成   false--有错
	 * @throws Exception
	 */
	public boolean clearCgrCacheSrv(Map<String,Object> paramsMap) throws Exception{
		String callErrMsg = "";
		paramsMap.put(util.Const.SERVICE_CALL_ERROR_MSG,callErrMsg);
		paramsMap.put(util.Const.SERVICE_CALL_RESULT,"");
		try{
			Object cgrCodeObj = paramsMap.get("code");
			if(WebUtil.isEmpty(cgrCodeObj)){
				paramsMap.put(util.Const.SERVICE_CALL_ERROR_MSG,"未指定调用参数[code]");
				return false;
			}
			String cgrCode = cgrCodeObj.toString();
			this.clearCgrCache(cgrCode);
			callErrMsg="清理完成!";
			paramsMap.put(util.Const.SERVICE_CALL_RESULT,true);
			paramsMap.put(util.Const.SERVICE_CALL_ERROR_MSG,callErrMsg);
		}catch(Exception e){
			paramsMap.put(util.Const.SERVICE_CALL_ERROR_MSG,e.getMessage());
			return false;
		}
		return true;
	}
	/**
	 * 清理编码规则缓存
	 * @param cgrId ,cgrCode
	 * @throws Exception
	 */
	public void clearCgrCache(String cgrCode)throws Exception{
		Map<String,Object> paramsMap = new HashMap<String,Object>();
		paramsMap.put("code", cgrCode);
		List<CodegenRule> cgrList = cgrMapper.getCodegenRuleList(paramsMap);
		if(cgrList.size()<=0){
			throw new Exception(String.format("不存在代码=[%s]的规则!", cgrCode));
		}
		int cgrId = cgrList.get(0).getCgr_id();
		synchronized(this.cgrMap){
			Set<String> key = this.cgrMap.keySet();
			String[] keys = key.toArray(new String[]{});
			for (String keyStr : keys) {
				logger.debug(String.format("keyStr=[%s]",keyStr));
				if(keyStr.startsWith("cgr_id_"+String.valueOf(cgrId)+"_cgr_id")
					||keyStr.startsWith("cgr_instcode_"+String.valueOf(cgrId))
						||keyStr.startsWith("cgr_code_"+cgrCode+"_cgr_code")){
					this.cgrMap.remove(keyStr);
					logger.debug(String.format("keyStr=[%s] is removed!",keyStr));
				}
			}
		}
	}
	
}
