package util;

import java.io.StringWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.JavaType;

import com.outsideasy.ws.common.vo.CXFResponse;

public class MyJsonUtil {
		
		private static ObjectMapper objectMapper=initObjectMapper();
		private static ObjectMapper initObjectMapper(){
			ObjectMapper objectMapper = new ObjectMapper();
			DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); 
			objectMapper.setDateFormat(dateFormat);
			
			// 设置输入时忽略在JSON字符串中存在但Java对象实际没有的属性  
			//deserConfig.set(DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES,false);
			objectMapper.configure(DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES, false);
			return objectMapper;
		}
		/**
		 * 将对象转换为json字符串
		 * 
		 * @param obj
		 * @return
		 * @throws Exception
		 */
		public static String obj2string(Object obj) {
			StringWriter sw = new StringWriter();
			try {
				objectMapper.writeValue(sw, obj);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return sw.toString();
		}
		/**
		 * 将字符串转化成CXFResponse*/
		public static <T> CXFResponse<T> str2CXFResponse(String jsonStr, Class<T> cls) {
			CXFResponse<T> res = null;
			try {
				JavaType t = objectMapper.getTypeFactory().constructParametricType(
						CXFResponse.class, cls);
				res = objectMapper.readValue(jsonStr, t);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return res;
		}
		/**
		 * 将字符串转list对象
		 * 
		 * @param <T>
		 * @param jsonStr
		 * @param cls
		 * @return
		 */
		public static <T> List<T> str2list(String jsonStr, Class<T> cls) {
			List<T> objList = null;
			try {
				JavaType t = objectMapper.getTypeFactory().constructParametricType(
						List.class, cls);
				objList = objectMapper.readValue(jsonStr, t);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return objList;
		}
		/**
		 * 将字符串转Map对象,
		 * map的object只能是简单类型
		 * 
		 * @param jsonStr
		 * @param cls
		 * @return
		 */
		public static  Map<String,Object> str2map(String jsonStr) {
			Map<String,Object> map = null;
			try {
				JavaType t = objectMapper.getTypeFactory().constructParametricType(
						Map.class, String.class,Object.class);
				map = objectMapper.readValue(jsonStr, t);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return map;
		}
		/**
		 * 将字符串转为对象
		 * 
		 * @param <T>
		 * @param jsonStr
		 * @param cls
		 * @return
		 */
		public static <T> T str2obj(String jsonStr, Class<T> cls) {
			T obj = null;
			try {
				obj = objectMapper.readValue(jsonStr, cls);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return obj;
		}
}
