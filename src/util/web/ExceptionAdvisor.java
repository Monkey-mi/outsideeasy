package util.web;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.springframework.dao.DataAccessException;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import util.SessionUtil;
import util.WebUtil;

import common.model.BusinessException;

/**抛出异常后通知，将所有service层的异常转换成BusinessException，方便统一处理
 * 然后记录日志
 * @author Administrator
 * 参考：http://baalwolf.iteye.com/blog/2187823
 */
public class ExceptionAdvisor {
	
	private  static  final Logger logger = Logger.getLogger(ExceptionAdvisor. class);
	
	public  void doAfterThrowing(JoinPoint joinPoint, Exception ex) {    
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();    
           
        //读取session中的用户    
        String outUserName = SessionUtil.getCurrentPlateLoginAccount()!=null?SessionUtil.getCurrentPlateLoginAccount().getLogin_name():"";  
        String inUserName=SessionUtil.getCurrentUser()!=null?SessionUtil.getCurrentUser().getName():"";
        //获取请求ip    
        String ip = WebUtil.getIpAddr(request);
        //获取用户请求方法的参数并序列化为JSON格式字符串    
        String params = "";    
         if (joinPoint.getArgs() !=  null && joinPoint.getArgs().length > 0) {    
             for ( int i = 0; i < joinPoint.getArgs().length; i++) {   
            	params += joinPoint.getArgs()[i] + ";";   
            }    
        }   
         logger.error("=====service异常通知开始=====");
//         logger.error("异常代码:" + ex.getClass().getName());
//         logger.error("异常信息:" + ex.getMessage()); 
         logger.error("异常信息:" + makeErrorMsg(ex));    
//         logger.error("异常方法:" + (joinPoint.getTarget().getClass().getName() + "." + joinPoint.getSignature().getName() + "()"));    
         logger.error("内部/外部请求人:" + inUserName+"/"+outUserName);    
         logger.error("请求IP:" + ip);    
         logger.error("请求参数:" + params);    
         logger.error("=====service通知结束,继续向上抛BusinessException=====");
         if(ex.getClass().equals(BusinessException.class)){
     		throw (BusinessException)ex;
         }else{ 
        	 // 在这里判断异常，根据不同的异常返回错误。  
        	 throw new BusinessException(getMessageByExceptionClass(ex)); 
         }
    }    
	
    public static String getMessageByExceptionClass(Exception ex){
    	if (ex.getClass().equals(DataAccessException.class))  
        {  
            return "数据库操作失败！";  
        } else if (ex.getClass().toString().equals(  
                NullPointerException.class.toString()))  
        {  
        	return "调用了未经初始化的对象或者是不存在的对象！";  
        } else if (ex.getClass().equals(IOException.class))  
        {  
        	return "IO异常！";  
        } else if (ex.getClass().equals(ClassNotFoundException.class))  
        {  
            return "指定的类不存在！";  
        } else if (ex.getClass().equals(ArithmeticException.class))  
        {  
        	return "数学运算异常！";  
        } else if (ex.getClass().equals(ArrayIndexOutOfBoundsException.class))  
        {  
        	return "数组下标越界!";  
        } else if (ex.getClass().equals(IllegalArgumentException.class))  
        {  
        	return "方法的参数错误！";  
        } else if (ex.getClass().equals(ClassCastException.class))  
        {  
        	return "类型强制转换错误！";  
        } else if (ex.getClass().equals(SecurityException.class))  
        {  
        	return "违背安全原则异常！";  
        } else if (ex.getClass().equals(SQLException.class))  
        {  
        	return "操作数据库异常！";  
        } else if (ex.getClass().equals(NoSuchMethodError.class))  
        {  
        	return "方法末找到异常！";  
        } else if (ex.getClass().equals(InternalError.class))  
        {  
        	return "Java虚拟机发生了内部错误";  
        } else  
        {  
        	return "程序内部错误，操作失败！";  
        }  
    }
    /*public static String getExceptionStack(Exception e) {
        StackTraceElement[] stackTraceElements = e.getStackTrace();
        StringBuffer result = new StringBuffer(e.toString() + "\n");
        for (int index = stackTraceElements.length - 1; index >= 0; --index) {
        	result.append("at [" + stackTraceElements[index].getClassName() + ",");
        	result.append(stackTraceElements[index].getFileName() + ",");
        	result.append(stackTraceElements[index].getMethodName() + ",");
        	result.append(stackTraceElements[index].getLineNumber() + "]\n");
        }
        return result.toString();
    }*/
    //产生标准错误消息
  	public static String makeErrorMsg(Exception e){
  		StringBuilder sb = new StringBuilder();
  		sb.append("错误发生在:\r\n\t");
  		StackTraceElement[] stacks = e.getStackTrace();
  		for(StackTraceElement stack:stacks){
  			sb.append(stack.toString()).append("\r\n\t");
  		}
  		sb.append("错误详情:\r\n\t");
  		sb.append(e.getMessage());
  		return sb.toString();
  	}
}
