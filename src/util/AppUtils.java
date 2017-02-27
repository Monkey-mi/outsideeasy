package util;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Iterator;

import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

public class AppUtils {
	/**
	 * 把整数数组形式的字符串转换成整数数组
	 * @param inputStr 形如"[1,2,3,4,5,6,7]"
	 * @return
	 */
	public static int[] Str2IntArray(String inputStr){
		int[] intArray = null;
		if(inputStr!=null){
			inputStr = inputStr.trim().replace("[", "").replace("]","");
			if(inputStr.length()>0){
				String[] strArray = inputStr.split(",") ;
				intArray = new int[strArray.length];
		        for (int i = 0; i < strArray.length; i++) {
		        	intArray[i] = Integer.parseInt(strArray[i]);
				}
			}else
				intArray =null;
		}
		return intArray;
	}
	
	/**
	 * 把整数数组转换成整数数组形式的字符串
	 * @param intArray
	 * @return 形如"[1,2,3,4,5,6,7]"字符串
	 */
	public static String IntArray2Str(int[] intArray){
		String retStr ="";
		if(intArray!=null){
			for (int ftid : intArray) {
				retStr += ftid+",";
			}
			retStr =String.format("[%s]",retStr);
		}
		return retStr;
	}
	
	/**将二进制数组转换成16进制形式的文本 
	* @param buf 二进制数组
	* @return 16进制形式的文本
	*/  
	public static String parseByte2HexStr(byte buf[]) {  
	           StringBuffer sb = new StringBuffer();  
	           for (int i = 0; i < buf.length; i++) {  
	                   String hex = Integer.toHexString(buf[i] & 0xFF);  
	                   if (hex.length() == 1) {  
	                           hex = '0' + hex;  
	                   }  
	                   sb.append(hex.toUpperCase());  
	           }  
	           return sb.toString();  
	   }  
	   /**将16进制形式的问题转换为二进制数组
	* @param hexStr 16进制形式的文本
	* @return 二进制数组
	*/  
	public static byte[] parseHexStr2Byte(String hexStr) {  
	           if (hexStr.length() < 1)  
	                   return null;  
	           byte[] result = new byte[hexStr.length()/2];  
	           for (int i = 0;i< hexStr.length()/2; i++) {  
	                   int high = Integer.parseInt(hexStr.substring(i*2, i*2+1), 16);  
	                   int low = Integer.parseInt(hexStr.substring(i*2+1, i*2+2), 16);  
	                   result[i] = (byte) (high * 16 + low);  
	           }  
	           return result;  
	   }
	
	public static org.json.JSONObject ConvertStringToJson(String StrJson)throws Exception{
		org.json.JSONObject obj = new org.json.JSONObject(StrJson);  
		return obj;	
	}
	public static void writeExcel(OutputStream os, String FileName,String data) throws IOException, RowsExceededException, WriteException {
			// 创建可以写入的Excel工作薄(默认运行生成的文件在tomcat/bin下 )
		HSSFWorkbook workbook=new HSSFWorkbook();	
		HSSFSheet sheet=workbook.createSheet(FileName);
			// 生成工作表,(name:First Sheet,参数0表示这是第一页)
			JSONArray arrObj=null;
			try{
				arrObj = JSONArray.fromObject (data);
			}catch(Exception e){
				e.printStackTrace();
			}
			HSSFRow header=sheet.createRow(0); //第0行
			
			for (int i = 0; i < arrObj.size(); i++) {
				// 用于写入文本内容到工作表中去
				JSONObject obj=arrObj.getJSONObject(i);
				@SuppressWarnings("unchecked")
				Iterator<String> itr=obj.keys();
				HSSFCell cells[] = new HSSFCell[obj.size()];
				HSSFRow row=sheet.createRow(i+1);
				int j=0;
				while (itr.hasNext()){
				  String key=itr.next();
				  if (i==0){
					  cells[j]=header.createCell(j);
					  cells[j].setCellValue(key);
				  }	
					//设定单元格
				  HSSFCell cell =row.createCell(j);
				  cell.setCellValue(obj.getString(key));
				  j++;
				  	  
				}

			}
			workbook.write(os);
			// 关闭输出流
			os.close();
	}
	
	/**
	 * 隐藏邮件字符串
	 * 规则：@前字母小于等于三位，则返回全拼；@前字母大于三位，将其3-6位替换为*；不足6位时只替换能替换的字母
	*hiddenEmail
	*@param email
	*@return
	*String
	*@author mishengliang
	*2016-7-12下午3:18:59
	 */
	public static String hideEmail(String email){
		if(email == null || email.indexOf("@") <= 3){return email;}
		
		StringBuffer sb = new StringBuffer();
		for(int i = 0;i < email.length(); i++){
			if(i>2 && i < 6 && i < email.indexOf("@")){
				sb.append("*");
			}else{
				sb.append(email.charAt(i));
			}
		}
		return sb.toString();
	}
	
	/**
	 * 隐藏手机字符串
	*hidePhoneNum
	*@param phoneNum
	*@return
	*String
	*@author mishengliang
	*2016-7-13下午5:28:51
	 */
	public static String hidePhoneNum(String phoneNum){
		if(phoneNum == null){return phoneNum;}
		
		String fontPhoneNum = phoneNum.substring(0, 3);
		String behindPhoneNum = phoneNum.substring(phoneNum.length()-4,phoneNum.length());
		String hiddenPhoneNum = fontPhoneNum + "****" + behindPhoneNum;
		return hiddenPhoneNum;
	}
}
