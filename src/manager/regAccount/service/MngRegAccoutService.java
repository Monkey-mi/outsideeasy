package manager.regAccount.service;


import java.util.ArrayList;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;

import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpSession;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import util.Const;
import util.CryptoUtils;
import util.MD5Util;
import util.MySessionContext;
import util.SessionUtil;


import common.model.LoginUser;
import common.user.model.RegSalt;
import common.user.service.RegAccoutService;


import manager.regAccount.data.MngRegAccoutMapper;
import manager.regAccount.model.MngCompanyInfo;
import manager.regAccount.model.MngOrganization;
import manager.regAccount.model.MngRegAccout;
import manager.regAccount.model.MngSysRole;
import manager.regAccount.model.MngdSupplierFiles;
import manager.supplier.model.SupplierFile;


@Service
public class MngRegAccoutService {
	@Autowired
	private MngRegAccoutMapper mapper;
	@Autowired
	private MngSubAccountService mngSubAccountService;
	@Autowired
	private RegAccoutService regAccoutService;


	public List<MngRegAccout> getMngRegAccoutList(Map<String,Object> params) {
		return mapper.getMngRegAccoutList(params);
	}
	/**
	 * 保存主账号
	* @Description:
	* MngSubAccountService
	* addMngSubAccount
	* @param params void
	* @author chenlong
	* 2016-10-19 下午1:36:43
	 */
	public void  addMngRegAccout(Map<String,Object> params) {
		String password = params.get("password").toString();
		String psw=MD5Util.encode2hex(password);
    	String salt = CryptoUtils.getSalt();//随机生成盐值
    	params.put("password", CryptoUtils.getHash(psw, salt));
    	params.put("reg_date", new Date());
		Pattern phonepattern = Pattern.compile("^1[3|4|5|8][0-9]{9}$");
		//手机号匹配
    	String phone=params.get("reg_phone").toString();
    	if(phone!=null && !phone.equals("")){
    		Matcher m = phonepattern.matcher(phone);
    		if(!m.matches()){
    			params.put("success", false);
    			params.put("message", "手机号格式不规范");
    			return;
    		}
    	}
    	String acc_name=params.get("acc_name").toString();	
    	//前缀匹配 	 	
		mapper.addMngRegAccout(params);
    	RegSalt rs=new RegSalt();
		rs.setAcc_name(acc_name);
		rs.setSalt(salt);
		regAccoutService.addSalt(rs);//保存盐值
		params.put("success", true);
		params.put("message", "保存成功");
		return ;
	}
	public void updateMngRegAccout(MngRegAccout[] arr) {
		for(MngRegAccout obj: arr) {
			mapper.updateMngRegAccout(obj);
		}
	}
	public void deleteMngRegAccout(MngRegAccout[] arr) {
		for(MngRegAccout obj: arr) {
			mapper.deleteMngRegAccout(obj);
		}
	}
	/**
	 * 检查账号是否重复
	* @Description:
	* MngRegAccoutService
	* checkRegName
	* @param params
	* @return int
	* @author chenlong
	* 2016-11-1 上午9:32:05
	 */
	public int checkRegName(Map<String,Object> params){	
		return mapper.checkRegName(params);
	}
	/**
	 * 启用主账号
	* @Description:
	* MngRegAccoutService
	* updateMngRegAccoutForID
	* @param params void
	* @author chenlong
	* 2016-10-13 下午4:43:40
	 */
	public String updateMngRegAccoutForID(Map<String,Object> params) {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("enabled", 0);
		String str = params.get("access_array").toString();
		String[] st = str.split(",");
		param.put("reg_id", st);					
		mapper.updateMngRegAccoutForID(param);
		return "success";
	}
	/**
	 * 禁用主账号
	* @Description:
	* MngRegAccoutService
	* updateMngRegAccoutForID
	* @param params void
	* @author chenlong
	* 2016-10-13 下午4:43:57
	 */
	public String updateMngRegAccoutForID2(Map<String,Object> params) {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("enabled", 1);
		String str = params.get("access_array").toString();
		String[] st = str.split(",");
		param.put("reg_id", st);					
		mapper.updateMngRegAccoutForID(param);
		return "success";
	}
	/**
	 * 查询出主账号下的供应商名称
	* @Description:
	* MngRegAccoutService
	* getRegaccountForSupplier
	* @param params
	* @return List<MngdSupplierFiles>
	* @author chenlong
	* 2016-10-17 下午4:53:46
	 */
	public List<MngdSupplierFiles> getRegaccountForSupplier(Map<String,Object> params){
		List<MngdSupplierFiles> list = new ArrayList<MngdSupplierFiles>();
		List<MngdSupplierFiles> list1 = mapper.getRegaccountForSupplier(params);
		List<MngdSupplierFiles> list2 = mngSubAccountService.getSubaccountForSupplier(params);
		for(MngdSupplierFiles mngdSupplierFiles : list1){
			for(MngdSupplierFiles m : list2){				
				if(mngdSupplierFiles.getSupplier_id()==m.getSupplier_id()){
					mngdSupplierFiles.setIs_select(1);	
					break;
				}				
			}
			list.add(mngdSupplierFiles);
		}
		return list;
	}
	/**
	 * 查询出主账号下的公司名称
	* @Description:
	* MngRegAccoutService
	* getRegForCompany
	* @param params
	* @return List<SupplierFile>
	* @author chenlong
	* 2016-10-18 上午10:58:18
	 */
	public List<SupplierFile> getRegForCompany(Map<String,Object> params){
		List<SupplierFile> list = new ArrayList<SupplierFile>();
		List<SupplierFile> list1 = mapper.getRegForCompany(params);
		List<SupplierFile> list2 = mngSubAccountService.getSubForCompany(params);
		for(SupplierFile mngdSupplierFiles : list1){
			for(SupplierFile m : list2){				
				if(mngdSupplierFiles.getCompany_id()==m.getCompany_id()){
					mngdSupplierFiles.setIs_select(1);	
					break;
				}				
			}
			list.add(mngdSupplierFiles);
		}
		return list;
	}
	/**
	 * 查出所有的分配角色表
	* @Description:
	* MngRegAccoutService
	* getRolelist
	* @param params
	* @return List<MngSysRole>
	* @author chenlong
	* 2016-10-18 下午1:49:25
	 */
	public List<MngSysRole> getRolelist(Map<String,Object> params){
		List<MngSysRole> list = new ArrayList<MngSysRole>();
		List<MngSysRole> list1 = mapper.getRolelist(params);//(params);
		List<MngSysRole> list2 = mapper.getSubRolelist(params);
		for(MngSysRole mngdSupplierFiles : list1){
			for(MngSysRole m : list2){				
				if(mngdSupplierFiles.getRole_id()==m.getRole_id()){
					mngdSupplierFiles.setIs_select(1);	
					break;
				}				
			}
			list.add(mngdSupplierFiles);
		}
		return list;
	}
	/**
	 * 分配子账号的角色
	* @Description:
	* MngRegAccoutService
	* SubAccoutForSubRole
	* @param params void
	* @author chenlong
	* 2016-10-26 下午4:43:40
	 */
	public String updateSubAccoutForSubRole(Map<String,Object> params) {	   			
		String str1 = params.get("access_array").toString();	
		String[] st1 = str1.split(",");	
		Integer role_id = 0;
		List<MngSysRole> list = mapper.getSubRolelist(params);//getSubaccountForSupplier
		List<MngSysRole> resuet = new ArrayList<MngSysRole>();//作为一个过滤列表
		for(String str : st1){
			role_id = Integer.parseInt(str);
			boolean flag = true;
			for(MngSysRole mngSysRole : list){				
				if(role_id==mngSysRole.getRole_id()){//说明子账号与该角色已经建立了关系，无需操作			
					flag = false;
					resuet.add(mngSysRole);
					break;
				}
			    }
			    if(flag){//如果flag为true说明该角色因该被添加
			    	params.put("role_id", str);
					params.put("account_type", 1);
				    mapper.addSubaccountRole(params);
			    }		
		}	
		for(MngSysRole mngSysRole1 : list){
			role_id = mngSysRole1.getRole_id();
			boolean flag = true;
			for(MngSysRole mngSysRole2 : resuet){
				if(role_id== mngSysRole2.getRole_id()){//说明子账号与该角色已经建立了关系，无需操作	
					flag = false;
					break;
				}
			}
			if(flag){
				params.put("role_id", role_id);
				mapper.deleteSubRole(params);
			}
		}
		return "success";
	}
	/**
	 * 查询出该公司的详细信息
	* @Description:
	* MngRegAccoutService
	* getMngCompanyInfoList
	* @param params
	* @return MngCompanyInfo
	* @author chenlong
	* 2016-10-31 上午9:30:23
	 */
	public List<MngCompanyInfo> getMngCompanyInfoList(Map<String,Object> params){
		return mapper.getMngCompanyInfoList(params);
	}
	/**
	 * 查询出账号的组织架构
	* @Description:
	* MngRegAccoutService
	* getOrganizelist
	* @param params
	* @return List<MngOrganization>
	* @author chenlong
	* 2016-10-18 下午3:31:43
	 */
	public  List<MngOrganization> getOrganizelist(Map<String,Object> params){
		List<MngOrganization> list1 =  new ArrayList<MngOrganization>();
		List<MngOrganization> list = mapper.getOrganizelist(params);
		for(MngOrganization mngOrganization : list ){
			params.put("org_id",mngOrganization.getOrg_id());
			int count = mapper.getOrganizeCount(params);
			if(count == 0){
				list1.add(mngOrganization);
			}
		}		
		if(list.size()==0){	
			MngOrganization mngOrganization=new MngOrganization();
			mngOrganization.setReg_id(Integer.parseInt(params.get("reg_id").toString()));
			mngOrganization.setName("组织架构");
			mngOrganization.setIsParent(Const.YESNO_TYPE_YES);
			mngOrganization.setIsvalid(Const.YESNO_TYPE_YES);
			mngOrganization.setParentId(0);
			mapper.addOrganization(mngOrganization);
			list1.add(mngOrganization);
		}
		return list1;
	}
	/**
	 * @Description: 按条件返回session中的所有登录用户
	 * @param 
	 * @return  List<LoginUser>
	 * @author chenlong
	 * @date 2016-7-25
	 */
	public List<LoginUser> getAccountCount(Map<String,Object> params){	
		Integer apply_sts = Integer.parseInt(params.get("apply_sts").toString());
		String condition = params.get("condition").toString();
		List<LoginUser> listvo = new ArrayList<LoginUser>();
		List<LoginUser> userlist = SessionUtil.getUserlist();
		if(apply_sts == 0 && condition.equals("")){
			listvo.addAll(userlist);
		}else if((apply_sts != 0) && (!condition.equals(""))){
			for(LoginUser loginUser : userlist ){
				if(loginUser.getName().equals(condition) && loginUser.getType()==apply_sts){
					listvo.add(loginUser);
					break;
				}
			}
		}else if(apply_sts == 0 && (!condition.equals(""))){
			for(LoginUser loginUser : userlist ){
				if(loginUser.getName().equals(condition)){
					listvo.add(loginUser);
					break;
				}
			}
		}else if(apply_sts != 0 && condition.equals("")){
			for(LoginUser loginUser : userlist ){
				if(loginUser.getType()==apply_sts){
					listvo.add(loginUser);
					break;
				}
			}
		}	
		return listvo;
	}
	/**
	 * @Description: 按条件返回session中的所有登录用户
	 * @param 
	 * @return  List<LoginUser>
	 * @author chenlong
	 * @date 2016-7-25
	 */
	public String  getAccountCount2(Map<String,Object> params){
		String str= "在线人数:"; 
		List<LoginUser> userlist = SessionUtil.getUserlist();
		int count= userlist.size();
		return str+count;
	}
	/**
	 * @Description: 传入session_id,取出session的对象，并进行删除
	 * @param session_id
	 * @return 
	 * @author chenlong
	 * @date 2016-7-25
	 */
	public void updateOutline(Map<String,Object> params){
		List<LoginUser> userlist=SessionUtil.getUserlist();
		String session_id = params.get("session_id").toString();
	    //1.删除session中的该账户的平台session对象
		MySessionContext mySessionContext = MySessionContext.getInstance();
		HttpSession httpSession = mySessionContext.getSession(session_id);
		@SuppressWarnings("unchecked")
		Enumeration<String> attNames=httpSession.getAttributeNames();
		while(attNames.hasMoreElements()){
			String pName =attNames.nextElement();
			httpSession.removeAttribute(pName);
		}
		//2.缓存列表中的用户集合删除
		for(LoginUser loginUser : userlist ){
			if(loginUser.getSession_id().equals(session_id)){
				userlist.remove(loginUser);
				break;
			}
		}
	}
}
