package manager.common.base.service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
@Service
public class BasicData {
		private static Map<String,Object> Basic=new HashMap<String, Object>();
	    public static Map<String,Object> getMap(){
	    	return Basic;
	    }
	    
	    public static void SetCode(String key,@SuppressWarnings("rawtypes") List value){
	    	Basic.put(key, value);
	    }
}
