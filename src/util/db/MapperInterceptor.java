package util.db;

import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import manager.common.Model;
import manager.cp.ContentFactory;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.reflect.MethodSignature;

import util.Const;
import util.WebUtil;


public class MapperInterceptor{
	
	private DataSource dataSource;
	private String sDbType="";
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Object methodRound(ProceedingJoinPoint  jp) throws Throwable{
		if(this.dataSource instanceof MultiDataSource)
			//如果是多数据源，那么要即时取多数据源的当前数据源类型
			sDbType = ((MultiDataSource)this.dataSource).getCurDbType();
		else{
			//如果是单数据源，那么根据缓存结果即可
			if(WebUtil.isEmpty(sDbType))
				sDbType = DBUtil.getDbType(this.getDataSource());
		}
		MethodSignature msig=(MethodSignature) jp.getSignature();
		System.out.println(String.format("---------mehtod[%s] is called -----------", msig.getName()));
		System.out.println(String.format("---------DbType=[%s]  -----------", sDbType));
		
		Object[] args = jp.getArgs();
		Map<String,Object> mapArg = null;
		boolean usePaging = false;
		for (Object arg : args) {
			if(arg != null){
				if(arg instanceof Model) {
					((Model)arg).setDB_TYPE(sDbType);				
				}else if(arg instanceof Map){
					mapArg = ((Map<String,Object>)arg);
					mapArg.put(Const.DB_TYPE, sDbType);
					usePaging = mapArg.get(Const.USE_PAGING)!=null;
				}
			}
		}
		ContentFactory.setProxy(jp.getTarget(), args, msig.getName());
		Object retObj = jp.proceed(args);
		//在无需分页处理时,按照插件的形式可能无法返回total,所以要特殊处理一下
		if((retObj instanceof List )&& !usePaging && mapArg!=null){
			if(mapArg.get(Const.AJAX_SERVICE_TOTAL)==null){
				mapArg.put(Const.AJAX_SERVICE_TOTAL,((List)retObj).size());
			}
		}
		
		return retObj;
	}

	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	public DataSource getDataSource() {
		return dataSource;
	}
}
