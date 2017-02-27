package usercenter.externalTask.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.util.CellRangeAddress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.mongodb.gridfs.GridFSDBFile;

import usercenter.externalTask.data.TaskFileMapper;
import usercenter.externalTask.model.Task;
import usercenter.externalTask.model.TaskBom;
import usercenter.externalTask.model.TaskFile;
import usercenter.externalTask.model.TaskProcess;
import util.Const;
import util.MyDateUtils;
import util.SessionUtil;
import util.WebUtil;
import util.ZipCompressorByAnt;

import common.model.BusinessException;
import common.mongodb.model.VideoFileBean;
import common.mongodb.service.FileOptService;
import common.user.model.LoginAccount;



@Service
public class TaskFileService {
	@Autowired
	private TaskFileMapper mapper;
	@Autowired
	private FileOptService fileService;
	@Autowired
	private TaskService taskservice;
	@Autowired
	private TaskBOMService taskBOMService;
	@Autowired
	private  TaskProcessService taskProcessService;

	public List<TaskFile> getTaskFileList(Map<String,Object> params) {
		return mapper.getTaskFileList(params);
	}
	/**
	 * 根据id查询某个文件
	* @Description:
	* TaskFileService
	* getTaskFile
	* @param id
	* @return TaskFile
	* @author chenlong
	* 2016-11-22 下午2:20:55
	 */
	public TaskFile getTaskFile(Integer id){
		return  mapper.getTaskFile(id);
	}
	/**
	 * 查询某个任务单的一种类型文件（1个）
	* @Description:
	* TaskFileService
	* getTaskProhibitFile
	* @param params
	* @return TaskFile
	* @author chenlong
	* 2016-11-22 下午2:21:23
	 */
	public TaskFile getTaskProhibitFile(Map<String,Object> params){
		return  mapper.getTaskProhibitFile(params);
	}
	
	/**
	* @Description: 先删除旧的产品主图，即从mongodb删除图片和删除taskFile记录，
	* 再新增新的，即保存图片到mongodb,新增taskFile到DB
	* 最后，更新任务单的主图信息
	* @param  taskId file
	* @return mongo_fileName tf_id
	* @throws Exception
	* @author xufeng
	* @date 2016-5-4 
	*/
	public Map<String,Object>  updateloadProductMainPic(int taskId,CommonsMultipartFile file,Map<String,Object> map) throws Exception {
		//获取任务单
		Map<String,Object> params = new HashMap<String, Object>();
		params.put("t_id", taskId);
		Task task=taskservice.getTaskByT_id(params);
		String old_mongo_file=task.getProduct_pic();
		if(old_mongo_file!=null){
			fileService.deleteFileByName(old_mongo_file);
			Map<String,Object> tempparams = new HashMap<String, Object>();
			tempparams.put("object_id", old_mongo_file);
			mapper.deleteTaskFileByobject_id(tempparams);
		}
		Map<String,Object> returnmap = new HashMap<String, Object>();
		String mongo_fileName = fileService.SaveFile(file,map);
		int file_type = 7;//该表示产品主图
		TaskFile taskFile = new TaskFile();
		taskFile.setT_id(taskId); 	
		taskFile.setFile_type(file_type);//文件类型值
		taskFile.setObject_id(mongo_fileName);//把存储mongoDb的文件序号存到数据库中
        taskFile.setFile_time(new Date());
        String originalName=file.getOriginalFilename();
        taskFile.setFile_name(originalName);
        String this_suffix=originalName.substring(originalName.lastIndexOf("."));
        taskFile.setSuffix_name(this_suffix);
        Map<String,Object> tempparams2 = new HashMap<String, Object>();
        tempparams2.put("mongo_file_name", mongo_fileName);
        tempparams2.put("t_id", taskId);
        taskservice.updateproduct_pic(tempparams2);
		mapper.addTaskFile(taskFile);
		returnmap.put("tf_id",taskFile.getTf_id());
		returnmap.put("file_path", mongo_fileName);
		return returnmap;
	}
	/**
	 * 增加文件信息
	 * @param arr
	 * @throws Exception 
	 * @author chenlong
	 */
	public Map<String,Object>  addTaskFile(TaskFile arr,CommonsMultipartFile file,Map<String,Object> params) throws Exception {
		Map<String,Object> map = new HashMap<String, Object>();
		String fileName = fileService.SaveFile(file,params);
		arr.setObject_id(fileName);//把存储mongoDb的文件序号存到数据库中
        Date date = new Date();
        arr.setFile_time(date);
        map.put("file_path", fileName);
         
		mapper.addTaskFile(arr);
		if(arr.getFile_type()==5){//如果是指导文件的话更新任务单
			taskservice.updateOperator_file(arr);
		}
		map.put("tf_id",arr.getTf_id());
		map.put("filename", arr.getFile_name());
		map.put("suffix_name", arr.getSuffix_name());
		map.put("file_time", date);
		return map;
	}
	/**
	 * 增加视频文件信息
	 * @param arr
	 * @throws Exception 
	 * @author chenlong
	 */
	public Map<String,Object>  addTaskViewFile(TaskFile arr,File file) throws Exception {
		Map<String,Object> map = new HashMap<String, Object>();
		VideoFileBean fileBean = fileService.SaveVideoFile(file);
		 arr.setObject_id(fileBean.getImage_file());//把存储mongoDb的图片文件序号存到数据库中		
		 arr.setView_no(fileBean.getVideo_file());//把存储的视频放入		
         Date date = new Date();
         arr.setFile_time(date);
         map.put("file_path", fileBean.getImage_file()); //把存放的图片返回       
		 mapper.addTaskViewFile(arr);//存入mysql
		 map.put("tf_id",arr.getTf_id());
		 map.put("filename", arr.getFile_name());
		 map.put("file_time", date);
		 return map;
	}
	/**
	 * 更新文件信息
	 * @param params
	 */
	public  void updateTaskFile(Map<String,Object> params) {
			mapper.updateTaskFile(params);
	}
	/**
	 * 更新指导文件信息
	 * @param params
	 * @author chenlong
	 */
	public  void updateTaskFileForRemark(Map<String,Object> params) {
			mapper.updateTaskFileForRemark(params);		
	}
	/**
	 * 删除文件信息
	 * @param id
	 * @author chenlong
	 */
	public void deleteTaskFile(Map<String,Object>  qryParam ) {
		int tfId = Integer.parseInt(qryParam.get("tf_id").toString());
		TaskFile taskFile = mapper.getTaskFile(tfId);
		if(taskFile.getObject_id() != null){
			String filename1 = taskFile.getObject_id();		
			fileService.deleteFileByName(filename1);
		}else if(taskFile.getView_no() != null){
			String filename2 = taskFile.getView_no();		
			fileService.deleteFileByName(filename2);
		}
		if(taskFile.getFile_type()==7){
			taskservice.updateTaskPicture(qryParam);
		}
		mapper.deleteTaskFile(tfId);			
	}
	public void updatetaskfile2del(Map<String,Object> params) {
		mapper.updatetaskfile2del(params);
	}
	/**
	 * 
	 */
	public void deleteMainTaskFile(Integer id) {
		TaskFile taskFile =  mapper.getTaskFile(id);
		if(taskFile.getObject_id() != null){
		String filename = taskFile.getObject_id();		
		fileService.deleteFileByName(filename);
		}
		mapper.deleteTaskFile(id);
  }
	/**
	 * 查询出工艺文件下的某个个类型文件
	 * @param params 文件类型、任务单id文件类型有图片、其他、视频
	 * @return
	 * @author chenlong
	 * @date 2016-04-18
	 */
	public List<TaskFile> getTypeTaskFileList(Map<String,Object> params){
		//params.put("is_delete", 0);//未删除
		List<TaskFile> list = mapper.getTaskFileImgList(params);
		if(Integer.parseInt(params.get("file_type").toString())==7){
			if(list.size()>1){
				for(int i=0;i<list.size()-1;i++){
					TaskFile taskFile = list.get(i);
					if(taskFile.getObject_id() != null){
					String filename = taskFile.getObject_id();		
					fileService.deleteFileByName(filename);
					}
					mapper.deleteTaskFile(taskFile.getTf_id());
					list.remove(i);
				}
			}
			return list;
		}
		return list;
		
	}
	/**
	 * 查询出工艺文件下的某个个类型文件
	 * @param params 文件类型、任务单id文件类型有图片、其他、视频
	 * @return
	 * @author chenlong
	 * @date 2016-04-18
	 */
	public List<TaskFile> getTypeTaskFileList2(Map<String,Object> params){
		params.put("is_delete", 0);//未删除
		List<TaskFile> list = mapper.getTaskFileImgList2(params);
		if(Integer.parseInt(params.get("file_type").toString())==7){
			if(list.size()>1){
				for(int i=0;i<list.size()-1;i++){
					TaskFile taskFile = list.get(i);
					if(taskFile.getObject_id() != null){
					String filename = taskFile.getObject_id();		
					fileService.deleteFileByName(filename);
					}
					mapper.deleteTaskFile(taskFile.getTf_id());
					list.remove(i);
				}
			}
			return list;
		}
		return list;
	}
	/**
	 * @Description: 查出生产主图和产品图
	 * @param Map<String,Object>
	 * @return TaskFile
	 * @author chenlong
	 * @date 2016-6-7
	 */
	public List<TaskFile> getTaskFileImgListproduct(Map<String,Object> params){
		List<TaskFile> list = mapper.getTaskFileImgListproduct(params);				
		return list;		
	}
	/**
	 * 更新图片的mongdb的存储名称
	 * @param params file_name , t_id
	 * @author lenovo
	 * @date 20116-04-18
	 */
	public void updateImgTaskFile(Map<String,Object> params){
		mapper.updateImgTaskFile(params);
	}
	/**
	 * @Description: 更新图片与物流中的之间的关联 record_id
	 * @param params
	 * @return 
	 * @author chenlong
	 * @date 2016-6-23
	 */
	public void updateLogisticsImg(Map<String,Object> params){
		mapper.updateLogisticsImg(params);
	}
	/**
	 * @Description: 更新运单表中的关联图片
	 * @param params
	 * @return 
	 * @author chenlong
	 * @date 2016-12-15
	 */
	public void updateForShipping(Map<String,Object> params){
		mapper.updateForShipping(params);
	}
	/**
	 * 更新交流合作的图片与交流的关联键
	* @Description:
	* TaskFileService
	* updateCommitImg
	* @param params void
	* @author chenlong
	* 2016-9-29 上午11:13:36
	 */
	public void updateCommitImg(Map<String,Object> params){
		mapper.updateCommitImg(params);
	}
	/**
	 * 返回每条交流信息的是否有图片
	* @Description:
	* TaskFileService
	* getCommitFilelist
	* @param record_id
	* @return Integer
	* @author chenlong
	* 2016-9-29 下午4:22:11
	 */
	public Integer getCommitFilelist(Integer record_id){
		return mapper.getCommitFilelist(record_id);
	}
	/**
	 * @Description:  删除没有和物流进行关联的图片，清理数据库
	 * @param params
	 * @return 
	 * @author chenlong
	 * @date 2016-6-23
	 */
	public void deleteLogisticsImg(Map<String,Object> params){		
		List<TaskFile> taskFiles = 	mapper.getLogisticsImg(params);//查询出所有的无用的物流文件
		if(taskFiles != null){//如果不存在该文件怎不用执行删除
		for(TaskFile taskFile:taskFiles){
			fileService.deleteFileByName(taskFile.getObject_id());//删除mogondb中的文件
			mapper.deleteLogisticsImg(taskFile.getTf_id());//删除mysql中的文件记录
		}	
		}
	}
	/**
	 * @Description: 查询出与该物流相关联的图片
	 * @param Integer
	 * @return List<TaskFile>
	 * @author chenlong
	 * @date 2016-6-23
	 */
	public List<TaskFile> getLogicticsFilelist(Integer id){
		List<TaskFile> taskFiles = mapper.getLogicticsFilelist(id);
		return taskFiles;
	}
	/**
	* @Description: 重新保存文件，filename不变，但是另外一个mongodb的id实际是变化的
	* @param filename
	* @param tempFile
	* @author xufeng
	* @date 2016-7-1 
	*/
	public void updateOnlyFile(String filename,File tempFile){
		GridFSDBFile dbfile=fileService.retrieveFileOne(filename);
		Map<String,Object> params=new HashMap<String,Object>();
		params.put(Const.ISIMG, dbfile.get(Const.ISIMG));
		params.put(Const.USE_TYPE, dbfile.get(Const.USE_TYPE));
		params.put(Const.COM_NAME, dbfile.get(Const.COM_NAME));
		params.put(Const.COM_ID, dbfile.get(Const.COM_ID));
		params.put(Const.USERNAME, dbfile.get(Const.USERNAME));
		fileService.deleteFileByName(filename);
		fileService.saveWithFileName(filename, tempFile,params);
	}
	/**
	 * @Description:重新保存文件，filename不变，但是另外一个mongodb的id实际是变化的
	 * TaskFileService
	 * updateOnlyFile
	 * @param filename
	 * @param file void
	 * @author yukai
	 * 2016-11-24 下午6:30:42
	 */
	public void updateOnlyFile(String filename,MultipartFile file){
		GridFSDBFile dbfile=fileService.retrieveFileOne(filename);
		Map<String,Object> params=new HashMap<String,Object>();
		params.put(Const.ISIMG, dbfile.get(Const.ISIMG));
		params.put(Const.USE_TYPE, dbfile.get(Const.USE_TYPE));
		params.put(Const.COM_NAME, dbfile.get(Const.COM_NAME));
		params.put(Const.COM_ID, dbfile.get(Const.COM_ID));
		params.put(Const.USERNAME, dbfile.get(Const.USERNAME));
		fileService.deleteFileByName(filename);
		fileService.saveWithFileName(filename, file,params);
	}
	//private String tempTaskFilePath=WebUtil.getUpLoadFileRoot()+"tempTaskAllFile"+File.separator;
	/**
	* 将任务单的本来就是文件的放入文件夹内,并生成zip文件
	* @Description:
	* TaskFileService
	* getTaskFileForZIP
	* @param params void
	* @author chenlong
	* 2016-10-11 下午2:18:44
	 * @throws IOException 
	 */
	public File getTaskFileForZIP(Map<String,Object> params) throws IOException{
		String scdh = params.get("scdh").toString();
		String dateNum = MyDateUtils.format_yyyyMMddHHmmsss(new Date());
		String tempTaskFilePath = WebUtil.getUpLoadFileRoot()+"tempTaskAllFile"+File.separator+scdh+"_"+dateNum+File.separator;
		params.put("is_delete", 0);//未删除
		String filePath = "";//Const.TECHNOLOGICAL_DOCUMENT+File.separator+Const.PRODUCT_PICTURE+File.separator;
		Integer[] arr = {1,2,3,5,6,8,45,46};//文件的类型	
		params.put("arr", arr);//查询的文件的类型
		List<TaskFile> list = mapper.getTaskFileAllList(params);
		Integer count = 0;
		for(TaskFile taskFile : list){
			count ++;//用于区别同名的文件
			String object_id = taskFile.getObject_id();
			String original = taskFile.getView_no();
			String filename =  taskFile.getFile_name();
			switch(taskFile.getFile_type()){
			case 1:
				filePath = Const.TECHNOLOGICAL_DOCUMENT+File.separator+Const.PROCESS_PICTURE+File.separator;
				filename = filename+"_"+count;
				break;
			case 2:
				filePath = Const.TECHNOLOGICAL_DOCUMENT+File.separator+Const.OTHER_DOCUMENTS+File.separator;
				filename = filename+"_"+count;
				break;
			case 3:
				filePath = Const.TECHNOLOGICAL_DOCUMENT+File.separator+Const.VIDEO_FILE+File.separator;
				filename = filename+"_"+count;
				object_id = original;
				break;	
			case 5:
				filePath =  "";
				break;
			case 6:
				filePath =  "";
				break;
			case 8:
				filePath = Const.TECHNOLOGICAL_DOCUMENT+File.separator+Const.PRODUCT_PICTURE+File.separator;
				filename = filename+"_"+count;			
				break;		
		    case 45:
			    filePath = Const.TECHNOLOGICAL_DOCUMENT+File.separator+Const.TENPLATE_DRAWING+File.separator;
			    filename = filename+"_"+count;			
			    break;		
			case 46:
				filePath = Const.TECHNOLOGICAL_DOCUMENT+File.separator+Const.EMBROIDERY_DRAWING+File.separator;
				filename = filename+"_"+count;			
				break;
			}
			try {				
				createTaskAllFileForZIP(object_id,filePath,filename,tempTaskFilePath);
			} catch (IOException e) {
				// Auto-generated catch block
				throw new BusinessException("工艺文件存储失败");
			}
		}
		createTaskBomLsit(params,tempTaskFilePath);//生成材料清单excel
		createTaskProcessLsit(params,tempTaskFilePath);//生成定额工时excel
		ZipCompressorByAnt zipCompressorByAnt = new ZipCompressorByAnt(WebUtil.getUpLoadFileRoot()+"tempTaskAllFile"+File.separator+scdh+"_"+dateNum+".zip");
		zipCompressorByAnt.compress(tempTaskFilePath);
		File file = new File(tempTaskFilePath);
		WebUtil.deleteDir(file);
		File zipfile = new File(WebUtil.getUpLoadFileRoot()+"tempTaskAllFile"+File.separator+scdh+"_"+dateNum+".zip");
		return zipfile;
	}
  
	/**
	 * 生成材料清单的excel
	* @Description:
	* TaskFileService
	* createTaskMaterialLsit
	* @param qryParam
	* @return
	* @throws IOException File
	* @author chenlong
	* 2016-10-11 下午3:00:00
	 */
	public void createTaskBomLsit(Map<String,Object>  qryParam,String tempTaskFilePath) throws IOException{
	//	LoginAccount loginAccount=(LoginAccount)SessionUtil.getCurrentPlateLoginAccount();//(Const.SESSION_PLATFORM_USER);					
		String filename="材料清单_"+MyDateUtils.format_yyyyMMddHHmmsss(new Date())+".xls";
		File file=new File(tempTaskFilePath+filename);
		file.createNewFile();
		HSSFWorkbook workbook=new HSSFWorkbook();			
		HSSFSheet sheet=workbook.createSheet();		
		sheet.setColumnWidth(2, 10000);//第2+1=3列宽10000
		//提示信息
		HSSFRow tip=sheet.createRow(0); //第0行
		HSSFCell tipCell0=tip.createCell(0);
        CellRangeAddress regions = new CellRangeAddress((short) 0,  
                (short) 0, (short) 0, (short) 4);//add  新顺序为 起始行 终止行 起始列 终止列  
        sheet.addMergedRegion(regions);
        tipCell0.setCellValue("材料清单");
        HSSFFont font = workbook.createFont();
        font.setFontName("宋体");
        font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);//粗体显示
        font.setFontHeightInPoints((short) 24);//设置字体大小
        HSSFCellStyle tipstyle = workbook.createCellStyle();
        tipstyle.setFont(font);
        tipstyle.setWrapText(true);//设置自动换行
        tipCell0.setCellStyle(tipstyle);
        tip.setHeight((short) 1600);
        //标题
        HSSFRow title=sheet.createRow(1); //第1行
		HSSFCell titleCell0=title.createCell(0);
        CellRangeAddress titleregions = new CellRangeAddress((short) 1,  
                (short) 1, (short) 0, (short) 4);//add  新顺序为 起始行 终止行 起始列 终止列  
        sheet.addMergedRegion(titleregions);
        titleCell0.setCellValue("材料清单表");
        HSSFCellStyle titleStyle = workbook.createCellStyle();
        titleStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        titleStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
        titleCell0.setCellStyle(titleStyle);
        HSSFRow header=sheet.createRow(2); //第2行
        
        HSSFCell cell0=header.createCell(0);
		cell0.setCellValue("序号");
		HSSFCell cell1=header.createCell(1);
		cell1.setCellValue("名称");
		HSSFCell cell2=header.createCell(2);
		cell2.setCellValue("单件用量");
		HSSFCell cell3=header.createCell(3);
		cell3.setCellValue("单位");
		HSSFCell cell4=header.createCell(4);
		cell4.setCellValue("总量");
		
		sheet.setColumnWidth(0, 5*256);
		sheet.setColumnWidth(1, 70*256);
		sheet.setColumnWidth(2, 20*256);
		sheet.setColumnWidth(3, 10*256);
		sheet.setColumnWidth(4, 25*256);
	
		//设置  列为文本合适
		HSSFCellStyle css = workbook.createCellStyle();
		DataFormat  format = workbook.createDataFormat();
		css.setDataFormat(format.getFormat("@"));
		sheet.setDefaultColumnStyle(1,css);
		HSSFCellStyle css2 = workbook.createCellStyle();
		DataFormat  format2 = workbook.createDataFormat();
		css2.setDataFormat(format2.getFormat("0.000"));
		css2.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		css2.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
		sheet.setDefaultColumnStyle(2,css2);
		sheet.setDefaultColumnStyle(4,css2);
		HSSFCellStyle css3 = workbook.createCellStyle();
		css3.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		css3.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
		sheet.setDefaultColumnStyle(3,css2);
		int taskId = Integer.parseInt(qryParam.get("t_id").toString());	
		List<TaskBom> list = taskBOMService.getTaskBomList(taskId);
		int row = 2 ;
		if(list!=null){
		for(TaskBom taskbom : list){
			row++;
			HSSFRow detail=sheet.createRow(row); //第i+3行
			HSSFCell cell_detail_0=detail.createCell(0);
			cell_detail_0.setCellValue(taskbom.getOrder_no());
			HSSFCell cell_detail_1=detail.createCell(1);
			cell_detail_1.setCellValue(taskbom.getMaterial());
			HSSFCell cell_detail_2=detail.createCell(2);
			cell_detail_2.setCellValue(taskbom.getConsumption());
			HSSFCell cell_detail_3=detail.createCell(3);
			cell_detail_3.setCellValue(taskbom.getUnit());
			HSSFCell cell_detail_4=detail.createCell(4);
			cell_detail_4.setCellValue(taskbom.getTotal_consumption());
		}
		FileOutputStream fout = new FileOutputStream(file);  
		workbook.write(fout);  
        fout.close();
		}
	}
	/**
	 * 定额工时清单的excel
	* @Description:
	* TaskFileService
	* createTaskMaterialLsit
	* @param qryParam
	* @return
	* @throws IOException File
	* @author chenlong
	* 2016-10-11 下午3:00:00
	 */
	public void createTaskProcessLsit(Map<String,Object>  qryParam,String tempTaskFilePath) throws IOException{				
		String filename="定额工时_"+MyDateUtils.format_yyyyMMddHHmmsss(new Date())+".xls";
		File file=new File(tempTaskFilePath+filename);
		file.createNewFile();
		HSSFWorkbook workbook=new HSSFWorkbook();			
		HSSFSheet sheet=workbook.createSheet();		
		sheet.setColumnWidth(2, 10000);//第2+1=3列宽10000
		//提示信息
		HSSFRow tip=sheet.createRow(0); //第0行
		HSSFCell tipCell0=tip.createCell(0);
        CellRangeAddress regions = new CellRangeAddress((short) 0,  
                (short) 0, (short) 0, (short) 2);//add  新顺序为 起始行 终止行 起始列 终止列  
        sheet.addMergedRegion(regions);
        tipCell0.setCellValue("定额工时单");
        HSSFFont font = workbook.createFont();
        font.setFontName("宋体");
        font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);//粗体显示
        font.setFontHeightInPoints((short) 24);//设置字体大小
        HSSFCellStyle tipstyle = workbook.createCellStyle();
        tipstyle.setFont(font);
        tipstyle.setWrapText(true);//设置自动换行
        tipCell0.setCellStyle(tipstyle);
        tip.setHeight((short) 1600);
        //标题
        HSSFRow title=sheet.createRow(1); //第1行
		HSSFCell titleCell0=title.createCell(0);
        CellRangeAddress titleregions = new CellRangeAddress((short) 1,  
                (short) 1, (short) 0, (short) 2);//add  新顺序为 起始行 终止行 起始列 终止列  
        sheet.addMergedRegion(titleregions);
        titleCell0.setCellValue("定额工时表");
        HSSFCellStyle titleStyle = workbook.createCellStyle();
        titleStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        titleStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
        titleCell0.setCellStyle(titleStyle);
        HSSFRow header=sheet.createRow(2); //第2行
        
        HSSFCell cell0=header.createCell(0);
		cell0.setCellValue("序号");
		HSSFCell cell1=header.createCell(1);
		cell1.setCellValue("工序");
		HSSFCell cell2=header.createCell(2);
		cell2.setCellValue("工时");
	
		
		sheet.setColumnWidth(0, 10*256);
		sheet.setColumnWidth(1, 20*256);
		sheet.setColumnWidth(2, 20*256);
	
	
		//设置  列为文本合适
		HSSFCellStyle css = workbook.createCellStyle();
		DataFormat  format = workbook.createDataFormat();
		css.setDataFormat(format.getFormat("@"));	
		sheet.setDefaultColumnStyle(1,css);
		
		List<TaskProcess> list = taskProcessService.getTaskProcessList(qryParam);
		int row = 2 ;
		if(list!=null){
		for(TaskProcess taskProcess : list){
			row++;
			HSSFRow detail=sheet.createRow(row); //第i+3行
			HSSFCell cell_detail_0=detail.createCell(0);
			cell_detail_0.setCellValue(taskProcess.getOrder_no());
			HSSFCell cell_detail_1=detail.createCell(1);
			cell_detail_1.setCellValue(taskProcess.getProcess_name());
			HSSFCell cell_detail_2=detail.createCell(2);
			cell_detail_2.setCellValue(taskProcess.getStand_time());
		}
		FileOutputStream fout = new FileOutputStream(file);  
		workbook.write(fout);  
        fout.close(); 
		}
	}
	/**
	* 将文件写入一个零时的文件夹内
	* @Description:
	* TaskFileService
	* createTaskAllFileForZIP
	* @param object_id
	* @param filePath
	* @param filename
	* @throws IOException void
	* @author chenlong
	* 2016-10-11 下午2:16:44
	 */
	public void createTaskAllFileForZIP(String object_id,String filePath,String filename,String tempTaskFilePath) throws IOException{
		//创建文件夹
		File imagePath=new File(tempTaskFilePath+filePath);
		if(!imagePath.exists()){
			imagePath.mkdirs();
		}
		//读取文件,并写入临时文件
		GridFSDBFile file = fileService.retrieveFileOne("fs", object_id);
		if(file!=null){
		InputStream old_in = file.getInputStream();//文件liu
		String orix_name=(String) file.get("aliases");
		String suffix=orix_name.substring(orix_name.lastIndexOf("."));
		String ori_name=tempTaskFilePath+filePath+filename+suffix;//文件名
		File oldFile=new File(ori_name);
		oldFile.createNewFile();
		//旧的临时文件
		FileOutputStream old_out =new FileOutputStream(oldFile);
        
        byte[] buf = new byte[1024];
        int len;
        while ((len = old_in.read(buf)) > 0) {
        	old_out.write(buf, 0, len);
        }
        old_in.close();
        old_out.close();
		}else{
		}
	}
	/**
	 * 查询任务单的是否存在终止文件 
	* @Description:
	* TaskService
	* getTaskFileCount
	* @param params
	* @return Integer
	* @author chenlong
	* 2016-11-22 下午3:51:27
	 */
	public int getTaskFileCount(TaskFile taskFile){
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("t_id", taskFile.getT_id());
		map.put("file_type", 48);
		return mapper.getTaskFileCount(map);
	}
	/**
	 * 增加一条任务单终止文件信息
	* @Description:
	* OrderAttchedFileService
	* addOrderAttchedFile
	* @param arr void
	* @author chenlong
	* 2016-8-31 下午5:50:07
	 */
	public Map<String,Object> addOrderAttchedFile(TaskFile taskFile ,CommonsMultipartFile file,Map<String,Object> params) throws Exception {	
		Map<String,Object> map = new HashMap<String, Object>();
		String fileName = fileService.SaveFile(file,params);
		taskFile.setObject_id(fileName);//把存储mongoDb的文件序号存到数据库中		
		//1.获取session中的账号的值
		LoginAccount loginAccount = SessionUtil.getCurrentPlateLoginAccount();		
		taskFile.setOperator_name(loginAccount.getLogin_name());
		taskFile.setFile_type(48);//
		mapper.addTaskFile(taskFile);
		map.put("tf_id",taskFile.getTf_id());
		map.put("filename",taskFile.getFile_name());
		map.put("suffix_name", taskFile.getSuffix_name());
		return map;					
	}
	/**
	 * 查询运单文件
	* @Description:
	* TaskFileMapper
	* getTaskShippingFile
	* @param params
	* @return List<TaskFile>
	* @author chenlong
	* 2016-12-21 上午11:20:14
	 */
	public List<TaskFile> getTaskShippingFile(Map<String,Object> params){
		return mapper.getTaskShippingFile(params);
	}
	/**
	 * @Description:根据条件查找指定任务单文件
	 * TaskFileService
	 * getTaskFileByCondition
	 * @param params void
	 * @author yukai
	 * 2016-11-25 上午10:12:05
	 */
	public TaskFile getTaskFileByCondition(Map<String, Object> params) {
		return mapper.getTaskFileByCondition(params);
	}
}
