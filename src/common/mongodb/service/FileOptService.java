package common.mongodb.service;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import manager.common.main.model.SRMLog;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import usercenter.externalTask.model.TaskFile;
import usercenter.externalTask.service.TaskFileService;
import util.BeanUtil;
import util.Const;
import util.FFMpegUtil;
import util.IpAddressUtils;
import util.MyJsonUtil;
import util.SRMStringUtil;
import util.SessionUtil;
import util.WebUtil;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.gridfs.GridFS;
import com.mongodb.gridfs.GridFSDBFile;
import com.mongodb.gridfs.GridFSInputFile;
import common.model.BusinessException;
import common.mongodb.dao.FileOptDao;
import common.mongodb.data.MogoFileMapper;
import common.mongodb.model.FileBean;
import common.mongodb.model.MogoFileVo;
import common.mongodb.model.VideoFileBean;
import common.user.model.LoginAccount;


@Service
public class FileOptService {
	
	private  static  final Logger logger = Logger.getLogger(FileOptService. class);
	@Autowired
	private FileOptDao fileDao;
	@Autowired
	private MogoFileMapper mapper;
	@Autowired
	private TaskFileService taskFileService;
	/**
	* @Description: 多条件分页查询文件信息
	* @param start 起始记录
	* size  读取数量
	* ISIMG="isimg";//是否图片，1是 ，0否
	 USE_TYPE="useType";//使用类别,见t_base_file_type
	 COM_NAME="comName";//公司名
	 COM_ID="comID";//公司ID
	 USERNAME="userName";//上传者
	 uploadDate1:Date类型，开始时间
	 uploadDate2:Date类型，结束时间
	* @return
	* @throws Exception
	* @author xufeng
	* @date 2016-9-26 
	*/
	public List<FileBean> getFileList(Map<String,Object> params) throws Exception{
		Map<String,Object> params1=new HashMap<String, Object>();
		DB db = fileDao.getDB();
        List<FileBean> list=new ArrayList<FileBean>();
        // 存储fs的根节点
        GridFS gridFS = new GridFS(db, "fs");
        DBObject query  = new BasicDBObject();
        
    	for (Map.Entry<String,Object> entry : params.entrySet()) {  
           	if(!entry.getKey().equals(Const.AJAX_SERVICE_START) && !entry.getKey().equals(Const.AJAX_SERVICE_SIZE)
           			&& !entry.getKey().equals(Const.USE_PAGING) && entry.getKey().indexOf("uploadDate")<0
           			&& !entry.getKey().equals("rwdh")){
           		if(!"".equals(entry.getValue()) && entry.getValue()!=null){
           			System.out.println(entry.getKey()+":"+entry.getValue());
               		query.put(entry.getKey(),entry.getValue());
           		}
           		
           	}
           }
    	if(params.get("uploadDate1")!=null && !"".equals(params.get("uploadDate1")) 
    			&&params.get("uploadDate2")!=null && !"".equals(params.get("uploadDate2"))){
    		query.put("uploadDate",new BasicDBObject("$gte",params.get("uploadDate1")).append("$lte",params.get("uploadDate2")));
  	    }else if(params.get("uploadDate1")!=null && !"".equals(params.get("uploadDate1")) ){
    		query.put("uploadDate",new BasicDBObject("$gte",params.get("uploadDate1")));
  	    }else if(params.get("uploadDate2")!=null && !"".equals(params.get("uploadDate2"))){
    		query.put("uploadDate",new BasicDBObject("$lte",params.get("uploadDate2")));
  	    }
        if(params.get(Const.AJAX_SERVICE_START)==null){
 	       params.put(Const.AJAX_SERVICE_START, 0);
 	    }
 	    if(params.get(Const.AJAX_SERVICE_SIZE)==null){
 	       params.put(Const.AJAX_SERVICE_SIZE, 20);
 	    }
        
        int filecount=gridFS.getFileList(query).count();
        params.put(Const.AJAX_SERVICE_TOTAL, filecount);
        DBCursor fileList =null;
        DBObject orderBy=new BasicDBObject("uploadDate", -1);//按照上传时间倒序
        if("true".equals(params.get(Const.USE_PAGING))){
        	fileList = gridFS.getFileList(query).sort(orderBy).skip(Integer.valueOf(params.get(Const.AJAX_SERVICE_START).toString())).limit(Integer.valueOf(params.get(Const.AJAX_SERVICE_SIZE).toString()));
        }else{
        	fileList = gridFS.getFileList(query).sort(orderBy);
        }
        while(fileList.hasNext()){
        	DBObject obj = fileList.next();
        	FileBean bean = BeanUtil.dbObject2Bean(obj, new FileBean());
        	if(params.get("rwdh")!=null && !"".equals(params.get("rwdh"))){
        		params1.put("rwdh", params.get("rwdh"));
        		params1.put("object_id", bean.getFilename());
        		TaskFile taskFile=taskFileService.getTaskFileByCondition(params1);
        		if(taskFile!=null){
        			list.add(bean);
        		}
        	}else {
        		list.add(bean);
			}
        }
       return list;
	}
	/**保存文件，重载方法1,旧的，替换后删除*/
	public String SaveFile(byte[] buff,String originalFilename,String contentType) throws Exception{
		String fileName = SRMStringUtil.getUUID();//文件名生成器
		try {
	            DB db = fileDao.getDB();
	            // 存储fs的根节点
	            GridFS gridFS = new GridFS(db, "fs.files");
	            InputStream sbs = new ByteArrayInputStream(buff); 
	            GridFSInputFile gfs = gridFS.createFile(sbs);
	            gfs.put("aliases", originalFilename);
	            gfs.put("filename", fileName);
	            gfs.put("contentType",contentType);
	            gfs.save();
	            logger.debug("mongodb SaveFile:"+fileName);
	        } catch (Exception e) {
	        	throw new BusinessException(e,"mongodb在fs保存"+originalFilename+"失败");
	        }
		  return fileName;
	}
	/**
	* @Description: 保存文件，重载方法1
	* @param buff 文件流
	* @param originalFilename 原文件名
	* @param contentType 上传文件类型
	* @param 文件信息
	* @return
	* @throws Exception
	* @author xufeng
	* @date 2016-9-26 
	*/
	public String SaveFile(byte[] buff,String originalFilename,String contentType,Map<String,Object> params) throws Exception{
		String fileName = SRMStringUtil.getUUID();//文件名生成器
		try {
	            DB db = fileDao.getDB();
	            // 存储fs的根节点
	            GridFS gridFS = new GridFS(db, "fs");
	            InputStream sbs = new ByteArrayInputStream(buff); 
	            GridFSInputFile gfs = gridFS.createFile(sbs);
	            gfs.put("aliases", originalFilename);
	            gfs.put("filename", fileName);
	            gfs.put("contentType",contentType);
	           //mongo文件管理，附加的自定义字段
	            gfs.put(Const.ISIMG, params.get(Const.ISIMG));//是否图片，1是 ，0否
	            gfs.put(Const.USE_TYPE, params.get(Const.USE_TYPE));//使用类别,t_base_file_type
	            gfs.put(Const.COM_NAME, params.get(Const.COM_NAME));//公司名
	            gfs.put(Const.COM_ID, params.get(Const.COM_ID));//公司ID
	            gfs.put(Const.USERNAME, params.get(Const.USERNAME));//上传者
	            gfs.save();
	            logger.debug("mongodb SaveFile:"+fileName);
	        } catch (Exception e) {
	        	throw new BusinessException(e,"mongodb在fs保存"+originalFilename+"失败");
	        }
		  return fileName;
	}
	/**保存文件，重载方法2,旧的，替换后删除*/
	public String SaveFile(MultipartFile file) throws Exception{
		String originalFilename = file.getOriginalFilename();
		String fileName = SRMStringUtil.getUUID();//文件名生成器
		try {
	            DB db = fileDao.getDB();
	            // 存储fs的根节点
	            GridFS gridFS = new GridFS(db, "fs");
	            GridFSInputFile gfs = gridFS.createFile(file.getInputStream());
	            gfs.put("aliases", originalFilename);
	            gfs.put("filename", fileName);
	            gfs.put("contentType",file.getContentType());
	            gfs.save();
	            logger.debug("mongodb SaveFile:"+fileName);
	        } catch (Exception e) {
	        	throw new BusinessException(e,"mongodb在fs保存"+originalFilename+"失败");
	        }
		  return fileName;
	}
	/**
	* @Description: 保存文件，重载方法2
	* @param file 上传文件对象
	* @param params 文件信息
	* @return
	* @throws Exception
	* @author xufeng
	* @date 2016-9-26 
	*/
	public String SaveFile(MultipartFile file,Map<String,Object> params) throws Exception{
		String originalFilename = file.getOriginalFilename();
		String fileName = SRMStringUtil.getUUID();//文件名生成器
		try {
            DB db = fileDao.getDB();
            // 存储fs的根节点
            GridFS gridFS = new GridFS(db, "fs");
            GridFSInputFile gfs = gridFS.createFile(file.getInputStream());
            gfs.put("aliases", originalFilename);
            gfs.put("filename", fileName);
            gfs.put("contentType",file.getContentType());
            //mongo文件管理，附加的自定义字段
            gfs.put(Const.ISIMG, params.get(Const.ISIMG));//是否图片，1是 ，0否
            gfs.put(Const.USE_TYPE, params.get(Const.USE_TYPE));//使用类别t_base_file_type
            gfs.put(Const.COM_NAME, params.get(Const.COM_NAME));//公司名
            gfs.put(Const.COM_ID, params.get(Const.COM_ID));//公司ID
            gfs.put(Const.USERNAME, params.get(Const.USERNAME));//上传者
            gfs.save();
            logger.debug("mongodb SaveFile:"+fileName);
        } catch (Exception e) {
        	throw new BusinessException(e,"mongodb在fs保存"+originalFilename+"失败");
        }
		 return fileName;
	}
	public GridFSDBFile retrieveFileOne(String filename){
		return this.retrieveFileOne("fs", filename);
	} 
	// 取出文件
    public GridFSDBFile retrieveFileOne(String collectionName, String filename) {
        try {
            DB db = fileDao.getDB();
            // 获取fs的根节点
            GridFS gridFS = new GridFS(db, collectionName);
            GridFSDBFile dbfile = gridFS.findOne(filename);
            if (dbfile != null) {
                return dbfile;
            }
        } catch (Exception e) {
        	throw new BusinessException(e,"mongodb获取从"+collectionName+"获取"+filename+"文件失败");
        }
        return null;
    }
    
    //删除文件
    public void deleteFileByName(String filename) {
        if(filename!=null){
        	try {
                DB db = fileDao.getDB();
                
                // 获取fs的根节点
                GridFS gridFS = new GridFS(db, "fs");
                //删除Mongo上的文件
                gridFS.remove(filename);
                logger.debug("mongodb deleteFileByName:"+filename);
                addLog(filename);
            } catch (Exception e) {
                throw new BusinessException(e,"mongodb从fs删除"+filename+"失败");
            }
        }
    	
    }
    /**保存文件，重载方法3,旧的，替换后删除*/
	public String SaveFile(File tempfile){
		String fileName=SRMStringUtil.getUUID();
		try {
			DB db = fileDao.getDB();
	        // 存储fs的根节点
	        GridFS gridFS = new GridFS(db, "fs");
	        GridFSInputFile gfs = gridFS.createFile(tempfile);
	        gfs.put("aliases", tempfile.getName());
	        gfs.put("filename", fileName);
	        gfs.put("contentType","application/octet-stream");
	        gfs.save();
	        logger.debug("mongodb SaveFile:"+fileName);
		} catch (Exception e) {
        	throw new BusinessException(e,"mongodb在fs保存"+fileName+"失败");
        }
		return fileName;
	}
	/**
	* @Description: 保存文件，重载方法3
	* @param file 上传文件对象
	* @param params 文件信息
	* @return
	* @throws Exception
	* @author xufeng
	* @date 2016-9-26 
	*/
	public String SaveFile(File tempfile,Map<String,Object> params){
		String fileName=SRMStringUtil.getUUID();
		try {
			DB db = fileDao.getDB();
	        // 存储fs的根节点
	        GridFS gridFS = new GridFS(db, "fs");
	        GridFSInputFile gfs = gridFS.createFile(tempfile);
	        gfs.put("aliases", tempfile.getName());
	        gfs.put("filename", fileName);
	        gfs.put("contentType","application/octet-stream");
	      //mongo文件管理，附加的自定义字段
            gfs.put(Const.ISIMG, params.get(Const.ISIMG));//是否图片，1是 ，0否
            gfs.put(Const.USE_TYPE, params.get(Const.USE_TYPE));//使用类别t_base_file_type
            gfs.put(Const.COM_NAME, params.get(Const.COM_NAME));//公司名
            gfs.put(Const.COM_ID, params.get(Const.COM_ID));//公司ID
            gfs.put(Const.USERNAME, params.get(Const.USERNAME));//上传者
	        gfs.save();
	        logger.debug("mongodb SaveFile:"+fileName);
		} catch (Exception e) {
        	throw new BusinessException(e,"mongodb在fs保存"+fileName+"失败");
        }
		return fileName;
	}
	/**
	*旧的，待废弃
	*/
	public VideoFileBean SaveVideoFile(File tempVideoFile){
		//2.开始视频转码,通过FFMpeg工具
        String originFileUri=tempVideoFile.getAbsolutePath();
        //视频截图
        String imgFilePath=FFMpegUtil.makeScreenCut(originFileUri);
        File imgFile=new File(imgFilePath);
        if(!imgFile.exists()){
        	throw new BusinessException("图片保存失败");
        }
        //视频转码===>FLV格式
        String videoFilePath=FFMpegUtil.videoTransfer(originFileUri);
        File videoFile=new File(videoFilePath);
        if(!videoFile.exists()){
        	throw new BusinessException("图片保存失败");
        }
        
        //3.将视频截图和视频文件保存至MongoDB中
        VideoFileBean fileBean = new VideoFileBean();     
        fileBean.setImage_file(this.SaveFile(imgFile));
        String videoname=this.SaveFile(videoFile);
        fileBean.setVideo_file(videoname);
        logger.debug("mongodb SaveVideoFile:"+videoname);
        //删除文件
        imgFile.delete();
        videoFile.delete();
		return fileBean;
	}
	/**
	* @Description: 转码获取flv视屏和图片，然后保存到mongodb，最后返回 查询关键词的文件名
	* @param tempVideoFile 上传的视频，在服务器上额度临时文件
	* @return 保存到mongodb后，关联的的文件名
	* @author 华慧
	* @date 2016-5-10
	*/
	public VideoFileBean SaveVideoFile(File tempVideoFile,Map<String,Object> params){
		//2.开始视频转码,通过FFMpeg工具
        String originFileUri=tempVideoFile.getAbsolutePath();
        //视频截图
        String imgFilePath=FFMpegUtil.makeScreenCut(originFileUri);
        File imgFile=new File(imgFilePath);
        if(!imgFile.exists()){
        	throw new BusinessException("图片保存失败");
        }
        //视频转码===>FLV格式
        String videoFilePath=FFMpegUtil.videoTransfer(originFileUri);
        File videoFile=new File(videoFilePath);
        if(!videoFile.exists()){
        	throw new BusinessException("图片保存失败");
        }
        //3.将视频截图和视频文件保存至MongoDB中
       
        VideoFileBean fileBean = new VideoFileBean();	
        params.put(Const.ISIMG, "1");
        fileBean.setImage_file(this.SaveFile(imgFile,params));
        
        params.put(Const.ISIMG, "0");
        String videoname=this.SaveFile(videoFile,params);
        fileBean.setVideo_file(videoname);
        logger.debug("mongodb SaveVideoFile:"+videoname);
        //删除文件
        imgFile.delete();
        videoFile.delete();
		return fileBean;
	}
	/**
	* 旧的，待废弃
	*/
	public void saveWithFileName(String filename,File tempFile){
		try {
            DB db = fileDao.getDB();
            // 存储fs的根节点
            GridFS gridFS = new GridFS(db, "fs");
            GridFSInputFile gfs = gridFS.createFile(tempFile);
            gfs.put("aliases", tempFile.getName());
            gfs.put("filename", filename);
            gfs.put("contentType","application/octet-stream");
            gfs.save();
            logger.debug("mongodb SaveFile:"+filename);
        } catch (Exception e) {
        	throw new BusinessException(e,"mongodb在fs保存"+tempFile.getName()+"失败");
        }
	}
	
	/**
	* @Description: 重新保存文件，filename不变，但是另外一个mongodb的id实际是变化的
	* @param filename 文件id
	* @param tempFile 临时文件
	* @param params 文件信息
	* @author xufeng
	* @date 2016-9-26 
	*/
	public void saveWithFileName(String filename,File tempFile,Map<String,Object> params){
		try {
            DB db = fileDao.getDB();
            // 存储fs的根节点
            GridFS gridFS = new GridFS(db, "fs");
            GridFSInputFile gfs = gridFS.createFile(tempFile);
            gfs.put("aliases", tempFile.getName());
            gfs.put("filename", filename);
            gfs.put("contentType","application/octet-stream");
          //mongo文件管理，附加的自定义字段
            gfs.put(Const.ISIMG, params.get(Const.ISIMG));//是否图片，1是 ，0否
            gfs.put(Const.USE_TYPE, params.get(Const.USE_TYPE));//使用类别t_base_file_type
            gfs.put(Const.COM_NAME, params.get(Const.COM_NAME));//公司名
            gfs.put(Const.COM_ID, params.get(Const.COM_ID));//公司ID
            gfs.put(Const.USERNAME, params.get(Const.USERNAME));//上传者
            gfs.save();
            logger.debug("mongodb SaveFile:"+filename);
        } catch (Exception e) {
        	throw new BusinessException(e,"mongodb在fs保存"+tempFile.getName()+"失败");
        }
	}
	/**
	 * @Description:删除无用的mogoDb文件
	 * FileOptService
	 * delUselessMogoFile void
	 * @author yukai
	 * 2016-11-15 上午10:25:17
	 */
	public void delUselessMogoFile(Map<String,Object> params)  throws Exception{
		DB db = fileDao.getDB();
        List<FileBean> list=new ArrayList<FileBean>();
        // 存储fs的根节点
        GridFS gridFS = new GridFS(db, "fs");
        DBObject query  = new BasicDBObject();
		DBCursor fileList =null;
		Calendar   c   =   Calendar.getInstance();   
		c.add(Calendar.DAY_OF_MONTH, -1);  
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
		String mDateTime=formatter.format(c.getTime());  
		Date date =  formatter.parse(mDateTime);
		query.put("uploadDate",new BasicDBObject("$lte",date));
		fileList = gridFS.getFileList(query);
		while(fileList.hasNext()){
        	DBObject obj = fileList.next();
        	FileBean bean = BeanUtil.dbObject2Bean(obj, new FileBean());
        	list.add(bean);
        }
		for (FileBean file : list) {
			params.put("mogodb_id", file.getFilename());
			List<MogoFileVo> files=mapper.checkFileIsUse(params);
			if (files.size()==0) {//没有保存在平台数据库的
				deleteFileByName(file.getFilename());
			}else{
				if(files.get(0).getBus_id()==null||files.get(0).getBus_id()==0){//没有与业务主键关联的
					deleteFileByName(file.getFilename());
					String table_name=files.get(0).getTable_name();
					params.put("table_name", table_name);
					mapper.deleteFileContact(params);
				}
			}
		}
	}
	/**
	 * @Description:重新保存文件，filename不变，但是另外一个mongodb的id实际是变化的
	 * FileOptService
	 * saveWithFileName
	 * @param filename
	 * @param file
	 * @param params void
	 * @author yukai
	 * 2016-11-24 下午6:30:34
	 */
	public void saveWithFileName(String filename,MultipartFile file,Map<String,Object> params){
		String originalFilename = file.getOriginalFilename();
		//String fileName = SRMStringUtil.getUUID();//文件名生成器
		try {
            DB db = fileDao.getDB();
            // 存储fs的根节点
            GridFS gridFS = new GridFS(db, "fs");
            GridFSInputFile gfs = gridFS.createFile(file.getInputStream());
            gfs.put("aliases", originalFilename);
            gfs.put("filename", filename);
            gfs.put("contentType",file.getContentType());
          //mongo文件管理，附加的自定义字段
            gfs.put(Const.ISIMG, params.get(Const.ISIMG));//是否图片，1是 ，0否
            gfs.put(Const.USE_TYPE, params.get(Const.USE_TYPE));//使用类别t_base_file_type
            gfs.put(Const.COM_NAME, params.get(Const.COM_NAME));//公司名
            gfs.put(Const.COM_ID, params.get(Const.COM_ID));//公司ID
            gfs.put(Const.USERNAME, params.get(Const.USERNAME));//上传者
            gfs.save();
            logger.debug("mongodb SaveFile:"+filename);
        } catch (Exception e) {
        	throw new BusinessException(e,"mongodb在fs保存"+originalFilename+"失败");
        }
	}
	/**
	 * @Description:记录删除MOGO文件日志
	 * FileOptService
	 * addLog
	 * @param httpReq
	 * @param regAccout void
	 * @author yukai
	 * 2016-12-8 上午9:12:14
	 */
	 private  void  addLog(String filename){
		 	LoginAccount loginAccount=SessionUtil.getCurrentPlateLoginAccount();
			SRMLog log = new SRMLog();
			log.setLogdtm(new Date());
			log.setMod_name("platform");
			log.setLogin_id(loginAccount.getLogin_name());
			log.setS_data("{\"filename\":[\""+filename+"\"]}");
			log.setError_message("mogo文件删除");
			log.setLog_type(1);
			WebUtil.getSyslogger().log(log);
		}
}
