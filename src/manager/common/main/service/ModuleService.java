package manager.common.main.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import manager.common.main.data.ModuleMapper;
import manager.common.main.model.Function;
import manager.common.main.model.Module;
import manager.common.main.model.ModuleTree;
import manager.common.main.model.SRMLog;
import manager.common.main.model.Test;
import manager.common.user.data.UserMapper;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import util.Const;
import util.SessionUtil;
import util.WebUtil;

@Service
public class ModuleService {
	@Autowired
	private ModuleMapper moduleMapper;
	@Autowired
	private UserMapper usersMapper;
	
	/**
	 * 添加日志信息
	 * @param item
	 */
	public void addGpLog(SRMLog item){
		item.setMod_id(-1);
		moduleMapper.addLog(item);
	}
	/**
	 * @Description: 查询出系统日志
	 * @param Map<String,Object>
	 * @return List<SRMLog>
	 * @author chenlong
	 * @date 2016-7-29
	 */
	public List<SRMLog> getLogList(Map<String,Object> params){
	
		return moduleMapper.getLogList(params);
	}
	/**
	 * 模块代码mod_code 是否重复
	 * Request main/ModuleCodeCheck.do?method=isExistsModuleCode <br/><br/>
	 * @param params mod_code <br/><br/>
	 * @return boolean
	 */
	public boolean isExistsModuleCode(Map<String,Object> params){
		return moduleMapper.getCountByModCode(params)>0;
	}
	/**
	 * @Description: 获取模块数量
	 * @param @param params
	 * @param @return   
	 * @return int  
	 * @throws
	 * @author 华慧
	 * @date 2015-9-1
	 */
	public int getCountByPId(Map<String,Object> params){
		return moduleMapper.getCountByPId(params);
	}
	/**
	 * 根据父节点获取模块树
	 * Request main/Modules.do?method=getModuleWithParent <br/><br/>
	 * @param params node <br/><br/>
	 * @return Module
	 */
	public List<Module> getModuleWithParent(Map<String,Object> params){
		if(!SessionUtil.isAdmin()){
			params.put("u_id",SessionUtil.getCurrentUser().getU_id());
		}
		List<Module> modList = moduleMapper.getSysMenuByLoginId(params);
		return modList;
	}
	/**
	 * @Description:  根据mod_id或mod_code获得module节点信息
	 * @param @param params
	 * @param @return   
	 * @return List<Module>  
	 * @throws
	 * @author 华慧
	 * @date 2015-9-2
	 */
	public List<Module> getModuleByModIdCode(Map<String,Object> params){
		Map<String,Object> paramsMap = new HashMap<String,Object>();
		paramsMap.put("id",params.get("mod_id")!=null? params.get("mod_id"):-1);
		paramsMap.put("mod_code",params.get("mod_code"));
		
		return this.getModuleList(paramsMap);
	}
	/**
	 * 获取模块列表
	 * Request main/Modules.do?method=getModuleList <br/><br/>
	 * Response {data:[{@link Module}]} <br/><br/>
	 * @param paramMap
	 * @return Module
	 */
	public List<Module> getModuleList(Map<String,Object> paramMap){
		if(!SessionUtil.isAdmin()){
			paramMap.put("u_id",SessionUtil.getCurrentUser().getU_id());
		}	
		List<Module> list=moduleMapper.getModuleList(paramMap);
		return list;
	}
	/**
	 * @Description: 读取整个模块树及其下属功能点 
	 * @param @param paramsMap 支持参数为 node -- 指定的开始模块节点id,默认=0根节点
	 * @param @return   
	 * @return List<ModuleTree>  返回功能树列表
	 * @throws
	 * @author 华慧
	 * @date 2015-9-1
	 */
	public List<ModuleTree> getAllModuleFuncsTree(Map<String,Object> paramsMap){
		int parentId = paramsMap.get(Const.DEFAULT_TREENODE_PARAM)==null?0:Integer.parseInt(paramsMap.get(Const.DEFAULT_TREENODE_PARAM).toString());
		String u_id=(String) paramsMap.get("u_id");
		paramsMap.clear();
		paramsMap.put("u_id", u_id);

		List<Module> allMList = moduleMapper.getModuleListFilterRole(paramsMap);
		List<Function> allFList = moduleMapper.getFuncListFilterUid(paramsMap);
		return this.makeModuleFuncsTree(parentId,allMList,allFList);
	}
	
	/**
	 * @Description: 组建系统菜单功能合并树
	 * @param @param parentId
	 * @param @param allMList
	 * @param @param allFList
	 * @param @return   
	 * @return List<ModuleTree>  
	 * @throws
	 * @author 华慧
	 * @date 2015-9-1
	 */
	private List<ModuleTree> makeModuleFuncsTree(int parentId,List<Module> allMList,List<Function> allFList){
		//找出该节点id下属的所有子节点
		List<ModuleTree> mTreeList = new ArrayList<ModuleTree>();
		for(Module module:allMList){
			if(parentId == module.getParentId()&&module.getIsvalid().equals(Const.YESNO_TYPE_YES)){
				ModuleTree mTree = new ModuleTree();
				BeanUtils.copyProperties(module,mTree);
				mTreeList.add(mTree);
			}
		}
		for(ModuleTree mTree:mTreeList){
		   if(mTree.getLeaf()==null ||mTree.getLeaf().equals(Const.YESNO_TYPE_YES)){
				//添加功能节点
				List<ModuleTree> fTreeList = new ArrayList<ModuleTree>();
				for(Function func:allFList){
					if(mTree.getId()==func.getMod_id()){
						ModuleTree fTree = new ModuleTree();
						fTree.setId(func.getF_id()*1000000+func.getF_id()); //暂当mod_id用,
						fTree.setText(func.getName());
						fTree.setParentId(mTree.getId());
						fTree.setLeaf(Const.YESNO_TYPE_YES);
						fTree.setOrder_seq(func.getOrder_seq());
						fTreeList.add(fTree);
					}
				}
				mTree.setLeaf(Const.YESNO_TYPE_NO);
				mTree.setData(fTreeList);
			}else{
				//继续读取下级节点
				mTree.setData(this.makeModuleFuncsTree(mTree.getId(),allMList,allFList));
			}
		}
		return mTreeList;
	}
	
	/**
	 * @Description: 获取系统功能模块列表
	 * @param @param params
	 * @param @return   
	 * @return List<Module>  
	 * @throws
	 * @author 华慧
	 * @date 2015-8-20
	 */
	public List<Module> getSysMenuByLoginId(Map<String,Object> params){
		if(!SessionUtil.isAdmin()){
			params.put("u_id",SessionUtil.getCurrentUser().getU_id());
		}
		return moduleMapper.getSysMenuByLoginId(params);
	}
	
	/**
	 * @Description: 获取系统模块树
	 * @param @param params
	 * @param @return   
	 * @return String 按用户获取系统菜单权限,返回数据结构如下：
	 *   sys_menu:[{
	 *   		titlie:'供应商管理',
	 *   		icon:'',
	 *   		glyph:'0xf0c0',
	 *   		expanded:true,
	 *   		description:'',
	 *   		sub_menu:[{
	 *  			title:"注册认证",
	 *  			module:'010001',
	 *  			icon:'',
	 *  			glyph:'0xf01c' 
	 *   		},{xxxxxx}]
	 *   },{xxx}
	 *   ]
	 * @throws
	 * @author 华慧
	 * @date 2015-8-20
	 * modify: xf 20151014
	 */
	public String getSystemModule(Map<String,Object> params){
		String sysMenu="";
		//获取顶层菜单
		params.put("node", 0);
		List<Module> list=this.getSysMenuByLoginId(params);
		//为了展示菜单简洁明了,目前只支持两层菜单结构
		String node="";
		for(Module m : list){
			node	="{";
			node+="title:'"+m.getText()+"',";
			node+="icon:'"+m.getIcon()+"',";
			node+="module:'"+m.getMod_code()+"',";
			if (!WebUtil.isEmpty(m.getIconCls())&&m.getIconCls().startsWith("0x"))
				node+="glyph:"+m.getIconCls()+",";
			else
				node+="iconCls:'"+m.getIconCls()+"',";
			
			node+="expanded:"+m.getLeaf()+",";
			node+="description:'"+m.getQtitle()+"'";
			//获取下一层的功能模块
			params.put("node", m.getId());
			List<Module> mList=getSysMenuByLoginId(params);
			if (mList.size()>0){
				node+=",sub_menu:[";
				String subNode;
				for(Module subModule:mList){
					subNode="{";
					subNode+="title:'"+subModule.getText()+"',";
					subNode+="module:'"+subModule.getMod_code()+"',";
					subNode+="icon:'"+subModule.getIcon()+"',";
					if (!WebUtil.isEmpty(subModule.getIconCls())&&subModule.getIconCls().startsWith("0x"))
						subNode+="glyph:"+subModule.getIconCls();
					else
						subNode+="iconCls:'"+subModule.getIconCls()+"'";
					subNode+="},";
					node+=subNode;
				}
				node=node.substring(0, node.length()-1);
				node+="]},";
			}else{
			   node+="},";
			}
			sysMenu+=node;
		}
		
		if (sysMenu.length()>1){
		//去除最后一个逗号
			sysMenu=sysMenu.substring(0, sysMenu.length()-1);
			sysMenu="{sys_menu:["+sysMenu+"]}";
		}
		return sysMenu;
	}
	/*
	 * 
	 * */
	/**
	 * @Description: 获取系统功能模块列表,并且以指定格式返回
	 * @param @param params
	 * @param @return   
	 * @return String
	 * @throws
	 * @author xf
	 * @date 2015-10-14
	 */
	public List<Module> getSysMenuByLoginIdAndNode(Map<String,Object> params){
		return getSysMenuByLoginId(params);
	}
	/**
	 * @Description: 增加系统功能菜单
	 * @param @param modules   
	 * @return void  
	 * @throws
	 * @author 华慧
	 * @date 2015-9-1
	 */
	@Transactional
	public void addModule(Module[] modules){
		for (Module module : modules) {
			module.setCreate_date(new Date());
			moduleMapper.addModule(module);
		}
	}
	/**
	 * @Description: 更新系统功能菜单
	 * @param @param modules   
	 * @return void  
	 * @throws
	 * @author 华慧
	 * @date 2015-9-1
	 */
	@Transactional
	public void updateModule(Module[] modules){
		for (Module module : modules) {
			module.setModify_date(new Date());
			moduleMapper.updateModule(module);
		}
	}
	/**
	 * @Description: 删除系统功能模块
	 * @param @param modules   
	 * @return void  
	 * @throws
	 * @author 华慧
	 * @date 2015-9-3
	 */
	@Transactional
	public void deleteModule(Module[] modules){
		for (Module module : modules) {
			usersMapper.deleteRoleModuleByMId(module.getId());
			usersMapper.deleteUserMenuByMid(module.getId());
			
			moduleMapper.deleteFuncByMid(module.getId());
			moduleMapper.deleteModule(module);
		}
	}
	/**
	 * @Description: 获取菜单功能清单
	 * @param @param params
	 * @param @return   
	 * @return List<Function>  
	 * @throws
	 * @author 华慧
	 * @date 2015-9-1
	 */
	public List<Function> getFuncListByMId(Map<String,Object> params){
		return moduleMapper.getFuncList(params);
	}
	/**
	 * @Description: 增加菜单功能
	 * @param @param funcs   
	 * @return void  
	 * @throws
	 * @author 华慧
	 * @date 2015-9-1
	 */
	@Transactional
	public void addFunction(Function[] funcs){
		for (Function func : funcs) {
			moduleMapper.addFunction(func);
		}
	}
	/**
	 * 更新功能
	 * Request main/Modules.do?method=updateFunction <br/><br/>
	 * Response {data:[{@link Function}]} <br/><br/>
	 * @param funcs 更新功能 {@link Function}}
	 */
	@Transactional
	public void updateFunction(Function[] funcs){
		for (Function func : funcs) {
			moduleMapper.updateFunction(func);
		}
	}
	/**
	 * 删除功能
	 * Request main/Modules.do?method=deleteFunction <br/><br/>
	 * Response {} <br/><br/>
	 * @param funcs 删除功能 {@link Function}
	 */
	@Transactional
	public void deleteFunction(Function[] funcs){
		for (Function func : funcs) {
			usersMapper.deleteRoleFuncByFId(func.getF_id());
			moduleMapper.deleteFunction(func);
		}
	}
	/**测试事务并发
	 * @throws Exception */
	public synchronized void  testTransactional(Map<String, Object> paramsMap) throws Exception{
		for(int i=0;i<50;i++){
			Test t=new Test();
			t.setId(i);
			t.setName("name"+i);
//			if(i==25){
//				throw new Exception("test excpetions");
//			}
			moduleMapper.addTest(t);
		}
	}
}
