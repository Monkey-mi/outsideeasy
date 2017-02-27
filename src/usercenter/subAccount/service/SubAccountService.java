package usercenter.subAccount.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.activiti.engine.impl.util.json.JSONObject;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import usercenter.organize.model.Organization;
import usercenter.organize.service.OrganizationService;
import usercenter.subAccount.data.SubAccountMapper;
import usercenter.subAccount.model.SubAccount;
import usercenter.subAccount.model.UcSysRole;
import usercenter.subAccount.vo.SubCountResult;
import util.Const;
import util.CryptoUtils;
import util.DataTrans;
import util.IpAddressUtils;
import util.MD5Util;
import util.MyDateUtils;
import util.SessionUtil;
import util.WebUtil;

import common.user.model.LoginAccount;
import common.user.model.RegAccout;
import common.user.model.RegSalt;
import common.user.service.RegAccoutService;


@Service
public class SubAccountService {
	@Autowired
	private SubAccountMapper mapper;
	@Autowired
	private UcSysRoleService ucSysRoleService;
	@Autowired
	private OrganizationService organizationService;
	@Autowired
	private RegAccoutService regAccoutService;
	
	
	public List<SubAccount> getSubAccountList(Map<String,Object> params) {
		return mapper.getSubAccountList(params);
	}
	/**主账号 获取 子账号
	 * 主账号编号reg_id  父节点nodeForGrid*/
	public List<SubAccount> getSubAccountListByReg_id(Map<String,Object> params) {
		Map<String,Object> orgParam=new HashMap<String,Object>();
		List<SubAccount>subAccounts=new ArrayList<SubAccount>();
		LoginAccount ra=SessionUtil.getCurrentPlateLoginAccount();
		params.put("reg_id", ra.getLogin_id());
		subAccounts.addAll(mapper.getSubAccountListByReg_id(params));
		if (params.get("org_id")!=null) {
			orgParam.put("org_id", params.get("org_id"));
			List<Integer> allChildrens=organizationService.findAllChildrenIds(orgParam);
			if (allChildrens!=null&&allChildrens.size()>0) {
				for (Integer children : allChildrens) {
					params.put("org_id", children);
					subAccounts.addAll(mapper.getSubAccountListByReg_id(params));
				}
			}
		}
		return subAccounts;
	}
	public boolean findSubAccountExist(Map<String,Object> params) {
		int count=mapper.findSubAccountByorg_id(params);
		return count>0;
	}
	
	//根据reg_id统计子账号数量
	public int findSubAccountByreg_id(Map<String,Object> params){
		LoginAccount ra=SessionUtil.getCurrentPlateLoginAccount();
		if(WebUtil.isEmpty(ra.getLogin_id())){
			throw new RuntimeException("主账号不存在");
		}
		params.put("reg_id", ra.getLogin_id());
		int count=mapper.findSubAccountByreg_id(params);
		return count;
	}
	
	public void addSubAccount(SubAccount obj) {
		mapper.addSubAccount(obj);
	}
	public void updateSubAccount(SubAccount obj) {
		mapper.updateSubAccount(obj);
	}
	public void deleteSubAccount(Map<String,Object> params) {
		mapper.deleteSubAccount(params);
	}
	public void delSomeSubAccount(Map<String,Object> params){
		String arrayStr=params.get("sa_ids").toString();
		String[] arraysa_id=arrayStr.split(",");
		for(int i=0;i<arraysa_id.length;i++){
			params.put("sa_id", arraysa_id[i]);
			mapper.deleteSubAccount(params);
		}
	}
	public SubAccount getSubAccountBysa_id(Map<String,Object> params) {
		return mapper.getSubAccountBysa_id(params);		
	}
	public void updateResetPassword(Map<String,Object> params){
		mapper.updateResetPassword(params);
	}
	
	/**判断子账号是否存在
	 * sa_name 子账号名
	*/
	public boolean findSubAccountExistByName(Map<String,Object> params){
		return mapper.findSubAccountByName(params)>0;
	}
	
	/**
	 * 根据子账号名获取子账号信息
	*getSubAccountByName
	*@param params
	*@return
	*List<SubAccount>
	*@author mishengliang
	*2016-5-16下午3:31:50
	 */
	public List<SubAccount> getSubAccountByName(Map<String,Object> params){
		return mapper.getSubAccountByName(params);
	}
	
	/**解析excel,获取子账号列表，并保存
	 * @throws Exception */
	public void addSubAccountByExcel(File finalFile, JSONObject json, HttpServletRequest request) throws Exception{
		//从excel读取子账号列表
		List<SubAccount> sublist=getListFromExcel(finalFile,json,request);
		if(json.getBoolean("success") && sublist.size()>0){
			//初始赋值
			Date createDate=new Date();
			LoginAccount loginAccount=(LoginAccount)SessionUtil.getAttribute(Const.SESSION_PLATFORM_LOGIN_USER);
			
			Map<String,Object> orgParam=new HashMap<String,Object>();
			orgParam.put("reg_id", loginAccount.getLogin_id());
			List<Organization> list=organizationService.getOrganizationList(orgParam);
			String acc_name=loginAccount.getLogin_name();
			List<SubAccount> old_sub_list=mapper.getSubAccountList(orgParam);//旧的子账号列表
			
			UcSysRole role=ucSysRoleService.getUcSysRoleASSupplierSubAccount();
			String psw=MD5Util.encode2hex("666888");
			Pattern subPattern = Pattern.compile("^[a-zA-Z0-9_\u4e00-\u9fa5]+$");
			Pattern phonepattern = Pattern.compile("^1[3|4|5|8][0-9]{9}$");
			for(int i=0;i<sublist.size();i++){
				SubAccount item=sublist.get(i);
				item.setCreate_date(createDate);
            	item.setEnabled(0);
            	item.setReg_id(loginAccount.getLogin_id());
            	item.setRole_id(role.getRole_id());
            	//item.setSa_password(psw);
            	String salt = CryptoUtils.getSalt();//随机生成盐值
            	item.setSa_password(CryptoUtils.getHash(psw, salt));
            	item.setSalt(salt);
            	//检测子账号格式 子账号=主账号+":"+6-17位数字字母
            	String sa_name=item.getSa_name();
            	boolean matched=false;
            	//前缀匹配
            	if(sa_name.lastIndexOf(":")==acc_name.length() && sa_name.startsWith(acc_name)){
            		//后缀匹配
            		Matcher m = subPattern.matcher(sa_name.substring(sa_name.lastIndexOf(":")+1));
            		matched = m.matches();
            	}
            	if(!matched){
            		json.put("success", false);
        			json.put("message", sa_name+"格式不规范");
        			return;
            	}else{
            		int length=DataTrans.getWordCount(sa_name.substring(sa_name.lastIndexOf(":")+1));
            		if(length<3||length>15){
            			json.put("success", false);
            			json.put("message", sa_name+"格式不规范");
            			return ;
            		}
            	}
            	//子账号是否和数据库重复
            	for(int k=0;k<old_sub_list.size();k++){
            		SubAccount old_item=old_sub_list.get(k);
            		if(item.getSa_name().equals(old_item.getSa_name())){
            			json.put("success", false);
            			json.put("message", sa_name+"已存在");
            			return;
            		}
            	}
            	//上传的子账号是否重复
            	for(int k=0;k<sublist.size();k++){
            		SubAccount other_item=sublist.get(k);
            		if(i!=k && item.getSa_name().equals(other_item.getSa_name())){
            			json.put("success", false);
            			json.put("message","上传的账号"+ sa_name+"重复");
            			return;
            		}
            	}
            	//手机号匹配
            	String phone=item.getPhone();
            	if(phone!=null && !phone.equals("")){
            		Matcher m = phonepattern.matcher(phone);
            		if(!m.matches()){
            			json.put("success", false);
            			json.put("message", phone+"格式不规范");
            			return;
            		}else{
            			Map<String, Object> params=new HashMap<String, Object>();
        				params.put("mobile", phone);
        				if (checkMobileExist(params)) {
        					json.put("success", false);
                			json.put("message", phone+"已存在");
                			return;
						}
            		}
            	}
            	//上传的手机号是否重复
            	for(int k=0;k<sublist.size();k++){
            		SubAccount other_item=sublist.get(k);
            		if(i!=k && phone.equals(other_item.getPhone())){
            			json.put("success", false);
            			json.put("message","上传的账号"+ phone+"重复");
            			return;
            		}
            	}
            	//匹配部门名称并赋值部门号
            	if(list!=null){
            		boolean flag=false;//默认没有匹配的部门组织名称
            		for(int j=0;j<list.size();j++){
            			Organization org=list.get(j);
            			if(item.getOrg_name().equals(org.getName())){
            				flag=true;
            				Map<String, Object> params=new HashMap<String, Object>();
            				params.put("org_id", org.getOrg_id());
            				boolean leafFlag=organizationService.findChildrenOrganizationExist(params);
            				if (leafFlag) {
            					json.put("success", false);
                    			json.put("message", item.getOrg_name()+"不是叶子节点部门");
                    			return;
							}else {
								item.setOrg_id(org.getOrg_id());
	            				break;
							}
            			}
            		}
            		if(!flag){//不匹配
            			json.put("success", false);
            			json.put("message", item.getOrg_name()+"不存在");
            			return;
            		}
            	}
			}
			//通过验证，赋值完成，保存
			for(int i=0;i<sublist.size();i++){
				mapper.addSubAccount(sublist.get(i));
				RegSalt rs=new RegSalt();
        		rs.setAcc_name(sublist.get(i).getSa_name());
        		rs.setSalt(sublist.get(i).getSalt());
        		regAccoutService.addSalt(rs);//保存盐值
			}
			json.put("message", "上传解析完成");
		}
		
	}
	
	/**解析excel,并返回子账号列表*/
	private List<SubAccount> getListFromExcel(File finalFile,JSONObject json, HttpServletRequest request) throws Exception{
		 List<SubAccount> items=new ArrayList<SubAccount>();
	     String fileName=finalFile.getName();
	     String currentIp = IpAddressUtils.getCurrentIpAddress(request);//当前用户IP地址
		 boolean isE2007 = false;    //判断是否是excel2007格式  
	     if(fileName.endsWith("xlsx")){
	     	isE2007 = true;
	     }
         InputStream input =new FileInputStream(finalFile);
         Workbook wb  = null;  
         //根据文件格式(2003或者2007)来初始化  
         if(isE2007){  
             wb = new XSSFWorkbook(input);
         }else{  
             wb = new HSSFWorkbook(input);
         }
         Sheet sheet = wb.getSheetAt(0);     //获得第一个表单  
         if(!sheet.iterator().hasNext()){
        	 json.put("success", false);
        	 json.put("message", "excel为空");
        	 return items; 
         }
         int trLength =sheet.getLastRowNum();
         if (trLength<=2) {
        	json.put("success", false);
 			json.put("message", "没有账号数据");
         }
         for(Row row: sheet) {  //获得行数据
             //跳过第一行，一般第一行是表头，
             if(row.getRowNum()>2){
            	SubAccount item=new SubAccount();	
            	if((row.getCell(0)==null ||row.getCell(0).toString().equals(""))
            			&& (row.getCell(1)==null||row.getCell(1).toString().equals("")) 
            			&& (row.getCell(2)==null||row.getCell(2).toString().equals("")) 
            			&&(row.getCell(3)==null||row.getCell(3).toString().equals(""))){
            		if(row.getRowNum()==3){
            			json.put("success", false);
            			json.put("message", "没有账号数据");
            		}
            		break;//最后一行
            	}
            	if(row.getCell(0)==null || row.getCell(1)==null || row.getCell(2)==null || row.getCell(3)==null ){
            		json.put("success", false);
            		json.put("message", "第"+ (row.getRowNum()+1) +"行，有数据未输入！");
            		break;
            	}
            	row.getCell(2).setCellType(Cell.CELL_TYPE_STRING);
            	row.getCell(0).setCellType(Cell.CELL_TYPE_STRING);
            	item.setOrg_name((row.getCell(0)==null)?"":row.getCell(0).getStringCellValue());
            	item.setSa_name((row.getCell(1)==null)?"":row.getCell(1).toString());
            	item.setUsername((row.getCell(2)==null)?"":row.getCell(2).getStringCellValue());
            	if(row.getCell(3)==null){
            		item.setPhone("");
            	}else{
            		row.getCell(3).setCellType(Cell.CELL_TYPE_STRING);
            		item.setPhone(row.getCell(3).getStringCellValue());
            	}
            	item.setLast_login_ip(currentIp);//添加默认IP 主账号IP
            	
             	items.add(item);
             }else if(row.getRowNum()==1){//检测表头
             	String name=(row.getCell(0)==null)?"":row.getCell(0).toString().trim();
             	if(!"员工信息表".equals(name)){
             		json.put("success", false);
                	json.put("message", "请使用下载的模板");
             		break;
             	}
             }
         } 
         input.close();
	     return items;
	}
	
	public File createSubAccountExcel(String filePath) throws IOException{
		LoginAccount loginAccount=(LoginAccount)SessionUtil.getAttribute(Const.SESSION_PLATFORM_LOGIN_USER);
		
		Map<String,Object> params=new HashMap<String,Object>();
		params.put("reg_id", loginAccount.getLogin_id());
		List<SubAccount> list=getSubAccountList(params);
		
		String filename=loginAccount.getLogin_id()+"_"+MyDateUtils.format_yyyyMMddHHmmsss(new Date())+".xls";
		File file=new File(filePath+filename);
		file.createNewFile();
		HSSFWorkbook workbook=new HSSFWorkbook();	
		
		HSSFSheet sheet=workbook.createSheet();
		
		sheet.setColumnWidth(2, 10000);//第2+1=3列宽10000
		//提示信息
		HSSFRow tip=sheet.createRow(0); //第0行
		HSSFCell tipCell0=tip.createCell(0);
        CellRangeAddress regions = new CellRangeAddress((short) 0,  
                (short) 0, (short) 0, (short) 3);//add  新顺序为 起始行 终止行 起始列 终止列  
        sheet.addMergedRegion(regions);
        tipCell0.setCellValue("1.该Excel表用于导入子账号，组织，子账号，姓名和手机号必填；"
        		+"2.子账号=主账号+':'+3-15位数字或字母或下划线或汉字等任意组合；"
        		+"3.默认密码666888；手机号11位数字；"
        		+"4.组织可作为部门,若缺少相应组织，请在'组织结构'添加，完成后重新下载新模板。");
        HSSFFont font = workbook.createFont();
        font.setFontName("宋体");
        font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);//粗体显示
        font.setFontHeightInPoints((short) 16);//设置字体大小
        HSSFCellStyle tipstyle = workbook.createCellStyle();
        tipstyle.setFont(font);
        tipstyle.setWrapText(true);//设置自动换行
        tipCell0.setCellStyle(tipstyle);
        tip.setHeight((short) 1600);
        //标题
        HSSFRow title=sheet.createRow(1); //第1行
		HSSFCell titleCell0=title.createCell(0);
        CellRangeAddress titleregions = new CellRangeAddress((short) 1,  
                (short) 1, (short) 0, (short) 3);//add  新顺序为 起始行 终止行 起始列 终止列  
        sheet.addMergedRegion(titleregions);
        titleCell0.setCellValue("员工信息表");
        HSSFCellStyle titleStyle = workbook.createCellStyle();
        titleStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        titleStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
        titleCell0.setCellStyle(titleStyle);
        
		HSSFRow header=sheet.createRow(2); //第2行

		HSSFCell cell0=header.createCell(0);
		cell0.setCellValue("组织");
		HSSFCell cell1=header.createCell(1);
		cell1.setCellValue("子账号");
		HSSFCell cell2=header.createCell(2);
		cell2.setCellValue("姓名");
		HSSFCell cell3=header.createCell(3);
		cell3.setCellValue("手机号");
		sheet.setColumnWidth(0, 30*256);
		sheet.setColumnWidth(1, 30*256);
		sheet.setColumnWidth(2, 30*256);
		sheet.setColumnWidth(3, 30*256);
		//设置  列为文本合适
		HSSFCellStyle css = workbook.createCellStyle();
		DataFormat  format = workbook.createDataFormat();
		css.setDataFormat(format.getFormat("@"));
		sheet.setDefaultColumnStyle(3,css);
		
		for(int i=0;i<list.size();i++){
			HSSFRow detail=sheet.createRow(i+3); //第i+3行
			HSSFCell cell_detail_0=detail.createCell(0);
			cell_detail_0.setCellValue(list.get(i).getOrg_name());
			HSSFCell cell_detail_1=detail.createCell(1);
			cell_detail_1.setCellValue(list.get(i).getSa_name());
			HSSFCell cell_detail_2=detail.createCell(2);
			cell_detail_2.setCellValue(list.get(i).getUsername());
			HSSFCell cell_detail_3=detail.createCell(3);
			cell_detail_3.setCellValue(list.get(i).getPhone());
		}		
		FileOutputStream fout = new FileOutputStream(file);  
		workbook.write(fout);  
        fout.close(); 
		return file;
	}
	
	public void updateRegAccoutPsw(SubAccount subAccount){
		mapper.updateSubAccoutPsw(subAccount);
	}
	
	/**
	 * 更新账户上次登录IP
	*updateLastIpAddress
	*@param params
	*void
	*@author mishengliang
	*2016-6-22下午6:52:30
	 */
	public void updateLastIpAddress(Map<String, Object> params){
		mapper.updateLastIpAddress(params);
	}
	public List<SubCountResult> getSubCount(Map<String, Object> params) {
		LoginAccount ra=SessionUtil.getCurrentPlateLoginAccount();
		Map<String,Object> params1=new HashMap<String,Object>();
		params.put("reg_id", ra.getLogin_id());
		List<Organization>list=organizationService.getOrganizationList(params);
		List<SubCountResult>list1=new ArrayList<SubCountResult>();
		for (Organization o : list) {
			SubCountResult subCountResult=new SubCountResult();
			subCountResult.setOrg_id(o.getOrg_id());
			params1.put("org_id", o.getOrg_id());
			subCountResult.setOrg_num(getSubAccountListByReg_id(params1).size());
			list1.add(subCountResult);
		}
		return list1;
	}
	/**
	 * @Description:检查手机号是否存在
	 * SubAccountService
	 * checkMobileExist
	 * @param qryParam
	 * @return boolean
	 * @author yukai
	 * 2016-11-15 上午9:13:46
	 */
	public boolean checkMobileExist(Map<String, Object> params) {
		return mapper.checkMobileExist(params)>0;
	}
}
