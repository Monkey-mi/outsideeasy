/**
 * 企业信息后台维护controller层
 */
package manager.supplier.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
//import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
//import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//import manager.supplier.model.Attched;
//import manager.supplier.model.FileType;
import manager.common.user.model.UserInfo;
import manager.supplier.model.Attched;
import manager.supplier.model.SupplierFile;
import manager.supplier.service.AttchedService;
import manager.supplier.service.AuthUpdateAttchedService;
import manager.supplier.service.AuthcationUpdateService;
import manager.supplier.service.BankAccountService;
import manager.supplier.service.CompetitorService;
import manager.supplier.service.DevicelistService;
import manager.supplier.service.GoodsService;
import manager.supplier.service.InvoiceTitleService;
import manager.supplier.service.MainCustomerService;
import manager.supplier.service.MetarialService;
import manager.supplier.service.MngSupplierCheckfactoryReportService;
import manager.supplier.service.MngSupplierMaterialcheckService;
import manager.supplier.service.SupplierFileService;
import manager.supplier.service.SupplierMaterialSub1Service;

import manager.supplier.service.AuthcationInfoService;
import manager.supplier.service.CompanyAuthcationHistoryService;
import manager.supplier.service.CompanyAuthAttachedHistoryService;
//import net.sf.json.JSONArray;




import org.activiti.engine.impl.util.json.JSONObject;
//import org.apache.commons.fileupload.FileItem;
//import org.apache.commons.fileupload.FileItemFactory;
//import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
//import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import platform.company.service.CompanyForPlateFormService;

import common.mongodb.service.FileOptService;
import common.user.model.LoginAccount;

//import platform.common.model.PfRegisterAttched;
//import platform.common.service.PfRegisterAttchedService;

//import common.mongodb.service.FileOptService;


import usercenter.saleManage.model.AccessApplicationAttched;
import usercenter.saleManage.model.CustomerFiles;
import usercenter.saleManage.service.AccessApplicationAttchedService;
import usercenter.saleManage.service.AccessApplicationCategoryService;
import usercenter.saleManage.service.CustomerFilesService;
import util.Const;
import util.MyDateUtils;
import util.SessionUtil;
import util.WebUtil;
import util.annotation.DocLogger;

import java.util.List;

@Controller
@RequestMapping("supplier")
public class SupplierFileCtrl {
	@Autowired
	private SupplierFileService supplierFileSerivec;
	@Autowired
	private AttchedService attchedService; 
	@Autowired
	private InvoiceTitleService invoiceTitleService;
	@Autowired
	private DevicelistService devicelistService;
	@Autowired
	private MetarialService metarialService;
	@Autowired
	private MainCustomerService mainCustomerService;
	@Autowired
	private BankAccountService bankAccountService;
	@Autowired
	private CompetitorService competitorService;
	@Autowired
	private GoodsService goodsService;
	@Autowired
	private SupplierMaterialSub1Service supplierMaterialSub1Service;
	@Autowired
	private FileOptService fileService;
	//@Autowired
	//private PfRegisterAttchedService registerAttchedService;
	@Autowired
	private AuthcationInfoService authcationInfoService;
	
	@Autowired
	private AuthUpdateAttchedService authUpdateAttchedService;
	
	@Autowired
	private AuthcationUpdateService authcationUpdateService;
	@Autowired
	private CompanyAuthAttachedHistoryService companyAuthAttachedHistoryService;
	@Autowired
	private CompanyAuthcationHistoryService companyAuthcationHistoryService;
	@Autowired
	private AccessApplicationCategoryService aeService;
	@Autowired
	private CompanyForPlateFormService companyForPlateFormService;
	@Autowired
	private AccessApplicationAttchedService asService;
	@Autowired
	private CustomerFilesService cfService;
	@Autowired
	private MngSupplierCheckfactoryReportService scrService;
	@Autowired
	private MngSupplierMaterialcheckService smService;
	//供应商基本信息
	@RequestMapping(value="/supplierFile.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> supplierFile(HttpServletRequest request,HttpServletResponse response) throws Exception{
		
		return WebUtil.DynamicCallCURD(request,response,supplierFileSerivec);
	}
	
	//供应商供应品类信息
		@RequestMapping(value="/category.do",method=RequestMethod.POST)
		@ResponseBody 
		public Map<String,Object> category(HttpServletRequest request,HttpServletResponse response) throws Exception{
			
			return WebUtil.DynamicCallCURD(request,response,aeService);
		}
	
	//公司注册附件 信息
	@RequestMapping(value="/attched.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> attched(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request,response,attchedService);
	}
	
	//供应商验厂报告信息
		@RequestMapping(value="/supplierCheckfactoryReport.do",method=RequestMethod.POST)
		@ResponseBody 
		public Map<String,Object> supplierCheckfactoryReport(HttpServletRequest request,HttpServletResponse response) throws Exception{
			
			return WebUtil.DynamicCallCURD(request,response,scrService);
		}
	
		//供应商物料确认信息
		@RequestMapping(value="/mngSupplierMaterialcheck.do",method=RequestMethod.POST)
		@ResponseBody 
		public Map<String,Object> mngSupplierMaterialcheck(HttpServletRequest request,HttpServletResponse response) throws Exception{
			return WebUtil.DynamicCallCURD(request,response,smService);
		}
	/** 上传路径*/
	private final static String uploadFolderPath = WebUtil.getUpLoadFileRoot();

/*	@RequestMapping(value="/upMogoFile.do",method=RequestMethod.POST)
	@ResponseBody 
	public String upMogoFile(HttpServletRequest request,HttpServletResponse response) throws Exception{
		JSONObject json = new JSONObject();
    	json.put("success", true);
    	Attched[] arr=null;
		if(request.getParameter("recordData")!=null ){
			JSONArray jsonArray=JSONArray.fromObject(request.getParameter("recordData"));
			arr = (Attched[])JSONArray.toArray(jsonArray,Attched.class);
		   try{			
		        for(Attched obj:arr){
		        	String file_path= obj.getFile_path();
		        	String file_name= obj.getFile_name();
		        	int company_id=obj.getCompany_id();
		        	Date create_dt=obj.getCreate_dt();
		        	int file_type_id=0;
		    		if (file_path=="" || file_path==null) {
		    			json.put("message", "文件路径不存在");
		    			return json.toString() ;
		    		}
		    		if (file_name=="" || file_name==null) {
		    			json.put("message", "文件名为空");
		    			return json.toString() ;
		    		}
		    		System.out.println(uploadFolderPath+file_path);
		    		FileItem fileItem=createFileItem(uploadFolderPath+file_path,file_name);
		    		if (fileItem==null) {
		    			json.put("message", "文件不存在");
		    			return json.toString() ;
		    		}
		    		CommonsMultipartFile file=new CommonsMultipartFile(fileItem);
		    		String mongodbId=fileService.SaveFile(file);
		    		//PfRegisterAttched attched=new PfRegisterAttched();
		    		obj.setMogodb_id(mongodbId);
		    		//attched.setFile_name(file_name);
		    		Map<String,Object>  qryParam = new HashMap<String, Object>();
		    		List<FileType>fileTypes=attchedService.getFileTypeList(qryParam);
		    		if (file_name.equals("营业执照")) {
		    			file_type_id=18;
		    		}
		    		else if (file_name.equals("税务登记证")) {
		    			file_type_id=19;
					}
		    		else if (file_name.equals("组织机构代码证")) {
		    			file_type_id=20;
					}
		    		else if (file_name.equals("纳税人资格证书")) {
		    			file_type_id=21;
					}
		    		else if (file_name.equals("ISO9001质量认证体系")||file_name.equals("认证体系复印件")||file_name.equals("认证体系证书复印件")) {
						file_type_id=25;
					}
			    	else if (file_name.equals("公司照片")||file_name.equals("厂区大门")||file_name.equals("厂貌")||file_name.equals("车间")
			    			||file_name.equals("办公室")||file_name.equals("样品间")||file_name.equals("前台")||file_name.equals("车队")||file_name.equals("会议室")
			    			||file_name.equals("厂容、厂貌")||file_name.equals("厂房")||file_name.equals("厂区容貌")||file_name.equals("仓库")||file_name.equals("厂门")) {
						file_type_id=24;
					}
			    	else {
			    		file_type_id=27;
					}
		    		attched.setFile_type_id(file_type_id);
		    		attched.setCompany_id(company_id);
		    		attched.setFile_path(null);
		    		attched.setCreate_dt(create_dt);
		    		attched.setFile_format(null);
		    		attched.setIsmust(0);
		    		attched.setRemark(null);
		    		attched.setIscustom(0);
		    		Integer id = null;
		    		obj.setFile_path("");
		    		attchedService.updateAttched1(obj);
		    		json.put("message", "上传成功");
		        }
		   }catch (Exception e) {
				e.printStackTrace();
				json.put("message", "上传出错，请重试！");
			}
		}
		return json.toString();
		String file_path= request.getParameter("file_path");
		String file_name= request.getParameter("file_name");
		int company_id= Integer.parseInt(request.getParameter("company_id"));
		String create_dt= request.getParameter("create_dt");
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date=sdf.parse(create_dt); 
		int file_type_id=0;
		if (file_path=="" || file_path==null) {
			json.put("message", "文件路径不存在");
			return json.toString() ;
		}
		System.out.println(uploadFolderPath+file_path);
		FileItem fileItem=createFileItem(uploadFolderPath+file_path,file_name);
		if (fileItem==null) {
			json.put("message", "文件不存在");
			return json.toString() ;
		}
		CommonsMultipartFile file=new CommonsMultipartFile(fileItem);
		String mongodbId=fileService.SaveFile(file);
		PfRegisterAttched attched=new PfRegisterAttched();
		attched.setMogodb_id(mongodbId);
		attched.setFile_name(file_name);
		Map<String,Object>  qryParam = new HashMap<String, Object>();
		List<FileType>fileTypes=attchedService.getFileTypeList(qryParam);
		for (FileType fileType : fileTypes) {
			if (fileType.getType_name().equals(file_name)) {
				file_type_id=fileType.getFt_id();
			}
		}
		attched.setFile_type_id(file_type_id);
		attched.setCompany_id(company_id);
		attched.setFile_path(null);
		attched.setCreate_dt(date);
		attched.setFile_format(null);
		attched.setIsmust(0);
		attched.setRemark(null);
		attched.setIscustom(0);
		Integer id = null;
		id=registerAttchedService.addAppRegisterAttched(attched);
		if (id!=null) {
			json.put("message", "上传成功");
		}else {
			json.put("message", "上传失败");
		}
		return json.toString();
	}
	
	private FileItem createFileItem(String filePath,String file_name)
    {
        FileItemFactory factory = new DiskFileItemFactory(16, null);
        String textFieldName = "textField";
        int num = filePath.lastIndexOf(".");
        String extFile = filePath.substring(num);
        FileItem item = factory.createItem(textFieldName, "text/plain", true,
        		file_name + extFile);
        File newfile = new File(filePath);
        if (!newfile.exists()) {
			return null;
		}
        int bytesRead = 0;
        byte[] buffer = new byte[8192];
        try
        {
            FileInputStream fis = new FileInputStream(newfile);
            OutputStream os = item.getOutputStream();
            while ((bytesRead = fis.read(buffer, 0, 8192))
                != -1)
            {
                os.write(buffer, 0, bytesRead);
            }
            os.close();
            fis.close();
        }
        catch (IOException e)
        {
            fail("Unexpected IOException" + e);
        }

        return item;

    }*/
    @RequestMapping(value="/upAttchedFile.do",method = RequestMethod.POST)
    @ResponseBody
    public String upAttchedFile(HttpServletRequest request,HttpServletResponse response) throws Exception {
    	JSONObject json = new JSONObject();
    	json.put("success", true);
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;   
        CommonsMultipartFile file = (CommonsMultipartFile) multipartRequest   
                .getFile("file");   //对应前台文件对象       
        String company_id=request.getParameter("company_id");
        String file_name=request.getParameter("file_name");
        String partPath=request.getParameter("partPath");
        if(partPath==null||partPath=="")
        {
        	partPath="register";
        }
        boolean isimg=false;
        String strisimg=request.getParameter("isimg");
        if(strisimg!=null){
        	isimg=Boolean.valueOf(strisimg);
        }
        InputStream inputStream = null;
        OutputStream outputStream = null;
        if(file!=null && file.getSize()>0){
        	if (file.getSize() >10*1024*1024) {
				json.put("msg", "文件太大，超过10M");
				return json.toString() ;	
			} 
	        inputStream = file.getInputStream();
	        //中间部分自定义文件路径
            String partfolder=partPath+"/"+company_id+"/";//getpartPathfolder(company_id);
           //文件存放路径
            String folder=uploadFolderPath+partfolder;
            File newFile = new File(folder);
            if(!newFile.exists()){
              newFile.mkdirs();
            }
            String originalName=file.getOriginalFilename();
            String newName=originalName;
            SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd_HHmmss");
            //上传的是图片，判断是否符合图片类型
            if(isimg)
            {
            	boolean flag=false;//默认不 是图片
            	if(originalName.indexOf(".")>0){//有后缀  XX.jpg  XX.RAR
            		String this_suffix=originalName.substring(originalName.lastIndexOf("."));
                	
                	for(String suffix:Const.imgArray){
                		if(suffix.equalsIgnoreCase(this_suffix)){
                			flag=true;
                			break;
                        }
                	}
                	newName=file_name+df.format(new Date())+originalName.substring(originalName.lastIndexOf("."));
            	}
            	//与常用的图片类型不匹配
            	if(!flag)
            	{
            		json.put("msg", "当前上传的不是图片");
    				return json.toString() ;
            	}
            }
            //其他类型文件
            else{
            	//获取文件后缀，与传过来的参数file_name重新组装文件名
                if(originalName.indexOf(".")>0){//有后缀  XX.jpg  XX.RAR
                	
                	newName=file_name+df.format(new Date())+originalName.substring(originalName.lastIndexOf("."));
                }
            }
            
            
            //完整文件对象
            String file_path=folder+newName;
            File finalFile = new File(file_path);
            finalFile.setReadable(true, false);
            finalFile.setWritable(true, false);
            outputStream = new FileOutputStream(finalFile);

            int readBytes = 0;
            byte[] buffer = new byte[1024];
            while ((readBytes = inputStream.read(buffer, 0, 1024)) != -1) {
                    outputStream.write(buffer, 0, readBytes);
            }
            json.put("file_path", partfolder+newName);
            outputStream.close();
            inputStream.close();          
        }else{
        	json.put("msg", "文件不存在");
        }
        return json.toString();
    }
    @RequestMapping(value="/downloadAttched.do",method=RequestMethod.GET)
    @ResponseBody
	public  void downloadAttched(HttpServletRequest request,HttpServletResponse response ) throws Exception {
    	//String id=request.getParameter("id");
		//获取文件对象，因为文件路径可能包含无法识别的字符，所以不传路径，传递附件id
		//Attched attched=attchedService.getFilePathByPathAndId(Integer.valueOf(id));
		//String file_path=attched.getFile_path();
		//因预览功能在保存之前，所有用ID不合适，改用file_path
    	String file_path=request.getParameter("file_path");
		if(file_path!=null){
			file_path=java.net.URLDecoder.decode(file_path,"UTF-8");
			File finalFile = new File(uploadFolderPath+file_path);
			String filename=file_path.substring(file_path.lastIndexOf("/")+1);
	       
	        if(finalFile.exists()){
	        	OutputStream out = null;
	            InputStream in = null;
	            boolean isimg=false;
	            String strisimg=request.getParameter("isimg");
	            if(strisimg!=null){
	            	isimg=Boolean.valueOf(strisimg);
	            }
	            // 获得文件名
	            // 定义输出类型(下载)
	            response.setContentType("application/octet-stream; charset=utf-8");
	            //如果是图片
	            if(isimg)
	            {
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
	                //文件类型为图片类型
	                if(flag){
	                	response.setContentType("image/*");
	                }
	            }
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

	            byte[] buffer = new byte[2048];
	            int i = -1;
	            while ((i = in.read(buffer)) != -1) {
	                out.write(buffer, 0, i);
	            }

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
    /**按路径，删除服务器上面的附件**/
    @RequestMapping(value="/deleteAttchedByPath.do",method = RequestMethod.POST)
    @ResponseBody
	public String deleteAttchedByPath(HttpServletRequest request,HttpServletResponse response) throws Exception {
		JSONObject json = new JSONObject();
    	json.put("success", true);
    	String arraystr=request.getParameter("patharray");
    	String[] array= arraystr.split(",");
		for(int i=0;i<array.length;i++){
			File file = new File(uploadFolderPath+array[i]);
			if(file.exists()){
				file.delete();
			}
		}
		return json.toString();
	}
    
  //公司发票抬头 信息
  	@RequestMapping(value="/invoiceTitle.do",method=RequestMethod.POST)
  	@ResponseBody 
  	public Map<String,Object> invoiceTitle(HttpServletRequest request,HttpServletResponse response) throws Exception{
  		return WebUtil.DynamicCallCURD(request,response,invoiceTitleService);
  	}
  	
  //公司主要设备明细 信息
  	@RequestMapping(value="/devicelist.do",method=RequestMethod.POST)
  	@ResponseBody 
  	public Map<String,Object> devicelist(HttpServletRequest request,HttpServletResponse response) throws Exception{
  		return WebUtil.DynamicCallCURD(request,response,devicelistService);
  	}
  	
  //公司产品主要用料表
  	@RequestMapping(value="/metarial.do",method=RequestMethod.POST)
  	@ResponseBody 
  	public Map<String,Object> metarial(HttpServletRequest request,HttpServletResponse response) throws Exception{
  		return WebUtil.DynamicCallCURD(request,response,metarialService);
  	}
  	
  //公司主要客户
  	@RequestMapping(value="/mainCustomer.do",method=RequestMethod.POST)
  	@ResponseBody 
  	public Map<String,Object> mainCustomer(HttpServletRequest request,HttpServletResponse response) throws Exception{
  		return WebUtil.DynamicCallCURD(request,response,mainCustomerService);
  	}
  //公司银行账号
  	@RequestMapping(value="/bankAccount.do",method=RequestMethod.POST)
  	@ResponseBody 
  	public Map<String,Object> bankAccount(HttpServletRequest request,HttpServletResponse response) throws Exception{
  		return WebUtil.DynamicCallCURD(request,response,bankAccountService);
  	}
  //公司主要竞争对手
  	@RequestMapping(value="/competitor.do",method=RequestMethod.POST)
  	@ResponseBody 
  	public Map<String,Object> competitor(HttpServletRequest request,HttpServletResponse response) throws Exception{
  		return WebUtil.DynamicCallCURD(request,response,competitorService);
  	}
  //公司产品表
  	@RequestMapping(value="/goods.do",method=RequestMethod.POST)
  	@ResponseBody 
  	public Map<String,Object> goods(HttpServletRequest request,HttpServletResponse response) throws Exception{
  		return WebUtil.DynamicCallCURD(request,response,goodsService);
  	}
  	//组装文件路径
	public static String getpartPathfolder(String company_id) {
		return "register/"+company_id+"/";
	}
	//厂商类别最末级子类别
	@RequestMapping(value="/SupplierMaterialSub1.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> supplierMaterialSub1(HttpServletRequest request,HttpServletResponse response) throws Exception{
			
		return WebUtil.DynamicCallCURD(request,response,supplierMaterialSub1Service);
	}
	//根据备注说明字段及名称字段模糊多关键字查询供应商基本信息
	@RequestMapping(value="/getSuppliersByMultiSearch.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> getSuppliersByMultiSearch(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object> respMap = WebUtil.getDefaultResponseMap();
		try
		{
			List<SupplierFile> infos=supplierFileSerivec.getSuppliersByMultiSearch(qryParam);
			respMap.put(Const.AJAX_SERVICE_TOTAL, qryParam.get(Const.AJAX_SERVICE_TOTAL));
			if(infos.size()>0)
			{
				respMap.put(Const.AJAX_DATA_ROOT,infos);
			}
			
		}
		catch(Exception e){
			WebUtil.makeErrorMsg(e, respMap);
		}
		return respMap;
	}
	
	//供应商入驻认证审核信息
	@RequestMapping(value="/authcationInfo.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> authcationInfo(HttpServletRequest request,HttpServletResponse response) throws Exception{
		
		return WebUtil.DynamicCallCURD(request,response,authcationInfoService);
	}
	
	//供应商入驻变更信息
	@RequestMapping(value="/authcationUpdate.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> authcationUpdate(HttpServletRequest request,HttpServletResponse response) throws Exception{
		
		return WebUtil.DynamicCallCURD(request,response,authcationUpdateService);
	}
	
	//公司入驻变更附件信息
	@RequestMapping(value="/authUpdateAttched.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> authUpdateAttched(HttpServletRequest request,HttpServletResponse response) throws Exception{
		
		return WebUtil.DynamicCallCURD(request,response,authUpdateAttchedService);
	}
	
	//公司认证证照历史版本表
	@RequestMapping(value="/companyAuthAttachedHistory.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> companyAuthAttachedHistory(HttpServletRequest request,HttpServletResponse response) throws Exception{
		
		return WebUtil.DynamicCallCURD(request,response,companyAuthAttachedHistoryService);
	}
	//公司认证信息历史版本表
	@RequestMapping(value="/companyAuthcationHistory.do",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> companyAuthcationHistory(HttpServletRequest request,HttpServletResponse response) throws Exception{
		
		return WebUtil.DynamicCallCURD(request,response,companyAuthcationHistoryService);
	}
	
    private final String partpath="temp2importSupplier";
    /**导入供应商
	 * 
	 * */
	@RequestMapping(value="/importSupplier.do",method=RequestMethod.POST)
	@ResponseBody 
	public String importSupplier(HttpServletRequest request,HttpServletResponse response) throws Exception{
		JSONObject json = new JSONObject();
    	json.put("success", true);
    	int ownerId=Integer.parseInt(request.getParameter("ownerId"));
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
            	supplierFileSerivec.addSupplierFileByExcel(finalFile, json, request,ownerId);
			} catch (Exception e) {
				json.put("success", true);
				json.put("message", "解析失败");
				e.printStackTrace();
			}finally{
				finalFile.delete();
			}           
        }else{
        	json.put("success", true);
        	json.put("message", "上传失败");
        }
        return json.toString();
	}
	/**
	 * @Description:上传认证文件
	 * SupplierFileCtrl
	 * upQualificationAttchedFile
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception String
	 * @author yukai
	 * 2016-12-8 上午8:59:14
	 */
	@DocLogger(explain="上传认证文件")
    @RequestMapping(value="/upQualificationAttchedFile.do",method = RequestMethod.POST)
    @ResponseBody
    public String upQualificationAttchedFile(HttpServletRequest request,HttpServletResponse response) throws Exception {
    	Map<String,Object> qryParam = WebUtil.getDefaultParamsMap(request);
		Map<String,Object>params=new HashMap<String, Object>();
		UserInfo userInfo = (UserInfo)SessionUtil.getAttribute(Const.SESSION_USER);
		JSONObject json = new JSONObject();
    	json.put("success", true);
    	/*
    	 * 1.检查参数
    	 */
		if(WebUtil.isEmpty(request.getParameter("file_type_id"))){//获取任务id
			json.put("message", "没有文件类型值");
			return json.toString() ;
		}
		/*
		 *2.赋值 
		 */
		int company_id=0;
		int file_type_id = Integer.parseInt(request.getParameter("file_type_id"));
		int supplier_id = Integer.parseInt(request.getParameter("supplier_id"));
		String fileName = request.getParameter("fileName");
		String formatType = request.getParameter("formatType");
		params.put("supplier_id", supplier_id);
		List<CustomerFiles> customerFiles=cfService.getCustomerFilesList(params);
		if (customerFiles.size()>0) {
			company_id=customerFiles.get(0).getCompany_id();
		}
		if(fileName.indexOf(",") != -1){
			json.put("message", "文件名中存在非法字符(英文逗号),请先去除后上传");
			return json.toString() ;
		}
		
		/*
		 * 3.对文件信息的处理
		 */
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request; 
        if(WebUtil.isEmpty((CommonsMultipartFile) multipartRequest.getFile("file"))){
			json.put("message", "没有文件");
			return json.toString() ;
		}
        CommonsMultipartFile file = (CommonsMultipartFile) multipartRequest.getFile("file");   //对应前台文件对象   
       
        if(file!=null && file.getSize()>0){//检查文件大小和格式
        	if (file.getSize() >5*1024*1024) {
				json.put("message", "文件太大，超过5M");
				return json.toString() ;
			} 
	        
            String originalName=file.getOriginalFilename();
            String this_suffix="";
            params.put(Const.ISIMG, 0);
            params.put(Const.USE_TYPE, file_type_id);
            params.put(Const.USERNAME, userInfo.getLogin_id());
            params.put(Const.COM_ID, company_id);
            qryParam.put("companyId", company_id);
            params.put(Const.COM_NAME,companyForPlateFormService.getCompanyNameByCompanyId(qryParam));
            boolean flag=false;//默认不 是图片
            //获取文件后缀，与传过来的参数file_name重新组装文件名
            if(originalName.indexOf(".")>0){//有后缀  XX.jpg  XX.RAR
            	this_suffix=originalName.substring(originalName.lastIndexOf("."));
            	
            	String[] format = null;
            	if("image".equals(formatType)){//判断上传文件的类型：image 图片，text 文档
            		format = Const.imgArray;
            		params.put(Const.ISIMG, 1);
            	}else if("text".equals(formatType)){
            		format = Const.otherArray;
            	}
            	
            	for(String suffix:format){
            		if(suffix.equalsIgnoreCase(this_suffix)){
            			flag=true;
            			break;
                    }
            	}          	
            }
            
            if(!flag){
        		json.put("message", "不是指定格式");
				return json.toString() ;
        	}else{
        		/*
        		 * 4.进行信息的处理
        		 */
        		String mongodbId=fileService.SaveFile(file,params);
        		Map<String, Object> params1 = new HashMap<String, Object>();
        		Map<String, Object> params2 = new HashMap<String, Object>();
        		Map<String, Object> qryParams = new HashMap<String, Object>();
        		Map<String, Object> qryParams1 = new HashMap<String, Object>();
	            qryParams.put("mogodb_id", mongodbId);
	            qryParams.put("file_type_id", file_type_id);
	            qryParams.put("file_name", fileName);
	            qryParams.put("file_format", this_suffix);
	            qryParams.put("company_id", company_id);
	            qryParams1.put("mogodb_id", mongodbId);
	            qryParams1.put("file_type_id", file_type_id);
	            qryParams1.put("file_name", fileName);
	            qryParams1.put("file_format", this_suffix);
	            qryParams1.put("supplier_id", supplier_id);
        		if(file_type_id==18||file_type_id==19||file_type_id==20||file_type_id==21||file_type_id==22
        		   ||file_type_id==23||file_type_id==25){//单张图片如果存在就更新
        			params1.put("company_id", company_id);
        			params1.put("file_type_id", file_type_id);
        			List<Attched> attcheds=attchedService.getAttchedList(params1);
        			if(attcheds.size()>0){//已存在
        				fileService.deleteFileByName(attcheds.get(0).getMogodb_id());
    					params1.put("id", attcheds.get(0).getId());
    					params1.put("mogodb_id", mongodbId);
    					params1.put("file_name", fileName);
    					attchedService.updateAttched1(params1);
    					if(file_type_id==25){
    						params1.put("supplier_id", supplier_id);
    						List<AccessApplicationAttched> attcheds2=asService.getAccessApplicationAttched(params1);
    						fileService.deleteFileByName(attcheds2.get(0).getMogodb_id());
    						params2.put("id", attcheds2.get(0).getId());
    						params2.put("mogodb_id", mongodbId);
    						params2.put("file_name", fileName);
    						asService.updateAccessApplicationAttchedMogoId(params2);
    					}
    				}else {
    					attchedService.addAttched1(qryParams);
    					if(file_type_id==25){
    						qryParams1.put("app_id", qryParams.get("id"));
    						asService.addAccessApplicationAttched(qryParams1);
    					}
					}
        		}else{
    	            attchedService.addAttched1(qryParams);
    	            qryParams1.put("app_id", qryParams.get("id"));
            		asService.addAccessApplicationAttched(qryParams1);
        		}
	            json.put("message", "上传成功");
        	}
        }else{
        	json.put("message", "文件不存在");
        }
        return json.toString();
    }
}


