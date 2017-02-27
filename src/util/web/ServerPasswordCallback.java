package util.web;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.security.auth.callback.Callback;
import javax.security.auth.callback.CallbackHandler;
import javax.security.auth.callback.UnsupportedCallbackException;
import javax.servlet.http.HttpServletRequest;

import org.apache.cxf.message.Exchange;
import org.apache.cxf.message.Message;
import org.apache.cxf.staxutils.W3CDOMStreamWriter;
import org.apache.log4j.Logger;
import org.apache.ws.security.WSPasswordCallback;
import org.apache.ws.security.handler.RequestData;
import org.springframework.beans.factory.annotation.Autowired;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;


import common.sysmodule.model.WsIdentity;
import common.sysmodule.service.WsIdentityService;

public class ServerPasswordCallback implements CallbackHandler {
	@Autowired
	private WsIdentityService wsIdentityService;
	protected static Logger logger = Logger.getLogger("service");

	@Override
	public void handle(Callback[] callbacks) throws IOException,
			UnsupportedCallbackException {
		
		WSPasswordCallback pc = (WSPasswordCallback) callbacks[0]; 
		String identify = pc.getIdentifier();
		
		//身份验证
        List<WsIdentity> list=wsIdentityService.getEnabledIdentity(identify);
        if (list!=null && list.size()>0 && list.get(0).getIdentify().equals(identify)) {  
           pc.setPassword(list.get(0).getPsw());//验证用户名后，在设置密码就可以自动验证
        } else {  
            throw new SecurityException("验证失败");
        }
       
		//可以精确到接口以及 方法
		/*
		RequestData rd=pc.getRequestData();
		Message message=(Message) rd.getMsgContext();
		Exchange exchange = message.getExchange();
		if (exchange != null) {			
			Message inMessage = exchange.getInMessage();
			W3CDOMStreamWriter w3CDOMStreamWriter = (W3CDOMStreamWriter) inMessage
					.get(W3CDOMStreamWriter.class.getName());
			String methodName="";
			String requestParams=null;
			if (w3CDOMStreamWriter != null) {
				Document document = w3CDOMStreamWriter.getDocument();
				if (document != null) {
					NodeList body = document.getElementsByTagName("soap:Body");
					Node method = body.item(0).getFirstChild();
					if (method != null) {
						methodName = method.getNodeName();
						String[] methods = methodName.split(":");
						if (methods != null && methods.length == 2) {
							methodName = methods[1];
						}	
						NodeList args = method.getChildNodes();
						if(args!=null && args.getLength()>0){
							Node arg= args.item(0);
							requestParams=arg.getNodeName()+":"+arg.getTextContent();
						}
					}
				}
			}
			String clientIp = null;
			HttpServletRequest req = (HttpServletRequest) inMessage.get("HTTP.REQUEST");
			clientIp = WebUtil.getIpAddr(req);
			
			logger.info("-----------server in interceptor-----------");
			logger.info(String.format("client ip:%s",clientIp));
			logger.info(String.format("Encoding:%s",inMessage.get(Message.ENCODING)));
			logger.info(String.format("Content-Type:%s",inMessage.get(Message.CONTENT_TYPE)));
			logger.info(String.format("headers:%s",inMessage.get(Message.PROTOCOL_HEADERS)));
			logger.info(String.format("payload:%s",inMessage.get("org.apache.cxf.staxutils.W3CDOMStreamWriter")));
			logger.info(String.format("webservice接口路径=%s,调用方法=%s,参数=%s",inMessage.get(Message.REQUEST_URI),methodName,requestParams));
			
		}*/
		
	}

}
