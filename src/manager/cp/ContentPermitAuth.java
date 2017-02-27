package manager.cp;

import java.util.Map;

import manager.cp.AuthProxy.AuthSignature;

import org.apache.ibatis.reflection.MetaObject;

import util.SessionUtil;
import util.XmlUtil;

public class ContentPermitAuth implements ContentAuth{
//    private String sql;
	@Override
	public void invoke(AuthSignature target, Map<String, Object> param) {
		if(SessionUtil.isAdmin()){
			return;
		}
		String sql=target.getSql().trim();
		StringBuffer regx=new StringBuffer("where");
		String[] sqlPart=null;
		StringBuilder query=new StringBuilder();
		MetaObject meta=target.getTarget();
		
		if(XmlUtil.isMatch(sql, regx.toString())){
			sqlPart=sql.split(regx.toString());
		}
		regx.replace(0, 6, "WHERE");
		if(XmlUtil.isMatch(sql, regx.toString())){
			sqlPart=sql.split(regx.toString());
		}
		for(int i=0;i<sqlPart.length;i++){
			query.append(sqlPart[i]);
			if(i==0||i<sqlPart.length-1){
				query.append(" "+regx+" ");
				query.append(target.getParams("Keyfield")+" ");
				query.append(XmlUtil.getCpSql((String) target.getParams("module"),null));
			}
			if(i<sqlPart.length-1){
				query.append(" and ");
			}
		}
		if(query.length()>0){
			try{
				meta.setValue("delegate.boundSql.sql", query.toString());
			}catch(Exception e){
				e.printStackTrace();
			}
		}
	}
	
}
