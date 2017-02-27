package common.model;

public class BusinessException extends RuntimeException {
	
	  /**
	 * 自定义业务异常处理类    友好提示 
	 * http://baalwolf.iteye.com/blog/2187823
	 */
	private static final long serialVersionUID = 9050819994938181541L;

	public BusinessException(String frdMessage)  
	    {  
	        super(createFriendlyErrMsg(frdMessage));  
	    }  
	  
	    public BusinessException(Throwable throwable)  
	    {  
	        super(throwable);  
	    }  
	  
	    public BusinessException(Throwable throwable, String frdMessage)  
	    {  
	        super(throwable);  
	    }  
	  
	    private static String createFriendlyErrMsg(String msgBody)  
	    {  
	        String prefixStr = "抱歉，";  
	        String suffixStr = " 请稍后再试或与管理员联系！";  
	  
	        StringBuffer friendlyErrMsg = new StringBuffer("");  
	  
	        friendlyErrMsg.append(prefixStr);  
	  
	        friendlyErrMsg.append(msgBody);  
	  
	        friendlyErrMsg.append(suffixStr);  
	  
	        return friendlyErrMsg.toString();  
	    } 
}
