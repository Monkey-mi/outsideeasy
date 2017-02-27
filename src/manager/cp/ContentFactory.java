package manager.cp;


import java.lang.reflect.Method;
import java.util.Map;

import org.apache.ibatis.mapping.BoundSql;

public class ContentFactory {
	 private static final String AuthToken="AuthContent";
	   public static void setProxy(Object target,Object[] arg,String methodName){
		   Method method=getMethodfromTarget(target,methodName);
		   ContentAuth contentAuth=createContentAuth(method);
		   if(contentAuth!=null){
			   for(Object item:arg){
				   if(item instanceof Map){
					   @SuppressWarnings("unchecked")
					Map<String,Object> msgMap=(Map<String,Object>)item;
					   msgMap.put(AuthToken,new AuthProxy(contentAuth,getCtr(method)));
				   }
			   }
		   }
	   }
	   @SuppressWarnings("unchecked")
	public static void invoke(Object metaStmtHandler, BoundSql boundSql){
		   Object paramObject=boundSql.getParameterObject();
		   Map<String,Object> paramMap=null;
		   if(paramObject instanceof Map){
			   paramMap=(Map<String, Object>) paramObject;
			   Object auth=paramMap.get(AuthToken);
				  if(auth!=null&&auth instanceof AuthProxy){
					  AuthProxy aupp=(AuthProxy) auth;
					  try{
						  aupp.invoke(metaStmtHandler,boundSql);
					  }catch(Exception e){
						  e.printStackTrace();
					  }
					 
				  }
			   }
		   }
	   private static ContentPermit getCtr(Method method){
		   return method.getAnnotation(ContentPermit.class);
	   }
	   
	   private static Method getMethodfromTarget(Object target,String methodName){
			Class<?>[] interfaces=target.getClass().getInterfaces();
			Method method=null;
			for(Class<?> item:interfaces){
				for(Method m:item.getMethods()){
					if(m.getName().equals(methodName)){
						method=m;
						return method;
					}
				}
			}
			return method;
		}
	   private static ContentAuth createContentAuth(Method method){
		   ContentAuth contentAuth=null;
		   if(method==null){
			   return contentAuth;
		   }
		   ContentPermit annotation=method.getAnnotation(ContentPermit.class);
		   if(annotation==null){
			   return null;
		   }
		   try {
			   String classType=annotation.type();
			if(classType!=null&&!classType.equals("")){
				@SuppressWarnings("rawtypes")
				Class c=Class.forName(classType);
				Class<?>[] interfaces=c.getInterfaces();
				for(Class<?> item:interfaces){
					if(item.equals(ContentAuth.class)){
							contentAuth=(ContentAuth) c.newInstance();
							break;
					}
				}
			}
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			return contentAuth;
		}  catch (InstantiationException e) {
			// TODO Auto-generated catch block
			return contentAuth;
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			return contentAuth;
		}
		return contentAuth;
	   }
}
