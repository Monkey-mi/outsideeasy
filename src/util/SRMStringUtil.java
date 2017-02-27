package util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang.StringEscapeUtils;

import util.properties.OpenClose;


import manager.common.main.model.SortModel;

public class SRMStringUtil {
	/**功能：给MAP查询参数添加 order by参数**/
	public void addOrderBySQL2(Map<String,Object> params){
			if(params.get("sort")!=null && !"".equals(params.get("sort")) 
					&& params.get("sort").toString().contains("property") && params.get("sort").toString().contains("direction")){
				List<SortModel> sortList=MyJsonUtil.str2list(params.get("sort").toString(), SortModel.class);
				StringBuilder orderBySQL=new StringBuilder("");
				int length=sortList.size();
				for(int i=0;i<length-1;i++){
					orderBySQL.append(sortList.get(i).getProperty()).append(" ").append(sortList.get(i).getDirection()).append(",");
				}
				if(length>0){
					orderBySQL.append(sortList.get(length-1).getProperty()).append(" ").append(sortList.get(length-1).getDirection());
				}
				//System.out.println("orderBySQL:"+orderBySQL.toString());
				params.put("orderBySQL", orderBySQL.toString());
			}
	}
	
	/**判断是否是数字*/
	public static boolean isNumber(String value){
		//Pattern pattern = Pattern.compile("^\\d+$|-\\d+$"); // 就是判断是否为整数
		//Pattern pattern = Pattern.compile("\\d+\\.\\d+$|-\\d+\\.\\d+$");//判断是否为小数
		Pattern pattern = Pattern.compile("\\d+\\.\\d+$|-\\d+\\.\\d+$|^\\d+$|-\\d+$");//判断是否为数字
		Matcher isNum = pattern.matcher(value);
		if (!isNum.matches()) {
			return false;
		}
		return true;
	}
	
	public static String getUUID(){ 
        String s = UUID.randomUUID().toString(); 
        //去掉“-”符号 
        return s.substring(0,8)+s.substring(9,13)+s.substring(14,18)+s.substring(19,23)+s.substring(24); 
    } 
	
    /** 
     * 获得指定数目的UUID 
     * @param number int 需要获得的UUID数量 
     * @return String[] UUID数组 
     */ 
    public static String getUUID(int number){ 
        if(number < 1){ 
            return null; 
        } 
        String[] ss = new String[number]; 
        for(int i=0;i<number;i++){ 
            ss[i] = getUUID(); 
        } 
        return ss.toString(); 
    } 
    
	/**
	 * 生成特定的时间String mmsssHHMMddyyyy
	 * @author chenlong
	 * @date 2016-7-13
	 */
	public static ThreadLocal<DateFormat> mmsssHHMMddyyyy_FORMAT = new ThreadLocal<DateFormat>() {
		 
         @Override
         protected synchronized DateFormat initialValue() {
             return new SimpleDateFormat("mmsssHHMMddyyyy");
         }
     };
     public static Date parse(String dateStr) throws ParseException {
         return mmsssHHMMddyyyy_FORMAT.get().parse(dateStr);
     }

     public static String format(Date date) {
         return mmsssHHMMddyyyy_FORMAT.get().format(date);
     }
     
     /**
    * @Description: 如果开启了字符串防XSS攻击，就转义
    * @param str
    * @return 转以后的字符串
    * @author xufeng
    * @date 2016-8-16 
    */
    public static String escapeHtml(String str){
    	 if(str==null){
    		 return null;
    	 } else{
    		  if(!"open".equals(OpenClose.getPropertiesByKey("openEscapeHtml"))){
    			  return str;
    		  }else{
    			  return StringEscapeUtils.escapeHtml(str);
    		  }
    	 }
     }
    
    /**功能：从URL路径中，获取有效的匹配路径(就是去掉搜索条件和后缀,参数)
     * 前提：参数中不含/*/
    public static String getPartPathFromUrl(String tarUri){
    	if(tarUri!=null && tarUri.indexOf(".htm")>0){
    		tarUri=tarUri.substring(0, tarUri.indexOf(".htm"));
    		//tarUri=tarUri.substring(0, tarUri.lastIndexOf("/"));
    	}
    	return tarUri;
    }
    
    /**
     * @Description:页面显示将容易引起xss漏洞的全角字符反转为半角字符
     * SRMStringUtil
     * xssEncodeReverse
     * @param s
     * @return String
     * @author yukai
     * 2017-1-20 下午3:00:08
     */
    public static String xssEncodeReverse(String s) { 
        if(s == null|| s.isEmpty()) { 
            return s; 
        } 
        StringBuilder sb = new StringBuilder(s.length() + 16); 
        for(int i = 0; i < s.length(); i++) { 
            char c = s.charAt(i); 
            switch(c) { 
            case'＞': 
                sb.append(">");// 转义大于号  
                break; 
            case'＜': 
                sb.append("<");// 转义小于号  
                break; 
            case'＇': 
                sb.append("\'");// 转义单引号  
                break; 
            /*case'\"': 
                sb.append("＂");// 转义双引号  ;先注释掉，会影响json的转化
                break; */
            case'＆': 
                sb.append("&");// 转义&  
                break; 
            default: 
                sb.append(c); 
                break; 
            } 
        } 
        return sb.toString(); 
    } 
}
