package util;

import java.io.File;
import java.lang.reflect.Array;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import manager.common.base.model.Code;
import manager.common.base.service.CodeService;
import manager.common.main.model.SRMLog;
import manager.common.user.model.UserInfo;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.context.ApplicationContext;

import common.user.model.LoginAccount;

import util.db.DBUtil;
import util.web.IServiceLog;


public class WebUtil {
	private static final String BuildNo = "V2.10-BNO20140401";
	private static final String QRY_PARAMS = "QRY_PARAMS";
	private static final String IS_URDMETHOD = "IS_URDMETHOD";
	private static ObjectMapper objectMapper = null;
	private static ApplicationContext appCtx;
	private static ApplicationContext appCtxPlatForm;
	private static Map<String, ApplicationContext> appCtxMap = new HashMap<String, ApplicationContext>();
	
	private static String DB_TYPE = Const.DB_TYPE_MYSQL;
	private static Properties jdbcProperties;
	private static boolean inited = true;
//	private static Logger logger = Logger.getLogger("service");
	
	private static SysLogger syslogger =null;
	
	private static boolean debug;
	
	private static boolean needVCode;
	
		
	public static ObjectMapper getObjectMapper() {
		return objectMapper;
	}

	public static void setObjectMapper(ObjectMapper objectMapper) {
		WebUtil.objectMapper = objectMapper;
	}

	public  static boolean existsFile(String fileName){
		String loaderPath=Thread.currentThread().getContextClassLoader().getResource("").getPath();
		loaderPath = loaderPath.endsWith("/")?loaderPath.replace("/WEB-INF/classes/", ""):loaderPath.replace("/WEB-INF/classes", "");
		loaderPath = (fileName.startsWith("/")?loaderPath:loaderPath+"/")+fileName;
		File file=new File(loaderPath);
		return file.exists();
	}

	public static void doWithKeyEntry(){
		//检查DEBUG状态
		String ktp = "DEV";
		//KeyType为=Dev的都是开发用狗
		if(ktp.equals("DEV")){
			setDebug(true);
		}
	}
	
	
	/**
	 * 判断对象是否Empty(null或元素为0)<br>
	 * 实用于对如下对象做判断:String Collection及其子类 Map及其子类
	 * 
	 * @param pObj
	 *            待检查对象
	 * @return boolean 返回的布尔值
	 */
	public static <T> boolean isEmpty(T pObj) {
		if (pObj == null)
			return true;
		if (pObj == "")
			return true;
		if (pObj instanceof String) {
			if (((String) pObj).length() == 0) {
				return true;
			}
		} else if (pObj instanceof Collection<?>) {
			if (((Collection<?>) pObj).size() == 0) {
				return true;
			}
		} else if (pObj instanceof Map<?,?>) {
			if (((Map<?,?>) pObj).size() == 0) {
				return true;
			}
		}
		return false;
	}
	public static Object getJavaBeanByMap(Map<String,Object> params,@SuppressWarnings("rawtypes") Class c){
		Object o = null;
		try {
			o = c.newInstance();
		Method[] methods=c.getMethods();
		for(Method method:methods){
			String methodName=method.getName();
			if(methodName.startsWith("set")){
				String propertyName=methodName.substring(3).toLowerCase(Locale.getDefault());
				Object value=params.get(propertyName);
				if(value!=null){
					method.invoke(o, value.getClass().cast(value));
				}
			}
		}
		}catch(Exception e){
			e.printStackTrace();
		}
		return o;
	}
	/**
	 * 根据给定的系统参数代码取得当前的设定值
	 * @param paramCode 系统参数代码
	 * @return 系统参数设定值，如果没有查到则返回空串
	 */
	public static String getSysParameter(String paramCode){
		String paramValue="";
		CodeService codeService = (CodeService)appCtx.getBean(Const.CODESERVICE);
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("type_code", Const.SYS_PARAMETERS);
		params.put("type_attrib", Const.TYPE_ATTRIB_SYS);
		params.put("code", paramCode);
		List<Code> codeList = codeService.getCodeList(params);
		if(codeList.size()>0){
			paramValue = codeList.get(0).getValue();
		}
		return paramValue;
	}
	
	
	/*
	 * 标准的ResponseMap结构如下
	 * {
	 * 		success:true,
	 * 		ajaxErrorCode:AJAX_ERR_CODE_100_OK,
	 * 		message:'',
	 * 		data:'',
	 * 		total:0
	 * }
	 */
	public static Map<String,Object> getDefaultResponseMap(){
		Map<String,Object> respMap = new HashMap<String,Object>();
		respMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		respMap.put(Const.AJAX_SERVICE_MESSAGE,Const.AJAX_COMPLETE_MSG);
		respMap.put(Const.AJAX_SERVICE_TOTAL,0);
		respMap.put(Const.AJAX_ERR_CODE,Const.AJAX_ERR_CODE_200_OK);
		respMap.put(Const.AJAX_DATA_ROOT, "");
		return respMap;
	}
	//从Request中一次读取参数到Map中
	public static Map<String,Object> getDefaultParamsMap(HttpServletRequest request){
		Map<String,Object> paramMap = new HashMap<String,Object>();
		@SuppressWarnings("unchecked")
		Enumeration<String> pNames = request.getParameterNames();
		while(pNames.hasMoreElements()){
			String pName =pNames.nextElement();
			paramMap.put(pName, request.getParameter(pName));
		}
		//清除掉几个非查询参数
		paramMap.remove(Const.AJAX_SERVICE_METHOD);
		paramMap.remove(Const.AJAX_SERVICE_MODEL);
		paramMap.remove(Const.VALIDATE_VTEXT0);
		paramMap.remove(Const.VALIDATE_VTEXT1);
		paramMap.remove(Const.VALIDATE_FIELDS);
		paramMap.remove(Const.AJAX_DATA_ROOT);
		
		return paramMap;
	}
	//从Request中一次读取参数到Map中
	public static Map<String,Object> getServiceParamsMap(HttpServletRequest request){
		Map<String,Object> paramMap = new HashMap<String,Object>();
		@SuppressWarnings("unchecked")
		Enumeration<String> pNames = request.getParameterNames();
		while(pNames.hasMoreElements()){
			String pName =pNames.nextElement();
			paramMap.put(pName, request.getParameter(pName));
		}
		//清除掉几个参数
		paramMap.remove(Const.AJAX_SERVICE_METHOD);
		paramMap.remove(Const.AJAX_SERVICE_MODEL);
		paramMap.remove(Const.VALIDATE_VTEXT0);
		paramMap.remove(Const.VALIDATE_VTEXT1);
		paramMap.remove(Const.VALIDATE_FIELDS);
		return paramMap;
	}
	
	//产生标准错误消息
	public static void makeErrorMsg(Exception e,Map<String,Object> respMap){
		StringBuilder sb = new StringBuilder();
		sb.append("错误发生在:<br/>");
		StackTraceElement[] stacks = e.getStackTrace();
		for(StackTraceElement stack:stacks){
			sb.append(stack.toString()).append("<br/>");
		}
		sb.append("错误详情:<br/>");
		sb.append(e.getMessage());
		respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
		respMap.put(Const.AJAX_SERVICE_MESSAGE,sb.toString());
	}
	
	@SuppressWarnings("unchecked")
	private static  <T>  boolean DynamicCall(Object bizService,Map<String,Object> paramMap,Map<String,Object> respMap)throws Exception{
		String callMethod =paramMap.get(Const.AJAX_SERVICE_METHOD)!=null?paramMap.get(Const.AJAX_SERVICE_METHOD).toString():"";
		boolean isCUDMethod = paramMap.get(IS_URDMETHOD)!=null?(Boolean)paramMap.get(IS_URDMETHOD):false;
		//找到目标方法，
		//这里约定: 	1.所需的服务的方法都只有一个Map类型的参数
		//         	2.C.U.D方法建议分别以add/update/delete开头
		Class<T[]> modelArrayType = null;
		Method tarMethod = null;
		boolean isArrayParam = false;
		//根据方法名和参数类型查找服务方法
		Method[] mArray=bizService.getClass().getMethods();
		for(Method method:mArray){
			if(method.getName().equals(callMethod)){
				Class<?>[] pClassArray= method.getParameterTypes();
				if(pClassArray.length ==1){
					//只能一个参数
					if(isCUDMethod){
						//C.U.D方法
						if(pClassArray[0].isArray()){
							modelArrayType = (Class<T[]>)pClassArray[0];
							isArrayParam = true;
						}
						else{
							modelArrayType = (Class<T[]>)Array.newInstance(pClassArray[0],0).getClass();
						}
						tarMethod = method;	
					}else if(pClassArray[0].equals(Map.class))
						//查询方法必须是Map为参数
						tarMethod = method;
					break;
				}
			}
		}
		if(WebUtil.isEmpty(tarMethod)){
			WebUtil.makeErrorMsg(new Exception("指定的服务方法[method="+callMethod+"]不存在或参数不匹配."), respMap);
			return false;
		}
		if(!isCUDMethod){
			//非C.U.D 类的方法
			try{
				Map<String,Object> qryParams = paramMap.get(QRY_PARAMS)!=null?(Map<String,Object>)paramMap.get(QRY_PARAMS):null;
				Object result = null;
				try{
					result =tarMethod.invoke(bizService,new Object[]{qryParams});
				}catch(InvocationTargetException e){
					respMap.put(Const.AJAX_ERR_CODE,Const.AJAX_ERR_CODE_300_ERROR);
					throw new Exception(e.getTargetException().getMessage());
				}
				if(result instanceof Integer||result instanceof Long)
					respMap.put(Const.AJAX_SERVICE_TOTAL, result);
				else if(qryParams.get(Const.AJAX_SERVICE_TOTAL)!=null){
					respMap.put(Const.AJAX_SERVICE_TOTAL, qryParams.get(Const.AJAX_SERVICE_TOTAL));
				} 
				respMap.put(Const.AJAX_DATA_ROOT, result);	
				
			}catch(Exception e){
				WebUtil.makeErrorMsg(e, respMap);
				return false;
			}
		}else{
			//C.U.D 类的方法
			try{
				String postData = paramMap.get(Const.AJAX_DATA_ROOT)!=null?paramMap.get(Const.AJAX_DATA_ROOT).toString():null;
				if(WebUtil.isEmpty(postData)){
					throw new Exception("提交的数据不符合标准!正确的样例如下{data=[{xxxx:yyyy}]}");
				}
				T[] paramArray =WebUtil.getObjectMapper().readValue(postData,modelArrayType);
				
				//插入一个数据库类型参数
				//for (T t : paramArray) {
				//	if(t instanceof gp.common.Model){
				//		((gp.common.Model)t).setDB_TYPE(WebUtil.getDB_TYPE());
				//	}
				//}
				//支持两种模式调用，
				//如果服务方法本身支持数组那么直接调用
				//否则根据数组循环调用服务方法
				try{
					if(isArrayParam)
						tarMethod.invoke(bizService,new Object[]{paramArray});
					else
						for(T item:paramArray){
							tarMethod.invoke(bizService,new Object[]{item});
						}
				}catch(InvocationTargetException e){
					respMap.put(Const.AJAX_ERR_CODE,Const.AJAX_ERR_CODE_300_ERROR);
					throw new Exception(e.getTargetException().getMessage());
				}
				respMap.put(Const.AJAX_DATA_ROOT, paramArray);
			}catch(Exception e){
				WebUtil.makeErrorMsg(e, respMap);
				return false;
			}
		}				
		
		return true ;
	}
	/**
	 * 用于客户端的远程校验，须配合客户端的RemoteValidator使用
	 * 需要参数:  method - 服务方法，方法要求是返回bool值,参数为Map.  
	 *           Map中需要 valid_fields:[{field:xxx,value:xxx},{field:xxx,value:xxx}],vText0,vText1 这几个参数
	 * 返回：data =true,message=vText0 --校验通过；data =false,message=vText1
	 * 示例:
	 * {
			 name : 'pwd',
        	 fieldLabel: '原密码',
        	 itemId:this.isResetPwd?'pwd':'firstFocusOn',
        	 inputType:'password',
        	 hidden:this.isResetPwd,
        	 encodeFunc:gp.Const.MD5,
        	 plugins:{
		          ptype: 'RemoteValidator',
		          rvOptions:{
		        	  url:'main/UserCheck.do?method=chkUserPwd',
		        	  vFields:['login_id'],
		        	  passIsValid:true,
		        	  vTexts:['密码正确!','原密码不正确!']
		          }
        	 }
        }
	 */
	public static <T> Map<String,Object> DynamicCallCheck(HttpServletRequest request,HttpServletResponse response,T bizService/*,Map<String,Object> paramMap,String[] validTexts*/) throws Exception{
		Map<String,Object> paramMap = new HashMap<String,Object>();
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		
		//需要指定服务方法名
		//String callMethod = paramMap.get(Const.AJAX_SERVICE_METHOD)!=null?paramMap.get(Const.AJAX_SERVICE_METHOD).toString():"";
		String callMethod = request.getParameter(Const.AJAX_SERVICE_METHOD);
		if(WebUtil.isEmpty(callMethod)){
			WebUtil.makeErrorMsg(new Exception("服务方法[method]未指定或不正确!"), respMap);
			return respMap;
		}else
			paramMap.put(Const.AJAX_SERVICE_METHOD,callMethod);
		
		String strVField = request.getParameter(Const.VALIDATE_FIELDS);
		if(WebUtil.isEmpty(strVField)){
			WebUtil.makeErrorMsg(new Exception("未提供所需校验的相关字段信息["+Const.VALIDATE_FIELDS+"]!"), respMap);
		}else{
			//提取客户端提供的校验提示信息
			String vTexts[] ={"",""};
			vTexts[0]=request.getParameter(Const.VALIDATE_VTEXT0);
			vTexts[1]=request.getParameter(Const.VALIDATE_VTEXT1);
			vTexts[0]=util.WebUtil.isEmpty(vTexts[0])?"校验通过":vTexts[0];
			vTexts[1]=util.WebUtil.isEmpty(vTexts[1])?"校验未通过":vTexts[1];
				
			//制造查询参数Map
			 Map<String,Object> qryParam=WebUtil.getDefaultParamsMap(request);
			ValidField[] vFields = WebUtil.getObjectMapper().readValue(strVField,ValidField[].class);
			for(ValidField vf:vFields){
				qryParam.put(vf.getField(), vf.getValue());
			}
			paramMap.put(QRY_PARAMS, qryParam);
			//根据执行结果判断校验值
			if(WebUtil.DynamicCall(bizService,paramMap,respMap)){
				if((Boolean)respMap.get(Const.AJAX_DATA_ROOT)==true){
					respMap.put(Const.AJAX_SERVICE_MESSAGE,vTexts[0]);
				}else{
					respMap.put(Const.AJAX_SERVICE_MESSAGE,vTexts[1]);
				}
			}
		}
		return respMap;
	}
	/*
	 * 此类方法调用，多为普通的服务方法,服务方法的格式约定如下：
	 * 1.参数必须为一个map,
	 *      例如:public boolean srvMethod(Map<String,Object> paramsMap)
	 * 2.返回值必须为boolean,执行结束后必须往paramsMap里回填一个 call_error_msg以标明错误信息等
	 *                      执行结果必须往paramsMap里回填一个 call_result 以返回执行结果
	 * 前台AJAX调用本函数时,根据AJAX_ERR_CODE来判断服务调用是否成功
	 *   AJAX_ERR_CODE_200_OK =200 表示成功
	 *   AJAX_ERR_CODE_300_ERROR =300 表示失败，错误信息须查看message
	 *   AJAX_DATA_ROOT 里面存放执行结果，即前面的call_result得到的东西
	 *   
	 *  //seviceMethod模板
		public boolean seviceMethod(Map<String,Object> paramsMap) throws Exception{
				String callErrMsg = "";
				paramsMap.put(gp.util.Const.SERVICE_CALL_ERROR_MSG,callErrMsg);
				paramsMap.put(gp.util.Const.SERVICE_CALL_RESULT,"");
				try{
					
					//服务调用
					
					//正常返回数据
					paramsMap.put(gp.util.Const.AJAX_SERVICE_TOTAL,resultDataList.size());
					paramsMap.put(gp.util.Const.SERVICE_CALL_RESULT,resultDataList);
				}catch(Exception e){
				  //异常处理
				  //从这里返回异常，那么错误会被当做AJAX_ERRCODE_300 的错误信息返回
				  //规避动态调用吃掉错误信息的问题
					paramsMap.put(gp.util.Const.SERVICE_CALL_ERROR_MSG,e.getMessage());
					return false;
				}
				return true;
			}
		}
	 */
	public static <T> Map<String,Object> DynamicCallService(HttpServletRequest request,HttpServletResponse response,T bizService)throws Exception{
		
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		//需要指定服务方法名
		String callMethod = request.getParameter(Const.AJAX_SERVICE_METHOD);
		if(WebUtil.isEmpty(callMethod)){
			respMap.put(Const.AJAX_ERR_CODE,Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "服务方法[method]未指定或不正确!");
			return respMap;
		}
		//根据方法名和参数类型查找服务方法
		Method tarMethod = null;
		for(Method method:bizService.getClass().getMethods()){
			if(method.getName().equals(callMethod) && method.getReturnType().equals(Boolean.TYPE)){
					Class<?>[] pClassArray= method.getParameterTypes();
					if(pClassArray.length ==1 && pClassArray[0].equals(Map.class)){
						tarMethod = method;					
						break;
					}
			}
		}
		if(WebUtil.isEmpty(tarMethod)){
			respMap.put(Const.AJAX_ERR_CODE,Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "指定的服务方法[method="+callMethod+"]不存在或参数及返回值不匹配.\r\n正确的定义应该形如 public boolean srvMethod(Map<String,Object> paramsMap)!");
			return respMap;
		}
		try{
			//制造参数Map,一般把客户端提交的参数原封不动地提交给服务方法,由服务方法自行处理
			Map<String,Object> qryParams = WebUtil.getServiceParamsMap(request);
			//业务逻辑日志
			IServiceLog serviceLog = null;
			Object logResult = null;
			try{
				//获取业务日志接口如果存在的话
				serviceLog = (IServiceLog)WebUtil.getAppCtx().getBean("serviceLog");
			}catch(Exception e){
				//不处理
			}
			if(serviceLog != null){
				logResult = serviceLog.beforeServiceStart(request,qryParams);
				qryParams.put(Const.SERVICE_LOG, logResult);
			}
			//呼叫服务
			Object result = null;
			try{
				result =tarMethod.invoke(bizService,new Object[]{qryParams});
			}catch(InvocationTargetException e){
				String errMsg = e.getTargetException().getMessage();
				if(serviceLog != null){
					//处理服务失败情况下的业务日志
					serviceLog.afterServiceFailure(request, logResult,respMap);
				}
				respMap.put(Const.AJAX_ERR_CODE,Const.AJAX_ERR_CODE_300_ERROR);
				throw new Exception(errMsg);
			}
			if(result==null){
				respMap.put(Const.AJAX_ERR_CODE,Const.AJAX_ERR_CODE_300_ERROR);
				throw new Exception(String.format("调用服务方法[%s]返回空值",callMethod));
			}else{
				if(result instanceof Boolean){
					if(!(Boolean)result){
						//服务方法执行有误					
						respMap.put(Const.AJAX_ERR_CODE,Const.AJAX_ERR_CODE_300_ERROR);
					}
					//把服务方法的实际运行结果返回给客户端
					if(qryParams.get(Const.AJAX_SERVICE_TOTAL)!=null)
						respMap.put(Const.AJAX_SERVICE_TOTAL,qryParams.get(Const.AJAX_SERVICE_TOTAL));
					respMap.put(Const.AJAX_DATA_ROOT,qryParams.get(Const.SERVICE_CALL_RESULT));
					respMap.put(Const.AJAX_SERVICE_MESSAGE, qryParams.get(Const.SERVICE_CALL_ERROR_MSG));
					
					if(serviceLog != null){
						int sAjax_err_code = respMap.get(Const.AJAX_ERR_CODE)==null?Const.AJAX_ERR_CODE_300_ERROR:(Integer)respMap.get(Const.AJAX_ERR_CODE);
						if(sAjax_err_code==Const.AJAX_ERR_CODE_300_ERROR)
							//处理服务失败情况下的业务日志
							serviceLog.afterServiceFailure(request, logResult,respMap);
						else
							//处理服务成功情况下的业务日志
							serviceLog.afterServiceSuccess(request, logResult,respMap);
					}
					
				}else{
					respMap.put(Const.AJAX_DATA_ROOT, result);
					//处理服务失败情况下的业务日志
					if(serviceLog != null)
						serviceLog.afterServiceFailure(request, logResult,respMap);
				}
			}
		}catch(Exception e){
			WebUtil.makeErrorMsg(e, respMap);
		}	
		return respMap;
	}
	/**
	 * 用于对服务方法的动态调用支持，减少控制器的数量。<br/>
	 * 此类方法调用，多为普通的增、删、改、查询(curd),示例:<br/>
	 * &nbsp;&nbsp;&nbsp;&nbsp;main/Codes.do?method=addCode<br/>
	 * &nbsp;&nbsp;&nbsp;&nbsp;main/Codes.do?method=updateCode<br/>
	 * &nbsp;&nbsp;&nbsp;&nbsp;main/Codes.do?method=getCodeList<br/>
	 * &nbsp;&nbsp;&nbsp;&nbsp;main/Codes.do?method=deleteCode<br/>
	 * 约定如下：<br/>
	 * 1.增、删、改的方法名建议以 add/delete/update开头,返回值为void,参数只能有一个相应的model/model[],<br/>
	 * &nbsp;&nbsp;&nbsp;&nbsp;例如:public void addFrmTbl(FrmTbl frmTbl)<br/>
	 * &nbsp;&nbsp;&nbsp;&nbsp;因为是动态调用需要在POST参数中指定model类名,POST参数data中存放model类的json数组;<br/>
	 * 2.查询的方法名没有限制(add/delete/update开头除外),返回值为model类的列表,参数只能有一个Map<String,Object>,<br/>
	 * &nbsp;&nbsp;&nbsp;&nbsp; 例如:public List<FrmTbl> getFrmTblList(Map<String,Object> params)<br/>
	 * @param request HTTP请求{@link  javax.servlet.http.HttpServletRequest}提交的参数有固定结构，转换成JSON后格式如下:<br/>
	 *          增删改操作:<br/>
	 *          {<br/>
	 *             data:[{}]              //以数组形式提交增删改的数据行<br/>
	 *          }<br/>
	 *          查询操作:<br/>
	 *          {<br/>
	 *             limit:25,//每页行数<br/>
	 *             start:0, //从第几行开始<br/>
	 *             page:1,//第几页<br/>
	 *             sort:[], //排序方式，根据具体服务要求<br/>
	 *             ...      //其他参数，根据具体服务要求<br/>
	 *          }<br/>  
	 * @param response HTTP响应{@link javax.servlet.http.HttpServletResponse}
	 * @param bizService  指定的服务对象
	 * @return 返回一个固定结构的Map,转换成JSON后格式如下:<br/>
	 *          {<br/>
	 *             total: 8,            //总行数<br/>
	 *             success: true/false,  //执行结果是否成功<br/>
	 *             ajaxErrorCode: 200/300/999 ,//成功/失败/超时<br/>  <!--@see gp.util.Const#AJAX_ERR_CODE_200_OK/gp.util.Const#AJAX_ERR_CODE_300_ERROR/gp.util.Const#AJAX_ERR_CODE_999_SessionTimeOut -->
	 *             message: '调用成功',  //调用信息<br/>
	 *             data:[]              //调用结果以数组形式返回<br/>
	 *          }<br/>
	 * @throws Exception
	 */
	public static  <T> Map<String,Object> DynamicCallCURD(HttpServletRequest request,HttpServletResponse response,T bizService) throws Exception{
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		Map<String,Object> paramMap = new HashMap<String,Object>();
		
		//需要指定服务方法名
		String callMethod = request.getParameter(Const.AJAX_SERVICE_METHOD);
		if(WebUtil.isEmpty(callMethod)){
			WebUtil.makeErrorMsg(new Exception("服务方法[method]未指定或不正确!"), respMap);
			return respMap;
		}else
			paramMap.put(Const.AJAX_SERVICE_METHOD,callMethod);
		
		//U.C.D服务方法必须指定data参数
		String callData = request.getParameter(Const.AJAX_DATA_ROOT);
		boolean isCUDMethod = callData==null?false:true;
		paramMap.put(IS_URDMETHOD,isCUDMethod);
		if(isCUDMethod){
			if(WebUtil.isEmpty(callData)){
				WebUtil.makeErrorMsg(new Exception("U.C.D服务方法所需参数[data]未指定或不正确!"), respMap);
				return respMap;
			}else
				paramMap.put(Const.AJAX_DATA_ROOT,callData);
		}
				
		//制造查询参数Map
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		paramMap.put(QRY_PARAMS, qryParam);
		
		IServiceLog serviceLog = null;
		Object logResult = null;
		try{
			//获取业务日志接口如果存在的话
			serviceLog = (IServiceLog)WebUtil.getAppCtx().getBean("serviceLog");
			if(serviceLog != null){
				logResult = serviceLog.beforeServiceStart(request,qryParam);
				qryParam.put(Const.SERVICE_LOG, logResult);
			}
		}catch(Exception e){
			//不处理
		}
		
		boolean callRsult = WebUtil.DynamicCall(bizService,paramMap, respMap);
		
		try{
			if(serviceLog != null){
				if(callRsult == false)
					//处理服务失败情况下的业务日志
					serviceLog.afterServiceFailure(request, logResult,respMap);
				else
					//处理服务成功情况下的业务日志
					serviceLog.afterServiceSuccess(request, logResult,respMap);
			}
		}catch(Exception e){
			
		}
		
		/*JsonGenerator jg = WebUtil.getObjectMapper().getJsonFactory().createJsonGenerator(response.getOutputStream(),JsonEncoding.UTF8);
		jg.writeObject(respMap);
		jg.flush();*/
		return respMap;
	}

	public static void setAppCtxPlatForm(ApplicationContext appCtxPlatForm) {
		WebUtil.appCtxPlatForm = appCtxPlatForm;
		WebUtil.appCtxMap.put("PlatForm", appCtx);
	}

	public static ApplicationContext getAppCtxPlatForm() {
		return appCtxPlatForm;
	}

	public static void setAppCtx(ApplicationContext appCtx) {
		WebUtil.appCtx = appCtx;
		WebUtil.appCtxMap.put("GinPlus", appCtx);
	}

	public static void setAppCtx(String key, ApplicationContext appCtx) {
		WebUtil.appCtxMap.put(key, appCtx);
	}
	
	public static ApplicationContext getAppCtx() {
		return appCtx;
	}

	public static ApplicationContext getAppCtx(String key) {
		return WebUtil.appCtxMap.get(key);
	}
	
	private static void setDB_TYPE(String dB_TYPE) {
		DB_TYPE = dB_TYPE;
	}

	@SuppressWarnings("unused")
	private static String getDB_TYPE() {
		return DB_TYPE;
	}

	public static void setInited(boolean inited) {
		WebUtil.inited = inited;
	}

	public static boolean isInited() {
		return inited;
	}

	
	public static SysLogger getSyslogger() {
		return syslogger;
	}

	public static void setSyslogger(SysLogger syslogger) {
		WebUtil.syslogger = syslogger;
	}

	public static String getBuildno() {
		return BuildNo;
	}

	public static void setDebug(boolean debug) {
		WebUtil.debug = debug;
	}

	public static boolean isDebug() {
		return debug;
	}

	public static void setJdbcProperties(Properties jdbcProps) {
		jdbcProperties = jdbcProps;
		String dbUrl = jdbcProperties.getProperty("jdbc.databaseurl").toUpperCase();
		WebUtil.setDB_TYPE(DBUtil.getDbType(dbUrl));
	}

	public static Properties getJdbcProperties() {
		return jdbcProperties;
	}

	public static void setNeedVCode(boolean needVCode) {
		WebUtil.needVCode = needVCode;
	}

	public static boolean isNeedVCode() {
		return needVCode;
	}
	
	/**
	 * 获取项目在服务其中的真实路径的工具类
	 * 
	 * 这是在web项目中，获取项目实际路径的最佳方式，在windows和linux系统下均可正常使用
	 * 
	 */
	public static String getRootPath() {
		
		String classPath = WebUtil.class.getClassLoader().getResource("/").getPath();
		String rootPath = "";
		//windows下
		if(isWindowServer()){
			rootPath = classPath.substring(1,classPath.indexOf("/WEB-INF/classes"));
			rootPath = rootPath.replace("/", "\\");
		}else{
			rootPath = classPath.substring(0,classPath.indexOf("/WEB-INF/classes"));
			rootPath = rootPath.replace("\\", "/");
		}
		return rootPath;
	}
	
	public static String getUpLoadFileRoot(){
		//windows下 "\\".equals(File.separator)
		String root="D:/srmfile/";
		//linux下
		if(!isWindowServer()){
			root= "/home/srmfile/";
		}
		return root;
	}
	public static String getIpAddr(HttpServletRequest request) {
		if (request == null) {
			return null;
		}
		
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }
	/**
	* @Description: 判断是否window服务器
	* @return 是 true/否 false
	* @author xufeng
	* @date 2016-5-30 
	*/
	public static boolean isWindowServer(){
		if("/".equals(File.separator)){
			return false;
		}else{
			return true;
		}
	}
    /**
   * chenglong
   * 递归删除目录下的所有文件及子目录下所有文件
   * @param dir 将要删除的文件目录
   * @return boolean Returns "true" if all deletions were successful.
   * If a deletion fails, the method stops attempting to
   * delete and returns "false".
   */
	public static boolean deleteDir(File dir) {
      if (dir.isDirectory()) {
          String[] children = dir.list();//递归删除目录中的子目录下
          for (int i=0; i<children.length; i++) {
              boolean success = deleteDir(new File(dir, children[i]));
              if (!success) {
                  return false;
              }
          }
      }
      // 目录此时为空，可以删除
      return dir.delete();
  }
	 /** 
     * 实现浮点数的减法运算功能 
     * @param v1 被减数 
     * @param v2 减数 
     * @return v1-v2的差 
     */  
    public static double sub(double v1,double v2) {  
        BigDecimal b1 = new BigDecimal(Double.toString(v1));  
        BigDecimal b2 = new BigDecimal(Double.toString(v2));  
        return b1.subtract(b2).doubleValue();  
    }
    /** 
     * 实现浮点数的加法运算功能 
     * @param v1 加数1 
     * @param v2 加数2 
     * @return v1+v2的和 
     */  
    public static double add(double v1,double v2) {  
        BigDecimal b1 = new BigDecimal(Double.toString(v1));  
        BigDecimal b2 = new BigDecimal(Double.toString(v2));  
        return b1.add(b2).doubleValue();  
    }
	
    /**
    * //根据日期取得星期几  
    * @Description:
    * WebUtil
    * getWeek
    * @param date
    * @return String
    * @author chenlong
    * 2016-11-8 下午3:59:27
     */
    public static String getWeek(Date date){  
        String[] weeks = {"星期日","星期一","星期二","星期三","星期四","星期五","星期六"};  
        Calendar cal = Calendar.getInstance();  
        cal.setTime(date);  
        int week_index = cal.get(Calendar.DAY_OF_WEEK) - 1;  
        if(week_index<0){  
            week_index = 0;  
        }   
        return weeks[week_index];  
    }
}
