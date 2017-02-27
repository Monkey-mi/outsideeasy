package com.outsideasy.ws.common.vo;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import util.Const;

public class CXFResponse  <T> implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -8215944623024344141L;
	private Map<String,Object> params;
	private List<T> list;
	private T obj;
	private String success;
	private String errorMessage;
	public Map<String, Object> getParams() {
		return params;
	}
	public void setParams(Map<String, Object> params) {
		this.params = params;
	}
	public List<T> getList() {
		return list;
	}
	public void setList(List<T> list) {
		this.list = list;
	}
	public T getObj() {
		return obj;
	}
	public void setObj(T obj) {
		this.obj = obj;
	}
	public String getSuccess() {
		return success;
	}
	public void setSuccess(String success) {
		this.success = success;
	}
	public String getErrorMessage() {
		return errorMessage;
	}
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
	public void setSuccessResponseInfo(List<T> list,Map<String,Object> params){
		this.list = list;
		this.params = params;
		this.success =Const.SOAP_TRUE;
	}
	public void setErroeResponseInfo(String errorMessage){
		this.errorMessage = errorMessage;
		this.success =Const.SOAP_FALSE;
	}
}

