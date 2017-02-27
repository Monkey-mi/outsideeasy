
package usercenter.supplierFiles.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import platform.company.model.PfCompanySimpleInfo;

import usercenter.supplierFiles.response.SupplierRegaccountInfoVo;
import usercenter.supplierFiles.service.SupplierRegaccountInfoService;
import util.Const;
import util.WebUtil;

@Controller
@RequestMapping(value="supplierRegaccountInfo")
public class SupplierRegaccountInfoController {
	@Autowired
	public SupplierRegaccountInfoService service;
	/**
	 * 显示入住的供应商的名单
	 * @param request
	 * @param response
	 * @return List<SupplierFiles>
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-07-29
	 */
	@RequestMapping(value="/getSupplierFilesList.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getSupplierFilesList(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();			
		int nLimit =0,npage =0;
		nLimit =qryParam.get("limit")!=null?Integer.parseInt(qryParam.get("limit").toString()):0;
    	npage =qryParam.get("page")!=null?Integer.parseInt(qryParam.get("page").toString()):0;
    	int nStart=nLimit*npage;
    	qryParam.put("start",nStart);
    	List<SupplierRegaccountInfoVo> list = service.getSupplierRegaccountInfoList(qryParam);
		respMap.put(Const.AJAX_SERVICE_TOTAL,qryParam.get(Const.AJAX_SERVICE_TOTAL)!=null?qryParam.get(Const.AJAX_SERVICE_TOTAL):0);
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		respMap.put(Const.AJAX_SERVICE_CURRENT_PAGE, npage);
		return respMap;
	}
	/**
	 * 查询出供应商的名称
	* @Description:
	* SupplierRegaccountInfoController
	* getSupplierNameList
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-10-7 下午2:36:35
	 */
	@RequestMapping(value="/getSupplierNameList.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getSupplierNameList(HttpServletRequest request,HttpServletResponse response)throws Exception{
		Map<String, Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String, Object> resMap = WebUtil.getDefaultResponseMap();		
		List<SupplierRegaccountInfoVo> companyList = new ArrayList<SupplierRegaccountInfoVo>();		
		companyList = service.getSupplierInfoList(qryParam);
		resMap.put(Const.AJAX_SERVICE_SUCCESS, true);
		resMap.put(Const.AJAX_DATA_ROOT, companyList);
		resMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
		return resMap;
	}
	/**
	 * 显示供应商的数量
	 * @param request
	 * @param response
	 * @return List<SupplierFiles>
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-11
	 */
	@RequestMapping(value="/getSupplierFilesCount.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getSupplierFilesCount(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();	
		Integer count  = service.getSupplierRegaccountInfoCount(qryParam);	
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
		respMap.put(Const.AJAX_DATA_ROOT, count);
		return respMap;
	}
	/**
	 * 显示供应商的ID
	 * @param request
	 * @param response
	 * @return List<SupplierFiles>
	 * @throws Exception
	 * @author chenlong
	 * @date 2016-04-11
	 */
	@RequestMapping(value="/getSupplierFilesListID.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getSupplierFilesListID(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();	
		List<SupplierRegaccountInfoVo> list = service.getSupplierReListID(qryParam);	
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
}
