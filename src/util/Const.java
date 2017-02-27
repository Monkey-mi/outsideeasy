package util;

public class Const {
	public static final int HTTP_STATUS_200_OK = 200;
	/**
	 * ajax_服务调用成功
	 */
	public static final int AJAX_ERR_CODE_200_OK = 200;
	/**
	 * ajax_服务调用失败,错误信息请参见@see gp.util.Const#AJAX_SERVICE_MESSAGE
	 */
	public static final int AJAX_ERR_CODE_300_ERROR = 300;
	/**
	 * ajax_服务调用超时
	 */
	public static final int AJAX_ERR_CODE_999_SessionTimeOut = 999;
	public static final String AJAX_COMPLETE_MSG 	= "执行完成";
	public static final String AJAX_DATA_ROOT 		="data";
	public static final String AJAX_ERR_CODE	 	="ajaxErrorCode";
	
	public static final String SOAP_TRUE ="true";
	public static final String SOAP_FALSE ="false";
	
	public static final String AJAX_SERVICE_SUCCESS ="success";
	public static final String AJAX_SERVICE_MESSAGE ="message";
	public static final String AJAX_SERVICE_TOTAL 	="total";
	public static final String AJAX_SERVICE_TOTALROWS 	="totalRows";
	public static final String AJAX_SERVICE_START 	="start";
	public static final String AJAX_SERVICE_SIZE 	="size";
	public static final String AJAX_SERVICE_LIMIT 	="limit";
	public static final String AJAX_SERVICE_PAGE 	    ="page";
	public static final String AJAX_SERVICE_CURRENT_PAGE 	    ="curPage";
	public static final String AJAX_SERVICE_METHOD 	="method";
	public static final String AJAX_SERVICE_MODEL 	="model";
	/*↓↓↓↓↓会话中保存的对象↓↓↓↓↓*/
	public static final String SESSION_USER = "user";
	public static final String SESSION_PLATFORM_USER = "platform_user";
	public static final String SESSION_PLATFORM_LOGIN_USER = "platform_login_user";
	public static final String SESSION_ROLE = "role";
	public static final String SESSION_PLATFORM_ROLE = "platform_role";
	public static final String SESSION_URL_LIST = "url_list";
	public static final String SESSION_PST = "position";
	public static final String SESSION_IP = "clientIP";
	public static final String SESSION_CSRFTOKEN = "csrftoken";
	public static final String SESSION_DEFAULT_ORG = "default_org";
	public static final String SESSION_DEFAULT_DEPT = "default_dept";
	public static final String SESSION_CURRENT_ORG = "current_org";
	public static final String SESSION_CHANGABLE_ORG = "changable_org";
	public static final String SESSION_USERDEPT = "userdept";
	public static final String SESSION_USERORG = "userorg";
	public static final String SESSION_ORGTREES = "orgtrees";
	public static final String SESSION_DEPTNODES = "deptnodes";
	public static final String DATA_PERMIT = "data_permit";   //数据域权限
	public static final String USER_DATA_CDT="user_condition";  //过滤的记录行
	public static final String USER_DATA_PERMIT="user_permit";  //过滤的记录行
	public static final String COL_DATA_PERMIT = "COL_PERMIT";   //列数据域权限
	public static final String ROW_DATA_PERMIT = "ROW_PERMIT";   //行数据域权限
	public static final String READ_PERMIT = "+R";   //可读
	public static final String WRITE_PERMIT = "+W";   //可写
	public static final String INVISIABLE_PERMIT = "-R";   //不可见
	/*↑↑↑↑↑会话中保存的对象↑↑↑↑↑*/
	public static final String VALIDATE_FIELDS ="valid_fields";
	public static final String VALIDATE_VTEXT0 ="vText0";
	public static final String VALIDATE_VTEXT1 ="vText1";
	
	public static final String SERVICE_LOG = "serviceLog";
	public static final String SERVICE_CALL_ERROR_MSG ="call_error_msg";
	/**
	 * 由{@link gp.util.WebUtil#DynamicCallService(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, Object)}
	 * 方法呼叫服务的返回值放在Map的本属性中。
	 */
	public static final String SERVICE_CALL_RESULT ="call_result";
	
	public static final String YESNO_TYPE_YES ="true";
	public static final String YESNO_TYPE_NO ="false";
	public static final String BOOL_TYPE_TRUE ="true";
	public static final String BOOL_TYPE_FALSE ="false";
	public static final String DEFAULT_TREEROOT_PROPERTY ="data"; 
	public static final String DEFAULT_TREENODE_PARAM ="node";
	
	
	public static final String SUPER_ROLE ="admins";  //超级角色
	public static final String SUPER_USER	="admin";   //超级用户
	
	public static final String NOW_DATETIME ="now_dtm";
	public static final String USE_PAGING ="usePaging";
	public static final String USE_CUSTOM_COUNT ="usecustomCount";
	public static final String IS_CUSTOM_COUNT ="iscustomCount";
	//系统参数表等=============================
	public static final String PLATFORM  = "GinPlus";
	public static final String TYPE_ATTRIB_CBX =  "CBX";
	public static final String TYPE_ATTRIB_SYS =  "SYS";
	public static final String TYPE_ATTRIB_APP =  "APP";
	public static final String SYS_PARAMETERS = "SYS_PARAMETERS";   //系统参数表
	public static final String DEPTMNG_PATTERN = "DEPTMNG_PATTERN"; //部门管理模式
	public static final String DEPTMNG_PATTERN_LOOSE = "DEPTMNG_PATTERN_LOOSE";    //松散式
	public static final String DEPTMNG_PATTERN_CENTRAL = "DEPTMNG_PATTERN_CENTRAL";//集中式
	public static final String HOME_PAGE="home.html";
	public static final String LOGIN_PAGE = "login.html";
	public static final String BG_LOGIN_PAGE = "bgLogin.html";
	public static final String LOGIN_TYPE ="logintype";
	public static final String INDEX_PAGE = "index.jsp";
	public static final String VIP_LOGIN_PAGE = "vip";//vipLogin
	public static final String LOGIN_SERVICE = "doLogin.do";
	public static final String LOGOUT_SERVICE = "doLogout.do";
	public static final String VCODE_SERVICE = "getVerifyCode.do";
	public static final String TIMEOUT_SERVICE = "common/doSessionTimeOut.do";
	public static final String GET_GLOBAL_VARS = "common/getGlobalVars.do";
	public static final String GET_DEFAULT_STYLECSS ="common/getDefaultStyleCSS.do";
	public static final String INIT_PAGE ="resources/setup/setup.html";
	public static final String CODESERVICE ="CodeService";
	//产品类型
	public static final String PROD_TYPE ="PROD_TYPE";		
	public static final String PROD_TYPE_WORKGROUP ="PROD_TYPE_WORKGROUP";	//工作组版(WG),支持MSDE、SQLExpress及本地的MySql
	public static final String PROD_TYPE_LARGE ="PROD_TYPE_LARGE";		    //大型数据库版(LG)，支持MySql、MSSql、Oracle
	//数据库类型等
	public static final String DB_TYPE ="DB_TYPE";		
	public static final String DB_TYPE_MYSQL ="MYSQL";		//MySQL
	public static final String DB_TYPE_ORACLE ="ORACLE";	//Oracle
	public static final String DB_TYPE_MSSQLSERVER ="MSSQLSERVER";//MSSQLServer
	public static final String INIT_LOCKFILE ="/resources/setup/data/init_lock.lck";
	//自定义表单类别
    public static final String FRMTBL_TYPE_MASTER = "MASTER";
    public static final String FRMTBL_TYPE_DETAIL = "DETAIL";
	
	//默认组织类型(即HR)
    public static final String DEFAULT_ORTYPE = "0004"; 
    
	//编码组成
	public static final String CODEPART_TYPE="CODEPART_TYPE";	   //编码组成类别
	public static final String CODEPART_TYPE_SYSDATE="_sysdate_"; //系统日期	
	public static final String CODEPART_TYPE_INCRSEQ="_incrseq_"; //自增序号
	public static final String CODEPART_TYPE_FIXEDTEXT="_fixedtext_"; //固定文本
	public static final String CODEPART_TYPE_FORMFIELD="_formfield_"; //单据字段
	public static final String CODEPART_TYPE_USERPARAM="_userparam_"; //用户参数
	public static final String USERPARAM_TYPE="USERPARAM_TYPE"; //用户参数类型
	
	//任务单的文件夹的名称
	public static final String TECHNOLOGICAL_DOCUMENT = "工艺文件"; //工艺文件
	public static final String PRODUCT_PICTURE = "产品图片"; //产品图片
	public static final String PROCESS_PICTURE = "工艺图片"; //工艺图片
	public static final String OTHER_DOCUMENTS = "其他文件"; //其他文件
	public static final String VIDEO_FILE = "视频文件"; //视频文件
	public static final String OPERATION_GUIDANCE = "作业指导";
	public static final String QUALITY_CONTROL_STANDARD = "质检标准";
	public static final String MATERIAL_LIST = "材料清单";
	public static final String QUOTA_TIME = "定额工时";
	public static final String TENPLATE_DRAWING = "裁剪产品样板图、派版图";
	public static final String EMBROIDERY_DRAWING = "丝印、绣花定位图";
	
	public static final String[] LOGIN_TYPE_HTML = {"/bgLogin.html","/bgIndex.html"};//（后台的html就两个）


	
	
	public static final String TABLE_PREFIX="frmt_";
	/**
	 * 大字段数据类型 存放于ge_bytearray表
	 */
	public static final String PG_TYPE = "PG_TYPE";
	/**
	 * @see #PG_TYPE
	 */
	public static final String PG_TYPE_PROCESS = "Process";
	
	/**
	 * app_code：应用代码，用于绑定流程<br/><br/>
	 * APP_CODE_NEWS："News" 新闻<br/><br/>
	 * APP_CODE_NOTICE："Notice" 通知通告<br/><br/>
	 * APP_CODE_RECIEVETEXT："RecieveText" 收文<br/><br/>
	 * APP_CODE_SENDTEXT："SendText" 发文<br/><br/>
	 * APP_CODE_ALLBUDGET："AllBudget" 全面预算<br/><br/>
	 * APP_CODE_REPORT："Report" 网络报表<br/><br/>
	 */
	public static final String APP_CODE_NEWS = "News"; 
	public static final String APP_CODE_NOTICE = "Notice";
	public static final String APP_CODE_RECIEVETEXT = "RecieveText";
	public static final String APP_CODE_SENDTEXT = "SendText";
	public static final String APP_CODE_ALLBUDGET = "AllBudget";
	public static final String APP_CODE_REPORT = "Report";
	/**
	 * 后台查询模式参数
	 */
	public static final String GET_LIST_MAIN = "main";
	
	//授权目标类型
	public static final String PERMIT_TARTYPE_ROLE 		="role";    //角色
	public static final String PERMIT_TARTYPE_USER 		="user";    //用户
	public static final String PERMIT_TARTYPE_POSITION 	="position";//职位
	
	//用户项目授权来源类型
	public static final String PRJ_AUTHFROM_TYPE = "PRJ_AUTHFROM_TYPE";
	public static final String PRJ_AUTHFROM_TYPE_USER = "user";  //来自用户管理
	public static final String PRJ_AUTHFROM_TYPE_PRJ = "prj";  //来自项目人员
	//权限一些常数
	public static final String Auth_Interface="AuthInterface";
	
	public static final String 	DRP_YHBH="drp_yhbh";
	//派工类型
	public static final int PAIGONG_TYPE_ZIZHI=1;
	public static final int PAIGONG_TYPE_WAIXIE=2;
	//web容器名
	public static final String WEB_AppCtx_TPS="tps";
	//常见图片后缀数组
	public static final String[] imgArray={".bmp",".jpg",".jpeg",".png",".gif"};
	//常见的视频文件后缀数组
	public static final String[] viewArray={".avi",".mp4",".flv",".3gp",".mkv",".mpeg",".qsv"};
	//常见其他文件后缀数组,检查mongDB的图片格式
	public static final String[] otherArray={".doc",".docx",".ppt",".pptx",".pps",".xls",".xlsx",".pdf",".txt"};
	//回签合同的文件后缀数组
	public static final String[] agreementArray={".doc",".docx",".xls",".xlsx",".pdf",".bmp",".jpg",".jpeg",".png",".gif"};
	//图片和文件合集
	public static final String[] docAndPicArray={".doc",".docx",".ppt",".pptx",".pps",".xls",".xlsx",".pdf",".txt",".bmp",".jpg",".jpeg",".png",".gif"};
	//对service层的日志进行记录并添加进入数据库归类
	public static final String[] LogServiceicArray={"add","append","save","create","update","edit","delete","delAndInit","remove","modify"};
	
	public static final int IPSENDCOUNTLIMIT = 50;
	//mongo文件管理，附加的自定义字段
	public final static String ISIMG="isimg";//是否图片，1是 ，0否
	public final static String USE_TYPE="useType";//使用类别,见t_base_file_type
	public final static String COM_NAME="comName";//公司名
	public final static String COM_ID="comID";//公司ID
	public final static String USERNAME="userName";//上传者
}
