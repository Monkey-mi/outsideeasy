package manager.cp;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.reflection.MetaObject;

public class AuthProxy{
		private AuthSignature auth;
		
	    public AuthProxy(ContentAuth contentAuth,ContentPermit cp){
	    	this.auth=new AuthSignature(contentAuth, cp);
	    }
		public Object invoke(Object metament,BoundSql boundsql){
			this.auth.setSql(boundsql.getSql());
			this.auth.setMetaMent(metament);
			this.auth.getContentAuth().invoke(this.auth, null);
			return null;
		}
	class AuthSignature{
		private ContentPermit cp;
		private ContentAuth contentAuth;
		private String sql;
		private Object meta; 
		private Map<String,Object> paramMap;
		public AuthSignature(ContentAuth contentAuth,ContentPermit cp){
			this.contentAuth=contentAuth;
			this.cp=cp;
			this.paramMap=new HashMap<String, Object>();
			setParams();
		}
		public ContentPermit getContentPermit(){
			return this.cp;
		}
		public ContentAuth getContentAuth(){
			return this.contentAuth;
		}
		private void setSql(String sql){
			this.sql=sql;
		}
		public String getSql(){
			return this.sql;
		}
		private void setMetaMent(Object meta){
			this.meta=meta;
		}
		public MetaObject getTarget(){
			return (MetaObject) this.meta;
		}
		public Object getParams(String fieldName){
			return paramMap.get(fieldName);
		}
		private void setParams(){
			String param=this.cp.param();
			if(param!=null){
				String[] params=null;
				String[] paramsRegx=param.split(",");
				for(String item:paramsRegx){
					params=item.split("=");
					try{
						paramMap.put(params[0].replace("'",""),params[1].replace("'",""));
					}catch(Exception e){
						e.printStackTrace();
					}
					
				}
			}
		}
	}
}
