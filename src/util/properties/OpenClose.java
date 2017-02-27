package util.properties;

import java.io.IOException;
import java.util.Properties;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

public class OpenClose {
	
	private final static OpenClose INSTANCE=new OpenClose();
	
	private Properties myProperty;
	
	private Properties getMyProperty() {
		return myProperty;
	}
	private OpenClose(){
		try {
			myProperty=PropertiesLoaderUtils.loadProperties(new ClassPathResource("config/openclose.properties"));
			
		} catch (IOException e) {
			e.printStackTrace();
		};
	}
	/**
	* @Description: 按照key获取值
	* @param key
	* @return
	* @author xufeng
	* @date 2016-6-2 
	*/
	public static String getPropertiesByKey(String key) {
		return INSTANCE.getMyProperty().getProperty(key);
	}	
	
}
