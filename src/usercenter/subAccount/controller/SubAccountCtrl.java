package usercenter.subAccount.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;

import usercenter.organize.model.Organization;
import usercenter.organize.service.OrganizationService;
import usercenter.subAccount.model.SubAccount;
import usercenter.subAccount.model.SubaccCompanyAuthority;
import usercenter.subAccount.model.SubaccountSupplierInfo;
import usercenter.subAccount.model.UcSysRole;
import usercenter.subAccount.service.SubAccountService;
import usercenter.subAccount.service.SubaccCompanyAuthorityService;
import usercenter.subAccount.service.SubaccountSupplierInfoService;
import usercenter.subAccount.service.UcSysRoleService;
import usercenter.subAccount.vo.ForAddSubAccount;
import usercenter.subAccount.vo.ForEditSubAccount;
import usercenter.subAccount.vo.SubCountResult;
import util.Const;
import util.CryptoUtils;
import util.IpAddressUtils;
import util.MyDateUtils;
import util.SessionUtil;
import util.TansferData;
import util.WebUtil;

import common.user.model.LoginAccount;
import common.user.model.RegAccout;
import common.user.model.RegSalt;
import common.user.service.RegAccoutService;
import common.user.model.RoleAccountRef;
import common.user.service.RoleAccountRefService;

@Controller
@RequestMapping("subAccount")
public class SubAccountCtrl {
	@Autowired
	private SubaccountSupplierInfoService  subaccountSupplierInfoService;
	@Autowired
	private OrganizationService organizationService;
	@Autowired
	private SubAccountService subAccountService;
	@Autowired
	private UcSysRoleService ucSysRoleService;
	@Autowired
	private SubaccCompanyAuthorityService subaccCompanyAuthorityService;
	@Autowired
	private RegAccoutService regAccoutService;
	
	@Autowired
	private RoleAccountRefService roleAccountRefService;
	
	@RequestMapping(value = { "/mngSubAccount2" }, method = { RequestMethod.GET })
	public ModelAndView gojsp_mngSubAccount2(ModelAndView modelAndView ){
		modelAndView.setViewName("/usercenter/subAccount/mngSubAccount2");
		return modelAndView;
	}
	
	//获取子账号列表
	@RequestMapping(value="/getSubAccountListByReg_id.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getSubAccountListByReg_id(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		/*int nLimit =0,npage =0;
    	nLimit =qryParam.get("limit")!=null?Integer.parseInt(qryParam.get("limit").toString()):0;
    	npage =qryParam.get("page")!=null?Integer.parseInt(qryParam.get("page").toString()):0;
    	int nStart=nLimit*npage;
    	qryParam.put("start",nStart);*/
    	qryParam.put("org_id",qryParam.get("org_id"));
    	qryParam.put("condition",qryParam.get("condition"));
		List<SubAccount> list=new ArrayList<SubAccount>();
		list=subAccountService.getSubAccountListByReg_id(qryParam);
		respMap.put(Const.AJAX_SERVICE_TOTAL, list.size());
		//respMap.put(Const.AJAX_SERVICE_CURRENT_PAGE, npage);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
	
	//获取子账号人数
	@RequestMapping(value="/getSubCount.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getSubCount(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		List<SubCountResult>list=subAccountService.getSubCount(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, list);
		return respMap;
	}
	
	//获取一些信息，用于新增子账号
	@RequestMapping(value="/getInfoForAddSubAccount.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getInfoForSubAccount(HttpServletRequest request,HttpServletResponse response) throws Exception{
//		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		LoginAccount loginAccount=(LoginAccount)SessionUtil.getAttribute(Const.SESSION_PLATFORM_LOGIN_USER);
		ForAddSubAccount vo=new ForAddSubAccount();
		vo.setAcc_name(loginAccount.getLogin_name());
		//应该是该角色的下级角色，这里暂时用 SupplierSubAccount代替		
		List<UcSysRole> sysroleList=new ArrayList<UcSysRole>();
		sysroleList.add(ucSysRoleService.getUcSysRoleASSupplierSubAccount());
		vo.setRoleList(sysroleList);
		//该公司的组织
		Map<String,Object> orgParam=new HashMap<String,Object>();
		orgParam.put("reg_id", loginAccount.getLogin_id());
		List<Organization> list=organizationService.getOrganizationList(orgParam);
		vo.setOrgList(list);
		respMap.put(Const.AJAX_DATA_ROOT, vo);
		return respMap;
	}
	
	//新增子账号
	@RequestMapping(value="/addSubAccount.do",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> addSubAccount(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		String currentIp = IpAddressUtils.getCurrentIpAddress(request);//当前用户IP地址
		SubAccount sa=new SubAccount();
		
		if(WebUtil.isEmpty(qryParam.get("username"))){
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "姓名为空");
			return respMap;
		}
		sa.setUsername(qryParam.get("username").toString());
		sa.setPhone(qryParam.get("phone").toString());
		if(WebUtil.isEmpty(qryParam.get("sa_name"))){
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "子账号为空");
			return respMap;
		}
		LoginAccount loginAccount=(LoginAccount)SessionUtil.getAttribute(Const.SESSION_PLATFORM_LOGIN_USER);
		sa.setSa_name(loginAccount.getLogin_name()+":"+qryParam.get("sa_name").toString());
		if(WebUtil.isEmpty(qryParam.get("sa_password"))){
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "密码为空");
			return respMap;
		}
		
		String salt = CryptoUtils.getSalt();//随机生成盐值
		sa.setSa_password(CryptoUtils.getHash(qryParam.get("sa_password").toString(), salt));
		RegSalt rs=new RegSalt();
		rs.setAcc_name(loginAccount.getLogin_name()+":"+qryParam.get("sa_name").toString());
		rs.setSalt(salt);
		regAccoutService.addSalt(rs);//保存盐值
		
		//sa.setSa_password(qryParam.get("sa_password").toString());		
		if(WebUtil.isEmpty(qryParam.get("org_id"))){
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "关联组织为空");
			return respMap;
		}
		sa.setOrg_id(Integer.valueOf(qryParam.get("org_id").toString()));
		sa.setCreate_date(new Date());
		sa.setEnabled(0);
		sa.setReg_id(loginAccount.getLogin_id());
		sa.setLast_login_ip(currentIp);
		//默认都是供应商子账号角色
		UcSysRole supplierSubAccount=ucSysRoleService.getUcSysRoleASSupplierSubAccount();
		sa.setRole_id(supplierSubAccount.getRole_id());
		subAccountService.addSubAccount(sa);
		//update by yangliping 2016-8-26 15:54:58 把子账号对应一个角色的方式换成一对多，把默认的供应商子账号角色添加到关联表中去
		if(sa.getSa_id()>=0)
		{
			RoleAccountRef ref=new RoleAccountRef();
			ref.setAccount_id(sa.getSa_id());
			//子账号与角色关联表中的Account_type固定值为1
			ref.setAccount_type(1);
			ref.setRole_id(supplierSubAccount.getRole_id());
			roleAccountRefService.addRoleAccountRef(ref);
		}
		
		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));
		return respMap;
	}
	
	//获取一些信息，用于编辑子账号
	@RequestMapping(value="/getInfoForEditSubAccount.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getInfoForEditSubAccount(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		LoginAccount loginAccount=(LoginAccount)SessionUtil.getAttribute(Const.SESSION_PLATFORM_LOGIN_USER);
		ForEditSubAccount vo=new ForEditSubAccount();
		vo.setAcc_name(loginAccount.getLogin_name());
		
		//该公司的组织
		Map<String,Object> orgParam=new HashMap<String,Object>();
		orgParam.put("reg_id", loginAccount.getLogin_id());
		orgParam.put("org_id", qryParam.get("org_id"));
		List<Organization> list=organizationService.getOrganizationList(orgParam);
		List<Organization> allChildrenOrganizations=organizationService.findAllChildrenOrganizations(orgParam);
		list.addAll(allChildrenOrganizations);
		for(Organization o:list)
		{
			List<Organization> parentOrganizations=organizationService.getOrganizationListByOrg_id(o.getOrg_id());
			o.setParentOrganizations(parentOrganizations);
		}
		vo.setOrgList(list);
		//子账号记录
		SubAccount sa=subAccountService.getSubAccountBysa_id(qryParam);
		String sa_name=sa.getSa_name();
		sa.setAcc_name(sa_name.substring(0, sa_name.indexOf(":")));
		sa.setLast_part_sa_name(sa_name.substring( sa_name.indexOf(":")+1));
		vo.setSubAccount(sa);
		respMap.put(Const.AJAX_DATA_ROOT, vo);
		return respMap;
	}
	
	//编辑子账号
	@RequestMapping(value="/updataSubAccount.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> updataSubAccount(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		SubAccount sa=new SubAccount();
		
		if(WebUtil.isEmpty(qryParam.get("username"))){
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "姓名为空");
			return respMap;
		}
		sa.setUsername(qryParam.get("username").toString());
		sa.setSa_id(Integer.parseInt(qryParam.get("sa_id").toString()));
		sa.setPhone(qryParam.get("phone").toString());
		if(WebUtil.isEmpty(qryParam.get("sa_name"))){
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "子账号为空");
			return respMap;
		}
		LoginAccount loginAccount=(LoginAccount)SessionUtil.getAttribute(Const.SESSION_PLATFORM_LOGIN_USER);
		sa.setSa_name(loginAccount.getLogin_name()+":"+qryParam.get("sa_name").toString());		
		
		if(WebUtil.isEmpty(qryParam.get("org_id"))){
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "关联组织为空");
			return respMap;
		}
		sa.setOrg_id(Integer.valueOf(qryParam.get("org_id").toString()));
		
		sa.setEnabled(0);
		//默认都是供应商子账号角色
		UcSysRole supplierSubAccount=ucSysRoleService.getUcSysRoleASSupplierSubAccount();
		sa.setRole_id(supplierSubAccount.getRole_id());
		subAccountService.updateSubAccount(sa);
		respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));
		return respMap;
	}
	
	//删除账号
	@RequestMapping(value="/delSubAccount.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> delSubAccount(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		subAccountService.deleteSubAccount(qryParam);
		String acc_name = qryParam.get("sa_name").toString();
		regAccoutService.deleteRegSalt(acc_name);
		return respMap;
	}
	
	/**批量删除账号
	 *参数：删除id数组 sa_ids **/
	@RequestMapping(value="/delSomeSubAccount.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> delSomeSubAccount(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("sa_ids"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "请先选中删除的记录");
			return respMap;
		}
		String arrayStr=qryParam.get("sa_names").toString();
		String[] arraysa_name=arrayStr.split(",");
		for(int i=0;i<arraysa_name.length;i++){
			regAccoutService.deleteRegSalt(arraysa_name[i]);
		}
		subAccountService.delSomeSubAccount(qryParam);
		return respMap;
	}
	
	/**重置密码为666888
	 * sa_id*/
	@RequestMapping(value="/updateResetPassword.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> updateResetPassword(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("sa_id"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "请先选中需要重置密码的记录");
			return respMap;
		}
		if(WebUtil.isEmpty(qryParam.get("sa_password"))){
			respMap.put(Const.AJAX_SERVICE_SUCCESS, false);
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "请输入需要修改的密码");
			return respMap;
		}
		qryParam.put("sa_id", qryParam.get("sa_id"));
		//--------------salt加密-----------------//
		String salt = CryptoUtils.getSalt();//随机生成盐值
		qryParam.put("sa_password",CryptoUtils.getHash(qryParam.get("sa_password").toString(), salt));
		RegSalt rs=new RegSalt();
		rs.setAcc_name(qryParam.get("sa_name").toString());
		rs.setSalt(salt);
		regAccoutService.updateRegSalt(rs);
		//-------------------------------------//
		//qryParam.put("sa_password", qryParam.get("sa_password"));
		subAccountService.updateResetPassword(qryParam);
		return respMap;
	}
	
	/**检测子账号是否存在
	 * params:name
	 * return true:存在；false 不存在
	 * */
	@RequestMapping(value="/checkSubAccountExist.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> checkSubAccountExist(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("name"))){
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "子账号名为空");
			return respMap;
		}
		LoginAccount loginAccount=(LoginAccount)SessionUtil.getAttribute(Const.SESSION_PLATFORM_LOGIN_USER);
		qryParam.put("sa_name",loginAccount.getLogin_name()+":"+qryParam.get("name").toString());
		boolean exist=subAccountService.findSubAccountExistByName(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, exist);
		return respMap;
	}
	/**
	 * @Description:检查手机号是否已存在
	 * SubAccountCtrl
	 * checkMobileExist
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception Map<String,Object>
	 * @author yukai
	 * 2016-11-15 上午9:12:13
	 */
	@RequestMapping(value="/checkMobileExist.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> checkMobileExist(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("mobile"))){
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "手机号为空");
			return respMap;
		}
		boolean exist=subAccountService.checkMobileExist(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, exist);
		return respMap;
	}
	
	/**根据org_id统计子账号数量
	 * params:reg_id
	 * return count
	 * */
	@RequestMapping(value="/findSubAccountByreg_id.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> findSubAccountByreg_id(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		int  count=subAccountService.findSubAccountByreg_id(qryParam);
		respMap.put(Const.AJAX_DATA_ROOT, count);
		return respMap;
	}
	
	/** 上传路径*/
	private final static String uploadFolderPath = WebUtil.getUpLoadFileRoot();
	/** 下载路径*/
	private final static String rootPath = WebUtil.getRootPath();
	/**
     * javascript 发送
		var file_path=encodeURIComponent(encodeURIComponent(rec.get('attched')));
		
		java spring mvc接收
		String file_path=request.getParameter("encodePath");//解码一次
        file_path=java.net.URLDecoder.decode(encodePath,"UTF-8");//第二次解码*/
    @RequestMapping(value="/downloadFile.do",method=RequestMethod.GET)
    @ResponseBody
	public  void downloadFile(HttpServletRequest request,HttpServletResponse response ) throws Exception {
    	String file_path=request.getParameter("file_path");
		if(file_path!=null){
			file_path=java.net.URLDecoder.decode(file_path,"UTF-8");
			File finalFile = new File(rootPath+file_path);
			String filename=file_path.substring(file_path.lastIndexOf("/")+1);
	       
	        if(finalFile.exists()){
	        	OutputStream out = null;
	            InputStream in = null;
	            boolean isimg=false;
	            String strisimg=request.getParameter("isimg");
	            if(strisimg!=null){
	            	isimg=Boolean.valueOf(strisimg);
	            }
	            response.setContentType("application/octet-stream; charset=utf-8");
	            if(isimg){
	            	boolean flag=false;//默认不 是图片
	                //获取文件后缀，与传过来的参数file_name重新组装文件名
	                if(file_path.indexOf(".")>0){//有后缀  XX.jpg  XX.RAR
	                	String this_suffix=file_path.substring(file_path.lastIndexOf("."));
	                	
	                	for(String suffix:Const.imgArray){
	                		if(suffix.equalsIgnoreCase(this_suffix)){
	                			flag=true;
	                			break;
	                        }
	                	}
	                }
	                if(flag){
	                	response.setContentType("image/*");
	                }
	            }
	            // 获得文件名
	            
	            if (request.getHeader("User-Agent").toUpperCase().indexOf("MSIE") > 0) {  
		            filename = URLEncoder.encode(filename, "UTF-8");  
		        } else {  
		            filename = new String(filename.getBytes("UTF-8"), "ISO8859-1");  
		        }
	            response.setHeader("Location", filename);

	            // 定义输出文件头
	            response.setHeader("Content-Disposition", "attachment;filename="
	                    + filename);
	            out = response.getOutputStream();
	            in = new FileInputStream(finalFile.getPath());

	            TansferData.limitSpeed(out, in,TansferData.getSpeed500kb(), null, false);

	            in.close();
	            out.flush();
	            out.close();
	            return;
	        }
		}
       	response.setContentType("text/html; charset=utf-8");
       	OutputStream out = response.getOutputStream();
       	out.write("文件不存在".getBytes("utf-8"));
       	out.flush();
        out.close();
	}
    
    private final String partpath="temp2importSub";
    /**导入子账号
	 * 
	 * */
	@RequestMapping(value="/importSub.do",method=RequestMethod.POST)
	@ResponseBody 
	public String importSub(HttpServletRequest request,HttpServletResponse response) throws Exception{
		JSONObject json = new JSONObject();
    	json.put("success", true);
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
        CommonsMultipartFile file = (CommonsMultipartFile) multipartRequest   
                .getFile("file");   //对应前台name
        InputStream inputStream = null;
        OutputStream outputStream = null;
        if(file!=null && file.getSize()>0){
        	if (file.getSize() > 1024*1024) {
				json.put("message", "文件太大");
				return json.toString() ;	
			} 
	        inputStream = file.getInputStream();	       
	        String prePath=uploadFolderPath+partpath;
            File newFile = new File(prePath);
            if(!newFile.exists()){
              newFile.mkdirs();
            }
            String OriginalFilename=file.getOriginalFilename();
            String suffix=OriginalFilename.substring(OriginalFilename.lastIndexOf("."));
            if(!suffix.equalsIgnoreCase(".xls") && !suffix.equalsIgnoreCase(".xlsx")){
            	json.put("message", "不是Excel文件");
				return json.toString() ;
            }
            
            File finalFile = new File(prePath+MyDateUtils.format_yyyyMMddHHmmsss(new Date())+OriginalFilename.substring(OriginalFilename.lastIndexOf(".")));
            outputStream = new FileOutputStream(finalFile);

            int readBytes = 0;
            byte[] buffer = new byte[1024];
            while ((readBytes = inputStream.read(buffer, 0, 1024)) != -1) {
                    outputStream.write(buffer, 0, readBytes);
            }
            outputStream.close();
            inputStream.close();
            try {
            	subAccountService.addSubAccountByExcel(finalFile, json, request);
			} catch (Exception e) {
				json.put("success", false);
				json.put("message", "解析失败");
				e.printStackTrace();
			}finally{
				finalFile.delete();
			}           
        }else{
        	json.put("success", false);
        	json.put("message", "上传失败");
        }
        return json.toString();
	}
	
	/**下载保存该公司账号的excel
	 * */
    @RequestMapping(value="/downloadSubAccountExcel.do",method=RequestMethod.GET)
    @ResponseBody
	public  void downloadSubAccountExcel(HttpServletRequest request,HttpServletResponse response ) throws Exception {
    	String filePath=uploadFolderPath+partpath;
    	File newFile = new File(filePath);
        if(!newFile.exists()){
          newFile.mkdirs();
        }
    	//创建excel并放到指定目录下
    	File file=subAccountService.createSubAccountExcel(filePath);
		String filename=file.getName();
		OutputStream out = null;
        InputStream in = null;
        // 获得文件名
        // 定义输出类型(下载)
        response.setContentType("application/force-download");
        response.setHeader("Location", filename);

        // 定义输出文件头
        response.setHeader("Content-Disposition", "attachment;filename="
                + filename);
        out = response.getOutputStream();
        in = new FileInputStream(file.getPath());

        //限速
        TansferData.limitSpeed(out, in,TansferData.getSpeed500kb(), null, false);

        in.close();
        out.flush();
        out.close();
        // 删除文件,删除前关闭所有的Stream.
        file.delete();
	}
   
    /**根据org_id统计子账号数量
	 * params:reg_id
	 * return count
	 * */
	@RequestMapping(value="/addSubaccountSupplierInfo.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> addSubaccountSupplierInfo(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);	
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		if(WebUtil.isEmpty(qryParam.get("sa_id"))){
			respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "子账号ID为空");
			return respMap;
		}
		subaccountSupplierInfoService.addSubaccountSupplierInfo(qryParam);
		return respMap;
	}
	 /**
	  * @Description: 
	  * @param  request response
	  * @return 
	  * @author chenlong
	  * @date 2016-7-11
	  */
		@RequestMapping(value="/getSubaccountSupplierInfoList.do",method=RequestMethod.POST)
		@ResponseBody 
		public Map<String,Object> getSubaccountSupplierInfoList(HttpServletRequest request,HttpServletResponse response) throws Exception{
			Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);	
			Map<String,Object> respMap = WebUtil.getDefaultResponseMap();		
			if(WebUtil.isEmpty(qryParam.get("sa_id"))){
				respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
				respMap.put(Const.AJAX_SERVICE_MESSAGE, "子账号ID为空");
				return respMap;
			}
			List<SubaccountSupplierInfo> list = subaccountSupplierInfoService.getSubaccountSupplierInfoList(qryParam);
			respMap.put(Const.AJAX_DATA_ROOT, list);
			return respMap;
		}
	 /**
	  * @Description: 查询出所有子账号下的公司
	  * @param  request response
	  * @return List<SubaccCompanyAuthority>
	  * @author chenlong
	  * @date 2016-7-11
	  */
		@RequestMapping(value="/getSubaccCompanyAuthorityList.do",method=RequestMethod.POST)
		@ResponseBody 
		public Map<String,Object> getSubaccCompanyAuthorityList(HttpServletRequest request,HttpServletResponse response) throws Exception{
			Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);	
			Map<String,Object> respMap = WebUtil.getDefaultResponseMap();		
			if(WebUtil.isEmpty(qryParam.get("sa_id"))){
				respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
				respMap.put(Const.AJAX_SERVICE_MESSAGE, "子账号ID为空");
				return respMap;
			}
			List<SubaccCompanyAuthority> list = subaccCompanyAuthorityService.getSubaccCompanyAuthorityList(qryParam);
			respMap.put(Const.AJAX_DATA_ROOT, list);
			return respMap;
		}
		/**
		* @Description:添加子账号与公司质检的关系
		* SubAccountCtrl
		* addSubaccountCompanyAuthority
		* @param request
		* @param response
		* @return
		* @throws Exception Map<String,Object>
		* @author chenlong
		* 2016-8-10 上午9:44:35
		 */
		@RequestMapping(value="/addSubCompanyInfo.do",method=RequestMethod.POST)
		@ResponseBody 
		public Map<String,Object> addSubaccountCompanyAuthority(HttpServletRequest request,HttpServletResponse response) throws Exception{
			Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);	
			Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
			if(WebUtil.isEmpty(qryParam.get("sa_id"))){
				respMap.put(Const.AJAX_ERR_CODE, Const.AJAX_ERR_CODE_300_ERROR);
				respMap.put(Const.AJAX_SERVICE_MESSAGE, "子账号ID为空");
				return respMap;
			}
			subaccCompanyAuthorityService.addSubaccountCompanyAuthority(qryParam);
			return respMap;
		}
		
		/**
		 * 获取账号角色关联列表信息
		 * @Description:
		 * SubAccountCtrl
		 * getRoleAccountRefList
		 * @param request
		 * @param response
		 * @return
		 * @throws Exception Map<String,Object>
		 * @author yangliping
		 * 2016-8-26 上午9:47:43
		 */
		@RequestMapping(value="/getRoleAccountRefList.do",method=RequestMethod.POST)
		@ResponseBody 
		public Map<String,Object> getRoleAccountRefList(HttpServletRequest request,HttpServletResponse response) throws Exception{
			Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);	
			Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
			List<RoleAccountRef> refList=roleAccountRefService.getRoleAccountRefList(qryParam);
			respMap.put(Const.AJAX_DATA_ROOT, refList);
			return respMap;
		}
		
		
		/**
		 * 
		 * @Description:子账号分配角色更新方法
		 * SubAccountCtrl
		 * updateRoleAccountRef
		 * @param request
		 * @param response
		 * @return
		 * @throws Exception Map<String,Object>
		 * @author yangliping
		 * 2016-8-26 下午1:33:39
		 */
		@RequestMapping(value="/checkUpdateRoleAccountRef.do",method=RequestMethod.POST)
		@ResponseBody 
		public Map<String,Object> checkUpdateRoleAccountRef(HttpServletRequest request,HttpServletResponse response) throws Exception{
			Map<String,Object> reqParam = WebUtil.getDefaultParamsMap(request);	
			Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
			//当前子账号
			String saId=reqParam.get("saId").toString();
			//勾选的角色Id拼接字符串
			String addRoleIdStr=reqParam.get("addRoleIds").toString();
			if(!addRoleIdStr.equals(""))
			{
				String[] addRoleIds=addRoleIdStr.split(",");
				//将勾选的如果数据库中不存在则插入
				for(int i=0;i<addRoleIds.length;i++)
				{
					
					Map<String,Object> params=new HashMap<String,Object>();
					params.put("account_id", saId);
					params.put("role_id", addRoleIds[i]);
					params.put("account_type", 1);
					//先判断是否已存在该角色与子账号的关联记录
					int hasCount=roleAccountRefService.getRoleAccountRefCount(params);
					//不存在，则新增
					if(hasCount<=0)
					{
						RoleAccountRef info=new RoleAccountRef();
						info.setRole_id(Integer.parseInt(addRoleIds[i]));
						info.setAccount_id(Integer.parseInt(saId));
						info.setAccount_type(1);
						roleAccountRefService.addRoleAccountRef(info);
					}
				}
			}
			//不勾选的角色Id拼接字符串
			String delRoleIdStr=reqParam.get("delRoleIds").toString();
			String[] delRoleIds=delRoleIdStr.split(",");
			//将不勾选的数据库中存在则删除
			for(int i=0;i<delRoleIds.length;i++)
			{
				Map<String,Object> params=new HashMap<String,Object>();
				params.put("account_id", saId);
				params.put("role_id", delRoleIds[i]);
				params.put("account_type", 1);
				//先判断是否已存在该角色与子账号的关联记录
				List<RoleAccountRef> hasList=roleAccountRefService.getRoleAccountRefList(params);
				//存在，则删除，根据主键删除
				if(hasList.size()>0)
				{
					for(int j=0;j<hasList.size();j++)
					{
						roleAccountRefService.deleteRoleAccountRef(hasList.get(j));
					}
					
				}
			}
			
			respMap.put(Const.AJAX_SERVICE_MESSAGE, "success");
			return respMap;
		}
}
