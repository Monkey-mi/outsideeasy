package usercenter.organize.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import usercenter.common.model.TreeModel;
import usercenter.organize.model.Organization;
import usercenter.organize.service.OrganizationService;
import usercenter.purchaseManage.purchaseCategory.model.PurchaseCategory;
import usercenter.subAccount.service.SubAccountService;
import util.Const;
import util.SessionUtil;
import util.WebUtil;

import common.user.model.LoginAccount;
import common.user.model.RegAccout;
@Controller
@RequestMapping("organization")
public class OrganizeCtrl {
	@Autowired
	private OrganizationService organizationService;
	@Autowired
	private SubAccountService subAccountService;
	
	/**获取组织列表*/
	@RequestMapping(value="/getOrganizationList.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getOrganizationList(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<Organization> list=organizationService.getOrganizationList(qryParam);
		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
	/**获取组织列表
	 * 部门名称name*/
	@RequestMapping(value="/getOrganizationListByName.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getOrganizationListByName(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<Organization> list=organizationService.getOrganizationListByName(qryParam);
		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
	/**根据org_id找到上级部门
	 * 部门名称name*/
	@RequestMapping(value="/getOrganizationListByOrg_id.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getOrganizationListByOrg_id(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		int org_id=Integer.parseInt(qryParam.get("org_id").toString());
		List<Organization> list=organizationService.getOrganizationListByOrg_id(org_id);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
	/**获取组织和当前用户名称
	 * **/
	@RequestMapping(value="/getOrganizationListAndUserName.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getOrganizationListAndUserName(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<Organization> list=organizationService.getOrganizationList(qryParam);
		List<Organization> allChildrenOrganizations=organizationService.findAllChildrenOrganizations(qryParam);
		list.addAll(allChildrenOrganizations);
		for(Organization o:list)
		{
			List<Organization> parentOrganizations=organizationService.getOrganizationListByOrg_id(o.getOrg_id());
			o.setParentOrganizations(parentOrganizations);
		}
		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));
		respMap.put(Const.AJAX_DATA_ROOT, list);
		LoginAccount ra=SessionUtil.getCurrentPlateLoginAccount();
		respMap.put("userName", ra.getLogin_name());
		return respMap;
	}
	//新增组织
	@RequestMapping(value="/addOrganization.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> addOrganization(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		Organization org=new Organization();
		if(WebUtil.isEmpty(qryParam.get("name"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "名称为空");
			return respMap;
		}
		org.setName(qryParam.get("name").toString());
		if(WebUtil.isEmpty(qryParam.get("parentId"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "父节点未指定");
			return respMap;
		}
		org.setParentId(Integer.parseInt(qryParam.get("parentId").toString()));
		org.setIsParent(Const.YESNO_TYPE_YES);
		org.setIsvalid(Const.YESNO_TYPE_YES);
		LoginAccount loginAccount=(LoginAccount)SessionUtil.getAttribute(Const.SESSION_PLATFORM_LOGIN_USER);
		org.setReg_id(loginAccount.getLogin_id());
		qryParam.put("org_id", -1);
		boolean exist=organizationService.findOrganizationExist(qryParam);
		if(exist){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, org.getName()+"已存在");
			return respMap;
		}
		organizationService.addOrganization(org);
		respMap.put(Const.AJAX_DATA_ROOT, org);
		return respMap;
	}
	/**编辑组织名称,只更新组织名称，上级编号
	 * 参数：org_id 组织编号；name 名称； parentId 上级编号
	 * */
	@RequestMapping(value="/updateOrganization.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> updateOrganization(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		Organization org=new Organization();
		if(WebUtil.isEmpty(qryParam.get("name"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "名称为空");
			return respMap;
		}
		org.setName(qryParam.get("name").toString());
		if(WebUtil.isEmpty(qryParam.get("parentId"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "父节点未指定");
			return respMap;
		}
		org.setParentId(Integer.parseInt(qryParam.get("parentId").toString()));
		if(WebUtil.isEmpty(qryParam.get("org_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "组织ID为空");
			return respMap;
		}
		org.setOrg_id(Integer.parseInt(qryParam.get("org_id").toString()));	
		qryParam.put("org_id",org.getOrg_id());
		boolean exist=organizationService.findOrganizationExist(qryParam);
		if(exist){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, org.getName()+"已存在");
			return respMap;
		}
		organizationService.updateOrganization(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, org);
		return respMap;
	}
	//编辑组织上级节点
	@RequestMapping(value="/updateOrganizationParentId.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> updateOrganizationParentId(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		Organization org=new Organization();
		if(WebUtil.isEmpty(qryParam.get("name"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "名称为空");
			return respMap;
		}
		org.setName(qryParam.get("name").toString());
		if(WebUtil.isEmpty(qryParam.get("parentId"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "父节点未指定");
			return respMap;
		}
		org.setParentId(Integer.parseInt(qryParam.get("parentId").toString()));
		if(WebUtil.isEmpty(qryParam.get("org_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "组织ID为空");
			return respMap;
		}
		org.setOrg_id(Integer.parseInt(qryParam.get("org_id").toString()));
		org.setIsParent(Const.YESNO_TYPE_YES);
		org.setIsvalid(Const.YESNO_TYPE_YES);
		LoginAccount loginAccount=(LoginAccount)SessionUtil.getAttribute(Const.SESSION_PLATFORM_LOGIN_USER);
		org.setReg_id(loginAccount.getLogin_id());
		
		boolean exist=organizationService.findOrganizationExist(qryParam);
		if(exist){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, org.getName()+"已存在");
			return respMap;
		}
		organizationService.updateOrganizationParentId(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, org);
		return respMap;
	}
	//删除组织
	@RequestMapping(value="/delOrganization.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> delOrganization(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		
		if(WebUtil.isEmpty(qryParam.get("org_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "组织ID为空");
			return respMap;
		}
		//判断是否有下级
		boolean childrenExist=organizationService.findChildrenOrganizationExist(qryParam);
		if(childrenExist){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "存在下级，不可删除");
			return respMap;
		}
		//判断是否有成员
		boolean accoutExist=subAccountService.findSubAccountExist(qryParam);
		if(accoutExist){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "该组织存在子账号,不可删除");
			return respMap;
		}
		organizationService.deleteOrganization(qryParam);
		return respMap;
	}
	/**获取最大人数*/
	@RequestMapping(value="/findMaxNumByCompanyId.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> findMaxNumByCompanyId(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		int maxnum=organizationService.findMaxNumByCompanyId(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, maxnum);
		return respMap;
	}
	
	@RequestMapping(value="/findOrganizationByName.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> findOrganizationByName(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		LoginAccount loginAccount=(LoginAccount)SessionUtil.getAttribute(Const.SESSION_PLATFORM_LOGIN_USER);
		qryParam.put("reg_id", loginAccount.getLogin_id());
		qryParam.put("name", qryParam.get("name"));
		Organization organization=organizationService.findOrganizationByName(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, organization);
		return respMap;
	}
	
	//判断是否叶子节点
	@RequestMapping(value="/isLeafNode.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> isLeafNode(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		boolean leafNodeFlag=true;
		if(WebUtil.isEmpty(qryParam.get("org_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "组织ID为空");
			return respMap;
		}
		//判断是否有下级
		boolean childrenExist=organizationService.findChildrenOrganizationExist(qryParam);
		if(childrenExist){
			leafNodeFlag=false;
		}
		System.out.println(leafNodeFlag);
		respMap.put(Const.AJAX_DATA_ROOT, leafNodeFlag);
		return respMap;
	}
	
	//获取所有子节点
		@RequestMapping(value="/getAllChildren.do",method=RequestMethod.POST)
		@ResponseBody 
		public Map<String,Object> getAllChildren(HttpServletRequest request,HttpServletResponse response) throws Exception{
			Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
			Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
			if(WebUtil.isEmpty(qryParam.get("org_id"))){
				respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
				respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
				respMap.put(Const.AJAX_SERVICE_MESSAGE, "组织ID为空");
				return respMap;
			}
			List<Integer>allChildrens=organizationService.findAllChildrenIds(qryParam);
			respMap.put(Const.AJAX_DATA_ROOT, allChildrens);
			return respMap;
		}
		
		//获取所有子节点
		@RequestMapping(value="/getAllChildrenOrganization.do",method=RequestMethod.POST)
		@ResponseBody 
		public Map<String,Object> getAllChildrenOrganization(HttpServletRequest request,HttpServletResponse response) throws Exception{
			Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
			Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
			if(WebUtil.isEmpty(qryParam.get("org_id"))){
				respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
				respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
				respMap.put(Const.AJAX_SERVICE_MESSAGE, "组织ID为空");
				return respMap;
			}
			List<Organization> organizations=organizationService.getOrganizationList(qryParam);
			List<Organization> allChildrenOrganizations=organizationService.findAllChildrenOrganizations(qryParam);
			organizations.addAll(allChildrenOrganizations);
			for(Organization o:organizations)
			{
				List<Organization> parentOrganizations=organizationService.getOrganizationListByOrg_id(o.getOrg_id());
				o.setParentOrganizations(parentOrganizations);
			}
			respMap.put(Const.AJAX_DATA_ROOT, organizations);
			return respMap;
		}
}
