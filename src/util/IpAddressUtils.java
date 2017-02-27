/**    
 * 文件名：IpAddress.java    
 *    
 * 版本信息：    
 * 日期：2016-6-22    
 * Copyright 足下 Corporation 2016     
 * 版权所有    
 *    
 */
package util;

import javax.servlet.http.HttpServletRequest;

/**    
 * IP操作公用类
 * 项目名称：outsideeasy    
 * 类名称：IpAddress    
 * 创建人：mishengliang    
 * 创建时间：2016-6-22 上午11:40:24    
 * 修改人：mishengliang    
 * 修改时间：2016-6-22 上午11:40:24    
 * @version     
 *     
 */
public class IpAddressUtils {
	/**
	 * 获取当前操作的的IP
	*getCurrentIpAddress
	*@param request
	*@return
	*String
	*@author mishengliang
	*2016-6-22下午1:41:08
	 */
	public static String getCurrentIpAddress(HttpServletRequest httpReq){
		String ip = httpReq.getHeader("x-forwarded-for");
		ip = ip == null ? "" : ip.trim();
		if (ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = httpReq.getHeader("Proxy-Client-IP");
		} else {
			String[] ips = ip.split(",");
			if (ips.length > 0)
				ip = ips[0];
		}
		ip = ip == null ? "" : ip.trim();
		if (ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = httpReq.getHeader("WL-Proxy-Client-IP");
		}
		ip = ip == null ? "" : ip.trim();
		if (ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = httpReq.getRemoteAddr();
		}
		ip = ip == null ? "" : ip.trim();
		if (ip.indexOf("0:0:0:0:0:0:0:1") >= 0 || ip.indexOf("::1") >= 0)
			ip = "127.0.0.1";
		return ip; 
	}
	
}
