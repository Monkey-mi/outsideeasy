package util.db;
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.apache.log4j.Logger;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import util.Const;
import util.WebUtil;

public class DBUtil {
	
	protected static Logger logger = Logger.getLogger("service");
	public static boolean isDebug = true;
	
	public static final String DDL_TYPE_SCHEMA_ONLY   ="DDL_TYPE_SCHEMA_ONLY";
	public static final String DDL_TYPE_DATA_ONLY 	="DDL_TYPE_DATA_ONLY";
	public static final String DDL_TYPE_PROC_ONLY 	="DDL_TYPE_PROC_ONLY";
	public static final String DDL_TYPE_ALL			="DDL_TYPE_ALL";
	
	private static DriverManagerDataSource dms = new DriverManagerDataSource();
	
	

	
	public static String getDbSrvUrl(String dbType,String dbSrv,int port,String dbName){
		String url=""; 
		if(dbType.equals(Const.DB_TYPE_MYSQL)){
			url =String.format("jdbc:mysql://%s:%d/%s?useUnicode=true&characterEncoding=UTF-8",dbSrv.trim(),port,dbName.trim());
		}else if(dbType.equals(Const.DB_TYPE_MSSQLSERVER)){
			url =String.format("jdbc:sqlserver://%s:%d;DatabaseName=%s",dbSrv.trim(),port,dbName.trim());
		}else if(dbType.equals(Const.DB_TYPE_ORACLE)){
			//Oracle没有数据库名这种说法
			//这里借用这个变量来填实例名
			url =String.format("jdbc:oracle:thin:@%s:%d:%s",dbSrv.trim(),port,dbName);
		}
		return url;
	}
	
	public static String getDbType(DataSource ds) {
		String sDbType ="";
		if(ds!=null){
			Connection conn;
			try {
				conn = DataSourceUtils.doGetConnection(ds);
				sDbType = getDbType(conn);
				DataSourceUtils.doReleaseConnection(conn,ds);
			} catch (SQLException e) {
				
			}
		}
		return sDbType;
	}
	
	public static String getDbType(Connection conn){
		String sDbType ="";
		if(conn!=null){
			try {
				sDbType = getDbType(conn.getMetaData().getURL());
			} catch (SQLException e) {
				
			}
		}
		return sDbType;
	}
	
	public static String getDbType(String dbUrl){
		dbUrl = dbUrl.toLowerCase();
		String dbType = Const.DB_TYPE_MYSQL;
		if(dbUrl.indexOf("jdbc:mysql")>=0) 
			dbType = Const.DB_TYPE_MYSQL;
		else if(dbUrl.indexOf("jdbc:oracle")>=0) 
			dbType = Const.DB_TYPE_ORACLE;
		else if(dbUrl.indexOf("jdbc:sqlserver")>=0) 
			dbType = Const.DB_TYPE_MSSQLSERVER;
		return dbType;
	}
	public static String getDbDrvClassName(String dbType){
		String drvClassName =""; 
		if(dbType.equals(Const.DB_TYPE_MYSQL)){
			drvClassName ="com.mysql.jdbc.Driver";
		}else if(dbType.equals(Const.DB_TYPE_MSSQLSERVER)){
			drvClassName ="com.microsoft.sqlserver.jdbc.SQLServerDriver";
		}else if(dbType.equals(Const.DB_TYPE_ORACLE)){
			drvClassName ="oracle.jdbc.driver.OracleDriver";
		}
		return drvClassName;
	}
	public static Connection openDbConn(String dbType,String dbSrv,int port,String dbName,String uName,String pwd,StringBuilder sbErrMsg) {
		Connection conn=null;
		String drvClassName ="",url="";
		
		drvClassName = getDbDrvClassName(dbType);
		url = getDbSrvUrl(dbType,dbSrv,port,dbName);
		
		if(drvClassName.equals("")||url.equals("")){
			sbErrMsg.append(String.format("尚不支持此种数据库[%s]!",dbType));
			return conn;
		}
		dms.setDriverClassName(drvClassName);
		dms.setUrl(url);
		dms.setUsername(uName);
		dms.setPassword(pwd);
		int nCount =0;
		int nTotalCount =3;
		while(nCount != nTotalCount){
			//有时候加载驱动等动作较慢，需要多尝试几次
			try {
				nCount++;
				conn = DataSourceUtils.doGetConnection(dms);
				break;
			} catch (SQLException e) {
				if(nCount>=nTotalCount)
					sbErrMsg.append(e.getMessage());
				else{
					try {
						Thread.sleep(10);
					} catch (InterruptedException e1) {
						// TODO Auto-generated catch block
						//e1.printStackTrace();
					}
				}
			}
		}
		return conn;
	}
	
	public static void closeDbConn(Connection conn){
		if(conn!=null)
			DataSourceUtils.releaseConnection(conn, dms);
	}
	
	public static boolean testDbConn(String dbType,String dbSrv,int port,String dbName,String uName,String pwd,StringBuilder sbErrMsg){
		Connection conn = DBUtil.openDbConn(dbType, dbSrv, port, dbName, uName, pwd, sbErrMsg);
		if(conn==null)
			return false;
		DBUtil.closeDbConn(conn);
		return true;
	}
	
	
	/**
	 * 切换当前数据库
	 * @param conn
	 * @param dbType
	 * @param dbName
	 * @param sbErrMsg
	 * @return
	 */
	public static boolean switchDb(Connection conn,String dbType,String dbName,StringBuilder sbErrMsg){
		Statement stat=null;
		
		if(dbType.equals(Const.DB_TYPE_MYSQL)||dbType.equals(Const.DB_TYPE_MSSQLSERVER)){
			try {
				stat = conn.createStatement();
				stat.execute("use "+dbName);
			} catch (SQLException e) {
				sbErrMsg.append("执行语句出错:\r\n").append("错误信息:"+e.getMessage());
				return false;
			}
		}else if(dbType.equals(Const.DB_TYPE_ORACLE)){
			return true;
		}else{
			sbErrMsg.append(String.format("尚不支持此种数据库[%s]!",dbType));
			return false;
		}
		return true;
	}
	/**
	 * 查找是否已经存在指定名称的数据库
	 * @param conn			指定一个jdbc连接
	 * @param dbType		数据库类型 包括MYSQL\MSSQL\ORACLE
	 * @param dbName        数据库名
	 * @param sbErrMsg      错误信息
	 * @return   true --存在   false--不存在或者失败  需要检查错误信息的长度
	 */
	public static boolean existsDb(Connection conn,String dbType,String dbName,StringBuilder sbErrMsg){
		//测试连接等
		sbErrMsg.delete(0, sbErrMsg.length());
		
		String strSql ="",strKey="";
		if(dbType.equals(Const.DB_TYPE_MYSQL)){
			strSql ="show databases like '"+dbName+"'";
			strKey ="database ("+dbName+")";
		}else if(dbType.equals(Const.DB_TYPE_MSSQLSERVER)){
			strSql ="select name from sys.databases where name='"+dbName+"'";
			strKey ="name";
		}else{
			sbErrMsg.append(String.format("尚不支持此种数据库[%s]!",dbType));
			return false;
		}
		try {
			Statement stat= conn.createStatement();
			ResultSet rs= stat.executeQuery(strSql);
			String retStr ="";
			while(rs.next()){
				retStr =rs.getString(strKey);
			}
			return retStr.trim().equals(dbName);
		} catch (SQLException e) {
			sbErrMsg.append("执行语句出错:\r\n").append("错误信息:"+e.getMessage());
			return false;
		}
	}
	
	
	public static boolean createDb(Connection conn,String dbType,String dbName,StringBuilder sbErrMsg){
		sbErrMsg.delete(0, sbErrMsg.length());
		String strDropDb ="",strCreateDb="";
		if(dbType.equals(Const.DB_TYPE_MYSQL)){
			strDropDb ="drop database if exists "+dbName;
			strCreateDb ="create database  if not exists "+dbName+" character set utf8 collate utf8_general_ci";
		}else if(dbType.equals(Const.DB_TYPE_MSSQLSERVER)){
			strDropDb ="if exists(select 1 from sys.databases where name ='"+dbName+"') drop database "+dbName;
			strCreateDb ="create database "+dbName;
		}else if(dbType.equals(Const.DB_TYPE_ORACLE)){
			return true;
		}else{
			sbErrMsg.append(String.format("尚不支持此种数据库[%s]!",dbType));
			return false;
		}
		try {
			Statement stat = conn.createStatement();
			stat.execute(strDropDb);
			stat.execute(strCreateDb);
		} catch (SQLException e) {
			sbErrMsg.append("执行语句出错:\r\n").append("错误信息:"+e.getMessage());
			return false;
		}
		return true;
	}
	
	/**
	 * 执行一个指定的sql脚本文件
	 * @param conn			指定一个jdbc连接
	 * @param sqlFile		sql脚本文件
	 * @param fileCharset   sql脚本文件的字符集
	 * @param dbType		数据库类型 包括MYSQL\MSSQL\ORACLE
	 * @param sbErrMsg      错误信息
	 * @param goWithErr		遇到执行错误是否继续
	 * @return   true --成功   false--失败
	 */
	public static boolean runSqlFile(Connection conn,String sqlFile,String fileCharset,String dbType,String ddlType,StringBuilder sbErrMsg,boolean goWithErr){
		//先测试文件
		InputStreamReader fr=null;
		sbErrMsg.delete(0, sbErrMsg.length());
		try {
			fr = new InputStreamReader(new FileInputStream(sqlFile),fileCharset);
		} catch (UnsupportedEncodingException e) {
			sbErrMsg.append("指定了一个不支持的字符集["+fileCharset+"]");
			return false;
		} catch (FileNotFoundException e1) {
			sbErrMsg.append("未找到指定的sql文件["+sqlFile+"]");
			return false;
		}
		//再测试连接等
		Statement stat=null;
		try {
			stat = conn.createStatement();
		} catch (SQLException e) {
			sbErrMsg.append("创建Statemment失败,错误信息:"+e.getMessage());
			try {
				fr.close();
			} catch (IOException e1) {
			}
			return false;
		}
		//UTF-8,Unicode文件头
		String hUTF8= new String(new byte[]{(byte)0xEF,(byte)0xBB,(byte)0xBF});
		String hUnicode = new String(new byte[]{(byte)0xFF,(byte)0xFE});
		String delimiter =dbType.equals(Const.DB_TYPE_MSSQLSERVER)?"GO":";";
		//&& !ddlType.equals(InstallUtil.DDL_TYPE_DATA_ONLY)
		String endString=delimiter;
		StringBuilder sb = new StringBuilder();
		boolean startComments =false;
		
		dbType = dbType.toUpperCase();
		ddlType = ddlType.toUpperCase();
		
		BufferedReader br = new BufferedReader(fr);
		try {
			String sTmp =br.readLine().trim();
			if(sTmp != null){
				sTmp = sTmp.trim();
				//处理掉UTF-8或者Unicode的文件头
				if(sTmp.startsWith(hUTF8)||sTmp.startsWith(hUnicode)) 
					sTmp = sTmp.substring(1);
			}
			while(sTmp!=null){
				String sTmpUpper = sTmp.toUpperCase();
				if(!ddlType.equals(DDL_TYPE_ALL)){
					if(ddlType.equals(DDL_TYPE_SCHEMA_ONLY)){
						if(sTmpUpper.startsWith("INSERT ")||sTmpUpper.startsWith("UPDATE ")||sTmpUpper.startsWith("DELETE ")){
							startComments = true;
						}else if(sTmpUpper.startsWith("DROP ")||sTmpUpper.startsWith("CREATE ")||sTmpUpper.startsWith("ALTER ")){
							if(sTmpUpper.indexOf("PROCEDURE ")>=0||sTmpUpper.indexOf("FUNCTION ")>=0||sTmpUpper.indexOf("TRIGGER ")>=0){
								//对于ddl里面的函数、存储过程、触发器单独处理
								startComments = true;
							}
							if(sTmpUpper.startsWith("CREATE ")){
								int nPos = sTmpUpper.indexOf("VIEW ");
								if(nPos >=0) sTmp = "CREATE "+sTmp.substring(nPos);
							}
						}
					}else if(ddlType.equals(DDL_TYPE_DATA_ONLY)){
						if(sTmpUpper.startsWith("DROP ")||sTmpUpper.startsWith("CREATE ")||sTmpUpper.startsWith("ALTER ")){
							startComments = true;
						}
					}else if(ddlType.equals(DDL_TYPE_PROC_ONLY)){
						if(sTmpUpper.startsWith("INSERT ")||sTmpUpper.startsWith("UPDATE ")||sTmpUpper.startsWith("DELETE ")){
							String sqlTmp = sb.toString().toUpperCase();
							if(!(sqlTmp.indexOf("CREATE ")>=0||sqlTmp.indexOf("ALTER ")>=0))  //确保这个数据操作语句不是属于ddl的一部分
								startComments = true;
						}else if(sTmpUpper.startsWith("DROP ")||sTmpUpper.startsWith("CREATE ")||sTmpUpper.startsWith("ALTER ")){
							if(!(sTmpUpper.indexOf("PROCEDURE ")>=0||sTmpUpper.indexOf("FUNCTION ")>=0||sTmpUpper.indexOf("TRIGGER ")>=0)){
								//对于ddl里面的函数、存储过程、触发器单独处理
								startComments = true;
							}else if(sTmpUpper.startsWith("CREATE ")){
								int nPos = sTmpUpper.indexOf("PROCEDURE ");
								if(nPos>=0) sTmp = "CREATE "+sTmp.substring(nPos);
								nPos = sTmpUpper.indexOf("FUNCTION ");
								if(nPos>=0) sTmp = "CREATE "+sTmp.substring(nPos);
								nPos = sTmpUpper.indexOf("TRIGGER ");
								if(nPos>=0) sTmp = "CREATE "+sTmp.substring(nPos);
							}
						}
					}
				}
				if(startComments) sTmp = "-- "+sTmp;
				
				if(dbType.equals(Const.DB_TYPE_MSSQLSERVER)&&sTmpUpper.startsWith("DROP ")){
					//MSSqlServer,在drop前需要查看是否已经存在
					String strObj = sTmpUpper.replace("DROP ", "");
					strObj = strObj.replace("TABLE ", "");
					strObj = strObj.replace("VIEW ", "");
					strObj = strObj.replace("PROCEDURE ", "");
					strObj = strObj.replace("FUNCTION ", "");
					strObj = strObj.replace(" GO", "");
					strObj = strObj.replace("'", "");
					strObj = strObj.trim();
					sTmp ="if exists (select 1 from sysobjects where  id = object_id('"+strObj+"'))  "+sTmp;
				}
				sb.append(sTmp).append("\r\n");
				if(sTmpUpper.endsWith(endString)){
					if(dbType.equals(Const.DB_TYPE_MYSQL)&&sTmpUpper.startsWith("DELIMITER")){
						//MySql才有这个变换结束符的问题
						delimiter =sTmpUpper.endsWith(";;")?";;":";";
						startComments =false;
						sb.delete(0, sb.length());
						sTmp = br.readLine();
						if(sTmp != null)
							sTmp = sTmp.trim();
						continue;
					}
					if(sTmpUpper.endsWith(delimiter)){	
						if(isDebug&&!startComments)
							logger.debug("正在执行... "+sb.substring(0, Math.min(sb.length(),128)));
						try {
							String strSql = sb.toString().trim();
							if(dbType.equals(Const.DB_TYPE_MSSQLSERVER)&&(strSql.toUpperCase().endsWith("GO"))){
								//MSSQLSERVER需要替换 GO
								strSql = strSql.substring(0,strSql.length()-2);
							}
							if(!startComments)
								stat.execute(strSql);
						} catch (SQLException e) {
							sbErrMsg.append("执行以下语句时中出现错误:\r\n").append(sb).append("错误信息:").append(e.getMessage());
							if(!goWithErr){
								br.close();
								stat.close();
								return false;
							}	
						}
						startComments =false;
						sb.delete(0, sb.length());
					}
				}
				sTmp = br.readLine();
				if(sTmp != null)
					sTmp = sTmp.trim();
			}
			br.close();
			fr.close();
			stat.close();
		} catch (IOException e) {
			try {stat.close();
			} catch (SQLException e1) {
			}
			try {br.close();
				fr.close();
			} catch (IOException e1) {
			}
			sbErrMsg.append("文件读写错误,错误信息:"+e.getMessage());
			return false;
		} catch (SQLException e) {
			sbErrMsg.append(e.getMessage());
			return false;
		} 
		return true;
	}
	
	
	/**
	 * 获得当前数据源
	 * @return
	 * @throws SQLException
	 */
	public static DataSource getCurDataSource() throws SQLException{
		return WebUtil.getAppCtxPlatForm().getBean(MultiDataSource.class).getDataSource();
	}
	
	/**
	 * 设定默认数据源当前数据源
	 * @param sbErrMsg
	 * @return
	 */
	public static DataSource setDefaultDataSource(StringBuilder sbErrMsg){
		return WebUtil.getAppCtxPlatForm().getBean(MultiDataSource.class).setDefaultDataSource(sbErrMsg);
	}
	
	
	
	/**
	 * 获取当前数据源的一个连接
	 * @return
	 * @throws SQLException
	 */
	public static Connection getCurConnection() throws SQLException{
		return getCurDataSource().getConnection();
	}
	
	/**
	 * 获取当前数据源的类型
	 * @return
	 * @throws SQLException
	 */
	public static String getCurDbType()throws SQLException{
		return WebUtil.getAppCtxPlatForm().getBean(MultiDataSource.class).getCurDbType();
	}

	/**
	 * 根据连接获取数据表清单
	 * @param conn 连接
	 * @param tblNamePattern 数据表名匹配条件，空串代表全匹配
	 * @return
	 * @throws Exception
	 */
	public static List<String> getTables(Connection conn,String tblNamePattern) throws Exception{
		tblNamePattern = tblNamePattern.trim();
		tblNamePattern = tblNamePattern.length()==0?"%":tblNamePattern;
		List<String> tblLst = new ArrayList<String>();
		try{
			DatabaseMetaData  dbmd = conn.getMetaData();
			ResultSet rs = dbmd.getTables(null, null, tblNamePattern, new String[]{"TABLE","VIEW"});
			while(rs.next()){
				String tblSchem = rs.getString("TABLE_SCHEM")==null?"":rs.getString("TABLE_SCHEM").toLowerCase();
				
				if(!(tblSchem.indexOf("sys")>=0)&&!(tblSchem.indexOf("schema")>=0))
					tblLst.add(rs.getString("TABLE_NAME"));
					/*logger.debug(String.format("cat=[%s],schem=[%s],\tname=[%s],\ttype=[%s]",
							rs.getString("TABLE_CAT"),
							rs.getString("TABLE_SCHEM"),
							rs.getString("TABLE_NAME"),
							rs.getString("TABLE_TYPE")
							));*/
			}
			rs.close();
			conn.close();
		}catch(Exception e){
			conn.close();
			throw new Exception(e.getMessage());
		}
		return tblLst;
	}

}
