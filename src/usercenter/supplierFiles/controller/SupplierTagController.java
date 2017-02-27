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

import usercenter.supplierFiles.model.SupplierTag;
import usercenter.supplierFiles.service.SupplierTagInfoService;
import usercenter.supplierFiles.service.SupplierTagService;
import util.Const;
import util.DataTrans;
import util.SessionUtil;
import util.WebUtil;

import common.user.model.LoginAccount;

@Controller
@RequestMapping(value="supplierTag")
public class SupplierTagController {
	@Autowired
	private SupplierTagService tagService;
	@Autowired
	private SupplierTagInfoService tagInfoService;
	
	/**
	 * @Description:  查找相应账号下的标签
	 * SupplierFilesController
	 * getSupplierTagContentList
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author mishengliang
	 * 2016-8-4 上午11:40:43
	 */
	@RequestMapping(value="/getSupplierTagListForAccount.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String, Object> getSupplierTagContentList(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		Integer loginId = loginAccount.getLogin_id();
		Integer accountType = loginAccount.getAccount_type();
		
		if(accountType == 0){//主账号
			qryParam.put("accountId", loginId);
			qryParam.put("tagType", 0);
			list = tagService.getSupplierTagListForAccount(qryParam);
		}else if(accountType == 1){//子账号获取 包括主账号的标签也需要获取
			qryParam.put("accountId", loginAccount.getParent_id());
			qryParam.put("tagType", 0);
			list = tagService.getSupplierTagListForAccount(qryParam);
			qryParam.put("accountId", loginId);
			qryParam.put("tagType", 1);
			List<Map<String, Object>>  subList = tagService.getSupplierTagListForAccount(qryParam);
			list.addAll(subList);
		}
		
		respMap.put("tagForAccount", list);
		return respMap;
	}
	
	/**
	 * @Description: 新建标签
	 * SupplierTagController
	 * addSupplierTag
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author mishengliang
	 * 2016-8-9 上午11:36:49
	 */
	@RequestMapping(value="/addSupplierTag.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> addSupplierTag(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();
		Integer loginId = loginAccount.getLogin_id();
		
		SupplierTag supplierTag = new SupplierTag();
		supplierTag.setAccount_id(loginId);
		supplierTag.setTag_name(request.getParameter("tagName"));
		supplierTag.setCompany_id(DataTrans.transToIntegerFromString(request.getParameter("companyId")));
		supplierTag.setTag_type(loginAccount.getAccount_type());//两者的数值一致：tagType: 0共有 1私有
		int tagId = tagService.addSupplierTag(supplierTag);
		respMap.put("tagId", tagId);
		
		return respMap;
	}
	
	/**
	 * @Description: 根据标签ID删除标签
	 * SupplierTagController
	 * deleteSupplierTag
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author mishengliang
	 * 2016-8-9 下午2:59:46
	 */
	@RequestMapping(value="/deleteSupplierTag.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> deleteSupplierTag(HttpServletRequest request, HttpServletResponse response){
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		
		tagService.deleteSupplierTag(qryParam);
		return respMap;
	}
	
	/**
	 * @Description: 根据tagId更新tagName
	 * SupplierTagController
	 * updateSupplierTag
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author mishengliang
	 * 2016-8-9 下午3:40:28
	 */
	@RequestMapping(value="/updateSupplierTag.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updateSupplierTag(HttpServletRequest request, HttpServletResponse response){
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		
		tagService.updateSupplierTag(qryParam);
		return respMap;
	}
	
	/**
	 * @Description: 增加标签和供应商关联关系
	 * SupplierTagController
	 * checkedTagWithSupplier
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author mishengliang
	 * 2016-8-10 下午3:28:21
	 */
	@RequestMapping(value="/checkedTagWithSupplier.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> checkedTagWithSupplier(HttpServletRequest request, HttpServletResponse response){
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		
		tagInfoService.addSupplierTagInfo(qryParam);
		return respMap;
	}
	
	/**
	 * @Description: 删除标签和供应商关联关系 指定单一关系
	 * SupplierTagController
	 * uncheckedTagWithSupplier
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author mishengliang
	 * 2016-8-10 下午3:50:20
	 */
	@RequestMapping(value="/uncheckedTagWithSupplier.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> uncheckedTagWithSupplier(HttpServletRequest request, HttpServletResponse response){
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		
		tagInfoService.deleteSupplierTagInfo(qryParam);
		return respMap;
	}
	/**
	 * @Description:批量增加标签和供应商关联关系
	 * SupplierTagController
	 * addSupplierTags
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author yukai
	 * 2016-12-26 上午9:14:34
	 */
	@RequestMapping(value="/addSupplierTags.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> addSupplierTags(HttpServletRequest request, HttpServletResponse response){
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		
		tagInfoService.addSupplierTags(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, true);
		return respMap;
	}
	/**
	 * @Description:批量删除标签和供应商关联关系 指定单一关系
	 * SupplierTagController
	 * delSupplierTags
	 * @param request
	 * @param response
	 * @return Map<String,Object>
	 * @author yukai
	 * 2016-12-26 上午9:15:03
	 */
	@RequestMapping(value="/delSupplierTags.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> delSupplierTags(HttpServletRequest request, HttpServletResponse response){
		Map<String,Object>  qryParam =  WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		
		tagInfoService.delSupplierTags(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, true);
		return respMap;
	}
}
