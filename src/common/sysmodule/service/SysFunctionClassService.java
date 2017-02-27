package common.sysmodule.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import util.Const;

import common.model.LinkTreeModel;
import common.model.TreeModel;
import common.sysmodule.data.SysFunctionClassMapper;
import common.sysmodule.model.SysFunctionClass;
import common.sysmodule.model.SysPageAuthority;
import common.sysmodule.model.SysPageFunc;
import common.model.MenuModel;

/**
 * @author Administrator
 *
 */
/**
 * @author Administrator
 *
 */
@Service
public class SysFunctionClassService {
	@Autowired
	private SysFunctionClassMapper mapper;


	public List<SysFunctionClass> getSysFunctionClassList(Map<String,Object> params) {
		return mapper.getSysFunctionClassList(params);
	}
	public void addSysFunctionClass(SysFunctionClass[] arr) {
		for(SysFunctionClass obj: arr) {
			mapper.addSysFunctionClass(obj);
		}
	}
	public void updateSysFunctionClass(SysFunctionClass[] arr) {
		for(SysFunctionClass obj: arr) {
			mapper.updateSysFunctionClass(obj);
		}
	}
	public void deleteSysFunctionClass(SysFunctionClass[] arr) {
		Map<String,Object> params=new HashMap<String,Object>();
		for(SysFunctionClass obj: arr) {
			mapper.deleteSysFunctionClass(obj);
			//同时删除角色业务关联表的记录
			params.put("class_id", obj.getClass_id());
			mapper.deleteSysRoleAuthorityByclass_id(params);
		}
	}
	/**
	* @Description: 获取  树
	* @param  node 主键(也是指定节点)
	* Response {data:[{List<TreeModel>}]} <br/><br/>
	* @author xufeng
	* @date 2015-11-03
	*/
	public List<TreeModel> getSysFunctionClassTree(Map<String,Object> params) {
		List<TreeModel> stlist=new ArrayList<TreeModel>();
		params.put("order_seq", "order_seq asc");
		List<SysFunctionClass> list=getSysFunctionClassList(params);
		
		for(SysFunctionClass sfc:list) 
		{
			TreeModel st=new TreeModel();
			st.setId(sfc.getClass_id());
			st.setParentId(sfc.getParentId());
			st.setText(sfc.getClass_name());
			st.setLeaf(Const.YESNO_TYPE_YES.equalsIgnoreCase(sfc.getIsParent())?"false":Const.YESNO_TYPE_YES);
			st.setExpanded("false");
			st.setType("SysFunctionClass");
			stlist.add(st);
			
		}
		
		return stlist;
	}
	/**
	* @Description: 获取整一颗 业务树
	* Response {data:[{List<TreeModel>}]} <br/><br/>
	* @author xufeng
	* @date 2016-03-10
	*/
	public List<LinkTreeModel> getSysFunctionClassTreeAll(Map<String,Object> params) {
		params.clear();
		params.put("enable", "true");
		List<SysFunctionClass> list=getSysFunctionClassList(params);
		List<SysPageAuthority> plist=getSysPageAuthorityList(params);
		List<SysPageFunc> flist=getSysPageFuncList(params);
		List<LinkTreeModel> pageTList= makeSysPageFuncTree(plist,flist);
		return makeSysFunctionClassTree(0,list,pageTList);
	}
	/**
	 * @Description: 组装业务页面+功能树形结构
	 * @author create by yangliping
	 * @date 2016-7-21 11:19:11
	 * @params plist： 页面列表；flist： 功能列表
	 * @return {data:[{List<TreeModel>}]}
	 */
	private List<LinkTreeModel> makeSysPageFuncTree(List<SysPageAuthority> plist,List<SysPageFunc> flist){
		
		List<LinkTreeModel> pTMList = new ArrayList<LinkTreeModel>();
		for(SysPageAuthority pageItem:plist){
			List<LinkTreeModel> fTMList = new ArrayList<LinkTreeModel>();
			for(SysPageFunc funcItem:flist)
			{
				//该页面下的所有功能添加到改页面子级中
				if(funcItem.getAuthority_id()==pageItem.getAuthority_id())
				{
					LinkTreeModel fTmodel=new LinkTreeModel();
					fTmodel.setId(funcItem.getF_id()*1000000+funcItem.getF_id());
					fTmodel.setParentId(funcItem.getAuthority_id());
					fTmodel.setLeaf(Const.YESNO_TYPE_YES);
					fTmodel.setText(funcItem.getName());
					fTmodel.setOrder_seq(funcItem.getOrder_seq());
					fTMList.add(fTmodel);
				}
			}
			LinkTreeModel pTmodel=new LinkTreeModel();
			pTmodel.setId(pageItem.getAuthority_id()*1000+pageItem.getAuthority_id());
			pTmodel.setParentId(pageItem.getClass_id());
			pTmodel.setText(pageItem.getPage_name());
			//该页面级树结构下有功能
			if(fTMList.size()>0)
			{
				pTmodel.setLeaf(Const.YESNO_TYPE_NO);
				pTmodel.setData(fTMList);
			}
			else
			{
				pTmodel.setLeaf(Const.YESNO_TYPE_YES);
			}
			pTMList.add(pTmodel);
		}
		return pTMList;
		
	}
	/**
	 * @Description: 递归组装业务分类+页面树形结构
	 * @author create by yangliping
	 * @date 2016-7-21 11:19:11
	 * @params parentId：当前节点，allMList：业务分类子父级列表；allPList： 页面功能树级列表
	 * @return {data:[{List<TreeModel>}]}
	 */
	private List<LinkTreeModel> makeSysFunctionClassTree(int parentId,List<SysFunctionClass> allMList,List<LinkTreeModel> allPList){
		//找出该节点id下属的所有子节点
		List<LinkTreeModel> mTreeList = new ArrayList<LinkTreeModel>();
		for(SysFunctionClass module:allMList){
			if(parentId == module.getParentId()&&module.getIsvalid().equals(Const.YESNO_TYPE_YES)){
				LinkTreeModel mTree = new LinkTreeModel();
				mTree.setExpanded(Const.YESNO_TYPE_YES);
				mTree.setId(module.getClass_id());
				mTree.setLeaf(Const.YESNO_TYPE_YES.equals(module.getIsParent())?Const.YESNO_TYPE_NO:Const.YESNO_TYPE_YES);
				mTree.setOrder_seq(module.getOrder_seq());
				mTree.setParentId(parentId);
				mTree.setText(module.getClass_name());
				mTreeList.add(mTree);
			}
		}
		//找出该节点Id下的直接子页面节点，(页面可以直接绑定在父级节点下)
		for(LinkTreeModel pItem:allPList){
			if(parentId==pItem.getParentId())
			{
				mTreeList.add(pItem);
			}
		}
		for(LinkTreeModel mTree:mTreeList){
			
			if(mTree.getLeaf()==null ||mTree.getLeaf().equals(Const.YESNO_TYPE_YES)){
			   //叶子,加上页面
			   List<LinkTreeModel> pTreeList=new ArrayList<LinkTreeModel>();
			   //所有页面
			   
			   for(LinkTreeModel pageAuth:allPList){
				 if(mTree.getId()==pageAuth.getParentId()){
				   //LinkTreeModel pTree=new LinkTreeModel();
				   //pTree.setId(pageAuth.getId()*1000000+pageAuth.getId());
				  
				   pTreeList.add(pageAuth);
				   mTree.setLeaf(Const.YESNO_TYPE_NO);
				}   
			   }
			   
			   mTree.setData(pTreeList);
			   
			}else{
				//继续读取下级节点
				mTree.setData(makeSysFunctionClassTree(mTree.getId(),allMList,allPList));
			}
		}
		return mTreeList;
	} 
	/**
	* @Description: 判断记录是否可以更新
	* @param  parentId 上级id; class_name 类别名;class_id 类别id
	* Response status=true 可以； status=false 不可以
	* @author xufeng
	* @date 2016-03-09
	*/
	public String checkForUpdate(Map<String,Object> params){
		JSONObject json = new JSONObject();
		int count=mapper.getCountForUpdate(params);
		json.put("status", count==0);
		return json.toString();
	}
	public List<SysPageAuthority> getSysPageAuthorityList(Map<String,Object> params) {
		return mapper.getSysPageAuthorityList(params);
	}
	public void addSysPageAuthority(SysPageAuthority[] arr) {
		for(SysPageAuthority obj: arr) {
			mapper.addSysPageAuthority(obj);
		}
	}
	public void updateSysPageAuthority(SysPageAuthority[] arr) {
		for(SysPageAuthority obj: arr) {
			mapper.updateSysPageAuthority(obj);
		}
	}
	public void deleteSysPageAuthority(SysPageAuthority[] arr) {
		for(SysPageAuthority obj: arr) {
			mapper.deleteSysPageAuthority(obj);
		}
	}
	
	/*
	 * 系统页面功能表相关方法
	 * */
	public List<SysPageFunc> getSysPageFuncList(Map<String,Object> params) {
		return mapper.getSysPageFuncList(params);
	}
	public void addSysPageFunc(SysPageFunc[] arr) {
		for(SysPageFunc obj: arr) {
			mapper.addSysPageFunc(obj);
		}
	}
	public void updateSysPageFunc(SysPageFunc[] arr) {
		for(SysPageFunc obj: arr) {
			mapper.updateSysPageFunc(obj);
		}
	}
	public void deleteSysPageFunc(SysPageFunc[] arr) {
		for(SysPageFunc obj: arr) {
			mapper.deleteSysPageFunc(obj);
		}
	}
	/*
	 * 通过页面表id删除当前页面下的所以功能表记录
	 * create by yangliping
	 * 2016年7月20日 14:27:34
	 */
	public void deleteSysPageFuncByauthId(Map<String,Object> params) {
		String authId=params.get("authority_id").toString();
		mapper.deleteSysPageFuncByauthId(Integer.parseInt(authId));
		
	}
	private int getSysPageFuncCount(int authId)
	{
		return mapper.getSysPageFuncCount(authId);
	}
	
	/**
	 * @Description:前端获取系统授权菜单
	 * SysFunctionClassService
	 * getSysAuthMenus
	 * @param params role_id:角色ID，parentId：业务分类父级ID
	 * @return {data:[{List<MenuModel>}]}
	 * @author yangliping
	 * 2016-8-1 下午2:14:19
	 */
	public List<MenuModel> getSysAuthMenus(Map<String,Object> params)
	{
		List<MenuModel> menus=new ArrayList<MenuModel>();
		//获取左侧菜单分类
		List<SysFunctionClass> fClassList=mapper.getSysMenusByRole(params);
		for(SysFunctionClass fClass:fClassList)
		{
			MenuModel menu=new MenuModel();
			menu.setId(fClass.getClass_id());
			menu.setParentId(fClass.getParentId());
			menu.setLeaf("false");
			menu.setMenu_name(fClass.getClass_name());
			menu.setOrder_seq(fClass.getOrder_seq());
			Map<String,Object> params2=new HashMap<String,Object>();
			params2.put("class_id", fClass.getClass_id());
			params2.put("role_id", params.get("role_id"));
			//当前业务分类菜单下的授权菜单页面
			List<SysPageAuthority> pageList=mapper.getSysMenuPagesByRole(params2);
			List<MenuModel> clildren=new ArrayList<MenuModel>();
			for(SysPageAuthority page:pageList)
			{
				MenuModel pageMenu=new MenuModel();
				pageMenu.setId(page.getAuthority_id());
				pageMenu.setParentId(page.getClass_id());
				pageMenu.setLeaf("true");
				pageMenu.setMenu_name(page.getPage_name());
				pageMenu.setMenu_path(page.getPage_path());
				pageMenu.setOrder_seq(page.getOrder_seq());
				clildren.add(pageMenu);
			}
			if(pageList.size()>0)
			{
				menu.setChildren(clildren);
			}
			menus.add(menu);
		}
		return menus;
	}
}
