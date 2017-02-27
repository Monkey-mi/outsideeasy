package util;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import org.apache.commons.beanutils.BeanUtils;  
import org.apache.commons.beanutils.PropertyUtilsBean;

public class BeanUtil {
	  /** 
	   * 把实体bean对象转换成DBObject 
	   * @param bean 
	   * @return 
	   * @throws IllegalArgumentException 
	   * @throws IllegalAccessException 
	   */  
	  public static <T> DBObject bean2DBObject(T bean) throws IllegalArgumentException,  
	      IllegalAccessException {  
	    if (bean == null) {  
	      return null;  
	    }  
	    DBObject dbObject = new BasicDBObject();  
	    // 获取对象对应类中的所有属性域  
	    Field[] fields = bean.getClass().getDeclaredFields();  
	    for (Field field : fields) {  
	      // 获取属性名  
	      String varName = field.getName();  
	      // 修改访问控制权限  
	      boolean accessFlag = field.isAccessible();  
	      if (!accessFlag) {  
	        field.setAccessible(true);  
	      }  
	      Object param = field.get(bean);  
	      if (param == null) {  
	        continue;  
	      } else if (param instanceof Integer) {//判断变量的类型  
	        int value = ((Integer) param).intValue();  
	        dbObject.put(varName, value);  
	      } else if (param instanceof String) {  
	        String value = (String) param;  
	        dbObject.put(varName, value);  
	      } else if (param instanceof Double) {  
	        double value = ((Double) param).doubleValue();  
	        dbObject.put(varName, value);  
	      } else if (param instanceof Float) {  
	        float value = ((Float) param).floatValue();  
	        dbObject.put(varName, value);  
	      } else if (param instanceof Long) {  
	        long value = ((Long) param).longValue();  
	        dbObject.put(varName, value);  
	      } else if (param instanceof Boolean) {  
	        boolean value = ((Boolean) param).booleanValue();  
	        dbObject.put(varName, value);  
	      } else if (param instanceof Date) {  
	        Date value = (Date) param;  
	        dbObject.put(varName, value);  
	      }  
	      // 恢复访问控制权限  
	      field.setAccessible(accessFlag);  
	    }  
	    return dbObject;  
	  }  
	  
	  /** 
	   * 把DBObject转换成bean对象 
	   * @param dbObject 
	   * @param bean 
	   * @return 
	   * @throws IllegalAccessException 
	   * @throws InvocationTargetException 
	   * @throws NoSuchMethodException 
	   */  
	  public static <T> T dbObject2Bean(DBObject dbObject, T bean) throws IllegalAccessException,  
	      InvocationTargetException, NoSuchMethodException {  
	    if (bean == null) {  
	      return null;  
	    }  
	    Field[] fields = bean.getClass().getDeclaredFields();  
	    for (Field field : fields) {  
	      String varName = field.getName();  
	      Object object = dbObject.get(varName);  
	      if (object != null) {  
	        BeanUtils.setProperty(bean, varName, object);  
	      }  
	    }  
	    return bean;  
	  }  	
	  
	  /**
		 * @Description:map转化为java实体类
		 * SupplierFileService
		 * mapToObject
		 * @param map
		 * @param beanClass
		 * @return
		 * @throws Exception Object
		 * @author yukai
		 * 2016-10-18 下午4:10:39
		 */
	    public static Object mapToObject(Map<String, Object> map, Class<?> beanClass) throws Exception {    
	        if (map == null)  
	            return null;  
	  
	        Object obj = beanClass.newInstance();  
	  
	        org.apache.commons.beanutils.BeanUtils.populate(obj, map);  
	  
	        return obj;  
	    }
	    
	    /**
		 * @Description:将java实体类对象转化为map对象
		 * SupplierFileService
		 * beanToMap
		 * @param obj
		 * @return Map<String,Object>
		 * @author yukai
		 * 2016-10-13 下午4:12:03
		 */
		public static Map<String, Object> beanToMap(Object obj) { 
	        Map<String, Object> params = new HashMap<String, Object>(0); 
	        try { 
	            PropertyUtilsBean propertyUtilsBean = new PropertyUtilsBean(); 
	            PropertyDescriptor[] descriptors = propertyUtilsBean.getPropertyDescriptors(obj); 
	            for (int i = 0; i < descriptors.length; i++) { 
	                String name = descriptors[i].getName(); 
	                if (!"class".equals(name)) { 
	                    params.put(name, propertyUtilsBean.getNestedProperty(obj, name)); 
	                } 
	            } 
	        } catch (Exception e) { 
	            e.printStackTrace(); 
	        } 
	        return params; 
		}
}
