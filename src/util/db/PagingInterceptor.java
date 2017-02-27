package util.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import manager.cp.ContentFactory;

import org.apache.ibatis.executor.keygen.KeyGenerator;
import org.apache.ibatis.executor.keygen.NoKeyGenerator;
import org.apache.ibatis.executor.keygen.SelectKeyGenerator;
import org.apache.ibatis.executor.statement.BaseStatementHandler;
import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.ParameterMapping;
import org.apache.ibatis.mapping.ParameterMode;
import org.apache.ibatis.mapping.SqlCommandType;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.reflection.factory.DefaultObjectFactory;
import org.apache.ibatis.reflection.factory.ObjectFactory;
import org.apache.ibatis.reflection.wrapper.DefaultObjectWrapperFactory;
import org.apache.ibatis.reflection.wrapper.ObjectWrapperFactory;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.TypeHandler;
import org.apache.log4j.Logger;

import util.Const;

@Intercepts( { @Signature(type = StatementHandler.class, method = "prepare", args = { Connection.class }) })
public class PagingInterceptor implements Interceptor{
	// 日志对象
    protected static Logger logger = Logger.getLogger("service");
    protected static Properties properties = null;
    
    public static final ObjectFactory DEFAULT_OBJECT_FACTORY = new DefaultObjectFactory();
    public static final ObjectWrapperFactory DEFAULT_OBJECT_WRAPPER_FACTORY = new DefaultObjectWrapperFactory();
    
    /**
     * 通过拦截器来统一处理SQL语句来达到数据分页的效果<br/>
     * 要求查询Mapper的参数必须是Map类型，且中间具有 limit,page,start 这三个参数,<br/>
     * 查询结果的总行数将会以total为名放回到Map中去
     */
    @Override
    public Object intercept(Invocation invocation) throws Throwable {
    	
		StatementHandler stmtHandler = (StatementHandler) invocation.getTarget();
        MetaObject metaStmtHandler = MetaObject.forObject(stmtHandler,DEFAULT_OBJECT_FACTORY,DEFAULT_OBJECT_WRAPPER_FACTORY); 
        BaseStatementHandler delegate = (BaseStatementHandler) metaStmtHandler.getValue("delegate");  
        MappedStatement mappedStmt = (MappedStatement) metaStmtHandler.getValue("delegate.mappedStatement");  
        BoundSql boundSql = delegate.getBoundSql();
        String originalSql = boundSql.getSql().trim();
        Object paramObject =  boundSql.getParameterObject();
        MetaObject metaParamObject = MetaObject.forObject(paramObject,DEFAULT_OBJECT_FACTORY,DEFAULT_OBJECT_WRAPPER_FACTORY); 
        
        //取得当前所操作数据库的类型
        String sDbType = DBUtil.getDbType((Connection)invocation.getArgs()[0]);
        //根据具体数据库类型处理sql语句
        String replacedSql = replaceSql(sDbType,originalSql);
        if(replacedSql.length()>0)
        	originalSql = replacedSql;
		
//        Date startDtm = new Date();
        if(mappedStmt.getSqlCommandType().equals(SqlCommandType.SELECT)){
        	 ContentFactory.invoke(metaStmtHandler,boundSql);
    		//Select语句才可能有分页要求
        	//只有当paramObject不为空且是Map类型时才需要分页处理
        	if(paramObject!=null && paramObject instanceof Map){
        		int nLimit =0,nStart =0;
	        	@SuppressWarnings("unchecked")
				Map<String,Object> paramMap = (Map<String,Object>)paramObject;
	        	boolean usePaging = paramMap.get(Const.USE_PAGING)!=null?Boolean.parseBoolean(paramMap.get(Const.USE_PAGING).toString()):false;
	            nLimit =paramMap.get("limit")!=null?Integer.parseInt(paramMap.get("limit").toString()):-1;
	        	nStart =paramMap.get("start")!=null?Integer.parseInt(paramMap.get("start").toString()):0;
	        	boolean iscustomCount = paramMap.get(Const.IS_CUSTOM_COUNT)!=null?Boolean.parseBoolean(paramMap.get(Const.IS_CUSTOM_COUNT).toString()):false;
	        	//检查sql语句是否有不合理
    			checkSqlStr(originalSql,usePaging,sDbType);
	        	if(iscustomCount){
	        		paramMap.put(Const.IS_CUSTOM_COUNT, false);//还原掉，避免下一次对查询的影响
	        		//不做分页处理
	        	}else{
	        		//只有存在分页要求时才做分页处理
		        	if(usePaging && nLimit>=0 && nStart >=0){
		        		//步骤一 判断sql语句是否已经做过分页处理
		        		if(!isPagingedSql(sDbType,originalSql)){
		        			//默认false，需要统计数量
		        			boolean usecustomCount = paramMap.get(Const.USE_CUSTOM_COUNT)!=null?Boolean.parseBoolean(paramMap.get(Const.USE_CUSTOM_COUNT).toString()):false;
		    	        	if(usecustomCount){
		    	        		paramMap.put(Const.USE_CUSTOM_COUNT, false);//还原掉，避免下一次对查询的影响
		    	        		//由自定义的统计数量SQL来获取数量
		    	        	}else{
		    	        		//步骤二 根据查询条件获得总行数
				        		String countSql = getCountSql(sDbType,originalSql);
					        	PreparedStatement countStmt = ((Connection)invocation.getArgs()[0]).prepareStatement(countSql); 
					        	//BoundSql countBS = new BoundSql(mappedStatement.getConfiguration(), countSql, boundSql.getParameterMappings(), paramObject);
					            try{
						        	setParameters(countStmt, boundSql.getParameterMappings(), paramMap);
						        	ResultSet rs = countStmt.executeQuery();
						        	int count =0;
						        	if(rs.next())
						        		count = rs.getInt(1);
						        	rs.close();
						        	countStmt.close();
						        	paramMap.put(Const.AJAX_SERVICE_TOTAL, count);
						        }catch(Exception exp){
						        	//无论如何都要关闭这个statement
					            	countStmt.close();
					            	throw exp;
					            }
		    	        	}
		        			
				        	//步骤三 改造sql以支持分页处理
				        	replacedSql = getPagingSql(sDbType,originalSql,nLimit,nStart);
				        }
		        	}
	        	}
        	}
	    }else if(mappedStmt.getSqlCommandType().equals(SqlCommandType.INSERT)){
        	//Insert语句才有key的问题
        	String insertSql = originalSql;
        	KeyGenerator keyGenerator = mappedStmt.getKeyGenerator();
        	//logger.debug(String.format("======keyGenerator=[%s]",keyGenerator.getClass().toString()));
        	String[] keyProperties = mappedStmt.getKeyProperties();
//        	String[] keyColumns = mappedStmt.getKeyColumns();
    		//logger.debug("======Sql =\r"+originalSql);
//    		int nCount = keyProperties!=null?keyProperties.length:0;
    		//logger.debug("======keyProperties count="+nCount );
        	
    		if(!(keyGenerator instanceof NoKeyGenerator) && !(keyGenerator instanceof SelectKeyGenerator)&&keyProperties!=null){
                //此时需要一个jdbcKeyGenerator,但Oracle不支持autoincrement,所以自己造一个
    			//用序列或者手动自增
    			if(sDbType.equals(Const.DB_TYPE_ORACLE)&&paramObject!=null)
    			{
	    			//MetaObject metaParamObject = MetaObject.forObject(paramObject);
	    			//找到表名
		    		int nPos =insertSql.lastIndexOf("into ")+"into ".length();
		    		int nPos2 =nPos;
		    		while(true){
		    			char ch =insertSql.charAt(nPos2);
		    			if(ch==' '||ch=='('||ch =='\t'||ch=='\r'||ch=='\n')
		    				break;
		    			else
		    				nPos2++;
		    		}
		    		String tblName =insertSql.substring(nPos, nPos2);
		    		//String nextValSql = "select isnull(max("+keyProperties[0]+")+1,1) from "+tblName;
		    		String nextValSql = "select "+tblName+"_pkseq.nextval from dual";
		        	PreparedStatement countStmt = ((Connection)invocation.getArgs()[0]).prepareStatement(nextValSql);
		        	ResultSet rs = countStmt.executeQuery();
		        	int keyID =0;
		        	if(rs.next())
		        		keyID = rs.getInt(1);
		        	rs.close();
		        	countStmt.close();
		        	//这种情况下需要关闭keyGenerator,否则真的调用会出错的
		        	metaStmtHandler.setValue("delegate.mappedStatement.keyGenerator",new NoKeyGenerator());
		        	//回填产生出来的keyProperty,达到selectKey before 的效果
		        	metaParamObject.setValue(keyProperties[0], keyID);
		        }
    		}
        }
        if(replacedSql.length()>0){
        	metaStmtHandler.setValue("delegate.boundSql.sql",replacedSql);
        }
       
        Object invRet = invocation.proceed();
//		Date endDtm = new Date();
//		long timeUsed = endDtm.getTime() - startDtm.getTime();
		//如果要观察sql运行效率，可以开启这里
		//logger.debug(String.format("sql =%s",metaStmtHandler.getValue("delegate.boundSql.sql")));
		//logger.debug(String.format("sql process cost %d milliseconds!", timeUsed));
		return invRet;
	}
    
    protected String replaceSql(String sDbType,String strSql){
    	String replacedSql = "";
    	//按照约定,默认按照mysql的写法,遇到当前数据库为其他时进行替换处理
		if(sDbType.equals(Const.DB_TYPE_MSSQLSERVER)){
			replacedSql = strSql.replaceAll("\\s+ifnull\\(" , "isnull(").replaceAll("\\s+now\\(\\)" , "getdate()");
		}else if(sDbType.equals(Const.DB_TYPE_ORACLE)){
			replacedSql = strSql.replaceAll("\\s+ifnull\\(" , "nvl(").replaceAll("\\s+now\\(\\)" , "sysdate");
		}
    	return replacedSql;
    }
    
	/**
	 * 判断SQL语句是否已经过分页处理
	 * @param sDbType 数据库类型
	 * @param strSql  SQL语句
	 * @return
	 */
	protected boolean isPagingedSql(String sDbType,String strSql){
		String sF ="(^|[\\s\\S]*\\s+)%s(\\s+[\\s\\S]*|$)";
		String sPageWord =" ----- ";
		if(sDbType.equals(Const.DB_TYPE_MYSQL)){
			sPageWord="limit";
		}else if(sDbType.equals(Const.DB_TYPE_MSSQLSERVER)){
			sPageWord="row_number()";
		}else if(sDbType.equals(Const.DB_TYPE_ORACLE)){
			sPageWord="rownum";
		}
		String sPt = String.format(sF,sPageWord);
		Pattern pattern = Pattern.compile(sPt,Pattern.CASE_INSENSITIVE);
		Matcher matcher = pattern.matcher(strSql);
		return matcher.matches();
	}
	
	protected String getCountSql(String sDbType,String strSql){
		strSql = strSql.toLowerCase().replaceAll("(^|\\s+)order by(\\s+|$)"," order by ")
				   .replaceAll("(^|\\s+)from(\\s+|$)"," from ")
				   .replaceAll("(^|\\s+)union(\\s+|$)"," union ");
		//需要剔除语句末尾的 order by，否则可能出错 
		int nPos = strSql.lastIndexOf(" order by ");
		if(nPos>=0){
			strSql = strSql.substring(0, nPos);
			//logger.debug("nPos"+nPos+"no order sql="+strSql);
		}
		//从如云10w条记录效率分析结果来看，在第一个select/from之间替换插入 count(0)可以避免一次多字段临时表的处理 ，
		//速度加快了4-5倍
		//1.找出第一个 from 
		//2.截去前面部分并替换成 count(0)，形成CountSql
		int nPos2 = strSql.indexOf(" from ");
		//3.如果存在union那么还是按照保守的办法处理
		int nUnionPos = strSql.indexOf(" union ");
		String retSqlStr ="";
		if(nPos2<0 || nUnionPos >=0){
			retSqlStr = "select count(0) from (" + strSql+ ") as tmp_count";
		}else{
			retSqlStr = " select count(0) " + strSql.substring(nPos2);
		}
		
		return retSqlStr;
	}
	
	/**
	 * 根据数据库类型取得处理后的分页SQL语句
	 * @param sDbType 数据库类型
	 * @param strSql 原始SQL语句
	 * @param nLimit 限制行数
	 * @param nStart 偏移行数
	 * @return
	 */
	protected String getPagingSql(String sDbType,String strSql,int nLimit,int nStart){
		if(sDbType.equals(Const.DB_TYPE_MYSQL)){
			return getLimitString_MySql(strSql,nStart,nLimit);
		}else if(sDbType.equals(Const.DB_TYPE_MSSQLSERVER)){
			return getLimitString_MSSql(strSql,nStart,nLimit);
		}else if(sDbType.equals(Const.DB_TYPE_ORACLE)){
			return getLimitString_Oracle(strSql,nStart,nLimit);
		}else
			return strSql;
	}
	/**
	 * 获得MySql数据库的分页语句
	 * @param sql
	 * @param offset
	 * @param limit
	 * @return
	 */
	protected String getLimitString_MySql(String sql, int offset, int limit)
    {

        StringBuffer pagingSelect = new StringBuffer(sql.length() + 100);

        pagingSelect.append(sql);

        pagingSelect.append(" limit ").append(offset).append(" , ").append(limit);

        return pagingSelect.toString();
    }
	/**
	 * 获得MSSql数据库的分页语句
	 * @param sql
	 * @param offset
	 * @param limit
	 * @return
	 */
	protected String getLimitString_MSSql(String strSql, int offset, int limit){
		strSql=strSql.toLowerCase().replaceAll("(^|\\s+)where(\\s+|$)"," where ")
								   .replaceAll("(^|\\s+)group by(\\s+|$)"," group by ")
								   .replaceAll("(^|\\s+)order by(\\s+|$)"," order by ")
								   .replaceAll("(^|\\s+)select(\\s+|$)"," select ")
								   .replaceAll("(^|\\s+)from(\\s+|$)"," from ");
		String orgOrderStr = "";
		int nPos = strSql.toLowerCase().lastIndexOf(" order by ");
		if(nPos>=0){
			//截取原SQL里面的order by
			orgOrderStr = strSql.substring(nPos);
			strSql = strSql.substring(0, nPos);
		}
		if(orgOrderStr.length()==0){
			//如果原先没有order by, 那么插入一个空的order by
			orgOrderStr =" order by tempcolumn ";
			int nextSelIdx = strSql.toLowerCase().indexOf(" from ");
			strSql = strSql.substring(0,nextSelIdx)+",tempcolumn=0 "+strSql.substring(nextSelIdx);
		}
        
		offset = offset <=0? 1:offset;
		
		StringBuffer pagingSelect = new StringBuffer(strSql.length() + 100);

        pagingSelect
                .append("select * from (select row_number()over(==ORDER_STR==)as row_num,* from (")
                .append(strSql).append(") as t ) as tt ")
                .append("where row_num between ").append(offset).append(" and ").append(offset+limit-1);
        
        
        return pagingSelect.toString().replace("==ORDER_STR==", orgOrderStr);
	}
	/**
	 * 获得Oracle数据库的分页语句
	 * @param sql
	 * @param offset
	 * @param limit
	 * @return
	 */
	protected String getLimitString_Oracle(String sql, int offset, int limit){
		StringBuffer pagingSelect = new StringBuffer(sql.length() + 100);

        pagingSelect
                .append("select * from ( select row_.*, rownum rownum_ from ( ");

        pagingSelect.append(sql);

        pagingSelect.append(" ) row_ ) where rownum_ > ").append(offset)
                .append(" and rownum_ <= ").append(offset + limit);

        return pagingSelect.toString();
	}
	
	/**
	 * 根据参数映射设置具体查询参数的值
	 * @param ps
	 * @param paramMappings
	 * @param paramsMap
	 * @throws SQLException
	 */
	@SuppressWarnings("unchecked")
	private void setParameters(PreparedStatement ps,List<ParameterMapping> paramMappings,Map<String,Object> paramsMap) throws SQLException{
		for (ParameterMapping paramMapping : paramMappings) {
    		/*logger.debug(String.format("param_name=[%s],result_mapid=[%s],jdbc_type=[%s]", 
    				paramMapping.getProperty(),
    				paramMapping.getResultMapId(),
    				paramMapping.getJavaType().toString()
    				));*/
    		if(paramMapping.getMode()!=ParameterMode.OUT){
    			Object value = paramsMap.get(paramMapping.getProperty());
    			JdbcType jdbcType = value==null?JdbcType.NULL:paramMapping.getJdbcType();
    			
    			@SuppressWarnings("rawtypes")
				TypeHandler tpHandler = paramMapping.getTypeHandler();
    			tpHandler.setParameter(
    					ps, 
    					paramMappings.indexOf(paramMapping)+1,
    					value,
    					jdbcType
    					);
    		}
		}
	}

	@Override
	public Object plugin(Object target) {
		return Plugin.wrap(target, this);
	}

	@Override
	public void setProperties(Properties props) {
		properties = props;		
	}
	
	private void checkSqlStr(String sqlStr,boolean usePaging,String dbType) throws Throwable{
	}
    
}
