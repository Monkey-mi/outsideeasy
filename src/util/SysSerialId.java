package util;

import java.util.Date;


public class SysSerialId {
	
	private static int count=0;
	
	public synchronized final static String getNextSerialId(){
		String s1=MyDateUtils.format_yyyyMMddHHmmsss(new Date());
		count++;
		return s1+flushLeft('0',5,count+"");
	}
	 /* c 要填充的字符    
	    *  length 填充后字符串的总长度    
	    *  content 要格式化的字符串   
	    *  格式化字符串，左对齐 
	    * */  
	 public static String flushLeft(char c, long length, String content){             
	       String str = "";   
	       String cs = "";     
	       if (content.length() > length){     
	            str = content;     
	       }else{    
	            for (int i = 0; i < length - content.length(); i++){     
	                cs = cs + c;     
	            }  
	          }  
	        str = cs+content;      
	        return str;      
	   }  
	 public static void main(String[] args){
		 for(int i=0;i<10;i++){
			 System.out.println(SysSerialId.getNewNextSerialIdForSend2());
		 }
	 }
	 /**
	  * 生成规则为Wx+分秒+月+日+年+当天的4位递增编号
	  * @return
	  * @ date 2016-05-26
	  * @author chenlong
	  */
	 public synchronized final static String getNewNextSerialId(){		
			String s1="Wx" + SRMStringUtil.format(new Date());
			count++;
			return s1+flushLeft('0',4,count+"");
	}
	 /**
	  * 生成规则为YD+分秒+月+日+年+当天的4位递增编号
	  * @return
	  * @ date 2016-12-02
	  * @author chenlong
	  */
	 public synchronized final static String getNewNextSerialIdForSend1(){		
		    String s1="YD" + SRMStringUtil.format(new Date());
			count++;
			return s1+flushLeft('0',4,count+"");
	}
	 /**
	  * 生成规则为FH+分秒+月+日+年+当天的4位递增编号
	  * @return
	  * @ date 2016-12-02
	  * @author chenlong
	  */
	 public synchronized final static String getNewNextSerialIdForSend2(){		
		    String s1="FH" + SRMStringUtil.format(new Date());
			count++;
			return s1+flushLeft('0',4,count+"");
	}
	 /**
	  * 生成规则为PJQ+yyyyMMdd+当天的4位递增编号
	  * @return
	  * @ date 2016-08-25
	  * @author wuqia
	  */
	 public synchronized final static String getNewNextSerialIdPJQ(){		
			String s1="PJQ" + MyDateUtils.format__yyyy_MM_dd(new Date());
			count++;
			return s1+flushLeft('0',4,count+"");
	}
	 /**
	  * 生成规则为P+分秒+月+日+年+当天的4位递增编号
	  * @return
	  * @ date 2016-08-24
	  * @author duchao
	  */
	 public synchronized final static String getNewNextOrderId(){		
			String s1="P" + SRMStringUtil.format(new Date());
			count++;
			return s1+flushLeft('0',4,count+"");
		}
}
