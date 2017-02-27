package util.web;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;

import org.apache.log4j.Logger;
import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextClosedEvent;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJacksonHttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.ServletRequestHandledEvent;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;

import util.MyDateUtils;
import util.SysLogger;
import util.WebUtil;
@Component
public class WebAppNotifier implements ApplicationListener<ApplicationEvent> {
	@Autowired
	private ApplicationContext appCtx;
	@Autowired
	private RequestMappingHandlerAdapter requestMappingHandlerAdapter;
	
	protected static Logger logger = Logger.getLogger("service");
			
	private ObjectMapper initObjectMapper(){
		//重新设置MappingJacksonHttpMessageConverter的ObjectMapper,
		//统一设定日期格式为yyyy-MM-dd HH:mm:ss
		ObjectMapper objectMapper = new ObjectMapper();
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); 
		objectMapper.setDateFormat(dateFormat);
		
		// 设置输入时忽略在JSON字符串中存在但Java对象实际没有的属性  
		//deserConfig.set(DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES,false);
		objectMapper.configure(DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		//objectMapper.configure(SerializationConfig.Feature.FAIL_ON_EMPTY_BEANS, false);  

		//找到系统中已经加载的MappingJacksonHttpMessageConverter，并重新设置ObjectMapper
		//这是3.0.x支持的
		//HttpMessageConverter<?>[] httpMsgCvts=annotationMethodHandlerAdapter.getMessageConverters();
		//这是3.1.x支持的
		List<HttpMessageConverter<?>> httpMsgCvts =requestMappingHandlerAdapter.getMessageConverters();
		for(HttpMessageConverter<?> cvt:httpMsgCvts){
			if(cvt instanceof MappingJacksonHttpMessageConverter){
				((MappingJacksonHttpMessageConverter)cvt).setObjectMapper(objectMapper);
				break;
			}
		}
		return objectMapper;
	} 
	//当一个ApplicationContext被初始化或刷新 完成后 触发 
	@Override
	public void onApplicationEvent(ApplicationEvent  appEvent) {
//		StringBuilder sbErrMsg = new StringBuilder();
		//logger.debug("---------------"+appCtx.getDisplayName());
		String AppCtxName ="UnKnown";
		if(appCtx.getDisplayName().indexOf("common")>=0)
			AppCtxName = "Common";
		else
			AppCtxName = "UnKnown";
		
		String appName ="";
		if(appEvent instanceof ContextRefreshedEvent){
			
			//应用启动时
			if(appCtx instanceof WebApplicationContext){
				appName=((WebApplicationContext)appCtx).getServletContext().getContextPath();
			}
			logger.info(String.format("应用程序(CtxName=[%s:%s]启动中...",appName,appCtx.getDisplayName())); 
			if(!WebUtil.isEmpty(appCtx)){
				logger.info(String.format("应用程序(CtxName=[%s:%s]进行初始化设置...",appName,AppCtxName));
				
				//设置ApplicationContext,这样在运行时通过WebUtil就能得到当前的AppCtx
				//注意这里有两个应用程序上下文,有些属性
				
				//重新设置Json对象映射配置
				ObjectMapper objMapper = initObjectMapper();
				//保存Json对象映射配置
				if(WebUtil.getObjectMapper()==null)
					WebUtil.setObjectMapper(objMapper);
				/*//设置jna类加载路径
				String loaderPath=Thread.currentThread().getContextClassLoader().getResource("").getPath();
				loaderPath = loaderPath.substring(1, loaderPath.length()-1);
				System.setProperty("jna.library.path",System.getProperty("java.class.path")+";"+loaderPath);
				
				//设置数据库连接参数
				if(WebUtil.getJdbcProperties()==null){
					try {
						Properties p = PropertiesLoaderUtils.loadProperties(new ClassPathResource("config/jdbc.properties"));
						WebUtil.setJdbcProperties(p);
					} catch (IOException e1) {
						logger.info("无法加载数据库连接参数文件[config/jdbc.properties]!");
					}
				}*/
				//当前初始化一次就够了
				if(AppCtxName.equals("Common") && WebUtil.getAppCtx()==null){
					WebUtil.setAppCtx(appCtx);
					WebUtil.setSyslogger(new SysLogger());
					WebUtil.getSyslogger().start();
				}
				/*
				if(AppCtxName.equals("Common")/){
					if(WebUtil.getAppCtx()==null)
						WebUtil.setAppCtx(appCtx);
						//启动日志
						WebUtil.setSyslogger(new SysLogger());
						WebUtil.getSyslogger().start();
				}else{
						//将额外的应用加入
						WebUtil.setAppCtx(AppCtxName, appCtx);
				}
				*/
				logger.info(String.format("应用程序(CtxName=[%s:%s]启动完成...",appName,AppCtxName));
//				System.out.println("web root---"+WebUtil.getRootPath());
			}else{
				logger.info(String.format("应用程序(CtxName=[%s:%s]上下文加载失败！请检查系统配置!",appName,AppCtxName));
			}
		}else if(appEvent instanceof ContextClosedEvent){
			//应用关闭时 
			if(AppCtxName.equals("Common")){
				WebUtil.getSyslogger().stop();
				MyDateUtils.clearThreadLocal();
				System.gc();//调用 gc 方法暗示着 Java 虚拟机做了一些努力来回收未用对象
				try {
					Thread.sleep(2000);
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			logger.info(String.format("应用程序(CtxName=[%s:%s]关闭中...",appName,AppCtxName));
		}else if(appEvent instanceof ServletRequestHandledEvent){
			//请求发生时
			//此处可以记录Servlet被请求的路径、时间、处理耗时等
			/*ServletRequestHandledEvent event =(ServletRequestHandledEvent)appEvent;
			UserInfo user =(UserInfo)SessionUtil.getAttribute("user");
			if(user!=null){
				logger.debug("用户["+user.getName()+"],访问了["+event.getRequestUrl()+"]");
				logger.debug("本次请求处理耗时["+event.getProcessingTimeMillis()+"ms]");
			}*/
		}
	}
	
	public ApplicationContext getAppCtx() {
		return appCtx;
	}
	public void setAppCtx(ApplicationContext appCtx) {
		this.appCtx = appCtx;
	}
	public RequestMappingHandlerAdapter getRequestMappingHandlerAdapter() {
		return requestMappingHandlerAdapter;
	}
	public void setRequestMappingHandlerAdapter(
			RequestMappingHandlerAdapter requestMappingHandlerAdapter) {
		this.requestMappingHandlerAdapter = requestMappingHandlerAdapter;
	}
	
	
}
