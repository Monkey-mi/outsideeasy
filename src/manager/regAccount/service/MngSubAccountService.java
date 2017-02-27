package manager.regAccount.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import common.user.model.RegSalt;
import common.user.service.RegAccoutService;


import util.CryptoUtils;
import util.DataTrans;
import util.MD5Util;

import manager.regAccount.data.MngSubAccountMapper;
import manager.regAccount.model.MngSubAccount;
import manager.regAccount.model.MngdSupplierFiles;
import manager.supplier.model.SupplierFile;


@Service
public class MngSubAccountService {
	@Autowired
	private MngSubAccountMapper mapper;
	@Autowired
	private RegAccoutService regAccoutService;


	public List<MngSubAccount> getMngSubAccountList(Map<String,Object> params) {
		return mapper.getMngSubAccountList(params);
	}
	/**
	 * 保存子账号
	* @Description:
	* MngSubAccountService
	* addMngSubAccount
	* @param params void
	* @author chenlong
	* 2016-10-19 下午1:36:43
	 */
	public void  addMngSubAccount(Map<String,Object> params) {
		params.put("sa_name", params.get("sa_name").toString()+params.get("sa_names").toString());
		String psw=MD5Util.encode2hex("666888");
    	String salt = CryptoUtils.getSalt();//随机生成盐值
    	params.put("sa_password", CryptoUtils.getHash(psw, salt));
    	params.put("create_date", new Date());
    	//params.put("role_id", 3);
    	if(Integer.parseInt(params.get("org_id").toString())<=0){
    		params.put("success", false);
			params.put("message", "请选择组织！");
			return;
    	}
    	Pattern subPattern = Pattern.compile("^[a-zA-Z0-9_\u4e00-\u9fa5]+$");
		Pattern phonepattern = Pattern.compile("^1[3|4|5|8][0-9]{9}$");
		//手机号匹配
    	String phone=params.get("phone").toString();
    	if(phone!=null && !phone.equals("")){
    		Matcher m = phonepattern.matcher(phone);
    		if(!m.matches()){
    			params.put("success", false);
    			params.put("message", "手机号格式不规范");
    			return;
    		}
    	}
    	//检测子账号格式 子账号=主账号+":"+6-17位数字字母
    	String sa_name=params.get("sa_name").toString();
    	boolean matched=false;
    	//前缀匹配 	
    	Matcher m = subPattern.matcher(sa_name.substring(sa_name.lastIndexOf(":")+1));
    	matched = m.matches();  	
    	if(!matched){
    		params.put("success", false);
    		params.put("message", "子账户名称格式不规范");
			return ;
    	}else{
    		int length=DataTrans.getWordCount(sa_name.substring(sa_name.lastIndexOf(":")+1));
    		if(length<3||length>15){
    			params.put("success", false);
        		params.put("message", "子账户名称格式不规范");
    			return ;
    		}
    	}
		mapper.addMngSubAccount(params);
		//item.setSalt(salt);
    	RegSalt rs=new RegSalt();
		rs.setAcc_name(sa_name);
		rs.setSalt(salt);
		regAccoutService.addSalt(rs);//保存盐值
		params.put("success", true);
		params.put("message", "保存成功");
		return ;
	}
	/**
	 * 更新子账号的所有信息
	* @Description:
	* MngSubAccountService
	* updateMngSubAccount
	* @param params void
	* @author chenlong
	* 2016-10-25 下午4:04:36
	 */
	public void updateMngSubAccount(Map<String,Object> params) {
		params.put("sa_name", params.get("sa_name").toString()+params.get("sa_names").toString());
    	if(Integer.parseInt(params.get("org_id").toString())<=0){
    		params.put("success", false);
			params.put("message", "请选择组织！");
			return;
    	}
    	Pattern subPattern = Pattern.compile("^[a-zA-Z0-9_\u4e00-\u9fa5]+$");
		Pattern phonepattern = Pattern.compile("^1[3|4|5|8][0-9]{9}$");
		//手机号匹配
    	String phone=params.get("phone").toString();
    	if(phone!=null && !phone.equals("")){
    		Matcher m = phonepattern.matcher(phone);
    		if(!m.matches()){
    			params.put("success", false);
    			params.put("message", "手机号格式不规范");
    			return;
    		}
    	}
    	//检测子账号格式 子账号=主账号+":"+6-17位数字字母
    	String sa_name=params.get("sa_name").toString();
    	boolean matched=false;
    	//前缀匹配 	
    	Matcher m = subPattern.matcher(sa_name.substring(sa_name.lastIndexOf(":")+1));
    	matched = m.matches();  	
    	if(!matched){
    		params.put("success", false);
    		params.put("message", "子账户名称格式不规范");
			return ;
    	}else{
    		int length=DataTrans.getWordCount(sa_name.substring(sa_name.lastIndexOf(":")+1));
    		if(length<3||length>15){
    			params.put("success", false);
        		params.put("message", "子账户名称格式不规范");
    			return ;
    		}
    	}	
		mapper.updateMngSubAccount(params);
		params.put("success", true);
		params.put("message", "保存成功");
		return ;		
	}
	public void deleteMngSubAccount(MngSubAccount[] arr) {
		for(MngSubAccount obj: arr) {
			mapper.deleteMngSubAccount(obj);
		}
	}
	/**
	 * 检查子账号的名称是否重复
	* @Description:
	* MngSubAccountService
	* checkSubName
	* @param params
	* @return int
	* @author chenlong
	* 2016-10-19 下午1:10:28
	 */
	public int checkSubName(Map<String,Object> params){
		params.put("sa_name", params.get("sa_name").toString()+params.get("sa_names").toString());
		return mapper.checkSubName(params);
	}
	/**
	 * 查询子账号的供应商名称
	* @Description:
	* MngSubAccountService
	* getSubaccountForSupplier
	* @param params
	* @return List<MngdSupplierFiles>
	* @author chenlong
	* 2016-10-18 上午9:55:13
	 */
	public List<MngdSupplierFiles> getSubaccountForSupplier(Map<String,Object> params){
		return mapper.getSubaccountForSupplier(params);
	}
	/**
	 * 查询子账号的公司名称
	* @Description:
	* MngSubAccountService
	* getSubForCompany
	* @param params
	* @return List<SupplierFile>
	* @author chenlong
	* 2016-10-18 上午10:55:58
	 */
	public List<SupplierFile> getSubForCompany(Map<String,Object> params){
	    return mapper.getSubForCompany(params);
}
	/**
	 * 启用子账号
	* @Description:
	* MngRegAccoutService
	* updateMngRegAccoutForID
	* @param params void
	* @author chenlong
	* 2016-10-13 下午4:43:40
	 */
	public String updateMngSubAccoutForID(Map<String,Object> params) {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("enabled", 0);
		String str = params.get("access_array").toString();
		String[] st = str.split(",");
		param.put("sa_id", st);					
		mapper.updateMngSubAccoutForID(param);
		return "success";
	}
	/**
	 * 禁用子账号
	* @Description:
	* MngRegAccoutService
	* updateMngRegAccoutForID
	* @param params void
	* @author chenlong
	* 2016-10-13 下午4:43:57
	 */
	public String updateMngSubAccoutForID2(Map<String,Object> params) {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("enabled", 1);
		String str = params.get("access_array").toString();
		String[] st = str.split(",");
		param.put("sa_id", st);					
		mapper.updateMngSubAccoutForID(param);
		return "success";
	}
	/**
	 * 重置子账号密码为666888
	* @Description:
	* MngRegAccoutService
	* updateMngRegAccoutForID
	* @param params void
	* @author chenlong
	* 2016-10-13 下午4:43:40
	 */
	public String updateMngSubAccoutForReset(Map<String,Object> params) {
		Map<String,Object> param = new HashMap<String, Object>();
		String psw=MD5Util.encode2hex("666888");
    	String salt = CryptoUtils.getSalt();//随机生成盐值
    	params.put("sa_password", CryptoUtils.getHash(psw, salt));
		String str1 = params.get("name_array").toString();
		String[] st1 = str1.split(",");
		for(String str : st1){
			param.put("sa_name", str);
			mapper.updateMngSubAccoutForReset(param);
			RegSalt rs=new RegSalt();
			rs.setAcc_name(str);
			rs.setSalt(salt);
			regAccoutService.updateRegSalt(rs);//更新盐值
		}
		return "success";
	}
	/**
	 * 分配子账号的供应商
	* @Description:
	* MngRegAccoutService
	* updateMngRegAccoutForID
	* @param params void
	* @author chenlong
	* 2016-10-26 下午4:43:40
	 */
	public String updateSubAccoutForSubSupplier(Map<String,Object> params) {	   	
		String str1 = params.get("access_array").toString();	
		String[] st1 = str1.split(",");	
		Integer supplier_id = 0;
		List<MngdSupplierFiles> list = mapper.getAllSubaccountForSupplier(params);//getSubaccountForSupplier
		List<MngdSupplierFiles> resuet = new ArrayList<MngdSupplierFiles>();//作为一个过滤列表
		for(String str : st1){
			supplier_id = Integer.parseInt(str);
			boolean flag = true;
			for(MngdSupplierFiles mngdSupplierFiles : list){				
				if(supplier_id==mngdSupplierFiles.getSupplier_id()&&mngdSupplierFiles.getIs_delete()==0){//说明子账号与该供应商已经建立了关系，无需操作			
					flag = false;
					resuet.add(mngdSupplierFiles);
					break;
				}else if(supplier_id==mngdSupplierFiles.getSupplier_id()&&mngdSupplierFiles.getIs_delete()==1){//该账号与该供应商的关系现在恢复
					//str1 = str1.replaceFirst(, "");//做处理，则把获取到的字符串进行一定的裁剪操作
					flag = false;
					resuet.add(mngdSupplierFiles);
					params.put("supplier_id", mngdSupplierFiles.getSupplier_id());
					params.put("is_delete", 0);
					mapper.updateSubForSupplier(params);
					break;
				}
			    }
			    if(flag){//如果flag为true说明该供应商因该被添加
				params.put("supplier_id", supplier_id);
				params.put("is_delete", 0);
				mapper.addSubaccountSupplier(params);
			    }		
		}	
		for(MngdSupplierFiles mngdSupplierFiles1 : list){
			supplier_id = mngdSupplierFiles1.getSupplier_id();
			boolean flag = true;
			for(MngdSupplierFiles mngdSupplierFiles2 : resuet){
				if(supplier_id==mngdSupplierFiles2.getSupplier_id()){//说明子账号与该供应商已经建立了关系，无需操作	
					flag = false;
					break;
				}
			}
			if(flag){
				params.put("supplier_id", supplier_id);
				params.put("is_delete", 1);
				mapper.updateSubForSupplier(params);
			}
		}
		return "success";
	}
	/**
	 * 分配子账号的公司
	* @Description:
	* MngRegAccoutService
	* updateMngRegAccoutForID
	* @param params void
	* @author chenlong
	* 2016-10-26 下午4:43:40
	 */
	public String updateAccoutForSubCompany(Map<String,Object> params) {	   	
		String str1 = params.get("access_array").toString();	
		String[] st1 = str1.split(",");	
		Integer company_id = 0;
		List<MngdSupplierFiles> list = mapper.getAllSubForCompany(params);//getSubaccountForSupplier
		List<MngdSupplierFiles> resuet = new ArrayList<MngdSupplierFiles>();//作为一个过滤列表
		for(String str : st1){
			company_id = Integer.parseInt(str);
			boolean flag = true;
			for(MngdSupplierFiles mngdSupplierFiles : list){				
				if(company_id==mngdSupplierFiles.getCompany_id()&&mngdSupplierFiles.getIs_delete()==0){//说明子账号与该公司已经建立了关系，无需操作			
					flag = false;
					resuet.add(mngdSupplierFiles);
					break;
				}else if(company_id==mngdSupplierFiles.getCompany_id()&&mngdSupplierFiles.getIs_delete()==1){//该账号与该公司的关系现在恢复
					//str1 = str1.replaceFirst(, "");//做处理，则把获取到的字符串进行一定的裁剪操作
					flag = false;
					resuet.add(mngdSupplierFiles);
					params.put("company_id", mngdSupplierFiles.getCompany_id());
					params.put("is_delete", 0);
					mapper.updateSubForCompany(params);
					break;
				}
			    }
			    if(flag){//如果flag为true说明该公司因该被添加
				params.put("company_id", company_id);
				params.put("is_delete", 0);
				mapper.addSubaccountCompany(params);
			    }		
		}	
		for(MngdSupplierFiles mngdSupplierFiles1 : list){
			company_id = mngdSupplierFiles1.getCompany_id();
			boolean flag = true;
			for(MngdSupplierFiles mngdSupplierFiles2 : resuet){
				if(company_id== mngdSupplierFiles2.getCompany_id()){//说明子账号与该公司已经建立了关系，无需操作	
					flag = false;
					break;
				}
			}
			if(flag){
				params.put("company_id", company_id);
				params.put("is_delete", 1);
				mapper.updateSubForCompany(params);
			}
		}
		return "success";
	}
	
	public int checkEmpNo(Map<String,Object> params){
		return mapper.checkEmpNo(params);
	}
}
