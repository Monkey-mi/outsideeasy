package common.user.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import util.Const;
import util.WebUtil;

import common.user.response.RegAccountCompanyVo;
import common.user.service.RegAccoutCompanyInfoService;

@Controller
@RequestMapping(value="regAccoutCompanyInfo")
public class RegAccoutCompanyInfoController {
	@Autowired
    private RegAccoutCompanyInfoService service;
	
	
	/**
	* @Description:返回主账号下的所有可用的公司
	* RegAccoutCompanyInfoController
	* getSupplierFilesList
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-8-8 下午2:57:44
	*/
	@RequestMapping(value="/getRegAccoutCompanyInfoOne.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getSupplierFilesList(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();			
		int nLimit =0,npage =0;
		nLimit =qryParam.get("limit")!=null?Integer.parseInt(qryParam.get("limit").toString()):0;
    	npage =qryParam.get("page")!=null?Integer.parseInt(qryParam.get("page").toString()):0;
    	int nStart=nLimit*npage;
    	qryParam.put("start",nStart);
    	List<RegAccountCompanyVo> list = service.getRegAccoutCompanyInfoOne(qryParam);
		respMap.put(Const.AJAX_SERVICE_TOTAL,qryParam.get(Const.AJAX_SERVICE_TOTAL)!=null?qryParam.get(Const.AJAX_SERVICE_TOTAL):0);
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		respMap.put(Const.AJAX_SERVICE_CURRENT_PAGE, npage);
		return respMap;
	}

	/**
	* @Description:返回主账号下所有公司的条数
	* RegAccoutCompanyInfoController
	* getSupplierFilesCount
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-8-8 下午2:57:56
	*/
	@RequestMapping(value="/getRegAccoutCompanyInfoCount.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getSupplierFilesCount(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();	
		Integer count  = service.getRegAccoutCompanyInfoCount(qryParam);	
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
		respMap.put(Const.AJAX_DATA_ROOT, count);
		return respMap;
	}

	/**
	* @Description:返回主账号下的所有可用供应商的id
	* RegAccoutCompanyInfoController
	* getSupplierFilesListID
	* @param request
	* @param response
	* @return
	* @throws Exception Map<String,Object>
	* @author chenlong
	* 2016-8-8 下午2:58:04
	*/
	@RequestMapping(value="/getRegAccoutCompanyListID.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getSupplierFilesListID(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();	
		List<RegAccountCompanyVo> list = service.getRegAccoutCompanyListID(qryParam);	
		respMap.put(Const.AJAX_SERVICE_SUCCESS,true);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
}
