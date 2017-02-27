package util;

import java.util.HashMap;
import java.util.Map;
/**这是一个单例全局缓存，用于保存需要全部加载的数据。
 * 这里的数据如果不存在，直接返回，不需要查询数据库，所以不用ehcache（ehcache不存在会查询数据库）
 * 如果需要更新缓存中的数据，可以在后台管理中触发，
 * 先查询新的数据，然后按照key移除旧的数据,再将新数据作为value*/
public class CacheData {
	   
	   private final static CacheData INSTANCE = new CacheData();
	   //缓存已经创建的Map对象  
	   private Map<String,Object> factoryMap = new HashMap<String,Object>();  
	   private CacheData(){}

	   public static CacheData getInstance() {
	      return INSTANCE;
	   }
	   public Object get(String cachebname){
		   return factoryMap.get(cachebname);
	   }
	   public void put(String cachebname,Object obj){
		   factoryMap.put(cachebname,obj);
	   }
	   public void clear(){
		   factoryMap.clear();
	   }
}
