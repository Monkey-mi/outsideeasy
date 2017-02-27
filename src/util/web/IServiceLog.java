package util.web;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

public interface IServiceLog {
	/**
	 * DynamicCallService业务服务开始前事件
	 * @param request
	 * @return
	 */
	public Object beforeServiceStart(HttpServletRequest request,Map<String,Object> paramMap);
	/**
	 * DynamicCallService业务服务执行失败后事件
	 * @param request
	 * @param result
	 */
	public void afterServiceFailure(HttpServletRequest request, Object result,Map<String,Object> paramMap);
	/**
	 * DynamicCallService业务服务执行成功后事件
	 * @param request
	 * @param result
	 */
	public void afterServiceSuccess(HttpServletRequest request, Object result,Map<String,Object> paramMap);

}
